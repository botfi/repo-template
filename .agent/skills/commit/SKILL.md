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

Add co-author attribution **only** when the user explicitly asks for it.

Explicit requests include phrasing like:

- "commit with co-author"
- "add co-author to the commit"
- "include AI attribution"

Do **not** add co-authors when the user merely says things like:

- "commit this"
- "make a commit"
- "/commit"
- any similar request that does not mention a co-author

When explicitly requested, use the provider-specific attribution:

- **Claude Sonnet**: `Co-authored-by: Anthropic AI <ai@botfi.dev>`
- **GPT**: `Co-authored-by: OpenAI Codex <ai@botfi.dev>`
- **Cursor**: `Co-authored-by: Cursor AI <ai@botfi.dev>`
- **Grok (X)**: `Co-authored-by: xAI <ai@botfi.dev>`

## Examples

**Standard commit (no co-author):**

```bash
git commit -m "fix(api-web): guard empty PES payload" -m "Handle empty responses in the PES team list resolver to avoid null dereferences."
```

**With co-author (only when explicitly requested):**

```bash
git commit -m "feat(web): add leaderboard filter" -m "Introduce segment filtering for the public leaderboard." -m "Co-authored-by: OpenAI Codex <ai@botfi.dev>"
```
