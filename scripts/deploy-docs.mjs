import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const docsDir = path.join(root, "docs");

process.env.GITHUB_PAGES = "true";

console.log("Building static export...");
const build = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

if (!existsSync(outDir)) {
  console.error("Build failed: out/ folder not found");
  process.exit(1);
}

console.log("Copying out/ → docs/...");
rmSync(docsDir, { recursive: true, force: true });
mkdirSync(docsDir, { recursive: true });
cpSync(outDir, docsDir, { recursive: true });
writeFileSync(path.join(docsDir, ".nojekyll"), "");

console.log("Done. Preview with: npx serve docs");
console.log("GitHub Pages: main branch → /docs folder");
