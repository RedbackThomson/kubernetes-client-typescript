import { Badge, Code, DataList, Heading, Separator, Table } from "@radix-ui/themes";
import type { V1Secret } from "@kubernetes-typescript/kubernetes";
import { MetadataSection } from "./MetadataSection";

export function SecretDetail({ resource }: { resource: V1Secret }) {
  const dataKeys = Object.keys(resource.data ?? {});
  const stringDataKeys = Object.keys(resource.stringData ?? {});

  return (
    <>
      <MetadataSection metadata={resource.metadata} />

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Overview
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Type</DataList.Label>
          <DataList.Value>
            <Badge variant="outline">{resource.type ?? "Opaque"}</Badge>
          </DataList.Value>
        </DataList.Item>
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
          <DataList.Value>{dataKeys.length}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      {dataKeys.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Data Keys
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Size</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {dataKeys.map((key) => {
                const val = resource.data?.[key] ?? "";
                return (
                  <Table.Row key={key}>
                    <Table.Cell>
                      <Code size="1">{key}</Code>
                    </Table.Cell>
                    <Table.Cell>{val.length} bytes (base64)</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </>
      )}

      {stringDataKeys.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            String Data Keys
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Key</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stringDataKeys.map((key) => (
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
