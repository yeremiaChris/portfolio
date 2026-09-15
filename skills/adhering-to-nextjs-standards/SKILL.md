---
name: adhering-to-nextjs-standards
description: >-
  Applies professional Next.js App Router standards: Server Components by
  default, "use client" as deep as possible, @/ imports, typed props, Valibot,
  React Hook Form, Day.js, TanStack Query, and detected UI kits (shadcn or
  HeroUI). Use when writing or reviewing Next.js/React UI, forms, server
  actions, data fetching, or App Router components.
---

# Adhering to Next.js Standards

Write and review Next.js App Router code against this team's standards.
Do not add libraries this repo does not already use unless the task needs them.

## 1. Detect project stack first

Read `package.json` and `components.json` before generating code.

| If present                                       | Use                                                 |
| ------------------------------------------------ | --------------------------------------------------- |
| `components.json` or `shadcn` / `@base-ui/react` | **shadcn/ui** — extend existing `components/ui`     |
| `@heroui/react`                                  | **HeroUI** — extend HeroUI                          |
| `valibot`                                        | Valibot (`v.InferOutput`)                           |
| `react-hook-form`                                | React Hook Form + Valibot resolver                  |
| `@tanstack/react-query`                          | TanStack Query for **client** fetch/cache/mutations |
| `dayjs`                                          | Day.js for date display/manipulation                |

Do **not** introduce a competing UI kit, Zod next to Valibot, a second date library, or a second data-fetching client.

If a library is missing and the task truly needs it, add **that** library — not a substitute.

Also follow [setup-frontend-quality](../setup-frontend-quality/SKILL.md) for lint/format and [frontend-folder-structure](../frontend-folder-structure/SKILL.md) for where files live. Prefer `@/` imports; no `../`.

## 2. Server vs client

- Default to **Server Components**.
- Add `"use client"` only where interactivity, browser APIs, or client hooks are required. Push it to the **smallest** leaf.
- Fetch initial data on the server (`fetch` / DB) when you can. Use TanStack Query on the client for later cache, refetch, and mutations — if the project already has it.

## 3. File structure (every component)

1. `"use client"` (only if needed)
2. Imports (see grouping below)
3. Types (`interface` for props)
4. Constants / helpers local to the file
5. Named export component
6. Subcomponents in the same file only if they are tiny and private

**Import grouping**

```ts
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
```

1. Packages (`next`, `react`, libs)
2. Blank line
3. `@/` aliases (components, then lib/hooks)
4. Same-folder `./` only

No PropTypes. No default export for shared UI. Pages and layouts **do** default-export (Next requirement).

## 4. Props

```tsx
interface CardProps {
  title: string;
  count?: number;
}

export function Card({ title, count = 0 }: CardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{count}</p>
    </article>
  );
}
```

- `interface` + destructuring defaults
- Callbacks named `on*` in props, `handle*` in the implementation

## 5. Hooks

- Follow Rules of Hooks (top level, no conditional calls)
- `useMemo` / `useCallback` only when measured or when a child is actually memoized and the identity matters
- Do not memoize by default

## 6. Forms, validation, dates, data

- **Valibot** at form, server action, and API boundaries. Types via `v.InferOutput<typeof schema>`
- **React Hook Form** + Valibot resolver for non-trivial forms
- Native `<form>` + Server Actions is fine for simple cases
- Server Actions: validate input, do one job, `revalidatePath` / `revalidateTag` as needed
- **Day.js** in UI date code — do not sprinkle raw `Date` math in components
- **TanStack Query** for client fetching; Server Components + `fetch` for first paint

## 7. Async, errors, a11y, performance

- Recoverable client work: `try` / `catch` + user-facing feedback + cleanup in `finally` when needed
- Route failures: `error.tsx`, `not-found.ts` — not a giant try/catch in every page
- Semantic HTML, keyboard access, accessible names (don't rely on placeholder-as-label)
- Measure before optimizing. Prefer Server Components + streaming over premature memoization

## 8. Anti-patterns

- God components and deep prop drilling — split or use composition
- Default exports for shared UI
- Mixing Zod and Valibot, or two UI kits
- `"use client"` on a whole page when only a button needs it
- Ignoring TypeScript errors (`as any`, `@ts-ignore`, unused `any`)
- Fetching in a Client Component when the server can do it

## Checklist

```
- [ ] Detected stack from package.json / components.json
- [ ] Server Component unless client is required
- [ ] "use client" at the leaf
- [ ] Named export (except Next page/layout)
- [ ] @/ imports, typed props, no PropTypes
- [ ] Validation = Valibot when validating
- [ ] Forms = RHF when non-trivial
- [ ] Dates = Day.js when present / when adding date UI
- [ ] Client cache = TanStack Query when present
- [ ] UI = existing kit only
```

Examples: [reference.md](reference.md)
