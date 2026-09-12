---
name: setup-frontend-quality
description: >-
  Sets up ESLint, Prettier, TypeScript typecheck, Husky, and lint-staged for
  Next.js/React frontend repos. Use when the user asks to add linting,
  formatting, code quality tooling, pre-commit hooks, eslint-config-prettier,
  or frontend quality best practices to a project. Source of truth lives in
  skills/setup-frontend-quality/ for consistent tooling across repos.
---

# Setup Frontend Quality Tooling

Install and wire **ESLint + Prettier + typecheck + Husky + lint-staged** so the repo is a repeatable frontend quality baseline.

This guide lives in `skills/setup-frontend-quality/` so anyone can follow the **same** setup — Cursor is not required.

## Defaults (best practice)

| Concern         | Choice                                              |
| --------------- | --------------------------------------------------- |
| Linter          | ESLint **9.x** + `eslint-config-next` (flat config) |
| Formatter       | Prettier 3 + `eslint-config-prettier/flat` last     |
| Tailwind        | `prettier-plugin-tailwindcss` (must be last plugin) |
| Hooks           | Husky 9 + lint-staged (staged files only)           |
| TypeScript      | **5.9.x** until typescript-eslint supports TS 7     |
| Package manager | Match the repo (`yarn` / `pnpm` / `npm`)            |

Do **not** use `next lint` on Next.js 16+ — use the ESLint CLI (`eslint .`).

## Workflow checklist

Copy and track:

```
- [ ] Detect package manager + existing eslint/prettier/husky
- [ ] Pin compatible eslint@^9 and typescript@~5.9 if needed
- [ ] Install prettier, eslint-config-prettier, prettier-plugin-tailwindcss, husky, lint-staged
- [ ] Write eslint.config.mjs (Next flat + prettier last + ignores)
- [ ] Write .prettierrc.json + .prettierignore
- [ ] Add package.json scripts + lint-staged
- [ ] Init Husky pre-commit → lint-staged
- [ ] Optional: .vscode/settings.json + extensions.json
- [ ] Run format, lint, typecheck; fix real errors
```

## 1. Install

Yarn example (adapt for pnpm/npm):

```bash
yarn add -D eslint@^9 eslint-config-next eslint-config-prettier prettier prettier-plugin-tailwindcss husky lint-staged typescript@~5.9
```

If the project already has `eslint-config-next`, only add the missing packages.

**Version traps**

- ESLint **10** currently breaks `eslint-plugin-react` (`getFilename is not a function`) → stay on **9.x**
- TypeScript **7** breaks `typescript-eslint` → stay on **5.9.x** for now

## 2. ESLint flat config

Replace legacy FlatCompat setups with native Next flat exports.

See templates in [reference.md](reference.md).

Rules:

- Spread `eslint-config-next/core-web-vitals` and `.../typescript`
- Put `eslint-config-prettier/flat` **last**
- Ignore `.next`, `out`, `build`, `coverage`, `node_modules`, `next-env.d.ts`

## 3. Prettier

- `.prettierrc.json` with `prettier-plugin-tailwindcss` as the only/last plugin
- `.prettierignore` for deps, builds, lockfiles, generated files

## 4. package.json scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,mjs,cjs}": ["eslint --fix", "prettier --write"],
    "*.{json,md,mdx,css,yml,yaml}": ["prettier --write"]
  }
}
```

Run Prettier **after** `eslint --fix` so formatting wins.

## 5. Husky

```bash
yarn prepare
# or: yarn husky init
```

`.husky/pre-commit`:

```sh
yarn lint-staged
```

Use the repo’s package manager in the hook (`pnpm lint-staged` / `npx lint-staged`).

## 6. Editor (recommended for guide repos)

`.vscode/settings.json`: format on save via Prettier, ESLint fix on save.  
`.vscode/extensions.json`: recommend `dbaeumer.vscode-eslint` + `esbenp.prettier-vscode`.

## 7. Verify

```bash
yarn format
yarn lint
yarn typecheck
yarn format:check
```

Fix lint errors (do not blanket-disable rules). One format pass on first setup is expected.

## Non-Next React repos

Use `@eslint/js` + `typescript-eslint` + `eslint-plugin-react` + `eslint-plugin-react-hooks` instead of `eslint-config-next`. Still end with `eslint-config-prettier/flat`.

## Out of scope

- Do not create blog posts unless asked
- Do not force-push or amend git history
- Do not commit unless the user asks
