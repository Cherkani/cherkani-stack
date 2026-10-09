# Cherkani Capability Catalog

Cherkani Stack owns the goal and lifecycle. Specialist skills are focused
workers selected for the current phase; they do not create a competing router.

## Research and product thinking

Use `interview-me` when intent is unclear, `idea-refine` for divergent and
convergent product shaping, `source-driven-development` for authoritative
technical research, and `audit-context-building` for unfamiliar systems.
Record the problem, evidence, alternatives, recommendation, confidence, and
open questions.

## Specification and architecture

Use `spec-driven-development` for requirements and capability maps,
`planning-and-task-breakdown` for thin slices, `api-and-interface-design` for
public contracts, `constraint-driven-development` for measurable quality bars,
and `documentation-and-adrs` for decisions that future sessions must retain.

## Design and interaction

Start with `ui-component-reuse` and the project's component system. Add
`frontend-design` or `frontend-ui-engineering` for implementation direction,
`apple-design`, `emil-design-eng`, `design-taste-frontend`,
`design-motion-principles`, or `genjutsu` for interaction quality,
`impeccable` or `baseline-ui` for critique, and `fixing-accessibility` plus
`web-design-guidelines` for quality.

Use `prototype` or `design-shotgun` when comparing genuinely different
directions, `improve-ui` for an evidence-led existing-surface audit, and
`pick-ui-library` only when a new library decision is actually needed.

For new, uncertain, or high-risk UI work, create the visual mock before
production code. Tiny changes that reuse an existing pattern may use focused
QA instead. Use HTML/CSS for quick layout exploration, React for realistic
states, `imagegen` for optional concept direction, and browser screenshots for
review evidence. Choose the route in `references/design-preview.md` and report
why it fits.

Use Jitter, Animos, Refero Styles, and Animations.dev as visual or motion
references only. Use Apple Design, Emil Kowalski, Impeccable, Taste Skill,
AGI Whitelist, and Find Skills when their design, critique, values, or
discovery perspective fits the task. These are guidance sources, not copied
assets or runtime dependencies.

## Implementation and maintenance

Use `ponytail` by default for the smallest complete change, `incremental-
implementation` for multi-file work, `test-driven-development` for behavior
changes, `code-simplification` for cleanup, and `vercel-react-best-practices`
for React or Next.js performance-sensitive work.

Use Addy Osmani's `agent-skills` collection as a source of frontend,
testing, security, planning, and shipping practices. Use OmniRoute skills only
for OmniRoute API or CLI tasks. Do not activate provider routing for unrelated
projects or expose OmniRoute credentials.

## Verification and quality

Use the project's real lint, type, test, and build scripts. Add `qa`,
`browser-testing-with-devtools`, or `playwright` for real browser flows;
`break-ui` for hostile content and boundary states; `performance-optimization`
or `benchmark` for speed; `review` or `code-review-and-quality` for pre-merge
review; and `doubt-driven-development` for high-risk assumptions.

## Backend, data, security, and operations

Use `security-best-practices` for language-specific review,
`security-threat-model` for repository-grounded abuse paths,
`security-and-hardening` for implementation fixes, and
`observability-and-instrumentation` when production behavior needs evidence.
For backend, API, database, infrastructure, or migration changes, trace the
change from requirement to code/configuration to tests to deployment evidence.
Check compatibility, validation, audit logs, access control, secrets,
dependency or container scans, rollback, and recovery. Use the project's
specialized database rules, including Supabase and Postgres skills when
applicable.

Use `deprecation-and-migration` for schema/API/system transitions,
`api-and-interface-design` for compatibility contracts, `ci-cd-and-automation`
for pipeline checks, and `shipping-and-launch` for release readiness. Never
apply a remote migration or irreversible infrastructure change without current
approval.

## Cross-platform verification

For responsive web, verify desktop, tablet, and phone layouts, keyboard and
touch behavior, light/dark themes, reduced motion, localization, long labels,
RTL, and representative real browsers. Add `mobile-native` for phone/PWA
behavior, `animate-expo` for React Native/Expo motion, and native platform
skills when the target is iOS or another device platform. State what was
actually tested and what remains unverified.

## Release and learning

Use `shipping-and-launch` for launch readiness, `ci-cd-and-automation` for
pipeline changes, `observability-and-instrumentation` for post-release signals,
and canary/rollback workflows when deployment is approved. Use
`context-save`, `context-restore`, `retro`, or `documentation-and-adrs` when a
session boundary or durable learning matters.

## Selection rule

Select one primary workflow and only the smallest specialist set that closes a
real gap. Do not load every design or review skill by default. If a capability
is missing, record the gap and use the safest available fallback.
