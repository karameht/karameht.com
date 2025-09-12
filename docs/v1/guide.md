# Version 1.0 Guide

This document summarizes the setup, tooling, and workflows for karameht.com (version 1.0).

## Stack & Structure

- Framework: `astro@^5`
- MDX: `@astrojs/mdx`
- React (for A11yLens): `@astrojs/react`, `react`, `react-dom` (dev-only)
- Package manager: `yarn` (v1)
- Source layout:
  - `src/` with `components/`, `content/`, `layouts/`, `pages/`, `scripts`, `styles`, `types/`
  - `public/` for static assets

## TypeScript & Types

- `tsconfig.json`
  - `extends`: `astro/tsconfigs/strict`
  - `compilerOptions.baseUrl`: `.`
  - `compilerOptions.paths`: `@/* -> src/*`
  - `include`: `src`, `.astro`, `astro.config.*`
  - `exclude`: `dist`, `node_modules`
- `src/env.d.ts`: `/// <reference types="astro/client" />`

## Astro Config

- `astro.config.mjs`
  - `site`: `https://karameht.com`
  - `integrations`:
    - `@astrojs/mdx` always
    - `@astrojs/react` only in development: `const isDev = process.env.NODE_ENV !== 'production'`
  - Vite alias: `"@" -> fileURLToPath(new URL('./src', import.meta.url))`
  - `devToolbar.enabled = false`

## Formatting & Linting

- Prettier
  - `.prettierrc`: uses `prettier-plugin-astro`; Astro files `parser: 'astro'`
  - `.prettierignore`: ignores `dist/`, `.astro/`, `node_modules/`, `public/`, `yarn.lock`
- Remark (Markdown/MDX)
  - `.remarkrc.json`: `remark-preset-lint-recommended`, `remark-gfm`, `remark-mdx`
  - `.remarkignore`: ignores `node_modules/`, `dist`, `.astro/`, `public/`

## VS Code

- `.vscode/settings.json`:
  - Format on save; formatters (Astro extension for `.astro`, Prettier for others)
  - TS SDK: `node_modules/typescript/lib` for VS Code and Astro
- `.vscode/extensions.json`: recommendations: Astro, Prettier, MDX

## Git Hooks (Husky) & Staged Formatting

- Dev dependencies: `husky`, `lint-staged`
- `package.json` → `prepare`: `husky` (Husky v9)
- `lint-staged` config:
  - `*.{js,jsx,ts,tsx,astro,css,scss,html,json,yml,yaml}` → `prettier --write`
  - `*.{md,mdx}` → `prettier --write` + `remark --quiet --frail`
- Hooks (Bash/Posix) in `.husky/` write logs to `.logs/` (gitignored):
  - `pre-commit`: `lint-staged` → `prettier --check` → `remark` → `tsc --noEmit` → `astro check`
  - `commit-msg`: min length, optional conventional-commits prompt
  - `pre-push`: branch protection + `yarn validate` + cleanup `dist/`

## NPM/Yarn Scripts

- `dev`: start Astro dev server
- `build`: build static site
- `preview`: preview build
- `astro`: direct Astro CLI
- `astro:check`: `astro check`
- `format`: `prettier --write .`
- `format:check`: `prettier --check .`
- `lint:md`: `remark . --quiet --frail --ext .md,.mdx`
- `lint`: `astro check && prettier --check . && remark ...`
- `md:format`: format Markdown/MDX in-place via Remark
- `fix`: `yarn md:format && yarn format`
- `validate`: `yarn lint && yarn build`
- `ready`: `yarn fix && yarn validate`

## Environment Variables

- Currently unused. For client-side vars, prefix with `PUBLIC_` and access via `import.meta.env.PUBLIC_*`.

## Accessibility Tooling (A11yLens)

- Package: `@karameht/a11y-lens`
- React integration: `@astrojs/react` + `react`/`react-dom` installed
- Usage in Astro:
  - Wrapper: `src/components/A11yLensClient.astro`
    - `import { A11yLens } from '@karameht/a11y-lens'`
    - `import '@karameht/a11y-lens/styles.css'`
    - `<A11yLens client:load />`
  - Included in `src/pages/index.astro` only in dev via dynamic import:
    - `if (import.meta.env.DEV) { const mod = await import('...A11yLensClient.astro'); }`
  - Result: In production, React is not enabled and the A11yLens code is neither bundled nor executed.
- Optional env to force dev UI:
  - `.env` (if used): `ASTRO_ENV=development` or `VITE_A11Y_LENS_ENV=development`

## Known Fixes & Notes

- Removed Prettier option `astroSortAttributes` (not supported by plugin).
- Git `core.hooksPath` set to `.husky`; removed legacy `.husky/_`.
- Removed accidental `--help/` directory.

## Suggested Workflow

1. Develop: `yarn dev`
2. Auto-fix + validate before commit: `yarn ready`
3. Commit/push: hooks enforce checks; logs under `.logs/`
4. Quick CI-style check: `yarn validate`

## Troubleshooting

### Git Hooks: `set: Illegal option -o pipefail`

- Cause: The hook runs with `sh`/`dash` instead of `bash`.
- Fix:
  - Hooks guard `pipefail` with `BASH_VERSION` (implemented).
  - Ensure Git loads hooks from `.husky`: `git config core.hooksPath .husky`.
  - Ensure executables: `git update-index --chmod=+x .husky/pre-commit .husky/commit-msg .husky/pre-push`.
  - Inspect logs under `.logs/`.
  - Temporarily skip: `git commit --no-verify` (not recommended).

### Large dev chunks (axe-core)

- In development, Vite may warn about large bundles due to `axe-core`. In production, React/A11yLens are disabled and not bundled.
