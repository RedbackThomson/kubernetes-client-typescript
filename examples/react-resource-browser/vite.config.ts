import { existsSync, readFileSync } from "node:fs";
import { Agent } from "node:https";
import { homedir } from "node:os";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { parse } from "yaml";
import { defineConfig } from "vite";
import type { ProxyOptions } from "vite";

export default defineConfig(() => {
  const kubeProxy = createKubeProxy();

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
        "@kubernetes-typescript/kubernetes": new URL(
          "../../packages/kubernetes/src/index.ts",
          import.meta.url,
        ).pathname,
        "@kubernetes-typescript/runtime": new URL(
          "../../packages/runtime/src/index.ts",
          import.meta.url,
        ).pathname,
      },
    },
    server: kubeProxy
      ? {
          proxy: {
            "/api/kubernetes": kubeProxy,
          },
        }
      : undefined,
  };
});

interface KubeConfig {
  clusters?: Array<{
    name: string;
    cluster: {
      server?: string;
      "certificate-authority-data"?: string;
    };
  }>;
  contexts?: Array<{
    name: string;
    context: {
      cluster?: string;
      user?: string;
    };
  }>;
  users?: Array<{
    name: string;
    user: {
      "client-certificate-data"?: string;
      "client-key-data"?: string;
      token?: string;
    };
  }>;
  "current-context"?: string;
}

function createKubeProxy(): ProxyOptions | undefined {
  const configPath = process.env.KUBECONFIG ?? resolve(homedir(), ".kube/config");

  if (!existsSync(configPath)) {
    return undefined;
  }

  const config = parse(readFileSync(configPath, "utf8")) as KubeConfig;
  const contextName = process.env.KUBERNETES_CONTEXT ?? config["current-context"];
  const context = config.contexts?.find((item) => item.name === contextName)?.context;
  const cluster = config.clusters?.find((item) => item.name === context?.cluster)?.cluster;
  const user = config.users?.find((item) => item.name === context?.user)?.user;

  if (!cluster?.server || !user) {
    return undefined;
  }

  return {
    target: cluster.server,
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/api\/kubernetes/, ""),
    agent: new Agent({
      ca: decodeBase64(cluster["certificate-authority-data"]),
      cert: decodeBase64(user["client-certificate-data"]),
      key: decodeBase64(user["client-key-data"]),
    }),
    headers: user.token
      ? {
          authorization: `Bearer ${user.token}`,
        }
      : undefined,
  };
}

function decodeBase64(value: string | undefined): string | undefined {
  return value ? Buffer.from(value, "base64").toString("utf8") : undefined;
}
