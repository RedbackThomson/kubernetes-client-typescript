const args = process.argv.slice(2);

if (args[0] === "generate") {
  console.log("kts generate is scaffolded. OpenAPI generation will be implemented next.");
  process.exit(0);
}

console.log("Usage: kts generate --input <openapi.json> --output <dir> [--config <config.ts>]");

