# Cherkani Stack Expert Lifecycle

Cherkani Stack owns the lifecycle. CStack and GStack contribute focused
capabilities, while expert roles create the decision quality.

| Phase | Expert lens | Required artifact | Exit gate |
|---|---|---|---|
| Founder brief | intent and leverage | outcome, user, constraint | problem is worth solving |
| CEO/product review | value and scope | opportunity, success signal, non-goals | smallest valuable slice chosen |
| Context discovery | researcher/architect | project map, evidence, unknowns | no critical context gap remains |
| User/spec definition | product designer | user journey, states, acceptance checks | behavior is unambiguous |
| Taste and design direction | design director | visual thesis, reuse, interaction principles | design direction is coherent |
| Visual mock preview (when useful) | prototype designer | HTML/React preview, states, screenshots | uncertainty is reduced enough to implement |
| Design review and approval (when useful) | independent design reviewer | findings, selected direction, decision | direction is accepted or the smaller route is justified |
| Engineering architecture | staff engineer | boundaries, data flow, dependencies, risks | architecture fits the codebase |
| Developer-experience review | DX lead | setup, commands, failure recovery, handoff | another developer can run it |
| Thin-slice execution plan | delivery lead | ordered slices and proof per slice | work is independently verifiable |
| Incremental build | implementation owner | working vertical slices | requested behavior exists |
| Test and runtime QA | QA engineer | test, type, lint, browser, runtime evidence | no known regression remains |
| Security and resilience | security/operations | threat, auth, RLS, secrets, rollback checks | risk is accepted or fixed |
| Adversarial review | independent reviewer | findings, simplification, design critique | blocking findings resolved |
| Ship and canary | release engineer | approval, health, rollback record | production behavior confirmed |
| Learn and compound | founder/retro | learning, decision, stack improvement | next opportunity is clear |

## Decision rules

- Every phase produces an artifact or explicit decision, not just a status.
- Select expert reviews by risk and task type; do not run every panel for a
  typo or trivial change.
- A disputed decision shows options, recommendation, tradeoffs, confidence,
  and an upgrade trigger. Never hide a scope cut.
- A phase may be collapsed only when its exit gate is recorded.
- Shipping is never implied by verification; remote or irreversible actions
  still require current-task approval.
