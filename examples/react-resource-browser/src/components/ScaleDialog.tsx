import { useState, useEffect } from "react";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import type { V1Deployment } from "@kubernetes-typescript/kubernetes";

interface ScaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deployment: V1Deployment | null;
  onConfirm: (replicas: number) => void;
}

export function ScaleDialog({
  open,
  onOpenChange,
  deployment,
  onConfirm,
}: ScaleDialogProps) {
  const currentReplicas = deployment?.spec?.replicas ?? 1;
  const [replicas, setReplicas] = useState(String(currentReplicas));

  useEffect(() => {
    if (open) {
      setReplicas(String(deployment?.spec?.replicas ?? 1));
    }
  }, [open, deployment]);

  const parsed = parseInt(replicas, 10);
  const valid = !isNaN(parsed) && parsed >= 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="380px">
        <Dialog.Title>Scale Deployment</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Set the number of replicas for{" "}
          <Text weight="bold">{deployment?.metadata?.name ?? "deployment"}</Text>.
        </Dialog.Description>
        <Flex direction="column" gap="2">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Replicas
            </Text>
            <TextField.Root
              type="number"
              min="0"
              value={replicas}
              onChange={(e) => setReplicas(e.target.value)}
            />
          </label>
          <Text size="1" color="gray">
            Currently {currentReplicas} replica{currentReplicas !== 1 ? "s" : ""}
          </Text>
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button disabled={!valid} onClick={() => valid && onConfirm(parsed)}>
              Scale
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
