import { createClient, createResourceClient } from "@kubernetes-typescript/runtime";
import type { ClientOptions, KubernetesClient, ResourceClient, ResponseSchema } from "@kubernetes-typescript/runtime";
import { deployments, namespaces, pods } from "./resources/index.js";

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
  core: {
    v1: {
      pods: ReturnType<typeof pods>;
      namespaces: ReturnType<typeof namespaces>;
    };
  };
  apps: {
    v1: {
      deployments: ReturnType<typeof deployments>;
    };
  };
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
    core: {
      v1: {
        pods: pods(client),
        namespaces: namespaces(client),
      },
    },
    apps: {
      v1: {
        deployments: deployments(client),
      },
    },
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
