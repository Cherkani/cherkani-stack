# Documentation Sources

This registry records reusable external documentation decisions. Add an entry
when a source changes an implementation, migration, security, compatibility, or
release decision.

Last reviewed: 2026-10-09

## Entry format

```text
### <topic>
- Source: https://official.example/docs/specific-page
- Version: <detected version or not versioned>
- Accessed: YYYY-MM-DD
- Decision: <what the source justified>
- Open question: <unknown, or none>
```

Prefer deep links to the exact official page. Keep this registry concise and
remove entries that no longer affect a maintained decision.
