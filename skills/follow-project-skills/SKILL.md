---
name: follow-project-skills
description: >-
  Routes work through this portfolio's skills catalog (quality, Next.js
  standards, folder structure, testing). Use when implementing, reviewing, or
  scaffolding any change so agents follow skills/ instead of inventing process.
---

# Follow Project Skills

`skills/` is the **source of truth**. Copy a skill into `.cursor/skills/` (gitignored) when Cursor should auto-load it. Do not paste skill bodies into `AGENTS.md` (Next regenerates that file).

## Catalog

| Skill                                                                    | Open when                                                    |
| ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| [setup-frontend-quality](../setup-frontend-quality/SKILL.md)             | Lint, Prettier, Husky, CI quality gates                      |
| [adhering-to-nextjs-standards](../adhering-to-nextjs-standards/SKILL.md) | App Router UI, `"use client"`, props, stack detection        |
| [frontend-folder-structure](../frontend-folder-structure/SKILL.md)       | New page, component, `lib/` module, or “where does this go?” |
| [frontend-testing](../frontend-testing/SKILL.md)                         | Tests, Vitest, what to skip, Playwright later                |

Read **only the skills that apply**. Do not dump every file into context.

## Before writing code

1. Read `package.json` and `components.json` — do not add a competing library
2. Open the matching skill(s) above
3. Keep `app/` thin; domain UI in `components/<domain>/`; data in `lib/`
4. If you add a function with branches, add a colocated `*.test.ts`

## Ship checklist

```
- [ ] Folder: page composes; no domain logic in app/ or components/ui/
- [ ] Next: Server Component unless a leaf needs client; named exports; @/ imports
- [ ] Quality: pnpm lint, pnpm format:check, pnpm typecheck
- [ ] Tests: pnpm test if lib/ helpers or test files changed
- [ ] No src/, features/, empty hooks/api folders, no Jest
```

This is a **portfolio**. Do not scaffold auth, dashboard, or a separate E2E repo.

Human prompt recipes (new page, section, blog post, design ideas): [README.md](../../README.md).
