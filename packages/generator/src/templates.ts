import type { CodegenIr, GeneratedFile, ModelIr, ResourceDefinitionIr, ResourceGroupIr, ResourceIr, SubresourceIr, VerbOptionsIr } from "./types.js";
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

function renderResourceFactory(resource: ResourceIr, vo?: VerbOptionsIr): string {
  if (resource.subresources.length === 0) {
    return resourceFactoryTemplate(resource, vo);
  }

  return resourceWithSubresourcesTemplate(resource, vo);
}

function resourceDefinitionTemplate(definition: ResourceDefinitionIr): string {
  return `{
    apiVersion: ${JSON.stringify(definition.apiVersion)},
    plural: ${JSON.stringify(definition.plural)},
    namespaced: ${definition.namespaced},
  }`;
}

function resourceClientType(resourceType: string, listType: string, scope: string, vo?: VerbOptionsIr): string {
  return vo
    ? `ResourceClient<${resourceType}, ${listType}, "${scope}", ${vo.typeName}>`
    : `ResourceClient<${resourceType}, ${listType}, "${scope}">`;
}

function subresourceClientType(resourceType: string, listType: string, scope: string, vo?: VerbOptionsIr): string {
  return vo
    ? `SubresourceClient<${resourceType}, ${listType}, "${scope}", ${vo.typeName}>`
    : `SubresourceClient<${resourceType}, ${listType}, "${scope}">`;
}

function createResourceClientCall(
  resource: ResourceIr,
  vo?: VerbOptionsIr,
): string {
  const typeParams = vo
    ? `<${resource.resourceType}, ${resource.listType}, "${resource.scope}", ${vo.typeName}>`
    : `<${resource.resourceType}, ${resource.listType}, "${resource.scope}">`;

  const args: string[] = [
    "client",
    resourceDefinitionTemplate(resource.definition),
  ];

  if (vo) {
    args.push("undefined", "undefined", "undefined", vo.queryMapperName);
  }

  return `createResourceClient${typeParams}(${args.join(", ")})`;
}

function resourceFactoryTemplate(resource: ResourceIr, vo?: VerbOptionsIr): string {
  const returnType = resourceClientType(resource.resourceType, resource.listType, resource.scope, vo);
  return `export function ${resource.factoryName}(client: KubernetesClient): ${returnType} {
  return ${createResourceClientCall(resource, vo)};
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
  const vo = ir.verbOptions;
  const hasSubresources = ir.resources.some((r) => r.subresources.length > 0);
  const runtimeValueImports = hasSubresources
    ? `import { createResourceClient, createSubresourceClient } from "${ir.runtimePackage}";`
    : `import { createResourceClient } from "${ir.runtimePackage}";`;
  const runtimeTypeImports = hasSubresources
    ? `import type { KubernetesClient, ResourceClient, SubresourceClient } from "${ir.runtimePackage}";`
    : `import type { KubernetesClient, ResourceClient } from "${ir.runtimePackage}";`;
  const imports = [
    runtimeValueImports,
    runtimeTypeImports,
    vo ? `import { ${vo.queryMapperName} } from "${vo.resourcesImportPath}";` : undefined,
    vo ? `import type { ${vo.typeName} } from "${vo.resourcesImportPath}";` : undefined,
    modelImports.length > 0 ? typeImportTemplate("../models/index.js", modelImports) : undefined,
  ].filter(Boolean);

  return `${imports.join("\n")}\n\n${ir.resources.map((r) => renderResourceFactory(r, vo)).join("\n\n")}\n`;
}

function resourceWithSubresourcesTemplate(resource: ResourceIr, vo?: VerbOptionsIr): string {
  const baseType = resourceClientType(resource.resourceType, resource.listType, resource.scope, vo);
  const subresourceTypes = resource.subresources
    .map((subresource) => `  ${subresource.propertyName}: ${subresourceClientType(subresource.resourceType, subresource.listType, resource.scope, vo)};`)
    .join("\n");

  return `export interface ${resource.clientTypeName} extends ${baseType} {
${subresourceTypes}
}

export function ${resource.factoryName}(client: KubernetesClient): ${resource.clientTypeName} {
  const base = ${createResourceClientCall(resource, vo)};

  return {
    ...base,
${resource.subresources.map((subresource) => subresourceFactoryTemplate(resource, subresource, vo)).join("\n")}
  };
}`;
}

function rootFileTemplate(ir: CodegenIr): string {
  const groups = resourceGroups(ir.resources);
  const vo = ir.verbOptions;

  const runtimeImports = vo
    ? `import { createClient, createResourceClient } from "${ir.runtimePackage}";
import type { ClientOptions, KubernetesClient, ResourceClient, ResponseSchema } from "${ir.runtimePackage}";
import { ${vo.queryMapperName} } from "${vo.rootImportPath}";
import type { ${vo.typeName} } from "${vo.rootImportPath}";`
    : `import { createClient, createResourceClient } from "${ir.runtimePackage}";
import type { ClientOptions, KubernetesClient, ResourceClient, ResponseSchema } from "${ir.runtimePackage}";`;

  const rcNamespaced = vo
    ? `ResourceClient<TResource, TList, "namespaced", ${vo.typeName}>`
    : `ResourceClient<TResource, TList, "namespaced">`;
  const rcCluster = vo
    ? `ResourceClient<TResource, TList, "cluster", ${vo.typeName}>`
    : `ResourceClient<TResource, TList, "cluster">`;

  const dynamicCreateArgs = vo
    ? `      client,
      {
        apiVersion: options.apiVersion,
        plural: options.plural,
        namespaced: options.namespaced,
      },
      options.schema,
      options.listSchema,
      undefined,
      ${vo.queryMapperName},`
    : `      client,
      {
        apiVersion: options.apiVersion,
        plural: options.plural,
        namespaced: options.namespaced,
      },
      options.schema,
      options.listSchema,`;

  return `${runtimeImports}
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
  ): ${rcNamespaced};
  resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },
  ): ${rcCluster};
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
  ): ${rcNamespaced};
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },
  ): ${rcCluster};
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList>,
  ): ${rcNamespaced} | ${rcCluster} {
    return createResourceClient(
${dynamicCreateArgs}
    );
  }

  return resource;
}
`;
}

function subresourceFactoryTemplate(resource: ResourceIr, subresource: SubresourceIr, vo?: VerbOptionsIr): string {
  const typeParams = vo
    ? `<${subresource.resourceType}, ${subresource.listType}, "${resource.scope}", ${vo.typeName}>`
    : `<${subresource.resourceType}, ${subresource.listType}, "${resource.scope}">`;

  const args = [
    "client",
    indent(resourceDefinitionTemplate(resource.definition), 6),
    "undefined",
    "undefined",
    JSON.stringify(subresource.name),
    vo ? vo.queryMapperName : undefined,
  ].filter(Boolean);

  return `    ${subresource.propertyName}: createSubresourceClient${typeParams}(
      ${args.join(",\n      ")},
    ),`;
}

function typeImportTemplate(from: string, names: string[]): string {
  return `import type {
${names.map((name) => `  ${name},`).join("\n")}
} from "${from}";`;
}
