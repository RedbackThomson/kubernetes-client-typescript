import { Badge, Code, DataList, Heading, Separator, Table } from "@radix-ui/themes";
import type { V1Pod } from "@kubernetes-typescript/kubernetes";
import { MetadataSection } from "./MetadataSection";

function containerStateLabel(state: Record<string, any> | undefined): string {
  if (!state) return "Unknown";
  if (state.running) return "Running";
  if (state.waiting) return state.waiting.reason ?? "Waiting";
  if (state.terminated) return state.terminated.reason ?? "Terminated";
  return "Unknown";
}

export function PodDetail({ resource }: { resource: V1Pod }) {
  const spec = resource.spec;
  const status = resource.status;
  const containers = spec?.containers ?? [];
  const containerStatuses = status?.containerStatuses ?? [];
  const conditions = status?.conditions ?? [];

  return (
    <>
      <MetadataSection metadata={resource.metadata} />

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Status
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Phase</DataList.Label>
          <DataList.Value>
            <Badge
              color={
                status?.phase === "Running"
                  ? "green"
                  : status?.phase === "Failed"
                    ? "red"
                    : "gray"
              }
            >
              {status?.phase ?? "Unknown"}
            </Badge>
          </DataList.Value>
        </DataList.Item>
        {status?.podIP && (
          <DataList.Item>
            <DataList.Label>Pod IP</DataList.Label>
            <DataList.Value>
              <Code size="1">{status.podIP}</Code>
            </DataList.Value>
          </DataList.Item>
        )}
        {status?.hostIP && (
          <DataList.Item>
            <DataList.Label>Host IP</DataList.Label>
            <DataList.Value>
              <Code size="1">{status.hostIP}</Code>
            </DataList.Value>
          </DataList.Item>
        )}
        {spec?.nodeName && (
          <DataList.Item>
            <DataList.Label>Node</DataList.Label>
            <DataList.Value>{spec.nodeName}</DataList.Value>
          </DataList.Item>
        )}
        {spec?.serviceAccountName && (
          <DataList.Item>
            <DataList.Label>Service Account</DataList.Label>
            <DataList.Value>{spec.serviceAccountName}</DataList.Value>
          </DataList.Item>
        )}
        {status?.qosClass && (
          <DataList.Item>
            <DataList.Label>QoS Class</DataList.Label>
            <DataList.Value>
              <Badge variant="outline">{status.qosClass}</Badge>
            </DataList.Value>
          </DataList.Item>
        )}
        {spec?.restartPolicy && (
          <DataList.Item>
            <DataList.Label>Restart Policy</DataList.Label>
            <DataList.Value>{spec.restartPolicy}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Containers ({containers.length})
      </Heading>
      <Table.Root size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Ready</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Restarts</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {containers.map((c) => {
            const cs = containerStatuses.find((s) => s.name === c.name);
            return (
              <Table.Row key={c.name}>
                <Table.Cell>{c.name}</Table.Cell>
                <Table.Cell>
                  <Code size="1">{c.image}</Code>
                </Table.Cell>
                <Table.Cell>
                  <Badge
                    color={
                      cs?.state && "running" in cs.state
                        ? "green"
                        : cs?.state && "waiting" in cs.state
                          ? "yellow"
                          : "gray"
                    }
                  >
                    {containerStateLabel(cs?.state as Record<string, any> | undefined)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Badge color={cs?.ready ? "green" : "gray"}>
                    {cs?.ready ? "Yes" : "No"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>{cs?.restartCount ?? 0}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

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
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}
    </>
  );
}
