export type ResourceType =
  | "deployments"
  | "pods"
  | "services"
  | "configmaps"
  | "secrets"
  | "crds";

export interface ResourceTypeInfo {
  id: ResourceType;
  label: string;
  group: string;
}

export const RESOURCE_TYPES: ResourceTypeInfo[] = [
  { id: "deployments", label: "Deployments", group: "apps/v1" },
  { id: "pods", label: "Pods", group: "core/v1" },
  { id: "services", label: "Services", group: "core/v1" },
  { id: "configmaps", label: "ConfigMaps", group: "core/v1" },
  { id: "secrets", label: "Secrets", group: "core/v1" },
  {
    id: "crds",
    label: "Custom Resource Definitions",
    group: "apiextensions/v1",
  },
];
