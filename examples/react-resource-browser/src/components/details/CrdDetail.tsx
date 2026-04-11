import { Badge, Code, DataList, Heading, Separator, Table } from "@radix-ui/themes";
import type { V1CustomResourceDefinition } from "@kubernetes-typescript/kubernetes";
import { MetadataSection } from "./MetadataSection";

export function CrdDetail({ resource }: { resource: V1CustomResourceDefinition }) {
  const spec = resource.spec;
  const status = resource.status;
  const names = spec?.names;
  const versions = spec?.versions ?? [];
  const conditions = status?.conditions ?? [];

  return (
    <>
      <MetadataSection metadata={resource.metadata} />

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Spec
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Group</DataList.Label>
          <DataList.Value>
            <Code size="1">{spec?.group}</Code>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Scope</DataList.Label>
          <DataList.Value>
            <Badge variant="outline">{spec?.scope}</Badge>
          </DataList.Value>
        </DataList.Item>
        {names && (
          <>
            <DataList.Item>
              <DataList.Label>Kind</DataList.Label>
              <DataList.Value>{names.kind}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Plural</DataList.Label>
              <DataList.Value>{names.plural}</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Singular</DataList.Label>
              <DataList.Value>{names.singular ?? "\u2014"}</DataList.Value>
            </DataList.Item>
            {names.shortNames && names.shortNames.length > 0 && (
              <DataList.Item>
                <DataList.Label>Short Names</DataList.Label>
                <DataList.Value>{names.shortNames.join(", ")}</DataList.Value>
              </DataList.Item>
            )}
          </>
        )}
      </DataList.Root>

      {versions.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Versions
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Served</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Storage</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {versions.map((v) => (
                <Table.Row key={v.name}>
                  <Table.Cell>
                    <Code size="1">{v.name}</Code>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={v.served ? "green" : "gray"}>
                      {v.served ? "Yes" : "No"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={v.storage ? "blue" : "gray"}>
                      {v.storage ? "Yes" : "No"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}

      {conditions.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Conditions
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Reason</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Message</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {conditions.map((c) => (
                <Table.Row key={c.type}>
                  <Table.Cell>{c.type}</Table.Cell>
                  <Table.Cell>
                    <Badge color={c.status === "True" ? "green" : "gray"}>
                      {c.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{c.reason ?? "\u2014"}</Table.Cell>
                  <Table.Cell
                    style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}
                    title={c.message ?? undefined}
                  >
                    {c.message ?? "\u2014"}
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
