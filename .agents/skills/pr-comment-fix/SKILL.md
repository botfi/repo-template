---
name: pr-comment-fix
description: >-
  Read PR review comments and propose or apply fixes. Fetches inline review
  comments and top-level reviews from a GitHub PR, summarises actionable
  feedback, then edits the affected files. Use when the user asks to fix PR
  comments, address review feedback, resolve PR suggestions, or mentions
  "pr-comment-fix".
---

# PR Comment Fix

## Goal

Turn PR review feedback into applied code fixes.

## Workflow

### Step 1: Resolve the PR

Accept `PR 14`, `#14`, or a full URL. If none given, detect from the current branch:

```bash
gh pr view --json number,url,headRefName,baseRefName,state 2>/dev/null
```

### Step 2: Fetch all review feedback

Run in parallel:

```bash
# Inline review comments (file + line)
gh api repos/{owner}/{repo}/pulls/<N>/comments

# Top-level review bodies
gh api repos/{owner}/{repo}/pulls/<N>/reviews

# PR general comments
gh pr view <N> --json comments
```

Derive `{owner}/{repo}` from `gh repo view --json nameWithOwner -q .nameWithOwner`.

### Step 3: Parse & categorise

For each inline comment extract:
- **File path** (`path`) and **line** (`line` / `original_line`)
- **Author** and whether it is a bot
- **Severity** — look for P0/P1/P2 badges; otherwise infer from language
- **Action** — what the reviewer wants changed

Filter out:
- Boilerplate blocks (e.g. `<details>` "About Codex" sections)
- Already-resolved comment threads
- Pure praise / acknowledgement with no action

### Step 4: Present summary & confirm

Show the user a numbered list:

```
## PR #<N> — Review Feedback

### 1. (P1) `path/to/file.ts:42`
Author: reviewer
Issue: <one-line summary>
Suggested fix: <brief proposal>

### 2. ...
```

Ask: **"Which comments should I address? (all / comma-separated numbers)"**

Do NOT apply any changes before confirmation.

### Step 5: Read & fix

For each accepted comment:
1. Read the affected file around the referenced line.
2. Understand the reviewer's intent and the surrounding code.
3. Apply the fix using edit tools.

### Step 6: Verify

Run from the relevant package directory:
```bash
CI=1 pnpm test:unit
pnpm typecheck
```

### Step 7: Commit

Stage and commit using the repo convention:

```
fix(<scope>): address PR #<N> review feedback
```

### Step 8: Optionally reply on the PR

Ask the user if they want to reply to each addressed comment:

```bash
gh api repos/{owner}/{repo}/pulls/<N>/comments/<comment_id>/replies \
  -f body="Fixed in $(git rev-parse --short HEAD)"
```

## Guardrails

- Always confirm with the user before applying changes.
- Do not fabricate reviewer intent — if a comment is ambiguous, flag it.
- Skip bot boilerplate and resolved threads automatically.
- Follow the repo's coding style and commit conventions.
