import { Flex, Heading, Text, TextField, Select } from "@radix-ui/themes";

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
  const options = namespaces.length > 0 ? namespaces : [namespace];

  return (
    <Flex
      asChild
      align="center"
      justify="between"
      gap="4"
      px="4"
      py="3"
    >
      <header>
        <Heading size="4" style={{ whiteSpace: "nowrap" }}>
          Kubernetes Resource Browser
        </Heading>
        <Flex align="center" gap="4">
          <Flex align="center" gap="2">
            <Text size="2" weight="medium" style={{ whiteSpace: "nowrap" }}>
              API Server URL
            </Text>
            <TextField.Root
              size="2"
              style={{ width: 224 }}
              value={baseUrl}
              onChange={(e) => onBaseUrlChange(e.target.value)}
              placeholder="/api/kubernetes"
            />
          </Flex>
          <Flex align="center" gap="2">
            <Text size="2" weight="medium" style={{ whiteSpace: "nowrap" }}>
              Bearer Token
            </Text>
            <TextField.Root
              size="2"
              style={{ width: 176 }}
              type="password"
              value={token}
              onChange={(e) => onTokenChange(e.target.value)}
              placeholder="Optional"
            />
          </Flex>
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
        </Flex>
      </header>
    </Flex>
  );
}
