import { Flex, RadioCards, ScrollArea, Text } from "@radix-ui/themes";
import { RESOURCE_TYPES, type ResourceType } from "@/types/resources";

interface ResourceListProps {
  selected: ResourceType;
  onSelect: (type: ResourceType) => void;
}

export function ResourceList({ selected, onSelect }: ResourceListProps) {
  return (
    <ScrollArea style={{ height: "100%" }}>
      <RadioCards.Root
        value={selected}
        onValueChange={(value) => onSelect(value as ResourceType)}
        columns="1"
        gap="2"
      >
        {RESOURCE_TYPES.map((rt) => (
          <RadioCards.Item key={rt.id} value={rt.id}>
            <Flex direction="column" gap="1" align="center">
              <Text size="2" weight="bold">
                {rt.label}
              </Text>
              <Text size="1" color="gray">
                {rt.group}
              </Text>
            </Flex>
          </RadioCards.Item>
        ))}
      </RadioCards.Root>
    </ScrollArea>
  );
}
