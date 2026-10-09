# GStack Knowledge — Curated

Cherkani Stack preserves these GStack behaviors as phase-specific practices:

## Decision quality

- Start with a scope gate: confirm the work belongs in the product and define
  what is explicitly out of scope.
- Give a recommendation, concrete tradeoffs, confidence, and an upgrade
  trigger when choices differ in completeness.
- Surface confusion instead of silently guessing.
- Claims about limitations, APIs, or project behavior require evidence.
- Search existing code and patterns before building new abstractions.

## Context and continuity

- Protect the original goal, current error, active file, hard constraints, and
  latest verification result.
- Trim stale attempts and verbose output before context becomes overloaded.
- Checkpoint at meaningful boundaries with current state, decisions, files,
  verification, risks, and next action.

## Execution and quality

- Work in thin slices and verify each slice.
- Detect the project's real type, lint, test, build, and dead-code tools rather
  than assuming a framework.
- QA reproduces, tests, fixes, and retests; design review audits, fixes, and
  verifies; code review checks scope, correctness, security, maintainability,
  and tests.
- Ship performs preflight, approval, release, canary, health, and rollback
  checks. It never silently deploys.

## Completion

- Report what changed, what was verified, what remains, and the next action.
- A goal is complete only when acceptance checks and evidence support it.
- Convert repeated failures into a focused rule or skill improvement instead
  of adding broad instructions after every incident.

This is curated knowledge, not copied GStack runtime internals. The former
GStack source is archived only for migration comparison; Cherkani Stack now
owns the active workflow and delegates no required phase to GStack.
