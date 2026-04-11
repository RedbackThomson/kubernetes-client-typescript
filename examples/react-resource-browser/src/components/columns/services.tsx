import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@radix-ui/themes";
import type { V1Service } from "@kubernetes-typescript/kubernetes";
import { formatAge } from "@/lib/age";

const col = createColumnHelper<V1Service>();

export const serviceColumns = [
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
      <Badge variant="outline">{row.original.spec?.type ?? "ClusterIP"}</Badge>
    ),
  }),
  col.accessor((row) => row.spec?.clusterIP ?? "", {
    id: "clusterIP",
    header: "Cluster IP",
  }),
  col.display({
    id: "externalIP",
    header: "External IP",
    cell: ({ row }) => {
      const ingress = row.original.status?.loadBalancer?.ingress;
      if (!ingress?.length) return "\u2014";
      return ingress.map((i) => i.ip ?? i.hostname ?? "").join(", ");
    },
  }),
  col.display({
    id: "ports",
    header: "Ports",
    cell: ({ row }) => {
      const ports = row.original.spec?.ports;
      if (!ports?.length) return "\u2014";
      return ports.map((p) => `${p.port}/${p.protocol ?? "TCP"}`).join(", ");
    },
  }),
  col.accessor((row) => formatAge(row.metadata?.creationTimestamp as string | undefined), {
    id: "age",
    header: "Age",
  }),
];
