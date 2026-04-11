import { Dialog, Heading, ScrollArea, IconButton, Flex } from "@radix-ui/themes";
import type {
  V1ConfigMap,
  V1CustomResourceDefinition,
  V1Deployment,
  V1Pod,
  V1Secret,
  V1Service,
} from "@kubernetes-typescript/kubernetes";
import type { ResourceType } from "@/types/resources";
import { DeploymentDetail } from "@/components/details/DeploymentDetail";
import { PodDetail } from "@/components/details/PodDetail";
import { ServiceDetail } from "@/components/details/ServiceDetail";
import { ConfigMapDetail } from "@/components/details/ConfigMapDetail";
import { SecretDetail } from "@/components/details/SecretDetail";
import { CrdDetail } from "@/components/details/CrdDetail";

interface ResourceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceType: ResourceType;
  resource: Record<string, any> | null;
}

function resourceName(resource: Record<string, any> | null): string {
  return resource?.metadata?.name ?? "Resource Details";
}

function DetailContent({
  resourceType,
  resource,
}: {
  resourceType: ResourceType;
  resource: Record<string, any>;
}) {
  switch (resourceType) {
    case "deployments":
      return <DeploymentDetail resource={resource as V1Deployment} />;
    case "pods":
      return <PodDetail resource={resource as V1Pod} />;
    case "services":
      return <ServiceDetail resource={resource as V1Service} />;
    case "configmaps":
      return <ConfigMapDetail resource={resource as V1ConfigMap} />;
    case "secrets":
      return <SecretDetail resource={resource as V1Secret} />;
    case "crds":
      return <CrdDetail resource={resource as V1CustomResourceDefinition} />;
  }
}

export function ResourceDrawer({
  open,
  onOpenChange,
  resourceType,
  resource,
}: ResourceDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="drawer-content">
        <Flex justify="between" align="center" mb="4">
          <Dialog.Title size="4" style={{ margin: 0 }}>
            {resourceName(resource)}
          </Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" size="1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </IconButton>
          </Dialog.Close>
        </Flex>
        <ScrollArea style={{ height: "calc(100vh - 120px)" }}>
          {resource && (
            <DetailContent resourceType={resourceType} resource={resource} />
          )}
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  );
}
