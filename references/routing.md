# Routing Matrix

Choose one primary route. Do not stack multiple competing planners or routers.

| Request | Primary route | Add when needed |
|---|---|---|
| vague idea | Founder brief → `interview-me` → `idea-refine` | `spec-driven-development` |
| new feature | CEO review → Spec → Plan → Build | planning, tests, review |
| architecture | Context → Architecture → `plan-eng-review` | `context-engineering`, security |
| UI/design | Choose the smallest route: reuse → build → focused QA, or Spec → Taste → Visual mock → Review → Build → Browser QA | Apple/Emil, prototype, imagegen, accessibility, QA |
| bug | Context → investigate → Build | tests, review |
| database/Supabase | Spec → Architecture → Supabase workflow | Postgres, security, auth/RLS |
| security | Context → Security → review | threat model, hardening |
| QA | Build → QA → `qa` or browser testing | accessibility, performance |
| documentation | Spec → DX → documentation workflow | Graphify/diagram |
| release | Adversarial review → Ship | deploy, canary, rollback |

Cherkani Stack chooses the phase and route. CStack/GStack may execute a
compatible sub-step, but they are adapters. Specialist skills provide focused
procedures, not alternate authority.
