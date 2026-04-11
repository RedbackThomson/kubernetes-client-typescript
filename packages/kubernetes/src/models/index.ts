export interface ObjectMeta {
  name?: string;
  namespace?: string;
  labels?: Record<string, string>;
  annotations?: Record<string, string>;
  resourceVersion?: string;
}

export interface ListMeta {
  continue?: string;
  resourceVersion?: string;
}

export interface KubernetesList<TItem> {
  apiVersion?: string;
  kind?: string;
  metadata?: ListMeta;
  items: TItem[];
}

export interface V1Pod {
  apiVersion?: "v1";
  kind?: "Pod";
  metadata?: ObjectMeta;
  spec?: Record<string, unknown>;
  status?: Record<string, unknown>;
}

export interface V1PodList extends KubernetesList<V1Pod> {
  apiVersion?: "v1";
  kind?: "PodList";
}

export interface V1Namespace {
  apiVersion?: "v1";
  kind?: "Namespace";
  metadata?: ObjectMeta;
  spec?: Record<string, unknown>;
  status?: Record<string, unknown>;
}

export interface V1NamespaceList extends KubernetesList<V1Namespace> {
  apiVersion?: "v1";
  kind?: "NamespaceList";
}

export interface V1Deployment {
  apiVersion?: "apps/v1";
  kind?: "Deployment";
  metadata?: ObjectMeta;
  spec?: Record<string, unknown>;
  status?: Record<string, unknown>;
}

export interface V1DeploymentList extends KubernetesList<V1Deployment> {
  apiVersion?: "apps/v1";
  kind?: "DeploymentList";
}

export interface V1Scale {
  apiVersion?: string;
  kind?: "Scale";
  metadata?: ObjectMeta;
  spec?: {
    replicas?: number;
  };
  status?: {
    replicas?: number;
    selector?: string;
  };
}

