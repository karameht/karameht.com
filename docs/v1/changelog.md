# Version 1.x Changelog

All notable changes for version 1.x are listed here.

## 2025-09-08

### Added

- docs: Overview of stack, tooling, scripts, and workflows (now in root `README.md`).
- Prettier + prettier-plugin-astro with repo config and ignore.
- Remark (CLI + GFM + MDX + preset-lint) with config and ignore.
- VS Code settings and recommended extensions.
- Husky + lint-staged with hooks: pre-commit, commit-msg, pre-push.
- Hook logging to `.logs/` (gitignored).
- Scripts: `check`, `format`, `format:check`, `lint`, `lint:md`, `md:format`, `fix`, `validate`, `ready`.
- MDX integration: `@astrojs/mdx` wired into `astro.config.mjs`.
- Accessibility tooling: `@karameht/a11y-lens` installed and wrapped in `A11yLensClient.astro`.
- React renderer for Astro (`@astrojs/react`) with React/ReactDOM.
- Type-check CLI: `@astrojs/check` added and integrated via `yarn check` and hooks.

### Changed

- `tsconfig.json`: simplified aliases to `@/*`, refined include/exclude.
- `astro.config.mjs`: fileURLToPath alias; devToolbar disabled.
- React integration enabled only in development (`NODE_ENV !== 'production'`).
- `src/pages/index.astro`: Dev-only dynamic import of A11yLens.
- `docs/v1/guide.md`: documented Dev-only gating, troubleshooting, and workflow; standardized docs to English.
- Docs structure: moved previous `docs/v.1.0.md` into `docs/v1/guide.md`; root `README.md` now contains the overview.
- Husky prepare script modernized to `"prepare": "husky"` (v9).

### Fixed

- Prettier config: removed unsupported `astroSortAttributes` option.
- Husky hooks: replaced Bash-specific `PIPESTATUS`/`pipefail` usage with POSIX-safe logging.
- Git hooks configuration: set `core.hooksPath` to `.husky` (removed legacy `.husky/_`).
- Removed stray `--help/` directory.

### Removed

- `.env` and `.env.example` (unused).
- Legacy `docs/v.1.0.md`; removed root `codex.md` and `docs/overview.md` in favor of `README.md` overview and versioned docs.
