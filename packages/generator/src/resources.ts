import type {
  CodegenConfig,
  DiscoveredResourceIr,
  GeneratedSubresource,
  HttpMethod,
  OpenApiDocument,
  OpenApiOperation,
  ParsedResourcePath,
  ResourceAccumulator,
  ResourceVerb,
} from "./types.js";
import { groupProperty, identifier, isIncluded, isPathParameter, versionProperty } from "./naming.js";
import { responseTypeName } from "./schema.js";

export function discoverResources(
  document: OpenApiDocument,
  config: CodegenConfig,
  modelNamesByKey: Map<string, string>,
): DiscoveredResourceIr[] {
  const resources = new Map<string, ResourceAccumulator>();
  const include = config.resources?.include ?? ["*"];

  for (const [openApiPath, pathItem] of Object.entries(document.paths ?? {})) {
    const parsed = parseResourcePath(openApiPath);
    if (!parsed || !isIncluded(parsed.plural, include)) {
      continue;
    }

    for (const [method, operation] of Object.entries(pathItem) as Array<[HttpMethod, OpenApiOperation | undefined]>) {
      if (!operation) {
        continue;
      }

      const verb = resourceVerb(method, parsed);
      if (!verb) {
        continue;
      }

      const key = resourceKey(parsed);
      const accumulator =
        resources.get(key) ??
        {
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

  return [...resources.values()]
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
      subresources: [...resource.subresources.values()].sort((left, right) => left.name.localeCompare(right.name)),
    }));
}

function parseResourcePath(openApiPath: string): ParsedResourcePath | undefined {
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
    subresource: isPathParameter(segments[pluralIndex + 1]) ? segments[pluralIndex + 2] : undefined,
  };
}

function resourceKey(resource: ParsedResourcePath): string {
  return `${resource.apiVersion}|${resource.plural}|${resource.scope}`;
}

function resourceVerb(method: HttpMethod, parsed: ParsedResourcePath): ResourceVerb | undefined {
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
