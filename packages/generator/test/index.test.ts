import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { generate, generateClient } from "../src/index.js";

const testDirectory = dirname(fileURLToPath(import.meta.url));
const kubernetesFixtureVersions = ["v1.35.3", "v1.34.6", "v1.33.10"] as const;
const expectedKubernetesResources = [
  "pods",
  "namespaces",
  "deployments",
  "jobs",
  "cronjobs",
  "customresourcedefinitions",
] as const;

const fixture = {
  swagger: "2.0",
  definitions: {
    "io.k8s.api.apps.v1.Deployment": {
      type: "object",
      properties: {
        apiVersion: { type: "string" },
        kind: { type: "string" },
        metadata: { $ref: "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta" },
        spec: { type: "object", additionalProperties: true },
      },
    },
    "io.k8s.api.apps.v1.DeploymentList": {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          type: "array",
          items: { $ref: "#/definitions/io.k8s.api.apps.v1.Deployment" },
        },
      },
    },
    "io.k8s.api.autoscaling.v1.Scale": {
      type: "object",
      properties: {
        spec: {
          type: "object",
          properties: {
            replicas: { type: "integer" },
          },
        },
      },
    },
    "io.k8s.api.core.v1.Namespace": {
      type: "object",
      properties: {
        metadata: { $ref: "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta" },
      },
    },
    "io.k8s.api.core.v1.NamespaceList": {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          type: "array",
          items: { $ref: "#/definitions/io.k8s.api.core.v1.Namespace" },
        },
      },
    },
    "io.k8s.api.core.v1.Pod": {
      type: "object",
      properties: {
        apiVersion: { type: "string" },
        kind: { type: "string" },
        metadata: { $ref: "#/definitions/io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta" },
      },
    },
    "io.k8s.api.core.v1.PodList": {
      type: "object",
      required: ["items"],
      properties: {
        items: {
          type: "array",
          items: { $ref: "#/definitions/io.k8s.api.core.v1.Pod" },
        },
      },
    },
    "io.k8s.apimachinery.pkg.apis.meta.v1.ObjectMeta": {
      type: "object",
      properties: {
        name: { type: "string" },
        namespace: { type: "string" },
      },
    },
  },
  paths: {
    "/api/v1/namespaces": {
      get: ok("#/definitions/io.k8s.api.core.v1.NamespaceList"),
    },
    "/api/v1/namespaces/{name}": {
      get: ok("#/definitions/io.k8s.api.core.v1.Namespace"),
    },
    "/api/v1/namespaces/{namespace}/pods": {
      get: ok("#/definitions/io.k8s.api.core.v1.PodList"),
      post: ok("#/definitions/io.k8s.api.core.v1.Pod"),
    },
    "/api/v1/namespaces/{namespace}/pods/{name}": {
      get: ok("#/definitions/io.k8s.api.core.v1.Pod"),
      put: ok("#/definitions/io.k8s.api.core.v1.Pod"),
      patch: ok("#/definitions/io.k8s.api.core.v1.Pod"),
      delete: ok("#/definitions/io.k8s.api.core.v1.Pod"),
    },
    "/apis/apps/v1/namespaces/{namespace}/deployments": {
      get: ok("#/definitions/io.k8s.api.apps.v1.DeploymentList"),
      post: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
    },
    "/apis/apps/v1/namespaces/{namespace}/deployments/{name}": {
      get: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
      put: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
      patch: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
      delete: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
    },
    "/apis/apps/v1/namespaces/{namespace}/deployments/{name}/scale": {
      get: ok("#/definitions/io.k8s.api.autoscaling.v1.Scale"),
      patch: ok("#/definitions/io.k8s.api.autoscaling.v1.Scale"),
    },
    "/apis/apps/v1/namespaces/{namespace}/deployments/{name}/status": {
      get: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
      patch: ok("#/definitions/io.k8s.api.apps.v1.Deployment"),
    },
  },
};

describe("generateClient", () => {
  it("generates flat models, resource factories, and a Kubernetes-shaped wrapper", () => {
    const generated = generateClient(fixture);
    const resources = generated.files.find((file) => file.path === "resources/index.ts")?.content ?? "";
    const root = generated.files.find((file) => file.path === "index.ts")?.content ?? "";
    const models = generated.files.find((file) => file.path === "models/index.ts")?.content ?? "";

    expect(generated.resources.map((resource) => resource.factoryName)).toEqual(["deployments", "namespaces", "pods"]);
    expect(models).toContain("export interface V1Pod");
    expect(models).toContain("metadata?: V1ObjectMeta;");
    expect(resources).toContain("export function pods(client: KubernetesClient): ResourceClient<V1Pod, V1PodList, \"namespaced\">");
    expect(resources).toContain("export function namespaces(client: KubernetesClient): ResourceClient<V1Namespace, V1NamespaceList, \"cluster\">");
    expect(resources).toContain("export interface DeploymentsClient extends ResourceClient<V1Deployment, V1DeploymentList, \"namespaced\">");
    expect(resources).toContain("scale: SubresourceClient<V1Scale, V1Scale, \"namespaced\">;");
    expect(resources).toContain("status: SubresourceClient<V1Deployment, V1Deployment, \"namespaced\">;");
    expect(root).toContain("core: {");
    expect(root).toContain("pods: ReturnType<typeof pods>;");
    expect(root).toContain("apps: {");
    expect(root).toContain("deployments: ReturnType<typeof deployments>;");
  });
});

describe("generate", () => {
  it("writes deterministic generated files to disk", async () => {
    const directory = await mkdtemp(join(tmpdir(), "kts-generator-"));
    const input = join(directory, "openapi.json");
    const output = join(directory, "generated");
    await writeFile(input, JSON.stringify(fixture), "utf8");

    await generate({ input, output });

    await expect(readFile(join(output, "models/index.ts"), "utf8")).resolves.toContain("export interface V1Deployment");
    await expect(readFile(join(output, "resources/index.ts"), "utf8")).resolves.toContain(
      "apiVersion: \"apps/v1\"",
    );
    await expect(readFile(join(output, "index.ts"), "utf8")).resolves.toContain("createKubernetesClient");
  });
});

describe("Kubernetes OpenAPI fixtures", () => {
  it.each(kubernetesFixtureVersions)("discovers the core resource subset from %s", async (version) => {
    const input = await readFile(
      join(testDirectory, "fixtures/kubernetes", `${version}.swagger.json`),
      "utf8",
    );
    const generated = generateClient(JSON.parse(input));
    const resources = new Map(generated.resources.map((resource) => [resource.factoryName, resource]));
    const root = generated.files.find((file) => file.path === "index.ts")?.content ?? "";

    expect(new Set(generated.models.map((model) => model.name)).size).toBe(generated.models.length);
    expect(new Set(generated.resources.map((resource) => resource.factoryName)).size).toBe(generated.resources.length);
    expect([...resources.keys()]).toEqual(expect.arrayContaining([...expectedKubernetesResources]));
    expect(resources.get("pods")).toMatchObject({ apiVersion: "v1", scope: "namespaced" });
    expect(resources.get("namespaces")).toMatchObject({ apiVersion: "v1", scope: "cluster" });
    expect(resources.get("deployments")).toMatchObject({ apiVersion: "apps/v1", scope: "namespaced" });
    expect(resources.get("jobs")).toMatchObject({ apiVersion: "batch/v1", scope: "namespaced" });
    expect(resources.get("cronjobs")).toMatchObject({ apiVersion: "batch/v1", scope: "namespaced" });
    expect(resources.get("customresourcedefinitions")).toMatchObject({
      apiVersion: "apiextensions.k8s.io/v1",
      scope: "cluster",
    });

    expect(resources.get("deployments")?.subresources.map((subresource) => subresource.name)).toEqual(
      expect.arrayContaining(["scale", "status"]),
    );
    expect(root).toContain("resourceApi: {");
    expect(root).toContain("resource<TResource");
  });
});

function ok(ref: string) {
  return {
    responses: {
      "200": {
        schema: {
          $ref: ref,
        },
      },
    },
  };
}
