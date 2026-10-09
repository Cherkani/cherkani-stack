# Reporting Contract

Every meaningful Cherkani response or command ends with a compact handoff:

- **Done:** what changed or what was learned.
- **Evidence:** checks, sources, screenshots, browser/device coverage, or
  explicit unknowns.
- **Risks:** unresolved security, data, compatibility, migration, dependency,
  infrastructure, scope, or release risks.
- **Next:** one recommended action, followed by at most two optional actions
  when they materially improve the result.

Use situation-specific suggestions, not a generic checklist. Examples:

- after research: compare the recommendation against the product goal;
- after design: run accessibility, responsive, and browser review;
- after implementation: run focused tests, then the broader project checks;
- after a bug fix: verify the regression and test the failure boundary;
- after backend or migration work: report the trace, compatibility window,
  scan results, migration status, rollback path, and environment tested;
- before release: review scope, security, observability, rollback, and approval;
- after a session: save the handoff with moved-from → moved-to state.

Never claim a platform, browser, device, API, or deployment was verified when
it was only inferred from source code. Separate passed, not run, and blocked.
