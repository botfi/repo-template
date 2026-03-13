---
name: sync-with-template
description: Sync upstream changes from a template repository remote into the current codebase
disable-model-invocation: true
---

# Sync With Template

## Purpose

Pull changes from a shared template repository (added as a git remote) into the current project. Identifies new template commits, reviews them with the user, and applies selected changes.

## Usage

```
/sync-with-template [remote-name]
```

- `remote-name`: git remote pointing at the template repo (default: `repo-template`)

## Sync Point Tracking

The last-synced template commit is recorded as a **git trailer** in the commit message body:

```
Synced-To: <full-sha>
```

To locate the most recent sync point on the current branch:

```bash
git log --grep='Synced-To:' -1 --format='%B'
```

Parse the SHA from the `Synced-To:` line.

If no sync point exists (first run), ask the user:

> "I couldn't find a previous sync marker. What is the last template commit that has already been applied to this repo?"

## Workflow

### Step 1: Fetch

```bash
git fetch <remote>
```

### Step 2: Find the last sync point

```bash
git log --grep='Synced-To:' -1 --format='%B'
```

Extract the SHA. If absent, ask the user for the starting commit (see above).

### Step 3: List new template commits

```bash
git log --oneline --reverse <last-synced-sha>..<remote>/main
```

If there are no new commits, inform the user and stop.

### Step 4: Present changes and ask for confirmation

For each new commit show:

- Commit message and SHA
- Files changed: `git diff --stat <sha>~1 <sha>`
- Full diff: `git diff <sha>~1 <sha>`

Then ask the user which commits to apply. The user may not know which are relevant until they see the actual code, so **always present details before asking**.

Acceptable responses:

- **all** — apply every commit
- **list of SHAs** — apply only the specified commits
- **skip** — skip the entire sync

### Step 5: Apply selected commits

For each selected commit, in chronological order:

```bash
git cherry-pick --no-commit <sha>
```

**On conflict:**

1. List conflicting files (`git diff --name-only --diff-filter=U`)
2. Show conflict markers in each file
3. Ask the user how to resolve (keep ours / keep theirs / custom)
4. Stage resolved files with `git add`

After all selected commits are applied, review the combined result:

```bash
git diff --cached --stat
git diff --cached
```

### Step 6: Commit with sync marker

Commit using the project's conventional commit format. Append the `Synced-To:` trailer referencing the **tip of the reviewed range** on the template remote — even if some commits were skipped. This prevents re-showing already-reviewed commits on the next run.

```bash
git commit -m "<type>(<scope>): <summary>" \
  -m "<optional body describing what was applied and what was skipped>" \
  -m "Synced-To: <full-sha-of-latest-reviewed-template-commit>"
```

If skipped commits exist, list them in the body so they are visible in history:

```
Skipped: <sha1> <short message>
Skipped: <sha2> <short message>
```

Use `sync` as the commit type unless all changes clearly belong to a single category (e.g., `docs`, `infra`).

Follow `.agents/skills/commit/SKILL.md` for commit message conventions and co-author attribution.

## Notes

- **Do not push** unless the user explicitly asks.
- **One sync commit per session** — squash all applied template changes into a single commit with one `Synced-To:` trailer.
- The `Synced-To:` SHA marks the latest **reviewed** template commit, not the latest **applied** one. This avoids resurfacing commits the user already decided to skip.
