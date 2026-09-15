---
name: frontend-folder-structure
description: >-
  Documents this Next.js portfolio's domain-based folder layout: thin app/
  routes, components/{domain} plus components/ui, lib/ data, colocated Vitest,
  Playwright in e2e/. Use when adding pages, components, lib modules, tests, or
  when the user asks where code should live or how the project is organized.
---

# Frontend Folder Structure

This is a **portfolio**, not a product dashboard. Keep the current domain layout. Do **not** introduce `src/`, `features/`, empty `hooks/` / `actions/` folders, or a separate E2E repo.

Also follow [adhering-to-nextjs-standards](../adhering-to-nextjs-standards/SKILL.md), [setup-frontend-quality](../setup-frontend-quality/SKILL.md), and [frontend-testing](../frontend-testing/SKILL.md).

## Layout

```text
app/                      # Routes only — compose, don't dump UI
  page.tsx                # Home
  blog/page.tsx
  blog/[slug]/page.tsx
  about/  experience/  projects/
  feed.xml/route.ts
  not-found.tsx  layout.tsx  globals.css
components/
  ui/                     # shadcn primitives — no domain logic
  blog/  about/  experience/  projects/  home/
  Header.tsx  Footer.tsx  Container.tsx
lib/                      # Domain data + shared helpers
  blog.ts  blog.test.ts   # Vitest next to the module
  experience.ts  projects.ts  about.ts  site.ts
content/blog/             # MDX posts (not React)
e2e/                      # Playwright only (*.spec.ts) — add when E2E lands
vitest.config.mts
```

Path alias: `@/*` → repo root. Prefer `@/` over `../`. Same-folder `./` is allowed (colocated tests use it).

## Rules

| Put here                   | Examples                                                     |
| -------------------------- | ------------------------------------------------------------ |
| `app/.../page.tsx`         | Thin page: fetch/compose from `lib/` + `components/<domain>` |
| `app/layout.tsx`           | Root chrome (Header/Footer), fonts, metadata                 |
| `app/.../route.ts`         | Route Handlers (`feed.xml`)                                  |
| `components/<domain>/`     | Feature UI (`BlogHeader`, `ExperienceTimeline`)              |
| `components/ui/`           | shadcn only (`button`, `card`, `badge`)                      |
| `lib/<domain>.ts`          | Copy, types, pure helpers (`getAllPosts`, role data)         |
| `content/blog/*.mdx`       | Post bodies + frontmatter                                    |
| `*.test.ts` next to source | Vitest unit/component tests                                  |
| `e2e/*.spec.ts`            | Playwright journeys — not colocated with `app/`              |

## Do / don't

- **Do** keep pages thin — import and compose, no large JSX blobs
- **Do** name domain UI clearly (`BlogPostCard`, not `Card` inside `blog/`)
- **Do** colocate Vitest as `lib/blog.test.ts` / `FsmLab.test.tsx`
- **Don't** put domain types, copy, or helpers under `app/`
- **Don't** put business logic in `components/ui/`
- **Don't** add `features/`, `src/`, `__tests__/`, or empty `hooks/` / `api/` / `types.ts`
- **Don't** put Playwright next to `page.tsx` or in another repository

## Adding a page or domain

1. Data/copy in `lib/<domain>.ts` (types live next to the data)
2. UI in `components/<domain>/`
3. Thin `app/<route>/page.tsx` that composes those
4. Tests beside the module that can break (`lib/*.test.ts`); see [frontend-testing](../frontend-testing/SKILL.md). E2E later in `e2e/`

Shared across 2+ pages (Header, Footer, Container, `ContactCta`) stays at `components/` root or `components/home/` — don't duplicate into every domain.

## Current domains

- `home` — hero, artifacts lab, milestones, tech stack, contact CTA
- `blog` — listing, featured, TOC, MDX pipeline, RSS
- `about` — header, story, daily workflow
- `experience` — header, metrics, timeline, disciplines
- `projects` — header + grid

Revisit `features/` only if this becomes a product app (auth, dashboard, server actions, several contributors). Until then, stay.

Examples: [reference.md](reference.md)
