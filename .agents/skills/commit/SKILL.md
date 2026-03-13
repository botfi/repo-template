---
name: commit
description: Commit current work using Conventional Commits format with scoped types and optional co-author attribution
disable-model-invocation: true
---

# Commit Instructions

## Conventional Commit Format

Use Conventional Commits with an explicit scope for the package you touched:

```bash
git commit -m "<type>(<scope>): <short summary>" -m "Optional longer description."
```

- `<scope>` should match the package folder (for example `admin`, `web`, `api-web`, `db`, `ui`).
- Keep the summary under 80 characters and write it in the imperative mood.

## Commit Types

- `feat`: introduce new user-facing functionality or public API surface
- `fix`: resolve a bug or regression that impacts expected behaviour
- `tweak`: deliver a bug fix that also meaningfully improves the implementation
- `docs`: update documentation only (readme, guides, ADRs, comments)
- `test`: add, adjust, or harden automated tests without production code changes
- `chore`: perform maintenance or tooling work with no direct runtime impact
- `perf`: improve performance characteristics without changing behaviour
- `refactor`: reshape existing code without altering features or fixed bugs
- `infra`: change build, CI/CD, dev environment, or infrastructure configs
- `lint`: apply formatting, lint, or type-only fixes that do not affect runtime
- `revert`: roll back a previous commit (include the original SHA in the body)

Keep commits small and focused. Run required tests and formatting commands before committing (`CI=1 pnpm test:unit`, `CI=1 pnpm test:it` when relevant, and `pnpm format:write`).

## Co-Author Attribution

**Always** include co-author attribution when the agent contributed to the changes being committed.

Do **not** include co-author attribution only when:

- The user explicitly asks to exclude it (e.g., "commit without co-author", "no AI attribution")
- The agent had **no contribution** to the recent changes (e.g., the user wrote the code themselves and only asked the agent to commit it)

Use the provider-specific attribution:

- **Claude Sonnet**: `Co-authored-by: Anthropic AI <ai@botfi.dev>`
- **GPT**: `Co-authored-by: OpenAI Codex <ai@botfi.dev>`
- **Cursor**: `Co-authored-by: Cursor AI <ai@botfi.dev>`
- **Grok (X)**: `Co-authored-by: xAI <ai@botfi.dev>`

## Examples

**Standard commit (agent contributed):**

```bash
git commit -m "fix(api-web): guard empty PES payload" -m "Handle empty responses in the PES team list resolver to avoid null dereferences." -m "Co-authored-by: Anthropic AI <ai@botfi.dev>"
```

**Without co-author (user explicitly opted out, or agent had no contribution):**

```bash
git commit -m "feat(web): add leaderboard filter" -m "Introduce segment filtering for the public leaderboard."
```
