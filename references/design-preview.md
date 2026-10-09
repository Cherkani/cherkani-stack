# Adaptive Design Preview Gate

Choose the smallest design workflow that reduces real uncertainty. Do not make
every UI change pass through the full preview sequence.

## Route by task

| Task signal | Route |
|---|---|
| typo, token adjustment, or tiny existing-pattern change | reuse → implement → focused accessibility/browser check |
| new surface, uncertain direction, or major interaction | spec → design direction → HTML/React mock → design review/approval → implementation → browser QA |
| redesign of an existing surface | context/audit → design direction → mock when direction changes → review → implementation → QA |
| motion-heavy interaction | design direction → motion prototype → motion review → implementation → device/browser QA |
| native or mobile-specific surface | platform context → platform-aware preview → real-device or simulator QA |
```

The full route is a default for substantial or uncertain work, not a fixed
requirement. The selected route and reason must be reported.

## Preview options

- static HTML/CSS for fast layout and hierarchy exploration;
- React route or component for realistic state and interaction previews;
- `prototype` or `design-shotgun` for genuinely different variants;
- `imagegen` for conceptual visual direction, never as unreviewed production UI;
- browser screenshots for responsive and state evidence;
- Figma workflows when the project already uses Figma as a source of truth.

## Required preview states

Show the relevant loading, empty, error, success, disabled, permission,
long-content, mobile, dark-mode, keyboard/focus, and reduced-motion states.
Reuse project components, tokens, icons, and accessibility primitives in the
preview whenever they already exist.

## Approval artifact

When review is used, record the selected direction, rejected alternatives,
design rationale, known gaps, and the exact next implementation slice. Approval
means approval of the direction, not permission to deploy or modify remote
systems.
