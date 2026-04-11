import { Badge, Code, DataList, Heading, Separator, Table, Text } from "@radix-ui/themes";
import type { V1ConfigMap } from "@kubernetes-typescript/kubernetes";
import { MetadataSection } from "./MetadataSection";

export function ConfigMapDetail({ resource }: { resource: V1ConfigMap }) {
  const dataEntries = Object.entries(resource.data ?? {});
  const binaryKeys = Object.keys(resource.binaryData ?? {});

  return (
    <>
      <MetadataSection metadata={resource.metadata} />

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Overview
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Immutable</DataList.Label>
          <DataList.Value>
            <Badge color={resource.immutable ? "yellow" : "gray"}>
              {resource.immutable ? "Yes" : "No"}
            </Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Data Keys</DataList.Label>
          <DataList.Value>{dataEntries.length}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Binary Data Keys</DataList.Label>
          <DataList.Value>{binaryKeys.length}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {dataEntries.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Data
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Value</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dataEntries.map(([key, value]) => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Code size="1">{key}</Code>
                  </Table.Cell>
                  <Table.Cell
                    style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    <Text size="1" style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                      {value.length > 500 ? value.slice(0, 500) + "\u2026" : value}
                    </Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}

      {binaryKeys.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Binary Data Keys
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {binaryKeys.map((key) => (
                <Table.Row key={key}>
                  <Table.Cell>
                    <Code size="1">{key}</Code>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}
    </>
  );
}
