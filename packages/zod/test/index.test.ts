import { describe, expect, expectTypeOf, it } from "vitest";
import { z } from "zod";
import type { ResponseSchema } from "@kubernetes-typescript/runtime";
import { zodSchema } from "../src/index.js";

describe("zodSchema", () => {
  it("adapts a Zod schema to the runtime response schema contract", () => {
    const schema = zodSchema(
      z.object({
        metadata: z.object({
          name: z.string(),
        }),
      }),
    );

    expectTypeOf(schema).toExtend<ResponseSchema<{ metadata: { name: string } }>>();
    expect(schema.parse({ metadata: { name: "demo" } })).toEqual({
      metadata: {
        name: "demo",
      },
    });
    expect(() => schema.parse({ metadata: { name: 1 } })).toThrow();
  });
});
