import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { RESOURCE_TYPES, type ResourceType } from "@/types/resources";

interface ResourceListProps {
  selected: ResourceType;
  onSelect: (type: ResourceType) => void;
}

export function ResourceList({ selected, onSelect }: ResourceListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2">
        {RESOURCE_TYPES.map((rt) => (
          <Card
            key={rt.id}
            className={cn(
              "cursor-pointer transition-shadow",
              selected === rt.id && "ring-2 ring-primary",
            )}
            onClick={() => onSelect(rt.id)}
          >
            <CardHeader className="p-4">
              <CardTitle className="text-sm">{rt.label}</CardTitle>
              <CardDescription className="text-xs">
                {rt.group}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
