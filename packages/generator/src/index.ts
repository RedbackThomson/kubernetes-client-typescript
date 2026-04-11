import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export interface CodegenConfig {
  clientName?: string;
  apiStyle?: "kubernetes";
  resources?: {
    include?: string[];
  };
  verbs?: {
    default?: Array<"get" | "list" | "create" | "update" | "patch" | "delete">;
  };
  runtimePackage?: string;
}

export interface GenerateOptions {
  input: string;
  output: string;
  config?: CodegenConfig;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GeneratedClient {
  files: GeneratedFile[];
  resources: GeneratedResource[];
  models: GeneratedModel[];
}

export interface GeneratedModel {
  key: string;
  name: string;
  content: string;
}

export interface GeneratedResource {
  apiVersion: string;
  groupProperty: string;
  versionProperty: string;
  plural: string;
  resourceProperty: string;
  factoryName: string;
  resourceType: string;
  listType: string;
  scope: "namespaced" | "cluster";
  subresources: GeneratedSubresource[];
}

export interface GeneratedSubresource {
  name: string;
  resourceType: string;
  listType: string;
}

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
type ResourceVerb = "get" | "list" | "create" | "update" | "patch" | "delete";

interface OpenApiDocument {
  definitions?: Record<string, JsonSchema>;
  components?: {
    schemas?: Record<string, JsonSchema>;
  };
  paths?: Record<string, Partial<Record<HttpMethod, OpenApiOperation>>>;
}

interface OpenApiOperation {
  operationId?: string;
  responses?: Record<string, OpenApiResponse>;
}

interface OpenApiResponse {
  schema?: JsonSchema;
  content?: Record<string, { schema?: JsonSchema }>;
}

interface JsonSchema {
  $ref?: string;
  type?: string;
  format?: string;
  properties?: Record<string, JsonSchema>;
  additionalProperties?: boolean | JsonSchema;
  items?: JsonSchema;
  required?: string[];
  enum?: unknown[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  allOf?: JsonSchema[];
}

interface ResourceAccumulator {
  apiVersion: string;
  plural: string;
  scope: "namespaced" | "cluster";
  verbs: Set<ResourceVerb>;
  resourceType?: string;
  listType?: string;
  subresources: Map<string, GeneratedSubresource>;
}

interface ParsedResourcePath {
  apiVersion: string;
  plural: string;
  scope: "namespaced" | "cluster";
  named: boolean;
  subresource?: string;
}

export function defineCodegenConfig(config: CodegenConfig): CodegenConfig {
  return config;
}

export async function generate(
  options: GenerateOptions,
): Promise<GeneratedClient> {
  const input = await readFile(options.input, "utf8");
  const document = JSON.parse(input) as OpenApiDocument;
  const generated = generateClient(document, options.config);

  await writeGeneratedFiles(options.output, generated.files);

  return generated;
}

export function generateClient(
  document: OpenApiDocument,
  config: CodegenConfig = {},
): GeneratedClient {
  const runtimePackage =
    config.runtimePackage ?? "@kubernetes-typescript/runtime";
  const schemas = getSchemas(document);
  const modelNameMap = createModelNameMap(schemas);
  const models = generateModels(schemas, modelNameMap);
  const resources = discoverResources(document, config, models);
  const files = [
    {
      path: "models/index.ts",
      content: renderModels(models),
    },
    {
      path: "resources/index.ts",
      content: renderResources(resources, runtimePackage),
    },
    {
      path: "index.ts",
      content: renderRoot(resources, runtimePackage),
    },
  ];

  return { files, resources, models };
}

async function writeGeneratedFiles(
  output: string,
  files: GeneratedFile[],
): Promise<void> {
  for (const file of files) {
    const fullPath = join(output, file.path);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, file.content, "utf8");
  }
}

function generateModels(
  schemas: Record<string, JsonSchema>,
  modelNameMap: Map<string, string>,
): GeneratedModel[] {
  return Object.entries(schemas)
    .map(([key, schema]) => ({
      key,
      name: modelNameMap.get(key) ?? modelNameFromSchemaKey(key),
      content: renderModelInterface(
        modelNameMap.get(key) ?? modelNameFromSchemaKey(key),
        schema,
        modelNameMap,
      ),
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function renderModels(models: GeneratedModel[]): string {
  return `${models.map((model) => model.content).join("\n\n")}\n`;
}

function renderModelInterface(
  name: string,
  schema: JsonSchema,
  modelNameMap: Map<string, string>,
): string {
  const required = new Set(schema.required ?? []);
  const properties = Object.entries(schema.properties ?? {});

  if (properties.length === 0) {
    return `export interface ${name} {\n  [key: string]: unknown;\n}`;
  }

  const lines = properties
    .sort(([left], [right]) => left.localeCompare(right))
    .map(
      ([property, propertySchema]) =>
        `  ${propertyName(property)}${required.has(property) ? "" : "?"}: ${tsType(propertySchema, modelNameMap)};`,
    );

  return `export interface ${name} {\n${lines.join("\n")}\n}`;
}

function discoverResources(
  document: OpenApiDocument,
  config: CodegenConfig,
  models: GeneratedModel[],
): GeneratedResource[] {
  const resources = new Map<string, ResourceAccumulator>();
  const include = config.resources?.include ?? ["*"];
  const modelNamesByKey = new Map(
    models.map((model) => [model.key, model.name]),
  );

  for (const [openApiPath, pathItem] of Object.entries(document.paths ?? {})) {
    const parsed = parseResourcePath(openApiPath);
    if (!parsed || !isIncluded(parsed.plural, include)) {
      continue;
    }

    for (const [method, operation] of Object.entries(pathItem) as Array<
      [HttpMethod, OpenApiOperation | undefined]
    >) {
      if (!operation) {
        continue;
      }

      const verb = resourceVerb(method, parsed);
      if (!verb) {
        continue;
      }

      const key = resourceKey(parsed);
      const accumulator = resources.get(key) ?? {
        apiVersion: parsed.apiVersion,
        plural: parsed.plural,
        scope: parsed.scope,
        verbs: new Set<ResourceVerb>(),
        subresources: new Map<string, GeneratedSubresource>(),
      };
      const responseType = responseTypeName(operation, modelNamesByKey);

      accumulator.verbs.add(verb);
      if (parsed.subresource) {
        accumulator.subresources.set(parsed.subresource, {
          name: parsed.subresource,
          resourceType: responseType ?? "unknown",
          listType: responseType ?? "unknown",
        });
      } else if (verb === "list") {
        accumulator.listType = responseType ?? accumulator.listType;
      } else {
        accumulator.resourceType = responseType ?? accumulator.resourceType;
      }

      resources.set(key, accumulator);
    }
  }

  const discovered = [...resources.values()]
    .filter((resource) => resource.resourceType && resource.listType)
    .map((resource) => ({
      apiVersion: resource.apiVersion,
      groupProperty: groupProperty(resource.apiVersion),
      versionProperty: versionProperty(resource.apiVersion),
      plural: resource.plural,
      resourceProperty: identifier(resource.plural),
      factoryName: identifier(resource.plural),
      resourceType: resource.resourceType ?? "unknown",
      listType: resource.listType ?? "unknown",
      scope: resource.scope,
      subresources: [...resource.subresources.values()].sort((left, right) =>
        left.name.localeCompare(right.name),
      ),
    }));
  const factoryNameCounts = countBy(
    discovered.map((resource) => resource.factoryName),
  );

  return discovered
    .map((resource) => ({
      ...resource,
      factoryName:
        (factoryNameCounts.get(resource.factoryName) ?? 0) > 1
          ? identifier(
              `${resource.groupProperty}-${resource.versionProperty}-${resource.plural}`,
            )
          : resource.factoryName,
    }))
    .sort((left, right) =>
      [left.groupProperty, left.versionProperty, left.factoryName]
        .join(".")
        .localeCompare(
          [right.groupProperty, right.versionProperty, right.factoryName].join(
            ".",
          ),
        ),
    );
}

function renderResources(
  resources: GeneratedResource[],
  runtimePackage: string,
): string {
  const modelImports = [
    ...new Set(
      resources.flatMap((resource) => [
        resource.resourceType,
        resource.listType,
        ...resource.subresources.flatMap((subresource) => [
          subresource.resourceType,
          subresource.listType,
        ]),
      ]),
    ),
  ]
    .filter((name) => name !== "unknown")
    .sort();
  const imports = [
    `import { createResourceClient } from "${runtimePackage}";`,
    `import type { KubernetesClient, ResourceClient } from "${runtimePackage}";`,
    modelImports.length > 0
      ? `import type {\n${modelImports.map((name) => `  ${name},`).join("\n")}\n} from "../models/index.js";`
      : undefined,
  ].filter(Boolean);

  return `${imports.join("\n")}\n\n${resources.map(renderResourceFactory).join("\n\n")}\n`;
}

function renderResourceFactory(resource: GeneratedResource): string {
  const scope = resource.scope === "namespaced" ? "namespaced" : "cluster";
  const clientTypeName = `${pascalCase(resource.factoryName)}Client`;
  const definition = `{\n    apiVersion: ${JSON.stringify(resource.apiVersion)},\n    plural: ${JSON.stringify(resource.plural)},\n    namespaced: ${resource.scope === "namespaced"},\n  }`;

  if (resource.subresources.length === 0) {
    return `export function ${resource.factoryName}(client: KubernetesClient): ResourceClient<${resource.resourceType}, ${resource.listType}, "${scope}"> {\n  return createResourceClient(client, ${definition});\n}`;
  }

  const subresourceProperties = resource.subresources
    .map(
      (subresource) =>
        `  ${propertyName(subresource.name)}: ResourceClient<${subresource.resourceType}, ${subresource.listType}, "${scope}">;`,
    )
    .join("\n");
  const subresourceFactories = resource.subresources
    .map(
      (subresource) =>
        `    ${propertyName(subresource.name)}: createResourceClient<${subresource.resourceType}, ${subresource.listType}, "${scope}">(\n      client,\n      ${definition.replace(/\n/g, "\n      ")},\n      undefined,\n      undefined,\n      ${JSON.stringify(subresource.name)},\n    ),`,
    )
    .join("\n");

  return `export interface ${clientTypeName} extends ResourceClient<${resource.resourceType}, ${resource.listType}, "${scope}"> {\n${subresourceProperties}\n}\n\nexport function ${resource.factoryName}(client: KubernetesClient): ${clientTypeName} {\n  const base = createResourceClient<${resource.resourceType}, ${resource.listType}, "${scope}">(client, ${definition});\n\n  return {\n    ...base,\n${subresourceFactories}\n  };\n}`;
}

function renderRoot(
  resources: GeneratedResource[],
  runtimePackage: string,
): string {
  const factoryNames = resources.map((resource) => resource.factoryName);
  const tree = resourceTree(resources);

  return `import { createClient, createResourceClient } from "${runtimePackage}";\nimport type { ClientOptions, KubernetesClient, ResourceClient, ResponseSchema } from "${runtimePackage}";\nimport { ${factoryNames.join(", ")} } from "./resources/index.js";\n\nexport * from "./models/index.js";\nexport * from "./resources/index.js";\n\nexport interface DynamicResourceOptions<TResource = unknown, TList = { items: TResource[] }> {\n  apiVersion: string;\n  kind: string;\n  plural: string;\n  namespaced: boolean;\n  schema?: ResponseSchema<TResource>;\n  listSchema?: ResponseSchema<TList>;\n}\n\nexport interface KubernetesConvenienceClient {\n${renderClientTreeInterface(tree)}\n  resource<TResource, TList = { items: TResource[] }>(\n    options: DynamicResourceOptions<TResource, TList> & { namespaced: true },\n  ): ResourceClient<TResource, TList, "namespaced">;\n  resource<TResource, TList = { items: TResource[] }>(\n    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },\n  ): ResourceClient<TResource, TList, "cluster">;\n}\n\nexport function createKubernetesClient(options: ClientOptions): KubernetesConvenienceClient {\n  return createKubernetesClientFromRuntime(createClient(options));\n}\n\nexport function createKubernetesClientFromRuntime(client: KubernetesClient): KubernetesConvenienceClient {\n  return {\n${renderClientTreeValue(tree)}\n    resource: createDynamicResourceFactory(client),\n  };\n}\n\nfunction createDynamicResourceFactory(client: KubernetesClient): KubernetesConvenienceClient["resource"] {\n  function resource<TResource, TList = { items: TResource[] }>(\n    options: DynamicResourceOptions<TResource, TList> & { namespaced: true },\n  ): ResourceClient<TResource, TList, "namespaced">;\n  function resource<TResource, TList = { items: TResource[] }>(\n    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },\n  ): ResourceClient<TResource, TList, "cluster">;\n  function resource<TResource, TList = { items: TResource[] }>(\n    options: DynamicResourceOptions<TResource, TList>,\n  ): ResourceClient<TResource, TList, "namespaced"> | ResourceClient<TResource, TList, "cluster"> {\n    return createResourceClient(\n      client,\n      {\n        apiVersion: options.apiVersion,\n        plural: options.plural,\n        namespaced: options.namespaced,\n      },\n      options.schema,\n      options.listSchema,\n    );\n  }\n\n  return resource;\n}\n`;
}

function resourceTree(
  resources: GeneratedResource[],
): Map<string, Map<string, GeneratedResource[]>> {
  const tree = new Map<string, Map<string, GeneratedResource[]>>();
  for (const resource of resources) {
    const versions =
      tree.get(resource.groupProperty) ??
      new Map<string, GeneratedResource[]>();
    const versionResources = versions.get(resource.versionProperty) ?? [];
    versionResources.push(resource);
    versions.set(resource.versionProperty, versionResources);
    tree.set(resource.groupProperty, versions);
  }
  return tree;
}

function renderClientTreeInterface(
  tree: Map<string, Map<string, GeneratedResource[]>>,
): string {
  return [...tree.entries()]
    .map(([group, versions]) => {
      const versionLines = [...versions.entries()]
        .map(([version, resources]) => {
          const resourceLines = resources
            .sort((left, right) =>
              left.resourceProperty.localeCompare(right.resourceProperty),
            )
            .map(
              (resource) =>
                `      ${propertyName(resource.resourceProperty)}: ReturnType<typeof ${resource.factoryName}>;`,
            )
            .join("\n");
          return `    ${propertyName(version)}: {\n${resourceLines}\n    };`;
        })
        .join("\n");
      return `  ${propertyName(group)}: {\n${versionLines}\n  };`;
    })
    .join("\n");
}

function renderClientTreeValue(
  tree: Map<string, Map<string, GeneratedResource[]>>,
): string {
  return [...tree.entries()]
    .map(([group, versions]) => {
      const versionLines = [...versions.entries()]
        .map(([version, resources]) => {
          const resourceLines = resources
            .sort((left, right) =>
              left.resourceProperty.localeCompare(right.resourceProperty),
            )
            .map(
              (resource) =>
                `        ${propertyName(resource.resourceProperty)}: ${resource.factoryName}(client),`,
            )
            .join("\n");
          return `      ${propertyName(version)}: {\n${resourceLines}\n      },`;
        })
        .join("\n");
      return `    ${propertyName(group)}: {\n${versionLines}\n    },`;
    })
    .join("\n");
}

function parseResourcePath(
  openApiPath: string,
): ParsedResourcePath | undefined {
  const segments = openApiPath.replace(/^\/+|\/+$/g, "").split("/");
  let apiVersion: string;
  let resourceStart: number;

  if (segments[0] === "api" && segments[1]) {
    apiVersion = segments[1];
    resourceStart = 2;
  } else if (segments[0] === "apis" && segments[1] && segments[2]) {
    apiVersion = `${segments[1]}/${segments[2]}`;
    resourceStart = 3;
  } else {
    return undefined;
  }

  const namespaced =
    segments[resourceStart] === "namespaces" &&
    isPathParameter(segments[resourceStart + 1]) &&
    !!segments[resourceStart + 2];
  const pluralIndex = namespaced ? resourceStart + 2 : resourceStart;
  const plural = segments[pluralIndex];
  if (!plural || isPathParameter(plural)) {
    return undefined;
  }

  return {
    apiVersion,
    plural,
    scope: namespaced ? "namespaced" : "cluster",
    named: isPathParameter(segments[pluralIndex + 1]),
    subresource: isPathParameter(segments[pluralIndex + 1])
      ? segments[pluralIndex + 2]
      : undefined,
  };
}

function resourceVerb(
  method: HttpMethod,
  parsed: ParsedResourcePath,
): ResourceVerb | undefined {
  if (parsed.subresource) {
    if (method === "get") return "get";
    if (method === "put") return "update";
    if (method === "patch") return "patch";
    return undefined;
  }

  if (method === "get") return parsed.named ? "get" : "list";
  if (method === "post" && !parsed.named) return "create";
  if (method === "put" && parsed.named) return "update";
  if (method === "patch" && parsed.named) return "patch";
  if (method === "delete" && parsed.named) return "delete";
  return undefined;
}

function responseTypeName(
  operation: OpenApiOperation,
  modelNamesByKey: Map<string, string>,
): string | undefined {
  for (const status of ["200", "201", "202", "default"]) {
    const response = operation.responses?.[status];
    const schema = responseSchema(response);
    const ref = schemaRef(schema);
    if (ref) {
      return modelNamesByKey.get(schemaKeyFromRef(ref));
    }
  }
  return undefined;
}

function responseSchema(response?: OpenApiResponse): JsonSchema | undefined {
  if (!response) {
    return undefined;
  }
  if (response.schema) {
    return response.schema;
  }
  return Object.values(response.content ?? {}).find((content) => content.schema)
    ?.schema;
}

function schemaRef(schema?: JsonSchema): string | undefined {
  if (!schema) {
    return undefined;
  }
  return schema.$ref ?? schema.allOf?.find((item) => item.$ref)?.$ref;
}

function tsType(
  schema: JsonSchema | undefined,
  modelNameMap: Map<string, string>,
): string {
  if (!schema) {
    return "unknown";
  }
  if (schema.$ref) {
    return (
      modelNameMap.get(schemaKeyFromRef(schema.$ref)) ??
      modelNameFromRef(schema.$ref)
    );
  }
  if (schema.allOf && schema.allOf.length > 0) {
    return schema.allOf.map((item) => tsType(item, modelNameMap)).join(" & ");
  }
  if (schema.oneOf && schema.oneOf.length > 0) {
    return schema.oneOf.map((item) => tsType(item, modelNameMap)).join(" | ");
  }
  if (schema.anyOf && schema.anyOf.length > 0) {
    return schema.anyOf.map((item) => tsType(item, modelNameMap)).join(" | ");
  }
  if (schema.enum?.every((value) => typeof value === "string")) {
    return schema.enum.map((value) => JSON.stringify(value)).join(" | ");
  }
  if (schema.type === "array") {
    return `${tsType(schema.items, modelNameMap)}[]`;
  }
  if (
    schema.type === "object" ||
    schema.properties ||
    schema.additionalProperties
  ) {
    if (schema.properties) {
      const required = new Set(schema.required ?? []);
      const lines = Object.entries(schema.properties)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(
          ([property, propertySchema]) =>
            `${propertyName(property)}${required.has(property) ? "" : "?"}: ${tsType(propertySchema, modelNameMap)}`,
        );
      return `{ ${lines.join("; ")} }`;
    }
    if (
      schema.additionalProperties &&
      typeof schema.additionalProperties === "object"
    ) {
      return `Record<string, ${tsType(schema.additionalProperties, modelNameMap)}>`;
    }
    return "Record<string, unknown>";
  }
  if (schema.type === "integer" || schema.type === "number") {
    return "number";
  }
  if (schema.type === "boolean") {
    return "boolean";
  }
  if (schema.type === "string") {
    return "string";
  }
  return "unknown";
}

function getSchemas(document: OpenApiDocument): Record<string, JsonSchema> {
  return document.definitions ?? document.components?.schemas ?? {};
}

function createModelNameMap(
  schemas: Record<string, JsonSchema>,
): Map<string, string> {
  const baseNames = new Map<string, string>();
  for (const key of Object.keys(schemas)) {
    baseNames.set(key, modelNameFromSchemaKey(key));
  }

  const counts = countBy([...baseNames.values()]);
  return new Map(
    [...baseNames.entries()].map(([key, name]) => [
      key,
      (counts.get(name) ?? 0) > 1
        ? modelNameFromSchemaKey(key, { includeGroup: true })
        : name,
    ]),
  );
}

function modelNameFromRef(ref: string): string {
  return modelNameFromSchemaKey(schemaKeyFromRef(ref));
}

function schemaKeyFromRef(ref: string): string {
  return ref.replace(/^#\/(definitions|components\/schemas)\//, "");
}

function modelNameFromSchemaKey(
  key: string,
  options: { includeGroup?: boolean } = {},
): string {
  const parts = key.split(".");
  const rawName = parts.at(-1) ?? key;
  const version = lastVersionSegment(parts);
  const versionPrefix = version ? pascalCase(version) : "";
  const groupPrefix = options.includeGroup
    ? pascalCase(groupSegment(parts))
    : "";
  return rawName.startsWith(`${versionPrefix}${groupPrefix}`)
    ? rawName
    : `${versionPrefix}${groupPrefix}${rawName}`;
}

function groupSegment(parts: string[]): string {
  const apiIndex = parts.indexOf("api");
  if (apiIndex >= 0 && parts[apiIndex + 1]) {
    return parts[apiIndex + 1];
  }

  const apisIndex = parts.indexOf("apis");
  if (apisIndex >= 0 && parts[apisIndex + 1]) {
    return parts[apisIndex + 1];
  }

  return "kubernetes";
}

function countBy(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

function lastVersionSegment(parts: string[]): string | undefined {
  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const part = parts[index];
    if (part && /^v\d/.test(part)) {
      return part;
    }
  }
  return undefined;
}

function resourceKey(resource: ParsedResourcePath): string {
  return `${resource.apiVersion}|${resource.plural}|${resource.scope}`;
}

function groupProperty(apiVersion: string): string {
  if (apiVersion === "v1") {
    return "core";
  }
  const group = identifier(apiVersion.split("/")[0]?.split(".")[0] ?? "api");
  // `resource` is a special case in the convenience clients for custom
  // resources. Rename to `resourceApi` to avoid confusion.
  return group === "resource" ? "resourceApi" : group;
}

function versionProperty(apiVersion: string): string {
  return identifier(apiVersion.split("/").at(-1) ?? apiVersion);
}

function isIncluded(plural: string, include: string[]): boolean {
  return include.includes("*") || include.includes(plural);
}

function isPathParameter(segment: string | undefined): boolean {
  return !!segment && segment.startsWith("{") && segment.endsWith("}");
}

function propertyName(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

function identifier(value: string): string {
  const candidate = value
    .replace(/[-.](\w)/g, (_, char: string) => char.toUpperCase())
    .replace(/[^A-Za-z0-9_$]/g, "");
  const withSafeStart = /^[A-Za-z_$]/.test(candidate)
    ? candidate
    : `_${candidate}`;
  return withSafeStart.charAt(0).toLowerCase() + withSafeStart.slice(1);
}

function pascalCase(value: string): string {
  const identifierValue = identifier(value);
  return identifierValue.charAt(0).toUpperCase() + identifierValue.slice(1);
}
