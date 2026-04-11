import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { buildCodegenIr, toGeneratedResource } from "./ir.js";
import { renderFiles, renderModel } from "./templates.js";
import type { CodegenConfig, GeneratedClient, GeneratedFile, GenerateOptions, OpenApiDocument } from "./types.js";

export type {
  CodegenConfig,
  GeneratedClient,
  GeneratedFile,
  GeneratedModel,
  GeneratedResource,
  GeneratedSubresource,
  GenerateOptions,
} from "./types.js";

export function defineCodegenConfig(config: CodegenConfig): CodegenConfig {
  return config;
}

export async function generate(options: GenerateOptions): Promise<GeneratedClient> {
  const input = await readFile(options.input, "utf8");
  const document = JSON.parse(input) as OpenApiDocument;
  const generated = generateClient(document, options.config);

  await writeGeneratedFiles(options.output, generated.files);

  return generated;
}

export function generateClient(document: OpenApiDocument, config: CodegenConfig = {}): GeneratedClient {
  const ir = buildCodegenIr(document, config);
  const generated = {
    models: ir.models.map((model) => ({
      key: model.key,
      name: model.name,
      content: renderModel(model),
    })),
    resources: ir.resources.map(toGeneratedResource),
  };

  return {
    ...generated,
    files: renderFiles(ir),
  };
}

async function writeGeneratedFiles(output: string, files: GeneratedFile[]): Promise<void> {
  for (const file of files) {
    const fullPath = join(output, file.path);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, file.content, "utf8");
  }
}
