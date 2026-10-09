import { strict as assert } from "node:assert";
import { access, readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const required = [
  "references/documentation-integration.md",
  "docs/SOURCES.md",
];
for (const file of required) await access(join(root, file));

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(path);
  }
  return files;
}

const files = await markdownFiles(root);
const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim().replace(/^<|>$/g, "");
    if (!target || target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:")) continue;
    const localTarget = target.split("#", 1)[0];
    if (!localTarget) continue;
    await access(resolve(file, "..", localTarget));
  }
}

const sources = await readFile(join(root, "docs/SOURCES.md"), "utf8");
assert.match(sources, /Last reviewed:\s*\d{4}-\d{2}-\d{2}/);
for (const url of sources.matchAll(/https?:\/\/\S+/g)) assert(url[0].startsWith("https://"), `Use HTTPS for documentation source: ${url[0]}`);
console.log(`documentation checks passed (${files.length} Markdown files)`);
