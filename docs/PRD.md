# Product Requirements Document: TypeScript-Native Kubernetes Client

## 1. Overview

This project is a TypeScript-native Kubernetes API client designed for browser and server-side TypeScript developers. It should make Kubernetes resource management feel like working with a first-class TypeScript SDK rather than a thin REST or OpenAPI wrapper.

The MVP will be a pnpm monorepo containing a browser-safe runtime library, generated Kubernetes bindings from the Kubernetes OpenAPI specification, a generator package, an optional Zod response validation adapter, and a React demo application that talks directly to a publicly accessible Kubernetes API server.

The primary product promise is:

> A React developer can connect to a Kubernetes API server from the browser, use generated TypeScript-native clients to list and mutate Kubernetes resources, and use the same runtime shape for custom resources, with strong types and clean Kubernetes-shaped APIs.

## 2. Product Thesis

TypeScript developers should be able to work with Kubernetes resources from browser and Node environments using generated, strongly typed, Kubernetes-shaped APIs rather than OpenAPI-shaped or REST-shaped APIs.

The project is more than a Kubernetes client. It is a reusable client architecture:

```txt
Kubernetes OpenAPI spec -> generated typed bindings -> shared browser-safe runtime
```

Kubernetes is the flagship target for the MVP. In the future, the same runtime and generator architecture should support Kubernetes-like APIs with custom resources and verbs, provided those APIs expose OpenAPI specifications.

## 3. Primary Users

The MVP primarily targets:

- Front-end developers building Kubernetes dashboards, admin panels, deployment UIs, and internal tools.
- React developers who want to manage Kubernetes resources programmatically from browser applications.
- TypeScript developers building resource management tools that need strong typing and a pleasant API.
- Platform teams that want generated TypeScript bindings over Kubernetes resources.

Secondary future users include:

- Next.js developers building server/client Kubernetes workflows.
- Node.js CLI and automation authors.
- Teams with Kubernetes-like APIs that want to plug generated bindings into the same runtime.
- Developers who want optional runtime response validation through libraries such as Zod.

## 4. Differentiation

The core differentiator from existing JavaScript Kubernetes clients is TypeScript-first developer experience.

The client should optimize for:

- Strongly typed Kubernetes resource models.
- Kubernetes-shaped APIs such as `kube.apps.v1.deployments`, not OpenAPI operation names.
- Browser-safe runtime behavior.
- Generated bindings from the latest Kubernetes OpenAPI specification.
- Tree-shakeable resource-level imports where possible.
- A convenience wrapper for the simplest and most discoverable developer experience.
- Generic custom resource support.
- Optional response validation through an adapter pattern.
- Familiar TypeScript ecosystem integration points, including Zod and future transport adapters.

## 5. MVP Goals

The MVP should prove that:

- A browser-based React app can connect to a Kubernetes API server using a bearer token.
- Developers can use generated TypeScript resource clients to list and mutate Kubernetes resources.
- The public API is shaped around Kubernetes concepts rather than REST paths or OpenAPI operation IDs.
- Generated clients can attach to a common runtime library.
- The runtime can also support dynamically declared custom resource clients.
- Resource clients support common verbs: `get`, `list`, `create`, `update`, `patch`, and `delete`.
- Subresources such as `scale` and `status` can be modeled ergonomically.
- Response validation is optional and pluggable.
- The project can begin with Kubernetes but evolve toward Kubernetes-like OpenAPI-backed APIs.

## 6. MVP Non-Goals

The MVP should not include:

- Watch support.
- Informers, caches, or controller-runtime style primitives.
- Leader election.
- Next.js-specific helpers.
- React-specific hooks or TanStack Query integration.
- Kubeconfig loading.
- Axios transport support.
- Non-Kubernetes OpenAPI demo support.
- Runtime request validation.
- Full production-grade browser-to-cluster security guidance beyond clear caveats.
- Perfect generation of every Kubernetes resource edge case.

These are valid future directions, but they should not block the first proof of the product idea.

## 7. Proposed Monorepo Structure

The project should use a pnpm monorepo.

MVP packages:

```txt
packages/
  runtime/
  kubernetes/
  generator/
  zod/

examples/
  react-resource-browser/
```

Deferred packages:

```txt
packages/
  kubeconfig/
  axios/
  react/
  next/
```

### 7.1 Package Responsibilities

`@kubernetes-typescript/runtime` is the browser-safe shared runtime used by generated clients and dynamic custom resource clients.

`@kubernetes-typescript/kubernetes` is the generated Kubernetes binding package. It should expose flat model exports, tree-shakeable resource factory functions, and a convenience `createKubernetesClient` wrapper.

`@kubernetes-typescript/generator` reads Kubernetes OpenAPI input and generates model interfaces plus resource client factory functions.

`@kubernetes-typescript/zod` adapts Zod schemas to the runtime response validation interface.

`examples/react-resource-browser` is the MVP product demo.

## 8. Runtime Requirements

The runtime package must be environment-neutral and browser-safe.

It should include:

- A default `fetch`-based transport.
- Configurable `baseUrl`.
- Bearer token auth support.
- Static or asynchronous arbitrary headers.
- `AbortSignal` support.
- Kubernetes-style path building.
- Query parameter serialization.
- Typed resource client primitives.
- Namespaced and cluster-scoped resource handling.
- Generic subresource support.
- Structured Kubernetes API error handling.
- Patch content type handling.
- Optional response validation adapter support.
- No Node-only dependencies.

It should not include:

- Kubeconfig parsing.
- Filesystem access.
- Node-only TLS or certificate handling.
- React hooks.
- Watch support.
- Caching.
- Next.js-specific proxy helpers.

### 8.1 Runtime Client Creation

The runtime should support simple browser usage:

```ts
import { createClient } from "@kubernetes-typescript/runtime";

const client = createClient({
  baseUrl: "https://cluster.example.com",
  auth: {
    type: "bearer",
    token,
  },
});
```

It should also support arbitrary headers:

```ts
const client = createClient({
  baseUrl,
  headers: {
    "x-custom-header": "value",
  },
});
```

And asynchronous headers:

```ts
const client = createClient({
  baseUrl,
  headers: async () => ({
    authorization: `Bearer ${await getToken()}`,
  }),
});
```

### 8.2 Resource Verbs

Resource clients should support:

```ts
get({ name, namespace?, signal? })
list({ namespace?, labelSelector?, fieldSelector?, limit?, continue?, signal? })
create({ namespace?, body, signal? })
update({ name, namespace?, body, signal? })
patch({ name, namespace?, type, body, fieldManager?, force?, signal? })
delete({ name, namespace?, gracePeriodSeconds?, propagationPolicy?, signal? })
```

For namespaced resources, `namespace` should be required unless a future default namespace feature is added.

For cluster-scoped resources, `namespace` should be rejected at the type level.

### 8.3 Patch Support

MVP patch types:

```ts
type PatchType = "merge" | "json" | "apply";
```

Content type mapping:

```txt
merge -> application/merge-patch+json
json  -> application/json-patch+json
apply -> application/apply-patch+yaml or application/apply-patch+json
```

Server-side apply should be included if it fits cleanly into the shared patch implementation:

```ts
await kube.apps.v1.deployments.patch({
  namespace: "default",
  name: "web",
  type: "apply",
  fieldManager: "resource-browser",
  force: true,
  body,
});
```

If server-side apply introduces disproportionate complexity, it may remain a minimally supported patch type rather than a heavily abstracted feature.

### 8.4 Subresources

The runtime must support generic subresource path construction.

Generated clients should expose ergonomic subresource properties where possible:

```ts
await kube.apps.v1.deployments.scale.patch({
  namespace: "default",
  name: "web",
  type: "merge",
  body: {
    spec: {
      replicas: 3,
    },
  },
});
```

Dynamic clients should support generic subresource access:

```ts
await Widgets.subresource("status").patch({
  namespace: "default",
  name: "demo",
  type: "merge",
  body: {
    status: {
      phase: "Ready",
    },
  },
});
```

## 9. Generated Kubernetes Package

The generated Kubernetes package should feel hand-authored even though it is produced from the Kubernetes OpenAPI specification.

The package should expose both:

- Tree-shakeable resource factory imports.
- A convenience wrapper for the simplest developer experience.

### 9.1 Tree-Shakeable Resource Factories

The internal and tree-shakeable API should look like:

```ts
import { createClient } from "@kubernetes-typescript/runtime";
import { deployments, pods } from "@kubernetes-typescript/kubernetes/resources";

const client = createClient({ baseUrl, auth });

const Pods = pods(client);
const Deployments = deployments(client);

await Pods.list({ namespace: "default" });
await Deployments.patch({
  namespace: "default",
  name: "web",
  type: "merge",
  body: {
    spec: {
      replicas: 3,
    },
  },
});
```

### 9.2 Convenience Wrapper

The convenience wrapper should be included in the MVP because it is the primary DX showcase:

```ts
import { createKubernetesClient } from "@kubernetes-typescript/kubernetes";

const kube = createKubernetesClient({
  baseUrl,
  auth: {
    type: "bearer",
    token,
  },
});

await kube.core.v1.pods.list({ namespace: "default" });
await kube.apps.v1.deployments.list({ namespace: "default" });
```

The wrapper may modestly affect tree-shaking, but the architecture should still preserve tree-shakeable resource-level imports.

### 9.3 Kubernetes-Shaped API

Generated clients should be organized around Kubernetes concepts:

```ts
kube.core.v1.pods
kube.core.v1.namespaces
kube.apps.v1.deployments
kube.batch.v1.jobs
kube.apiextensions.v1.customResourceDefinitions
```

OpenAPI operation names are not part of the developer experience and should not shape the public API.

### 9.4 Model Exports

Generated Kubernetes model interfaces should be flat named exports.

Example:

```ts
import type {
  V1Pod,
  V1Deployment,
  V1ConfigMap,
} from "@kubernetes-typescript/kubernetes/models";
```

Grouped export barrels may be added later if useful, but flat named exports should be the default TypeScript-idiomatic option.

## 10. Generator Requirements

The generator package should read Kubernetes OpenAPI input and emit TypeScript model interfaces plus resource client factory functions.

The MVP generator should:

- Accept Kubernetes OpenAPI as input.
- Generate flat TypeScript interface exports for Kubernetes models.
- Generate resource factory functions.
- Prefer Kubernetes concepts over OpenAPI operation names.
- Infer group, version, resource, kind, plural, and namespaced scope where possible.
- Generate list response types.
- Generate subresource clients where clear, especially `status` and `scale`.
- Generate as much of Kubernetes as feasible.
- Prioritize correctness and ergonomics for common core resources.
- Emit code that depends on `@kubernetes-typescript/runtime`.

Example command shape:

```sh
pnpm kts generate \
  --input ./specs/kubernetes-openapi.json \
  --output ./packages/kubernetes/src/generated \
  --config ./kubernetes.codegen.ts
```

Example future config shape:

```ts
import { defineCodegenConfig } from "@kubernetes-typescript/generator";

export default defineCodegenConfig({
  clientName: "KubernetesClient",
  apiStyle: "kubernetes",
  resources: {
    include: ["*"],
  },
  verbs: {
    default: ["get", "list", "create", "update", "patch", "delete"],
  },
  runtimePackage: "@kubernetes-typescript/runtime",
});
```

### 10.1 Generation Coverage

The MVP should attempt to generate the complete Kubernetes API surface, but it does not need to get every edge case correct immediately.

The first correctness bar should be high for:

- Pods
- Namespaces
- Services
- ConfigMaps
- Secrets
- Deployments
- ReplicaSets
- StatefulSets
- DaemonSets
- Jobs
- CronJobs
- Ingresses
- ServiceAccounts
- Roles
- RoleBindings
- ClusterRoles
- ClusterRoleBindings
- CustomResourceDefinitions

## 11. Custom Resource Support

Custom resource support remains important in the MVP, but primarily as dynamic resource clients for resource management workflows rather than operator-building primitives.

Example:

```ts
const Widgets = kube.resource<Widget>({
  apiVersion: "platform.example.com/v1",
  kind: "Widget",
  plural: "widgets",
  namespaced: true,
});

const widgets = await Widgets.list({ namespace: "default" });
```

With response validation:

```ts
const Widgets = kube.resource({
  apiVersion: "platform.example.com/v1",
  kind: "Widget",
  plural: "widgets",
  namespaced: true,
  schema: zodSchema(WidgetSchema),
});
```

The React demo may hard-code one custom resource type initially.

Support for generating clients for non-Kubernetes OpenAPI-backed APIs is deferred, but the runtime and generator architecture should not block that future.

## 12. Validation Adapter Pattern

Zod is an important integration, but the runtime should not depend on Zod.

The runtime should define a minimal response validation interface:

```ts
export interface ResponseSchema<T> {
  parse(value: unknown): T;
}
```

The Zod package should adapt Zod schemas into that interface:

```ts
import { z } from "zod";
import type { ResponseSchema } from "@kubernetes-typescript/runtime";

export function zodSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
): ResponseSchema<z.infer<TSchema>> {
  return {
    parse: (value) => schema.parse(value),
  };
}
```

MVP validation rules:

- Response validation is optional.
- Request bodies should be strongly typed at compile time.
- Runtime request validation is not required.
- Other validators can be supported later through the same adapter shape.

## 13. Browser And Security Considerations

Browser support is a primary use case.

The runtime should support direct browser-to-cluster usage initially:

```ts
const kube = createKubernetesClient({
  baseUrl: "https://cluster.example.com",
  auth: {
    type: "bearer",
    token,
  },
});
```

However, documentation should clearly explain that direct browser-to-cluster access has production implications:

- Kubernetes API server CORS configuration must allow the browser app.
- Bearer tokens in browser applications must be scoped carefully.
- RBAC should be least-privilege.
- Production applications may prefer a proxy pattern to keep cluster credentials server-side.

The runtime should be designed so both direct browser access and proxy-backed access are possible:

```ts
const kube = createKubernetesClient({
  baseUrl: "/api/kubernetes",
  headers: async () => ({
    "x-workspace-id": workspaceId,
  }),
});
```

Next.js-specific proxy helpers are deferred.

## 14. React Demo Requirements

The MVP demo should be a plain React application, likely Vite-based.

The demo should connect directly to a publicly accessible Kubernetes API server using a bearer token.

The demo should eventually support:

- Entering API server URL.
- Entering bearer token.
- Loading namespaces.
- Selecting a namespace.
- Listing pods.
- Listing services.
- Listing config maps.
- Listing deployments.
- Viewing resource JSON.
- Creating resources.
- Deleting resources.
- Scaling deployments.
- Creating and deleting pods, with UI copy that makes clear standalone pods are less common than deployment-managed pods.
- Loading one hard-coded custom resource type.
- Exercising both generated built-in clients and the generic custom resource client.

The demo should not require:

- Next.js.
- A proxy.
- A React-specific client package.
- TanStack Query.
- Watch support.

## 15. Authentication Requirements

MVP authentication should support:

- Raw bearer tokens.
- Arbitrary static headers.
- Arbitrary asynchronous headers.

Example:

```ts
const kube = createKubernetesClient({
  baseUrl,
  auth: {
    type: "bearer",
    token,
  },
});
```

Example with headers:

```ts
const kube = createKubernetesClient({
  baseUrl,
  headers: async () => ({
    authorization: `Bearer ${token}`,
    "x-custom-header": value,
  }),
});
```

Deferred authentication support:

- Kubeconfig.
- In-cluster service account.
- Exec credential plugins.
- Cloud-provider auth helpers.
- Next.js session-aware proxy helpers.

## 16. Resource Scope Typing

Namespaced versus cluster-scoped resources should be represented in the type system.

Namespaced example:

```ts
await kube.core.v1.pods.get({
  namespace: "default",
  name: "web",
});
```

Cluster-scoped example:

```ts
await kube.core.v1.namespaces.get({
  name: "default",
});
```

This should be a type error:

```ts
await kube.core.v1.namespaces.get({
  namespace: "default",
  name: "default",
});
```

This type-level distinction is part of the project's TypeScript-native differentiator.

## 17. Error Handling

The runtime should expose structured errors for Kubernetes API failures.

Example target shape:

```ts
try {
  await kube.core.v1.pods.get({
    namespace: "default",
    name: "missing",
  });
} catch (error) {
  if (KubernetesApiError.isNotFound(error)) {
    // typed not found handling
  }
}
```

The error object should preserve useful Kubernetes status details when available:

- HTTP status code.
- Kubernetes status reason.
- Kubernetes status message.
- Response headers where useful.
- Raw response body where safely available.

## 18. Discovery Client

A discovery client is part of the broader project vision. For MVP, it is useful but secondary to generated resource clients and the React demo.

Target capabilities:

```ts
await kube.discovery.apiGroups();
await kube.discovery.resources();
await kube.discovery.serverVersion();
```

Useful future helpers:

```ts
await kube.discovery.hasResource({
  group: "apps",
  version: "v1",
  resource: "deployments",
});

await kube.discovery.hasSubresource({
  group: "apps",
  version: "v1",
  resource: "deployments",
  subresource: "scale",
});
```

Discovery should not displace the generated client as the primary MVP developer experience.

## 19. Future Work

Likely post-MVP additions:

- `@kubernetes-typescript/kubeconfig` for Node-only kubeconfig support.
- `@kubernetes-typescript/axios` transport adapter.
- `@kubernetes-typescript/next` proxy helpers.
- `@kubernetes-typescript/react` helpers, likely integrating with TanStack Query rather than inventing a custom cache.
- Watch support.
- More robust server-side apply ergonomics.
- Generation for Kubernetes-like non-Kubernetes APIs from OpenAPI.
- Simpler hand-authored resource manifest support, if OpenAPI proves too heavy for some use cases.
- Runtime request validation adapter support.
- Improved generated client splitting for stronger tree-shaking.
- More comprehensive subresource generation.

## 20. Acceptance Criteria

The MVP is successful when:

- The repository is a pnpm monorepo.
- `@kubernetes-typescript/runtime` can run in a browser bundle without Node-only dependencies.
- `@kubernetes-typescript/kubernetes` exposes generated Kubernetes model interfaces as flat named exports.
- `@kubernetes-typescript/kubernetes` exposes tree-shakeable resource factory functions.
- `@kubernetes-typescript/kubernetes` exposes a convenience `createKubernetesClient` wrapper.
- Common core resources have reliable generated clients.
- Namespaced and cluster-scoped resources are differentiated in TypeScript types.
- Resource clients support `get`, `list`, `create`, `update`, `patch`, and `delete`.
- Patch supports merge patch and JSON patch.
- Server-side apply is supported if it fits cleanly.
- Subresources such as `scale` and `status` are usable.
- Dynamic custom resource clients are usable.
- Response validation is optional and adapter-based.
- `@kubernetes-typescript/zod` adapts Zod schemas for response validation.
- The React demo can connect to a public Kubernetes API server with a bearer token.
- The React demo can list namespaces and common resources.
- The React demo can create, delete, and scale selected resources.
- The React demo can load one hard-coded custom resource type.

