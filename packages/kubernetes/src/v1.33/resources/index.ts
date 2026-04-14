import { createResourceClient } from "@kubernetes-typescript/runtime";
import type { KubernetesClient, ResourceClient } from "@kubernetes-typescript/runtime";
import { kubernetesQueryMapper } from "../../options.js";
import type { KubernetesVerbOptions } from "../../options.js";
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
  V1ResourceQuota,
  V1ResourceQuotaList,
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
  V1alpha1ClusterTrustBundle,
  V1alpha1ClusterTrustBundleList,
  V1alpha1MutatingAdmissionPolicy,
  V1alpha1MutatingAdmissionPolicyBinding,
  V1alpha1MutatingAdmissionPolicyBindingList,
  V1alpha1MutatingAdmissionPolicyList,
  V1alpha1StorageVersion,
  V1alpha1StorageVersionList,
  V1alpha1StorageVersionMigration,
  V1alpha1StorageVersionMigrationList,
  V1alpha1VolumeAttributesClass,
  V1alpha1VolumeAttributesClassList,
  V1alpha2LeaseCandidate,
  V1alpha2LeaseCandidateList,
  V1alpha3DeviceClass,
  V1alpha3DeviceClassList,
  V1alpha3DeviceTaintRule,
  V1alpha3DeviceTaintRuleList,
  V1alpha3ResourceClaim,
  V1alpha3ResourceClaimList,
  V1alpha3ResourceClaimTemplate,
  V1alpha3ResourceClaimTemplateList,
  V1alpha3ResourceSlice,
  V1alpha3ResourceSliceList,
  V1beta1ClusterTrustBundle,
  V1beta1ClusterTrustBundleList,
  V1beta1DeviceClass,
  V1beta1DeviceClassList,
  V1beta1IPAddress,
  V1beta1IPAddressList,
  V1beta1LeaseCandidate,
  V1beta1LeaseCandidateList,
  V1beta1ResourceClaim,
  V1beta1ResourceClaimList,
  V1beta1ResourceClaimTemplate,
  V1beta1ResourceClaimTemplateList,
  V1beta1ResourceSlice,
  V1beta1ResourceSliceList,
  V1beta1ServiceCIDR,
  V1beta1ServiceCIDRList,
  V1beta1ValidatingAdmissionPolicy,
  V1beta1ValidatingAdmissionPolicyBinding,
  V1beta1ValidatingAdmissionPolicyBindingList,
  V1beta1ValidatingAdmissionPolicyList,
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

export interface AdmissionregistrationV1ValidatingadmissionpoliciesClient extends ResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicyList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicy, "cluster", KubernetesVerbOptions>;
}

export function admissionregistrationV1Validatingadmissionpolicies(client: KubernetesClient): AdmissionregistrationV1ValidatingadmissionpoliciesClient {
  const base = createResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicyList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "validatingadmissionpolicies",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1ValidatingAdmissionPolicy, V1ValidatingAdmissionPolicy, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "admissionregistration.k8s.io/v1",
          plural: "validatingadmissionpolicies",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function admissionregistrationV1Validatingadmissionpolicybindings(client: KubernetesClient): ResourceClient<V1ValidatingAdmissionPolicyBinding, V1ValidatingAdmissionPolicyBindingList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1ValidatingAdmissionPolicyBinding, V1ValidatingAdmissionPolicyBindingList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "validatingadmissionpolicybindings",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function mutatingwebhookconfigurations(client: KubernetesClient): ResourceClient<V1MutatingWebhookConfiguration, V1MutatingWebhookConfigurationList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1MutatingWebhookConfiguration, V1MutatingWebhookConfigurationList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "mutatingwebhookconfigurations",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function validatingwebhookconfigurations(client: KubernetesClient): ResourceClient<V1ValidatingWebhookConfiguration, V1ValidatingWebhookConfigurationList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1ValidatingWebhookConfiguration, V1ValidatingWebhookConfigurationList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1",
    plural: "validatingwebhookconfigurations",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function mutatingadmissionpolicies(client: KubernetesClient): ResourceClient<V1alpha1MutatingAdmissionPolicy, V1alpha1MutatingAdmissionPolicyList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha1MutatingAdmissionPolicy, V1alpha1MutatingAdmissionPolicyList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1alpha1",
    plural: "mutatingadmissionpolicies",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function mutatingadmissionpolicybindings(client: KubernetesClient): ResourceClient<V1alpha1MutatingAdmissionPolicyBinding, V1alpha1MutatingAdmissionPolicyBindingList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha1MutatingAdmissionPolicyBinding, V1alpha1MutatingAdmissionPolicyBindingList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1alpha1",
    plural: "mutatingadmissionpolicybindings",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface AdmissionregistrationV1beta1ValidatingadmissionpoliciesClient extends ResourceClient<V1beta1ValidatingAdmissionPolicy, V1beta1ValidatingAdmissionPolicyList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1beta1ValidatingAdmissionPolicy, V1beta1ValidatingAdmissionPolicy, "cluster", KubernetesVerbOptions>;
}

export function admissionregistrationV1beta1Validatingadmissionpolicies(client: KubernetesClient): AdmissionregistrationV1beta1ValidatingadmissionpoliciesClient {
  const base = createResourceClient<V1beta1ValidatingAdmissionPolicy, V1beta1ValidatingAdmissionPolicyList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1beta1",
    plural: "validatingadmissionpolicies",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1beta1ValidatingAdmissionPolicy, V1beta1ValidatingAdmissionPolicy, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "admissionregistration.k8s.io/v1beta1",
          plural: "validatingadmissionpolicies",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function admissionregistrationV1beta1Validatingadmissionpolicybindings(client: KubernetesClient): ResourceClient<V1beta1ValidatingAdmissionPolicyBinding, V1beta1ValidatingAdmissionPolicyBindingList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta1ValidatingAdmissionPolicyBinding, V1beta1ValidatingAdmissionPolicyBindingList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "admissionregistration.k8s.io/v1beta1",
    plural: "validatingadmissionpolicybindings",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface CustomresourcedefinitionsClient extends ResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinitionList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinition, "cluster", KubernetesVerbOptions>;
}

export function customresourcedefinitions(client: KubernetesClient): CustomresourcedefinitionsClient {
  const base = createResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinitionList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "apiextensions.k8s.io/v1",
    plural: "customresourcedefinitions",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1CustomResourceDefinition, V1CustomResourceDefinition, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apiextensions.k8s.io/v1",
          plural: "customresourcedefinitions",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface ApiservicesClient extends ResourceClient<V1APIService, V1APIServiceList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1APIService, V1APIService, "cluster", KubernetesVerbOptions>;
}

export function apiservices(client: KubernetesClient): ApiservicesClient {
  const base = createResourceClient<V1APIService, V1APIServiceList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "apiregistration.k8s.io/v1",
    plural: "apiservices",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1APIService, V1APIService, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apiregistration.k8s.io/v1",
          plural: "apiservices",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function controllerrevisions(client: KubernetesClient): ResourceClient<V1ControllerRevision, V1ControllerRevisionList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1ControllerRevision, V1ControllerRevisionList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "apps/v1",
    plural: "controllerrevisions",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface DaemonsetsClient extends ResourceClient<V1DaemonSet, V1DaemonSetList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1DaemonSet, V1DaemonSet, "namespaced", KubernetesVerbOptions>;
}

export function daemonsets(client: KubernetesClient): DaemonsetsClient {
  const base = createResourceClient<V1DaemonSet, V1DaemonSetList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "apps/v1",
    plural: "daemonsets",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1DaemonSet, V1DaemonSet, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "daemonsets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface DeploymentsClient extends ResourceClient<V1Deployment, V1DeploymentList, "namespaced", KubernetesVerbOptions> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>;
  status: ResourceClient<V1Deployment, V1Deployment, "namespaced", KubernetesVerbOptions>;
}

export function deployments(client: KubernetesClient): DeploymentsClient {
  const base = createResourceClient<V1Deployment, V1DeploymentList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "apps/v1",
    plural: "deployments",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "deployments",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1Deployment, V1Deployment, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "deployments",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface ReplicasetsClient extends ResourceClient<V1ReplicaSet, V1ReplicaSetList, "namespaced", KubernetesVerbOptions> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>;
  status: ResourceClient<V1ReplicaSet, V1ReplicaSet, "namespaced", KubernetesVerbOptions>;
}

export function replicasets(client: KubernetesClient): ReplicasetsClient {
  const base = createResourceClient<V1ReplicaSet, V1ReplicaSetList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "apps/v1",
    plural: "replicasets",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "replicasets",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1ReplicaSet, V1ReplicaSet, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "replicasets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface StatefulsetsClient extends ResourceClient<V1StatefulSet, V1StatefulSetList, "namespaced", KubernetesVerbOptions> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>;
  status: ResourceClient<V1StatefulSet, V1StatefulSet, "namespaced", KubernetesVerbOptions>;
}

export function statefulsets(client: KubernetesClient): StatefulsetsClient {
  const base = createResourceClient<V1StatefulSet, V1StatefulSetList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "apps/v1",
    plural: "statefulsets",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "statefulsets",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1StatefulSet, V1StatefulSet, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "apps/v1",
          plural: "statefulsets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface AutoscalingV1HorizontalpodautoscalersClient extends ResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscalerList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscaler, "namespaced", KubernetesVerbOptions>;
}

export function autoscalingV1Horizontalpodautoscalers(client: KubernetesClient): AutoscalingV1HorizontalpodautoscalersClient {
  const base = createResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscalerList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "autoscaling/v1",
    plural: "horizontalpodautoscalers",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1HorizontalPodAutoscaler, V1HorizontalPodAutoscaler, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "autoscaling/v1",
          plural: "horizontalpodautoscalers",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface AutoscalingV2HorizontalpodautoscalersClient extends ResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscalerList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscaler, "namespaced", KubernetesVerbOptions>;
}

export function autoscalingV2Horizontalpodautoscalers(client: KubernetesClient): AutoscalingV2HorizontalpodautoscalersClient {
  const base = createResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscalerList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "autoscaling/v2",
    plural: "horizontalpodautoscalers",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V2HorizontalPodAutoscaler, V2HorizontalPodAutoscaler, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "autoscaling/v2",
          plural: "horizontalpodautoscalers",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface CronjobsClient extends ResourceClient<V1CronJob, V1CronJobList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1CronJob, V1CronJob, "namespaced", KubernetesVerbOptions>;
}

export function cronjobs(client: KubernetesClient): CronjobsClient {
  const base = createResourceClient<V1CronJob, V1CronJobList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "batch/v1",
    plural: "cronjobs",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1CronJob, V1CronJob, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "batch/v1",
          plural: "cronjobs",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface JobsClient extends ResourceClient<V1Job, V1JobList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1Job, V1Job, "namespaced", KubernetesVerbOptions>;
}

export function jobs(client: KubernetesClient): JobsClient {
  const base = createResourceClient<V1Job, V1JobList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "batch/v1",
    plural: "jobs",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1Job, V1Job, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "batch/v1",
          plural: "jobs",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface CertificatesigningrequestsClient extends ResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequestList, "cluster", KubernetesVerbOptions> {
  approval: ResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster", KubernetesVerbOptions>;
  status: ResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster", KubernetesVerbOptions>;
}

export function certificatesigningrequests(client: KubernetesClient): CertificatesigningrequestsClient {
  const base = createResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequestList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "certificates.k8s.io/v1",
    plural: "certificatesigningrequests",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    approval: createResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "certificates.k8s.io/v1",
          plural: "certificatesigningrequests",
          namespaced: false,
        },
      undefined,
      undefined,
      "approval",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1CertificateSigningRequest, V1CertificateSigningRequest, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "certificates.k8s.io/v1",
          plural: "certificatesigningrequests",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function certificatesV1alpha1Clustertrustbundles(client: KubernetesClient): ResourceClient<V1alpha1ClusterTrustBundle, V1alpha1ClusterTrustBundleList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha1ClusterTrustBundle, V1alpha1ClusterTrustBundleList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "certificates.k8s.io/v1alpha1",
    plural: "clustertrustbundles",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function certificatesV1beta1Clustertrustbundles(client: KubernetesClient): ResourceClient<V1beta1ClusterTrustBundle, V1beta1ClusterTrustBundleList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta1ClusterTrustBundle, V1beta1ClusterTrustBundleList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "certificates.k8s.io/v1beta1",
    plural: "clustertrustbundles",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function leases(client: KubernetesClient): ResourceClient<V1Lease, V1LeaseList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1Lease, V1LeaseList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "coordination.k8s.io/v1",
    plural: "leases",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function coordinationV1alpha2Leasecandidates(client: KubernetesClient): ResourceClient<V1alpha2LeaseCandidate, V1alpha2LeaseCandidateList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1alpha2LeaseCandidate, V1alpha2LeaseCandidateList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "coordination.k8s.io/v1alpha2",
    plural: "leasecandidates",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function coordinationV1beta1Leasecandidates(client: KubernetesClient): ResourceClient<V1beta1LeaseCandidate, V1beta1LeaseCandidateList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1beta1LeaseCandidate, V1beta1LeaseCandidateList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "coordination.k8s.io/v1beta1",
    plural: "leasecandidates",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function componentstatuses(client: KubernetesClient): ResourceClient<V1ComponentStatus, V1ComponentStatusList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1ComponentStatus, V1ComponentStatusList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "componentstatuses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function configmaps(client: KubernetesClient): ResourceClient<V1ConfigMap, V1ConfigMapList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1ConfigMap, V1ConfigMapList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "configmaps",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function coreV1Events(client: KubernetesClient): ResourceClient<V1CoreEvent, V1CoreEventList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1CoreEvent, V1CoreEventList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "events",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function endpoints(client: KubernetesClient): ResourceClient<V1Endpoints, V1EndpointsList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1Endpoints, V1EndpointsList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "endpoints",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function limitranges(client: KubernetesClient): ResourceClient<V1LimitRange, V1LimitRangeList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1LimitRange, V1LimitRangeList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "limitranges",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function namespaces(client: KubernetesClient): ResourceClient<V1Namespace, V1NamespaceList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1Namespace, V1NamespaceList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "namespaces",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface NodesClient extends ResourceClient<V1Node, V1NodeList, "cluster", KubernetesVerbOptions> {
  proxy: ResourceClient<unknown, unknown, "cluster", KubernetesVerbOptions>;
  status: ResourceClient<V1Node, V1Node, "cluster", KubernetesVerbOptions>;
}

export function nodes(client: KubernetesClient): NodesClient {
  const base = createResourceClient<V1Node, V1NodeList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "nodes",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    proxy: createResourceClient<unknown, unknown, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "nodes",
          namespaced: false,
        },
      undefined,
      undefined,
      "proxy",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1Node, V1Node, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "nodes",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface PersistentvolumeclaimsClient extends ResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaimList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaim, "namespaced", KubernetesVerbOptions>;
}

export function persistentvolumeclaims(client: KubernetesClient): PersistentvolumeclaimsClient {
  const base = createResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaimList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "persistentvolumeclaims",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1PersistentVolumeClaim, V1PersistentVolumeClaim, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "persistentvolumeclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface PersistentvolumesClient extends ResourceClient<V1PersistentVolume, V1PersistentVolumeList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1PersistentVolume, V1PersistentVolume, "cluster", KubernetesVerbOptions>;
}

export function persistentvolumes(client: KubernetesClient): PersistentvolumesClient {
  const base = createResourceClient<V1PersistentVolume, V1PersistentVolumeList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "persistentvolumes",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1PersistentVolume, V1PersistentVolume, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "persistentvolumes",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface PodsClient extends ResourceClient<V1Pod, V1PodList, "namespaced", KubernetesVerbOptions> {
  attach: ResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>;
  ephemeralcontainers: ResourceClient<V1Pod, V1Pod, "namespaced", KubernetesVerbOptions>;
  exec: ResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>;
  log: ResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>;
  portforward: ResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>;
  proxy: ResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>;
  resize: ResourceClient<V1Pod, V1Pod, "namespaced", KubernetesVerbOptions>;
  status: ResourceClient<V1Pod, V1Pod, "namespaced", KubernetesVerbOptions>;
}

export function pods(client: KubernetesClient): PodsClient {
  const base = createResourceClient<V1Pod, V1PodList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "pods",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    attach: createResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "attach",
      kubernetesQueryMapper,
    ),
    ephemeralcontainers: createResourceClient<V1Pod, V1Pod, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "ephemeralcontainers",
      kubernetesQueryMapper,
    ),
    exec: createResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "exec",
      kubernetesQueryMapper,
    ),
    log: createResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "log",
      kubernetesQueryMapper,
    ),
    portforward: createResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "portforward",
      kubernetesQueryMapper,
    ),
    proxy: createResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "proxy",
      kubernetesQueryMapper,
    ),
    resize: createResourceClient<V1Pod, V1Pod, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "resize",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1Pod, V1Pod, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "pods",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function podtemplates(client: KubernetesClient): ResourceClient<V1PodTemplate, V1PodTemplateList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1PodTemplate, V1PodTemplateList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "podtemplates",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface ReplicationcontrollersClient extends ResourceClient<V1ReplicationController, V1ReplicationControllerList, "namespaced", KubernetesVerbOptions> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>;
  status: ResourceClient<V1ReplicationController, V1ReplicationController, "namespaced", KubernetesVerbOptions>;
}

export function replicationcontrollers(client: KubernetesClient): ReplicationcontrollersClient {
  const base = createResourceClient<V1ReplicationController, V1ReplicationControllerList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "replicationcontrollers",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "replicationcontrollers",
          namespaced: true,
        },
      undefined,
      undefined,
      "scale",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1ReplicationController, V1ReplicationController, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "replicationcontrollers",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface ResourcequotasClient extends ResourceClient<V1ResourceQuota, V1ResourceQuotaList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1ResourceQuota, V1ResourceQuota, "namespaced", KubernetesVerbOptions>;
}

export function resourcequotas(client: KubernetesClient): ResourcequotasClient {
  const base = createResourceClient<V1ResourceQuota, V1ResourceQuotaList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "resourcequotas",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1ResourceQuota, V1ResourceQuota, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "resourcequotas",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function secrets(client: KubernetesClient): ResourceClient<V1Secret, V1SecretList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1Secret, V1SecretList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "secrets",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function serviceaccounts(client: KubernetesClient): ResourceClient<V1ServiceAccount, V1ServiceAccountList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1ServiceAccount, V1ServiceAccountList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "serviceaccounts",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface ServicesClient extends ResourceClient<V1Service, V1ServiceList, "namespaced", KubernetesVerbOptions> {
  proxy: ResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>;
  status: ResourceClient<V1Service, V1Service, "namespaced", KubernetesVerbOptions>;
}

export function services(client: KubernetesClient): ServicesClient {
  const base = createResourceClient<V1Service, V1ServiceList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "v1",
    plural: "services",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    proxy: createResourceClient<unknown, unknown, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "services",
          namespaced: true,
        },
      undefined,
      undefined,
      "proxy",
      kubernetesQueryMapper,
    ),
    status: createResourceClient<V1Service, V1Service, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "v1",
          plural: "services",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function endpointslices(client: KubernetesClient): ResourceClient<V1EndpointSlice, V1EndpointSliceList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1EndpointSlice, V1EndpointSliceList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "discovery.k8s.io/v1",
    plural: "endpointslices",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function eventsV1Events(client: KubernetesClient): ResourceClient<V1EventsEvent, V1EventsEventList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1EventsEvent, V1EventsEventList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "events.k8s.io/v1",
    plural: "events",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface FlowschemasClient extends ResourceClient<V1FlowSchema, V1FlowSchemaList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1FlowSchema, V1FlowSchema, "cluster", KubernetesVerbOptions>;
}

export function flowschemas(client: KubernetesClient): FlowschemasClient {
  const base = createResourceClient<V1FlowSchema, V1FlowSchemaList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "flowcontrol.apiserver.k8s.io/v1",
    plural: "flowschemas",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1FlowSchema, V1FlowSchema, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "flowcontrol.apiserver.k8s.io/v1",
          plural: "flowschemas",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface PrioritylevelconfigurationsClient extends ResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfigurationList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfiguration, "cluster", KubernetesVerbOptions>;
}

export function prioritylevelconfigurations(client: KubernetesClient): PrioritylevelconfigurationsClient {
  const base = createResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfigurationList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "flowcontrol.apiserver.k8s.io/v1",
    plural: "prioritylevelconfigurations",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1PriorityLevelConfiguration, V1PriorityLevelConfiguration, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "flowcontrol.apiserver.k8s.io/v1",
          plural: "prioritylevelconfigurations",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export interface StorageversionsClient extends ResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersionList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersion, "cluster", KubernetesVerbOptions>;
}

export function storageversions(client: KubernetesClient): StorageversionsClient {
  const base = createResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersionList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "internal.apiserver.k8s.io/v1alpha1",
    plural: "storageversions",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1alpha1StorageVersion, V1alpha1StorageVersion, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "internal.apiserver.k8s.io/v1alpha1",
          plural: "storageversions",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function ingressclasses(client: KubernetesClient): ResourceClient<V1IngressClass, V1IngressClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1IngressClass, V1IngressClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "ingressclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface IngressesClient extends ResourceClient<V1Ingress, V1IngressList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1Ingress, V1Ingress, "namespaced", KubernetesVerbOptions>;
}

export function ingresses(client: KubernetesClient): IngressesClient {
  const base = createResourceClient<V1Ingress, V1IngressList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "ingresses",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1Ingress, V1Ingress, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "networking.k8s.io/v1",
          plural: "ingresses",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function networkingV1Ipaddresses(client: KubernetesClient): ResourceClient<V1IPAddress, V1IPAddressList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1IPAddress, V1IPAddressList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "ipaddresses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface NetworkingV1ServicecidrsClient extends ResourceClient<V1ServiceCIDR, V1ServiceCIDRList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1ServiceCIDR, V1ServiceCIDR, "cluster", KubernetesVerbOptions>;
}

export function networkingV1Servicecidrs(client: KubernetesClient): NetworkingV1ServicecidrsClient {
  const base = createResourceClient<V1ServiceCIDR, V1ServiceCIDRList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "servicecidrs",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1ServiceCIDR, V1ServiceCIDR, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "networking.k8s.io/v1",
          plural: "servicecidrs",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function networkpolicies(client: KubernetesClient): ResourceClient<V1NetworkPolicy, V1NetworkPolicyList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1NetworkPolicy, V1NetworkPolicyList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1",
    plural: "networkpolicies",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function networkingV1beta1Ipaddresses(client: KubernetesClient): ResourceClient<V1beta1IPAddress, V1beta1IPAddressList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta1IPAddress, V1beta1IPAddressList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1beta1",
    plural: "ipaddresses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface NetworkingV1beta1ServicecidrsClient extends ResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDRList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDR, "cluster", KubernetesVerbOptions>;
}

export function networkingV1beta1Servicecidrs(client: KubernetesClient): NetworkingV1beta1ServicecidrsClient {
  const base = createResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDRList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "networking.k8s.io/v1beta1",
    plural: "servicecidrs",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1beta1ServiceCIDR, V1beta1ServiceCIDR, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "networking.k8s.io/v1beta1",
          plural: "servicecidrs",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function runtimeclasses(client: KubernetesClient): ResourceClient<V1RuntimeClass, V1RuntimeClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1RuntimeClass, V1RuntimeClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "node.k8s.io/v1",
    plural: "runtimeclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface PoddisruptionbudgetsClient extends ResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudgetList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudget, "namespaced", KubernetesVerbOptions>;
}

export function poddisruptionbudgets(client: KubernetesClient): PoddisruptionbudgetsClient {
  const base = createResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudgetList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "policy/v1",
    plural: "poddisruptionbudgets",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1PodDisruptionBudget, V1PodDisruptionBudget, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "policy/v1",
          plural: "poddisruptionbudgets",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function clusterrolebindings(client: KubernetesClient): ResourceClient<V1ClusterRoleBinding, V1ClusterRoleBindingList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1ClusterRoleBinding, V1ClusterRoleBindingList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "clusterrolebindings",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function clusterroles(client: KubernetesClient): ResourceClient<V1ClusterRole, V1ClusterRoleList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1ClusterRole, V1ClusterRoleList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "clusterroles",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function rolebindings(client: KubernetesClient): ResourceClient<V1RoleBinding, V1RoleBindingList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1RoleBinding, V1RoleBindingList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "rolebindings",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function roles(client: KubernetesClient): ResourceClient<V1Role, V1RoleList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1Role, V1RoleList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "rbac.authorization.k8s.io/v1",
    plural: "roles",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function devicetaintrules(client: KubernetesClient): ResourceClient<V1alpha3DeviceTaintRule, V1alpha3DeviceTaintRuleList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha3DeviceTaintRule, V1alpha3DeviceTaintRuleList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1alpha3",
    plural: "devicetaintrules",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function resourceApiV1alpha3Deviceclasses(client: KubernetesClient): ResourceClient<V1alpha3DeviceClass, V1alpha3DeviceClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha3DeviceClass, V1alpha3DeviceClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1alpha3",
    plural: "deviceclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface ResourceApiV1alpha3ResourceclaimsClient extends ResourceClient<V1alpha3ResourceClaim, V1alpha3ResourceClaimList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1alpha3ResourceClaim, V1alpha3ResourceClaim, "namespaced", KubernetesVerbOptions>;
}

export function resourceApiV1alpha3Resourceclaims(client: KubernetesClient): ResourceApiV1alpha3ResourceclaimsClient {
  const base = createResourceClient<V1alpha3ResourceClaim, V1alpha3ResourceClaimList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1alpha3",
    plural: "resourceclaims",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1alpha3ResourceClaim, V1alpha3ResourceClaim, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "resource.k8s.io/v1alpha3",
          plural: "resourceclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function resourceApiV1alpha3Resourceclaimtemplates(client: KubernetesClient): ResourceClient<V1alpha3ResourceClaimTemplate, V1alpha3ResourceClaimTemplateList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1alpha3ResourceClaimTemplate, V1alpha3ResourceClaimTemplateList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1alpha3",
    plural: "resourceclaimtemplates",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function resourceApiV1alpha3Resourceslices(client: KubernetesClient): ResourceClient<V1alpha3ResourceSlice, V1alpha3ResourceSliceList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha3ResourceSlice, V1alpha3ResourceSliceList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1alpha3",
    plural: "resourceslices",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function resourceApiV1beta1Deviceclasses(client: KubernetesClient): ResourceClient<V1beta1DeviceClass, V1beta1DeviceClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta1DeviceClass, V1beta1DeviceClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "deviceclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface ResourceApiV1beta1ResourceclaimsClient extends ResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaimList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaim, "namespaced", KubernetesVerbOptions>;
}

export function resourceApiV1beta1Resourceclaims(client: KubernetesClient): ResourceApiV1beta1ResourceclaimsClient {
  const base = createResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaimList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "resourceclaims",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1beta1ResourceClaim, V1beta1ResourceClaim, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "resource.k8s.io/v1beta1",
          plural: "resourceclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function resourceApiV1beta1Resourceclaimtemplates(client: KubernetesClient): ResourceClient<V1beta1ResourceClaimTemplate, V1beta1ResourceClaimTemplateList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1beta1ResourceClaimTemplate, V1beta1ResourceClaimTemplateList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "resourceclaimtemplates",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function resourceApiV1beta1Resourceslices(client: KubernetesClient): ResourceClient<V1beta1ResourceSlice, V1beta1ResourceSliceList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta1ResourceSlice, V1beta1ResourceSliceList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta1",
    plural: "resourceslices",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function resourceApiV1beta2Deviceclasses(client: KubernetesClient): ResourceClient<V1beta2DeviceClass, V1beta2DeviceClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta2DeviceClass, V1beta2DeviceClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "deviceclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface ResourceApiV1beta2ResourceclaimsClient extends ResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaimList, "namespaced", KubernetesVerbOptions> {
  status: ResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaim, "namespaced", KubernetesVerbOptions>;
}

export function resourceApiV1beta2Resourceclaims(client: KubernetesClient): ResourceApiV1beta2ResourceclaimsClient {
  const base = createResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaimList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "resourceclaims",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1beta2ResourceClaim, V1beta2ResourceClaim, "namespaced", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "resource.k8s.io/v1beta2",
          plural: "resourceclaims",
          namespaced: true,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function resourceApiV1beta2Resourceclaimtemplates(client: KubernetesClient): ResourceClient<V1beta2ResourceClaimTemplate, V1beta2ResourceClaimTemplateList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1beta2ResourceClaimTemplate, V1beta2ResourceClaimTemplateList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "resourceclaimtemplates",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function resourceApiV1beta2Resourceslices(client: KubernetesClient): ResourceClient<V1beta2ResourceSlice, V1beta2ResourceSliceList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta2ResourceSlice, V1beta2ResourceSliceList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "resource.k8s.io/v1beta2",
    plural: "resourceslices",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function priorityclasses(client: KubernetesClient): ResourceClient<V1PriorityClass, V1PriorityClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1PriorityClass, V1PriorityClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "scheduling.k8s.io/v1",
    plural: "priorityclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function csidrivers(client: KubernetesClient): ResourceClient<V1CSIDriver, V1CSIDriverList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1CSIDriver, V1CSIDriverList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "csidrivers",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function csinodes(client: KubernetesClient): ResourceClient<V1CSINode, V1CSINodeList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1CSINode, V1CSINodeList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "csinodes",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function csistoragecapacities(client: KubernetesClient): ResourceClient<V1CSIStorageCapacity, V1CSIStorageCapacityList, "namespaced", KubernetesVerbOptions> {
  return createResourceClient<V1CSIStorageCapacity, V1CSIStorageCapacityList, "namespaced", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "csistoragecapacities",
    namespaced: true,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function storageclasses(client: KubernetesClient): ResourceClient<V1StorageClass, V1StorageClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1StorageClass, V1StorageClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "storageclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface VolumeattachmentsClient extends ResourceClient<V1VolumeAttachment, V1VolumeAttachmentList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1VolumeAttachment, V1VolumeAttachment, "cluster", KubernetesVerbOptions>;
}

export function volumeattachments(client: KubernetesClient): VolumeattachmentsClient {
  const base = createResourceClient<V1VolumeAttachment, V1VolumeAttachmentList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1",
    plural: "volumeattachments",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1VolumeAttachment, V1VolumeAttachment, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "storage.k8s.io/v1",
          plural: "volumeattachments",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}

export function storageV1alpha1Volumeattributesclasses(client: KubernetesClient): ResourceClient<V1alpha1VolumeAttributesClass, V1alpha1VolumeAttributesClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1alpha1VolumeAttributesClass, V1alpha1VolumeAttributesClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1alpha1",
    plural: "volumeattributesclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export function storageV1beta1Volumeattributesclasses(client: KubernetesClient): ResourceClient<V1beta1VolumeAttributesClass, V1beta1VolumeAttributesClassList, "cluster", KubernetesVerbOptions> {
  return createResourceClient<V1beta1VolumeAttributesClass, V1beta1VolumeAttributesClassList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storage.k8s.io/v1beta1",
    plural: "volumeattributesclasses",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);
}

export interface StorageversionmigrationsClient extends ResourceClient<V1alpha1StorageVersionMigration, V1alpha1StorageVersionMigrationList, "cluster", KubernetesVerbOptions> {
  status: ResourceClient<V1alpha1StorageVersionMigration, V1alpha1StorageVersionMigration, "cluster", KubernetesVerbOptions>;
}

export function storageversionmigrations(client: KubernetesClient): StorageversionmigrationsClient {
  const base = createResourceClient<V1alpha1StorageVersionMigration, V1alpha1StorageVersionMigrationList, "cluster", KubernetesVerbOptions>(client, {
    apiVersion: "storagemigration.k8s.io/v1alpha1",
    plural: "storageversionmigrations",
    namespaced: false,
  }, undefined, undefined, undefined, kubernetesQueryMapper);

  return {
    ...base,
    status: createResourceClient<V1alpha1StorageVersionMigration, V1alpha1StorageVersionMigration, "cluster", KubernetesVerbOptions>(
      client,
      {
          apiVersion: "storagemigration.k8s.io/v1alpha1",
          plural: "storageversionmigrations",
          namespaced: false,
        },
      undefined,
      undefined,
      "status",
      kubernetesQueryMapper,
    ),
  };
}
