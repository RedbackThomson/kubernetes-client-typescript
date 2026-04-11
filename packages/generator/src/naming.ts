export function countBy(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

export function groupProperty(apiVersion: string): string {
  if (apiVersion === "v1") {
    return "core";
  }
  const group = identifier(apiVersion.split("/")[0]?.split(".")[0] ?? "api");
  return group === "resource" ? "resourceApi" : group;
}

export function identifier(value: string): string {
  const candidate = value.replace(/[-.](\w)/g, (_, char: string) => char.toUpperCase()).replace(/[^A-Za-z0-9_$]/g, "");
  const withSafeStart = /^[A-Za-z_$]/.test(candidate) ? candidate : `_${candidate}`;
  return withSafeStart.charAt(0).toLowerCase() + withSafeStart.slice(1);
}

export function indent(value: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return value.replace(/\n/g, `\n${prefix}`);
}

export function isIncluded(plural: string, include: string[]): boolean {
  return include.includes("*") || include.includes(plural);
}

export function isPathParameter(segment: string | undefined): boolean {
  return !!segment && segment.startsWith("{") && segment.endsWith("}");
}

export function pascalCase(value: string): string {
  const identifierValue = identifier(value);
  return identifierValue.charAt(0).toUpperCase() + identifierValue.slice(1);
}

export function propertyName(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

export function versionProperty(apiVersion: string): string {
  return identifier(apiVersion.split("/").at(-1) ?? apiVersion);
}
