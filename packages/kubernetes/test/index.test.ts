import { describe, expect, it, vi } from "vitest";
import { createKubernetesClient, createKubernetesClientFromRuntime } from "../src/index.js";
import { deployments, namespaces, pods } from "../src/resources/index.js";
import type { KubernetesClient, RequestOptions } from "@kubernetes-typescript/runtime";

function mockClient(): KubernetesClient & { request: ReturnType<typeof vi.fn> } {
  return {
    request: vi.fn().mockResolvedValue({ items: [] }),
  };
}

describe("resource factories", () => {
  it("creates pods resource requests through the runtime client", async () => {
    const client = mockClient();
    const Pods = pods(client);

    await Pods.list({ namespace: "default" });

    expect(client.request).toHaveBeenCalledWith(
      expect.objectContaining<RequestOptions<unknown>>({
        path: "/api/v1/namespaces/default/pods",
        query: expect.objectContaining({}),
      }),
    );
  });

  it("creates namespaces as cluster-scoped resource requests", async () => {
    const client = mockClient();
    const Namespaces = namespaces(client);

    await Namespaces.get({ name: "default" });

    expect(client.request).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/api/v1/namespaces/default",
      }),
    );
  });

  it("exposes deployment scale and status subresources", async () => {
    const client = mockClient();
    const Deployments = deployments(client);

    await Deployments.scale.patch({
      namespace: "default",
      name: "web",
      type: "merge",
      body: {
        spec: {
          replicas: 3,
        },
      },
    });
    await Deployments.status.get({ namespace: "default", name: "web" });

    expect(client.request).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        method: "PATCH",
        path: "/apis/apps/v1/namespaces/default/deployments/web/scale",
      }),
    );
    expect(client.request).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/apis/apps/v1/namespaces/default/deployments/web/status",
      }),
    );
  });
});

describe("createKubernetesClientFromRuntime", () => {
  it("exposes the Kubernetes-shaped convenience resource tree", async () => {
    const client = mockClient();
    const kube = createKubernetesClientFromRuntime(client);

    await kube.core.v1.namespaces.list({});
    await kube.apps.v1.deployments.list({ namespace: "default" });

    expect(client.request).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/api/v1/namespaces",
      }),
    );
    expect(client.request).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/apis/apps/v1/namespaces/default/deployments",
      }),
    );
  });

  it("creates dynamic custom resource clients", async () => {
    const client = mockClient();
    const kube = createKubernetesClientFromRuntime(client);
    const schema = { parse: vi.fn((value: unknown) => value as { metadata?: { name?: string } }) };
    const listSchema = { parse: vi.fn((value: unknown) => value as { items: Array<{ metadata?: { name?: string } }> }) };
    const Widgets = kube.resource<{ metadata?: { name?: string } }>({
      apiVersion: "platform.example.com/v1",
      kind: "Widget",
      plural: "widgets",
      namespaced: true,
      schema,
      listSchema,
    });

    await Widgets.get({ namespace: "default", name: "demo" });
    await Widgets.list({ namespace: "default" });

    expect(client.request).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        path: "/apis/platform.example.com/v1/namespaces/default/widgets/demo",
        schema,
      }),
    );
    expect(client.request).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        path: "/apis/platform.example.com/v1/namespaces/default/widgets",
        schema: listSchema,
      }),
    );
  });
});

describe("createKubernetesClient", () => {
  it("creates the runtime client from options and exposes generated resources", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify({ items: [] }), {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }),
    );
    const kube = createKubernetesClient({
      baseUrl: "https://cluster.example.com/root",
      auth: {
        type: "bearer",
        token: "token-a",
      },
      fetch: fetchImpl,
    });

    await kube.core.v1.pods.list({ namespace: "default" });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/root/api/v1/namespaces/default/pods"),
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer token-a",
        }),
      }),
    );
  });
});
