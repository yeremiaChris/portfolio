---
name: portfolio-compound-loop
description: >-
  Portfolio-specific additions to the compound loop for yeremia.dev: yarn
  gates, folder layout, blog MDX, and AGENTS.md. Use with the compound-loop
  skill when planning, implementing, reviewing, or compounding a change in
  this portfolio.
---

# Portfolio loop

Follow the personal `compound-loop` skill (`~/.cursor/skills/compound-loop/SKILL.md`) for Plan, Work, Review, and Compound. That skill is the cross-repo procedure. This file is only what is true here.

- Search `docs/solutions/` before writing code. Plans go in `docs/plans/`. Do not put either in `content/blog/` or `AGENTS.md` (Next regenerates `AGENTS.md`).
- Match thin `app/` pages, UI in `components/<domain>/`, data in `lib/`. Domains and ship checklist: [follow-project-skills](../follow-project-skills/SKILL.md) and [frontend-folder-structure](../frontend-folder-structure/SKILL.md).
- Run `yarn lint`, `yarn format:check`, and `yarn typecheck`. Run `yarn test` when `lib/` helpers or test files changed.
- Exercise UI changes in the browser.
- This is a portfolio. Do not scaffold auth, a dashboard, or a separate E2E repo.
- Posts are MDX in `content/blog/`. Do not edit `app/blog/page.tsx` to add a post.
- After editing a skill under `skills/`, copy it to `.cursor/skills/` (gitignored) so Cursor auto-loads it in this repo.
