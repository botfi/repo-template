# Repository Guidelines

This is a pnpm + Turborepo monorepo. These guidelines mirror `.cursor/rules/01-structure-and-environment.mdc` and `02-development.mdc` for agent consistency.

## Project Structure & Module Organization
- `apps/*`: runnable Next.js apps (e.g., `apps/web`, `apps/admin`).
- `services/*`: domain services (e.g., `services/api-*`, `services/db`).
- `packages/*`: shared libraries (`ui`, `env`, `eslint-config`, `tsconfig`).
- Import boundaries: apps → services/packages; services → services/packages; packages → packages only. Never import apps from anywhere. Use `@botfi/*` scope.
- Route segments: in `app/`, import from your segment or ancestors; never from descendants.
- Environment files: use `.env.sample` to create `.env.local`. Never commit secrets.

## Build, Test, and Development Commands
- Requirements: Node >= 22, pnpm >= 10.
- Prefer running inside the target package: `cd apps/<app>` or `services/<service>`.
- Always prepend CI=1 for non-interactive runs: `CI=1 pnpm test:unit`.
- Examples: dev `pnpm dev`, start `pnpm start`, unit `CI=1 pnpm test:unit`, integration `CI=1 pnpm test:it`.
- From repo root, use filters when needed: `CI=1 pnpm --filter <package> run <script>`.
- Turbo helpers: multi-package tasks via `pnpm turbo run <task>`; DB scripts from root: `pnpm db:migrate | db:studio | db:generate | db:reset` (`services/db`).

## Coding Style & Naming Conventions
- Lint: ESLint with `@botfi/eslint-config` (see `.eslintrc.js`). Avoid undeclared env access.
- Format: Prettier (+ Tailwind, organize-imports). Run: `pnpm turbo run format:write`.
- TypeScript: strict via `@botfi/tsconfig`. Public APIs should be explicitly typed.
- Files: React components PascalCase; utilities/hooks/libs camelCase; export only what is needed.
- Env usage: import per-app env from `@botfi/env/<app-name>`; use `NEXT_PUBLIC_*` on the client; prefer `env.NEXT_PUBLIC_ENV` over `NODE_ENV`. Do not read `process.env` directly.
- Database: import via `@botfi/db` and use the exported singleton Prisma instance.
- UI: use `@botfi/ui` kit; `@botfi/ui/utils` exposes `cn`.

## Testing Guidelines
- Framework: Vitest (+ Testing Library where applicable).
- Naming: unit `*.test.ts` (or `.tsx` for React); integration `*.spec.ts` (or `.tsx`).
- Run from the package directory with CI: `CI=1 pnpm test:unit` or `CI=1 pnpm test:it`.
- Co-locate tests with sources; some services also keep tests under `spec/`.

## Commit & Pull Request Guidelines
- Commits: `type(scope): summary` (e.g., `fix(web): sidebar hover state`, `tweak(ui): theme color`, `infra: CI for web`).
- Keep commits small and focused; use imperative voice.
- PRs: include a clear description, linked issues, UI screenshots when relevant, test plan, and any DB migration notes.
