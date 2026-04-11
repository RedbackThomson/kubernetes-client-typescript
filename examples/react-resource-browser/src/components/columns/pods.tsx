import { createColumnHelper } from "@tanstack/react-table";
import type { V1Pod } from "@kubernetes-typescript/kubernetes";
import { Badge } from "@/components/ui/badge";
import { formatAge } from "@/lib/age";

const col = createColumnHelper<V1Pod>();

export const podColumns = [
  col.accessor((row) => row.metadata?.name ?? "", {
    id: "name",
    header: "Name",
  }),
  col.accessor((row) => row.metadata?.namespace ?? "", {
    id: "namespace",
    header: "Namespace",
  }),
  col.display({
    id: "phase",
    header: "Phase",
    cell: ({ row }) => {
      const phase = row.original.status?.phase ?? "Unknown";
      const variant =
        phase === "Running"
          ? "default"
          : phase === "Failed"
            ? "destructive"
            : "secondary";
      return <Badge variant={variant}>{phase}</Badge>;
    },
  }),
  col.display({
    id: "ready",
    header: "Ready",
    cell: ({ row }) => {
      const statuses = row.original.status?.containerStatuses ?? [];
      const ready = statuses.filter((c) => c.ready).length;
      const total = statuses.length;
      return `${ready}/${total}`;
    },
  }),
  col.display({
    id: "restarts",
    header: "Restarts",
    cell: ({ row }) => {
      const statuses = row.original.status?.containerStatuses ?? [];
      return statuses.reduce((sum, c) => sum + c.restartCount, 0);
    },
  }),
  col.accessor((row) => row.spec?.nodeName ?? "", {
    id: "node",
    header: "Node",
  }),
  col.accessor((row) => formatAge(row.metadata?.creationTimestamp as string | undefined), {
    id: "age",
    header: "Age",
  }),
];
