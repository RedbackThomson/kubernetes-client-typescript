import { createColumnHelper } from "@tanstack/react-table";
import type { V1Secret } from "@kubernetes-typescript/kubernetes";
import { Badge } from "@/components/ui/badge";
import { formatAge } from "@/lib/age";

const col = createColumnHelper<V1Secret>();

export const secretColumns = [
  col.accessor((row) => row.metadata?.name ?? "", {
    id: "name",
    header: "Name",
  }),
  col.accessor((row) => row.metadata?.namespace ?? "", {
    id: "namespace",
    header: "Namespace",
  }),
  col.display({
    id: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.type ?? "Opaque"}</Badge>
    ),
  }),
  col.display({
    id: "keys",
    header: "Keys",
    cell: ({ row }) => Object.keys(row.original.data ?? {}).length,
  }),
  col.accessor((row) => (row.immutable ? "Yes" : "No"), {
    id: "immutable",
    header: "Immutable",
  }),
  col.accessor((row) => formatAge(row.metadata?.creationTimestamp as string | undefined), {
    id: "age",
    header: "Age",
  }),
];
