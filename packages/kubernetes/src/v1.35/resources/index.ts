import { createResourceClient } from "@kubernetes-typescript/runtime";
import type { KubernetesClient, ResourceClient } from "@kubernetes-typescript/runtime";
import type {
  V1APIService,
  V1APIServiceList,
  V1CSIDriver,
  V1CSIDriverList,
  V1CSINode,
  V1CSINodeList,
  V1CSIStorageCapacity,
  V1CSIStorageCapacityList,
  V1CertificateSigningRequest,
  V1CertificateSigningRequestList,
  V1ClusterRole,
  V1ClusterRoleBinding,
  V1ClusterRoleBindingList,
  V1ClusterRoleList,
  V1ComponentStatus,
  V1ComponentStatusList,
  V1ConfigMap,
  V1ConfigMapList,
  V1ControllerRevision,
  V1ControllerRevisionList,
  V1CoreEvent,
  V1CoreEventList,
  V1CronJob,
  V1CronJobList,
  V1CustomResourceDefinition,
  V1CustomResourceDefinitionList,
  V1DaemonSet,
  V1DaemonSetList,
  V1Deployment,
  V1DeploymentList,
  V1DeviceClass,
  V1DeviceClassList,
  V1EndpointSlice,
  V1EndpointSliceList,
  V1Endpoints,
  V1EndpointsList,
  V1EventsEvent,
  V1EventsEventList,
  V1FlowSchema,
  V1FlowSchemaList,
  V1HorizontalPodAutoscaler,
  V1HorizontalPodAutoscalerList,
  V1IPAddress,
  V1IPAddressList,
  V1Ingress,
  V1IngressClass,
  V1IngressClassList,
  V1IngressList,
  V1Job,
  V1JobList,
  V1Lease,
  V1LeaseList,
  V1LimitRange,
  V1LimitRangeList,
  V1MutatingWebhookConfiguration,
  V1MutatingWebhookConfigurationList,
  V1Namespace,
  V1NamespaceList,
  V1NetworkPolicy,
  V1NetworkPolicyList,
  V1Node,
  V1NodeList,
  V1PersistentVolume,
  V1PersistentVolumeClaim,
  V1PersistentVolumeClaimList,
  V1PersistentVolumeList,
  V1Pod,
  V1PodDisruptionBudget,
  V1PodDisruptionBudgetList,
  V1PodList,
  V1PodTemplate,
  V1PodTemplateList,
  V1PriorityClass,
  V1PriorityClassList,
  V1PriorityLevelConfiguration,
  V1PriorityLevelConfigurationList,
  V1ReplicaSet,
  V1ReplicaSetList,
  V1ReplicationController,
  V1ReplicationControllerList,
  V1ResourceClaimList,
  V1ResourceClaimTemplate,
  V1ResourceClaimTemplateList,
  V1ResourceQuota,
  V1ResourceQuotaList,
  V1ResourceResourceClaim,
  V1ResourceSlice,
  V1ResourceSliceList,
  V1Role,
  V1RoleBinding,
  V1RoleBindingList,
  V1RoleList,
  V1RuntimeClass,
  V1RuntimeClassList,
  V1Scale,
  V1Secret,
  V1SecretList,
  V1Service,
  V1ServiceAccount,
  V1ServiceAccountList,
  V1ServiceCIDR,
  V1ServiceCIDRList,
  V1ServiceList,
  V1StatefulSet,
  V1StatefulSetList,
  V1StorageClass,
  V1StorageClassList,
  V1ValidatingAdmissionPolicy,
  V1ValidatingAdmissionPolicyBinding,
  V1ValidatingAdmissionPolicyBindingList,
  V1ValidatingAdmissionPolicyList,
  V1ValidatingWebhookConfiguration,
  V1ValidatingWebhookConfigurationList,
  V1VolumeAttachment,
  V1VolumeAttachmentList,
  V1VolumeAttributesClass,
  V1VolumeAttributesClassList,
  V1alpha1ClusterTrustBundle,
  V1alpha1ClusterTrustBundleList,
  V1alpha1MutatingAdmissionPolicy,
  V1alpha1MutatingAdmissionPolicyBinding,
  V1alpha1MutatingAdmissionPolicyBindingList,
  V1alpha1MutatingAdmissionPolicyList,
  V1alpha1StorageVersion,
  V1alpha1StorageVersionList,
  V1alpha1Workload,
  V1alpha1WorkloadList,
  V1alpha2LeaseCandidate,
  V1alpha2LeaseCandidateList,
  V1alpha3DeviceTaintRule,
  V1alpha3DeviceTaintRuleList,
  V1beta1ClusterTrustBundle,
  V1beta1ClusterTrustBundleList,
  V1beta1DeviceClass,
  V1beta1DeviceClassList,
  V1beta1IPAddress,
  V1beta1IPAddressList,
  V1beta1LeaseCandidate,
  V1beta1LeaseCandidateList,
  V1beta1MutatingAdmissionPolicy,
  V1beta1MutatingAdmissionPolicyBinding,
  V1beta1MutatingAdmissionPolicyBindingList,
  V1beta1MutatingAdmissionPolicyList,
  V1beta1PodCertificateRequest,
  V1beta1PodCertificateRequestList,
  V1beta1ResourceClaim,
  V1beta1ResourceClaimList,
  V1beta1ResourceClaimTemplate,
  V1beta1ResourceClaimTemplateList,
  V1beta1ResourceSlice,
  V1beta1ResourceSliceList,
  V1beta1ServiceCIDR,
  V1beta1ServiceCIDRList,
  V1beta1StorageVersionMigration,
  V1beta1StorageVersionMigrationList,
  V1beta1VolumeAttributesClass,
  V1beta1VolumeAttributesClassList,
  V1beta2DeviceClass,
  V1beta2DeviceClassList,
  V1beta2ResourceClaim,
  V1beta2ResourceClaimList,
  V1beta2ResourceClaimTemplate,
  V1beta2ResourceClaimTemplateList,
  V1beta2ResourceSlice,
  V1beta2ResourceSliceList,
  V2HorizontalPodAutoscaler,
  V2HorizontalPodAutoscalerList,
} from "../models/index.js";

export function mutatingwebhookconfigurations(client: KubernetesClient): ResourceClient<V1MutatingWebhookConfiguration, V1MutatingWebhookConfigurationList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "mutatingwebhookconfigurations",
    namespaced: false,
  });
}

export interface ValidatingadmissionpoliciesClient extends ResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicyList, "cluster"> {
  status: ResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicy, "cluster">;
}

export function validatingadmissionpolicies(client: KubernetesClient): ValidatingadmissionpoliciesClient {
  const base = createResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicyList, "cluster">(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "validatingadmissionpolicies",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicy, "cluster">(
      client,
      {
          apiVersion: "admissionregistration.k8s.io/v1",
          plural: "validatingadmissionpolicies",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function validatingadmissionpolicybindings(client: KubernetesClient): ResourceClient<V1ValidatingAdmissionPolicyBinding, V1ValidatingAdmissionPolicyBindingList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "validatingadmissionpolicybindings",
    namespaced: false,
  });
}

export function validatingwebhookconfigurations(client: KubernetesClient): ResourceClient<V1ValidatingWebhookConfiguration, V1ValidatingWebhookConfigurationList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "validatingwebhookconfigurations",
    namespaced: false,
  });
}

export function admissionregistrationV1alpha1Mutatingadmissionpolicies(client: KubernetesClient): ResourceClient<V1alpha1MutatingAdmissionPolicy, V1alpha1MutatingAdmissionPolicyList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1alpha1",
    plural: "mutatingadmissionpolicies",
    namespaced: false,
  });
}

export function admissionregistrationV1alpha1Mutatingadmissionpolicybindings(client: KubernetesClient): ResourceClient<V1alpha1MutatingAdmissionPolicyBinding, V1alpha1MutatingAdmissionPolicyBindingList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1alpha1",
    plural: "mutatingadmissionpolicybindings",
    namespaced: false,
  });
}

export function admissionregistrationV1beta1Mutatingadmissionpolicies(client: KubernetesClient): ResourceClient<V1beta1MutatingAdmissionPolicy, V1beta1MutatingAdmissionPolicyList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1beta1",
    plural: "mutatingadmissionpolicies",
    namespaced: false,
  });
}

export function admissionregistrationV1beta1Mutatingadmissionpolicybindings(client: KubernetesClient): ResourceClient<V1beta1MutatingAdmissionPolicyBinding, V1beta1MutatingAdmissionPolicyBindingList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "admissionregistration.k8s.io/v1beta1",
    plural: "mutatingadmissionpolicybindings",
    namespaced: false,
  });
}

export interface CustomresourcedefinitionsClient extends ResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinitionList, "cluster"> {
  status: ResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinition, "cluster">;
}

export function customresourcedefinitions(client: KubernetesClient): CustomresourcedefinitionsClient {
  const base = createResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinitionList, "cluster">(client, {
    apiVersion: "apiextensions.k8s.io/v1",
    plural: "customresourcedefinitions",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinition, "cluster">(
      client,
      {
          apiVersion: "apiextensions.k8s.io/v1",
          plural: "customresourcedefinitions",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface ApiservicesClient extends ResourceClient<V1APIService, V1APIServiceList, "cluster"> {
  status: ResourceClient<V1APIService, V1APIService, "cluster">;
}

export function apiservices(client: KubernetesClient): ApiservicesClient {
  const base = createResourceClient<V1APIService, V1APIServiceList, "cluster">(client, {
    apiVersion: "apiregistration.k8s.io/v1",
    plural: "apiservices",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1APIService, V1APIService, "cluster">(
      client,
      {
          apiVersion: "apiregistration.k8s.io/v1",
          plural: "apiservices",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function controllerrevisions(client: KubernetesClient): ResourceClient<V1ControllerRevision, V1ControllerRevisionList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "apps/v1",
    plural: "controllerrevisions",
    namespaced: true,
  });
}

export interface DaemonsetsClient extends ResourceClient<V1DaemonSet, V1DaemonSetList, "namespaced"> {
  status: ResourceClient<V1DaemonSet, V1DaemonSet, "namespaced">;
}

export function daemonsets(client: KubernetesClient): DaemonsetsClient {
  const base = createResourceClient<V1DaemonSet, V1DaemonSetList, "namespaced">(client, {
    apiVersion: "apps/v1",
    plural: "daemonsets",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1DaemonSet, V1DaemonSet, "namespaced">(
      client,
      {
          apiVersion: "apps/v1",
          plural: "daemonsets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface DeploymentsClient extends ResourceClient<V1Deployment, V1DeploymentList, "namespaced"> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced">;
  status: ResourceClient<V1Deployment, V1Deployment, "namespaced">;
}

export function deployments(client: KubernetesClient): DeploymentsClient {
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

export interface ReplicasetsClient extends ResourceClient<V1ReplicaSet, V1ReplicaSetList, "namespaced"> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced">;
  status: ResourceClient<V1ReplicaSet, V1ReplicaSet, "namespaced">;
}

export function replicasets(client: KubernetesClient): ReplicasetsClient {
  const base = createResourceClient<V1ReplicaSet, V1ReplicaSetList, "namespaced">(client, {
    apiVersion: "apps/v1",
    plural: "replicasets",
    namespaced: true,
  });

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced">(
      client,
      {
          apiVersion: "apps/v1",
          plural: "replicasets",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
    ),
    status: createResourceClient<V1ReplicaSet, V1ReplicaSet, "namespaced">(
      client,
      {
          apiVersion: "apps/v1",
          plural: "replicasets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface StatefulsetsClient extends ResourceClient<V1StatefulSet, V1StatefulSetList, "namespaced"> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced">;
  status: ResourceClient<V1StatefulSet, V1StatefulSet, "namespaced">;
}

export function statefulsets(client: KubernetesClient): StatefulsetsClient {
  const base = createResourceClient<V1StatefulSet, V1StatefulSetList, "namespaced">(client, {
    apiVersion: "apps/v1",
    plural: "statefulsets",
    namespaced: true,
  });

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced">(
      client,
      {
          apiVersion: "apps/v1",
          plural: "statefulsets",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
    ),
    status: createResourceClient<V1StatefulSet, V1StatefulSet, "namespaced">(
      client,
      {
          apiVersion: "apps/v1",
          plural: "statefulsets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface AutoscalingV1HorizontalpodautoscalersClient extends ResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscalerList, "namespaced"> {
  status: ResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscaler, "namespaced">;
}

export function autoscalingV1Horizontalpodautoscalers(client: KubernetesClient): AutoscalingV1HorizontalpodautoscalersClient {
  const base = createResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscalerList, "namespaced">(client, {
    apiVersion: "autoscaling/v1",
    plural: "horizontalpodautoscalers",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscaler, "namespaced">(
      client,
      {
          apiVersion: "autoscaling/v1",
          plural: "horizontalpodautoscalers",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface AutoscalingV2HorizontalpodautoscalersClient extends ResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscalerList, "namespaced"> {
  status: ResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscaler, "namespaced">;
}

export function autoscalingV2Horizontalpodautoscalers(client: KubernetesClient): AutoscalingV2HorizontalpodautoscalersClient {
  const base = createResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscalerList, "namespaced">(client, {
    apiVersion: "autoscaling/v2",
    plural: "horizontalpodautoscalers",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscaler, "namespaced">(
      client,
      {
          apiVersion: "autoscaling/v2",
          plural: "horizontalpodautoscalers",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface CronjobsClient extends ResourceClient<V1CronJob, V1CronJobList, "namespaced"> {
  status: ResourceClient<V1CronJob, V1CronJob, "namespaced">;
}

export function cronjobs(client: KubernetesClient): CronjobsClient {
  const base = createResourceClient<V1CronJob, V1CronJobList, "namespaced">(client, {
    apiVersion: "batch/v1",
    plural: "cronjobs",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1CronJob, V1CronJob, "namespaced">(
      client,
      {
          apiVersion: "batch/v1",
          plural: "cronjobs",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface JobsClient extends ResourceClient<V1Job, V1JobList, "namespaced"> {
  status: ResourceClient<V1Job, V1Job, "namespaced">;
}

export function jobs(client: KubernetesClient): JobsClient {
  const base = createResourceClient<V1Job, V1JobList, "namespaced">(client, {
    apiVersion: "batch/v1",
    plural: "jobs",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1Job, V1Job, "namespaced">(
      client,
      {
          apiVersion: "batch/v1",
          plural: "jobs",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface CertificatesigningrequestsClient extends ResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequestList, "cluster"> {
  approval: ResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster">;
  status: ResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster">;
}

export function certificatesigningrequests(client: KubernetesClient): CertificatesigningrequestsClient {
  const base = createResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequestList, "cluster">(client, {
    apiVersion: "certificates.k8s.io/v1",
    plural: "certificatesigningrequests",
    namespaced: false,
  });

  return {
    ...base,
    approval: createResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster">(
      client,
      {
          apiVersion: "certificates.k8s.io/v1",
          plural: "certificatesigningrequests",
          namespaced: false,
        },
      undefined,
      undefined,
      "approval",
    ),
    status: createResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster">(
      client,
      {
          apiVersion: "certificates.k8s.io/v1",
          plural: "certificatesigningrequests",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function certificatesV1alpha1Clustertrustbundles(client: KubernetesClient): ResourceClient<V1alpha1ClusterTrustBundle, V1alpha1ClusterTrustBundleList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "certificates.k8s.io/v1alpha1",
    plural: "clustertrustbundles",
    namespaced: false,
  });
}

export function certificatesV1beta1Clustertrustbundles(client: KubernetesClient): ResourceClient<V1beta1ClusterTrustBundle, V1beta1ClusterTrustBundleList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "certificates.k8s.io/v1beta1",
    plural: "clustertrustbundles",
    namespaced: false,
  });
}

export interface PodcertificaterequestsClient extends ResourceClient<V1beta1PodCertificateRequest, V1beta1PodCertificateRequestList, "namespaced"> {
  status: ResourceClient<V1beta1PodCertificateRequest, V1beta1PodCertificateRequest, "namespaced">;
}

export function podcertificaterequests(client: KubernetesClient): PodcertificaterequestsClient {
  const base = createResourceClient<V1beta1PodCertificateRequest, V1beta1PodCertificateRequestList, "namespaced">(client, {
    apiVersion: "certificates.k8s.io/v1beta1",
    plural: "podcertificaterequests",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1beta1PodCertificateRequest, V1beta1PodCertificateRequest, "namespaced">(
      client,
      {
          apiVersion: "certificates.k8s.io/v1beta1",
          plural: "podcertificaterequests",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function leases(client: KubernetesClient): ResourceClient<V1Lease, V1LeaseList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "coordination.k8s.io/v1",
    plural: "leases",
    namespaced: true,
  });
}

export function coordinationV1alpha2Leasecandidates(client: KubernetesClient): ResourceClient<V1alpha2LeaseCandidate, V1alpha2LeaseCandidateList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "coordination.k8s.io/v1alpha2",
    plural: "leasecandidates",
    namespaced: true,
  });
}

export function coordinationV1beta1Leasecandidates(client: KubernetesClient): ResourceClient<V1beta1LeaseCandidate, V1beta1LeaseCandidateList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "coordination.k8s.io/v1beta1",
    plural: "leasecandidates",
    namespaced: true,
  });
}

export function componentstatuses(client: KubernetesClient): ResourceClient<V1ComponentStatus, V1ComponentStatusList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "componentstatuses",
    namespaced: false,
  });
}

export function configmaps(client: KubernetesClient): ResourceClient<V1ConfigMap, V1ConfigMapList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "configmaps",
    namespaced: true,
  });
}

export function coreV1Events(client: KubernetesClient): ResourceClient<V1CoreEvent, V1CoreEventList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "events",
    namespaced: true,
  });
}

export function endpoints(client: KubernetesClient): ResourceClient<V1Endpoints, V1EndpointsList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "endpoints",
    namespaced: true,
  });
}

export function limitranges(client: KubernetesClient): ResourceClient<V1LimitRange, V1LimitRangeList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "limitranges",
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

export interface NodesClient extends ResourceClient<V1Node, V1NodeList, "cluster"> {
  proxy: ResourceClient<unknown, unknown, "cluster">;
  status: ResourceClient<V1Node, V1Node, "cluster">;
}

export function nodes(client: KubernetesClient): NodesClient {
  const base = createResourceClient<V1Node, V1NodeList, "cluster">(client, {
    apiVersion: "v1",
    plural: "nodes",
    namespaced: false,
  });

  return {
    ...base,
    proxy: createResourceClient<unknown, unknown, "cluster">(
      client,
      {
          apiVersion: "v1",
          plural: "nodes",
          namespaced: false,
        },
      undefined,
      undefined,
      "proxy",
    ),
    status: createResourceClient<V1Node, V1Node, "cluster">(
      client,
      {
          apiVersion: "v1",
          plural: "nodes",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface PersistentvolumeclaimsClient extends ResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaimList, "namespaced"> {
  status: ResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaim, "namespaced">;
}

export function persistentvolumeclaims(client: KubernetesClient): PersistentvolumeclaimsClient {
  const base = createResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaimList, "namespaced">(client, {
    apiVersion: "v1",
    plural: "persistentvolumeclaims",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaim, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "persistentvolumeclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface PersistentvolumesClient extends ResourceClient<V1PersistentVolume, V1PersistentVolumeList, "cluster"> {
  status: ResourceClient<V1PersistentVolume, V1PersistentVolume, "cluster">;
}

export function persistentvolumes(client: KubernetesClient): PersistentvolumesClient {
  const base = createResourceClient<V1PersistentVolume, V1PersistentVolumeList, "cluster">(client, {
    apiVersion: "v1",
    plural: "persistentvolumes",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1PersistentVolume, V1PersistentVolume, "cluster">(
      client,
      {
          apiVersion: "v1",
          plural: "persistentvolumes",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface PodsClient extends ResourceClient<V1Pod, V1PodList, "namespaced"> {
  attach: ResourceClient<unknown, unknown, "namespaced">;
  ephemeralcontainers: ResourceClient<V1Pod, V1Pod, "namespaced">;
  exec: ResourceClient<unknown, unknown, "namespaced">;
  log: ResourceClient<unknown, unknown, "namespaced">;
  portforward: ResourceClient<unknown, unknown, "namespaced">;
  proxy: ResourceClient<unknown, unknown, "namespaced">;
  resize: ResourceClient<V1Pod, V1Pod, "namespaced">;
  status: ResourceClient<V1Pod, V1Pod, "namespaced">;
}

export function pods(client: KubernetesClient): PodsClient {
  const base = createResourceClient<V1Pod, V1PodList, "namespaced">(client, {
    apiVersion: "v1",
    plural: "pods",
    namespaced: true,
  });

  return {
    ...base,
    attach: createResourceClient<unknown, unknown, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "attach",
    ),
    ephemeralcontainers: createResourceClient<V1Pod, V1Pod, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "ephemeralcontainers",
    ),
    exec: createResourceClient<unknown, unknown, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "exec",
    ),
    log: createResourceClient<unknown, unknown, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "log",
    ),
    portforward: createResourceClient<unknown, unknown, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "portforward",
    ),
    proxy: createResourceClient<unknown, unknown, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "proxy",
    ),
    resize: createResourceClient<V1Pod, V1Pod, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "resize",
    ),
    status: createResourceClient<V1Pod, V1Pod, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function podtemplates(client: KubernetesClient): ResourceClient<V1PodTemplate, V1PodTemplateList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "podtemplates",
    namespaced: true,
  });
}

export interface ReplicationcontrollersClient extends ResourceClient<V1ReplicationController, V1ReplicationControllerList, "namespaced"> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced">;
  status: ResourceClient<V1ReplicationController, V1ReplicationController, "namespaced">;
}

export function replicationcontrollers(client: KubernetesClient): ReplicationcontrollersClient {
  const base = createResourceClient<V1ReplicationController, V1ReplicationControllerList, "namespaced">(client, {
    apiVersion: "v1",
    plural: "replicationcontrollers",
    namespaced: true,
  });

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "replicationcontrollers",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
    ),
    status: createResourceClient<V1ReplicationController, V1ReplicationController, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "replicationcontrollers",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface ResourcequotasClient extends ResourceClient<V1ResourceQuota, V1ResourceQuotaList, "namespaced"> {
  status: ResourceClient<V1ResourceQuota, V1ResourceQuota, "namespaced">;
}

export function resourcequotas(client: KubernetesClient): ResourcequotasClient {
  const base = createResourceClient<V1ResourceQuota, V1ResourceQuotaList, "namespaced">(client, {
    apiVersion: "v1",
    plural: "resourcequotas",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1ResourceQuota, V1ResourceQuota, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "resourcequotas",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function secrets(client: KubernetesClient): ResourceClient<V1Secret, V1SecretList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "secrets",
    namespaced: true,
  });
}

export function serviceaccounts(client: KubernetesClient): ResourceClient<V1ServiceAccount, V1ServiceAccountList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "serviceaccounts",
    namespaced: true,
  });
}

export interface ServicesClient extends ResourceClient<V1Service, V1ServiceList, "namespaced"> {
  proxy: ResourceClient<unknown, unknown, "namespaced">;
  status: ResourceClient<V1Service, V1Service, "namespaced">;
}

export function services(client: KubernetesClient): ServicesClient {
  const base = createResourceClient<V1Service, V1ServiceList, "namespaced">(client, {
    apiVersion: "v1",
    plural: "services",
    namespaced: true,
  });

  return {
    ...base,
    proxy: createResourceClient<unknown, unknown, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "services",
          namespaced: true,
        },
      undefined,
      undefined,
      "proxy",
    ),
    status: createResourceClient<V1Service, V1Service, "namespaced">(
      client,
      {
          apiVersion: "v1",
          plural: "services",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function endpointslices(client: KubernetesClient): ResourceClient<V1EndpointSlice, V1EndpointSliceList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "discovery.k8s.io/v1",
    plural: "endpointslices",
    namespaced: true,
  });
}

export function eventsV1Events(client: KubernetesClient): ResourceClient<V1EventsEvent, V1EventsEventList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "events.k8s.io/v1",
    plural: "events",
    namespaced: true,
  });
}

export interface FlowschemasClient extends ResourceClient<V1FlowSchema, V1FlowSchemaList, "cluster"> {
  status: ResourceClient<V1FlowSchema, V1FlowSchema, "cluster">;
}

export function flowschemas(client: KubernetesClient): FlowschemasClient {
  const base = createResourceClient<V1FlowSchema, V1FlowSchemaList, "cluster">(client, {
    apiVersion: "flowcontrol.apiserver.k8s.io/v1",
    plural: "flowschemas",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1FlowSchema, V1FlowSchema, "cluster">(
      client,
      {
          apiVersion: "flowcontrol.apiserver.k8s.io/v1",
          plural: "flowschemas",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface PrioritylevelconfigurationsClient extends ResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfigurationList, "cluster"> {
  status: ResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfiguration, "cluster">;
}

export function prioritylevelconfigurations(client: KubernetesClient): PrioritylevelconfigurationsClient {
  const base = createResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfigurationList, "cluster">(client, {
    apiVersion: "flowcontrol.apiserver.k8s.io/v1",
    plural: "prioritylevelconfigurations",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfiguration, "cluster">(
      client,
      {
          apiVersion: "flowcontrol.apiserver.k8s.io/v1",
          plural: "prioritylevelconfigurations",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export interface StorageversionsClient extends ResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersionList, "cluster"> {
  status: ResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersion, "cluster">;
}

export function storageversions(client: KubernetesClient): StorageversionsClient {
  const base = createResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersionList, "cluster">(client, {
    apiVersion: "internal.apiserver.k8s.io/v1alpha1",
    plural: "storageversions",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersion, "cluster">(
      client,
      {
          apiVersion: "internal.apiserver.k8s.io/v1alpha1",
          plural: "storageversions",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function ingressclasses(client: KubernetesClient): ResourceClient<V1IngressClass, V1IngressClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "ingressclasses",
    namespaced: false,
  });
}

export interface IngressesClient extends ResourceClient<V1Ingress, V1IngressList, "namespaced"> {
  status: ResourceClient<V1Ingress, V1Ingress, "namespaced">;
}

export function ingresses(client: KubernetesClient): IngressesClient {
  const base = createResourceClient<V1Ingress, V1IngressList, "namespaced">(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "ingresses",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1Ingress, V1Ingress, "namespaced">(
      client,
      {
          apiVersion: "networking.k8s.io/v1",
          plural: "ingresses",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function networkingV1Ipaddresses(client: KubernetesClient): ResourceClient<V1IPAddress, V1IPAddressList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "ipaddresses",
    namespaced: false,
  });
}

export interface NetworkingV1ServicecidrsClient extends ResourceClient<V1ServiceCIDR, V1ServiceCIDRList, "cluster"> {
  status: ResourceClient<V1ServiceCIDR, V1ServiceCIDR, "cluster">;
}

export function networkingV1Servicecidrs(client: KubernetesClient): NetworkingV1ServicecidrsClient {
  const base = createResourceClient<V1ServiceCIDR, V1ServiceCIDRList, "cluster">(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "servicecidrs",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1ServiceCIDR, V1ServiceCIDR, "cluster">(
      client,
      {
          apiVersion: "networking.k8s.io/v1",
          plural: "servicecidrs",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function networkpolicies(client: KubernetesClient): ResourceClient<V1NetworkPolicy, V1NetworkPolicyList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "networkpolicies",
    namespaced: true,
  });
}

export function networkingV1beta1Ipaddresses(client: KubernetesClient): ResourceClient<V1beta1IPAddress, V1beta1IPAddressList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "networking.k8s.io/v1beta1",
    plural: "ipaddresses",
    namespaced: false,
  });
}

export interface NetworkingV1beta1ServicecidrsClient extends ResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDRList, "cluster"> {
  status: ResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDR, "cluster">;
}

export function networkingV1beta1Servicecidrs(client: KubernetesClient): NetworkingV1beta1ServicecidrsClient {
  const base = createResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDRList, "cluster">(client, {
    apiVersion: "networking.k8s.io/v1beta1",
    plural: "servicecidrs",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDR, "cluster">(
      client,
      {
          apiVersion: "networking.k8s.io/v1beta1",
          plural: "servicecidrs",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function runtimeclasses(client: KubernetesClient): ResourceClient<V1RuntimeClass, V1RuntimeClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "node.k8s.io/v1",
    plural: "runtimeclasses",
    namespaced: false,
  });
}

export interface PoddisruptionbudgetsClient extends ResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudgetList, "namespaced"> {
  status: ResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudget, "namespaced">;
}

export function poddisruptionbudgets(client: KubernetesClient): PoddisruptionbudgetsClient {
  const base = createResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudgetList, "namespaced">(client, {
    apiVersion: "policy/v1",
    plural: "poddisruptionbudgets",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudget, "namespaced">(
      client,
      {
          apiVersion: "policy/v1",
          plural: "poddisruptionbudgets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function clusterrolebindings(client: KubernetesClient): ResourceClient<V1ClusterRoleBinding, V1ClusterRoleBindingList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "clusterrolebindings",
    namespaced: false,
  });
}

export function clusterroles(client: KubernetesClient): ResourceClient<V1ClusterRole, V1ClusterRoleList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "clusterroles",
    namespaced: false,
  });
}

export function rolebindings(client: KubernetesClient): ResourceClient<V1RoleBinding, V1RoleBindingList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "rolebindings",
    namespaced: true,
  });
}

export function roles(client: KubernetesClient): ResourceClient<V1Role, V1RoleList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "roles",
    namespaced: true,
  });
}

export function resourceApiV1Deviceclasses(client: KubernetesClient): ResourceClient<V1DeviceClass, V1DeviceClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1",
    plural: "deviceclasses",
    namespaced: false,
  });
}

export interface ResourceApiV1ResourceclaimsClient extends ResourceClient<V1ResourceResourceClaim, V1ResourceClaimList, "namespaced"> {
  status: ResourceClient<V1ResourceResourceClaim, V1ResourceResourceClaim, "namespaced">;
}

export function resourceApiV1Resourceclaims(client: KubernetesClient): ResourceApiV1ResourceclaimsClient {
  const base = createResourceClient<V1ResourceResourceClaim, V1ResourceClaimList, "namespaced">(client, {
    apiVersion: "resource.k8s.io/v1",
    plural: "resourceclaims",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1ResourceResourceClaim, V1ResourceResourceClaim, "namespaced">(
      client,
      {
          apiVersion: "resource.k8s.io/v1",
          plural: "resourceclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function resourceApiV1Resourceclaimtemplates(client: KubernetesClient): ResourceClient<V1ResourceClaimTemplate, V1ResourceClaimTemplateList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1",
    plural: "resourceclaimtemplates",
    namespaced: true,
  });
}

export function resourceApiV1Resourceslices(client: KubernetesClient): ResourceClient<V1ResourceSlice, V1ResourceSliceList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1",
    plural: "resourceslices",
    namespaced: false,
  });
}

export interface DevicetaintrulesClient extends ResourceClient<V1alpha3DeviceTaintRule, V1alpha3DeviceTaintRuleList, "cluster"> {
  status: ResourceClient<V1alpha3DeviceTaintRule, V1alpha3DeviceTaintRule, "cluster">;
}

export function devicetaintrules(client: KubernetesClient): DevicetaintrulesClient {
  const base = createResourceClient<V1alpha3DeviceTaintRule, V1alpha3DeviceTaintRuleList, "cluster">(client, {
    apiVersion: "resource.k8s.io/v1alpha3",
    plural: "devicetaintrules",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1alpha3DeviceTaintRule, V1alpha3DeviceTaintRule, "cluster">(
      client,
      {
          apiVersion: "resource.k8s.io/v1alpha3",
          plural: "devicetaintrules",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function resourceApiV1beta1Deviceclasses(client: KubernetesClient): ResourceClient<V1beta1DeviceClass, V1beta1DeviceClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "deviceclasses",
    namespaced: false,
  });
}

export interface ResourceApiV1beta1ResourceclaimsClient extends ResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaimList, "namespaced"> {
  status: ResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaim, "namespaced">;
}

export function resourceApiV1beta1Resourceclaims(client: KubernetesClient): ResourceApiV1beta1ResourceclaimsClient {
  const base = createResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaimList, "namespaced">(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "resourceclaims",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaim, "namespaced">(
      client,
      {
          apiVersion: "resource.k8s.io/v1beta1",
          plural: "resourceclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function resourceApiV1beta1Resourceclaimtemplates(client: KubernetesClient): ResourceClient<V1beta1ResourceClaimTemplate, V1beta1ResourceClaimTemplateList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "resourceclaimtemplates",
    namespaced: true,
  });
}

export function resourceApiV1beta1Resourceslices(client: KubernetesClient): ResourceClient<V1beta1ResourceSlice, V1beta1ResourceSliceList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "resourceslices",
    namespaced: false,
  });
}

export function resourceApiV1beta2Deviceclasses(client: KubernetesClient): ResourceClient<V1beta2DeviceClass, V1beta2DeviceClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "deviceclasses",
    namespaced: false,
  });
}

export interface ResourceApiV1beta2ResourceclaimsClient extends ResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaimList, "namespaced"> {
  status: ResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaim, "namespaced">;
}

export function resourceApiV1beta2Resourceclaims(client: KubernetesClient): ResourceApiV1beta2ResourceclaimsClient {
  const base = createResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaimList, "namespaced">(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "resourceclaims",
    namespaced: true,
  });

  return {
    ...base,
    status: createResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaim, "namespaced">(
      client,
      {
          apiVersion: "resource.k8s.io/v1beta2",
          plural: "resourceclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function resourceApiV1beta2Resourceclaimtemplates(client: KubernetesClient): ResourceClient<V1beta2ResourceClaimTemplate, V1beta2ResourceClaimTemplateList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "resourceclaimtemplates",
    namespaced: true,
  });
}

export function resourceApiV1beta2Resourceslices(client: KubernetesClient): ResourceClient<V1beta2ResourceSlice, V1beta2ResourceSliceList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "resourceslices",
    namespaced: false,
  });
}

export function priorityclasses(client: KubernetesClient): ResourceClient<V1PriorityClass, V1PriorityClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "scheduling.k8s.io/v1",
    plural: "priorityclasses",
    namespaced: false,
  });
}

export function workloads(client: KubernetesClient): ResourceClient<V1alpha1Workload, V1alpha1WorkloadList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "scheduling.k8s.io/v1alpha1",
    plural: "workloads",
    namespaced: true,
  });
}

export function csidrivers(client: KubernetesClient): ResourceClient<V1CSIDriver, V1CSIDriverList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "csidrivers",
    namespaced: false,
  });
}

export function csinodes(client: KubernetesClient): ResourceClient<V1CSINode, V1CSINodeList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "csinodes",
    namespaced: false,
  });
}

export function csistoragecapacities(client: KubernetesClient): ResourceClient<V1CSIStorageCapacity, V1CSIStorageCapacityList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "csistoragecapacities",
    namespaced: true,
  });
}

export function storageclasses(client: KubernetesClient): ResourceClient<V1StorageClass, V1StorageClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "storageclasses",
    namespaced: false,
  });
}

export function storageV1Volumeattributesclasses(client: KubernetesClient): ResourceClient<V1VolumeAttributesClass, V1VolumeAttributesClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "volumeattributesclasses",
    namespaced: false,
  });
}

export interface VolumeattachmentsClient extends ResourceClient<V1VolumeAttachment, V1VolumeAttachmentList, "cluster"> {
  status: ResourceClient<V1VolumeAttachment, V1VolumeAttachment, "cluster">;
}

export function volumeattachments(client: KubernetesClient): VolumeattachmentsClient {
  const base = createResourceClient<V1VolumeAttachment, V1VolumeAttachmentList, "cluster">(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "volumeattachments",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1VolumeAttachment, V1VolumeAttachment, "cluster">(
      client,
      {
          apiVersion: "storage.k8s.io/v1",
          plural: "volumeattachments",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}

export function storageV1beta1Volumeattributesclasses(client: KubernetesClient): ResourceClient<V1beta1VolumeAttributesClass, V1beta1VolumeAttributesClassList, "cluster"> {
  return createResourceClient(client, {
    apiVersion: "storage.k8s.io/v1beta1",
    plural: "volumeattributesclasses",
    namespaced: false,
  });
}

export interface StorageversionmigrationsClient extends ResourceClient<V1beta1StorageVersionMigration, V1beta1StorageVersionMigrationList, "cluster"> {
  status: ResourceClient<V1beta1StorageVersionMigration, V1beta1StorageVersionMigration, "cluster">;
}

export function storageversionmigrations(client: KubernetesClient): StorageversionmigrationsClient {
  const base = createResourceClient<V1beta1StorageVersionMigration, V1beta1StorageVersionMigrationList, "cluster">(client, {
    apiVersion: "storagemigration.k8s.io/v1beta1",
    plural: "storageversionmigrations",
    namespaced: false,
  });

  return {
    ...base,
    status: createResourceClient<V1beta1StorageVersionMigration, V1beta1StorageVersionMigration, "cluster">(
      client,
      {
          apiVersion: "storagemigration.k8s.io/v1beta1",
          plural: "storageversionmigrations",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
    ),
  };
}
