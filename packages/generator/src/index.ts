export interface CodegenConfig {
  clientName?: string;
  apiStyle?: "kubernetes";
  resources?: {
    include?: string[];
  };
  verbs?: {
    default?: Array<"get" | "list" | "create" | "update" | "patch" | "delete">;
  };
  runtimePackage?: string;
}

export function defineCodegenConfig(config: CodegenConfig): CodegenConfig {
  return config;
}

