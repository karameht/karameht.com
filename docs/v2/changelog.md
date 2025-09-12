# Version 2.x Changelog

## 2025-09-12

### Added

- Components: `Navigation.astro` and `HeaderActions.astro` integrated into `Header.astro`.
- Client scripts: `src/scripts/karameht.ts` (entry) and `src/scripts/components/menu.ts` (mobile menu).
- Documentation: `docs/v2/guide.md` expanded with scripts and component props.

### Changed

- CSS de-nesting across layout and typography styles; removed reliance on CSS nesting.
- Simplified `Header`, `Aside`, `Main`, and `Footer` styles to match current markup.
- Grid-driven layout remains desktop-first with breakpoints at `<=64rem` and `<=48rem`.
- Removed unused imports and rules (e.g., Allura font, skip-link, nav/menu placeholders).
- `Header.astro`: Moved `.header__logo` class to the link wrapper (SVG remains unstyled).
- `BaseLayout.astro`: Script loading now uses a static `src` attribute for Astro bundling.

### Fixed

- Ensure `.aside__bottom` styles apply reliably by unnesting selectors.
- Avoid double height calculations by removing `min-height` from `main`.
- Pre-commit hook: use `yarn astro:check` to avoid Yarn v1 `check` conflict.
