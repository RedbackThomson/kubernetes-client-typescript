import { describe, expect, it, vi } from "vitest";
import { createClient, createResourceClient, KubernetesApiError } from "../src/index.js";

interface Pod {
  metadata?: {
    name?: string;
  };
}

interface PodList {
  items: Pod[];
}

function okJson(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}

describe("createClient", () => {
  it("merges static headers with bearer auth and lets auth win authorization", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({ ok: true }));
    const client = createClient({
      baseUrl: "https://cluster.example.com/root",
      auth: {
        type: "bearer",
        token: "runtime-token",
      },
      headers: {
        authorization: "Bearer stale-token",
        "x-workspace-id": "workspace-a",
      },
      fetch: fetchImpl,
    });

    await client.request({ path: "/api/v1/namespaces" });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/root/api/v1/namespaces"),
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer runtime-token",
          "x-workspace-id": "workspace-a",
        }),
      }),
    );
  });

  it("parses Kubernetes error responses into structured API errors", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockImplementation(async () =>
      new Response(
        JSON.stringify({
          kind: "Status",
          message: "pods \"missing\" not found",
          reason: "NotFound",
          details: {
            name: "missing",
          },
        }),
        { status: 404 },
      ),
    );
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });

    await expect(client.request({ path: "/api/v1/pods/missing" })).rejects.toMatchObject({
      name: "KubernetesApiError",
      message: "pods \"missing\" not found",
      status: 404,
      reason: "NotFound",
      details: {
        name: "missing",
      },
    });

    try {
      await client.request({ path: "/api/v1/pods/missing" });
    } catch (error) {
      expect(KubernetesApiError.isNotFound(error)).toBe(true);
    }
  });
});

describe("createResourceClient", () => {
  it("builds namespaced resource paths and list query parameters", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({ items: [] }));
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });
    const pods = createResourceClient<Pod, PodList, "namespaced">(client, {
      apiVersion: "v1",
      plural: "pods",
      namespaced: true,
    });

    await pods.list({
      namespace: "default",
      labelSelector: "app=web",
      limit: 25,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/api/v1/namespaces/default/pods?labelSelector=app%3Dweb&limit=25"),
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("builds grouped subresource patch requests", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({}));
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });
    const deployments = createResourceClient<Pod, PodList, "namespaced">(
      client,
      {
        apiVersion: "apps/v1",
        plural: "deployments",
        namespaced: true,
      },
      undefined,
      undefined,
      "scale",
    );

    await deployments.patch({
      namespace: "default",
      name: "web",
      type: "merge",
      body: {
        spec: {
          replicas: 3,
        },
      },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/apis/apps/v1/namespaces/default/deployments/web/scale"),
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({
          "content-type": "application/merge-patch+json",
        }),
        body: JSON.stringify({
          spec: {
            replicas: 3,
          },
        }),
      }),
    );
  });
});
