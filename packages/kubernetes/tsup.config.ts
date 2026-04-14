import { defineConfig } from 'tsup';

const versions = ['v1.35', 'v1.34', 'v1.33'];
const subpaths = [
  '.',
  './models',
  './resources',
  ...versions.flatMap((v) => [`./${v}`, `./${v}/models`, `./${v}/resources`]),
];

const entry: Record<string, string> = {};
for (const subpath of subpaths) {
  const rel = subpath === '.' ? 'index' : `${subpath.slice(2)}/index`;
  entry[rel] = `src/${rel}.ts`;
}

export default defineConfig({
  entry,
  format: ['esm', 'cjs'],
  // Use tsc for declarations since the package has non-entry source files
  // (options.ts) that tsup's DTS plugin can't automatically discover.
  dts: false,
  sourcemap: true,
  clean: true,
  external: ['@kubernetes-typescript/runtime'],
});
