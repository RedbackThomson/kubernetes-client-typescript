import { StrictMode, useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createKubernetesClient, type KubernetesConvenienceClient } from "@kubernetes-typescript/kubernetes";
import { ConnectionToolbar } from "@/components/ConnectionToolbar";
import { ResourceList } from "@/components/ResourceList";
import { ResourceTable, type ResourceTableProps } from "@/components/ResourceTable";
import type { ResourceType } from "@/types/resources";
import "./styles.css";

function fetchResources(
  kube: KubernetesConvenienceClient,
  resourceType: ResourceType,
  namespace: string,
  signal: AbortSignal,
): Promise<ResourceTableProps["data"]> {
  switch (resourceType) {
    case "deployments":
      return kube.apps.v1.deployments
        .list({ namespace, signal })
        .then((r) => r.items ?? []);
    case "pods":
      return kube.core.v1.pods
        .list({ namespace, signal })
        .then((r) => r.items ?? []);
    case "services":
      return kube.core.v1.services
        .list({ namespace, signal })
        .then((r) => r.items ?? []);
    case "configmaps":
      return kube.core.v1.configmaps
        .list({ namespace, signal })
        .then((r) => r.items ?? []);
    case "secrets":
      return kube.core.v1.secrets
        .list({ namespace, signal })
        .then((r) => r.items ?? []);
    case "crds":
      return kube.apiextensions.v1.customresourcedefinitions
        .list({ signal } as any)
        .then((r) => r.items ?? []);
  }
}

function App() {
  const [baseUrl, setBaseUrl] = useState("/api/kubernetes");
  const [token, setToken] = useState("");
  const [namespace, setNamespace] = useState("default");
  const [selectedResource, setSelectedResource] = useState<ResourceType>("deployments");

  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [data, setData] = useState<ResourceTableProps["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const kube = useMemo(() => {
    if (!baseUrl) {
      return undefined;
    }

    return createKubernetesClient({
      baseUrl,
      ...(token
        ? {
            auth: {
              type: "bearer" as const,
              token,
            },
          }
        : {}),
    });
  }, [baseUrl, token]);

  useEffect(() => {
    if (!kube) {
      setNamespaces([]);
      return;
    }

    let cancelled = false;
    kube.core.v1.namespaces.list({}).then(
      (result) => {
        if (cancelled) return;
        const names = (result.items ?? [])
          .map((ns) => ns.metadata?.name ?? "")
          .filter(Boolean)
          .sort();
        setNamespaces(names);
        if (names.length > 0 && !names.includes(namespace)) {
          setNamespace(names.includes("default") ? "default" : names[0]);
        }
      },
      () => {
        if (!cancelled) setNamespaces([]);
      },
    );
    return () => { cancelled = true; };
  }, [kube]);

  const loadResources = useCallback(() => {
    if (!kube) {
      setData([]);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchResources(kube, selectedResource, namespace, controller.signal).then(
      (items) => {
        setData(items);
        setLoading(false);
      },
      (err) => {
        if (controller.signal.aborted) return;
        setData([]);
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      },
    );

    return () => controller.abort();
  }, [kube, selectedResource, namespace]);

  useEffect(() => {
    return loadResources();
  }, [loadResources]);

  return (
    <div className="flex h-screen flex-col">
      <ConnectionToolbar
        baseUrl={baseUrl}
        token={token}
        namespace={namespace}
        namespaces={namespaces}
        onBaseUrlChange={setBaseUrl}
        onTokenChange={setToken}
        onNamespaceChange={setNamespace}
      />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 shrink-0 border-r overflow-y-auto p-4">
          <ResourceList
            selected={selectedResource}
            onSelect={setSelectedResource}
          />
        </aside>
        <main className="flex-1 overflow-auto p-4">
          {error && (
            <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <ResourceTable
            resourceType={selectedResource}
            data={data as any}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root element.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
