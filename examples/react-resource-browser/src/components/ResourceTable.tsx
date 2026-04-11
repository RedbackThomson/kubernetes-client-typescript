import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Table, Text } from "@radix-ui/themes";
import type {
  V1ConfigMap,
  V1CustomResourceDefinition,
  V1Deployment,
  V1Pod,
  V1Secret,
  V1Service,
} from "@kubernetes-typescript/kubernetes";
import { deploymentColumns } from "@/components/columns/deployments";
import { podColumns } from "@/components/columns/pods";
import { serviceColumns } from "@/components/columns/services";
import { configMapColumns } from "@/components/columns/configmaps";
import { secretColumns } from "@/components/columns/secrets";
import { crdColumns } from "@/components/columns/crds";

export type ResourceTableProps =
  | { resourceType: "deployments"; data: V1Deployment[] }
  | { resourceType: "pods"; data: V1Pod[] }
  | { resourceType: "services"; data: V1Service[] }
  | { resourceType: "configmaps"; data: V1ConfigMap[] }
  | { resourceType: "secrets"; data: V1Secret[] }
  | { resourceType: "crds"; data: V1CustomResourceDefinition[] };

function getColumns(resourceType: ResourceTableProps["resourceType"]): ColumnDef<any, any>[] {
  switch (resourceType) {
    case "deployments":
      return deploymentColumns as ColumnDef<any, any>[];
    case "pods":
      return podColumns as ColumnDef<any, any>[];
    case "services":
      return serviceColumns as ColumnDef<any, any>[];
    case "configmaps":
      return configMapColumns as ColumnDef<any, any>[];
    case "secrets":
      return secretColumns as ColumnDef<any, any>[];
    case "crds":
      return crdColumns as ColumnDef<any, any>[];
  }
}

export function ResourceTable(props: ResourceTableProps & { loading?: boolean }) {
  const columns = getColumns(props.resourceType);

  const table = useReactTable({
    data: props.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table.Root size="2">
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.ColumnHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={columns.length} style={{ textAlign: "center", height: 96 }}>
              <Text color="gray">
                {props.loading ? "Loading\u2026" : "No resources found"}
              </Text>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
