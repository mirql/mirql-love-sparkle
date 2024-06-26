// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@mirql/love-sparkle",
    version: Deno.args[0],
    description: "love-sparkle",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/mirql/mirql-love-sparkle.git",
    },
    bugs: {
      url: "https://github.com/mirql/love-sparkle/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
