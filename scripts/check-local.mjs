import { strict as assert } from "node:assert";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, stdio: "inherit" });
  assert.equal(result.status, 0, `${command} ${args.join(" ")} failed`);
}

run(process.execPath, [join(root, "scripts", "test-cli.mjs")]);
run(process.execPath, [join(root, "scripts", "check-docs.mjs")]);
const entries = await readdir(join(root, "bin"));
for (const entry of entries.filter((file) => file.endsWith(".mjs"))) run(process.execPath, ["--check", join(root, "bin", entry)]);
run(process.execPath, ["--check", join(root, "extensions", "cherkani-stack-notifier", "extension.mjs")]);
run("git", ["diff", "--check"]);
console.log("local quality gate passed");
