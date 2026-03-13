# Issue Read

## Goal

Turn an issue reference into a short, actionable context brief.

## Workflow

1. Resolve the issue reference (accept `issue 4`, `#4`, or full URL).

2. Fetch issue data:
   ```bash
   gh issue view <number> --json number,title,body,labels,assignees,state,url,comments
   ```
   If no repo context in current directory, add `--repo <owner>/<repo>`.

3. Extract core signals:
   - Problem statement and requested outcome
   - Constraints or acceptance hints
   - Labels / assignee / state cues
   - Relevant details from comments

4. Quick codebase scan:
   - Identify likely touched packages/apps/services
   - Note probable entry points and test locations
   - Flag dependency or migration risk if suggested by issue text

5. Return a context brief:

```markdown
## Issue: <title> (#<number>)
URL: <url>

### What this likely means
- <1-3 bullets>

### Likely impact area
- <apps/services/packages paths>

### Risk level
- <low|medium|high> -- <one-line rationale>

### Open questions
- <missing requirements or ambiguities>

### Suggested next step
- <first concrete action>
```

## Guardrails

- Do not invent missing requirements; list them under **Open questions**.
- Prefer repository evidence over assumptions.
- Keep the brief short and actionable.
