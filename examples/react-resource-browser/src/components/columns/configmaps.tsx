import { createColumnHelper } from "@tanstack/react-table";
import type { V1ConfigMap } from "@kubernetes-typescript/kubernetes";
import { formatAge } from "@/lib/age";

const col = createColumnHelper<V1ConfigMap>();

export const configMapColumns = [
  col.accessor((row) => row.metadata?.name ?? "", {
    id: "name",
    header: "Name",
  }),
  col.accessor((row) => row.metadata?.namespace ?? "", {
    id: "namespace",
    header: "Namespace",
  }),
  col.display({
    id: "keys",
    header: "Keys",
    cell: ({ row }) => {
      const dataKeys = Object.keys(row.original.data ?? {}).length;
      const binaryKeys = Object.keys(row.original.binaryData ?? {}).length;
      return dataKeys + binaryKeys;
    },
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
