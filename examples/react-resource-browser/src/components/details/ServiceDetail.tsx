import { Badge, Code, DataList, Flex, Heading, Separator, Table } from "@radix-ui/themes";
import type { V1Service } from "@kubernetes-typescript/kubernetes";
import { MetadataSection } from "./MetadataSection";

export function ServiceDetail({ resource }: { resource: V1Service }) {
  const spec = resource.spec;
  const status = resource.status;
  const ports = spec?.ports ?? [];
  const selector = Object.entries(spec?.selector ?? {});
  const ingress = status?.loadBalancer?.ingress ?? [];

  return (
    <>
      <MetadataSection metadata={resource.metadata} />

      <Separator size="4" my="4" />
      <Heading size="2" mb="2">
        Spec
      </Heading>
      <DataList.Root size="2">
        <DataList.Item>
          <DataList.Label>Type</DataList.Label>
          <DataList.Value>
            <Badge variant="outline">{spec?.type ?? "ClusterIP"}</Badge>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Cluster IP</DataList.Label>
          <DataList.Value>
            <Code size="1">{spec?.clusterIP ?? "\u2014"}</Code>
          </DataList.Value>
        </DataList.Item>
        {spec?.clusterIPs && spec.clusterIPs.length > 1 && (
          <DataList.Item>
            <DataList.Label>Cluster IPs</DataList.Label>
            <DataList.Value>{spec.clusterIPs.join(", ")}</DataList.Value>
          </DataList.Item>
        )}
        {spec?.externalIPs && spec.externalIPs.length > 0 && (
          <DataList.Item>
            <DataList.Label>External IPs</DataList.Label>
            <DataList.Value>{spec.externalIPs.join(", ")}</DataList.Value>
          </DataList.Item>
        )}
        {spec?.sessionAffinity && (
          <DataList.Item>
            <DataList.Label>Session Affinity</DataList.Label>
            <DataList.Value>{spec.sessionAffinity}</DataList.Value>
          </DataList.Item>
        )}
        {spec?.externalTrafficPolicy && (
          <DataList.Item>
            <DataList.Label>External Traffic Policy</DataList.Label>
            <DataList.Value>{spec.externalTrafficPolicy}</DataList.Value>
          </DataList.Item>
        )}
        {spec?.ipFamilyPolicy && (
          <DataList.Item>
            <DataList.Label>IP Family Policy</DataList.Label>
            <DataList.Value>{spec.ipFamilyPolicy}</DataList.Value>
          </DataList.Item>
        )}
      </DataList.Root>

      {selector.length > 0 && (
        <>
          <Heading size="2" mt="4" mb="2">
            Selector
          </Heading>
          <Flex gap="1" wrap="wrap">
            {selector.map(([k, v]) => (
              <Badge key={k} variant="soft" size="1">
                {k}={v}
              </Badge>
            ))}
          </Flex>
        </>
      )}

      {ports.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Ports
          </Heading>
          <Table.Root size="1">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Protocol</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Port</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Target Port</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Node Port</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ports.map((p, i) => (
                <Table.Row key={p.name ?? i}>
                  <Table.Cell>{p.name ?? "\u2014"}</Table.Cell>
                  <Table.Cell>{p.protocol ?? "TCP"}</Table.Cell>
                  <Table.Cell>{p.port}</Table.Cell>
                  <Table.Cell>{p.targetPort != null ? String(p.targetPort) : "\u2014"}</Table.Cell>
                  <Table.Cell>{p.nodePort ?? "\u2014"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}

      {ingress.length > 0 && (
        <>
          <Separator size="4" my="4" />
          <Heading size="2" mb="2">
            Load Balancer Ingress
          </Heading>
          <DataList.Root size="2">
            {ingress.map((ing, i) => (
              <DataList.Item key={i}>
                <DataList.Label>Endpoint {i + 1}</DataList.Label>
                <DataList.Value>
                  <Code size="1">{ing.ip ?? ing.hostname ?? "\u2014"}</Code>
                </DataList.Value>
              </DataList.Item>
            ))}
          </DataList.Root>
        </>
      )}
    </>
  );
}
