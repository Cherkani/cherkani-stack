# Cross-Platform Verification

Choose the matrix from the product surface instead of claiming universal
coverage. Record each target as passed, not run, or blocked.

## Web

- desktop and narrow mobile viewport;
- keyboard navigation, focus, reduced motion, and screen-reader semantics;
- touch targets, scrolling, safe areas, orientation, and offline/loading states;
- light/dark themes, localization, long labels, non-Latin text, and RTL;
- at least one real browser flow with console and network errors checked.

## Mobile web and PWA

- real-device viewport behavior and virtual keyboard;
- `100vh`, safe-area insets, sticky hover, pull-to-refresh, and touch latency;
- install, resume, back navigation, offline/error recovery, and deep links.

## Native and Expo

- iOS and Android when both are supported;
- gesture interruption, animation thread, haptics, permissions, keyboard,
  system bars, orientation, and reduced-motion behavior;
- simulator checks plus real hardware for touch, performance, and platform UI.

## Backend and data

- authenticated and unauthenticated paths;
- authorization, policy enforcement, tenant boundaries, and service identities;
- retries, idempotency, validation, schema/API migrations, compatibility,
  audit logs, metrics, dependency/container scans, and rollback;
- representative production-like data without exposing secrets or production
  data in logs.

For database or infrastructure changes, verify the migration history, upgrade
path, rollback or recovery path, environment mapping, and evidence trail. RLS
is required when Supabase is used, but equivalent authorization and policy
checks apply to every backend stack.

The report must name the exact commands, browsers, devices, environments, and
known gaps. Source inspection alone is not cross-platform verification.
