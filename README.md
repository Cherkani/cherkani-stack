# Cherkani Stack

One portable Codex operating system for Cherkani projects.

Cherkani Stack is the coordinating operating system for solo-founder product
work. It moves one goal through founder, product, design, engineering, DX, QA,
security, review, shipping, and learning gates while selecting the best capability from
CStack, GStack, and the engineering skill collection. The integration matrix
removes duplicated routing and keeps each system in its strongest role.

## Install and configure Codex

The installer asks how many isolated Codex profiles/accounts to configure. It
creates `codex1`, `codex2`, and matching `code1`, `code2` launchers as needed.
Authentication and Codex history remain isolated per profile; only safe session
handoffs are shared.

From GitHub after publishing:

```bash
npx --yes github:Cherkani/cherkani-stack setup
```

Or from a local checkout:

```bash
node bin/cherkani-stack.mjs setup
```

For automation:

```bash
node bin/cherkani-stack.mjs setup --count 2
```

To configure profiles and sign them in one at a time using the official Codex
device-login flow:

```bash
cherkani-stack setup --count 3 --login
```

The installer shows the login instructions for `codex1`, waits until that
profile finishes, then continues to `codex2` and `codex3`. Follow the URL and
code shown by Codex in your browser or terminal. Cherkani never reads, stores,
or prints authentication codes. If device login is unavailable for an account,
run its launcher manually, for example `codex1 login`.

To keep an existing account and add one new isolated profile:

```bash
cherkani-stack setup --add 1
```

This preserves the existing profile as `codex1`, adds `codex2`, refreshes the
Cherkani instructions, and does not re-authenticate the existing account. To
sign in only the newly added profile, use:

```bash
cherkani-stack setup --add 1 --login
```

Create or list a shared, credential-free session handoff:

```bash
cherkani-stack session new feature-name
cherkani-stack session list
```

Track a goal and its next action:

```bash
cherkani-stack goal start "Ship the first useful onboarding flow"
cherkani-stack goal check "A new user can finish onboarding"
cherkani-stack goal done 1
cherkani-stack goal status
cherkani-stack phase discover
cherkani-stack goal next
cherkani-stack goal complete
```

For the recommended compact workflow, combine the common steps:

```bash
cherkani-stack begin "Ship the first useful onboarding flow" \
  --check "A new user can finish onboarding" \
  --check "The flow works on mobile"

cherkani-stack verify --verify "npm test" --verify "npm run lint"
cherkani-stack finish --verify "npm test"
```

`begin` creates the goal, checks, phase, and shared session handoff. `verify`
checks the specification state and runs only the commands you explicitly give
it. `finish` refuses to complete the goal if verification or acceptance checks
fail.

## Local quality and documentation checks

Run the local quality gate before committing:

```bash
npm run check
```

It validates the package contract, Markdown links and source metadata, Node
syntax, and whitespace. It does not require hosted CI or external services.

When a task depends on changing framework or platform behavior, follow
`references/documentation-integration.md` and record reusable authoritative
sources in `docs/SOURCES.md`. The local checker validates the registry format;
it does not pretend that a static check can prove an online page is current.

Then invoke the installed skill explicitly as `$cherkani-stack` when you want
the unified workflow. Project `AGENTS.md` files remain the source of
project-specific rules.

## Optional VS Code notifications

The repository includes a local notifier extension under
`extensions/cherkani-stack-notifier`. It watches goal/session events and shows a
notification with the next action. Install it locally with the commands in its
README; it is intentionally optional and does not access credentials.

## Use as a repository contract

Copy or adapt the root `AGENTS.md` into a project. Keep project-specific
commands, architecture, environment, and release boundaries in that project's
own rules file.

## Design principle

One goal, one lifecycle, explicit evidence, focused specialist skills, durable
handoffs, and a clear next action after every command.
