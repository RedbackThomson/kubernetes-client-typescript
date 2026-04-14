import type { QueryMapper, VerbOptions } from "@kubernetes-typescript/runtime";

export interface KubernetesListOptions {
  labelSelector?: string;
  fieldSelector?: string;
  watch?: boolean;
  allowWatchBookmarks?: boolean;
  resourceVersion?: string;
  resourceVersionMatch?: string;
  timeoutSeconds?: number;
  limit?: number;
  continue?: string;
  sendInitialEvents?: boolean;
}

export interface KubernetesGetOptions {
  resourceVersion?: string;
}

export interface KubernetesCreateOptions {
  dryRun?: string[];
  fieldManager?: string;
  fieldValidation?: string;
}

export interface KubernetesUpdateOptions {
  dryRun?: string[];
  fieldManager?: string;
  fieldValidation?: string;
}

export interface KubernetesPatchOptions {
  dryRun?: string[];
  force?: boolean;
  fieldManager?: string;
  fieldValidation?: string;
}

export interface KubernetesDeleteOptions {
  gracePeriodSeconds?: number;
  preconditions?: { uid?: string; resourceVersion?: string };
  orphanDependents?: boolean;
  propagationPolicy?: "Orphan" | "Background" | "Foreground";
  dryRun?: string[];
  ignoreStoreReadErrorWithClusterBreakingPotential?: boolean;
}

export interface KubernetesVerbOptions extends VerbOptions {
  get: KubernetesGetOptions;
  list: KubernetesListOptions;
  create: KubernetesCreateOptions;
  update: KubernetesUpdateOptions;
  patch: KubernetesPatchOptions;
  delete: KubernetesDeleteOptions;
}

export const kubernetesQueryMapper: QueryMapper<KubernetesVerbOptions> = {
  get: (options) => ({
    resourceVersion: options.resourceVersion,
  }),
  list: (options) => ({
    labelSelector: options.labelSelector,
    fieldSelector: options.fieldSelector,
    watch: options.watch,
    allowWatchBookmarks: options.allowWatchBookmarks,
    resourceVersion: options.resourceVersion,
    resourceVersionMatch: options.resourceVersionMatch,
    timeoutSeconds: options.timeoutSeconds,
    limit: options.limit,
    continue: options.continue,
    sendInitialEvents: options.sendInitialEvents,
  }),
  create: (options) => ({
    fieldManager: options.fieldManager,
    fieldValidation: options.fieldValidation,
  }),
  update: (options) => ({
    fieldManager: options.fieldManager,
    fieldValidation: options.fieldValidation,
  }),
  patch: (options) => ({
    force: options.force,
    fieldManager: options.fieldManager,
    fieldValidation: options.fieldValidation,
  }),
  delete: (options) => ({
    gracePeriodSeconds: options.gracePeriodSeconds,
    orphanDependents: options.orphanDependents,
    propagationPolicy: options.propagationPolicy,
    ignoreStoreReadErrorWithClusterBreakingPotential:
      options.ignoreStoreReadErrorWithClusterBreakingPotential,
  }),
};
