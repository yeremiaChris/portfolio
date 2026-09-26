---
name: frontend-testing
description: >-
  Vitest unit tests for functions with branches, colocated *.test.ts, Playwright
  later in e2e/. Use when adding tests, touching lib/ helpers, CI test scripts,
  or deciding what to test vs skip in this Next.js portfolio.
---

# Frontend Testing

Smart testing, not coverage. This portfolio has **no auth/checkout** — keep the suite small.

Also follow [frontend-folder-structure](../frontend-folder-structure/SKILL.md) and [setup-frontend-quality](../setup-frontend-quality/SKILL.md).

## Stack

| Layer             | Tool                              | When                                        |
| ----------------- | --------------------------------- | ------------------------------------------- |
| Unit / pure logic | **Vitest** (`pnpm test`)          | Functions with branches                     |
| Component         | Vitest + RTL                      | Interactive client leaves only              |
| E2E               | **Playwright** in `e2e/*.spec.ts` | App Router journeys — add when ready        |
| Static            | TypeScript + ESLint               | Already in CI — do not duplicate with tests |

- `test`: `vitest run` (CI). `test:watch`: `vitest`
- Config: `vitest.config.mts` — `environment: "node"`, `include: **/*.test.{ts,tsx}`, exclude `e2e`
- Import `describe` / `it` / `expect` from `vitest` — no globals
- Do **not** add jsdom, RTL, or `@vitejs/plugin-react` until a component test needs them
- Do **not** use Jest

## What to test

**Yes**

- `lib/blog.ts` — already covered in `lib/blog.test.ts` (slugs, drafts, headings, dates, featured, RSS)
- New helpers with real branches (filters, parsers, XML, date formatting)

**No**

- Static copy: `about.ts`, `experience.ts`, `projects.ts`, `site.ts`, `artifacts.ts`
- Presentational UI: cards, Header, `AboutWorkflow`
- `lib/mdx.ts` plugin config, `lib/utils.ts` (`cn` re-export)
- Snapshotting pages/components
- Coverage % as a goal

## Layout

- Colocate: `lib/blog.ts` → `lib/blog.test.ts`
- Same-folder `./` imports are required here (not `../`)
- Never `__tests__/`, never tests under `app/`
- Playwright (later): `e2e/*.spec.ts` only — list → post → 404, optional `/feed.xml`

## Adding a test

1. Confirm there is a branch or user-visible failure mode
2. Put `*.test.ts` next to the module
3. Run `pnpm test`
4. CI must keep `pnpm test` after typecheck — do not rely on local runs only

Examples: [reference.md](reference.md)
