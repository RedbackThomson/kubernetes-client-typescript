import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { Badge, IconButton, Table, Text, Tooltip } from "@radix-ui/themes";
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

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4H3.5C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

const ScaleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.2929L9.14645 3.85355C8.95118 3.65829 8.95118 3.34171 9.14645 3.14645C9.34171 2.95118 9.65829 2.95118 9.85355 3.14645L13.8536 7.14645C14.0488 7.34171 14.0488 7.65829 13.8536 7.85355L9.85355 11.8536C9.65829 12.0488 9.34171 12.0488 9.14645 11.8536C8.95118 11.6583 8.95118 11.3417 9.14645 11.1464L12.2929 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

type TableProps = ResourceTableProps & {
  loading?: boolean;
  onRowClick?: (row: any) => void;
  onDeletePod?: (pod: V1Pod) => void;
  onScaleDeployment?: (deployment: V1Deployment) => void;
};

export function ResourceTable(props: TableProps) {
  const columns = getColumns(props.resourceType);
  const hasActions =
    (props.resourceType === "pods" && props.onDeletePod) ||
    (props.resourceType === "deployments" && props.onScaleDeployment);

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
            {hasActions && <Table.ColumnHeaderCell />}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            const isTerminating = Boolean(row.original.metadata?.deletionTimestamp);

            return (
              <Table.Row
                key={row.id}
                data-clickable={props.onRowClick ? "" : undefined}
                data-terminating={isTerminating ? "" : undefined}
                onClick={() => props.onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </Table.Cell>
                ))}
                {hasActions && (
                  <Table.Cell style={{ width: 100, textAlign: "center" }}>
                    {isTerminating ? (
                      <Badge color="red" variant="soft" size="1">
                        Terminating
                      </Badge>
                    ) : (
                      <>
                        {props.resourceType === "pods" && props.onDeletePod && (
                          <Tooltip content="Delete pod">
                            <IconButton
                              variant="ghost"
                              color="red"
                              size="1"
                              onClick={(e) => {
                                e.stopPropagation();
                                props.onDeletePod!(row.original);
                              }}
                            >
                              <TrashIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        {props.resourceType === "deployments" && props.onScaleDeployment && (
                          <Tooltip content="Scale deployment">
                            <IconButton
                              variant="ghost"
                              size="1"
                              onClick={(e) => {
                                e.stopPropagation();
                                props.onScaleDeployment!(row.original);
                              }}
                            >
                              <ScaleIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
            );
          })
        ) : (
          <Table.Row>
            <Table.Cell
              colSpan={columns.length + (hasActions ? 1 : 0)}
              style={{ textAlign: "center", height: 96 }}
            >
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
