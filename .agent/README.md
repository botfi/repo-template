# .agent — Shared Agent Skills

Shared skills and instructions for AI coding agents (Cursor, Copilot, etc.) across all monorepos in this repository.

## Structure

```
.agent/
└── skills/
    └── <skill-name>/
        └── SKILL.md
```

Each skill is a directory containing a `SKILL.md` file with YAML frontmatter (`name`, `description`) and markdown instructions.

## Usage

Monorepos consume shared skills via **symlinks** from their `.cursor/skills/` directory:

```bash
# From a monorepo root (e.g. platform/)
ln -s ../../../.agent/skills/commit .cursor/skills/commit
```

This makes the skill discoverable by Cursor as if it were local, while keeping a single source of truth in `.agent/skills/`.

### Adding a new shared skill

1. Create the skill directory and file:

   ```bash
   mkdir -p .agent/skills/<skill-name>
   # Write .agent/skills/<skill-name>/SKILL.md
   ```

2. Symlink it into each monorepo that should use it:

   ```bash
   ln -s ../../../.agent/skills/<skill-name> <monorepo>/.cursor/skills/<skill-name>
   ```

### Adding a monorepo-specific skill

Create it directly in the monorepo's `.cursor/skills/` directory (no symlink). It will only be visible in that workspace.

## Windows

Git stores symlinks as text files containing the target path. On Unix systems they work transparently. On Windows, symlinks require either:

- **Developer Mode** enabled, or
- Running the terminal as Administrator

Additionally, ensure git is configured to create real symlinks:

```bash
git config core.symlinks true
```

Without this, git will check out symlinks as plain text files and Cursor won't resolve them correctly. If you're on a team with Windows users, verify this setting is in place after cloning.
