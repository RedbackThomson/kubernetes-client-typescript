import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  TextField,
  Select,
  Dialog,
  Button,
  IconButton,
  Separator,
  Switch,
  Tooltip,
} from "@radix-ui/themes";

interface ConnectionToolbarProps {
  baseUrl: string;
  token: string;
  namespace: string;
  namespaces: string[];
  refreshInterval: number;
  onBaseUrlChange: (value: string) => void;
  onTokenChange: (value: string) => void;
  onNamespaceChange: (value: string) => void;
  onRefreshIntervalChange: (value: number) => void;
  onRefresh: () => void;
}

const INTERVAL_OPTIONS = [
  { value: "0", label: "Disabled" },
  { value: "1", label: "1 second" },
  { value: "2", label: "2 seconds" },
  { value: "5", label: "5 seconds" },
  { value: "10", label: "10 seconds" },
  { value: "30", label: "30 seconds" },
  { value: "60", label: "60 seconds" },
];

export function ConnectionToolbar({
  baseUrl,
  token,
  namespace,
  namespaces,
  refreshInterval,
  onBaseUrlChange,
  onTokenChange,
  onNamespaceChange,
  onRefreshIntervalChange,
  onRefresh,
}: ConnectionToolbarProps) {
  const options = namespaces.length > 0 ? namespaces : [namespace];
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftBaseUrl, setDraftBaseUrl] = useState(baseUrl);
  const [draftToken, setDraftToken] = useState(token);
  const [draftRefreshInterval, setDraftRefreshInterval] = useState(String(refreshInterval));

  return (
    <Flex asChild align="center" justify="between" gap="4" px="4" py="3">
      <header>
        <Heading size="4" style={{ whiteSpace: "nowrap" }}>
          Kubernetes Resource Browser
        </Heading>
        <Flex align="center" gap="4">
          <Flex align="center" gap="2">
            <Text size="2" weight="medium" style={{ whiteSpace: "nowrap" }}>
              Namespace
            </Text>
            <Select.Root value={namespace} onValueChange={onNamespaceChange}>
              <Select.Trigger style={{ width: 176 }} />
              <Select.Content>
                {options.map((ns) => (
                  <Select.Item key={ns} value={ns}>
                    {ns}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
          <Tooltip content="Refresh">
            <IconButton variant="ghost" size="2" onClick={() => onRefresh()}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
          </Tooltip>
          <Dialog.Root
            open={settingsOpen}
            onOpenChange={(open) => {
              if (open) {
                setDraftBaseUrl(baseUrl);
                setDraftToken(token);
                setDraftRefreshInterval(String(refreshInterval));
              }
              setSettingsOpen(open);
            }}
          >
            <Dialog.Trigger>
              <IconButton variant="ghost" size="2" title="Settings">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99513 12.6379C9.37404 12.5278 9.73553 12.377 10.0745 12.1908L10.9858 12.7651C11.3216 12.9768 11.7593 12.9278 12.0401 12.6471L12.6462 12.041C12.9269 11.7602 12.9759 11.3225 12.7642 10.9867L12.1899 10.0757C12.3764 9.73672 12.5765 9.37516 12.6867 8.99619L13.688 8.75794C14.0752 8.67015 14.3501 8.32601 14.3501 7.92897V7.07183C14.3501 6.6748 14.0752 6.33065 13.688 6.24287L12.6378 6.00481C12.5276 5.62584 12.3767 5.26431 12.1903 4.92531L12.7646 4.01413C12.9764 3.67826 12.9274 3.24056 12.6466 2.95982L12.0405 2.35373C11.7598 2.07298 11.3221 2.02399 10.9862 2.23571L10.0749 2.81004C9.73581 2.62351 9.37414 2.47262 8.99513 2.36245L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28362 3.06816C8.94252 3.18387 9.5521 3.44302 10.0789 3.81224L11.4397 2.97096L12.0287 3.55996L11.1878 4.92098C11.5573 5.44781 11.8167 6.0575 11.9327 6.71657L13.5001 7.07183V7.92897L11.932 8.28451C11.8161 8.94341 11.5569 9.55298 11.1877 10.0798L12.0287 11.4406L11.4397 12.0296L10.0787 11.1886C9.55192 11.5579 8.94235 11.8171 8.28362 11.9332L7.92809 13.5002H7.07095L6.71543 11.9326C6.0569 11.8168 5.44772 11.558 4.92116 11.189L3.55993 12.0296L2.97093 11.4406L3.81236 10.0794C3.44337 9.55266 3.18436 8.94326 3.06853 8.28467L1.50002 7.92897V7.07183L3.06778 6.71631C3.18349 6.05765 3.44289 5.44824 3.81224 4.92165L2.97093 3.55996L3.55993 2.97096L4.92053 3.81251ZM7.49952 5.25024C6.2574 5.25024 5.25002 6.25762 5.25002 7.49974C5.25002 8.74186 6.2574 9.74924 7.49952 9.74924C8.74164 9.74924 9.74902 8.74186 9.74902 7.49974C9.74902 6.25762 8.74164 5.25024 7.49952 5.25024ZM6.05002 7.49974C6.05002 6.69896 6.69874 6.05024 7.49952 6.05024C8.3003 6.05024 8.94902 6.69896 8.94902 7.49974C8.94902 8.30052 8.3003 8.94924 7.49952 8.94924C6.69874 8.94924 6.05002 8.30052 6.05002 7.49974Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Settings</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Configure the Kubernetes API server connection and refresh
                behavior.
              </Dialog.Description>

              <Text size="2" weight="bold" mb="1">
                Connection
              </Text>
              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" color="gray">
                    API Server URL
                  </Text>
                  <TextField.Root
                    value={draftBaseUrl}
                    onChange={(e) => setDraftBaseUrl(e.target.value)}
                    placeholder="/api/kubernetes"
                  />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" color="gray">
                    Bearer Token
                  </Text>
                  <TextField.Root
                    type="password"
                    value={draftToken}
                    onChange={(e) => setDraftToken(e.target.value)}
                    placeholder="Optional"
                  />
                </label>
              </Flex>

              <Separator size="4" my="4" />

              <Text size="2" weight="bold" mb="1">
                Auto Refresh
              </Text>
              <Flex direction="column" gap="3" mt="2">
                <Flex align="center" justify="between">
                  <Text size="2" color="gray">
                    Enable auto refresh
                  </Text>
                  <Switch
                    checked={draftRefreshInterval !== "0"}
                    onCheckedChange={(checked) =>
                      setDraftRefreshInterval(checked ? "5" : "0")
                    }
                  />
                </Flex>
                {draftRefreshInterval !== "0" && (
                  <label>
                    <Text as="div" size="2" mb="1" color="gray">
                      Refresh interval
                    </Text>
                    <Select.Root
                      value={draftRefreshInterval}
                      onValueChange={setDraftRefreshInterval}
                    >
                      <Select.Trigger style={{ width: "100%" }} />
                      <Select.Content>
                        {INTERVAL_OPTIONS.filter((o) => o.value !== "0").map(
                          (opt) => (
                            <Select.Item key={opt.value} value={opt.value}>
                              {opt.label}
                            </Select.Item>
                          ),
                        )}
                      </Select.Content>
                    </Select.Root>
                  </label>
                )}
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button
                    onClick={() => {
                      onBaseUrlChange(draftBaseUrl);
                      onTokenChange(draftToken);
                      onRefreshIntervalChange(Number(draftRefreshInterval));
                    }}
                  >
                    Save
                  </Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
      </header>
    </Flex>
  );
}
