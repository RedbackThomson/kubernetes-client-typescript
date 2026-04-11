export interface Info {
  buildDate: string;
  compiler: string;
  emulationMajor?: string;
  emulationMinor?: string;
  gitCommit: string;
  gitTreeState: string;
  gitVersion: string;
  goVersion: string;
  major: string;
  minCompatibilityMajor?: string;
  minCompatibilityMinor?: string;
  minor: string;
  platform: string;
}

export interface IntOrString {
  [key: string]: unknown;
}

export interface Quantity {
  [key: string]: unknown;
}

export interface RawExtension {
  [key: string]: unknown;
}

export interface V1AdmissionregistrationServiceReference {
  name: string;
  namespace: string;
  path?: string;
  port?: number;
}

export interface V1AdmissionregistrationWebhookClientConfig {
  caBundle?: string;
  service?: V1AdmissionregistrationServiceReference;
  url?: string;
}

export interface V1Affinity {
  nodeAffinity?: V1NodeAffinity;
  podAffinity?: V1PodAffinity;
  podAntiAffinity?: V1PodAntiAffinity;
}

export interface V1AggregationRule {
  clusterRoleSelectors?: V1LabelSelector[];
}

export interface V1alpha1ApplyConfiguration {
  expression?: string;
}

export interface V1alpha1ClusterTrustBundle {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha1ClusterTrustBundleSpec;
}

export interface V1alpha1ClusterTrustBundleList {
  apiVersion?: string;
  items: V1alpha1ClusterTrustBundle[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha1ClusterTrustBundleSpec {
  signerName?: string;
  trustBundle: string;
}

export interface V1alpha1GroupVersionResource {
  group?: string;
  resource?: string;
  version?: string;
}

export interface V1alpha1JSONPatch {
  expression?: string;
}

export interface V1alpha1MatchCondition {
  expression: string;
  name: string;
}

export interface V1alpha1MatchResources {
  excludeResourceRules?: V1alpha1NamedRuleWithOperations[];
  matchPolicy?: string;
  namespaceSelector?: V1LabelSelector;
  objectSelector?: V1LabelSelector;
  resourceRules?: V1alpha1NamedRuleWithOperations[];
}

export interface V1alpha1MigrationCondition {
  lastUpdateTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1alpha1MutatingAdmissionPolicy {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1alpha1MutatingAdmissionPolicySpec;
}

export interface V1alpha1MutatingAdmissionPolicyBinding {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1alpha1MutatingAdmissionPolicyBindingSpec;
}

export interface V1alpha1MutatingAdmissionPolicyBindingList {
  apiVersion?: string;
  items: V1alpha1MutatingAdmissionPolicyBinding[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha1MutatingAdmissionPolicyBindingSpec {
  matchResources?: V1alpha1MatchResources;
  paramRef?: V1alpha1ParamRef;
  policyName?: string;
}

export interface V1alpha1MutatingAdmissionPolicyList {
  apiVersion?: string;
  items: V1alpha1MutatingAdmissionPolicy[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha1MutatingAdmissionPolicySpec {
  failurePolicy?: string;
  matchConditions?: V1alpha1MatchCondition[];
  matchConstraints?: V1alpha1MatchResources;
  mutations?: V1alpha1Mutation[];
  paramKind?: V1alpha1ParamKind;
  reinvocationPolicy?: string;
  variables?: V1alpha1Variable[];
}

export interface V1alpha1Mutation {
  applyConfiguration?: V1alpha1ApplyConfiguration;
  jsonPatch?: V1alpha1JSONPatch;
  patchType: string;
}

export interface V1alpha1NamedRuleWithOperations {
  apiGroups?: string[];
  apiVersions?: string[];
  operations?: string[];
  resourceNames?: string[];
  resources?: string[];
  scope?: string;
}

export interface V1alpha1ParamKind {
  apiVersion?: string;
  kind?: string;
}

export interface V1alpha1ParamRef {
  name?: string;
  namespace?: string;
  parameterNotFoundAction?: string;
  selector?: V1LabelSelector;
}

export interface V1alpha1ServerStorageVersion {
  apiServerID?: string;
  decodableVersions?: string[];
  encodingVersion?: string;
  servedVersions?: string[];
}

export interface V1alpha1StorageVersion {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha1StorageVersionSpec;
  status: V1alpha1StorageVersionStatus;
}

export interface V1alpha1StorageVersionCondition {
  lastTransitionTime?: V1Time;
  message: string;
  observedGeneration?: number;
  reason: string;
  status: string;
  type: string;
}

export interface V1alpha1StorageVersionList {
  apiVersion?: string;
  items: V1alpha1StorageVersion[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha1StorageVersionMigration {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1alpha1StorageVersionMigrationSpec;
  status?: V1alpha1StorageVersionMigrationStatus;
}

export interface V1alpha1StorageVersionMigrationList {
  apiVersion?: string;
  items: V1alpha1StorageVersionMigration[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha1StorageVersionMigrationSpec {
  continueToken?: string;
  resource: V1alpha1GroupVersionResource;
}

export interface V1alpha1StorageVersionMigrationStatus {
  conditions?: V1alpha1MigrationCondition[];
  resourceVersion?: string;
}

export interface V1alpha1StorageVersionSpec {
  [key: string]: unknown;
}

export interface V1alpha1StorageVersionStatus {
  commonEncodingVersion?: string;
  conditions?: V1alpha1StorageVersionCondition[];
  storageVersions?: V1alpha1ServerStorageVersion[];
}

export interface V1alpha1Variable {
  expression: string;
  name: string;
}

export interface V1alpha1VolumeAttributesClass {
  apiVersion?: string;
  driverName: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  parameters?: Record<string, string>;
}

export interface V1alpha1VolumeAttributesClassList {
  apiVersion?: string;
  items: V1alpha1VolumeAttributesClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha2LeaseCandidate {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1alpha2LeaseCandidateSpec;
}

export interface V1alpha2LeaseCandidateList {
  apiVersion?: string;
  items: V1alpha2LeaseCandidate[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha2LeaseCandidateSpec {
  binaryVersion: string;
  emulationVersion?: string;
  leaseName: string;
  pingTime?: V1MicroTime;
  renewTime?: V1MicroTime;
  strategy: string;
}

export interface V1alpha3AllocatedDeviceStatus {
  conditions?: V1Condition[];
  data?: RawExtension;
  device: string;
  driver: string;
  networkData?: V1alpha3NetworkDeviceData;
  pool: string;
}

export interface V1alpha3AllocationResult {
  devices?: V1alpha3DeviceAllocationResult;
  nodeSelector?: V1NodeSelector;
}

export interface V1alpha3BasicDevice {
  allNodes?: boolean;
  attributes?: Record<string, V1alpha3DeviceAttribute>;
  capacity?: Record<string, Quantity>;
  consumesCounters?: V1alpha3DeviceCounterConsumption[];
  nodeName?: string;
  nodeSelector?: V1NodeSelector;
  taints?: V1alpha3DeviceTaint[];
}

export interface V1alpha3CELDeviceSelector {
  expression: string;
}

export interface V1alpha3Counter {
  value: Quantity;
}

export interface V1alpha3CounterSet {
  counters: Record<string, V1alpha3Counter>;
  name: string;
}

export interface V1alpha3Device {
  basic?: V1alpha3BasicDevice;
  name: string;
}

export interface V1alpha3DeviceAllocationConfiguration {
  opaque?: V1alpha3OpaqueDeviceConfiguration;
  requests?: string[];
  source: string;
}

export interface V1alpha3DeviceAllocationResult {
  config?: V1alpha3DeviceAllocationConfiguration[];
  results?: V1alpha3DeviceRequestAllocationResult[];
}

export interface V1alpha3DeviceAttribute {
  bool?: boolean;
  int?: number;
  string?: string;
  version?: string;
}

export interface V1alpha3DeviceClaim {
  config?: V1alpha3DeviceClaimConfiguration[];
  constraints?: V1alpha3DeviceConstraint[];
  requests?: V1alpha3DeviceRequest[];
}

export interface V1alpha3DeviceClaimConfiguration {
  opaque?: V1alpha3OpaqueDeviceConfiguration;
  requests?: string[];
}

export interface V1alpha3DeviceClass {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha3DeviceClassSpec;
}

export interface V1alpha3DeviceClassConfiguration {
  opaque?: V1alpha3OpaqueDeviceConfiguration;
}

export interface V1alpha3DeviceClassList {
  apiVersion?: string;
  items: V1alpha3DeviceClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha3DeviceClassSpec {
  config?: V1alpha3DeviceClassConfiguration[];
  selectors?: V1alpha3DeviceSelector[];
}

export interface V1alpha3DeviceConstraint {
  matchAttribute?: string;
  requests?: string[];
}

export interface V1alpha3DeviceCounterConsumption {
  counters: Record<string, V1alpha3Counter>;
  counterSet: string;
}

export interface V1alpha3DeviceRequest {
  adminAccess?: boolean;
  allocationMode?: string;
  count?: number;
  deviceClassName?: string;
  firstAvailable?: V1alpha3DeviceSubRequest[];
  name: string;
  selectors?: V1alpha3DeviceSelector[];
  tolerations?: V1alpha3DeviceToleration[];
}

export interface V1alpha3DeviceRequestAllocationResult {
  adminAccess?: boolean;
  device: string;
  driver: string;
  pool: string;
  request: string;
  tolerations?: V1alpha3DeviceToleration[];
}

export interface V1alpha3DeviceSelector {
  cel?: V1alpha3CELDeviceSelector;
}

export interface V1alpha3DeviceSubRequest {
  allocationMode?: string;
  count?: number;
  deviceClassName: string;
  name: string;
  selectors?: V1alpha3DeviceSelector[];
  tolerations?: V1alpha3DeviceToleration[];
}

export interface V1alpha3DeviceTaint {
  effect: string;
  key: string;
  timeAdded?: V1Time;
  value?: string;
}

export interface V1alpha3DeviceTaintRule {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha3DeviceTaintRuleSpec;
}

export interface V1alpha3DeviceTaintRuleList {
  apiVersion?: string;
  items: V1alpha3DeviceTaintRule[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha3DeviceTaintRuleSpec {
  deviceSelector?: V1alpha3DeviceTaintSelector;
  taint: V1alpha3DeviceTaint;
}

export interface V1alpha3DeviceTaintSelector {
  device?: string;
  deviceClassName?: string;
  driver?: string;
  pool?: string;
  selectors?: V1alpha3DeviceSelector[];
}

export interface V1alpha3DeviceToleration {
  effect?: string;
  key?: string;
  operator?: string;
  tolerationSeconds?: number;
  value?: string;
}

export interface V1alpha3NetworkDeviceData {
  hardwareAddress?: string;
  interfaceName?: string;
  ips?: string[];
}

export interface V1alpha3OpaqueDeviceConfiguration {
  driver: string;
  parameters: RawExtension;
}

export interface V1alpha3ResourceClaim {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha3ResourceClaimSpec;
  status?: V1alpha3ResourceClaimStatus;
}

export interface V1alpha3ResourceClaimConsumerReference {
  apiGroup?: string;
  name: string;
  resource: string;
  uid: string;
}

export interface V1alpha3ResourceClaimList {
  apiVersion?: string;
  items: V1alpha3ResourceClaim[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha3ResourceClaimSpec {
  devices?: V1alpha3DeviceClaim;
}

export interface V1alpha3ResourceClaimStatus {
  allocation?: V1alpha3AllocationResult;
  devices?: V1alpha3AllocatedDeviceStatus[];
  reservedFor?: V1alpha3ResourceClaimConsumerReference[];
}

export interface V1alpha3ResourceClaimTemplate {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha3ResourceClaimTemplateSpec;
}

export interface V1alpha3ResourceClaimTemplateList {
  apiVersion?: string;
  items: V1alpha3ResourceClaimTemplate[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha3ResourceClaimTemplateSpec {
  metadata?: V1ObjectMeta;
  spec: V1alpha3ResourceClaimSpec;
}

export interface V1alpha3ResourcePool {
  generation: number;
  name: string;
  resourceSliceCount: number;
}

export interface V1alpha3ResourceSlice {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1alpha3ResourceSliceSpec;
}

export interface V1alpha3ResourceSliceList {
  apiVersion?: string;
  items: V1alpha3ResourceSlice[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1alpha3ResourceSliceSpec {
  allNodes?: boolean;
  devices?: V1alpha3Device[];
  driver: string;
  nodeName?: string;
  nodeSelector?: V1NodeSelector;
  perDeviceNodeSelection?: boolean;
  pool: V1alpha3ResourcePool;
  sharedCounters?: V1alpha3CounterSet[];
}

export interface V1ApiextensionsServiceReference {
  name: string;
  namespace: string;
  path?: string;
  port?: number;
}

export interface V1ApiextensionsWebhookClientConfig {
  caBundle?: string;
  service?: V1ApiextensionsServiceReference;
  url?: string;
}

export interface V1APIGroup {
  apiVersion?: string;
  kind?: string;
  name: string;
  preferredVersion?: V1GroupVersionForDiscovery;
  serverAddressByClientCIDRs?: V1ServerAddressByClientCIDR[];
  versions: V1GroupVersionForDiscovery[];
}

export interface V1APIGroupList {
  apiVersion?: string;
  groups: V1APIGroup[];
  kind?: string;
}

export interface V1ApiregistrationServiceReference {
  name?: string;
  namespace?: string;
  port?: number;
}

export interface V1APIResource {
  categories?: string[];
  group?: string;
  kind: string;
  name: string;
  namespaced: boolean;
  shortNames?: string[];
  singularName: string;
  storageVersionHash?: string;
  verbs: string[];
  version?: string;
}

export interface V1APIResourceList {
  apiVersion?: string;
  groupVersion: string;
  kind?: string;
  resources: V1APIResource[];
}

export interface V1APIService {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1APIServiceSpec;
  status?: V1APIServiceStatus;
}

export interface V1APIServiceCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1APIServiceList {
  apiVersion?: string;
  items: V1APIService[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1APIServiceSpec {
  caBundle?: string;
  group?: string;
  groupPriorityMinimum: number;
  insecureSkipTLSVerify?: boolean;
  service?: V1ApiregistrationServiceReference;
  version?: string;
  versionPriority: number;
}

export interface V1APIServiceStatus {
  conditions?: V1APIServiceCondition[];
}

export interface V1APIVersions {
  apiVersion?: string;
  kind?: string;
  serverAddressByClientCIDRs: V1ServerAddressByClientCIDR[];
  versions: string[];
}

export interface V1AppArmorProfile {
  localhostProfile?: string;
  type: string;
}

export interface V1AttachedVolume {
  devicePath: string;
  name: string;
}

export interface V1AuditAnnotation {
  key: string;
  valueExpression: string;
}

export interface V1AuthenticationTokenRequest {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1TokenRequestSpec;
  status?: V1TokenRequestStatus;
}

export interface V1AWSElasticBlockStoreVolumeSource {
  fsType?: string;
  partition?: number;
  readOnly?: boolean;
  volumeID: string;
}

export interface V1AzureDiskVolumeSource {
  cachingMode?: string;
  diskName: string;
  diskURI: string;
  fsType?: string;
  kind?: string;
  readOnly?: boolean;
}

export interface V1AzureFilePersistentVolumeSource {
  readOnly?: boolean;
  secretName: string;
  secretNamespace?: string;
  shareName: string;
}

export interface V1AzureFileVolumeSource {
  readOnly?: boolean;
  secretName: string;
  shareName: string;
}

export interface V1beta1AllocatedDeviceStatus {
  conditions?: V1Condition[];
  data?: RawExtension;
  device: string;
  driver: string;
  networkData?: V1beta1NetworkDeviceData;
  pool: string;
}

export interface V1beta1AllocationResult {
  devices?: V1beta1DeviceAllocationResult;
  nodeSelector?: V1NodeSelector;
}

export interface V1beta1AuditAnnotation {
  key: string;
  valueExpression: string;
}

export interface V1beta1BasicDevice {
  allNodes?: boolean;
  attributes?: Record<string, V1beta1DeviceAttribute>;
  capacity?: Record<string, V1beta1DeviceCapacity>;
  consumesCounters?: V1beta1DeviceCounterConsumption[];
  nodeName?: string;
  nodeSelector?: V1NodeSelector;
  taints?: V1beta1DeviceTaint[];
}

export interface V1beta1CELDeviceSelector {
  expression: string;
}

export interface V1beta1ClusterTrustBundle {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta1ClusterTrustBundleSpec;
}

export interface V1beta1ClusterTrustBundleList {
  apiVersion?: string;
  items: V1beta1ClusterTrustBundle[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ClusterTrustBundleSpec {
  signerName?: string;
  trustBundle: string;
}

export interface V1beta1Counter {
  value: Quantity;
}

export interface V1beta1CounterSet {
  counters: Record<string, V1beta1Counter>;
  name: string;
}

export interface V1beta1Device {
  basic?: V1beta1BasicDevice;
  name: string;
}

export interface V1beta1DeviceAllocationConfiguration {
  opaque?: V1beta1OpaqueDeviceConfiguration;
  requests?: string[];
  source: string;
}

export interface V1beta1DeviceAllocationResult {
  config?: V1beta1DeviceAllocationConfiguration[];
  results?: V1beta1DeviceRequestAllocationResult[];
}

export interface V1beta1DeviceAttribute {
  bool?: boolean;
  int?: number;
  string?: string;
  version?: string;
}

export interface V1beta1DeviceCapacity {
  value: Quantity;
}

export interface V1beta1DeviceClaim {
  config?: V1beta1DeviceClaimConfiguration[];
  constraints?: V1beta1DeviceConstraint[];
  requests?: V1beta1DeviceRequest[];
}

export interface V1beta1DeviceClaimConfiguration {
  opaque?: V1beta1OpaqueDeviceConfiguration;
  requests?: string[];
}

export interface V1beta1DeviceClass {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta1DeviceClassSpec;
}

export interface V1beta1DeviceClassConfiguration {
  opaque?: V1beta1OpaqueDeviceConfiguration;
}

export interface V1beta1DeviceClassList {
  apiVersion?: string;
  items: V1beta1DeviceClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1DeviceClassSpec {
  config?: V1beta1DeviceClassConfiguration[];
  selectors?: V1beta1DeviceSelector[];
}

export interface V1beta1DeviceConstraint {
  matchAttribute?: string;
  requests?: string[];
}

export interface V1beta1DeviceCounterConsumption {
  counters: Record<string, V1beta1Counter>;
  counterSet: string;
}

export interface V1beta1DeviceRequest {
  adminAccess?: boolean;
  allocationMode?: string;
  count?: number;
  deviceClassName?: string;
  firstAvailable?: V1beta1DeviceSubRequest[];
  name: string;
  selectors?: V1beta1DeviceSelector[];
  tolerations?: V1beta1DeviceToleration[];
}

export interface V1beta1DeviceRequestAllocationResult {
  adminAccess?: boolean;
  device: string;
  driver: string;
  pool: string;
  request: string;
  tolerations?: V1beta1DeviceToleration[];
}

export interface V1beta1DeviceSelector {
  cel?: V1beta1CELDeviceSelector;
}

export interface V1beta1DeviceSubRequest {
  allocationMode?: string;
  count?: number;
  deviceClassName: string;
  name: string;
  selectors?: V1beta1DeviceSelector[];
  tolerations?: V1beta1DeviceToleration[];
}

export interface V1beta1DeviceTaint {
  effect: string;
  key: string;
  timeAdded?: V1Time;
  value?: string;
}

export interface V1beta1DeviceToleration {
  effect?: string;
  key?: string;
  operator?: string;
  tolerationSeconds?: number;
  value?: string;
}

export interface V1beta1ExpressionWarning {
  fieldRef: string;
  warning: string;
}

export interface V1beta1IPAddress {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1beta1IPAddressSpec;
}

export interface V1beta1IPAddressList {
  apiVersion?: string;
  items: V1beta1IPAddress[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1IPAddressSpec {
  parentRef: V1beta1ParentReference;
}

export interface V1beta1LeaseCandidate {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1beta1LeaseCandidateSpec;
}

export interface V1beta1LeaseCandidateList {
  apiVersion?: string;
  items: V1beta1LeaseCandidate[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1LeaseCandidateSpec {
  binaryVersion: string;
  emulationVersion?: string;
  leaseName: string;
  pingTime?: V1MicroTime;
  renewTime?: V1MicroTime;
  strategy: string;
}

export interface V1beta1MatchCondition {
  expression: string;
  name: string;
}

export interface V1beta1MatchResources {
  excludeResourceRules?: V1beta1NamedRuleWithOperations[];
  matchPolicy?: string;
  namespaceSelector?: V1LabelSelector;
  objectSelector?: V1LabelSelector;
  resourceRules?: V1beta1NamedRuleWithOperations[];
}

export interface V1beta1NamedRuleWithOperations {
  apiGroups?: string[];
  apiVersions?: string[];
  operations?: string[];
  resourceNames?: string[];
  resources?: string[];
  scope?: string;
}

export interface V1beta1NetworkDeviceData {
  hardwareAddress?: string;
  interfaceName?: string;
  ips?: string[];
}

export interface V1beta1OpaqueDeviceConfiguration {
  driver: string;
  parameters: RawExtension;
}

export interface V1beta1ParamKind {
  apiVersion?: string;
  kind?: string;
}

export interface V1beta1ParamRef {
  name?: string;
  namespace?: string;
  parameterNotFoundAction?: string;
  selector?: V1LabelSelector;
}

export interface V1beta1ParentReference {
  group?: string;
  name: string;
  namespace?: string;
  resource: string;
}

export interface V1beta1ResourceClaim {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta1ResourceClaimSpec;
  status?: V1beta1ResourceClaimStatus;
}

export interface V1beta1ResourceClaimConsumerReference {
  apiGroup?: string;
  name: string;
  resource: string;
  uid: string;
}

export interface V1beta1ResourceClaimList {
  apiVersion?: string;
  items: V1beta1ResourceClaim[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ResourceClaimSpec {
  devices?: V1beta1DeviceClaim;
}

export interface V1beta1ResourceClaimStatus {
  allocation?: V1beta1AllocationResult;
  devices?: V1beta1AllocatedDeviceStatus[];
  reservedFor?: V1beta1ResourceClaimConsumerReference[];
}

export interface V1beta1ResourceClaimTemplate {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta1ResourceClaimTemplateSpec;
}

export interface V1beta1ResourceClaimTemplateList {
  apiVersion?: string;
  items: V1beta1ResourceClaimTemplate[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ResourceClaimTemplateSpec {
  metadata?: V1ObjectMeta;
  spec: V1beta1ResourceClaimSpec;
}

export interface V1beta1ResourcePool {
  generation: number;
  name: string;
  resourceSliceCount: number;
}

export interface V1beta1ResourceSlice {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta1ResourceSliceSpec;
}

export interface V1beta1ResourceSliceList {
  apiVersion?: string;
  items: V1beta1ResourceSlice[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ResourceSliceSpec {
  allNodes?: boolean;
  devices?: V1beta1Device[];
  driver: string;
  nodeName?: string;
  nodeSelector?: V1NodeSelector;
  perDeviceNodeSelection?: boolean;
  pool: V1beta1ResourcePool;
  sharedCounters?: V1beta1CounterSet[];
}

export interface V1beta1ServiceCIDR {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1beta1ServiceCIDRSpec;
  status?: V1beta1ServiceCIDRStatus;
}

export interface V1beta1ServiceCIDRList {
  apiVersion?: string;
  items: V1beta1ServiceCIDR[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ServiceCIDRSpec {
  cidrs?: string[];
}

export interface V1beta1ServiceCIDRStatus {
  conditions?: V1Condition[];
}

export interface V1beta1TypeChecking {
  expressionWarnings?: V1beta1ExpressionWarning[];
}

export interface V1beta1ValidatingAdmissionPolicy {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1beta1ValidatingAdmissionPolicySpec;
  status?: V1beta1ValidatingAdmissionPolicyStatus;
}

export interface V1beta1ValidatingAdmissionPolicyBinding {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1beta1ValidatingAdmissionPolicyBindingSpec;
}

export interface V1beta1ValidatingAdmissionPolicyBindingList {
  apiVersion?: string;
  items: V1beta1ValidatingAdmissionPolicyBinding[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ValidatingAdmissionPolicyBindingSpec {
  matchResources?: V1beta1MatchResources;
  paramRef?: V1beta1ParamRef;
  policyName?: string;
  validationActions?: string[];
}

export interface V1beta1ValidatingAdmissionPolicyList {
  apiVersion?: string;
  items: V1beta1ValidatingAdmissionPolicy[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta1ValidatingAdmissionPolicySpec {
  auditAnnotations?: V1beta1AuditAnnotation[];
  failurePolicy?: string;
  matchConditions?: V1beta1MatchCondition[];
  matchConstraints?: V1beta1MatchResources;
  paramKind?: V1beta1ParamKind;
  validations?: V1beta1Validation[];
  variables?: V1beta1Variable[];
}

export interface V1beta1ValidatingAdmissionPolicyStatus {
  conditions?: V1Condition[];
  observedGeneration?: number;
  typeChecking?: V1beta1TypeChecking;
}

export interface V1beta1Validation {
  expression: string;
  message?: string;
  messageExpression?: string;
  reason?: string;
}

export interface V1beta1Variable {
  expression: string;
  name: string;
}

export interface V1beta1VolumeAttributesClass {
  apiVersion?: string;
  driverName: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  parameters?: Record<string, string>;
}

export interface V1beta1VolumeAttributesClassList {
  apiVersion?: string;
  items: V1beta1VolumeAttributesClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta2AllocatedDeviceStatus {
  conditions?: V1Condition[];
  data?: RawExtension;
  device: string;
  driver: string;
  networkData?: V1beta2NetworkDeviceData;
  pool: string;
}

export interface V1beta2AllocationResult {
  devices?: V1beta2DeviceAllocationResult;
  nodeSelector?: V1NodeSelector;
}

export interface V1beta2CELDeviceSelector {
  expression: string;
}

export interface V1beta2Counter {
  value: Quantity;
}

export interface V1beta2CounterSet {
  counters: Record<string, V1beta2Counter>;
  name: string;
}

export interface V1beta2Device {
  allNodes?: boolean;
  attributes?: Record<string, V1beta2DeviceAttribute>;
  capacity?: Record<string, V1beta2DeviceCapacity>;
  consumesCounters?: V1beta2DeviceCounterConsumption[];
  name: string;
  nodeName?: string;
  nodeSelector?: V1NodeSelector;
  taints?: V1beta2DeviceTaint[];
}

export interface V1beta2DeviceAllocationConfiguration {
  opaque?: V1beta2OpaqueDeviceConfiguration;
  requests?: string[];
  source: string;
}

export interface V1beta2DeviceAllocationResult {
  config?: V1beta2DeviceAllocationConfiguration[];
  results?: V1beta2DeviceRequestAllocationResult[];
}

export interface V1beta2DeviceAttribute {
  bool?: boolean;
  int?: number;
  string?: string;
  version?: string;
}

export interface V1beta2DeviceCapacity {
  value: Quantity;
}

export interface V1beta2DeviceClaim {
  config?: V1beta2DeviceClaimConfiguration[];
  constraints?: V1beta2DeviceConstraint[];
  requests?: V1beta2DeviceRequest[];
}

export interface V1beta2DeviceClaimConfiguration {
  opaque?: V1beta2OpaqueDeviceConfiguration;
  requests?: string[];
}

export interface V1beta2DeviceClass {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta2DeviceClassSpec;
}

export interface V1beta2DeviceClassConfiguration {
  opaque?: V1beta2OpaqueDeviceConfiguration;
}

export interface V1beta2DeviceClassList {
  apiVersion?: string;
  items: V1beta2DeviceClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta2DeviceClassSpec {
  config?: V1beta2DeviceClassConfiguration[];
  selectors?: V1beta2DeviceSelector[];
}

export interface V1beta2DeviceConstraint {
  matchAttribute?: string;
  requests?: string[];
}

export interface V1beta2DeviceCounterConsumption {
  counters: Record<string, V1beta2Counter>;
  counterSet: string;
}

export interface V1beta2DeviceRequest {
  exactly?: V1beta2ExactDeviceRequest;
  firstAvailable?: V1beta2DeviceSubRequest[];
  name: string;
}

export interface V1beta2DeviceRequestAllocationResult {
  adminAccess?: boolean;
  device: string;
  driver: string;
  pool: string;
  request: string;
  tolerations?: V1beta2DeviceToleration[];
}

export interface V1beta2DeviceSelector {
  cel?: V1beta2CELDeviceSelector;
}

export interface V1beta2DeviceSubRequest {
  allocationMode?: string;
  count?: number;
  deviceClassName: string;
  name: string;
  selectors?: V1beta2DeviceSelector[];
  tolerations?: V1beta2DeviceToleration[];
}

export interface V1beta2DeviceTaint {
  effect: string;
  key: string;
  timeAdded?: V1Time;
  value?: string;
}

export interface V1beta2DeviceToleration {
  effect?: string;
  key?: string;
  operator?: string;
  tolerationSeconds?: number;
  value?: string;
}

export interface V1beta2ExactDeviceRequest {
  adminAccess?: boolean;
  allocationMode?: string;
  count?: number;
  deviceClassName: string;
  selectors?: V1beta2DeviceSelector[];
  tolerations?: V1beta2DeviceToleration[];
}

export interface V1beta2NetworkDeviceData {
  hardwareAddress?: string;
  interfaceName?: string;
  ips?: string[];
}

export interface V1beta2OpaqueDeviceConfiguration {
  driver: string;
  parameters: RawExtension;
}

export interface V1beta2ResourceClaim {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta2ResourceClaimSpec;
  status?: V1beta2ResourceClaimStatus;
}

export interface V1beta2ResourceClaimConsumerReference {
  apiGroup?: string;
  name: string;
  resource: string;
  uid: string;
}

export interface V1beta2ResourceClaimList {
  apiVersion?: string;
  items: V1beta2ResourceClaim[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta2ResourceClaimSpec {
  devices?: V1beta2DeviceClaim;
}

export interface V1beta2ResourceClaimStatus {
  allocation?: V1beta2AllocationResult;
  devices?: V1beta2AllocatedDeviceStatus[];
  reservedFor?: V1beta2ResourceClaimConsumerReference[];
}

export interface V1beta2ResourceClaimTemplate {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta2ResourceClaimTemplateSpec;
}

export interface V1beta2ResourceClaimTemplateList {
  apiVersion?: string;
  items: V1beta2ResourceClaimTemplate[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta2ResourceClaimTemplateSpec {
  metadata?: V1ObjectMeta;
  spec: V1beta2ResourceClaimSpec;
}

export interface V1beta2ResourcePool {
  generation: number;
  name: string;
  resourceSliceCount: number;
}

export interface V1beta2ResourceSlice {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1beta2ResourceSliceSpec;
}

export interface V1beta2ResourceSliceList {
  apiVersion?: string;
  items: V1beta2ResourceSlice[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1beta2ResourceSliceSpec {
  allNodes?: boolean;
  devices?: V1beta2Device[];
  driver: string;
  nodeName?: string;
  nodeSelector?: V1NodeSelector;
  perDeviceNodeSelection?: boolean;
  pool: V1beta2ResourcePool;
  sharedCounters?: V1beta2CounterSet[];
}

export interface V1Binding {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  target: V1ObjectReference;
}

export interface V1BoundObjectReference {
  apiVersion?: string;
  kind?: string;
  name?: string;
  uid?: string;
}

export interface V1Capabilities {
  add?: string[];
  drop?: string[];
}

export interface V1CephFSPersistentVolumeSource {
  monitors: string[];
  path?: string;
  readOnly?: boolean;
  secretFile?: string;
  secretRef?: V1SecretReference;
  user?: string;
}

export interface V1CephFSVolumeSource {
  monitors: string[];
  path?: string;
  readOnly?: boolean;
  secretFile?: string;
  secretRef?: V1LocalObjectReference;
  user?: string;
}

export interface V1CertificateSigningRequest {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1CertificateSigningRequestSpec;
  status?: V1CertificateSigningRequestStatus;
}

export interface V1CertificateSigningRequestCondition {
  lastTransitionTime?: V1Time;
  lastUpdateTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1CertificateSigningRequestList {
  apiVersion?: string;
  items: V1CertificateSigningRequest[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CertificateSigningRequestSpec {
  expirationSeconds?: number;
  extra?: Record<string, string[]>;
  groups?: string[];
  request: string;
  signerName: string;
  uid?: string;
  usages?: string[];
  username?: string;
}

export interface V1CertificateSigningRequestStatus {
  certificate?: string;
  conditions?: V1CertificateSigningRequestCondition[];
}

export interface V1CinderPersistentVolumeSource {
  fsType?: string;
  readOnly?: boolean;
  secretRef?: V1SecretReference;
  volumeID: string;
}

export interface V1CinderVolumeSource {
  fsType?: string;
  readOnly?: boolean;
  secretRef?: V1LocalObjectReference;
  volumeID: string;
}

export interface V1ClientIPConfig {
  timeoutSeconds?: number;
}

export interface V1ClusterRole {
  aggregationRule?: V1AggregationRule;
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  rules?: V1PolicyRule[];
}

export interface V1ClusterRoleBinding {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  roleRef: V1RoleRef;
  subjects?: V1RbacSubject[];
}

export interface V1ClusterRoleBindingList {
  apiVersion?: string;
  items: V1ClusterRoleBinding[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ClusterRoleList {
  apiVersion?: string;
  items: V1ClusterRole[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ClusterTrustBundleProjection {
  labelSelector?: V1LabelSelector;
  name?: string;
  optional?: boolean;
  path: string;
  signerName?: string;
}

export interface V1ComponentCondition {
  error?: string;
  message?: string;
  status: string;
  type: string;
}

export interface V1ComponentStatus {
  apiVersion?: string;
  conditions?: V1ComponentCondition[];
  kind?: string;
  metadata?: V1ObjectMeta;
}

export interface V1ComponentStatusList {
  apiVersion?: string;
  items: V1ComponentStatus[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1Condition {
  lastTransitionTime: V1Time;
  message: string;
  observedGeneration?: number;
  reason: string;
  status: string;
  type: string;
}

export interface V1ConfigMap {
  apiVersion?: string;
  binaryData?: Record<string, string>;
  data?: Record<string, string>;
  immutable?: boolean;
  kind?: string;
  metadata?: V1ObjectMeta;
}

export interface V1ConfigMapEnvSource {
  name?: string;
  optional?: boolean;
}

export interface V1ConfigMapKeySelector {
  key: string;
  name?: string;
  optional?: boolean;
}

export interface V1ConfigMapList {
  apiVersion?: string;
  items: V1ConfigMap[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ConfigMapNodeConfigSource {
  kubeletConfigKey: string;
  name: string;
  namespace: string;
  resourceVersion?: string;
  uid?: string;
}

export interface V1ConfigMapProjection {
  items?: V1KeyToPath[];
  name?: string;
  optional?: boolean;
}

export interface V1ConfigMapVolumeSource {
  defaultMode?: number;
  items?: V1KeyToPath[];
  name?: string;
  optional?: boolean;
}

export interface V1Container {
  args?: string[];
  command?: string[];
  env?: V1EnvVar[];
  envFrom?: V1EnvFromSource[];
  image?: string;
  imagePullPolicy?: string;
  lifecycle?: V1Lifecycle;
  livenessProbe?: V1Probe;
  name: string;
  ports?: V1ContainerPort[];
  readinessProbe?: V1Probe;
  resizePolicy?: V1ContainerResizePolicy[];
  resources?: V1ResourceRequirements;
  restartPolicy?: string;
  securityContext?: V1SecurityContext;
  startupProbe?: V1Probe;
  stdin?: boolean;
  stdinOnce?: boolean;
  terminationMessagePath?: string;
  terminationMessagePolicy?: string;
  tty?: boolean;
  volumeDevices?: V1VolumeDevice[];
  volumeMounts?: V1VolumeMount[];
  workingDir?: string;
}

export interface V1ContainerImage {
  names?: string[];
  sizeBytes?: number;
}

export interface V1ContainerPort {
  containerPort: number;
  hostIP?: string;
  hostPort?: number;
  name?: string;
  protocol?: string;
}

export interface V1ContainerResizePolicy {
  resourceName: string;
  restartPolicy: string;
}

export interface V1ContainerState {
  running?: V1ContainerStateRunning;
  terminated?: V1ContainerStateTerminated;
  waiting?: V1ContainerStateWaiting;
}

export interface V1ContainerStateRunning {
  startedAt?: V1Time;
}

export interface V1ContainerStateTerminated {
  containerID?: string;
  exitCode: number;
  finishedAt?: V1Time;
  message?: string;
  reason?: string;
  signal?: number;
  startedAt?: V1Time;
}

export interface V1ContainerStateWaiting {
  message?: string;
  reason?: string;
}

export interface V1ContainerStatus {
  allocatedResources?: Record<string, Quantity>;
  allocatedResourcesStatus?: V1ResourceStatus[];
  containerID?: string;
  image: string;
  imageID: string;
  lastState?: V1ContainerState;
  name: string;
  ready: boolean;
  resources?: V1ResourceRequirements;
  restartCount: number;
  started?: boolean;
  state?: V1ContainerState;
  stopSignal?: string;
  user?: V1ContainerUser;
  volumeMounts?: V1VolumeMountStatus[];
}

export interface V1ContainerUser {
  linux?: V1LinuxContainerUser;
}

export interface V1ControllerRevision {
  apiVersion?: string;
  data?: RawExtension;
  kind?: string;
  metadata?: V1ObjectMeta;
  revision: number;
}

export interface V1ControllerRevisionList {
  apiVersion?: string;
  items: V1ControllerRevision[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CoreEndpointPort {
  appProtocol?: string;
  name?: string;
  port: number;
  protocol?: string;
}

export interface V1CoreEvent {
  action?: string;
  apiVersion?: string;
  count?: number;
  eventTime?: V1MicroTime;
  firstTimestamp?: V1Time;
  involvedObject: V1ObjectReference;
  kind?: string;
  lastTimestamp?: V1Time;
  message?: string;
  metadata: V1ObjectMeta;
  reason?: string;
  related?: V1ObjectReference;
  reportingComponent?: string;
  reportingInstance?: string;
  series?: V1CoreEventSeries;
  source?: V1EventSource;
  type?: string;
}

export interface V1CoreEventList {
  apiVersion?: string;
  items: V1CoreEvent[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CoreEventSeries {
  count?: number;
  lastObservedTime?: V1MicroTime;
}

export interface V1CronJob {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1CronJobSpec;
  status?: V1CronJobStatus;
}

export interface V1CronJobList {
  apiVersion?: string;
  items: V1CronJob[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CronJobSpec {
  concurrencyPolicy?: string;
  failedJobsHistoryLimit?: number;
  jobTemplate: V1JobTemplateSpec;
  schedule: string;
  startingDeadlineSeconds?: number;
  successfulJobsHistoryLimit?: number;
  suspend?: boolean;
  timeZone?: string;
}

export interface V1CronJobStatus {
  active?: V1ObjectReference[];
  lastScheduleTime?: V1Time;
  lastSuccessfulTime?: V1Time;
}

export interface V1CrossVersionObjectReference {
  apiVersion?: string;
  kind: string;
  name: string;
}

export interface V1CSIDriver {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1CSIDriverSpec;
}

export interface V1CSIDriverList {
  apiVersion?: string;
  items: V1CSIDriver[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CSIDriverSpec {
  attachRequired?: boolean;
  fsGroupPolicy?: string;
  nodeAllocatableUpdatePeriodSeconds?: number;
  podInfoOnMount?: boolean;
  requiresRepublish?: boolean;
  seLinuxMount?: boolean;
  storageCapacity?: boolean;
  tokenRequests?: V1StorageTokenRequest[];
  volumeLifecycleModes?: string[];
}

export interface V1CSINode {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1CSINodeSpec;
}

export interface V1CSINodeDriver {
  allocatable?: V1VolumeNodeResources;
  name: string;
  nodeID: string;
  topologyKeys?: string[];
}

export interface V1CSINodeList {
  apiVersion?: string;
  items: V1CSINode[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CSINodeSpec {
  drivers: V1CSINodeDriver[];
}

export interface V1CSIPersistentVolumeSource {
  controllerExpandSecretRef?: V1SecretReference;
  controllerPublishSecretRef?: V1SecretReference;
  driver: string;
  fsType?: string;
  nodeExpandSecretRef?: V1SecretReference;
  nodePublishSecretRef?: V1SecretReference;
  nodeStageSecretRef?: V1SecretReference;
  readOnly?: boolean;
  volumeAttributes?: Record<string, string>;
  volumeHandle: string;
}

export interface V1CSIStorageCapacity {
  apiVersion?: string;
  capacity?: Quantity;
  kind?: string;
  maximumVolumeSize?: Quantity;
  metadata?: V1ObjectMeta;
  nodeTopology?: V1LabelSelector;
  storageClassName: string;
}

export interface V1CSIStorageCapacityList {
  apiVersion?: string;
  items: V1CSIStorageCapacity[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CSIVolumeSource {
  driver: string;
  fsType?: string;
  nodePublishSecretRef?: V1LocalObjectReference;
  readOnly?: boolean;
  volumeAttributes?: Record<string, string>;
}

export interface V1CustomResourceColumnDefinition {
  description?: string;
  format?: string;
  jsonPath: string;
  name: string;
  priority?: number;
  type: string;
}

export interface V1CustomResourceConversion {
  strategy: string;
  webhook?: V1WebhookConversion;
}

export interface V1CustomResourceDefinition {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1CustomResourceDefinitionSpec;
  status?: V1CustomResourceDefinitionStatus;
}

export interface V1CustomResourceDefinitionCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1CustomResourceDefinitionList {
  apiVersion?: string;
  items: V1CustomResourceDefinition[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1CustomResourceDefinitionNames {
  categories?: string[];
  kind: string;
  listKind?: string;
  plural: string;
  shortNames?: string[];
  singular?: string;
}

export interface V1CustomResourceDefinitionSpec {
  conversion?: V1CustomResourceConversion;
  group: string;
  names: V1CustomResourceDefinitionNames;
  preserveUnknownFields?: boolean;
  scope: string;
  versions: V1CustomResourceDefinitionVersion[];
}

export interface V1CustomResourceDefinitionStatus {
  acceptedNames?: V1CustomResourceDefinitionNames;
  conditions?: V1CustomResourceDefinitionCondition[];
  storedVersions?: string[];
}

export interface V1CustomResourceDefinitionVersion {
  additionalPrinterColumns?: V1CustomResourceColumnDefinition[];
  deprecated?: boolean;
  deprecationWarning?: string;
  name: string;
  schema?: V1CustomResourceValidation;
  selectableFields?: V1SelectableField[];
  served: boolean;
  storage: boolean;
  subresources?: V1CustomResourceSubresources;
}

export interface V1CustomResourceSubresources {
  scale?: V1CustomResourceSubresourceScale;
  status?: V1CustomResourceSubresourceStatus;
}

export interface V1CustomResourceSubresourceScale {
  labelSelectorPath?: string;
  specReplicasPath: string;
  statusReplicasPath: string;
}

export interface V1CustomResourceSubresourceStatus {
  [key: string]: unknown;
}

export interface V1CustomResourceValidation {
  openAPIV3Schema?: V1JSONSchemaProps;
}

export interface V1DaemonEndpoint {
  Port: number;
}

export interface V1DaemonSet {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1DaemonSetSpec;
  status?: V1DaemonSetStatus;
}

export interface V1DaemonSetCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1DaemonSetList {
  apiVersion?: string;
  items: V1DaemonSet[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1DaemonSetSpec {
  minReadySeconds?: number;
  revisionHistoryLimit?: number;
  selector: V1LabelSelector;
  template: V1PodTemplateSpec;
  updateStrategy?: V1DaemonSetUpdateStrategy;
}

export interface V1DaemonSetStatus {
  collisionCount?: number;
  conditions?: V1DaemonSetCondition[];
  currentNumberScheduled: number;
  desiredNumberScheduled: number;
  numberAvailable?: number;
  numberMisscheduled: number;
  numberReady: number;
  numberUnavailable?: number;
  observedGeneration?: number;
  updatedNumberScheduled?: number;
}

export interface V1DaemonSetUpdateStrategy {
  rollingUpdate?: V1RollingUpdateDaemonSet;
  type?: string;
}

export interface V1DeleteOptions {
  apiVersion?: string;
  dryRun?: string[];
  gracePeriodSeconds?: number;
  ignoreStoreReadErrorWithClusterBreakingPotential?: boolean;
  kind?: string;
  orphanDependents?: boolean;
  preconditions?: V1Preconditions;
  propagationPolicy?: string;
}

export interface V1Deployment {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1DeploymentSpec;
  status?: V1DeploymentStatus;
}

export interface V1DeploymentCondition {
  lastTransitionTime?: V1Time;
  lastUpdateTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1DeploymentList {
  apiVersion?: string;
  items: V1Deployment[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1DeploymentSpec {
  minReadySeconds?: number;
  paused?: boolean;
  progressDeadlineSeconds?: number;
  replicas?: number;
  revisionHistoryLimit?: number;
  selector: V1LabelSelector;
  strategy?: V1DeploymentStrategy;
  template: V1PodTemplateSpec;
}

export interface V1DeploymentStatus {
  availableReplicas?: number;
  collisionCount?: number;
  conditions?: V1DeploymentCondition[];
  observedGeneration?: number;
  readyReplicas?: number;
  replicas?: number;
  terminatingReplicas?: number;
  unavailableReplicas?: number;
  updatedReplicas?: number;
}

export interface V1DeploymentStrategy {
  rollingUpdate?: V1RollingUpdateDeployment;
  type?: string;
}

export interface V1DiscoveryEndpointPort {
  appProtocol?: string;
  name?: string;
  port?: number;
  protocol?: string;
}

export interface V1DownwardAPIProjection {
  items?: V1DownwardAPIVolumeFile[];
}

export interface V1DownwardAPIVolumeFile {
  fieldRef?: V1ObjectFieldSelector;
  mode?: number;
  path: string;
  resourceFieldRef?: V1ResourceFieldSelector;
}

export interface V1DownwardAPIVolumeSource {
  defaultMode?: number;
  items?: V1DownwardAPIVolumeFile[];
}

export interface V1EmptyDirVolumeSource {
  medium?: string;
  sizeLimit?: Quantity;
}

export interface V1Endpoint {
  addresses: string[];
  conditions?: V1EndpointConditions;
  deprecatedTopology?: Record<string, string>;
  hints?: V1EndpointHints;
  hostname?: string;
  nodeName?: string;
  targetRef?: V1ObjectReference;
  zone?: string;
}

export interface V1EndpointAddress {
  hostname?: string;
  ip: string;
  nodeName?: string;
  targetRef?: V1ObjectReference;
}

export interface V1EndpointConditions {
  ready?: boolean;
  serving?: boolean;
  terminating?: boolean;
}

export interface V1EndpointHints {
  forNodes?: V1ForNode[];
  forZones?: V1ForZone[];
}

export interface V1Endpoints {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  subsets?: V1EndpointSubset[];
}

export interface V1EndpointSlice {
  addressType: string;
  apiVersion?: string;
  endpoints: V1Endpoint[];
  kind?: string;
  metadata?: V1ObjectMeta;
  ports?: V1DiscoveryEndpointPort[];
}

export interface V1EndpointSliceList {
  apiVersion?: string;
  items: V1EndpointSlice[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1EndpointsList {
  apiVersion?: string;
  items: V1Endpoints[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1EndpointSubset {
  addresses?: V1EndpointAddress[];
  notReadyAddresses?: V1EndpointAddress[];
  ports?: V1CoreEndpointPort[];
}

export interface V1EnvFromSource {
  configMapRef?: V1ConfigMapEnvSource;
  prefix?: string;
  secretRef?: V1SecretEnvSource;
}

export interface V1EnvVar {
  name: string;
  value?: string;
  valueFrom?: V1EnvVarSource;
}

export interface V1EnvVarSource {
  configMapKeyRef?: V1ConfigMapKeySelector;
  fieldRef?: V1ObjectFieldSelector;
  resourceFieldRef?: V1ResourceFieldSelector;
  secretKeyRef?: V1SecretKeySelector;
}

export interface V1EphemeralContainer {
  args?: string[];
  command?: string[];
  env?: V1EnvVar[];
  envFrom?: V1EnvFromSource[];
  image?: string;
  imagePullPolicy?: string;
  lifecycle?: V1Lifecycle;
  livenessProbe?: V1Probe;
  name: string;
  ports?: V1ContainerPort[];
  readinessProbe?: V1Probe;
  resizePolicy?: V1ContainerResizePolicy[];
  resources?: V1ResourceRequirements;
  restartPolicy?: string;
  securityContext?: V1SecurityContext;
  startupProbe?: V1Probe;
  stdin?: boolean;
  stdinOnce?: boolean;
  targetContainerName?: string;
  terminationMessagePath?: string;
  terminationMessagePolicy?: string;
  tty?: boolean;
  volumeDevices?: V1VolumeDevice[];
  volumeMounts?: V1VolumeMount[];
  workingDir?: string;
}

export interface V1EphemeralVolumeSource {
  volumeClaimTemplate?: V1PersistentVolumeClaimTemplate;
}

export interface V1EventsEvent {
  action?: string;
  apiVersion?: string;
  deprecatedCount?: number;
  deprecatedFirstTimestamp?: V1Time;
  deprecatedLastTimestamp?: V1Time;
  deprecatedSource?: V1EventSource;
  eventTime: V1MicroTime;
  kind?: string;
  metadata?: V1ObjectMeta;
  note?: string;
  reason?: string;
  regarding?: V1ObjectReference;
  related?: V1ObjectReference;
  reportingController?: string;
  reportingInstance?: string;
  series?: V1EventsEventSeries;
  type?: string;
}

export interface V1EventsEventList {
  apiVersion?: string;
  items: V1EventsEvent[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1EventsEventSeries {
  count: number;
  lastObservedTime: V1MicroTime;
}

export interface V1EventSource {
  component?: string;
  host?: string;
}

export interface V1Eviction {
  apiVersion?: string;
  deleteOptions?: V1DeleteOptions;
  kind?: string;
  metadata?: V1ObjectMeta;
}

export interface V1ExecAction {
  command?: string[];
}

export interface V1ExemptPriorityLevelConfiguration {
  lendablePercent?: number;
  nominalConcurrencyShares?: number;
}

export interface V1ExpressionWarning {
  fieldRef: string;
  warning: string;
}

export interface V1ExternalDocumentation {
  description?: string;
  url?: string;
}

export interface V1FCVolumeSource {
  fsType?: string;
  lun?: number;
  readOnly?: boolean;
  targetWWNs?: string[];
  wwids?: string[];
}

export interface V1FieldSelectorAttributes {
  rawSelector?: string;
  requirements?: V1FieldSelectorRequirement[];
}

export interface V1FieldSelectorRequirement {
  key: string;
  operator: string;
  values?: string[];
}

export interface V1FieldsV1 {
  [key: string]: unknown;
}

export interface V1FlexPersistentVolumeSource {
  driver: string;
  fsType?: string;
  options?: Record<string, string>;
  readOnly?: boolean;
  secretRef?: V1SecretReference;
}

export interface V1FlexVolumeSource {
  driver: string;
  fsType?: string;
  options?: Record<string, string>;
  readOnly?: boolean;
  secretRef?: V1LocalObjectReference;
}

export interface V1FlockerVolumeSource {
  datasetName?: string;
  datasetUUID?: string;
}

export interface V1FlowcontrolSubject {
  group?: V1GroupSubject;
  kind: string;
  serviceAccount?: V1ServiceAccountSubject;
  user?: V1UserSubject;
}

export interface V1FlowDistinguisherMethod {
  type: string;
}

export interface V1FlowSchema {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1FlowSchemaSpec;
  status?: V1FlowSchemaStatus;
}

export interface V1FlowSchemaCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status?: string;
  type?: string;
}

export interface V1FlowSchemaList {
  apiVersion?: string;
  items: V1FlowSchema[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1FlowSchemaSpec {
  distinguisherMethod?: V1FlowDistinguisherMethod;
  matchingPrecedence?: number;
  priorityLevelConfiguration: V1PriorityLevelConfigurationReference;
  rules?: V1PolicyRulesWithSubjects[];
}

export interface V1FlowSchemaStatus {
  conditions?: V1FlowSchemaCondition[];
}

export interface V1ForNode {
  name: string;
}

export interface V1ForZone {
  name: string;
}

export interface V1GCEPersistentDiskVolumeSource {
  fsType?: string;
  partition?: number;
  pdName: string;
  readOnly?: boolean;
}

export interface V1GitRepoVolumeSource {
  directory?: string;
  repository: string;
  revision?: string;
}

export interface V1GlusterfsPersistentVolumeSource {
  endpoints: string;
  endpointsNamespace?: string;
  path: string;
  readOnly?: boolean;
}

export interface V1GlusterfsVolumeSource {
  endpoints: string;
  path: string;
  readOnly?: boolean;
}

export interface V1GroupSubject {
  name: string;
}

export interface V1GroupVersionForDiscovery {
  groupVersion: string;
  version: string;
}

export interface V1GRPCAction {
  port: number;
  service?: string;
}

export interface V1HorizontalPodAutoscaler {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1HorizontalPodAutoscalerSpec;
  status?: V1HorizontalPodAutoscalerStatus;
}

export interface V1HorizontalPodAutoscalerList {
  apiVersion?: string;
  items: V1HorizontalPodAutoscaler[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1HorizontalPodAutoscalerSpec {
  maxReplicas: number;
  minReplicas?: number;
  scaleTargetRef: V1CrossVersionObjectReference;
  targetCPUUtilizationPercentage?: number;
}

export interface V1HorizontalPodAutoscalerStatus {
  currentCPUUtilizationPercentage?: number;
  currentReplicas: number;
  desiredReplicas: number;
  lastScaleTime?: V1Time;
  observedGeneration?: number;
}

export interface V1HostAlias {
  hostnames?: string[];
  ip: string;
}

export interface V1HostIP {
  ip: string;
}

export interface V1HostPathVolumeSource {
  path: string;
  type?: string;
}

export interface V1HTTPGetAction {
  host?: string;
  httpHeaders?: V1HTTPHeader[];
  path?: string;
  port: IntOrString;
  scheme?: string;
}

export interface V1HTTPHeader {
  name: string;
  value: string;
}

export interface V1HTTPIngressPath {
  backend: V1IngressBackend;
  path?: string;
  pathType: string;
}

export interface V1HTTPIngressRuleValue {
  paths: V1HTTPIngressPath[];
}

export interface V1ImageVolumeSource {
  pullPolicy?: string;
  reference?: string;
}

export interface V1Ingress {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1IngressSpec;
  status?: V1IngressStatus;
}

export interface V1IngressBackend {
  resource?: V1TypedLocalObjectReference;
  service?: V1IngressServiceBackend;
}

export interface V1IngressClass {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1IngressClassSpec;
}

export interface V1IngressClassList {
  apiVersion?: string;
  items: V1IngressClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1IngressClassParametersReference {
  apiGroup?: string;
  kind: string;
  name: string;
  namespace?: string;
  scope?: string;
}

export interface V1IngressClassSpec {
  controller?: string;
  parameters?: V1IngressClassParametersReference;
}

export interface V1IngressList {
  apiVersion?: string;
  items: V1Ingress[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1IngressLoadBalancerIngress {
  hostname?: string;
  ip?: string;
  ports?: V1IngressPortStatus[];
}

export interface V1IngressLoadBalancerStatus {
  ingress?: V1IngressLoadBalancerIngress[];
}

export interface V1IngressPortStatus {
  error?: string;
  port: number;
  protocol: string;
}

export interface V1IngressRule {
  host?: string;
  http?: V1HTTPIngressRuleValue;
}

export interface V1IngressServiceBackend {
  name: string;
  port?: V1ServiceBackendPort;
}

export interface V1IngressSpec {
  defaultBackend?: V1IngressBackend;
  ingressClassName?: string;
  rules?: V1IngressRule[];
  tls?: V1IngressTLS[];
}

export interface V1IngressStatus {
  loadBalancer?: V1IngressLoadBalancerStatus;
}

export interface V1IngressTLS {
  hosts?: string[];
  secretName?: string;
}

export interface V1IPAddress {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1IPAddressSpec;
}

export interface V1IPAddressList {
  apiVersion?: string;
  items: V1IPAddress[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1IPAddressSpec {
  parentRef: V1ParentReference;
}

export interface V1IPBlock {
  cidr: string;
  except?: string[];
}

export interface V1ISCSIPersistentVolumeSource {
  chapAuthDiscovery?: boolean;
  chapAuthSession?: boolean;
  fsType?: string;
  initiatorName?: string;
  iqn: string;
  iscsiInterface?: string;
  lun: number;
  portals?: string[];
  readOnly?: boolean;
  secretRef?: V1SecretReference;
  targetPortal: string;
}

export interface V1ISCSIVolumeSource {
  chapAuthDiscovery?: boolean;
  chapAuthSession?: boolean;
  fsType?: string;
  initiatorName?: string;
  iqn: string;
  iscsiInterface?: string;
  lun: number;
  portals?: string[];
  readOnly?: boolean;
  secretRef?: V1LocalObjectReference;
  targetPortal: string;
}

export interface V1Job {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1JobSpec;
  status?: V1JobStatus;
}

export interface V1JobCondition {
  lastProbeTime?: V1Time;
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1JobList {
  apiVersion?: string;
  items: V1Job[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1JobSpec {
  activeDeadlineSeconds?: number;
  backoffLimit?: number;
  backoffLimitPerIndex?: number;
  completionMode?: string;
  completions?: number;
  managedBy?: string;
  manualSelector?: boolean;
  maxFailedIndexes?: number;
  parallelism?: number;
  podFailurePolicy?: V1PodFailurePolicy;
  podReplacementPolicy?: string;
  selector?: V1LabelSelector;
  successPolicy?: V1SuccessPolicy;
  suspend?: boolean;
  template: V1PodTemplateSpec;
  ttlSecondsAfterFinished?: number;
}

export interface V1JobStatus {
  active?: number;
  completedIndexes?: string;
  completionTime?: V1Time;
  conditions?: V1JobCondition[];
  failed?: number;
  failedIndexes?: string;
  ready?: number;
  startTime?: V1Time;
  succeeded?: number;
  terminating?: number;
  uncountedTerminatedPods?: V1UncountedTerminatedPods;
}

export interface V1JobTemplateSpec {
  metadata?: V1ObjectMeta;
  spec?: V1JobSpec;
}

export interface V1JSON {
  [key: string]: unknown;
}

export interface V1JSONSchemaProps {
  $ref?: string;
  $schema?: string;
  additionalItems?: V1JSONSchemaPropsOrBool;
  additionalProperties?: V1JSONSchemaPropsOrBool;
  allOf?: V1JSONSchemaProps[];
  anyOf?: V1JSONSchemaProps[];
  default?: V1JSON;
  definitions?: Record<string, V1JSONSchemaProps>;
  dependencies?: Record<string, V1JSONSchemaPropsOrStringArray>;
  description?: string;
  enum?: V1JSON[];
  example?: V1JSON;
  exclusiveMaximum?: boolean;
  exclusiveMinimum?: boolean;
  externalDocs?: V1ExternalDocumentation;
  format?: string;
  id?: string;
  items?: V1JSONSchemaPropsOrArray;
  maximum?: number;
  maxItems?: number;
  maxLength?: number;
  maxProperties?: number;
  minimum?: number;
  minItems?: number;
  minLength?: number;
  minProperties?: number;
  multipleOf?: number;
  not?: V1JSONSchemaProps;
  nullable?: boolean;
  oneOf?: V1JSONSchemaProps[];
  pattern?: string;
  patternProperties?: Record<string, V1JSONSchemaProps>;
  properties?: Record<string, V1JSONSchemaProps>;
  required?: string[];
  title?: string;
  type?: string;
  uniqueItems?: boolean;
  "x-kubernetes-embedded-resource"?: boolean;
  "x-kubernetes-int-or-string"?: boolean;
  "x-kubernetes-list-map-keys"?: string[];
  "x-kubernetes-list-type"?: string;
  "x-kubernetes-map-type"?: string;
  "x-kubernetes-preserve-unknown-fields"?: boolean;
  "x-kubernetes-validations"?: V1ValidationRule[];
}

export interface V1JSONSchemaPropsOrArray {
  [key: string]: unknown;
}

export interface V1JSONSchemaPropsOrBool {
  [key: string]: unknown;
}

export interface V1JSONSchemaPropsOrStringArray {
  [key: string]: unknown;
}

export interface V1KeyToPath {
  key: string;
  mode?: number;
  path: string;
}

export interface V1LabelSelector {
  matchExpressions?: V1LabelSelectorRequirement[];
  matchLabels?: Record<string, string>;
}

export interface V1LabelSelectorAttributes {
  rawSelector?: string;
  requirements?: V1LabelSelectorRequirement[];
}

export interface V1LabelSelectorRequirement {
  key: string;
  operator: string;
  values?: string[];
}

export interface V1Lease {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1LeaseSpec;
}

export interface V1LeaseList {
  apiVersion?: string;
  items: V1Lease[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1LeaseSpec {
  acquireTime?: V1MicroTime;
  holderIdentity?: string;
  leaseDurationSeconds?: number;
  leaseTransitions?: number;
  preferredHolder?: string;
  renewTime?: V1MicroTime;
  strategy?: string;
}

export interface V1Lifecycle {
  postStart?: V1LifecycleHandler;
  preStop?: V1LifecycleHandler;
  stopSignal?: string;
}

export interface V1LifecycleHandler {
  exec?: V1ExecAction;
  httpGet?: V1HTTPGetAction;
  sleep?: V1SleepAction;
  tcpSocket?: V1TCPSocketAction;
}

export interface V1LimitedPriorityLevelConfiguration {
  borrowingLimitPercent?: number;
  lendablePercent?: number;
  limitResponse?: V1LimitResponse;
  nominalConcurrencyShares?: number;
}

export interface V1LimitRange {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1LimitRangeSpec;
}

export interface V1LimitRangeItem {
  default?: Record<string, Quantity>;
  defaultRequest?: Record<string, Quantity>;
  max?: Record<string, Quantity>;
  maxLimitRequestRatio?: Record<string, Quantity>;
  min?: Record<string, Quantity>;
  type: string;
}

export interface V1LimitRangeList {
  apiVersion?: string;
  items: V1LimitRange[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1LimitRangeSpec {
  limits: V1LimitRangeItem[];
}

export interface V1LimitResponse {
  queuing?: V1QueuingConfiguration;
  type: string;
}

export interface V1LinuxContainerUser {
  gid: number;
  supplementalGroups?: number[];
  uid: number;
}

export interface V1ListMeta {
  continue?: string;
  remainingItemCount?: number;
  resourceVersion?: string;
  selfLink?: string;
}

export interface V1LoadBalancerIngress {
  hostname?: string;
  ip?: string;
  ipMode?: string;
  ports?: V1PortStatus[];
}

export interface V1LoadBalancerStatus {
  ingress?: V1LoadBalancerIngress[];
}

export interface V1LocalObjectReference {
  name?: string;
}

export interface V1LocalSubjectAccessReview {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1SubjectAccessReviewSpec;
  status?: V1SubjectAccessReviewStatus;
}

export interface V1LocalVolumeSource {
  fsType?: string;
  path: string;
}

export interface V1ManagedFieldsEntry {
  apiVersion?: string;
  fieldsType?: string;
  fieldsV1?: V1FieldsV1;
  manager?: string;
  operation?: string;
  subresource?: string;
  time?: V1Time;
}

export interface V1MatchCondition {
  expression: string;
  name: string;
}

export interface V1MatchResources {
  excludeResourceRules?: V1NamedRuleWithOperations[];
  matchPolicy?: string;
  namespaceSelector?: V1LabelSelector;
  objectSelector?: V1LabelSelector;
  resourceRules?: V1NamedRuleWithOperations[];
}

export interface V1MicroTime {
  [key: string]: unknown;
}

export interface V1ModifyVolumeStatus {
  status: string;
  targetVolumeAttributesClassName?: string;
}

export interface V1MutatingWebhook {
  admissionReviewVersions: string[];
  clientConfig: V1AdmissionregistrationWebhookClientConfig;
  failurePolicy?: string;
  matchConditions?: V1MatchCondition[];
  matchPolicy?: string;
  name: string;
  namespaceSelector?: V1LabelSelector;
  objectSelector?: V1LabelSelector;
  reinvocationPolicy?: string;
  rules?: V1RuleWithOperations[];
  sideEffects: string;
  timeoutSeconds?: number;
}

export interface V1MutatingWebhookConfiguration {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  webhooks?: V1MutatingWebhook[];
}

export interface V1MutatingWebhookConfigurationList {
  apiVersion?: string;
  items: V1MutatingWebhookConfiguration[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1NamedRuleWithOperations {
  apiGroups?: string[];
  apiVersions?: string[];
  operations?: string[];
  resourceNames?: string[];
  resources?: string[];
  scope?: string;
}

export interface V1Namespace {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1NamespaceSpec;
  status?: V1NamespaceStatus;
}

export interface V1NamespaceCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1NamespaceList {
  apiVersion?: string;
  items: V1Namespace[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1NamespaceSpec {
  finalizers?: string[];
}

export interface V1NamespaceStatus {
  conditions?: V1NamespaceCondition[];
  phase?: string;
}

export interface V1NetworkPolicy {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1NetworkPolicySpec;
}

export interface V1NetworkPolicyEgressRule {
  ports?: V1NetworkPolicyPort[];
  to?: V1NetworkPolicyPeer[];
}

export interface V1NetworkPolicyIngressRule {
  from?: V1NetworkPolicyPeer[];
  ports?: V1NetworkPolicyPort[];
}

export interface V1NetworkPolicyList {
  apiVersion?: string;
  items: V1NetworkPolicy[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1NetworkPolicyPeer {
  ipBlock?: V1IPBlock;
  namespaceSelector?: V1LabelSelector;
  podSelector?: V1LabelSelector;
}

export interface V1NetworkPolicyPort {
  endPort?: number;
  port?: IntOrString;
  protocol?: string;
}

export interface V1NetworkPolicySpec {
  egress?: V1NetworkPolicyEgressRule[];
  ingress?: V1NetworkPolicyIngressRule[];
  podSelector: V1LabelSelector;
  policyTypes?: string[];
}

export interface V1NFSVolumeSource {
  path: string;
  readOnly?: boolean;
  server: string;
}

export interface V1Node {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1NodeSpec;
  status?: V1NodeStatus;
}

export interface V1NodeAddress {
  address: string;
  type: string;
}

export interface V1NodeAffinity {
  preferredDuringSchedulingIgnoredDuringExecution?: V1PreferredSchedulingTerm[];
  requiredDuringSchedulingIgnoredDuringExecution?: V1NodeSelector;
}

export interface V1NodeCondition {
  lastHeartbeatTime?: V1Time;
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1NodeConfigSource {
  configMap?: V1ConfigMapNodeConfigSource;
}

export interface V1NodeConfigStatus {
  active?: V1NodeConfigSource;
  assigned?: V1NodeConfigSource;
  error?: string;
  lastKnownGood?: V1NodeConfigSource;
}

export interface V1NodeDaemonEndpoints {
  kubeletEndpoint?: V1DaemonEndpoint;
}

export interface V1NodeFeatures {
  supplementalGroupsPolicy?: boolean;
}

export interface V1NodeList {
  apiVersion?: string;
  items: V1Node[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1NodeRuntimeHandler {
  features?: V1NodeRuntimeHandlerFeatures;
  name?: string;
}

export interface V1NodeRuntimeHandlerFeatures {
  recursiveReadOnlyMounts?: boolean;
  userNamespaces?: boolean;
}

export interface V1NodeSelector {
  nodeSelectorTerms: V1NodeSelectorTerm[];
}

export interface V1NodeSelectorRequirement {
  key: string;
  operator: string;
  values?: string[];
}

export interface V1NodeSelectorTerm {
  matchExpressions?: V1NodeSelectorRequirement[];
  matchFields?: V1NodeSelectorRequirement[];
}

export interface V1NodeSpec {
  configSource?: V1NodeConfigSource;
  externalID?: string;
  podCIDR?: string;
  podCIDRs?: string[];
  providerID?: string;
  taints?: V1Taint[];
  unschedulable?: boolean;
}

export interface V1NodeStatus {
  addresses?: V1NodeAddress[];
  allocatable?: Record<string, Quantity>;
  capacity?: Record<string, Quantity>;
  conditions?: V1NodeCondition[];
  config?: V1NodeConfigStatus;
  daemonEndpoints?: V1NodeDaemonEndpoints;
  features?: V1NodeFeatures;
  images?: V1ContainerImage[];
  nodeInfo?: V1NodeSystemInfo;
  phase?: string;
  runtimeHandlers?: V1NodeRuntimeHandler[];
  volumesAttached?: V1AttachedVolume[];
  volumesInUse?: string[];
}

export interface V1NodeSwapStatus {
  capacity?: number;
}

export interface V1NodeSystemInfo {
  architecture: string;
  bootID: string;
  containerRuntimeVersion: string;
  kernelVersion: string;
  kubeletVersion: string;
  kubeProxyVersion: string;
  machineID: string;
  operatingSystem: string;
  osImage: string;
  swap?: V1NodeSwapStatus;
  systemUUID: string;
}

export interface V1NonResourceAttributes {
  path?: string;
  verb?: string;
}

export interface V1NonResourcePolicyRule {
  nonResourceURLs: string[];
  verbs: string[];
}

export interface V1NonResourceRule {
  nonResourceURLs?: string[];
  verbs: string[];
}

export interface V1ObjectFieldSelector {
  apiVersion?: string;
  fieldPath: string;
}

export interface V1ObjectMeta {
  annotations?: Record<string, string>;
  creationTimestamp?: V1Time;
  deletionGracePeriodSeconds?: number;
  deletionTimestamp?: V1Time;
  finalizers?: string[];
  generateName?: string;
  generation?: number;
  labels?: Record<string, string>;
  managedFields?: V1ManagedFieldsEntry[];
  name?: string;
  namespace?: string;
  ownerReferences?: V1OwnerReference[];
  resourceVersion?: string;
  selfLink?: string;
  uid?: string;
}

export interface V1ObjectReference {
  apiVersion?: string;
  fieldPath?: string;
  kind?: string;
  name?: string;
  namespace?: string;
  resourceVersion?: string;
  uid?: string;
}

export interface V1Overhead {
  podFixed?: Record<string, Quantity>;
}

export interface V1OwnerReference {
  apiVersion: string;
  blockOwnerDeletion?: boolean;
  controller?: boolean;
  kind: string;
  name: string;
  uid: string;
}

export interface V1ParamKind {
  apiVersion?: string;
  kind?: string;
}

export interface V1ParamRef {
  name?: string;
  namespace?: string;
  parameterNotFoundAction?: string;
  selector?: V1LabelSelector;
}

export interface V1ParentReference {
  group?: string;
  name: string;
  namespace?: string;
  resource: string;
}

export interface V1Patch {
  [key: string]: unknown;
}

export interface V1PersistentVolume {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1PersistentVolumeSpec;
  status?: V1PersistentVolumeStatus;
}

export interface V1PersistentVolumeClaim {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1PersistentVolumeClaimSpec;
  status?: V1PersistentVolumeClaimStatus;
}

export interface V1PersistentVolumeClaimCondition {
  lastProbeTime?: V1Time;
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1PersistentVolumeClaimList {
  apiVersion?: string;
  items: V1PersistentVolumeClaim[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PersistentVolumeClaimSpec {
  accessModes?: string[];
  dataSource?: V1TypedLocalObjectReference;
  dataSourceRef?: V1TypedObjectReference;
  resources?: V1VolumeResourceRequirements;
  selector?: V1LabelSelector;
  storageClassName?: string;
  volumeAttributesClassName?: string;
  volumeMode?: string;
  volumeName?: string;
}

export interface V1PersistentVolumeClaimStatus {
  accessModes?: string[];
  allocatedResources?: Record<string, Quantity>;
  allocatedResourceStatuses?: Record<string, string>;
  capacity?: Record<string, Quantity>;
  conditions?: V1PersistentVolumeClaimCondition[];
  currentVolumeAttributesClassName?: string;
  modifyVolumeStatus?: V1ModifyVolumeStatus;
  phase?: string;
}

export interface V1PersistentVolumeClaimTemplate {
  metadata?: V1ObjectMeta;
  spec: V1PersistentVolumeClaimSpec;
}

export interface V1PersistentVolumeClaimVolumeSource {
  claimName: string;
  readOnly?: boolean;
}

export interface V1PersistentVolumeList {
  apiVersion?: string;
  items: V1PersistentVolume[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PersistentVolumeSpec {
  accessModes?: string[];
  awsElasticBlockStore?: V1AWSElasticBlockStoreVolumeSource;
  azureDisk?: V1AzureDiskVolumeSource;
  azureFile?: V1AzureFilePersistentVolumeSource;
  capacity?: Record<string, Quantity>;
  cephfs?: V1CephFSPersistentVolumeSource;
  cinder?: V1CinderPersistentVolumeSource;
  claimRef?: V1ObjectReference;
  csi?: V1CSIPersistentVolumeSource;
  fc?: V1FCVolumeSource;
  flexVolume?: V1FlexPersistentVolumeSource;
  flocker?: V1FlockerVolumeSource;
  gcePersistentDisk?: V1GCEPersistentDiskVolumeSource;
  glusterfs?: V1GlusterfsPersistentVolumeSource;
  hostPath?: V1HostPathVolumeSource;
  iscsi?: V1ISCSIPersistentVolumeSource;
  local?: V1LocalVolumeSource;
  mountOptions?: string[];
  nfs?: V1NFSVolumeSource;
  nodeAffinity?: V1VolumeNodeAffinity;
  persistentVolumeReclaimPolicy?: string;
  photonPersistentDisk?: V1PhotonPersistentDiskVolumeSource;
  portworxVolume?: V1PortworxVolumeSource;
  quobyte?: V1QuobyteVolumeSource;
  rbd?: V1RBDPersistentVolumeSource;
  scaleIO?: V1ScaleIOPersistentVolumeSource;
  storageClassName?: string;
  storageos?: V1StorageOSPersistentVolumeSource;
  volumeAttributesClassName?: string;
  volumeMode?: string;
  vsphereVolume?: V1VsphereVirtualDiskVolumeSource;
}

export interface V1PersistentVolumeStatus {
  lastPhaseTransitionTime?: V1Time;
  message?: string;
  phase?: string;
  reason?: string;
}

export interface V1PhotonPersistentDiskVolumeSource {
  fsType?: string;
  pdID: string;
}

export interface V1Pod {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1PodSpec;
  status?: V1PodStatus;
}

export interface V1PodAffinity {
  preferredDuringSchedulingIgnoredDuringExecution?: V1WeightedPodAffinityTerm[];
  requiredDuringSchedulingIgnoredDuringExecution?: V1PodAffinityTerm[];
}

export interface V1PodAffinityTerm {
  labelSelector?: V1LabelSelector;
  matchLabelKeys?: string[];
  mismatchLabelKeys?: string[];
  namespaces?: string[];
  namespaceSelector?: V1LabelSelector;
  topologyKey: string;
}

export interface V1PodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution?: V1WeightedPodAffinityTerm[];
  requiredDuringSchedulingIgnoredDuringExecution?: V1PodAffinityTerm[];
}

export interface V1PodCondition {
  lastProbeTime?: V1Time;
  lastTransitionTime?: V1Time;
  message?: string;
  observedGeneration?: number;
  reason?: string;
  status: string;
  type: string;
}

export interface V1PodDisruptionBudget {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1PodDisruptionBudgetSpec;
  status?: V1PodDisruptionBudgetStatus;
}

export interface V1PodDisruptionBudgetList {
  apiVersion?: string;
  items: V1PodDisruptionBudget[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PodDisruptionBudgetSpec {
  maxUnavailable?: IntOrString;
  minAvailable?: IntOrString;
  selector?: V1LabelSelector;
  unhealthyPodEvictionPolicy?: string;
}

export interface V1PodDisruptionBudgetStatus {
  conditions?: V1Condition[];
  currentHealthy: number;
  desiredHealthy: number;
  disruptedPods?: Record<string, V1Time>;
  disruptionsAllowed: number;
  expectedPods: number;
  observedGeneration?: number;
}

export interface V1PodDNSConfig {
  nameservers?: string[];
  options?: V1PodDNSConfigOption[];
  searches?: string[];
}

export interface V1PodDNSConfigOption {
  name?: string;
  value?: string;
}

export interface V1PodFailurePolicy {
  rules: V1PodFailurePolicyRule[];
}

export interface V1PodFailurePolicyOnExitCodesRequirement {
  containerName?: string;
  operator: string;
  values: number[];
}

export interface V1PodFailurePolicyOnPodConditionsPattern {
  status: string;
  type: string;
}

export interface V1PodFailurePolicyRule {
  action: string;
  onExitCodes?: V1PodFailurePolicyOnExitCodesRequirement;
  onPodConditions?: V1PodFailurePolicyOnPodConditionsPattern[];
}

export interface V1PodIP {
  ip: string;
}

export interface V1PodList {
  apiVersion?: string;
  items: V1Pod[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PodOS {
  name: string;
}

export interface V1PodReadinessGate {
  conditionType: string;
}

export interface V1PodResourceClaim {
  name: string;
  resourceClaimName?: string;
  resourceClaimTemplateName?: string;
}

export interface V1PodResourceClaimStatus {
  name: string;
  resourceClaimName?: string;
}

export interface V1PodSchedulingGate {
  name: string;
}

export interface V1PodSecurityContext {
  appArmorProfile?: V1AppArmorProfile;
  fsGroup?: number;
  fsGroupChangePolicy?: string;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: V1SeccompProfile;
  seLinuxChangePolicy?: string;
  seLinuxOptions?: V1SELinuxOptions;
  supplementalGroups?: number[];
  supplementalGroupsPolicy?: string;
  sysctls?: V1Sysctl[];
  windowsOptions?: V1WindowsSecurityContextOptions;
}

export interface V1PodSpec {
  activeDeadlineSeconds?: number;
  affinity?: V1Affinity;
  automountServiceAccountToken?: boolean;
  containers: V1Container[];
  dnsConfig?: V1PodDNSConfig;
  dnsPolicy?: string;
  enableServiceLinks?: boolean;
  ephemeralContainers?: V1EphemeralContainer[];
  hostAliases?: V1HostAlias[];
  hostIPC?: boolean;
  hostname?: string;
  hostNetwork?: boolean;
  hostPID?: boolean;
  hostUsers?: boolean;
  imagePullSecrets?: V1LocalObjectReference[];
  initContainers?: V1Container[];
  nodeName?: string;
  nodeSelector?: Record<string, string>;
  os?: V1PodOS;
  overhead?: Record<string, Quantity>;
  preemptionPolicy?: string;
  priority?: number;
  priorityClassName?: string;
  readinessGates?: V1PodReadinessGate[];
  resourceClaims?: V1PodResourceClaim[];
  resources?: V1ResourceRequirements;
  restartPolicy?: string;
  runtimeClassName?: string;
  schedulerName?: string;
  schedulingGates?: V1PodSchedulingGate[];
  securityContext?: V1PodSecurityContext;
  serviceAccount?: string;
  serviceAccountName?: string;
  setHostnameAsFQDN?: boolean;
  shareProcessNamespace?: boolean;
  subdomain?: string;
  terminationGracePeriodSeconds?: number;
  tolerations?: V1Toleration[];
  topologySpreadConstraints?: V1TopologySpreadConstraint[];
  volumes?: V1Volume[];
}

export interface V1PodStatus {
  conditions?: V1PodCondition[];
  containerStatuses?: V1ContainerStatus[];
  ephemeralContainerStatuses?: V1ContainerStatus[];
  hostIP?: string;
  hostIPs?: V1HostIP[];
  initContainerStatuses?: V1ContainerStatus[];
  message?: string;
  nominatedNodeName?: string;
  observedGeneration?: number;
  phase?: string;
  podIP?: string;
  podIPs?: V1PodIP[];
  qosClass?: string;
  reason?: string;
  resize?: string;
  resourceClaimStatuses?: V1PodResourceClaimStatus[];
  startTime?: V1Time;
}

export interface V1PodTemplate {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  template?: V1PodTemplateSpec;
}

export interface V1PodTemplateList {
  apiVersion?: string;
  items: V1PodTemplate[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PodTemplateSpec {
  metadata?: V1ObjectMeta;
  spec?: V1PodSpec;
}

export interface V1PolicyRule {
  apiGroups?: string[];
  nonResourceURLs?: string[];
  resourceNames?: string[];
  resources?: string[];
  verbs: string[];
}

export interface V1PolicyRulesWithSubjects {
  nonResourceRules?: V1NonResourcePolicyRule[];
  resourceRules?: V1ResourcePolicyRule[];
  subjects: V1FlowcontrolSubject[];
}

export interface V1PortStatus {
  error?: string;
  port: number;
  protocol: string;
}

export interface V1PortworxVolumeSource {
  fsType?: string;
  readOnly?: boolean;
  volumeID: string;
}

export interface V1Preconditions {
  resourceVersion?: string;
  uid?: string;
}

export interface V1PreferredSchedulingTerm {
  preference: V1NodeSelectorTerm;
  weight: number;
}

export interface V1PriorityClass {
  apiVersion?: string;
  description?: string;
  globalDefault?: boolean;
  kind?: string;
  metadata?: V1ObjectMeta;
  preemptionPolicy?: string;
  value: number;
}

export interface V1PriorityClassList {
  apiVersion?: string;
  items: V1PriorityClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PriorityLevelConfiguration {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1PriorityLevelConfigurationSpec;
  status?: V1PriorityLevelConfigurationStatus;
}

export interface V1PriorityLevelConfigurationCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status?: string;
  type?: string;
}

export interface V1PriorityLevelConfigurationList {
  apiVersion?: string;
  items: V1PriorityLevelConfiguration[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1PriorityLevelConfigurationReference {
  name: string;
}

export interface V1PriorityLevelConfigurationSpec {
  exempt?: V1ExemptPriorityLevelConfiguration;
  limited?: V1LimitedPriorityLevelConfiguration;
  type: string;
}

export interface V1PriorityLevelConfigurationStatus {
  conditions?: V1PriorityLevelConfigurationCondition[];
}

export interface V1Probe {
  exec?: V1ExecAction;
  failureThreshold?: number;
  grpc?: V1GRPCAction;
  httpGet?: V1HTTPGetAction;
  initialDelaySeconds?: number;
  periodSeconds?: number;
  successThreshold?: number;
  tcpSocket?: V1TCPSocketAction;
  terminationGracePeriodSeconds?: number;
  timeoutSeconds?: number;
}

export interface V1ProjectedVolumeSource {
  defaultMode?: number;
  sources?: V1VolumeProjection[];
}

export interface V1QueuingConfiguration {
  handSize?: number;
  queueLengthLimit?: number;
  queues?: number;
}

export interface V1QuobyteVolumeSource {
  group?: string;
  readOnly?: boolean;
  registry: string;
  tenant?: string;
  user?: string;
  volume: string;
}

export interface V1RbacSubject {
  apiGroup?: string;
  kind: string;
  name: string;
  namespace?: string;
}

export interface V1RBDPersistentVolumeSource {
  fsType?: string;
  image: string;
  keyring?: string;
  monitors: string[];
  pool?: string;
  readOnly?: boolean;
  secretRef?: V1SecretReference;
  user?: string;
}

export interface V1RBDVolumeSource {
  fsType?: string;
  image: string;
  keyring?: string;
  monitors: string[];
  pool?: string;
  readOnly?: boolean;
  secretRef?: V1LocalObjectReference;
  user?: string;
}

export interface V1ReplicaSet {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ReplicaSetSpec;
  status?: V1ReplicaSetStatus;
}

export interface V1ReplicaSetCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1ReplicaSetList {
  apiVersion?: string;
  items: V1ReplicaSet[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ReplicaSetSpec {
  minReadySeconds?: number;
  replicas?: number;
  selector: V1LabelSelector;
  template?: V1PodTemplateSpec;
}

export interface V1ReplicaSetStatus {
  availableReplicas?: number;
  conditions?: V1ReplicaSetCondition[];
  fullyLabeledReplicas?: number;
  observedGeneration?: number;
  readyReplicas?: number;
  replicas: number;
  terminatingReplicas?: number;
}

export interface V1ReplicationController {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ReplicationControllerSpec;
  status?: V1ReplicationControllerStatus;
}

export interface V1ReplicationControllerCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1ReplicationControllerList {
  apiVersion?: string;
  items: V1ReplicationController[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ReplicationControllerSpec {
  minReadySeconds?: number;
  replicas?: number;
  selector?: Record<string, string>;
  template?: V1PodTemplateSpec;
}

export interface V1ReplicationControllerStatus {
  availableReplicas?: number;
  conditions?: V1ReplicationControllerCondition[];
  fullyLabeledReplicas?: number;
  observedGeneration?: number;
  readyReplicas?: number;
  replicas: number;
}

export interface V1ResourceAttributes {
  fieldSelector?: V1FieldSelectorAttributes;
  group?: string;
  labelSelector?: V1LabelSelectorAttributes;
  name?: string;
  namespace?: string;
  resource?: string;
  subresource?: string;
  verb?: string;
  version?: string;
}

export interface V1ResourceClaim {
  name: string;
  request?: string;
}

export interface V1ResourceFieldSelector {
  containerName?: string;
  divisor?: Quantity;
  resource: string;
}

export interface V1ResourceHealth {
  health?: string;
  resourceID: string;
}

export interface V1ResourcePolicyRule {
  apiGroups: string[];
  clusterScope?: boolean;
  namespaces?: string[];
  resources: string[];
  verbs: string[];
}

export interface V1ResourceQuota {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ResourceQuotaSpec;
  status?: V1ResourceQuotaStatus;
}

export interface V1ResourceQuotaList {
  apiVersion?: string;
  items: V1ResourceQuota[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ResourceQuotaSpec {
  hard?: Record<string, Quantity>;
  scopes?: string[];
  scopeSelector?: V1ScopeSelector;
}

export interface V1ResourceQuotaStatus {
  hard?: Record<string, Quantity>;
  used?: Record<string, Quantity>;
}

export interface V1ResourceRequirements {
  claims?: V1ResourceClaim[];
  limits?: Record<string, Quantity>;
  requests?: Record<string, Quantity>;
}

export interface V1ResourceRule {
  apiGroups?: string[];
  resourceNames?: string[];
  resources?: string[];
  verbs: string[];
}

export interface V1ResourceStatus {
  name: string;
  resources?: V1ResourceHealth[];
}

export interface V1Role {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  rules?: V1PolicyRule[];
}

export interface V1RoleBinding {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  roleRef: V1RoleRef;
  subjects?: V1RbacSubject[];
}

export interface V1RoleBindingList {
  apiVersion?: string;
  items: V1RoleBinding[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1RoleList {
  apiVersion?: string;
  items: V1Role[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1RoleRef {
  apiGroup: string;
  kind: string;
  name: string;
}

export interface V1RollingUpdateDaemonSet {
  maxSurge?: IntOrString;
  maxUnavailable?: IntOrString;
}

export interface V1RollingUpdateDeployment {
  maxSurge?: IntOrString;
  maxUnavailable?: IntOrString;
}

export interface V1RollingUpdateStatefulSetStrategy {
  maxUnavailable?: IntOrString;
  partition?: number;
}

export interface V1RuleWithOperations {
  apiGroups?: string[];
  apiVersions?: string[];
  operations?: string[];
  resources?: string[];
  scope?: string;
}

export interface V1RuntimeClass {
  apiVersion?: string;
  handler: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  overhead?: V1Overhead;
  scheduling?: V1Scheduling;
}

export interface V1RuntimeClassList {
  apiVersion?: string;
  items: V1RuntimeClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1Scale {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ScaleSpec;
  status?: V1ScaleStatus;
}

export interface V1ScaleIOPersistentVolumeSource {
  fsType?: string;
  gateway: string;
  protectionDomain?: string;
  readOnly?: boolean;
  secretRef: V1SecretReference;
  sslEnabled?: boolean;
  storageMode?: string;
  storagePool?: string;
  system: string;
  volumeName?: string;
}

export interface V1ScaleIOVolumeSource {
  fsType?: string;
  gateway: string;
  protectionDomain?: string;
  readOnly?: boolean;
  secretRef: V1LocalObjectReference;
  sslEnabled?: boolean;
  storageMode?: string;
  storagePool?: string;
  system: string;
  volumeName?: string;
}

export interface V1ScaleSpec {
  replicas?: number;
}

export interface V1ScaleStatus {
  replicas: number;
  selector?: string;
}

export interface V1Scheduling {
  nodeSelector?: Record<string, string>;
  tolerations?: V1Toleration[];
}

export interface V1ScopedResourceSelectorRequirement {
  operator: string;
  scopeName: string;
  values?: string[];
}

export interface V1ScopeSelector {
  matchExpressions?: V1ScopedResourceSelectorRequirement[];
}

export interface V1SeccompProfile {
  localhostProfile?: string;
  type: string;
}

export interface V1Secret {
  apiVersion?: string;
  data?: Record<string, string>;
  immutable?: boolean;
  kind?: string;
  metadata?: V1ObjectMeta;
  stringData?: Record<string, string>;
  type?: string;
}

export interface V1SecretEnvSource {
  name?: string;
  optional?: boolean;
}

export interface V1SecretKeySelector {
  key: string;
  name?: string;
  optional?: boolean;
}

export interface V1SecretList {
  apiVersion?: string;
  items: V1Secret[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1SecretProjection {
  items?: V1KeyToPath[];
  name?: string;
  optional?: boolean;
}

export interface V1SecretReference {
  name?: string;
  namespace?: string;
}

export interface V1SecretVolumeSource {
  defaultMode?: number;
  items?: V1KeyToPath[];
  optional?: boolean;
  secretName?: string;
}

export interface V1SecurityContext {
  allowPrivilegeEscalation?: boolean;
  appArmorProfile?: V1AppArmorProfile;
  capabilities?: V1Capabilities;
  privileged?: boolean;
  procMount?: string;
  readOnlyRootFilesystem?: boolean;
  runAsGroup?: number;
  runAsNonRoot?: boolean;
  runAsUser?: number;
  seccompProfile?: V1SeccompProfile;
  seLinuxOptions?: V1SELinuxOptions;
  windowsOptions?: V1WindowsSecurityContextOptions;
}

export interface V1SelectableField {
  jsonPath: string;
}

export interface V1SelfSubjectAccessReview {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1SelfSubjectAccessReviewSpec;
  status?: V1SubjectAccessReviewStatus;
}

export interface V1SelfSubjectAccessReviewSpec {
  nonResourceAttributes?: V1NonResourceAttributes;
  resourceAttributes?: V1ResourceAttributes;
}

export interface V1SelfSubjectReview {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  status?: V1SelfSubjectReviewStatus;
}

export interface V1SelfSubjectReviewStatus {
  userInfo?: V1UserInfo;
}

export interface V1SelfSubjectRulesReview {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1SelfSubjectRulesReviewSpec;
  status?: V1SubjectRulesReviewStatus;
}

export interface V1SelfSubjectRulesReviewSpec {
  namespace?: string;
}

export interface V1SELinuxOptions {
  level?: string;
  role?: string;
  type?: string;
  user?: string;
}

export interface V1ServerAddressByClientCIDR {
  clientCIDR: string;
  serverAddress: string;
}

export interface V1Service {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ServiceSpec;
  status?: V1ServiceStatus;
}

export interface V1ServiceAccount {
  apiVersion?: string;
  automountServiceAccountToken?: boolean;
  imagePullSecrets?: V1LocalObjectReference[];
  kind?: string;
  metadata?: V1ObjectMeta;
  secrets?: V1ObjectReference[];
}

export interface V1ServiceAccountList {
  apiVersion?: string;
  items: V1ServiceAccount[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ServiceAccountSubject {
  name: string;
  namespace: string;
}

export interface V1ServiceAccountTokenProjection {
  audience?: string;
  expirationSeconds?: number;
  path: string;
}

export interface V1ServiceBackendPort {
  name?: string;
  number?: number;
}

export interface V1ServiceCIDR {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ServiceCIDRSpec;
  status?: V1ServiceCIDRStatus;
}

export interface V1ServiceCIDRList {
  apiVersion?: string;
  items: V1ServiceCIDR[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ServiceCIDRSpec {
  cidrs?: string[];
}

export interface V1ServiceCIDRStatus {
  conditions?: V1Condition[];
}

export interface V1ServiceList {
  apiVersion?: string;
  items: V1Service[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ServicePort {
  appProtocol?: string;
  name?: string;
  nodePort?: number;
  port: number;
  protocol?: string;
  targetPort?: IntOrString;
}

export interface V1ServiceSpec {
  allocateLoadBalancerNodePorts?: boolean;
  clusterIP?: string;
  clusterIPs?: string[];
  externalIPs?: string[];
  externalName?: string;
  externalTrafficPolicy?: string;
  healthCheckNodePort?: number;
  internalTrafficPolicy?: string;
  ipFamilies?: string[];
  ipFamilyPolicy?: string;
  loadBalancerClass?: string;
  loadBalancerIP?: string;
  loadBalancerSourceRanges?: string[];
  ports?: V1ServicePort[];
  publishNotReadyAddresses?: boolean;
  selector?: Record<string, string>;
  sessionAffinity?: string;
  sessionAffinityConfig?: V1SessionAffinityConfig;
  trafficDistribution?: string;
  type?: string;
}

export interface V1ServiceStatus {
  conditions?: V1Condition[];
  loadBalancer?: V1LoadBalancerStatus;
}

export interface V1SessionAffinityConfig {
  clientIP?: V1ClientIPConfig;
}

export interface V1SleepAction {
  seconds: number;
}

export interface V1StatefulSet {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1StatefulSetSpec;
  status?: V1StatefulSetStatus;
}

export interface V1StatefulSetCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V1StatefulSetList {
  apiVersion?: string;
  items: V1StatefulSet[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1StatefulSetOrdinals {
  start?: number;
}

export interface V1StatefulSetPersistentVolumeClaimRetentionPolicy {
  whenDeleted?: string;
  whenScaled?: string;
}

export interface V1StatefulSetSpec {
  minReadySeconds?: number;
  ordinals?: V1StatefulSetOrdinals;
  persistentVolumeClaimRetentionPolicy?: V1StatefulSetPersistentVolumeClaimRetentionPolicy;
  podManagementPolicy?: string;
  replicas?: number;
  revisionHistoryLimit?: number;
  selector: V1LabelSelector;
  serviceName?: string;
  template: V1PodTemplateSpec;
  updateStrategy?: V1StatefulSetUpdateStrategy;
  volumeClaimTemplates?: V1PersistentVolumeClaim[];
}

export interface V1StatefulSetStatus {
  availableReplicas?: number;
  collisionCount?: number;
  conditions?: V1StatefulSetCondition[];
  currentReplicas?: number;
  currentRevision?: string;
  observedGeneration?: number;
  readyReplicas?: number;
  replicas: number;
  updatedReplicas?: number;
  updateRevision?: string;
}

export interface V1StatefulSetUpdateStrategy {
  rollingUpdate?: V1RollingUpdateStatefulSetStrategy;
  type?: string;
}

export interface V1Status {
  apiVersion?: string;
  code?: number;
  details?: V1StatusDetails;
  kind?: string;
  message?: string;
  metadata?: V1ListMeta;
  reason?: string;
  status?: string;
}

export interface V1StatusCause {
  field?: string;
  message?: string;
  reason?: string;
}

export interface V1StatusDetails {
  causes?: V1StatusCause[];
  group?: string;
  kind?: string;
  name?: string;
  retryAfterSeconds?: number;
  uid?: string;
}

export interface V1StorageClass {
  allowedTopologies?: V1TopologySelectorTerm[];
  allowVolumeExpansion?: boolean;
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  mountOptions?: string[];
  parameters?: Record<string, string>;
  provisioner: string;
  reclaimPolicy?: string;
  volumeBindingMode?: string;
}

export interface V1StorageClassList {
  apiVersion?: string;
  items: V1StorageClass[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1StorageOSPersistentVolumeSource {
  fsType?: string;
  readOnly?: boolean;
  secretRef?: V1ObjectReference;
  volumeName?: string;
  volumeNamespace?: string;
}

export interface V1StorageOSVolumeSource {
  fsType?: string;
  readOnly?: boolean;
  secretRef?: V1LocalObjectReference;
  volumeName?: string;
  volumeNamespace?: string;
}

export interface V1StorageTokenRequest {
  audience: string;
  expirationSeconds?: number;
}

export interface V1SubjectAccessReview {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1SubjectAccessReviewSpec;
  status?: V1SubjectAccessReviewStatus;
}

export interface V1SubjectAccessReviewSpec {
  extra?: Record<string, string[]>;
  groups?: string[];
  nonResourceAttributes?: V1NonResourceAttributes;
  resourceAttributes?: V1ResourceAttributes;
  uid?: string;
  user?: string;
}

export interface V1SubjectAccessReviewStatus {
  allowed: boolean;
  denied?: boolean;
  evaluationError?: string;
  reason?: string;
}

export interface V1SubjectRulesReviewStatus {
  evaluationError?: string;
  incomplete: boolean;
  nonResourceRules: V1NonResourceRule[];
  resourceRules: V1ResourceRule[];
}

export interface V1SuccessPolicy {
  rules: V1SuccessPolicyRule[];
}

export interface V1SuccessPolicyRule {
  succeededCount?: number;
  succeededIndexes?: string;
}

export interface V1Sysctl {
  name: string;
  value: string;
}

export interface V1Taint {
  effect: string;
  key: string;
  timeAdded?: V1Time;
  value?: string;
}

export interface V1TCPSocketAction {
  host?: string;
  port: IntOrString;
}

export interface V1Time {
  [key: string]: unknown;
}

export interface V1TokenRequestSpec {
  audiences: string[];
  boundObjectRef?: V1BoundObjectReference;
  expirationSeconds?: number;
}

export interface V1TokenRequestStatus {
  expirationTimestamp: V1Time;
  token: string;
}

export interface V1TokenReview {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1TokenReviewSpec;
  status?: V1TokenReviewStatus;
}

export interface V1TokenReviewSpec {
  audiences?: string[];
  token?: string;
}

export interface V1TokenReviewStatus {
  audiences?: string[];
  authenticated?: boolean;
  error?: string;
  user?: V1UserInfo;
}

export interface V1Toleration {
  effect?: string;
  key?: string;
  operator?: string;
  tolerationSeconds?: number;
  value?: string;
}

export interface V1TopologySelectorLabelRequirement {
  key: string;
  values: string[];
}

export interface V1TopologySelectorTerm {
  matchLabelExpressions?: V1TopologySelectorLabelRequirement[];
}

export interface V1TopologySpreadConstraint {
  labelSelector?: V1LabelSelector;
  matchLabelKeys?: string[];
  maxSkew: number;
  minDomains?: number;
  nodeAffinityPolicy?: string;
  nodeTaintsPolicy?: string;
  topologyKey: string;
  whenUnsatisfiable: string;
}

export interface V1TypeChecking {
  expressionWarnings?: V1ExpressionWarning[];
}

export interface V1TypedLocalObjectReference {
  apiGroup?: string;
  kind: string;
  name: string;
}

export interface V1TypedObjectReference {
  apiGroup?: string;
  kind: string;
  name: string;
  namespace?: string;
}

export interface V1UncountedTerminatedPods {
  failed?: string[];
  succeeded?: string[];
}

export interface V1UserInfo {
  extra?: Record<string, string[]>;
  groups?: string[];
  uid?: string;
  username?: string;
}

export interface V1UserSubject {
  name: string;
}

export interface V1ValidatingAdmissionPolicy {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ValidatingAdmissionPolicySpec;
  status?: V1ValidatingAdmissionPolicyStatus;
}

export interface V1ValidatingAdmissionPolicyBinding {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1ValidatingAdmissionPolicyBindingSpec;
}

export interface V1ValidatingAdmissionPolicyBindingList {
  apiVersion?: string;
  items: V1ValidatingAdmissionPolicyBinding[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ValidatingAdmissionPolicyBindingSpec {
  matchResources?: V1MatchResources;
  paramRef?: V1ParamRef;
  policyName?: string;
  validationActions?: string[];
}

export interface V1ValidatingAdmissionPolicyList {
  apiVersion?: string;
  items: V1ValidatingAdmissionPolicy[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1ValidatingAdmissionPolicySpec {
  auditAnnotations?: V1AuditAnnotation[];
  failurePolicy?: string;
  matchConditions?: V1MatchCondition[];
  matchConstraints?: V1MatchResources;
  paramKind?: V1ParamKind;
  validations?: V1Validation[];
  variables?: V1Variable[];
}

export interface V1ValidatingAdmissionPolicyStatus {
  conditions?: V1Condition[];
  observedGeneration?: number;
  typeChecking?: V1TypeChecking;
}

export interface V1ValidatingWebhook {
  admissionReviewVersions: string[];
  clientConfig: V1AdmissionregistrationWebhookClientConfig;
  failurePolicy?: string;
  matchConditions?: V1MatchCondition[];
  matchPolicy?: string;
  name: string;
  namespaceSelector?: V1LabelSelector;
  objectSelector?: V1LabelSelector;
  rules?: V1RuleWithOperations[];
  sideEffects: string;
  timeoutSeconds?: number;
}

export interface V1ValidatingWebhookConfiguration {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  webhooks?: V1ValidatingWebhook[];
}

export interface V1ValidatingWebhookConfigurationList {
  apiVersion?: string;
  items: V1ValidatingWebhookConfiguration[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1Validation {
  expression: string;
  message?: string;
  messageExpression?: string;
  reason?: string;
}

export interface V1ValidationRule {
  fieldPath?: string;
  message?: string;
  messageExpression?: string;
  optionalOldSelf?: boolean;
  reason?: string;
  rule: string;
}

export interface V1Variable {
  expression: string;
  name: string;
}

export interface V1Volume {
  awsElasticBlockStore?: V1AWSElasticBlockStoreVolumeSource;
  azureDisk?: V1AzureDiskVolumeSource;
  azureFile?: V1AzureFileVolumeSource;
  cephfs?: V1CephFSVolumeSource;
  cinder?: V1CinderVolumeSource;
  configMap?: V1ConfigMapVolumeSource;
  csi?: V1CSIVolumeSource;
  downwardAPI?: V1DownwardAPIVolumeSource;
  emptyDir?: V1EmptyDirVolumeSource;
  ephemeral?: V1EphemeralVolumeSource;
  fc?: V1FCVolumeSource;
  flexVolume?: V1FlexVolumeSource;
  flocker?: V1FlockerVolumeSource;
  gcePersistentDisk?: V1GCEPersistentDiskVolumeSource;
  gitRepo?: V1GitRepoVolumeSource;
  glusterfs?: V1GlusterfsVolumeSource;
  hostPath?: V1HostPathVolumeSource;
  image?: V1ImageVolumeSource;
  iscsi?: V1ISCSIVolumeSource;
  name: string;
  nfs?: V1NFSVolumeSource;
  persistentVolumeClaim?: V1PersistentVolumeClaimVolumeSource;
  photonPersistentDisk?: V1PhotonPersistentDiskVolumeSource;
  portworxVolume?: V1PortworxVolumeSource;
  projected?: V1ProjectedVolumeSource;
  quobyte?: V1QuobyteVolumeSource;
  rbd?: V1RBDVolumeSource;
  scaleIO?: V1ScaleIOVolumeSource;
  secret?: V1SecretVolumeSource;
  storageos?: V1StorageOSVolumeSource;
  vsphereVolume?: V1VsphereVirtualDiskVolumeSource;
}

export interface V1VolumeAttachment {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec: V1VolumeAttachmentSpec;
  status?: V1VolumeAttachmentStatus;
}

export interface V1VolumeAttachmentList {
  apiVersion?: string;
  items: V1VolumeAttachment[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V1VolumeAttachmentSource {
  inlineVolumeSpec?: V1PersistentVolumeSpec;
  persistentVolumeName?: string;
}

export interface V1VolumeAttachmentSpec {
  attacher: string;
  nodeName: string;
  source: V1VolumeAttachmentSource;
}

export interface V1VolumeAttachmentStatus {
  attached: boolean;
  attachError?: V1VolumeError;
  attachmentMetadata?: Record<string, string>;
  detachError?: V1VolumeError;
}

export interface V1VolumeDevice {
  devicePath: string;
  name: string;
}

export interface V1VolumeError {
  errorCode?: number;
  message?: string;
  time?: V1Time;
}

export interface V1VolumeMount {
  mountPath: string;
  mountPropagation?: string;
  name: string;
  readOnly?: boolean;
  recursiveReadOnly?: string;
  subPath?: string;
  subPathExpr?: string;
}

export interface V1VolumeMountStatus {
  mountPath: string;
  name: string;
  readOnly?: boolean;
  recursiveReadOnly?: string;
}

export interface V1VolumeNodeAffinity {
  required?: V1NodeSelector;
}

export interface V1VolumeNodeResources {
  count?: number;
}

export interface V1VolumeProjection {
  clusterTrustBundle?: V1ClusterTrustBundleProjection;
  configMap?: V1ConfigMapProjection;
  downwardAPI?: V1DownwardAPIProjection;
  secret?: V1SecretProjection;
  serviceAccountToken?: V1ServiceAccountTokenProjection;
}

export interface V1VolumeResourceRequirements {
  limits?: Record<string, Quantity>;
  requests?: Record<string, Quantity>;
}

export interface V1VsphereVirtualDiskVolumeSource {
  fsType?: string;
  storagePolicyID?: string;
  storagePolicyName?: string;
  volumePath: string;
}

export interface V1WatchEvent {
  object: RawExtension;
  type: string;
}

export interface V1WebhookConversion {
  clientConfig?: V1ApiextensionsWebhookClientConfig;
  conversionReviewVersions: string[];
}

export interface V1WeightedPodAffinityTerm {
  podAffinityTerm: V1PodAffinityTerm;
  weight: number;
}

export interface V1WindowsSecurityContextOptions {
  gmsaCredentialSpec?: string;
  gmsaCredentialSpecName?: string;
  hostProcess?: boolean;
  runAsUserName?: string;
}

export interface V2ContainerResourceMetricSource {
  container: string;
  name: string;
  target: V2MetricTarget;
}

export interface V2ContainerResourceMetricStatus {
  container: string;
  current: V2MetricValueStatus;
  name: string;
}

export interface V2CrossVersionObjectReference {
  apiVersion?: string;
  kind: string;
  name: string;
}

export interface V2ExternalMetricSource {
  metric: V2MetricIdentifier;
  target: V2MetricTarget;
}

export interface V2ExternalMetricStatus {
  current: V2MetricValueStatus;
  metric: V2MetricIdentifier;
}

export interface V2HorizontalPodAutoscaler {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V2HorizontalPodAutoscalerSpec;
  status?: V2HorizontalPodAutoscalerStatus;
}

export interface V2HorizontalPodAutoscalerBehavior {
  scaleDown?: V2HPAScalingRules;
  scaleUp?: V2HPAScalingRules;
}

export interface V2HorizontalPodAutoscalerCondition {
  lastTransitionTime?: V1Time;
  message?: string;
  reason?: string;
  status: string;
  type: string;
}

export interface V2HorizontalPodAutoscalerList {
  apiVersion?: string;
  items: V2HorizontalPodAutoscaler[];
  kind?: string;
  metadata?: V1ListMeta;
}

export interface V2HorizontalPodAutoscalerSpec {
  behavior?: V2HorizontalPodAutoscalerBehavior;
  maxReplicas: number;
  metrics?: V2MetricSpec[];
  minReplicas?: number;
  scaleTargetRef: V2CrossVersionObjectReference;
}

export interface V2HorizontalPodAutoscalerStatus {
  conditions?: V2HorizontalPodAutoscalerCondition[];
  currentMetrics?: V2MetricStatus[];
  currentReplicas?: number;
  desiredReplicas: number;
  lastScaleTime?: V1Time;
  observedGeneration?: number;
}

export interface V2HPAScalingPolicy {
  periodSeconds: number;
  type: string;
  value: number;
}

export interface V2HPAScalingRules {
  policies?: V2HPAScalingPolicy[];
  selectPolicy?: string;
  stabilizationWindowSeconds?: number;
  tolerance?: Quantity;
}

export interface V2MetricIdentifier {
  name: string;
  selector?: V1LabelSelector;
}

export interface V2MetricSpec {
  containerResource?: V2ContainerResourceMetricSource;
  external?: V2ExternalMetricSource;
  object?: V2ObjectMetricSource;
  pods?: V2PodsMetricSource;
  resource?: V2ResourceMetricSource;
  type: string;
}

export interface V2MetricStatus {
  containerResource?: V2ContainerResourceMetricStatus;
  external?: V2ExternalMetricStatus;
  object?: V2ObjectMetricStatus;
  pods?: V2PodsMetricStatus;
  resource?: V2ResourceMetricStatus;
  type: string;
}

export interface V2MetricTarget {
  averageUtilization?: number;
  averageValue?: Quantity;
  type: string;
  value?: Quantity;
}

export interface V2MetricValueStatus {
  averageUtilization?: number;
  averageValue?: Quantity;
  value?: Quantity;
}

export interface V2ObjectMetricSource {
  describedObject: V2CrossVersionObjectReference;
  metric: V2MetricIdentifier;
  target: V2MetricTarget;
}

export interface V2ObjectMetricStatus {
  current: V2MetricValueStatus;
  describedObject: V2CrossVersionObjectReference;
  metric: V2MetricIdentifier;
}

export interface V2PodsMetricSource {
  metric: V2MetricIdentifier;
  target: V2MetricTarget;
}

export interface V2PodsMetricStatus {
  current: V2MetricValueStatus;
  metric: V2MetricIdentifier;
}

export interface V2ResourceMetricSource {
  name: string;
  target: V2MetricTarget;
}

export interface V2ResourceMetricStatus {
  current: V2MetricValueStatus;
  name: string;
}
