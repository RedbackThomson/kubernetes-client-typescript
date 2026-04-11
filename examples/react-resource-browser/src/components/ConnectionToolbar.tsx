import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ConnectionToolbarProps {
  baseUrl: string;
  token: string;
  namespace: string;
  namespaces: string[];
  onBaseUrlChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  onNamespaceChange: (value: string) => void;
}

export function ConnectionToolbar({
  baseUrl,
  token,
  namespace,
  namespaces,
  onBaseUrlChange,
  onTokenChange,
  onNamespaceChange,
}: ConnectionToolbarProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b bg-background px-4 py-3 shrink-0">
      <h1 className="text-lg font-semibold whitespace-nowrap">
        Kubernetes Resource Browser
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="base-url" className="whitespace-nowrap">
            API Server URL
          </Label>
          <Input
            id="base-url"
            className="w-56"
            value={baseUrl}
            onChange={(e) => onBaseUrlChange(e.target.value)}
            placeholder="/api/kubernetes"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="token" className="whitespace-nowrap">
            Bearer Token
          </Label>
          <Input
            id="token"
            className="w-44"
            type="password"
            value={token}
            onChange={(e) => onTokenChange(e.target.value)}
            placeholder="Optional"
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="namespace" className="whitespace-nowrap">
            Namespace
          </Label>
          <select
            id="namespace"
            className="flex h-9 w-44 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={namespace}
            onChange={(e) => onNamespaceChange(e.target.value)}
          >
            {namespaces.length === 0 && (
              <option value={namespace}>{namespace}</option>
            )}
            {namespaces.map((ns) => (
              <option key={ns} value={ns}>
                {ns}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
