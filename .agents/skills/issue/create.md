# Issue Create

## Goal

Guide the user from a rough idea to a well-structured GitHub issue through
natural conversation -- understand first, structure later.

## Flow

This is a **multi-turn conversational** skill. Do NOT rush to templates.

### Phase 1: Understand the problem (turn 1)

Ask the user briefly:
- What do you want to work on, or what's the problem?
- Keep it open-ended -- one or two questions max.

### Phase 2: Discuss and explore (turns 2-3)

Based on the user's answer:

1. **Codebase scan** -- search for relevant files, packages, entry points
   related to what the user described. Present findings concisely.
2. **Ask clarifying questions** -- dig into specifics:
   - Scope and impact area
   - Expected behavior vs actual behavior (if a bug)
   - Why it matters / motivation (if a feature)
   - Any known constraints or dependencies
3. **Share observations** -- flag related code, existing TODOs, similar
   patterns, or potential risks found during the scan.

Keep the conversation natural. Don't interrogate -- collaborate.

### Phase 3: Match to template (after 2-3 turns of discussion)

Now that the problem is understood, fetch the issue templates:

1. Check for a local `.github/ISSUE_TEMPLATE/` folder in the repo first.
2. If none found, fetch org-level templates via the GitHub API:
   ```bash
   OWNER=$(gh repo view --json owner -q '.owner.login')
   gh api "repos/$OWNER/.github/contents/.github/ISSUE_TEMPLATE" \
     | jq -r '.[].name'
   ```

Fetch the content of candidate templates (local: read file; remote:
`gh api ... | jq -r '.content' | base64 -d`).

Based on the conversation so far, **suggest which template fits best**
and explain why. Let the user confirm or pick a different one.

Parse the chosen template's YAML: extract `title`, `labels`, and
`body[]` fields (`type`, `attributes.label`, `attributes.description`,
`attributes.placeholder`, `attributes.value`, `validations.required`).
Skip `type: markdown` entries (display-only).

### Phase 4: Draft the issue

Map the conversation content into the template fields. Build the issue
body matching GitHub's issue-form output format:

```markdown
### <Field Label>

<content from conversation>

### <Next Field Label>

<content from conversation>
```

Present the complete draft:
- **Title** (concise, actionable)
- **Body** (filled template)
- **Labels** (from template + any extras)

Ask: "Does this look good, or do you want to adjust anything?"

### Phase 5: Refine (if needed)

If the user wants changes:
- Edit specific sections
- Add missing details
- Adjust title or labels
- Re-present the updated draft

Repeat until the user is satisfied.

### Phase 6: Create the issue

Only after explicit user approval:

```bash
gh issue create \
  --title "<title>" \
  --label "<label1>,<label2>" \
  --body "$(cat <<'EOF'
<composed body>
EOF
)"
```

Print the created issue URL.

## Guardrails

- **Never create without explicit user approval.**
- Do not fetch templates until Phase 3 -- understand the problem first.
- Do not invent content; everything comes from the conversation.
- Do not skip required template fields -- prompt the user if gaps remain.
- Preserve the template's section order in the output.
