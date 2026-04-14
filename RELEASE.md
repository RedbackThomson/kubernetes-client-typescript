# Releasing

All packages are published together under the same version.

## Steps

1. **Update the version** in each package.json:

   - `packages/runtime/package.json`
   - `packages/generator/package.json`
   - `packages/zod/package.json`

   Or use this command to update all at once:

   ```sh
   pnpm -r exec npm version <version> --no-git-tag-version
   ```

2. **Commit the version bump:**

   ```sh
   git add -A && git commit -m "release: v<version>"
   ```

3. **Tag and push:**

   ```sh
   git tag v<version>
   git push origin main v<version>
   ```

   The `publish.yml` GitHub Actions workflow triggers on `v*` tags and publishes all packages to npm via Trusted Publishing.

## Versioning

This project follows [semver](https://semver.org/). Pre-release versions use the format `X.Y.Z-alpha.N` (e.g., `0.1.0-alpha.0`).
