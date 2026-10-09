#!/usr/bin/env node

import { existsSync } from "node:fs";
import { chmod, cp, mkdir, readFile, rm, writeFile, symlink } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { spawnSync } from "node:child_process";
import { homedir, platform } from "node:os";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const SHARED_HOME = process.env.CHERKANI_SHARED_HOME || join(homedir(), ".codex_shared");
const DEFAULT_HOME = process.env.CODEX_HOME || join(homedir(), ".codex");
const START = "<!-- cherkani-stack:start -->";
const END = "<!-- cherkani-stack:end -->";

async function ensureDir(path) { await mkdir(path, { recursive: true }); }

async function writeManaged(file, content) {
  await ensureDir(dirname(file));
  const block = `${START}\n${content.trim()}\n${END}\n`;
  let current = existsSync(file) ? await readFile(file, "utf8") : "";
  const pattern = new RegExp(`${START}[\\s\\S]*?${END}\\n?`, "m");
  const next = pattern.test(current) ? current.replace(pattern, block) : `${current.trimEnd()}${current.trim() ? "\n\n" : ""}${block}`;
  await writeFile(file, next, "utf8");
}

async function copyDir(source, target) {
  await ensureDir(dirname(target));
  await cp(source, target, { recursive: true, force: true });
}

async function removeStaleReferences(target) {
  for (const file of ["cstack-knowledge.md", "gstack-knowledge.md"]) {
    await rm(join(target, file), { force: true });
  }
}

async function linkOrCreate(target, source) {
  if (existsSync(target)) return;
  await ensureDir(dirname(target));
  try { await symlink(source, target, platform() === "win32" ? "junction" : "dir"); }
  catch { await ensureDir(target); }
}

async function createLauncher(file, command, profileHome) {
  await ensureDir(dirname(file));
  if (platform() === "win32") {
    const target = `${file}.cmd`;
    await writeFile(target, `@echo off\nset "CODEX_HOME=${profileHome}"\n${command} %*\n`, "utf8");
    return target;
  }
  await writeFile(file, `#!/usr/bin/env sh\nexport CODEX_HOME='${profileHome.replaceAll("'", "'\\''")}'\nexec ${command} "$@"\n`, "utf8");
  await chmod(file, 0o755);
  return file;
}

function loginProfiles(profiles) {
  const command = platform() === "win32" ? "codex.cmd" : "codex";
  for (const profile of profiles) {
    console.log(`\n=== Sign in to ${profile.name} ===`);
    console.log("Follow the official Codex device-login instructions shown below. Cherkani does not read or store your code or credentials.");
    const result = spawnSync(command, ["login", "--device-auth"], {
      env: { ...process.env, CODEX_HOME: profile.home },
      stdio: "inherit",
    });
    if (result.error) throw new Error(`Could not start Codex login for ${profile.name}: ${result.error.message}`);
    if (result.status !== 0) throw new Error(`${profile.name} login did not complete. Re-run \`cherkani-stack setup --login\` or \`codex${profile.name.slice(5)} login\` when ready.`);
    console.log(`${profile.name} login completed.`);
  }
}

async function configureProfile(name, profileHome, sharedSessions) {
  await ensureDir(profileHome);
  const installedSkill = join(profileHome, "skills", "cherkani-stack");
  await copyDir(join(ROOT, "skills", "cherkani-stack"), installedSkill);
  await copyDir(join(ROOT, "references"), join(installedSkill, "references"));
  await removeStaleReferences(join(installedSkill, "references"));
  await writeManaged(join(profileHome, "AGENTS.md"), await readFile(join(ROOT, "AGENTS.md"), "utf8"));
  await linkOrCreate(join(profileHome, "shared-sessions"), sharedSessions);
  return { name, home: profileHome };
}

async function setup({ count: requestedCount, add: requestedAdd, nonInteractive = false, login = false } = {}) {
  const rl = nonInteractive ? null : createInterface({ input, output });
  let count = Number(requestedCount || 0);
  const add = Number(requestedAdd || 0);
  const sharedRoot = join(SHARED_HOME, "cherkani-stack");
  const installFile = join(sharedRoot, "install.json");
  let previousProfiles = [];
  if (existsSync(installFile)) {
    try { previousProfiles = JSON.parse(await readFile(installFile, "utf8")).profiles || []; }
    catch { previousProfiles = []; }
  }
  if (!previousProfiles.length && existsSync(DEFAULT_HOME)) previousProfiles = [{ name: "codex1", home: DEFAULT_HOME }];
  if (!count && add) count = previousProfiles.length + add;
  if (!count && rl) count = Number((await rl.question("How many Codex profiles/accounts should Cherkani Stack configure? [1] ")).trim() || "1");
  rl?.close();
  if (!Number.isInteger(count) || count < 1 || count > 20) throw new Error("Profile count must be an integer from 1 to 20.");
  if (add && (!Number.isInteger(add) || add < 1 || previousProfiles.length + add > 20)) throw new Error("Additional profile count must keep the total between 1 and 20.");

  await ensureDir(SHARED_HOME);
  const sharedSessions = join(sharedRoot, "shared-sessions");
  await ensureDir(sharedSessions);
  await copyDir(join(ROOT, "references", "session-handoff.md"), join(sharedSessions, "SESSION_TEMPLATE.md"));
  await writeFile(join(sharedSessions, "README.md"), "# Shared Codex Sessions\n\nStore handoffs here, not credentials or Codex history databases.\n", "utf8");
  await writeManaged(join(SHARED_HOME, "AGENTS.md"), await readFile(join(ROOT, "AGENTS.md"), "utf8"));
  const sharedSkill = join(SHARED_HOME, "skills", "cherkani-stack");
  await copyDir(join(ROOT, "skills", "cherkani-stack"), sharedSkill);
  await copyDir(join(ROOT, "references"), join(sharedSkill, "references"));
  await removeStaleReferences(join(sharedSkill, "references"));

  const profiles = [];
  for (let index = 1; index <= count; index += 1) {
    const name = `codex${index}`;
    const existing = previousProfiles[index - 1];
    const profileHome = existing?.home || (index === 1 && count === 1 ? DEFAULT_HOME : join(homedir(), name));
    profiles.push(await configureProfile(name, profileHome, sharedSessions));
  }

  const binDir = platform() === "win32" ? join(homedir(), "cherkani-stack", "bin") : join(homedir(), ".local", "bin");
  for (const profile of profiles) {
    await createLauncher(join(binDir, profile.name), "codex", profile.home);
    await createLauncher(join(binDir, `code${profile.name.slice(5)}`), "code", profile.home);
  }
  await writeFile(join(sharedRoot, "install.json"), `${JSON.stringify({ version: "0.1.0", profiles, sharedSessions, installedAt: new Date().toISOString() }, null, 2)}\n`, "utf8");

  console.log(`Configured Cherkani Stack for ${count} Codex profile${count === 1 ? "" : "s"}.`);
  for (const profile of profiles) console.log(`  ${profile.name}: ${profile.home}`);
  console.log(`Shared session handoffs: ${sharedSessions}`);
  console.log("Authentication remains separate. Run `codex1 login`, `codex2 login`, etc. for each account.");
  console.log(`Add ${binDir} to PATH if the launchers are not found.`);
  if (login) loginProfiles(add ? profiles.slice(previousProfiles.length) : profiles);
}

async function session(command, name = "session") {
  const sessions = join(SHARED_HOME, "cherkani-stack", "shared-sessions");
  await ensureDir(sessions);
  if (command === "list") {
    const { readdir } = await import("node:fs/promises");
    for (const file of (await readdir(sessions)).filter((entry) => entry.endsWith(".md") && entry !== "README.md" && entry !== "SESSION_TEMPLATE.md")) console.log(file);
    return;
  }
  if (command !== "new") throw new Error("Usage: cherkani-stack session [new|list] [name]");
  const safeName = name.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "") || "session";
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const file = join(sessions, `${stamp}-${safeName}.md`);
  const template = existsSync(join(sessions, "SESSION_TEMPLATE.md")) ? await readFile(join(sessions, "SESSION_TEMPLATE.md"), "utf8") : "# Session Handoff\n\n## Status\nactive\n\n## Goal and acceptance checks\n\n## Moved from → moved to\n\n## Next action\n";
  await writeFile(file, template, "utf8");
  console.log(file);
  console.log("Next: write the goal, acceptance checks, moved-from/moved-to state, and next action in this handoff.");
}

function sharedRoot() { return join(SHARED_HOME, "cherkani-stack"); }
function goalFile() { return join(sharedRoot(), "goal.json"); }
async function emitEvent(type, payload) {
  const events = join(sharedRoot(), "events");
  await ensureDir(events);
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  await writeFile(join(events, `${stamp}-${type}.json`), `${JSON.stringify({ type, ...payload, at: new Date().toISOString() }, null, 2)}\n`, "utf8");
}
async function readGoal() {
  if (!existsSync(goalFile())) throw new Error("No active goal. Start one with: cherkani-stack goal start \"Your outcome\"");
  return JSON.parse(await readFile(goalFile(), "utf8"));
}
async function writeGoal(goal) {
  await ensureDir(sharedRoot());
  goal.updatedAt = new Date().toISOString();
  await writeFile(goalFile(), `${JSON.stringify(goal, null, 2)}\n`, "utf8");
  await emitEvent("goal-updated", { goal });
}
async function goal(command, title) {
  if (command === "start") {
    if (!title) throw new Error("Usage: cherkani-stack goal start \"Outcome in one sentence\"");
    const now = new Date().toISOString();
    const goalState = { title, status: "active", phase: "brief", acceptanceChecks: [], risks: [], nextAction: "Challenge the outcome with a CEO/product review.", createdAt: now, updatedAt: now };
    await writeGoal(goalState);
    console.log(`Goal started: ${title}`);
    console.log("Next: run discovery and add acceptance checks to the goal/session handoff.");
    return;
  }
  const current = await readGoal();
  if (command === "status") {
    console.log(JSON.stringify(current, null, 2));
    console.log(`Next: ${current.nextAction}`);
    return;
  }
  if (command === "next") { console.log(`Next: ${current.nextAction}`); return; }
  if (command === "check") {
    if (!title) throw new Error("Usage: cherkani-stack goal check \"Acceptance check\"");
    current.acceptanceChecks = [...(current.acceptanceChecks || []), { text: title, done: false }];
    current.nextAction = "Complete the acceptance checks, then move through test and review.";
    await writeGoal(current);
    console.log(`Acceptance check added: ${title}`);
    console.log(`Next: ${current.nextAction}`);
    return;
  }
  if (command === "done") {
    const checkIndex = Number(title) - 1;
    if (!Number.isInteger(checkIndex) || checkIndex < 0 || checkIndex >= (current.acceptanceChecks || []).length) throw new Error("Usage: cherkani-stack goal done <check-number>");
    current.acceptanceChecks[checkIndex].done = true;
    current.nextAction = "Run or record the remaining acceptance checks, then continue to review.";
    await writeGoal(current);
    console.log(`Acceptance check ${checkIndex + 1} marked done.`);
    console.log(`Next: ${current.nextAction}`);
    return;
  }
  if (command === "complete") {
    if (!current.acceptanceChecks?.length) throw new Error("Cannot complete a goal without acceptance checks. Add one with: cherkani-stack goal check \"...\"");
    if (current.acceptanceChecks.some((check) => !check.done)) throw new Error("Cannot complete a goal while acceptance checks remain open. Mark them with: cherkani-stack goal done <check-number>");
    if (!["adversarial-review", "review", "ship", "learn"].includes(current.phase)) throw new Error(`Cannot complete from phase '${current.phase}'. Move through QA, security, and adversarial review first.`);
    current.status = "complete";
    current.phase = "learn";
    current.nextAction = "Record the learning and choose the next measurable outcome.";
    await writeGoal(current);
    console.log("Goal marked complete.");
    console.log(`Next: ${current.nextAction}`);
    return;
  }
  throw new Error("Usage: cherkani-stack goal [start|status|next|check|done|complete] [title]");
}

function options(args) {
  const result = { checks: [], verify: [], phase: "goal" };
  const title = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--check") result.checks.push(args[++index]);
    else if (arg === "--verify") result.verify.push(args[++index]);
    else if (arg === "--phase") result.phase = args[++index];
    else title.push(arg);
  }
  return { ...result, title: title.join(" ").trim() };
}

async function begin(args) {
  const config = options(args);
  if (!config.title) throw new Error("Usage: cherkani-stack begin \"Outcome\" --check \"Acceptance check\" [--check \"...\"]");
  await goal("start", config.title);
  for (const check of config.checks) await goal("check", check);
  await phase(config.phase);
  await session("new", config.title);
  console.log("Next: work through the lifecycle and run `cherkani-stack verify` before finishing.");
}

async function verify(args) {
  const config = options(args);
  const current = await readGoal();
  const failures = [];
  if (!current.title) failures.push("goal has no outcome");
  if (!current.acceptanceChecks?.length) failures.push("no acceptance checks recorded");
  if (current.acceptanceChecks?.some((check) => !check.done)) failures.push("one or more acceptance checks are still open");
  if (!["qa", "security", "adversarial-review", "review", "ship", "learn"].includes(current.phase)) failures.push(`goal is in '${current.phase}', not a verification-ready phase`);
  for (const command of config.verify) {
    console.log(`Verify: ${command}`);
    const result = spawnSync(command, { shell: true, stdio: "inherit", cwd: process.cwd() });
    if (result.status !== 0) failures.push(`verification command failed: ${command}`);
  }
  if (failures.length) {
    console.error("Verification failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    console.error("Next: resolve the listed items, then run `cherkani-stack verify` again.");
    process.exitCode = 1;
    return false;
  }
  await emitEvent("verified", { goal: current, commands: config.verify });
  console.log("Verification passed: goal state and requested checks are valid.");
  console.log("Next: run `cherkani-stack finish` after review and release approval where required.");
  return true;
}

async function finish(args) {
  if (!(await verify(args))) return;
  await goal("complete");
  console.log("Next: record the learning and start the next measurable goal.");
}

async function phase(nextPhase) {
  const current = await readGoal();
  const aliases = { goal: "brief", discover: "context", specify: "spec", test: "qa", review: "adversarial-review" };
  const phases = ["brief", "ceo", "context", "spec", "taste", "design-preview", "design-review", "architecture", "dx", "plan", "build", "qa", "security", "adversarial-review", "ship", "learn"];
  const canonicalPhase = aliases[nextPhase] || nextPhase;
  if (!phases.includes(canonicalPhase)) throw new Error(`Phase must be one of: ${phases.join(", ")}`);
  const nextActions = {
    brief: "Challenge the outcome with a CEO/product review.",
    ceo: "Inspect the product, users, rules, code, and existing patterns.",
    context: "Write the user outcome, scope, non-goals, and acceptance checks.",
    spec: "Set the taste/design direction when UI is involved, then create a visual mock.",
    taste: "Create a reviewable HTML or React visual mock with the relevant states.",
    "design-preview": "Run design review and request approval before production UI implementation.",
    "design-review": "Record the approved direction, then define boundaries, data flow, risks, and recovery.",
    architecture: "Review setup, commands, debugging, testing, and handoff DX.",
    dx: "Break the work into thin vertical slices with verification commands.",
    plan: "Implement the smallest complete vertical slice.",
    build: "Run focused QA, then security and resilience checks where relevant.",
    qa: "Run security/resilience checks and record exact evidence.",
    security: "Perform adversarial review across behavior, quality, and scope.",
    "adversarial-review": "Confirm explicit release approval, then ship and verify rollback readiness.",
    ship: "Record learning and choose the next measurable outcome.",
    learn: "Choose the next measurable outcome or update one canonical stack rule with evidence.",
  };
  current.phase = canonicalPhase;
  current.nextAction = nextActions[canonicalPhase];
  await writeGoal(current);
  console.log(`Goal phase: ${nextPhase}`);
  console.log(`Next: ${current.nextAction}`);
}

async function main() {
  const [command = "setup", ...args] = process.argv.slice(2);
  const index = args.indexOf("--count");
  const count = index >= 0 ? args[index + 1] : undefined;
  const addIndex = args.indexOf("--add");
  const add = addIndex >= 0 ? args[addIndex + 1] : undefined;
  const login = args.includes("--login");
  if (command === "setup" || command === "install") await setup({ count, add, login, nonInteractive: Boolean(count || add) });
  else if (command === "begin") await begin(args);
  else if (command === "verify") await verify(args);
  else if (command === "finish") await finish(args);
  else if (command === "session") await session(args[0] || "new", args[1] || "session");
  else if (command === "goal") await goal(args[0] || "status", args.slice(1).join(" "));
  else if (command === "phase") await phase(args[0]);
  else if (command === "doctor") console.log(JSON.stringify({ root: ROOT, sharedHome: SHARED_HOME, defaultHome: DEFAULT_HOME, node: process.version, platform: platform() }, null, 2));
  else { console.log("Usage: cherkani-stack [setup|install|begin|verify|finish|doctor|session|goal|phase] [--count N] [--add N] [--login]"); process.exitCode = 1; }
}

main().catch((error) => { console.error(`cherkani-stack: ${error.message}`); process.exitCode = 1; });
