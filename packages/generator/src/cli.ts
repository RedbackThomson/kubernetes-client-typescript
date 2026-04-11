import { pathToFileURL } from "node:url";
import { generate } from "./index.js";
import type { CodegenConfig } from "./index.js";

const args = process.argv.slice(2);

if (args[0] !== "generate") {
  printUsage();
  process.exit(args.length === 0 ? 0 : 1);
}

try {
  const options = await parseGenerateArgs(args.slice(1));
  await generate(options);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  printUsage();
  process.exit(1);
}

async function parseGenerateArgs(args: string[]): Promise<{ input: string; output: string; config?: CodegenConfig }> {
  const values = new Map<string, string>();

  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    const value = args[index + 1];
    if (!key?.startsWith("--") || !value) {
      throw new Error(`Invalid argument near ${key ?? "<end>"}.`);
    }
    values.set(key, value);
  }

  const input = values.get("--input");
  const output = values.get("--output");
  if (!input || !output) {
    throw new Error("Both --input and --output are required.");
  }

  const configPath = values.get("--config");
  return {
    input,
    output,
    ...(configPath ? { config: await loadConfig(configPath) } : {}),
  };
}

async function loadConfig(configPath: string): Promise<CodegenConfig> {
  if (configPath.endsWith(".json")) {
    const { readFile } = await import("node:fs/promises");
    return JSON.parse(await readFile(configPath, "utf8")) as CodegenConfig;
  }

  const imported = (await import(pathToFileURL(configPath).href)) as { default?: CodegenConfig; config?: CodegenConfig };
  return imported.default ?? imported.config ?? {};
}

function printUsage(): void {
  console.log("Usage: kts generate --input <openapi.json> --output <dir> [--config <config.ts|config.js|config.json>]");
}
