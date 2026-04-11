# MVP Implementation Plan

## Summary

Build the PRD MVP only, in this order: make the runtime correct and tested, use a hand-authored Kubernetes client slice as the golden API shape, then build the generator until it can reproduce and expand that slice, and finish by wiring the React demo against the generated package.

Stop after each implementation phase and ask for manual validation before continuing. Do not start the next phase until the user confirms the prior phase is acceptable.

## Implementation Phases

1. Baseline and Tests
   - Add Vitest to the workspace and package-level `test` scripts, with root `pnpm test`.
   - Keep `check` as `tsc -b --pretty false`; do not make tests depend on a live cluster.
   - Add package tests beside source or under `test/`; use mocked `fetch` for runtime and generated-client tests.
   - Stop for user manual validation before Phase 2.

2. Runtime Foundation
   - Complete `@kubernetes-typescript/runtime` around `createClient`, `createResourceClient`, and `KubernetesApiError`.
   - Support `baseUrl`, `fetch` override, bearer auth, static/async headers, `AbortSignal`, JSON request bodies, JSON/text/empty responses, query serialization, and response schema parsing.
   - Keep runtime browser-safe: no filesystem, kubeconfig, Node TLS, Axios, React, or watch dependencies.
   - Implement Kubernetes path construction for core API paths (`/api/v1`) and grouped API paths (`/apis/<group>/<version>`), namespaced and cluster-scoped resources, encoded path segments, and generic subresources.
   - Preserve structured errors with HTTP status, Kubernetes `reason`, Kubernetes message, `details`, raw parsed body, and response headers when available.
   - Define scope-aware resource client types so namespaced resources require `namespace` and cluster resources reject it.
   - Implement patch content types for `merge`, `json`, and `apply`; support `fieldManager` and `force` query params.
   - Stop for user manual validation before Phase 3.

3. Validation Adapter
   - Keep the runtime validation contract minimal: `ResponseSchema<T> { parse(value: unknown): T }`.
   - Implement `@kubernetes-typescript/zod` as the only MVP adapter with `zodSchema(schema)`.
   - Do not add runtime request validation.
   - Stop for user manual validation before Phase 4.

4. Golden Kubernetes Client Slice
   - Keep a hand-authored slice for pods, namespaces, deployments, deployment `scale`, and deployment `status` as the API contract the generator must reproduce.
   - Expose flat model exports from `@kubernetes-typescript/kubernetes/models`.
   - Expose tree-shakeable factories from `@kubernetes-typescript/kubernetes/resources`.
   - Expose `createKubernetesClient(options)` and `createKubernetesClientFromRuntime(client)` from `@kubernetes-typescript/kubernetes`.
   - Add dynamic `kube.resource<TResource, TList>()` support for custom resources using the runtime resource client.
   - Stop for user manual validation before Phase 5.

5. Generator
   - Build `@kubernetes-typescript/generator` to accept `kts generate --input <openapi.json> --output <dir> [--config <config.ts>]`.
   - Parse Kubernetes OpenAPI JSON, discover definitions, operations, group/version/plural/kind/scope, list types, and clear `status`/`scale` subresources.
   - Generate flat TypeScript model interfaces and resource factory functions that depend only on `@kubernetes-typescript/runtime`.
   - Generate a convenience wrapper shaped around Kubernetes concepts, not OpenAPI operation names.
   - Prioritize reliable output for pods, namespaces, services, config maps, secrets, deployments, replica sets, stateful sets, daemon sets, jobs, cron jobs, ingresses, service accounts, roles, role bindings, cluster roles, cluster role bindings, and custom resource definitions.
   - Keep the generator deterministic: stable file names, stable export order, formatted output, and no network fetch inside generation.
   - Stop for user manual validation before Phase 6.

6. Generated Package Integration
   - Move generated outputs under the Kubernetes package source tree and make package exports point at stable barrels for models, resources, and the root client.
   - Keep tree-shakeable resource-level imports working independently from the convenience wrapper.
   - Ensure generated resources support `get`, `list`, `create`, `update`, `patch`, `delete`, plus generated subresource clients when available.
   - Keep model exports flat and named; avoid grouped model namespaces for MVP.
   - Stop for user manual validation before Phase 7.

7. React Demo
   - Expand the Vite React demo into a practical resource browser.
   - Inputs: API server URL, bearer token, namespace selector/input.
   - Generated-client flows: list namespaces, pods, services, config maps, deployments; view selected resource JSON; create selected resources; delete selected resources; scale deployments.
   - Custom-resource flow: load one hard-coded custom resource type via `kube.resource`.
   - UX should clearly state direct browser-to-cluster caveats: CORS, scoped bearer tokens, least-privilege RBAC, and proxy preference for production.
   - Do not add React hooks package, TanStack Query, Next.js helpers, kubeconfig, watch, or a proxy package in the MVP.
   - Stop for user manual validation before Phase 8.

8. Documentation
   - Add usage docs covering runtime client creation, generated resource imports, convenience wrapper, custom resources, patching, subresources, Zod validation, browser security caveats, and generator usage.
   - Add a short development workflow: install, check, test, build, run demo, run generator.
   - Keep future work out of the MVP plan except as deferred notes that point back to the PRD.
   - Stop for final user manual validation.

## Public API Decisions

- Runtime:
  - `createClient(options: ClientOptions): KubernetesClient`
  - `createResourceClient<TResource, TList, TScope>(client, definition, schema?, listSchema?, subresource?)`
  - `ResourceClient` methods: `get`, `list`, `create`, `update`, `patch`, `delete`, `subresource`.
  - `PatchType = "merge" | "json" | "apply"`.
  - If both `auth` and `headers.authorization` are provided, bearer `auth` wins.

- Kubernetes package:
  - `createKubernetesClient(options)` creates a runtime client internally.
  - `createKubernetesClientFromRuntime(client)` composes generated resources around an existing runtime client.
  - `kube.core.v1.pods`, `kube.core.v1.namespaces`, `kube.apps.v1.deployments`.
  - Dynamic resources use `kube.resource({ apiVersion, kind, plural, namespaced })`.

- Generator:
  - `defineCodegenConfig` remains the typed config helper.
  - Generated public APIs must be Kubernetes-shaped and must not expose OpenAPI operation IDs.

## Test Plan

- Runtime unit tests:
  - URL construction for core, grouped, namespaced, cluster, named, list, and subresource paths.
  - Header resolution for static headers, async headers, bearer token, async bearer token, and auth precedence.
  - Query serialization for list, patch, delete, `fieldManager`, `force`, and omitted undefined values.
  - JSON body handling, empty response handling, text fallback, response schema parsing, and `AbortSignal` forwarding.
  - `KubernetesApiError` shape and `isNotFound`.

- Type tests:
  - Namespaced resources require `namespace`.
  - Cluster-scoped resources reject `namespace`.
  - Patch body generic defaults to `Partial<TResource>` but can be overridden.

- Kubernetes package tests:
  - Resource factories issue the expected runtime request paths and methods.
  - Convenience wrapper exposes the expected Kubernetes-shaped resource tree.
  - Dynamic custom resource clients build the expected paths for namespaced and cluster-scoped resources.
  - Deployment `scale` and `status` subresources use subresource paths.

- Generator tests:
  - Fixture OpenAPI input generates stable snapshots or exact text fixtures.
  - Golden generated output matches the hand-authored pods/namespaces/deployments client shape before expanding coverage.
  - Generated barrels export flat models and tree-shakeable resources.

- Demo checks:
  - `pnpm check`, `pnpm test`, and `pnpm build` pass.
  - Manual demo smoke test can enter URL/token/namespace, list namespaces/pods/deployments, view JSON, scale deployment, delete a selected resource, and load the hard-coded CRD client path.

## Assumptions

- Scope is MVP only; post-MVP packages and features from PRD section 19 stay deferred.
- The implementation sequence is runtime-first, then golden hand-authored slice, then generator.
- Vitest is the test runner.
- No live Kubernetes cluster is required for automated tests.
- The runtime must stay browser-safe and dependency-light.
- Server-side apply is included as the `apply` patch type with `application/apply-patch+json`; deeper SSA ergonomics remain deferred.
- The implementer must stop after each phase and wait for user manual validation before continuing.
