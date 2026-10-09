# Cherkani Stack

This is the canonical operating system for Codex work across Cherkani
projects. Cherkani Stack owns the complete development process: goals,
discovery, specifications, planning, implementation, testing, review, release,
learning, and session continuity.

## Authority and precedence

Use this order when instructions overlap:

1. The user's current request and explicit approvals.
2. This global Cherkani Stack contract.
3. The target repository's `AGENTS.md` and deeper directory rules.
4. The selected workflow skill and specialist skills.
5. Source code, tests, Graphify, browser state, and runtime evidence.

More specific project rules may add constraints. They may not weaken safety,
approval, secret, production-data, or verification requirements.

## Operating model

Cherkani Stack is the coordinator. It composes the best capabilities of CStack,
GStack, and specialist engineering skills without inheriting redundant or
conflicting instructions. CStack supplies project-aware routing and
Graphify/risk boundaries. GStack supplies focused execution, review, QA, and
release workflows. Neither becomes a competing parent router.

```text
Founder brief → CEO review → Context → Spec → Taste → Architecture → DX
      → Plan → Build → QA → Security → Adversarial review → Ship → Learn
  └──── evidence, decisions, handoff, next action, and approvals throughout ────┘
```

Every phase has an entry condition, an artifact, an exit check, and a suggested
next action. A task is not complete merely because code was written.

## Mandatory session startup

For every substantive task:

1. Identify the project, affected area, tracking mode (`none` by default), and
   whether the task can affect auth, RLS, secrets, migrations, production data,
   deployment, or external systems.
2. Read this file, the target project's `AGENTS.md`, README, scripts, and the
   relevant session handoff.
3. Check branch and working-tree state, Graphify status, environment boundaries,
   and existing patterns before editing.
4. Classify the request: idea, specification, architecture, implementation,
   UI, bug, database, security, QA, documentation, deployment, or release.
5. Start or resume a tracked goal. A goal must include an outcome, acceptance
   checks, current phase, risks, and next action.
6. Select the phase workflow from `references/lifecycle.md` and delegation
   guidance from `references/integrations.md`. Apply the distilled CStack rules
   in `references/cstack-capabilities.md` and GStack rules in
   `references/gstack-capabilities.md`; use one primary path and add specialist
   skills only when needed.
7. Select relevant capabilities from `references/capability-catalog.md` and
   cross-platform checks from `references/cross-platform.md` when applicable.
8. State assumptions, goal, acceptance checks, implementation stages, selected
   skills, risks, and release path.

## Solo-founder delivery loop

### Founder brief

Turn an idea into one measurable outcome. If the idea is vague, use the
founder/CEO lens to ask focused questions and propose the smallest valuable
slice.

### CEO/product review

Challenge value, scope, success signal, non-goals, and whether the work should
exist at all.

### Context discovery

Inspect the product, users, existing code, project rules, Graphify, and current
patterns. Surface unknowns and risks before inventing architecture.

### User/spec definition

Write the user outcome, scope boundaries, acceptance checks, non-goals,
permissions, data implications, and success signal. Record unresolved decisions.

### Taste and design direction

For UI work, record the visual thesis, component reuse decisions, states,
accessibility, themes, motion, and localization.

### Adaptive visual preview and design approval

Choose the smallest useful UI route. Tiny changes that reuse an existing
pattern may go directly to implementation and focused QA. New, uncertain, or
high-risk surfaces should use a reviewable HTML or React mock, relevant states,
design review, and recorded approval before production implementation. Concept
images may guide direction, but they do not replace an interactive preview or
authorize production changes.

### Engineering architecture

Define boundaries, data flow, dependencies, trust boundaries, failure modes,
and recovery before implementation. For backend, API, database, infrastructure,
or migration work, define the change trace, compatibility window, validation,
rollback, observability, and ownership before editing.

### Developer-experience review

Make setup, commands, debugging, testing, session resume, and handoff clear to
the next developer.

### Thin-slice execution plan

Break the work into thin vertical slices. Each slice must have a file or
surface target, verification command, and rollback or recovery note when risk
is material.

### Build

Implement the smallest complete slice. Reuse existing components and
dependencies. Keep the goal and acceptance checks visible while working.

### Test

Run focused tests first, then type/lint/build checks, browser checks, and
authenticated/unauthenticated checks when applicable. Record exact evidence.

### Security and resilience

Check authentication and authorization, access policies, secrets, inputs,
dependencies, migrations, schema/API compatibility, logs, audit trails,
monitoring, rollback, and production boundaries when relevant. Apply the
project's database-specific rules, including RLS for Supabase projects, as a
specialized layer rather than the whole security model.

### Adversarial review

Review behavior, security, accessibility, design quality, performance,
simplicity, and scope. Fix findings before calling the goal complete.

### Ship

Only after explicit approval for remote or irreversible actions: commit,
deploy, migrate, canary, and verify rollback readiness.

### Learn

Record what worked, what failed, and what should change in the stack. Update
one canonical instruction or skill only when evidence supports a lasting rule.

## Design quality gate

For every UI or design task, use the relevant minimum gate:

- inspect and reuse existing components, tokens, primitives, and styling;
- use `frontend-design` or `frontend-ui-engineering` for direction;
- use `apple-design`, `emil-design-eng`, and `impeccable` for interaction
  quality and anti-slop critique;
- use accessibility and web-guideline checks;
- verify responsive behavior, light/dark themes, keyboard/focus states,
  localization, long labels, and RTL where applicable;
- complete design review or browser QA before handoff.
- For UI work, report the selected route and why. The expanded route is:
  `Spec → Design direction → Visual mock preview → Design review → Approval →
  React/HTML implementation → Browser QA`; use it when the task's uncertainty,
  novelty, or risk justifies it.

Add motion, mobile, stress-testing, or broader UX skills only when relevant.
External references such as Jitter, Animos, Refero Styles, Animations.dev, and
AGI Whitelist guide thinking only; do not copy proprietary assets or services.

## Simplicity and reuse

Apply Ponytail principles by default for coding tasks: question whether the
change is needed, reuse existing code, prefer standard-library and native
platform solutions, and avoid unnecessary dependencies. `stop ponytail` or
`normal mode` disables that mode for the task.

## Session continuity

For work crossing sessions, maintain `.codex/SESSION.md` with:

- status, goal, and acceptance checks;
- decisions and unresolved questions;
- `moved from → moved to` changes;
- files and working-tree state;
- exact verification commands and outcomes;
- risks, approvals, and the next concrete action.

Conversation history is useful context but is not durable project state. On
resume, verify the handoff against the actual working tree.

## Verification and release

After edits, run the smallest relevant lint, type, test, migration, database,
Graphify, or browser check. Before handoff, run broader applicable checks and
report what passed, what remains, and whether deployment occurred. End the
response using `references/reporting.md` and choose the situation-specific next
action from `references/next-actions.md`.

Never push, deploy, apply remote migrations, change production data, run
irreversible infrastructure changes, or modify external tracking without
explicit approval in the current task. Never print or persist secrets.

The installer may launch the official Codex device-login flow sequentially for
multiple isolated profiles when the user explicitly passes `--login`. Keep
authentication inside Codex, never capture login URLs, device codes, tokens, or
history databases, and stop on a failed profile rather than skipping silently.
Use `setup --add N` when extending an existing installation; preserve existing
profile homes and authenticate only newly added profiles when `--login` is used.

## Goals and completion

Use the CLI goal state when available:

```bash
cherkani-stack goal start "Outcome in one sentence"
cherkani-stack goal status
cherkani-stack goal next
cherkani-stack phase build
cherkani-stack goal complete
```

Every command must end with a clear `Next:` suggestion. Goal completion
requires acceptance checks and verification evidence, not only a status flag.

## Stack evolution

When a repeated failure, manual step, or useful pattern appears:

1. classify it as policy, routing, specialist skill, project documentation, or
   tooling;
2. update one canonical source instead of adding duplicate rules;
3. record the change in `STACK_CHANGELOG.md`;
4. validate with a representative session;
5. remove stale or conflicting instructions.

Do not promote a one-off preference into global policy without evidence.
