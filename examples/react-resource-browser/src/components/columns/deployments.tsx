import { createColumnHelper } from "@tanstack/react-table";
import type { V1Deployment } from "@kubernetes-typescript/kubernetes";
import { Badge } from "@/components/ui/badge";
import { formatAge } from "@/lib/age";

const col = createColumnHelper<V1Deployment>();

export const deploymentColumns = [
  col.accessor((row) => row.metadata?.name ?? "", {
    id: "name",
    header: "Name",
  }),
  col.accessor((row) => row.metadata?.namespace ?? "", {
    id: "namespace",
    header: "Namespace",
  }),
  col.display({
    id: "ready",
    header: "Ready",
    cell: ({ row }) => {
      const ready = row.original.status?.readyReplicas ?? 0;
      const desired = row.original.spec?.replicas ?? 0;
      const variant = ready === desired && desired > 0 ? "default" : "secondary";
      return <Badge variant={variant}>{ready}/{desired}</Badge>;
    },
  }),
  col.accessor((row) => row.status?.updatedReplicas ?? 0, {
    id: "upToDate",
    header: "Up-to-date",
  }),
  col.accessor((row) => row.status?.availableReplicas ?? 0, {
    id: "available",
    header: "Available",
  }),
  col.accessor((row) => formatAge(row.metadata?.creationTimestamp as string | undefined), {
    id: "age",
    header: "Age",
  }),
];
