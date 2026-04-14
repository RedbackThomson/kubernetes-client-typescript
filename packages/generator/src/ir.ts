import type {
  CodegenConfig,
  CodegenIr,
  GeneratedResource,
  JsonSchema,
  ModelIr,
  OpenApiDocument,
  ResourceIr,
} from "./types.js";
import { countBy, identifier, pascalCase, propertyName } from "./naming.js";
import { createModelNameMap, getSchemas, modelNameFromSchemaKey, tsType } from "./schema.js";
import { discoverResources } from "./resources.js";

export function buildCodegenIr(document: OpenApiDocument, config: CodegenConfig): CodegenIr {
  const runtimePackage = config.runtimePackage ?? "@kubernetes-typescript/runtime";
  const schemas = getSchemas(document);
  const modelNameMap = createModelNameMap(schemas);
  const models = buildModelIr(schemas, modelNameMap);
  const resources = buildResourceIr(document, config, models);

  return {
    runtimePackage,
    verbOptions: config.verbOptions,
    models,
    resources,
  };
}

export function toGeneratedResource(resource: ResourceIr): GeneratedResource {
  return {
    apiVersion: resource.apiVersion,
    groupProperty: resource.groupProperty,
    versionProperty: resource.versionProperty,
    plural: resource.plural,
    resourceProperty: resource.resourceProperty,
    factoryName: resource.factoryName,
    resourceType: resource.resourceType,
    listType: resource.listType,
    scope: resource.scope,
    subresources: resource.subresources.map((subresource) => ({
      name: subresource.name,
      resourceType: subresource.resourceType,
      listType: subresource.listType,
    })),
  };
}

function buildModelIr(schemas: Record<string, JsonSchema>, modelNameMap: Map<string, string>): ModelIr[] {
  return Object.entries(schemas)
    .map(([key, schema]) => {
      const name = modelNameMap.get(key) ?? modelNameFromSchemaKey(key);
      const required = new Set(schema.required ?? []);
      const properties = Object.entries(schema.properties ?? {});

      if (properties.length === 0) {
        return {
          key,
          name,
          fields: [],
          indexSignature: "[key: string]: unknown;",
        };
      }

      return {
        key,
        name,
        fields: properties
          .sort(([left], [right]) => left.localeCompare(right))
          .map(([fieldName, fieldSchema]) => ({
            name: propertyName(fieldName),
            optional: !required.has(fieldName),
            type: tsType(fieldSchema, modelNameMap),
          })),
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

function buildResourceIr(document: OpenApiDocument, config: CodegenConfig, models: ModelIr[]): ResourceIr[] {
  const discovered = discoverResources(document, config, new Map(models.map((model) => [model.key, model.name])));
  const factoryNameCounts = countBy(discovered.map((resource) => resource.factoryName));

  return discovered
    .map((resource) => {
      const factoryName =
        (factoryNameCounts.get(resource.factoryName) ?? 0) > 1
          ? identifier(`${resource.groupProperty}-${resource.versionProperty}-${resource.plural}`)
          : resource.factoryName;

      return {
        ...resource,
        factoryName,
        clientTypeName: `${pascalCase(factoryName)}Client`,
        definition: {
          apiVersion: resource.apiVersion,
          plural: resource.plural,
          namespaced: resource.scope === "namespaced",
        },
        subresources: resource.subresources.map((subresource) => ({
          ...subresource,
          propertyName: propertyName(subresource.name),
        })),
      };
    })
    .sort((left, right) =>
      [left.groupProperty, left.versionProperty, left.factoryName]
        .join(".")
        .localeCompare([right.groupProperty, right.versionProperty, right.factoryName].join(".")),
    );
}
