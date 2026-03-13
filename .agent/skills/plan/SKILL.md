---
name: plan
description: Generate structured implementation plans for complex multi-step tasks with phases, testing strategy, and TODO checklists
disable-model-invocation: true
---

# Plan Instructions

## Purpose

Generate structured implementation plans for complex, multi-step tasks. Plans help organize work, track progress, and ensure thorough test coverage.

## Planning

### Overview
- Clear, concise description of what you're building
- Why it's needed (user need, business requirement, technical debt)
- High-level approach in 2-3 sentences

### Phases
- Break implementation into logical phases (e.g., DB → API → UI → Validation)
- List specific files/modules to modify or create per phase
- Include code snippets for schema/types when helpful
- Note dependencies between phases

### Testing Strategy
**CRITICAL**: Every phase must include test planning:
- **Unit tests** (`*.test.ts`): mock dependencies, test logic in isolation
- **Integration tests** (`*.spec.ts`): use real database, test full flows
- Specify test file locations and coverage (happy path, edge cases, errors)

### TODO Checklist
**MANDATORY**: Include detailed markdown checklist at end of plan using `- [ ]` syntax:
- Break down each phase into granular, actionable items (one line per task)
- Include separate items for writing tests and running tests
- Test items should appear alongside/after implementation items
- Keep items specific and verifiable
- Include validation steps (typecheck, format, test runs) at the end

## Implementation Workflow

Follow this workflow for each phase:

> **Note for AI Agents**: When executing a plan, use the `todo_write` tool to create structured, trackable todos in Cursor's UI based on the plan's markdown checklist. This allows real-time progress tracking during implementation.

### Step 1: Navigate
```bash
cd apps/<app-name>
# or
cd services/<service-name>
```

### Step 2: Implement with Tests

**Test-First Approach** (preferred for new features):
1. Write test cases first (red)
2. Implement minimal code to pass (green)
3. Refactor for quality (refactor)
4. Run tests frequently: `CI=1 pnpm test:unit`

**Test-Alongside Approach** (acceptable for modifications):
1. Implement feature increment
2. Write corresponding tests immediately
3. Run tests: `CI=1 pnpm test:unit`
4. Fix issues, iterate until green
5. Add edge case tests

### Step 3: Validate Frequently

Run tests **after every meaningful change**:

```bash
# Unit tests (always)
CI=1 pnpm test:unit

# Integration tests (for database/API changes)
CI=1 pnpm test:it

# Typecheck (catch type errors early)
pnpm typecheck
```

### Step 4: Before Finishing

**REQUIRED** checklist (see `.cursor/rules/99-implementation-checklist.mdc`):

1. ✅ Run `CI=1 pnpm test:unit` (REQUIRED)
2. ✅ Run `CI=1 pnpm test:it` if database-related (RECOMMENDED)
3. ✅ Run `pnpm typecheck` (RECOMMENDED)
4. ✅ Run `pnpm format:write` (REQUIRED at the very end)
5. ✅ Mark all todos as `completed` or `cancelled`

## Monorepo Considerations

### Package Boundaries

- **Apps** (`apps/*`): import from services/packages, never from other apps
- **Services** (`services/*`): import from services/packages, never from apps
- **Packages** (`packages/*`): import from packages only

### Common Packages

- `@botfi/db`: Prisma client, schemas, migrations
- `@botfi/env/<app-name>`: environment configuration per app
- `@botfi/ui`: shared UI component library

### Database Changes

When modifying `services/db/prisma/schema.prisma`:

1. Update schema
2. Generate types: `pnpm db:generate` (from root)
3. Create migration: `pnpm db:migrate` (from root)
4. Update dependent packages
5. Run integration tests in affected services

## Key Principles

1. **Test Early, Test Often**: Write tests before or alongside code, run them frequently
2. **TODO Discipline**: Include comprehensive markdown checklist in plan; agents should track progress using Cursor's todo system during execution
3. **Incremental Progress**: Small commits, frequent validation, continuous integration
4. **Clear Communication**: Check off completed items, mark progress, note blockers explicitly
5. **Quality Gates**: Never skip the implementation checklist

## Anti-Patterns to Avoid

❌ Implementing large features without a plan
❌ Writing code without corresponding tests
❌ Running tests only at the end
❌ Skipping integration tests for database changes
❌ Not using TODO lists for complex tasks
❌ Marking work complete with failing tests
❌ Ignoring typecheck errors
❌ Forgetting to run `pnpm format:write`