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

  it("resolves async headers and async bearer tokens", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({ ok: true }));
    const client = createClient({
      baseUrl: "https://cluster.example.com",
      auth: {
        type: "bearer",
        token: async () => "async-token",
      },
      headers: async () => ({
        authorization: "Bearer stale-token",
        "x-workspace-id": "workspace-a",
      }),
      fetch: fetchImpl,
    });

    await client.request({
      path: "/api/v1/namespaces",
      headers: {
        authorization: "Bearer request-token",
      },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/api/v1/namespaces"),
      expect.objectContaining({
        headers: expect.objectContaining({
          authorization: "Bearer async-token",
          "x-workspace-id": "workspace-a",
        }),
      }),
    );
  });

  it("adds JSON body headers for direct requests and forwards abort signals", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({ ok: true }));
    const signal = new AbortController().signal;
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });

    await client.request({
      method: "POST",
      path: "/api/v1/namespaces",
      body: {
        metadata: {
          name: "demo",
        },
      },
      signal,
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/api/v1/namespaces"),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "content-type": "application/json",
        }),
        body: JSON.stringify({
          metadata: {
            name: "demo",
          },
        }),
        signal,
      }),
    );
  });

  it("parses empty, text, and schema-validated responses", async () => {
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(new Response("ok", { status: 200 }))
      .mockResolvedValueOnce(okJson({ value: "demo" }));
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });

    await expect(client.request({ path: "/empty" })).resolves.toBeUndefined();
    await expect(client.request({ path: "/text" })).resolves.toBe("ok");
    await expect(
      client.request({
        path: "/schema",
        schema: {
          parse: (value) => ({ parsed: value }),
        },
      }),
    ).resolves.toEqual({
      parsed: {
        value: "demo",
      },
    });
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
        {
          status: 404,
          headers: {
            "x-request-id": "request-a",
          },
        },
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
      expect(error).toBeInstanceOf(KubernetesApiError);
      if (error instanceof KubernetesApiError) {
        expect(error.headers.get("x-request-id")).toBe("request-a");
      }
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

  it("builds cluster-scoped delete requests with defined query parameters only", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({}));
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });
    const namespaces = createResourceClient<Pod, PodList, "cluster">(client, {
      apiVersion: "v1",
      plural: "namespaces",
      namespaced: false,
    });

    await namespaces.delete({
      name: "demo",
      gracePeriodSeconds: 0,
      propagationPolicy: "Foreground",
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL("https://cluster.example.com/api/v1/namespaces/demo?gracePeriodSeconds=0&propagationPolicy=Foreground"),
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });

  it("builds apply patch query parameters and content type", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(okJson({}));
    const client = createClient({ baseUrl: "https://cluster.example.com", fetch: fetchImpl });
    const pods = createResourceClient<Pod, PodList, "namespaced">(client, {
      apiVersion: "v1",
      plural: "pods",
      namespaced: true,
    });

    await pods.patch({
      namespace: "default",
      name: "web",
      type: "apply",
      fieldManager: "resource-browser",
      force: true,
      body: {
        metadata: {
          name: "web",
        },
      },
    });

    expect(fetchImpl).toHaveBeenCalledWith(
      new URL(
        "https://cluster.example.com/api/v1/namespaces/default/pods/web?fieldManager=resource-browser&force=true",
      ),
      expect.objectContaining({
        method: "PATCH",
        headers: expect.objectContaining({
          "content-type": "application/apply-patch+json",
        }),
      }),
    );
  });
});
