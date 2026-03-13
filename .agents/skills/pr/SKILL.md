---
name: pr
description: >-
  Grouped pull request workflow for creating PRs and fixing PR review comments.
  Routes to create or comment-fix instructions based on user intent.
---

# PR Skills

Detect the user's intent, then read and follow the matching sub-instruction file.

| Intent | Common trigger phrases | File |
|--------|------------------------|------|
| Create PR | create PR, open pull request, submit for review | `create.md` |
| Fix PR comments | fix PR comments, address review feedback, resolve PR suggestions | `comment-fix.md` |

## How to route

1. Match the request to one intent in the table above.
2. Read the corresponding file from this directory.
3. Follow that file exactly.

## Guardrails

- Ask follow-up questions when intent is ambiguous.
- Do not mix actions; route to one primary action first.
- If the user asks for multiple actions, handle them sequentially.
