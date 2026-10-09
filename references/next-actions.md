# Next-Action Selection

The final recommendation should move the current goal one phase forward.

| Current signal | Recommended next action |
|---|---|
| vague idea or conflicting intent | interview the founder and define the smallest valuable outcome |
| weak evidence or unfamiliar code | run Graphify/context discovery and inspect existing patterns |
| unclear requirements | write acceptance checks, non-goals, and unresolved decisions |
| UI direction chosen | reuse components, complete the design gate, then prototype or build |
| implementation incomplete | finish one thin slice and run its focused verification |
| tests failing | investigate the root cause, fix it, and rerun the regression |
| UI changed | verify responsive, themes, keyboard, touch, accessibility, and browser behavior |
| auth/data/security changed | run threat modeling, RLS/auth checks, and adversarial review |
| local checks pass | run broader review and confirm release boundaries |
| release approved | ship, monitor the canary, verify rollback, then record learning |
| session ending | save the durable handoff and name the first resume action |

Keep the recommendation short and actionable. Do not suggest deployment,
external writes, migrations, or destructive operations without explicit approval.
