# Cherkani Stack Changelog

## 2026-10-09

- Created the unified Cherkani Stack contract.
- Consolidated policy, routing, GStack execution, specialist skills, session
  continuity, verification, and release safety into one portable package.
- Made Cherkani Stack the primary lifecycle: Goal, Discover, Specify, Plan,
  Build, Test, Review, Ship, and Learn. CStack/GStack are optional adapters.
- Added goal state, acceptance-check gates, phase transitions, next-action
  output, shared event files, and an optional VS Code notifier extension.
- Acceptance checks must now be individually marked done before goal completion.
- Added a CStack/GStack integration matrix: keep CStack routing and boundaries,
  keep GStack execution/review/QA/release, and remove duplicated parent routing,
  repeated startup instructions, automatic external writes, and unnecessary
  skill loading.
- Added the compact `begin` → `verify` → `finish` workflow so goal setup,
  acceptance checks, session handoff, verification, and completion can be done
  with fewer commands without weakening quality gates.
- Expanded the lifecycle into founder, CEO/product, context, specification,
  taste/design, architecture, DX, plan, build, QA, security, adversarial
  review, ship, and learn expert gates.
- Added curated CStack and GStack capability references so the stack carries
  their important execution principles without copying runtime internals or
  creating a second competing router.
- Renamed the curated files to `cstack-capabilities.md` and
  `gstack-capabilities.md` so their purpose is explicit.
- Updated reinstall cleanup and lifecycle aliases so stale legacy filenames do
  not remain active and CLI phases match the expert lifecycle.
- Added the capability catalog, reporting contract, situation-based next-action
  guidance, and cross-platform verification matrix for research, design,
  implementation, QA, security, release, and session handoffs.
- Made Apple Design, Emil Kowalski, Taste, Impeccable, Ponytail, Addy
  Osmani's agent-skills, OmniRoute boundaries, and all named visual reference
  sources explicit in the design and capability contracts.
- Generalized backend, database, API, infrastructure, migration traceability,
  security scans, compatibility, observability, and rollback rules beyond
  Supabase, while retaining Supabase/RLS as a specialized project adapter.
- Added a dependency-free local quality gate and source-driven documentation
  integration with a reusable source registry and freshness caveat.
- Completed the local migration: Cherkani Stack is installed with its complete
  reference set, while the former CStack/GStack directories are out of active
  discovery and preserved in a dated rollback archive.
