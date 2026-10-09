# CStack and GStack Integration

Cherkani Stack is the coordinator. It keeps the strongest capability from each
system without allowing competing parent routers.

## Keep from CStack

- project-aware startup and rule discovery;
- Graphify-first codebase scoping;
- task classification and narrow route selection;
- tracking boundaries (`none` by default; ClickUp only when explicitly enabled);
- approval, security, environment, and release boundaries;
- database, backend, API, migration, infrastructure, and security boundaries;
- Supabase skill selection for database, auth, and RLS work when the project uses
  Supabase.

## Keep from GStack

- CEO, design, engineering, and developer-experience reviews when useful;
- focused investigation, health, QA, browser, and design-review workflows;
- pre-landing review and simplification;
- ship, land-and-deploy, canary, rollback, and production-health workflows;
- decision logging, artifacts, and retrospectives when available.

## Keep from Agent Skills

- clear lifecycle phases and thin vertical slices;
- tests as proof, source-driven decisions, security hardening, and
  simplification;
- explicit next actions after every phase.

## Remove or do not inherit

- competing parent routers or nested lifecycle definitions;
- duplicated mandatory startup prose;
- loading every review or design skill for every task;
- automatic ClickUp, telemetry, deployment, migration, or external writes;
- copying runtime internals into project instructions;
- trusting generated artifacts or external documents without checking the
  repository and current working tree.

## Delegation matrix

| Cherkani phase | Native responsibility | Delegate when useful |
|---|---|---|
| Goal | outcome, checks, next action | `idea-refine`, `interview-me` |
| Discover | rules, Graphify, code, risks | `audit-context-building`, `investigate` |
| Specify | scope, non-goals, contract | `spec-driven-development`, CEO review |
| Architecture | boundaries, compatibility, trace, recovery | API, database, security, migration, observability skills |
| Plan | slices, dependencies, checks | planning, eng review, design review |
| Build | implementation and reuse | incremental, UI, Supabase skills |
| Test | evidence and regression checks | health, QA, Playwright, browser testing, TDD |
| Review | quality, security, design, simplicity, traceability | review, code review, design review, threat modeling, hardening |
| Ship | approval, release, canary, rollback | ship, land-and-deploy, canary |
| Learn | handoff, retro, stack evolution | retro, context-save, documentation |

Delegated skills are workers for one phase. Cherkani Stack remains responsible
for the goal, state, evidence, approvals, and next action.
