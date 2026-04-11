# Development Guide

## Prerequisites

The simplest way to get a development environment is with the Nix flake, which provides Node.js 22, pnpm, TypeScript, and Prettier:

```sh
nix develop
```

## Setup

```sh
pnpm install
pnpm build
pnpm test
```

| Command | What it does |
|---|---|
| `pnpm build` | Builds all packages in dependency order (`tsc -b`) |
| `pnpm check` | Type-checks all packages without emitting |
| `pnpm test` | Runs vitest across all packages |
| `pnpm clean` | Removes all build artifacts |
| `pnpm dev` | Starts the React demo dev server |
| `pnpm kts` | Runs the generator CLI |

## Monorepo structure

```
packages/
  runtime/       @kubernetes-typescript/runtime
  kubernetes/    @kubernetes-typescript/kubernetes
  generator/     @kubernetes-typescript/generator
  zod/           @kubernetes-typescript/zod
examples/
  react-resource-browser/
```

### Dependency graph

```
runtime          (leaf, no internal dependencies)
  <- kubernetes  (depends on runtime)
  <- zod         (depends on runtime, peers on zod)

generator        (leaf, no internal dependencies)

examples/react-resource-browser
  <- kubernetes
```

Packages reference each other using `"workspace:*"` in their `package.json`. Build order is handled by `pnpm -r --sort`, which respects workspace dependencies.

## Architecture

The packages have a deliberate separation of concerns:

**runtime** is the core HTTP layer. It has zero knowledge of Kubernetes resources. It exports the `KubernetesClient` interface (a single `request()` method), the `ResourceClient` generic (typed CRUD operations), error types, and option types. It is browser-safe and has no Node.js dependencies.

**generator** reads a Kubernetes OpenAPI spec and produces TypeScript source files. It has no runtime dependency and is not published to npm. It only runs at generation time.

**kubernetes** is the output of the generator. It contains typed model interfaces, resource factory functions, and the convenience client wrapper. It depends on runtime and re-exports everything from the latest supported Kubernetes version.

**zod** is a thin adapter that bridges Zod schemas to the runtime's `ResponseSchema<T>` interface. It is optional and has a peer dependency on Zod.

## Runtime patterns

The runtime package (`packages/runtime/src/index.ts`) is a single file containing all types and implementations. The key abstractions:

### KubernetesClient

The lowest-level interface. A single `request<TResponse>(options)` method that handles URL construction, authentication, headers, and JSON parsing. Created via `createClient(options)`.

```ts
export interface KubernetesClient {
  request<TResponse>(options: RequestOptions<TResponse>): Promise<TResponse>;
}
```

Everything else in the system builds on top of this single method.

### ResourceClient

A generic interface parameterized over three types: the resource type, the list type, and the scope. Provides `get`, `list`, `create`, `update`, `patch`, `delete`, and `subresource` methods.

```ts
export interface ResourceClient<TResource, TList, TScope extends ResourceScope> {
  get(options: GetOptions<TScope>): Promise<TResource>;
  list(options: ListResourceOptions<TScope>): Promise<TList>;
  create(options: CreateOptions<TResource, TScope>): Promise<TResource>;
  update(options: UpdateOptions<TResource, TScope>): Promise<TResource>;
  patch<TPatch = Partial<TResource>>(options: PatchOptions<TPatch, TScope>): Promise<TResource>;
  delete(options: DeleteOptions<TScope>): Promise<TResource>;
  subresource(name: string): ResourceClient<TResource, TResource, TScope>;
}
```

Created via `createResourceClient(client, definition, schema?, listSchema?, subresource?)`.

### ResourceScope

The type `"namespaced" | "cluster"` flows through the generic parameter `TScope` to enforce namespace requirements at compile time. Namespaced resources require `{ namespace: string }`, cluster-scoped resources forbid it (`{ namespace?: never }`).

### ResponseSchema adapter

The runtime defines a minimal interface for response validation:

```ts
export interface ResponseSchema<T> {
  parse(value: unknown): T;
}
```

This is intentionally compatible with Zod's `.parse()` method, but the runtime never imports Zod. The `@kubernetes-typescript/zod` package bridges the two with a `zodSchema()` wrapper. Any validation library that implements `parse(unknown): T` works.

### KubernetesApiError

Structured error class thrown on non-2xx responses. Exposes `status`, `reason`, `details`, `body`, and `headers`. Includes a static `isNotFound()` helper.

### Path construction

The `resourcePath()` function builds Kubernetes API paths from a `ResourceDefinition`:

- Core group: `/api/v1/{plural}` or `/api/v1/namespaces/{namespace}/{plural}`
- Named groups: `/apis/{group}/{version}/{plural}` or `/apis/{group}/{version}/namespaces/{namespace}/{plural}`
- Subresources append `/{subresource}` after the resource name

### Patch content types

The `PatchType` union (`"merge" | "json" | "apply"`) maps to the standard Kubernetes content types:

- `merge` -> `application/merge-patch+json`
- `json` -> `application/json-patch+json`
- `apply` -> `application/apply-patch+json`

## Generator patterns

The generator package (`packages/generator/`) reads a Kubernetes OpenAPI spec and produces TypeScript files. The pipeline has three stages:

```
OpenAPI JSON  ->  Intermediate Representation (IR)  ->  TypeScript files
```

### Entry point

`src/index.ts` exports two key functions:

- `generate(options)` — reads the spec from disk, runs the pipeline, writes files to disk
- `generateClient(document, config)` — pure function that takes a parsed OpenAPI document and returns the generated client (models, resources, files)

### CLI

`src/cli.ts` provides the `kts generate` command:

```sh
pnpm kts generate --input <openapi.json> --output <dir> [--config <config.ts>]
```

Config is optional and loaded dynamically (supports `.ts`, `.js`, or `.json`). The `defineCodegenConfig()` helper provides type checking for config files.

### IR building (`src/ir.ts`)

`buildCodegenIr(document, config)` orchestrates the pipeline:

1. Extracts JSON schemas from the OpenAPI document
2. Builds a model name map (schema keys like `io.k8s.api.core.v1.Pod` -> TypeScript names like `V1Pod`)
3. Generates model IR (sorted interfaces with typed fields)
4. Discovers resources from API paths and maps them to their model types
5. Deduplicates factory names when multiple API groups produce the same resource name (e.g., `events` exists in both `core/v1` and `events.k8s.io/v1`)

### Resource discovery (`src/resources.ts`)

`discoverResources(document, config, modelNameMap)` iterates over every path in the OpenAPI spec:

- `parseResourcePath()` extracts the `apiVersion`, `plural`, `scope`, whether the path is `named` (has `{name}`), and any `subresource`
- `resourceVerb()` maps HTTP method + named status to verbs (`GET` on a named path -> `get`, `GET` on a collection -> `list`, etc.)
- Resources are accumulated into a map keyed by `apiVersion/plural`, collecting their verbs, types, and subresources
- Subresources (like `scale`, `status`) are tracked per parent resource

### Schema processing (`src/schema.ts`)

- `createModelNameMap()` generates unique TypeScript names from OpenAPI schema keys
- `tsType()` recursively converts JSON schemas to TypeScript type strings, handling `$ref`, `allOf`, `oneOf`, `anyOf`, enums, arrays, objects, `additionalProperties`, and primitives
- `responseTypeName()` extracts the model type from an operation's 200 response

### Naming (`src/naming.ts`)

- `identifier()` — camelCase for variable names
- `pascalCase()` — PascalCase for interface names
- `groupProperty()` — maps API versions to group names (`"v1"` -> `"core"`, `"apps/v1"` -> `"apps"`)
- `versionProperty()` — extracts version string
- `propertyName()` — returns a bare identifier or quoted string for object properties
- `countBy()` — counts duplicates for factory name deduplication

### Template rendering (`src/templates.ts`)

`renderFiles(ir)` produces three files:

| File | Contents |
|---|---|
| `models/index.ts` | Flat TypeScript interface exports, one per model |
| `resources/index.ts` | Resource factory functions that return `ResourceClient` |
| `index.ts` | Convenience client interface, `createKubernetesClient()`, dynamic resource factory |

Resource factories come in two shapes:

- **Simple** — returns `ResourceClient<T, TList, TScope>` directly
- **With subresources** — defines an extended interface with subresource properties (e.g., `DeploymentsClient` adds `.scale` and `.status`), returns that

The convenience client is a tree-structured interface organized as `group.version.resource`, built by grouping resources by their `groupProperty` and `versionProperty`.

## Generated code patterns

The generated code lives in `packages/kubernetes/src/`. Each supported Kubernetes version has its own directory (e.g., `v1.33/`, `v1.34/`, `v1.35/`). The root `index.ts` re-exports from the latest version.

### Models

`models/index.ts` exports flat TypeScript interfaces:

```ts
export interface V1Pod {
  apiVersion?: string;
  kind?: string;
  metadata?: V1ObjectMeta;
  spec?: V1PodSpec;
  status?: V1PodStatus;
}
```

Fields are optional unless the OpenAPI spec marks them as required. Schema-less models get an index signature (`[key: string]: unknown`).

### Resource factories

`resources/index.ts` exports factory functions. Each takes a `KubernetesClient` and returns a typed `ResourceClient`:

```ts
export function pods(client: KubernetesClient): ResourceClient<V1Pod, V1PodList, "namespaced"> {
  return createResourceClient(client, {
    apiVersion: "v1",
    plural: "pods",
    namespaced: true,
  });
}
```

Resources with subresources define an extended interface:

```ts
interface DeploymentsClient extends ResourceClient<V1Deployment, V1DeploymentList, "namespaced"> {
  scale: ResourceClient<V1Scale, V1Scale, "namespaced">;
  status: ResourceClient<V1Deployment, V1Deployment, "namespaced">;
}

export function deployments(client: KubernetesClient): DeploymentsClient {
  const base = createResourceClient<V1Deployment, V1DeploymentList, "namespaced">(client, { ... });
  return {
    ...base,
    scale: createResourceClient<V1Scale, V1Scale, "namespaced">(client, { ... }, undefined, undefined, "scale"),
    status: createResourceClient<V1Deployment, V1Deployment, "namespaced">(client, { ... }, undefined, undefined, "status"),
  };
}
```

### Convenience client

The root `index.ts` defines `KubernetesConvenienceClient` as a tree-structured interface and two constructor functions:

- `createKubernetesClient(options)` — creates a runtime client and wraps it
- `createKubernetesClientFromRuntime(client)` — wraps an existing `KubernetesClient`

It also attaches a `resource()` method for dynamic custom resource clients.

### Versioned exports

The `package.json` exports map supports importing specific versions:

```ts
// Default (latest)
import { createKubernetesClient } from "@kubernetes-typescript/kubernetes";

// Pinned version
import { createKubernetesClientFromRuntime } from "@kubernetes-typescript/kubernetes/v1.34";

// Pinned resources for tree-shaking
import { pods } from "@kubernetes-typescript/kubernetes/v1.34/resources";

// Pinned models
import type { V1Pod } from "@kubernetes-typescript/kubernetes/v1.34/models";
```

## Code conventions

### ESM only

All packages use `"type": "module"`. Relative imports use `.js` extensions (TypeScript resolves these to `.ts` during compilation):

```ts
import { createClient } from "@kubernetes-typescript/runtime";
import { buildCodegenIr } from "./ir.js";
```

### Type imports

`verbatimModuleSyntax` is enabled, which enforces `import type` for type-only imports:

```ts
import type { KubernetesClient, ResourceClient } from "@kubernetes-typescript/runtime";
import { createClient } from "@kubernetes-typescript/runtime";
```

### TypeScript configuration

All packages use composite project references for incremental builds. The base config (`tsconfig.base.json`) sets:

- Target: ES2022, Module: NodeNext
- Strict mode, declaration maps, source maps
- `isolatedModules` for bundler compatibility
- `skipLibCheck` for speed

Each package extends the base and adds:

```json
{
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist",
    "tsBuildInfoFile": "dist/.tsbuildinfo"
  }
}
```

Packages that depend on other workspace packages declare TypeScript project references, which ensures correct build ordering with `tsc -b`.

## Testing

Tests use Vitest and live in `packages/*/test/`. All packages run with `vitest run --passWithNoTests`.

### Runtime tests

Runtime tests mock `fetch` using `vi.fn()` and assert against the call arguments:

```ts
const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({ items: [] }));
const client = createClient({
  baseUrl: "https://cluster.example.com",
  auth: { type: "bearer", token: "test-token" },
  fetch: fetchImpl,
});

await client.request({ path: "/api/v1/pods" });

expect(fetchImpl).toHaveBeenCalledWith(
  new URL("https://cluster.example.com/api/v1/pods"),
  expect.objectContaining({
    headers: expect.objectContaining({
      authorization: "Bearer test-token",
    }),
  }),
);
```

A shared `okJson(body)` helper creates mock `Response` objects.

### Generator tests

Generator tests use fixture-based OpenAPI documents (inline JSON objects) and assert against the generated output:

```ts
const client = generateClient(fixture);
expect(client.resources).toEqual(
  expect.arrayContaining([
    expect.objectContaining({ plural: "deployments", scope: "namespaced" }),
  ]),
);
```

For full Kubernetes specs, tests read real OpenAPI fixtures from disk and verify that expected resources are discovered.

## Adding a new Kubernetes version

1. Download the OpenAPI spec for the new version
2. Run the generator:
   ```sh
   pnpm kts generate --input specs/v1.XX.json --output packages/kubernetes/src/v1.XX
   ```
3. Add export entries in `packages/kubernetes/package.json` for the new version (`./v1.XX`, `./v1.XX/models`, `./v1.XX/resources`)
4. Update the default re-export in `packages/kubernetes/src/index.ts` to point to the new version
5. Add a TypeScript project reference if needed in `packages/kubernetes/tsconfig.json`
6. Build and test: `pnpm build && pnpm test`
