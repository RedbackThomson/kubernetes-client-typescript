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
  scope: ResourceScope;
  subresources: GeneratedSubresource[];
}

export interface GeneratedSubresource {
  name: string;
  resourceType: string;
  listType: string;
}

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";
export type ResourceScope = "namespaced" | "cluster";
export type ResourceVerb = "get" | "list" | "create" | "update" | "patch" | "delete";

export interface OpenApiDocument {
  definitions?: Record<string, JsonSchema>;
  components?: {
    schemas?: Record<string, JsonSchema>;
  };
  paths?: Record<string, Partial<Record<HttpMethod, OpenApiOperation>>>;
}

export interface OpenApiOperation {
  operationId?: string;
  responses?: Record<string, OpenApiResponse>;
}

export interface OpenApiResponse {
  schema?: JsonSchema;
  content?: Record<string, { schema?: JsonSchema }>;
}

export interface JsonSchema {
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

export interface CodegenIr {
  runtimePackage: string;
  models: ModelIr[];
  resources: ResourceIr[];
}

export interface ModelIr {
  key: string;
  name: string;
  fields: ModelFieldIr[];
  indexSignature?: string;
}

export interface ModelFieldIr {
  name: string;
  optional: boolean;
  type: string;
}

export interface ResourceIr {
  apiVersion: string;
  groupProperty: string;
  versionProperty: string;
  plural: string;
  resourceProperty: string;
  factoryName: string;
  clientTypeName: string;
  resourceType: string;
  listType: string;
  scope: ResourceScope;
  definition: ResourceDefinitionIr;
  subresources: SubresourceIr[];
}

export type DiscoveredResourceIr = Omit<ResourceIr, "clientTypeName" | "definition" | "subresources"> & {
  subresources: GeneratedSubresource[];
};

export interface SubresourceIr {
  name: string;
  propertyName: string;
  resourceType: string;
  listType: string;
}

export interface ResourceDefinitionIr {
  apiVersion: string;
  plural: string;
  namespaced: boolean;
}

export interface ResourceGroupIr {
  propertyName: string;
  versions: ResourceVersionIr[];
}

export interface ResourceVersionIr {
  propertyName: string;
  resources: ResourceIr[];
}

export interface ResourceAccumulator {
  apiVersion: string;
  plural: string;
  scope: ResourceScope;
  verbs: Set<ResourceVerb>;
  resourceType?: string;
  listType?: string;
  subresources: Map<string, GeneratedSubresource>;
}

export interface ParsedResourcePath {
  apiVersion: string;
  plural: string;
  scope: ResourceScope;
  named: boolean;
  subresource?: string;
}
