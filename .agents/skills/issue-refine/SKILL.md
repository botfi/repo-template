---
name: issue-refine
description: >-
  Investigates, clarifies, or updates a GitHub issue. Use when the user asks
  to refine, investigate, clarify, spec out, or update an issue, or wants to
  upload a plan or findings to an issue.
---

# Issue Refine

## Goal

Improve issue clarity or update it with new information. This skill is
flexible and user-driven — it responds to what you ask.

## Common Actions

### Investigate
- Deep codebase analysis beyond the quick scan from `issue-read`
- Trace code paths, identify edge cases, map dependencies
- Document findings

### Clarify
- Identify ambiguities or missing requirements
- Draft clarifying questions
- Propose acceptance criteria

### Update issue
- Post findings or plan as an issue comment:
  ```bash
  gh issue comment <number> --body "<content>"
  ```
- Edit issue body with refined specs:
  ```bash
  gh issue edit <number> --body "<updated body>"
  ```
- Add labels:
  ```bash
  gh issue edit <number> --add-label "<label>"
  ```

### Upload plan
When asked to upload/post a plan to the issue:
1. Summarize the implementation plan concisely
2. Post as a comment with clear structure
3. Always confirm with the user before posting

## Workflow

1. Determine what the user wants (investigate / clarify / update / upload).
2. If issue context isn't available from a prior `issue-read`, fetch it:
   ```bash
   gh issue view <number> --json number,title,body,labels,assignees,state,url,comments
   ```
3. Perform the requested action.
4. Present results to the user before making any changes to the issue.

## Guardrails

- Always confirm with the user before writing to the issue (comments, edits).
- Do not invent requirements; flag gaps instead.
- Keep updates concise and structured.
