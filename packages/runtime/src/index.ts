export type ResourceScope = "namespaced" | "cluster";

export interface ResponseSchema<T> {
  parse(value: unknown): T;
}

export type HeaderSource =
  | Record<string, string>
  | (() => Record<string, string> | Promise<Record<string, string>>);

export interface BearerAuth {
  type: "bearer";
  token: string | (() => string | Promise<string>);
}

export interface ClientOptions {
  baseUrl: string;
  auth?: BearerAuth;
  headers?: HeaderSource;
  fetch?: typeof fetch;
}

export interface RequestOptions<TResponse> {
  method?: string;
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  schema?: ResponseSchema<TResponse>;
}

export interface KubernetesClient {
  request<TResponse>(options: RequestOptions<TResponse>): Promise<TResponse>;
}

export type PatchType = "merge" | "json" | "apply";

export interface ResourceDefinition {
  apiVersion: string;
  plural: string;
  namespaced: boolean;
}

export interface ListOptions {
  labelSelector?: string;
  fieldSelector?: string;
  limit?: number;
  continue?: string;
  signal?: AbortSignal;
}

export type NamespacedOptions = { namespace: string };
export type ClusterOptions = { namespace?: never };

export type ScopedOptions<TScope extends ResourceScope> = TScope extends "namespaced"
  ? NamespacedOptions
  : ClusterOptions;

export type GetOptions<TScope extends ResourceScope> = ScopedOptions<TScope> & {
  name: string;
  signal?: AbortSignal;
};

export type ListResourceOptions<TScope extends ResourceScope> = ScopedOptions<TScope> & ListOptions;

export type CreateOptions<TResource, TScope extends ResourceScope> = ScopedOptions<TScope> & {
  body: TResource;
  signal?: AbortSignal;
};

export type UpdateOptions<TResource, TScope extends ResourceScope> = ScopedOptions<TScope> & {
  name: string;
  body: TResource;
  signal?: AbortSignal;
};

export type PatchOptions<TPatch, TScope extends ResourceScope> = ScopedOptions<TScope> & {
  name: string;
  type: PatchType;
  body: TPatch;
  fieldManager?: string;
  force?: boolean;
  signal?: AbortSignal;
};

export type DeleteOptions<TScope extends ResourceScope> = ScopedOptions<TScope> & {
  name: string;
  gracePeriodSeconds?: number;
  propagationPolicy?: "Orphan" | "Background" | "Foreground";
  signal?: AbortSignal;
};

export interface ResourceClient<TResource, TList, TScope extends ResourceScope> {
  get(options: GetOptions<TScope>): Promise<TResource>;
  list(options: ListResourceOptions<TScope>): Promise<TList>;
  create(options: CreateOptions<TResource, TScope>): Promise<TResource>;
  update(options: UpdateOptions<TResource, TScope>): Promise<TResource>;
  patch<TPatch = Partial<TResource>>(options: PatchOptions<TPatch, TScope>): Promise<TResource>;
  delete(options: DeleteOptions<TScope>): Promise<TResource>;
  subresource(name: string): ResourceClient<TResource, TResource, TScope>;
}

export class KubernetesApiError extends Error {
  readonly status: number;
  readonly reason?: string;
  readonly details?: unknown;
  readonly body?: unknown;

  constructor(message: string, options: { status: number; reason?: string; details?: unknown; body?: unknown }) {
    super(message);
    this.name = "KubernetesApiError";
    this.status = options.status;
    this.reason = options.reason;
    this.details = options.details;
    this.body = options.body;
  }

  static isNotFound(error: unknown): error is KubernetesApiError {
    return error instanceof KubernetesApiError && error.status === 404;
  }
}

export function createClient(options: ClientOptions): KubernetesClient {
  const fetchImpl = options.fetch ?? globalThis.fetch;

  if (!fetchImpl) {
    throw new Error("No fetch implementation is available.");
  }

  return {
    async request<TResponse>(requestOptions: RequestOptions<TResponse>): Promise<TResponse> {
      const headers = await resolveHeaders(options);
      const url = new URL(requestOptions.path, withTrailingSlash(options.baseUrl));

      for (const [key, value] of Object.entries(requestOptions.query ?? {})) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }

      const response = await fetchImpl(url, {
        method: requestOptions.method ?? "GET",
        headers: {
          ...headers,
          ...requestOptions.headers,
        },
        body: requestOptions.body === undefined ? undefined : JSON.stringify(requestOptions.body),
        signal: requestOptions.signal,
      });

      const body = await parseJson(response);

      if (!response.ok) {
        throw new KubernetesApiError(getErrorMessage(body, response.status), {
          status: response.status,
          reason: getStringProperty(body, "reason"),
          details: getObjectProperty(body, "details"),
          body,
        });
      }

      return requestOptions.schema ? requestOptions.schema.parse(body) : (body as TResponse);
    },
  };
}

export function createResourceClient<TResource, TList, TScope extends ResourceScope>(
  client: KubernetesClient,
  definition: ResourceDefinition,
  schema?: ResponseSchema<TResource>,
  listSchema?: ResponseSchema<TList>,
  subresource?: string,
): ResourceClient<TResource, TList, TScope> {
  return {
    get: (options) =>
      client.request<TResource>({
        path: resourcePath(definition, options, options.name, subresource),
        signal: options.signal,
        schema,
      }),
    list: (options) =>
      client.request<TList>({
        path: resourcePath(definition, options, undefined, subresource),
        query: listQuery(options),
        signal: options.signal,
        schema: listSchema,
      }),
    create: (options) =>
      client.request<TResource>({
        method: "POST",
        path: resourcePath(definition, options, undefined, subresource),
        body: options.body,
        headers: jsonHeaders(),
        signal: options.signal,
        schema,
      }),
    update: (options) =>
      client.request<TResource>({
        method: "PUT",
        path: resourcePath(definition, options, options.name, subresource),
        body: options.body,
        headers: jsonHeaders(),
        signal: options.signal,
        schema,
      }),
    patch: (options) =>
      client.request<TResource>({
        method: "PATCH",
        path: resourcePath(definition, options, options.name, subresource),
        query: {
          fieldManager: options.fieldManager,
          force: options.force,
        },
        body: options.body,
        headers: {
          "content-type": patchContentType(options.type),
        },
        signal: options.signal,
        schema,
      }),
    delete: (options) =>
      client.request<TResource>({
        method: "DELETE",
        path: resourcePath(definition, options, options.name, subresource),
        query: {
          gracePeriodSeconds: options.gracePeriodSeconds,
          propagationPolicy: options.propagationPolicy,
        },
        signal: options.signal,
        schema,
      }),
    subresource: (name) => createResourceClient(client, definition, schema, schema, name),
  };
}

async function resolveHeaders(options: ClientOptions): Promise<Record<string, string>> {
  const headers = typeof options.headers === "function" ? await options.headers() : { ...(options.headers ?? {}) };

  if (!options.auth) {
    return headers;
  }

  const token = typeof options.auth.token === "function" ? await options.auth.token() : options.auth.token;
  return {
    ...headers,
    authorization: `Bearer ${token}`,
  };
}

function withTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function jsonHeaders(): Record<string, string> {
  return {
    "content-type": "application/json",
  };
}

function patchContentType(type: PatchType): string {
  switch (type) {
    case "merge":
      return "application/merge-patch+json";
    case "json":
      return "application/json-patch+json";
    case "apply":
      return "application/apply-patch+json";
  }
}

function listQuery(options: ListOptions): Record<string, string | number | undefined> {
  return {
    labelSelector: options.labelSelector,
    fieldSelector: options.fieldSelector,
    limit: options.limit,
    continue: options.continue,
  };
}

function resourcePath(
  definition: ResourceDefinition,
  options: { namespace?: string },
  name?: string,
  subresource?: string,
): string {
  const segments = [...apiVersionSegments(definition.apiVersion)];

  if (definition.namespaced) {
    if (!options.namespace) {
      throw new Error(`Resource ${definition.plural} requires a namespace.`);
    }
    segments.push("namespaces", options.namespace);
  }

  segments.push(definition.plural);

  if (name) {
    segments.push(name);
  }

  if (subresource) {
    segments.push(subresource);
  }

  return `/${segments.map(encodeURIComponent).join("/")}`;
}

function apiVersionSegments(apiVersion: string): string[] {
  if (apiVersion === "v1") {
    return ["api", apiVersion];
  }

  const [group, version] = apiVersion.split("/");
  if (!group || !version) {
    throw new Error(`Invalid Kubernetes apiVersion: ${apiVersion}`);
  }

  return ["apis", group, version];
}

async function parseJson(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(body: unknown, status: number): string {
  return getStringProperty(body, "message") ?? `Kubernetes API request failed with status ${status}.`;
}

function getStringProperty(value: unknown, key: string): string | undefined {
  return typeof value === "object" && value !== null && key in value && typeof value[key as keyof typeof value] === "string"
    ? value[key as keyof typeof value]
    : undefined;
}

function getObjectProperty(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null && key in value ? value[key as keyof typeof value] : undefined;
}

