# Agent Guide

This repository is building a TypeScript-native Kubernetes client. Start with the PRD, but use this guide to jump directly to the implementation context you need instead of reading the whole document every time.

## Product Direction

- Product overview and thesis: [docs/PRD.md#1-overview](docs/PRD.md#1-overview), [docs/PRD.md#2-product-thesis](docs/PRD.md#2-product-thesis)
- Users and differentiation: [docs/PRD.md#3-primary-users](docs/PRD.md#3-primary-users), [docs/PRD.md#4-differentiation](docs/PRD.md#4-differentiation)
- MVP goals and non-goals: [docs/PRD.md#5-mvp-goals](docs/PRD.md#5-mvp-goals), [docs/PRD.md#6-mvp-non-goals](docs/PRD.md#6-mvp-non-goals)
- Acceptance criteria: [docs/PRD.md#20-acceptance-criteria](docs/PRD.md#20-acceptance-criteria)

## Package Work

- Monorepo layout: [docs/PRD.md#7-proposed-monorepo-structure](docs/PRD.md#7-proposed-monorepo-structure)
- Package responsibilities: [docs/PRD.md#71-package-responsibilities](docs/PRD.md#71-package-responsibilities)
- Runtime requirements: [docs/PRD.md#8-runtime-requirements](docs/PRD.md#8-runtime-requirements)
- Generated Kubernetes package: [docs/PRD.md#9-generated-kubernetes-package](docs/PRD.md#9-generated-kubernetes-package)
- Generator requirements: [docs/PRD.md#10-generator-requirements](docs/PRD.md#10-generator-requirements)
- Zod validation adapter: [docs/PRD.md#12-validation-adapter-pattern](docs/PRD.md#12-validation-adapter-pattern)

## Runtime Implementation

- Client creation: [docs/PRD.md#81-runtime-client-creation](docs/PRD.md#81-runtime-client-creation)
- Resource verbs: [docs/PRD.md#82-resource-verbs](docs/PRD.md#82-resource-verbs)
- Patch support: [docs/PRD.md#83-patch-support](docs/PRD.md#83-patch-support)
- Subresources: [docs/PRD.md#84-subresources](docs/PRD.md#84-subresources)
- Custom resources: [docs/PRD.md#11-custom-resource-support](docs/PRD.md#11-custom-resource-support)
- Authentication: [docs/PRD.md#15-authentication-requirements](docs/PRD.md#15-authentication-requirements)
- Scope typing: [docs/PRD.md#16-resource-scope-typing](docs/PRD.md#16-resource-scope-typing)
- Error handling: [docs/PRD.md#17-error-handling](docs/PRD.md#17-error-handling)

## Generated Client Implementation

- Tree-shakeable resource factories: [docs/PRD.md#91-tree-shakeable-resource-factories](docs/PRD.md#91-tree-shakeable-resource-factories)
- Convenience wrapper: [docs/PRD.md#92-convenience-wrapper](docs/PRD.md#92-convenience-wrapper)
- Kubernetes-shaped API: [docs/PRD.md#93-kubernetes-shaped-api](docs/PRD.md#93-kubernetes-shaped-api)
- Flat model exports: [docs/PRD.md#94-model-exports](docs/PRD.md#94-model-exports)
- Generation coverage priorities: [docs/PRD.md#101-generation-coverage](docs/PRD.md#101-generation-coverage)
- Discovery client: [docs/PRD.md#18-discovery-client](docs/PRD.md#18-discovery-client)

## Browser And Demo Work

- Browser and security considerations: [docs/PRD.md#13-browser-and-security-considerations](docs/PRD.md#13-browser-and-security-considerations)
- React demo requirements: [docs/PRD.md#14-react-demo-requirements](docs/PRD.md#14-react-demo-requirements)

## Deferred Work

- Future package ideas and explicitly deferred features: [docs/PRD.md#19-future-work](docs/PRD.md#19-future-work)

## Implementation Notes

- Keep the runtime browser-safe. Do not add Node-only dependencies to `packages/runtime`.
- Shape public APIs around Kubernetes concepts, not OpenAPI operation names.
- Prefer flat named TypeScript model exports.
- Keep response validation adapter-based; do not make the runtime depend on Zod.
- Support resource-level imports first, then compose the convenience wrapper on top.
- Treat `watch`, Next.js helpers, React hooks, kubeconfig, and Axios support as post-MVP unless the PRD is updated.

