import { StrictMode, useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Theme, Flex, Box, Callout, Separator } from "@radix-ui/themes";
import {
  createKubernetesClient,
  type KubernetesConvenienceClient,
  type V1Deployment,
  type V1Pod,
} from "@kubernetes-typescript/kubernetes";
import { ConnectionToolbar } from "@/components/ConnectionToolbar";
import { ResourceList } from "@/components/ResourceList";
import {
  ResourceTable,
  type ResourceTableProps,
} from "@/components/ResourceTable";
import { ResourceDrawer } from "@/components/ResourceDrawer";
import { ScaleDialog } from "@/components/ScaleDialog";
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
    default: {
      const _exhaustive: never = resourceType;
      throw new Error(`Unexpected resource type: ${String(_exhaustive)}`);
    }
  }
}

function App() {
  const [baseUrl, setBaseUrl] = useState(
    () => localStorage.getItem("k8s-base-url") ?? "/api/kubernetes",
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("k8s-token") ?? "",
  );

  const handleBaseUrlChange = useCallback((value: string) => {
    setBaseUrl(value);
    localStorage.setItem("k8s-base-url", value);
  }, []);

  const handleTokenChange = useCallback((value: string) => {
    setToken(value);
    localStorage.setItem("k8s-token", value);
  }, []);

  const [refreshInterval, setRefreshInterval] = useState(() => {
    const stored = localStorage.getItem("k8s-refresh-interval");
    return stored !== null ? Number(stored) : 5;
  });

  const handleRefreshIntervalChange = useCallback((value: number) => {
    setRefreshInterval(value);
    localStorage.setItem("k8s-refresh-interval", String(value));
  }, []);
  const [namespace, setNamespace] = useState(
    () => localStorage.getItem("k8s-namespace") ?? "default",
  );

  const handleNamespaceChange = useCallback((value: string) => {
    setNamespace(value);
    localStorage.setItem("k8s-namespace", value);
  }, []);
  const [selectedResource, setSelectedResource] =
    useState<ResourceType>("deployments");

  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [data, setData] = useState<ResourceTableProps["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(
    null,
  );
  const [scaleDialogOpen, setScaleDialogOpen] = useState(false);
  const [scalingDeployment, setScalingDeployment] =
    useState<V1Deployment | null>(null);

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
          const fallback = names.includes("default") ? "default" : names[0];
          setNamespace(fallback);
          localStorage.setItem("k8s-namespace", fallback);
        }
      },
      () => {
        if (!cancelled) setNamespaces([]);
      },
    );
    return () => {
      cancelled = true;
    };
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

  // Auto-refresh on a configurable interval (0 = disabled).
  useEffect(() => {
    if (refreshInterval <= 0 || !kube) return;
    const id = setInterval(() => loadResources(), refreshInterval * 1000);
    return () => clearInterval(id);
  }, [refreshInterval, kube, loadResources]);

  const handleDeletePod = useCallback(
    (pod: V1Pod) => {
      const name = pod.metadata?.name;
      const ns = pod.metadata?.namespace;
      if (!kube || !name || !ns) return;
      kube.core.v1.pods.delete({ namespace: ns, name }).then(
        () => loadResources(),
        (err) => setError(err instanceof Error ? err.message : String(err)),
      );
    },
    [kube, loadResources],
  );

  const handleScaleDeployment = useCallback((deployment: V1Deployment) => {
    setScalingDeployment(deployment);
    setScaleDialogOpen(true);
  }, []);

  const handleScaleConfirm = useCallback(
    (replicas: number) => {
      const name = scalingDeployment?.metadata?.name;
      const ns = scalingDeployment?.metadata?.namespace;
      if (!kube || !name || !ns) return;
      kube.apps.v1.deployments.scale
        .patch({
          namespace: ns,
          name,
          type: "merge",
          body: { spec: { replicas } },
        })
        .then(
          () => loadResources(),
          (err) => setError(err instanceof Error ? err.message : String(err)),
        );
    },
    [kube, scalingDeployment, loadResources],
  );

  return (
    <Flex direction="column" style={{ height: "100vh" }}>
      <ConnectionToolbar
        baseUrl={baseUrl}
        token={token}
        namespace={namespace}
        namespaces={namespaces}
        refreshInterval={refreshInterval}
        onBaseUrlChange={handleBaseUrlChange}
        onTokenChange={handleTokenChange}
        onNamespaceChange={handleNamespaceChange}
        onRefreshIntervalChange={handleRefreshIntervalChange}
        onRefresh={loadResources}
      />
      <Separator size="4" />
      <Flex flexGrow="1" style={{ overflow: "hidden" }}>
        <Box style={{ width: 288, flexShrink: 0, overflowY: "auto" }} p="4">
          <ResourceList
            selected={selectedResource}
            onSelect={setSelectedResource}
          />
        </Box>
        <Separator orientation="vertical" size="4" />
        <Box flexGrow="1" style={{ overflow: "auto" }} p="4">
          {error && (
            <Callout.Root color="red" mb="4">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}
          <ResourceTable
            resourceType={selectedResource}
            data={data as any}
            loading={loading}
            onRowClick={(row) => {
              setSelectedItem(row);
              setDrawerOpen(true);
            }}
            onDeletePod={handleDeletePod}
            onScaleDeployment={handleScaleDeployment}
          />
        </Box>
      </Flex>
      <ResourceDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        resourceType={selectedResource}
        resource={selectedItem}
      />
      <ScaleDialog
        open={scaleDialogOpen}
        onOpenChange={setScaleDialogOpen}
        deployment={scalingDeployment}
        onConfirm={handleScaleConfirm}
      />
    </Flex>
  );
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing root element.");
}

createRoot(rootElement).render(
  <StrictMode>
    <Theme accentColor="gray" radius="medium" appearance="dark">
      <App />
    </Theme>
  </StrictMode>,
);
