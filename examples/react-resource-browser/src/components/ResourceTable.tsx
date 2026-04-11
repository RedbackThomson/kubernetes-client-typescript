import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
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
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b transition-colors hover:bg-muted/50"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 align-middle">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border-b">
              <td
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {props.loading ? "Loading\u2026" : "No resources found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
