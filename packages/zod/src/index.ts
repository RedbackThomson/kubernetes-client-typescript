import type { ResponseSchema } from "@kubernetes-typescript/runtime";
import type { z } from "zod";

export function zodSchema<TSchema extends z.ZodType>(
  schema: TSchema,
): ResponseSchema<z.infer<TSchema>> {
  return {
    parse: (value) => schema.parse(value),
  };
}

