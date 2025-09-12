# Version 2.x Changelog

## 2025-09-12

### Changed

- CSS de-nesting across layout and typography styles; removed reliance on CSS nesting.
- Simplified `Header`, `Aside`, `Main`, and `Footer` styles to match current markup.
- Grid-driven layout remains desktop-first with breakpoints at `<=64rem` and `<=48rem`.
- Removed unused imports and rules (e.g., Allura font, skip-link, nav/menu placeholders).

### Fixed

- Ensure `.aside__bottom` styles apply reliably by unnesting selectors.
- Avoid double height calculations by removing `min-height` from `main`.
