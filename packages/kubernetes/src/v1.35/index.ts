import { createClient, createResourceClient } from "@kubernetes-typescript/runtime";
import type { ClientOptions, KubernetesClient, ResourceClient, ResponseSchema } from "@kubernetes-typescript/runtime";
import { kubernetesQueryMapper } from "../options.js";
import type { KubernetesVerbOptions } from "../options.js";
import { mutatingwebhookconfigurations, validatingadmissionpolicies, validatingadmissionpolicybindings, validatingwebhookconfigurations, admissionregistrationV1alpha1Mutatingadmissionpolicies, admissionregistrationV1alpha1Mutatingadmissionpolicybindings, admissionregistrationV1beta1Mutatingadmissionpolicies, admissionregistrationV1beta1Mutatingadmissionpolicybindings, customresourcedefinitions, apiservices, controllerrevisions, daemonsets, deployments, replicasets, statefulsets, autoscalingV1Horizontalpodautoscalers, autoscalingV2Horizontalpodautoscalers, cronjobs, jobs, certificatesigningrequests, certificatesV1alpha1Clustertrustbundles, certificatesV1beta1Clustertrustbundles, podcertificaterequests, leases, coordinationV1alpha2Leasecandidates, coordinationV1beta1Leasecandidates, componentstatuses, configmaps, coreV1Events, endpoints, limitranges, namespaces, nodes, persistentvolumeclaims, persistentvolumes, pods, podtemplates, replicationcontrollers, resourcequotas, secrets, serviceaccounts, services, endpointslices, eventsV1Events, flowschemas, prioritylevelconfigurations, storageversions, ingressclasses, ingresses, networkingV1Ipaddresses, networkingV1Servicecidrs, networkpolicies, networkingV1beta1Ipaddresses, networkingV1beta1Servicecidrs, runtimeclasses, poddisruptionbudgets, clusterrolebindings, clusterroles, rolebindings, roles, resourceApiV1Deviceclasses, resourceApiV1Resourceclaims, resourceApiV1Resourceclaimtemplates, resourceApiV1Resourceslices, devicetaintrules, resourceApiV1beta1Deviceclasses, resourceApiV1beta1Resourceclaims, resourceApiV1beta1Resourceclaimtemplates, resourceApiV1beta1Resourceslices, resourceApiV1beta2Deviceclasses, resourceApiV1beta2Resourceclaims, resourceApiV1beta2Resourceclaimtemplates, resourceApiV1beta2Resourceslices, priorityclasses, workloads, csidrivers, csinodes, csistoragecapacities, storageclasses, storageV1Volumeattributesclasses, volumeattachments, storageV1beta1Volumeattributesclasses, storageversionmigrations } from "./resources/index.js";

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
  admissionregistration: {
    v1: {
      mutatingwebhookconfigurations: ReturnType<typeof mutatingwebhookconfigurations>;
      validatingadmissionpolicies: ReturnType<typeof validatingadmissionpolicies>;
      validatingadmissionpolicybindings: ReturnType<typeof validatingadmissionpolicybindings>;
      validatingwebhookconfigurations: ReturnType<typeof validatingwebhookconfigurations>;
    };
    v1alpha1: {
      mutatingadmissionpolicies: ReturnType<typeof admissionregistrationV1alpha1Mutatingadmissionpolicies>;
      mutatingadmissionpolicybindings: ReturnType<typeof admissionregistrationV1alpha1Mutatingadmissionpolicybindings>;
    };
    v1beta1: {
      mutatingadmissionpolicies: ReturnType<typeof admissionregistrationV1beta1Mutatingadmissionpolicies>;
      mutatingadmissionpolicybindings: ReturnType<typeof admissionregistrationV1beta1Mutatingadmissionpolicybindings>;
    };
  };
  apiextensions: {
    v1: {
      customresourcedefinitions: ReturnType<typeof customresourcedefinitions>;
    };
  };
  apiregistration: {
    v1: {
      apiservices: ReturnType<typeof apiservices>;
    };
  };
  apps: {
    v1: {
      controllerrevisions: ReturnType<typeof controllerrevisions>;
      daemonsets: ReturnType<typeof daemonsets>;
      deployments: ReturnType<typeof deployments>;
      replicasets: ReturnType<typeof replicasets>;
      statefulsets: ReturnType<typeof statefulsets>;
    };
  };
  autoscaling: {
    v1: {
      horizontalpodautoscalers: ReturnType<typeof autoscalingV1Horizontalpodautoscalers>;
    };
    v2: {
      horizontalpodautoscalers: ReturnType<typeof autoscalingV2Horizontalpodautoscalers>;
    };
  };
  batch: {
    v1: {
      cronjobs: ReturnType<typeof cronjobs>;
      jobs: ReturnType<typeof jobs>;
    };
  };
  certificates: {
    v1: {
      certificatesigningrequests: ReturnType<typeof certificatesigningrequests>;
    };
    v1alpha1: {
      clustertrustbundles: ReturnType<typeof certificatesV1alpha1Clustertrustbundles>;
    };
    v1beta1: {
      clustertrustbundles: ReturnType<typeof certificatesV1beta1Clustertrustbundles>;
      podcertificaterequests: ReturnType<typeof podcertificaterequests>;
    };
  };
  coordination: {
    v1: {
      leases: ReturnType<typeof leases>;
    };
    v1alpha2: {
      leasecandidates: ReturnType<typeof coordinationV1alpha2Leasecandidates>;
    };
    v1beta1: {
      leasecandidates: ReturnType<typeof coordinationV1beta1Leasecandidates>;
    };
  };
  core: {
    v1: {
      componentstatuses: ReturnType<typeof componentstatuses>;
      configmaps: ReturnType<typeof configmaps>;
      endpoints: ReturnType<typeof endpoints>;
      events: ReturnType<typeof coreV1Events>;
      limitranges: ReturnType<typeof limitranges>;
      namespaces: ReturnType<typeof namespaces>;
      nodes: ReturnType<typeof nodes>;
      persistentvolumeclaims: ReturnType<typeof persistentvolumeclaims>;
      persistentvolumes: ReturnType<typeof persistentvolumes>;
      pods: ReturnType<typeof pods>;
      podtemplates: ReturnType<typeof podtemplates>;
      replicationcontrollers: ReturnType<typeof replicationcontrollers>;
      resourcequotas: ReturnType<typeof resourcequotas>;
      secrets: ReturnType<typeof secrets>;
      serviceaccounts: ReturnType<typeof serviceaccounts>;
      services: ReturnType<typeof services>;
    };
  };
  discovery: {
    v1: {
      endpointslices: ReturnType<typeof endpointslices>;
    };
  };
  events: {
    v1: {
      events: ReturnType<typeof eventsV1Events>;
    };
  };
  flowcontrol: {
    v1: {
      flowschemas: ReturnType<typeof flowschemas>;
      prioritylevelconfigurations: ReturnType<typeof prioritylevelconfigurations>;
    };
  };
  internal: {
    v1alpha1: {
      storageversions: ReturnType<typeof storageversions>;
    };
  };
  networking: {
    v1: {
      ingressclasses: ReturnType<typeof ingressclasses>;
      ingresses: ReturnType<typeof ingresses>;
      ipaddresses: ReturnType<typeof networkingV1Ipaddresses>;
      networkpolicies: ReturnType<typeof networkpolicies>;
      servicecidrs: ReturnType<typeof networkingV1Servicecidrs>;
    };
    v1beta1: {
      ipaddresses: ReturnType<typeof networkingV1beta1Ipaddresses>;
      servicecidrs: ReturnType<typeof networkingV1beta1Servicecidrs>;
    };
  };
  node: {
    v1: {
      runtimeclasses: ReturnType<typeof runtimeclasses>;
    };
  };
  policy: {
    v1: {
      poddisruptionbudgets: ReturnType<typeof poddisruptionbudgets>;
    };
  };
  rbac: {
    v1: {
      clusterrolebindings: ReturnType<typeof clusterrolebindings>;
      clusterroles: ReturnType<typeof clusterroles>;
      rolebindings: ReturnType<typeof rolebindings>;
      roles: ReturnType<typeof roles>;
    };
  };
  resourceApi: {
    v1: {
      deviceclasses: ReturnType<typeof resourceApiV1Deviceclasses>;
      resourceclaims: ReturnType<typeof resourceApiV1Resourceclaims>;
      resourceclaimtemplates: ReturnType<typeof resourceApiV1Resourceclaimtemplates>;
      resourceslices: ReturnType<typeof resourceApiV1Resourceslices>;
    };
    v1alpha3: {
      devicetaintrules: ReturnType<typeof devicetaintrules>;
    };
    v1beta1: {
      deviceclasses: ReturnType<typeof resourceApiV1beta1Deviceclasses>;
      resourceclaims: ReturnType<typeof resourceApiV1beta1Resourceclaims>;
      resourceclaimtemplates: ReturnType<typeof resourceApiV1beta1Resourceclaimtemplates>;
      resourceslices: ReturnType<typeof resourceApiV1beta1Resourceslices>;
    };
    v1beta2: {
      deviceclasses: ReturnType<typeof resourceApiV1beta2Deviceclasses>;
      resourceclaims: ReturnType<typeof resourceApiV1beta2Resourceclaims>;
      resourceclaimtemplates: ReturnType<typeof resourceApiV1beta2Resourceclaimtemplates>;
      resourceslices: ReturnType<typeof resourceApiV1beta2Resourceslices>;
    };
  };
  scheduling: {
    v1: {
      priorityclasses: ReturnType<typeof priorityclasses>;
    };
    v1alpha1: {
      workloads: ReturnType<typeof workloads>;
    };
  };
  storage: {
    v1: {
      csidrivers: ReturnType<typeof csidrivers>;
      csinodes: ReturnType<typeof csinodes>;
      csistoragecapacities: ReturnType<typeof csistoragecapacities>;
      storageclasses: ReturnType<typeof storageclasses>;
      volumeattachments: ReturnType<typeof volumeattachments>;
      volumeattributesclasses: ReturnType<typeof storageV1Volumeattributesclasses>;
    };
    v1beta1: {
      volumeattributesclasses: ReturnType<typeof storageV1beta1Volumeattributesclasses>;
    };
  };
  storagemigration: {
    v1beta1: {
      storageversionmigrations: ReturnType<typeof storageversionmigrations>;
    };
  };
  resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: true },
  ): ResourceClient<TResource, TList, "namespaced", KubernetesVerbOptions>;
  resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },
  ): ResourceClient<TResource, TList, "cluster", KubernetesVerbOptions>;
}

export function createKubernetesClient(options: ClientOptions): KubernetesConvenienceClient {
  return createKubernetesClientFromRuntime(createClient(options));
}

export function createKubernetesClientFromRuntime(client: KubernetesClient): KubernetesConvenienceClient {
  return {
    admissionregistration: {
      v1: {
        mutatingwebhookconfigurations: mutatingwebhookconfigurations(client),
        validatingadmissionpolicies: validatingadmissionpolicies(client),
        validatingadmissionpolicybindings: validatingadmissionpolicybindings(client),
        validatingwebhookconfigurations: validatingwebhookconfigurations(client),
      },
      v1alpha1: {
        mutatingadmissionpolicies: admissionregistrationV1alpha1Mutatingadmissionpolicies(client),
        mutatingadmissionpolicybindings: admissionregistrationV1alpha1Mutatingadmissionpolicybindings(client),
      },
      v1beta1: {
        mutatingadmissionpolicies: admissionregistrationV1beta1Mutatingadmissionpolicies(client),
        mutatingadmissionpolicybindings: admissionregistrationV1beta1Mutatingadmissionpolicybindings(client),
      },
    },
    apiextensions: {
      v1: {
        customresourcedefinitions: customresourcedefinitions(client),
      },
    },
    apiregistration: {
      v1: {
        apiservices: apiservices(client),
      },
    },
    apps: {
      v1: {
        controllerrevisions: controllerrevisions(client),
        daemonsets: daemonsets(client),
        deployments: deployments(client),
        replicasets: replicasets(client),
        statefulsets: statefulsets(client),
      },
    },
    autoscaling: {
      v1: {
        horizontalpodautoscalers: autoscalingV1Horizontalpodautoscalers(client),
      },
      v2: {
        horizontalpodautoscalers: autoscalingV2Horizontalpodautoscalers(client),
      },
    },
    batch: {
      v1: {
        cronjobs: cronjobs(client),
        jobs: jobs(client),
      },
    },
    certificates: {
      v1: {
        certificatesigningrequests: certificatesigningrequests(client),
      },
      v1alpha1: {
        clustertrustbundles: certificatesV1alpha1Clustertrustbundles(client),
      },
      v1beta1: {
        clustertrustbundles: certificatesV1beta1Clustertrustbundles(client),
        podcertificaterequests: podcertificaterequests(client),
      },
    },
    coordination: {
      v1: {
        leases: leases(client),
      },
      v1alpha2: {
        leasecandidates: coordinationV1alpha2Leasecandidates(client),
      },
      v1beta1: {
        leasecandidates: coordinationV1beta1Leasecandidates(client),
      },
    },
    core: {
      v1: {
        componentstatuses: componentstatuses(client),
        configmaps: configmaps(client),
        endpoints: endpoints(client),
        events: coreV1Events(client),
        limitranges: limitranges(client),
        namespaces: namespaces(client),
        nodes: nodes(client),
        persistentvolumeclaims: persistentvolumeclaims(client),
        persistentvolumes: persistentvolumes(client),
        pods: pods(client),
        podtemplates: podtemplates(client),
        replicationcontrollers: replicationcontrollers(client),
        resourcequotas: resourcequotas(client),
        secrets: secrets(client),
        serviceaccounts: serviceaccounts(client),
        services: services(client),
      },
    },
    discovery: {
      v1: {
        endpointslices: endpointslices(client),
      },
    },
    events: {
      v1: {
        events: eventsV1Events(client),
      },
    },
    flowcontrol: {
      v1: {
        flowschemas: flowschemas(client),
        prioritylevelconfigurations: prioritylevelconfigurations(client),
      },
    },
    internal: {
      v1alpha1: {
        storageversions: storageversions(client),
      },
    },
    networking: {
      v1: {
        ingressclasses: ingressclasses(client),
        ingresses: ingresses(client),
        ipaddresses: networkingV1Ipaddresses(client),
        networkpolicies: networkpolicies(client),
        servicecidrs: networkingV1Servicecidrs(client),
      },
      v1beta1: {
        ipaddresses: networkingV1beta1Ipaddresses(client),
        servicecidrs: networkingV1beta1Servicecidrs(client),
      },
    },
    node: {
      v1: {
        runtimeclasses: runtimeclasses(client),
      },
    },
    policy: {
      v1: {
        poddisruptionbudgets: poddisruptionbudgets(client),
      },
    },
    rbac: {
      v1: {
        clusterrolebindings: clusterrolebindings(client),
        clusterroles: clusterroles(client),
        rolebindings: rolebindings(client),
        roles: roles(client),
      },
    },
    resourceApi: {
      v1: {
        deviceclasses: resourceApiV1Deviceclasses(client),
        resourceclaims: resourceApiV1Resourceclaims(client),
        resourceclaimtemplates: resourceApiV1Resourceclaimtemplates(client),
        resourceslices: resourceApiV1Resourceslices(client),
      },
      v1alpha3: {
        devicetaintrules: devicetaintrules(client),
      },
      v1beta1: {
        deviceclasses: resourceApiV1beta1Deviceclasses(client),
        resourceclaims: resourceApiV1beta1Resourceclaims(client),
        resourceclaimtemplates: resourceApiV1beta1Resourceclaimtemplates(client),
        resourceslices: resourceApiV1beta1Resourceslices(client),
      },
      v1beta2: {
        deviceclasses: resourceApiV1beta2Deviceclasses(client),
        resourceclaims: resourceApiV1beta2Resourceclaims(client),
        resourceclaimtemplates: resourceApiV1beta2Resourceclaimtemplates(client),
        resourceslices: resourceApiV1beta2Resourceslices(client),
      },
    },
    scheduling: {
      v1: {
        priorityclasses: priorityclasses(client),
      },
      v1alpha1: {
        workloads: workloads(client),
      },
    },
    storage: {
      v1: {
        csidrivers: csidrivers(client),
        csinodes: csinodes(client),
        csistoragecapacities: csistoragecapacities(client),
        storageclasses: storageclasses(client),
        volumeattachments: volumeattachments(client),
        volumeattributesclasses: storageV1Volumeattributesclasses(client),
      },
      v1beta1: {
        volumeattributesclasses: storageV1beta1Volumeattributesclasses(client),
      },
    },
    storagemigration: {
      v1beta1: {
        storageversionmigrations: storageversionmigrations(client),
      },
    },
    resource: createDynamicResourceFactory(client),
  };
}

function createDynamicResourceFactory(client: KubernetesClient): KubernetesConvenienceClient["resource"] {
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: true },
  ): ResourceClient<TResource, TList, "namespaced", KubernetesVerbOptions>;
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList> & { namespaced: false },
  ): ResourceClient<TResource, TList, "cluster", KubernetesVerbOptions>;
  function resource<TResource, TList = { items: TResource[] }>(
    options: DynamicResourceOptions<TResource, TList>,
  ): ResourceClient<TResource, TList, "namespaced", KubernetesVerbOptions> | ResourceClient<TResource, TList, "cluster", KubernetesVerbOptions> {
    return createResourceClient(
      client,
      {
        apiVersion: options.apiVersion,
        plural: options.plural,
        namespaced: options.namespaced,
      },
      options.schema,
      options.listSchema,
      undefined,
      kubernetesQueryMapper,
    );
  }

  return resource;
}
