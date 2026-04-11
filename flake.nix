{
  description = "TypeScript-native Kubernetes client development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nix-tasks.url = "github:RedbackThomson/nix-tasks";
  };

  outputs = { self, nixpkgs, nix-tasks }:
    let
      supportedSystems = [
        "aarch64-darwin"
        "x86_64-darwin"
        "aarch64-linux"
        "x86_64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs supportedSystems;

      mkConfig = system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          lib = nix-tasks.lib.${system};
        in
        lib.evalConfig {
          packages = {
            nodejs = pkgs.nodejs_24;
            pnpm = pkgs.pnpm;
            typescript = pkgs.typescript;
            prettier = pkgs.prettier;
          };

          tasks = {
            install = lib.mkTask {
              description = "Install dependencies";
              deps = [ "pnpm" ];
              commands = [ "pnpm install --frozen-lockfile" ];
            };

            build = lib.mkTask {
              description = "Build all packages";
              deps = [ "pnpm" ];
              depends = [ "task:install" ];
              commands = [ "pnpm build" ];
            };

            check = lib.mkTask {
              description = "Type-check all packages";
              deps = [ "pnpm" ];
              depends = [ "task:install" ];
              commands = [ "pnpm check" ];
            };

            test = lib.mkTask {
              description = "Run tests";
              deps = [ "pnpm" ];
              depends = [ "task:build" ];
              commands = [ "pnpm test" ];
            };

            publish = lib.mkTask {
              description = "Publish all packages to npm";
              deps = [ "nodejs" ];
              depends = [ "task:build" "task:test" ];
              noCache = true;
              commands = [
                ''
                  TAG="''${PUBLISH_TAG:-}"
                  if [ -n "$TAG" ]; then
                    if echo "$TAG" | grep -q "alpha"; then
                      NPM_TAG="--tag alpha"
                    elif echo "$TAG" | grep -q "beta"; then
                      NPM_TAG="--tag beta"
                    elif echo "$TAG" | grep -q "rc"; then
                      NPM_TAG="--tag rc"
                    else
                      NPM_TAG=""
                    fi
                  else
                    NPM_TAG=""
                  fi

                  for pkg in packages/runtime packages/kubernetes packages/generator packages/zod; do
                    echo "Publishing $pkg..."
                    (cd "$pkg" && npm publish --access public --provenance $NPM_TAG)
                  done
                ''
              ];
            };
          };

          devShells = {
            default = {
              packages = [ "nodejs" "pnpm" "typescript" "prettier" ];
              shellHook = ''
                export COREPACK_ENABLE_DOWNLOAD_PROMPT=0
                echo "kubernetes-client-typescript dev shell"
                echo "node: $(node --version)"
                echo "pnpm: $(pnpm --version)"
                echo "npm: $(npm --version)"
              '';
            };
          };
        };
    in
    {
      packages = forAllSystems (system: {
        default = nix-tasks.packages.${system}.default;
      });

      apps = forAllSystems (system: {
        default = nix-tasks.apps.${system}.default;
      });

      nixTasksConfig = forAllSystems (system:
        (mkConfig system).nixTasksConfig
      );

      nixTasksShells = forAllSystems (system:
        (mkConfig system).nixTasksShells
      );

      devShells = forAllSystems (system:
        let
          config = mkConfig system;
        in
        {
          default = config.devShells.default.overrideAttrs (old: {
            buildInputs = (old.buildInputs or []) ++ [
              nix-tasks.packages.${system}.default
            ];
          });
        }
      );
    };
}
