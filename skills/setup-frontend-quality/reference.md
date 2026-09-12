# Frontend quality templates

Copy these into the target repo and adjust ignores/package manager.

## eslint.config.mjs (Next.js 16 flat)

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

## .prettierrc.json

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

Skip the Tailwind plugin if the project does not use Tailwind.

## .prettierignore

```txt
node_modules
.yarn
.next
out
build
coverage
dist
yarn.lock
package-lock.json
pnpm-lock.yaml
next-env.d.ts
*.tsbuildinfo
.vercel
.env*
public
```

## .husky/pre-commit

```sh
yarn lint-staged
```

## .vscode/settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## .vscode/extensions.json

```json
{
  "recommendations": ["dbaeumer.vscode-eslint", "esbenp.prettier-vscode"]
}
```

## Sanity commands

```bash
yarn lint
yarn lint:fix
yarn format
yarn format:check
yarn typecheck
```
