---
name: pr-create
description: Create GitHub pull requests using the gh CLI. Detects the base branch of the current branch, confirms it with the user, and populates the PR body from the repo's .github/pull_request_template.md. Use when the user asks to create a PR, open a pull request, or submit changes for review.
---

# Create Pull Request

## Workflow

### Step 1: Collect branch info

Run these commands in parallel:

```bash
# Current branch
git rev-parse --abbrev-ref HEAD

# Check if a PR already exists for this branch
gh pr view --json url,state 2>/dev/null || true

# List remote branches whose tip is an ancestor of HEAD
git branch -r --list 'origin/*' | sed 's|^[[:space:]]*origin/||' | while read -r b; do
  git merge-base --is-ancestor HEAD "origin/$b" 2>/dev/null && echo "$b"
done
```

### Step 2: Determine base branch

Find which branch the current branch was created from:

```bash
# Get the most likely base branch by finding the nearest ancestor
git log --oneline --decorate --all --graph | head -30

# Compare merge-base distance to common base branches
for base in main master develop staging; do
  mb=$(git merge-base HEAD "origin/$base" 2>/dev/null) && \
  echo "$base: $(git rev-list --count "$mb"..HEAD) commits ahead" || true
done
```

Pick the branch with the fewest commits ahead (closest ancestor). If ambiguous or the result is unexpected, **ask the user to confirm** the base branch before proceeding.

**Always confirm** the detected base branch with the user:
> "The base branch appears to be `<branch>`. Should I create the PR against this branch?"

### Step 3: Gather changes for the PR body

```bash
# Commits on this branch vs base
git log --oneline origin/<base>..HEAD

# Full diff summary
git diff --stat origin/<base>..HEAD
```

### Step 4: Read the PR template

Read the file `.github/pull_request_template.md` from the repo root. If it doesn't exist, use a minimal structure:

```markdown
## Proposed Changes
- [ ]
```

### Step 5: Fill in the template

Populate the template fields:

- **Issue reference**: Ask the user for the issue number if not obvious from branch name or conversation context.
- **Proposed Changes**: Summarize changes based on the commit log and diff. Check off completed items. Keep it concise.
- **Demo**: Leave blank unless the user provides screenshots/recordings.

### Step 6: Create the PR

```bash
# Push branch if not already pushed
git push -u origin HEAD

# Create PR
gh pr create \
  --base <base-branch> \
  --title "<type>(scope): summary" \
  --body "$(cat <<'EOF'
<filled template content>
EOF
)"
```

**Title format**: Follow the repo's commit convention — `type(scope): summary` (e.g., `feat(web): add user profile page`).

### Step 7: Return the PR URL

Print the PR URL so the user can review it.
