# yeremia.dev

Personal portfolio — Next.js 16 App Router, shadcn/ui, MDX blog.

## Getting started

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000)

| Script                                               | What                  |
| ---------------------------------------------------- | --------------------- |
| `pnpm dev`                                           | Turbopack dev server  |
| `pnpm lint` / `pnpm format:check` / `pnpm typecheck` | Quality gates         |
| `pnpm test`                                          | Vitest (`vitest run`) |
| `pnpm build`                                         | Production build      |

CI runs lint → format → typecheck → test → build.

## Skills (how we work with the agent)

Rules for this portfolio live in [`skills/`](./skills). Copy a skill into `.cursor/skills/` (gitignored) when Cursor should auto-load that committed copy.

Start here: [`skills/follow-project-skills/SKILL.md`](./skills/follow-project-skills/SKILL.md)

| Skill                                                                          | Use it for                                 |
| ------------------------------------------------------------------------------ | ------------------------------------------ |
| [follow-project-skills](./skills/follow-project-skills/SKILL.md)               | Always — catalog + ship checklist          |
| [portfolio-compound-loop](./skills/portfolio-compound-loop/SKILL.md)           | This repo's additions to the personal loop |
| [frontend-folder-structure](./skills/frontend-folder-structure/SKILL.md)       | New page, section, where files go          |
| [adhering-to-nextjs-standards](./skills/adhering-to-nextjs-standards/SKILL.md) | UI, `"use client"`, props, stack           |
| [setup-frontend-quality](./skills/setup-frontend-quality/SKILL.md)             | ESLint, Prettier, Husky, CI                |
| [frontend-testing](./skills/frontend-testing/SKILL.md)                         | Vitest vs skip vs Playwright later         |

**Prompting habit:** `@`-mention the skill files so they are in context even if auto-invoke misses. Approve the plan, then the result.

The generic loop is a personal skill at `~/.cursor/skills/compound-loop/` and loads in every repo. New repos get a thin `skills/project/SKILL.md` from `~/.cursor/skills/bootstrap-agent-repo/` instead of copying this portfolio. This repo's extra rules are [`portfolio-compound-loop`](./skills/portfolio-compound-loop/SKILL.md).

Layout reminder: thin `app/` page → `components/<domain>/` UI → `lib/<domain>.ts` copy/data. Plans go in `docs/plans/`. Solved problems go in `docs/solutions/`. No `src/`, no `features/`, no empty `hooks/` folders.

### Run a change

Plan (Ask mode):

```text
@skills/portfolio-compound-loop/SKILL.md
@skills/follow-project-skills/SKILL.md

Plan only. Do not write feature code.
Add a /speaking page, same shape as About.
Write docs/plans/speaking-page.md and stop.
```

After you approve the plan (Agent mode):

```text
@docs/plans/speaking-page.md
@skills/portfolio-compound-loop/SKILL.md

Implement the plan. Run the ship checklist.
```

After it works:

```text
@skills/portfolio-compound-loop/SKILL.md

Compound this. Write docs/solutions only if a future session would otherwise repeat the mistake.
```

### Plan shape: new page

A plan file should name the files and the pattern to copy:

```text
Add a /speaking page.
- Copy/data in lib/speaking.ts
- UI in components/speaking/
- Thin app/speaking/page.tsx that composes those
- Match About / Experience (Container, Card, mono eyebrow, Header nav link)
- Server Components unless a leaf needs client
- Do not add empty hooks/ or api/ folders
```

### Add a new section (existing page)

```text
@skills/portfolio-compound-loop/SKILL.md
@skills/follow-project-skills/SKILL.md
@skills/frontend-folder-structure/SKILL.md

Plan only. Do not write feature code.
Add a section on About after the journey, same pattern as How I work.
Write docs/plans/about-section.md and stop.
- Copy in lib/about.ts
- Named export in components/about/
- Compose it from app/about/page.tsx only
- shadcn Card / Badge, no new UI kit
```

### Add a blog post

Do **not** edit `app/blog/page.tsx`. Posts are MDX; the listing reads `content/blog/` automatically.

```text
@skills/follow-project-skills/SKILL.md
@content/blog/how-web-fonts-work.mdx

Add a new post at content/blog/my-slug.mdx.
- Frontmatter: title, description, date (YYYY-MM-DD), tags, featured
- Match the existing post voice: hook + one-sentence answer, then sections
- Keep it honest to this repo (no fake features)
- featured: true only if we should replace the current featured post
```

Drafts: `draft: true` in frontmatter — hidden in production (`lib/blog.ts`).

### Design / ideas (no files yet)

Stay in **Ask mode**. Ask for options, then implement in Agent mode.

```text
@skills/follow-project-skills/SKILL.md
@app/about/page.tsx
@components/about/AboutWorkflow.tsx

Don't write files. Propose 2 layouts for a tools/AI-workflow section on About.
Match the existing dark + green language. Say what you'd skip.
```

```text
@skills/frontend-folder-structure/SKILL.md

Where should a new "uses" page live vs a section on About? Recommend one and why.
```

## Tests

Vitest only for **functions with branches** (today: `lib/blog.test.ts`). Skip static copy and presentational cards. See [frontend-testing](./skills/frontend-testing/SKILL.md).

## Deploy

Vercel. Production: [Next.js deploying docs](https://nextjs.org/docs/app/building-your-application/deploying).
