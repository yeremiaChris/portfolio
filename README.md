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

Rules live in [`skills/`](./skills). That folder is the **source of truth**. Copy a skill into `.cursor/skills/` (gitignored) if Cursor should auto-load it.

Start here: [`skills/follow-project-skills/SKILL.md`](./skills/follow-project-skills/SKILL.md)

| Skill                                                                          | Use it for                         |
| ------------------------------------------------------------------------------ | ---------------------------------- |
| [follow-project-skills](./skills/follow-project-skills/SKILL.md)               | Always — catalog + ship checklist  |
| [frontend-folder-structure](./skills/frontend-folder-structure/SKILL.md)       | New page, section, where files go  |
| [adhering-to-nextjs-standards](./skills/adhering-to-nextjs-standards/SKILL.md) | UI, `"use client"`, props, stack   |
| [setup-frontend-quality](./skills/setup-frontend-quality/SKILL.md)             | ESLint, Prettier, Husky, CI        |
| [frontend-testing](./skills/frontend-testing/SKILL.md)                         | Vitest vs skip vs Playwright later |

**Prompting habit:** `@`-mention the skill files in the chat so they are in context even if auto-invoke misses. Use **Ask mode** for ideas; **Agent mode** + “Go” to implement.

Layout reminder: thin `app/` page → `components/<domain>/` UI → `lib/<domain>.ts` copy/data. No `src/`, no `features/`, no empty `hooks/` folders.

### Add a new page

```text
@skills/follow-project-skills/SKILL.md
@skills/frontend-folder-structure/SKILL.md
@skills/adhering-to-nextjs-standards/SKILL.md

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
@skills/follow-project-skills/SKILL.md
@skills/frontend-folder-structure/SKILL.md

Add a section on About after the journey, same pattern as How I work.
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
