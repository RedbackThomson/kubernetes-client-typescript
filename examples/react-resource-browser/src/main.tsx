import { StrictMode, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { createKubernetesClient } from "@kubernetes-typescript/kubernetes";
import "./styles.css";

function App() {
  const [baseUrl, setBaseUrl] = useState("");
  const [token, setToken] = useState("");
  const [namespace, setNamespace] = useState("default");
  const [result, setResult] = useState("Connect to a cluster and list pods.");

  const kube = useMemo(() => {
    if (!baseUrl || !token) {
      return undefined;
    }

    return createKubernetesClient({
      baseUrl,
      auth: {
        type: "bearer",
        token,
      },
    });
  }, [baseUrl, token]);

  async function listPods() {
    if (!kube) {
      setResult("Enter an API server URL and bearer token first.");
      return;
    }

    try {
      const pods = await kube.core.v1.pods.list({ namespace });
      setResult(JSON.stringify(pods, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : String(error));
    }
  }

  async function listNamespaces() {
    if (!kube) {
      setResult("Enter an API server URL and bearer token first.");
      return;
    }

    try {
      const namespaces = await kube.core.v1.namespaces.list({});
      setResult(JSON.stringify(namespaces, null, 2));
    } catch (error) {
      setResult(error instanceof Error ? error.message : String(error));
    }
  }

  return (
    <main>
      <section className="panel">
        <h1>Kubernetes Resource Browser</h1>
        <label>
          API server URL
          <input value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} placeholder="https://cluster.example.com" />
        </label>
        <label>
          Bearer token
          <input value={token} onChange={(event) => setToken(event.target.value)} placeholder="Paste a scoped token" type="password" />
        </label>
        <label>
          Namespace
          <input value={namespace} onChange={(event) => setNamespace(event.target.value)} />
        </label>
        <div className="actions">
          <button type="button" onClick={listNamespaces}>List Namespaces</button>
          <button type="button" onClick={listPods}>List Pods</button>
        </div>
      </section>
      <pre>{result}</pre>
    </main>
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

