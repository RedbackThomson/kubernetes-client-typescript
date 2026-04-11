import { Badge, Code, DataList, Heading, Separator, Table } from "@radix-ui/themes";
import type { V1Deployment } from "@kubernetes-typescript/kubernetes";
import { MetadataSection } from "./MetadataSection";

export function DeploymentDetail({ resource }: { resource: V1Deployment }) {
  const spec = resource.spec;
  const status = resource.status;
  const strategy = spec?.strategy;
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
          <DataList.Label>Replicas</DataList.Label>
          <DataList.Value>{spec?.replicas ?? 1}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Strategy</DataList.Label>
          <DataList.Value>
            <Badge variant="outline">{strategy?.type ?? "RollingUpdate"}</Badge>
          </DataList.Value>
        </DataList.Item>
        {spec?.minReadySeconds != null && (
          <DataList.Item>
            <DataList.Label>Min Ready Seconds</DataList.Label>
            <DataList.Value>{spec.minReadySeconds}</DataList.Value>
          </DataList.Item>
        )}
        {spec?.revisionHistoryLimit != null && (
          <DataList.Item>
            <DataList.Label>Revision History Limit</DataList.Label>
            <DataList.Value>{spec.revisionHistoryLimit}</DataList.Value>
          </DataList.Item>
        )}
        <DataList.Item>
          <DataList.Label>Selector</DataList.Label>
          <DataList.Value>
            <Code size="1">
              {Object.entries(spec?.selector?.matchLabels ?? {})
                .map(([k, v]) => `${k}=${v}`)
                .join(", ")}
            </Code>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Status
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Ready</DataList.Label>
          <DataList.Value>
            <Badge
              variant={
                (status?.readyReplicas ?? 0) === (spec?.replicas ?? 0) &&
                (spec?.replicas ?? 0) > 0
                  ? "solid"
                  : "soft"
              }
            >
              {status?.readyReplicas ?? 0}/{spec?.replicas ?? 0}
            </Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Updated</DataList.Label>
          <DataList.Value>{status?.updatedReplicas ?? 0}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Available</DataList.Label>
          <DataList.Value>{status?.availableReplicas ?? 0}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Unavailable</DataList.Label>
          <DataList.Value>{status?.unavailableReplicas ?? 0}</DataList.Value>
        </DataList.Item>
        {status?.observedGeneration != null && (
          <DataList.Item>
            <DataList.Label>Observed Generation</DataList.Label>
            <DataList.Value>{status.observedGeneration}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>

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
