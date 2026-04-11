# kubernetes-client-typescript

A TypeScript-native Kubernetes client with generated, strongly typed, Kubernetes-shaped APIs that works in both browser and Node.

```ts
import { createKubernetesClient } from "@kubernetes-typescript/kubernetes";

const kube = createKubernetesClient({
  baseUrl: "https://cluster.example.com",
  auth: { type: "bearer", token: "..." },
});

const pods = await kube.core.v1.pods.list({ namespace: "default" });
```

## Why this exists

The existing [`kubernetes-client/javascript`](https://github.com/kubernetes-client/javascript) client works, but its API is shaped around OpenAPI operation names, not Kubernetes concepts. You end up writing code like:

```ts
// kubernetes-client/javascript
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const res = await k8sApi.listNamespacedPod({ namespace: "default" });
```

This project takes a different approach:

```ts
// @kubernetes-typescript/kubernetes
const pods = await kube.core.v1.pods.list({ namespace: "default" });
```

| | `kubernetes-client/javascript` | `@kubernetes-typescript/kubernetes` |
|---|---|---|
| **API shape** | OpenAPI operation names (`listNamespacedPod`) | Kubernetes-shaped (`core.v1.pods.list`) |
| **Types** | Generated but loosely typed | Strongly typed with scope enforcement |
| **Browser support** | Node-only | Browser-safe, uses `fetch` |
| **Custom resources** | Limited | First-class generic support |
| **Tree-shaking** | Monolithic | Resource-level imports |
| **Validation** | None | Optional, pluggable (Zod adapter) |

## Getting started

Install the runtime and generated Kubernetes bindings:

```sh
npm install @kubernetes-typescript/runtime @kubernetes-typescript/kubernetes
```

Create a client and start querying:

```ts
import { createKubernetesClient } from "@kubernetes-typescript/kubernetes";
import type { V1Deployment } from "@kubernetes-typescript/kubernetes/models";

const kube = createKubernetesClient({
  baseUrl: "https://cluster.example.com",
  auth: { type: "bearer", token: process.env.K8S_TOKEN! },
});

// List all deployments in a namespace
const deployments = await kube.apps.v1.deployments.list({
  namespace: "default",
});

for (const d of deployments.items) {
  console.log(d.metadata?.name, d.status?.readyReplicas);
}
```

The `auth.token` field also accepts an async function for dynamic token refresh:

```ts
const kube = createKubernetesClient({
  baseUrl: "https://cluster.example.com",
  auth: { type: "bearer", token: () => fetchTokenFromVault() },
});
```

## Resource operations

Every resource client supports `get`, `list`, `create`, `update`, `patch`, and `delete`. Namespaced resources require a `namespace` field; cluster-scoped resources like `namespaces` and `nodes` do not accept one. TypeScript enforces this at compile time.

```ts
// Get a single pod
const pod = await kube.core.v1.pods.get({
  namespace: "default",
  name: "web-abc123",
});

// List with label selectors
const filtered = await kube.core.v1.pods.list({
  namespace: "default",
  labelSelector: "app=web",
  limit: 25,
});

// Create a ConfigMap
await kube.core.v1.configmaps.create({
  namespace: "default",
  body: {
    metadata: { name: "app-config" },
    data: { LOG_LEVEL: "info" },
  },
});

// Scale a deployment with a merge patch
await kube.apps.v1.deployments.scale.patch({
  namespace: "default",
  name: "web",
  type: "merge",
  body: { spec: { replicas: 5 } },
});

// Server-side apply
await kube.apps.v1.deployments.patch({
  namespace: "default",
  name: "web",
  type: "apply",
  fieldManager: "my-controller",
  force: true,
  body: deploymentSpec,
});

// Delete with options
await kube.core.v1.pods.delete({
  namespace: "default",
  name: "web-abc123",
  gracePeriodSeconds: 0,
  propagationPolicy: "Background",
});
```

### Error handling

API errors are thrown as `KubernetesApiError` with structured fields:

```ts
import { KubernetesApiError } from "@kubernetes-typescript/runtime";

try {
  await kube.core.v1.pods.get({ namespace: "default", name: "missing" });
} catch (error) {
  if (KubernetesApiError.isNotFound(error)) {
    console.log("Pod not found");
  }
  if (error instanceof KubernetesApiError) {
    console.log(error.status);  // 404
    console.log(error.reason);  // "NotFound"
  }
}
```

## Custom resources

Use `kube.resource()` to create a typed client for any custom resource. The returned client has the same `get`/`list`/`create`/`update`/`patch`/`delete` interface as built-in resources:

```ts
interface CronTab {
  apiVersion: string;
  kind: string;
  metadata?: { name?: string; namespace?: string };
  spec: {
    cronSpec: string;
    image: string;
    replicas: number;
  };
}

const crontabs = kube.resource<CronTab>({
  apiVersion: "stable.example.com/v1",
  kind: "CronTab",
  plural: "crontabs",
  namespaced: true,
});

const list = await crontabs.list({ namespace: "default" });

await crontabs.create({
  namespace: "default",
  body: {
    apiVersion: "stable.example.com/v1",
    kind: "CronTab",
    metadata: { name: "my-cron" },
    spec: { cronSpec: "* * * * */5", image: "my-image", replicas: 1 },
  },
});
```

### Response validation with Zod

Install the optional Zod adapter to validate API responses at runtime:

```sh
npm install @kubernetes-typescript/zod zod
```

```ts
import { z } from "zod";
import { zodSchema } from "@kubernetes-typescript/zod";

const CronTabSchema = z.object({
  metadata: z.object({ name: z.string() }),
  spec: z.object({
    cronSpec: z.string(),
    image: z.string(),
    replicas: z.number(),
  }),
});

const crontabs = kube.resource({
  apiVersion: "stable.example.com/v1",
  kind: "CronTab",
  plural: "crontabs",
  namespaced: true,
  schema: zodSchema(CronTabSchema),
});

// Responses are now parsed and validated through your Zod schema
const tab = await crontabs.get({ namespace: "default", name: "my-cron" });
```

## Tree-shaking

The convenience client (`createKubernetesClient`) instantiates every resource group upfront. For bundle-sensitive applications, import only the resource factories you need:

```ts
import { createClient } from "@kubernetes-typescript/runtime";
import { pods, deployments } from "@kubernetes-typescript/kubernetes/resources";

const client = createClient({
  baseUrl: "https://cluster.example.com",
  auth: { type: "bearer", token: "..." },
});

// Only pods and deployments are included in your bundle
const Pods = pods(client);
const Deployments = deployments(client);

const podList = await Pods.list({ namespace: "default" });
const dep = await Deployments.get({ namespace: "default", name: "web" });
```

Each resource factory function returns a fully typed client with the same interface, including subresources:

```ts
const Deployments = deployments(client);

// Subresources are available just like the convenience client
await Deployments.scale.patch({
  namespace: "default",
  name: "web",
  type: "merge",
  body: { spec: { replicas: 3 } },
});
```

## Kubernetes version support

Bindings are generated from the official Kubernetes OpenAPI specification. The default import always points to the latest supported version.

| Kubernetes Version | Import Path | Status |
|---|---|---|
| v1.35 | `@kubernetes-typescript/kubernetes` (default) | Latest |
| v1.34 | `@kubernetes-typescript/kubernetes/v1.34` | Supported |
| v1.33 | `@kubernetes-typescript/kubernetes/v1.33` | Supported |

To pin a specific version:

```ts
import { createKubernetesClientFromRuntime } from "@kubernetes-typescript/kubernetes/v1.34";
import { createClient } from "@kubernetes-typescript/runtime";

const client = createClient({ baseUrl, auth });
const kube = createKubernetesClientFromRuntime(client);
```

### Generation pipeline

The `@kubernetes-typescript/generator` package reads a Kubernetes OpenAPI spec and produces the typed bindings:

```
Kubernetes OpenAPI spec (JSON)
  -> @kubernetes-typescript/generator
    -> TypeScript interfaces (models)
    -> Resource factory functions (resources)
    -> Convenience client wrapper
```

When a new Kubernetes version is released, the generator is re-run against the updated spec to produce new bindings. The runtime itself is version-independent and shared across all generated versions.

## Packages

| Package | Description |
|---|---|
| `@kubernetes-typescript/runtime` | Browser-safe HTTP client, resource client, error types |
| `@kubernetes-typescript/kubernetes` | Generated Kubernetes bindings and convenience client |
| `@kubernetes-typescript/zod` | Optional Zod response validation adapter |
| `@kubernetes-typescript/generator` | Code generator (not published to npm) |

## License

[MIT](LICENSE)
