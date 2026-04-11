import { createResourceClient } from "@kubernetes-typescript/runtime";
import type { KubernetesClient, ResourceClient } from "@kubernetes-typescript/runtime";
import type {
  V1Deployment,
  V1DeploymentList,
  V1Namespace,
  V1NamespaceList,
  V1Pod,
  V1PodList,
  V1Scale,
} from "../models/index.js";

export interface DeploymentClient extends ResourceClient<V1Deployment, V1DeploymentList, "namespaced"> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced">;
  status: ResourceClient<V1Deployment, V1Deployment, "namespaced">;
}

export function pods(client: KubernetesClient): ResourceClient<V1Pod, V1PodList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "pods",
    namespaced: true,
  });
}

export function namespaces(client: KubernetesClient): ResourceClient<V1Namespace, V1NamespaceList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "namespaces",
    namespaced: false,
  });
}

export function deployments(client: KubernetesClient): DeploymentClient {
  const base = createResourceClient<V1Deployment, V1DeploymentList, "namespaced">(client, {
    apiVersion: "apps/v1",
    plural: "deployments",
    namespaced: true,
  });

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced">(
      client,
      {
        apiVersion: "apps/v1",
        plural: "deployments",
        namespaced: true,
      },
      undefined,
      undefined,
      "scale",
    ),
    status: createResourceClient<V1Deployment, V1Deployment, "namespaced">(
      client,
      {
        apiVersion: "apps/v1",
        plural: "deployments",
        namespaced: true,
      },
      undefined,
      undefined,
      "status",
    ),
  };
}

