import type { JsonSchema, OpenApiDocument, OpenApiOperation, OpenApiResponse } from "./types.js";
import { countBy, pascalCase, propertyName } from "./naming.js";

export function createModelNameMap(schemas: Record<string, JsonSchema>): Map<string, string> {
  const baseNames = new Map<string, string>();
  for (const key of Object.keys(schemas)) {
    baseNames.set(key, modelNameFromSchemaKey(key));
  }

  const counts = countBy([...baseNames.values()]);
  return new Map(
    [...baseNames.entries()].map(([key, name]) => [
      key,
      (counts.get(name) ?? 0) > 1 ? modelNameFromSchemaKey(key, { includeGroup: true }) : name,
    ]),
  );
}

export function getSchemas(document: OpenApiDocument): Record<string, JsonSchema> {
  return document.definitions ?? document.components?.schemas ?? {};
}

export function modelNameFromRef(ref: string): string {
  return modelNameFromSchemaKey(schemaKeyFromRef(ref));
}

export function modelNameFromSchemaKey(key: string, options: { includeGroup?: boolean } = {}): string {
  const parts = key.split(".");
  const rawName = parts.at(-1) ?? key;
  const version = lastVersionSegment(parts);
  const versionPrefix = version ? pascalCase(version) : "";
  const groupPrefix = options.includeGroup ? pascalCase(groupSegment(parts)) : "";
  return rawName.startsWith(`${versionPrefix}${groupPrefix}`)
    ? rawName
    : `${versionPrefix}${groupPrefix}${rawName}`;
}

export function responseTypeName(operation: OpenApiOperation, modelNamesByKey: Map<string, string>): string | undefined {
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

export function schemaKeyFromRef(ref: string): string {
  return ref.replace(/^#\/(definitions|components\/schemas)\//, "");
}

export function tsType(schema: JsonSchema | undefined, modelNameMap: Map<string, string>): string {
  if (!schema) {
    return "unknown";
  }
  if (schema.$ref) {
    return modelNameMap.get(schemaKeyFromRef(schema.$ref)) ?? modelNameFromRef(schema.$ref);
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
  if (schema.type === "object" || schema.properties || schema.additionalProperties) {
    if (schema.properties) {
      const required = new Set(schema.required ?? []);
      const fields = Object.entries(schema.properties)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(
          ([field, fieldSchema]) =>
            `${propertyName(field)}${required.has(field) ? "" : "?"}: ${tsType(fieldSchema, modelNameMap)}`,
        );
      return `{ ${fields.join("; ")} }`;
    }
    if (schema.additionalProperties && typeof schema.additionalProperties === "object") {
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

function lastVersionSegment(parts: string[]): string | undefined {
  for (let index = parts.length - 1; index >= 0; index -= 1) {
    const part = parts[index];
    if (part && /^v\d/.test(part)) {
      return part;
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
  return Object.values(response.content ?? {}).find((content) => content.schema)?.schema;
}

function schemaRef(schema?: JsonSchema): string | undefined {
  if (!schema) {
    return undefined;
  }
  return schema.$ref ?? schema.allOf?.find((item) => item.$ref)?.$ref;
}
