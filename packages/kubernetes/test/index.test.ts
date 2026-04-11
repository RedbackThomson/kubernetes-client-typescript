import { describe, expect, it, vi } from "vitest";
import { createKubernetesClientFromRuntime } from "../src/index.js";
import { deployments, pods } from "../src/resources/index.js";
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
    const Widgets = kube.resource<{ metadata?: { name?: string } }>({
      apiVersion: "platform.example.com/v1",
      kind: "Widget",
      plural: "widgets",
      namespaced: true,
    });

    await Widgets.get({ namespace: "default", name: "demo" });

    expect(client.request).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/apis/platform.example.com/v1/namespaces/default/widgets/demo",
      }),
    );
  });
});
