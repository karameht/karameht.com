# Version 2.0 Guide

This guide documents the BaseLayout + Grid refactor and CSS cleanup introduced in v2.

## Highlights

- Desktop-first CSS with two breakpoints:
  - `@media (width <= 64rem)`
  - `@media (width <= 48rem)`
- CSS de-nesting: replaced nested selectors with flat, standard CSS.
- Simplified layout styles: Header, Aside, Main, Footer only keep what’s used.
- A11y helpers preserved: focus-visible, reduced-motion, typography improvements.

## Layout Structure

- Grid template (`src/styles/layouts/_grid.css`) defines header/aside/main/footer tracks.
- Fixed Header and Aside; Main fills remaining space; Footer stays at bottom.
- Aside hides below 64rem to maximize content area.

## Files Touched

- `src/styles/layouts/_header.css` (flattened selectors)
- `src/styles/layouts/_aside.css` (flattened `.aside__top/.aside__bottom`)
- `src/styles/layouts/_main.css` (no min-height; grid controls height)
- `src/styles/layouts/_footer.css` (flattened, minimal rules)
- `src/styles/base/_global.css` (pruned unused globals)
- `src/styles/base/_typography.css` (flattened anchors, lists, blockquotes, address)

## Conventions

- BEM-like class names without nested CSS.
- Keep selectors shallow; prefer single-class selectors.
- Only add rules when markup needs them; avoid speculative styles.
