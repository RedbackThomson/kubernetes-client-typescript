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

export interface VerbOptions {
  get: unknown;
  list: unknown;
  create: unknown;
  update: unknown;
  patch: unknown;
  delete: unknown;
}

export type DefaultVerbOptions = {
  [K in keyof VerbOptions]: {};
};

export type NamespacedOptions = { namespace: string };
export type ClusterOptions = { namespace?: never };

export type ScopedOptions<TScope extends ResourceScope> =
  TScope extends "namespaced" ? NamespacedOptions : ClusterOptions;

export type GetOptions<
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & {
  name: string;
  signal?: AbortSignal;
} & TVerbOptions["get"];

export type ListResourceOptions<
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & { signal?: AbortSignal } & TVerbOptions["list"];

export type SubresourceListOptions<
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & { name: string; signal?: AbortSignal } & TVerbOptions["list"];

export type CreateOptions<
  TResource,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & {
  body: TResource;
  signal?: AbortSignal;
} & TVerbOptions["create"];

export type SubresourceCreateOptions<
  TResource,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & {
  name: string;
  body: TResource;
  signal?: AbortSignal;
} & TVerbOptions["create"];

export type UpdateOptions<
  TResource,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & {
  name: string;
  body: TResource;
  signal?: AbortSignal;
} & TVerbOptions["update"];

export type PatchOptions<
  TPatch,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & {
  name: string;
  type: PatchType;
  body: TPatch;
  signal?: AbortSignal;
} & TVerbOptions["patch"];

export type DeleteOptions<
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> = ScopedOptions<TScope> & {
  name: string;
  signal?: AbortSignal;
} & TVerbOptions["delete"];

type QueryParamValue = string | number | boolean | undefined;

export type QueryMapper<TVerbOptions extends VerbOptions> = {
  get?(options: TVerbOptions["get"]): Record<string, QueryParamValue>;
  list?(options: TVerbOptions["list"]): Record<string, QueryParamValue>;
  create?(options: TVerbOptions["create"]): Record<string, QueryParamValue>;
  update?(options: TVerbOptions["update"]): Record<string, QueryParamValue>;
  patch?(options: TVerbOptions["patch"]): Record<string, QueryParamValue>;
  delete?(options: TVerbOptions["delete"]): Record<string, QueryParamValue>;
};

export interface ResourceClient<
  TResource,
  TList,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> {
  get(options: GetOptions<TScope, TVerbOptions>): Promise<TResource>;
  list(options: ListResourceOptions<TScope, TVerbOptions>): Promise<TList>;
  create(
    options: CreateOptions<TResource, TScope, TVerbOptions>,
  ): Promise<TResource>;
  update(
    options: UpdateOptions<TResource, TScope, TVerbOptions>,
  ): Promise<TResource>;
  patch<TPatch = Partial<TResource>>(
    options: PatchOptions<TPatch, TScope, TVerbOptions>,
  ): Promise<TResource>;
  delete(options: DeleteOptions<TScope, TVerbOptions>): Promise<TResource>;
  subresource(
    name: string,
  ): SubresourceClient<TResource, TResource, TScope, TVerbOptions>;
}

export interface SubresourceClient<
  TResource,
  TList,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
> {
  get(options: GetOptions<TScope, TVerbOptions>): Promise<TResource>;
  list(options: SubresourceListOptions<TScope, TVerbOptions>): Promise<TList>;
  create(
    options: SubresourceCreateOptions<TResource, TScope, TVerbOptions>,
  ): Promise<TResource>;
  update(
    options: UpdateOptions<TResource, TScope, TVerbOptions>,
  ): Promise<TResource>;
  patch<TPatch = Partial<TResource>>(
    options: PatchOptions<TPatch, TScope, TVerbOptions>,
  ): Promise<TResource>;
  delete(options: DeleteOptions<TScope, TVerbOptions>): Promise<TResource>;
  subresource(
    name: string,
  ): SubresourceClient<TResource, TResource, TScope, TVerbOptions>;
}

export class KubernetesApiError extends Error {
  readonly status: number;
  readonly reason?: string;
  readonly details?: unknown;
  readonly body?: unknown;
  readonly headers: Headers;

  constructor(
    message: string,
    options: {
      status: number;
      reason?: string;
      details?: unknown;
      body?: unknown;
      headers?: Headers;
    },
  ) {
    super(message);
    this.name = "KubernetesApiError";
    this.status = options.status;
    this.reason = options.reason;
    this.details = options.details;
    this.body = options.body;
    this.headers = options.headers ?? new Headers();
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
    async request<TResponse>(
      requestOptions: RequestOptions<TResponse>,
    ): Promise<TResponse> {
      const headers = withJsonBodyHeader(
        await resolveHeaders(options, requestOptions.headers),
        requestOptions,
      );
      const url = buildRequestUrl(options.baseUrl, requestOptions.path);

      for (const [key, value] of Object.entries(requestOptions.query ?? {})) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }

      const response = await fetchImpl(url, {
        method: requestOptions.method ?? "GET",
        headers,
        body:
          requestOptions.body === undefined
            ? undefined
            : JSON.stringify(requestOptions.body),
        signal: requestOptions.signal,
      });

      const body = await parseJson(response);

      if (!response.ok) {
        throw new KubernetesApiError(getErrorMessage(body, response.status), {
          status: response.status,
          reason: getStringProperty(body, "reason"),
          details: getObjectProperty(body, "details"),
          body,
          headers: new Headers(response.headers),
        });
      }

      return requestOptions.schema
        ? requestOptions.schema.parse(body)
        : (body as TResponse);
    },
  };
}

export function createResourceClient<
  TResource,
  TList,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
>(
  client: KubernetesClient,
  definition: ResourceDefinition,
  schema?: ResponseSchema<TResource>,
  listSchema?: ResponseSchema<TList>,
  subresource?: string,
  queryMapper?: QueryMapper<TVerbOptions>,
): ResourceClient<TResource, TList, TScope, TVerbOptions> {
  return {
    get: (options) =>
      client.request<TResource>({
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.get?.(options),
        signal: options.signal,
        schema,
      }),
    list: (options) =>
      client.request<TList>({
        path: resourcePath(definition, options, undefined, subresource),
        query: queryMapper?.list?.(options),
        signal: options.signal,
        schema: listSchema,
      }),
    create: (options) =>
      client.request<TResource>({
        method: "POST",
        path: resourcePath(definition, options, undefined, subresource),
        query: queryMapper?.create?.(options),
        body: options.body,
        headers: jsonHeaders(),
        signal: options.signal,
        schema,
      }),
    update: (options) =>
      client.request<TResource>({
        method: "PUT",
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.update?.(options),
        body: options.body,
        headers: jsonHeaders(),
        signal: options.signal,
        schema,
      }),
    patch: (options) =>
      client.request<TResource>({
        method: "PATCH",
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.patch?.(options),
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
        query: queryMapper?.delete?.(options),
        signal: options.signal,
        schema,
      }),
    subresource: (name) =>
      createSubresourceClient(
        client,
        definition,
        schema,
        schema,
        name,
        queryMapper,
      ),
  };
}

export function createSubresourceClient<
  TResource,
  TList,
  TScope extends ResourceScope,
  TVerbOptions extends VerbOptions = DefaultVerbOptions,
>(
  client: KubernetesClient,
  definition: ResourceDefinition,
  schema?: ResponseSchema<TResource>,
  listSchema?: ResponseSchema<TList>,
  subresource?: string,
  queryMapper?: QueryMapper<TVerbOptions>,
): SubresourceClient<TResource, TList, TScope, TVerbOptions> {
  return {
    get: (options) =>
      client.request<TResource>({
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.get?.(options),
        signal: options.signal,
        schema,
      }),
    list: (options) =>
      client.request<TList>({
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.list?.(options),
        signal: options.signal,
        schema: listSchema,
      }),
    create: (options) =>
      client.request<TResource>({
        method: "POST",
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.create?.(options),
        body: options.body,
        headers: jsonHeaders(),
        signal: options.signal,
        schema,
      }),
    update: (options) =>
      client.request<TResource>({
        method: "PUT",
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.update?.(options),
        body: options.body,
        headers: jsonHeaders(),
        signal: options.signal,
        schema,
      }),
    patch: (options) =>
      client.request<TResource>({
        method: "PATCH",
        path: resourcePath(definition, options, options.name, subresource),
        query: queryMapper?.patch?.(options),
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
        query: queryMapper?.delete?.(options),
        signal: options.signal,
        schema,
      }),
    subresource: (name) =>
      createSubresourceClient(
        client,
        definition,
        schema,
        schema,
        name,
        queryMapper,
      ),
  };
}

async function resolveHeaders(
  options: ClientOptions,
  requestHeaders?: Record<string, string>,
): Promise<Record<string, string>> {
  const headers = {
    ...(typeof options.headers === "function"
      ? await options.headers()
      : (options.headers ?? {})),
    ...(requestHeaders ?? {}),
  };

  if (!options.auth) {
    return headers;
  }

  const token =
    typeof options.auth.token === "function"
      ? await options.auth.token()
      : options.auth.token;
  return {
    ...headers,
    authorization: `Bearer ${token}`,
  };
}

function withJsonBodyHeader<TResponse>(
  headers: Record<string, string>,
  options: RequestOptions<TResponse>,
): Record<string, string> {
  if (options.body === undefined || hasHeader(headers, "content-type")) {
    return headers;
  }

  return {
    ...headers,
    "content-type": "application/json",
  };
}

function hasHeader(headers: Record<string, string>, name: string): boolean {
  return Object.keys(headers).some(
    (key) => key.toLowerCase() === name.toLowerCase(),
  );
}

function withTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function buildRequestUrl(baseUrl: string, path: string): URL {
  const origin =
    typeof globalThis.location === "undefined"
      ? "http://localhost"
      : globalThis.location.origin;
  const base = new URL(withTrailingSlash(baseUrl), origin);
  const basePath = trimSlashes(base.pathname);
  const requestPath = trimSlashes(path);

  base.pathname = `/${[basePath, requestPath].filter(Boolean).join("/")}`;
  return base;
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
  return (
    getStringProperty(body, "message") ??
    `Kubernetes API request failed with status ${status}.`
  );
}

function getStringProperty(value: unknown, key: string): string | undefined {
  return typeof value === "object" &&
    value !== null &&
    key in value &&
    typeof value[key as keyof typeof value] === "string"
    ? value[key as keyof typeof value]
    : undefined;
}

function getObjectProperty(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null && key in value
    ? value[key as keyof typeof value]
    : undefined;
}
