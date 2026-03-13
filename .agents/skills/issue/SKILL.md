---
name: issue
description: >-
  Grouped issue workflow for creating, reading, and refining GitHub issues.
  Routes to create, read, or refine instructions based on user intent.
---

# Issue Skills

Detect the user's intent, then read and follow the matching sub-instruction file.

| Intent | Common trigger phrases | File |
|--------|------------------------|------|
| Create issue | create issue, file issue, open issue, draft issue | `create.md` |
| Read issue | read issue, issue 4, #4, quick issue assessment | `read.md` |
| Refine issue | refine issue, investigate issue, clarify issue, update issue, upload plan | `refine.md` |

## How to route

1. Match the request to one intent in the table above.
2. Read the corresponding file from this directory.
3. Follow that file exactly.

## Guardrails

- Ask follow-up questions when intent is ambiguous.
- Do not mix actions; route to one primary action first.
- If the user asks for multiple actions, handle them sequentially.
