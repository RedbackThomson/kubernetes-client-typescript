import { createColumnHelper } from "@tanstack/react-table";
import type { V1CustomResourceDefinition } from "@kubernetes-typescript/kubernetes";
import { Badge } from "@/components/ui/badge";
import { formatAge } from "@/lib/age";

const col = createColumnHelper<V1CustomResourceDefinition>();

export const crdColumns = [
  col.accessor((row) => row.metadata?.name ?? "", {
    id: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <span className="font-mono text-xs">{getValue()}</span>
    ),
  }),
  col.accessor((row) => row.spec?.group ?? "", {
    id: "group",
    header: "Group",
  }),
  col.display({
    id: "versions",
    header: "Versions",
    cell: ({ row }) => {
      const versions = row.original.spec?.versions ?? [];
      return versions
        .filter((v) => v.served)
        .map((v) => v.name)
        .join(", ");
    },
  }),
  col.display({
    id: "scope",
    header: "Scope",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.spec?.scope ?? ""}</Badge>
    ),
  }),
  col.display({
    id: "established",
    header: "Established",
    cell: ({ row }) => {
      const conditions = row.original.status?.conditions ?? [];
      const established = conditions.find(
        (c) => c.type === "Established",
      );
      const isTrue = established?.status === "True";
      return (
        <Badge variant={isTrue ? "default" : "secondary"}>
          {isTrue ? "True" : "False"}
        </Badge>
      );
    },
  }),
  col.accessor((row) => formatAge(row.metadata?.creationTimestamp as string | undefined), {
    id: "age",
    header: "Age",
  }),
];
