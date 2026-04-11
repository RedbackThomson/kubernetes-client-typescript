import { Badge, Code, DataList, Flex, Heading } from "@radix-ui/themes";
import type { V1ObjectMeta } from "@kubernetes-typescript/kubernetes";
import { formatAge } from "@/lib/age";

interface MetadataSectionProps {
  metadata: V1ObjectMeta | undefined;
}

export function MetadataSection({ metadata }: MetadataSectionProps) {
  if (!metadata) return null;

  const labels = Object.entries(metadata.labels ?? {});
  const annotations = Object.entries(metadata.annotations ?? {});

  return (
    <>
      <Heading size="2" mb="2">
        Metadata
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Name</DataList.Label>
          <DataList.Value>{metadata.name}</DataList.Value>
        </DataList.Item>
        {metadata.namespace && (
          <DataList.Item>
            <DataList.Label>Namespace</DataList.Label>
            <DataList.Value>{metadata.namespace}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>UID</DataList.Label>
          <DataList.Value>
            <Code size="1">{metadata.uid}</Code>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Age</DataList.Label>
          <DataList.Value>
            {formatAge(metadata.creationTimestamp as string | undefined)}
          </DataList.Value>
        </DataList.Item>
        {metadata.resourceVersion && (
          <DataList.Item>
            <DataList.Label>Resource Version</DataList.Label>
            <DataList.Value>{metadata.resourceVersion}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>

      {labels.length > 0 && (
        <>
          <Heading size="2" mt="4" mb="2">
            Labels
          </Heading>
          <Flex gap="1" wrap="wrap">
            {labels.map(([k, v]) => (
              <Badge key={k} variant="soft" size="1">
                {k}={v}
              </Badge>
            ))}
          </Flex>
        </>
      )}

      {annotations.length > 0 && (
        <>
          <Heading size="2" mt="4" mb="2">
            Annotations
          </Heading>
          <Flex gap="1" wrap="wrap" style={{ maxHeight: 160, overflow: "auto" }}>
            {annotations.map(([k, v]) => (
              <Badge key={k} variant="outline" size="1" title={`${k}=${v}`}>
                {k}
              </Badge>
            ))}
          </Flex>
        </>
      )}
    </>
  );
}
