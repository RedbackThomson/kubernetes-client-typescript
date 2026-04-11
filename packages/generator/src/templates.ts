import type { CodegenIr, GeneratedFile, ModelIr, ResourceDefinitionIr, ResourceGroupIr, ResourceIr, SubresourceIr } from "./types.js";
import { indent, propertyName } from "./naming.js";

export function renderFiles(ir: CodegenIr): GeneratedFile[] {
  return [
    { path: "models/index.ts", content: modelsFileTemplate(ir) },
    { path: "resources/index.ts", content: resourcesFileTemplate(ir) },
    { path: "index.ts", content: rootFileTemplate(ir) },
  ];
}

export function renderModel(model: ModelIr): string {
  if (model.indexSignature) {
    return `export interface ${model.name} {
  ${model.indexSignature}
}`;
  }

  return `export interface ${model.name} {
${model.fields.map((field) => `  ${field.name}${field.optional ? "?" : ""}: ${field.type};`).join("\n")}
}`;
}

function clientTreeInterfaceTemplate(groups: ResourceGroupIr[]): string {
  return groups
    .map(
      (group) => `  ${propertyName(group.propertyName)}: {
${group.versions
  .map(
    (version) => `    ${propertyName(version.propertyName)}: {
${version.resources
  .map((resource) => `      ${propertyName(resource.resourceProperty)}: ReturnType<typeof ${resource.factoryName}>;`)
  .join("\n")}
    };`,
  )
  .join("\n")}
  };`,
    )
    .join("\n");
}

function clientTreeValueTemplate(groups: ResourceGroupIr[]): string {
  return groups
    .map(
      (group) => `    ${propertyName(group.propertyName)}: {
${group.versions
  .map(
    (version) => `      ${propertyName(version.propertyName)}: {
${version.resources
  .map((resource) => `        ${propertyName(resource.resourceProperty)}: ${resource.factoryName}(client),`)
  .join("\n")}
      },`,
  )
  .join("\n")}
    },`,
    )
    .join("\n");
}

function modelImportsForResources(resources: ResourceIr[]): string[] {
  return [
    ...new Set(
      resources.flatMap((resource) => [
        resource.resourceType,
        resource.listType,
        ...resource.subresources.flatMap((subresource) => [subresource.resourceType, subresource.listType]),
      ]),
    ),
  ]
    .filter((name) => name !== "unknown")
    .sort();
}

function modelsFileTemplate(ir: CodegenIr): string {
  return `${ir.models.map(renderModel).join("\n\n")}\n`;
}

function renderResourceFactory(resource: ResourceIr): string {
  if (resource.subresources.length === 0) {
    return resourceFactoryTemplate(resource);
  }

  return resourceWithSubresourcesTemplate(resource);
}

function resourceDefinitionTemplate(definition: ResourceDefinitionIr): string {
  return `{
    apiVersion: ${JSON.stringify(definition.apiVersion)},
    plural: ${JSON.stringify(definition.plural)},
    namespaced: ${definition.namespaced},
  }`;
}

function resourceFactoryTemplate(resource: ResourceIr): string {
  return `export function ${resource.factoryName}(client: KubernetesClient): ResourceClient<${resource.resourceType}, ${resource.listType}, "${resource.scope}"> {
  return createResourceClient(client, ${resourceDefinitionTemplate(resource.definition)});
}`;
}

function resourceGroups(resources: ResourceIr[]): ResourceGroupIr[] {
  const groups = new Map<string, Map<string, ResourceIr[]>>();

  for (const resource of resources) {
    const versions = groups.get(resource.groupProperty) ?? new Map<string, ResourceIr[]>();
    const versionResources = versions.get(resource.versionProperty) ?? [];
    versionResources.push(resource);
    versions.set(resource.versionProperty, versionResources);
    groups.set(resource.groupProperty, versions);
  }

  return [...groups.entries()].map(([group, versions]) => ({
    propertyName: group,
    versions: [...versions.entries()].map(([version, resourcesForVersion]) => ({
      propertyName: version,
      resources: [...resourcesForVersion].sort((left, right) =>
        left.resourceProperty.localeCompare(right.resourceProperty),
      ),
    })),
  }));
}

function resourcesFileTemplate(ir: CodegenIr): string {
  const modelImports = modelImportsForResources(ir.resources);
  const imports = [
    `import { createResourceClient } from "${ir.runtimePackage}";`,
    `import type { KubernetesClient, ResourceClient } from "${ir.runtimePackage}";`,
    modelImports.length > 0 ? typeImportTemplate("../models/index.js", modelImports) : undefined,
  ].filter(Boolean);

  return `${imports.join("\n")}\n\n${ir.resources.map(renderResourceFactory).join("\n\n")}\n`;
}

function resourceWithSubresourcesTemplate(resource: ResourceIr): string {
  return `export interface ${resource.clientTypeName} extends ResourceClient<${resource.resourceType}, ${resource.listType}, "${resource.scope}"> {
${resource.subresources.map((subresource) => `  ${subresource.propertyName}: ResourceClient<${subresource.resourceType}, ${subresource.listType}, "${resource.scope}">;`).join("\n")}
}

export function ${resource.factoryName}(client: KubernetesClient): ${resource.clientTypeName} {
  const base = createResourceClient<${resource.resourceType}, ${resource.listType}, "${resource.scope}">(client, ${resourceDefinitionTemplate(resource.definition)});

  return {
    ...base,
${resource.subresources.map((subresource) => subresourceFactoryTemplate(resource, subresource)).join("\n")}
  };
}`;
}

function rootFileTemplate(ir: CodegenIr): string {
  const groups = resourceGroups(ir.resources);

  return `import { createClient, createResourceClient } from "${ir.runtimePackage}";
import type { ClientOptions, KubernetesClient, ResourceClient, ResponseSchema } from "${ir.runtimePackage}";
import { ${ir.resources.map((resource) => resource.factoryName).join(", ")} } from "./resources/index.js";

export * from "./models/index.js";
export * from "./resources/index.js";

export interface DynamicResourceOptions<TResource = unknown, TList = { items: TResource[] }> {
  apiVersion: string;
  kind: string;
  plural: string;
  namespaced: boolean;
  schema?: ResponseSchema<TResource>;
  listSchema?: ResponseSchema<TList>;
}

export interface KubernetesConvenienceClient {
${clientTreeInterfaceTemplate(groups)}
  resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: true },
  ): ResourceClient<TResource, TList, "namespaced">;
  resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },
  ): ResourceClient<TResource, TList, "cluster">;
}

export function createKubernetesClient(options: ClientOptions): KubernetesConvenienceClient {
  return createKubernetesClientFromRuntime(createClient(options));
}

export function createKubernetesClientFromRuntime(client: KubernetesClient): KubernetesConvenienceClient {
  return {
${clientTreeValueTemplate(groups)}
    resource: createDynamicResourceFactory(client),
  };
}

function createDynamicResourceFactory(client: KubernetesClient): KubernetesConvenienceClient["resource"] {
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: true },
  ): ResourceClient<TResource, TList, "namespaced">;
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },
  ): ResourceClient<TResource, TList, "cluster">;
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList>,
  ): ResourceClient<TResource, TList, "namespaced"> | ResourceClient<TResource, TList, "cluster"> {
    return createResourceClient(
      client,
      {
        apiVersion: options.apiVersion,
        plural: options.plural,
        namespaced: options.namespaced,
      },
      options.schema,
      options.listSchema,
    );
  }

  return resource;
}
`;
}

function subresourceFactoryTemplate(resource: ResourceIr, subresource: SubresourceIr): string {
  return `    ${subresource.propertyName}: createResourceClient<${subresource.resourceType}, ${subresource.listType}, "${resource.scope}">(
      client,
      ${indent(resourceDefinitionTemplate(resource.definition), 6)},
      undefined,
      undefined,
      ${JSON.stringify(subresource.name)},
    ),`;
}

function typeImportTemplate(from: string, names: string[]): string {
  return `import type {
${names.map((name) => `  ${name},`).join("\n")}
} from "${from}";`;
}
