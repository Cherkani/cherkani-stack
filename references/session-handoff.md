# Session Handoff

Create `.codex/SESSION.md` for work that may continue in another session.

```markdown
# Session Handoff

## Status
active | blocked | complete

## Goal and acceptance checks

## Decisions and assumptions

## Moved from → moved to

## Current files and working-tree state

## Verification
- command:
- result:

## Risks and approvals

## Next action
```

On resume, read it first, then verify its claims against current files and Git
state. Do not trust stale context over evidence.
