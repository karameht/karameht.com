# Version 2.0 Guide

This guide documents the BaseLayout + Grid refactor and CSS cleanup introduced in v2.

## Highlights

- Desktop-first CSS with two breakpoints:
  - `@media (width <= 64rem)`
  - `@media (width <= 48rem)`
- CSS de-nesting: replaced nested selectors with flat, standard CSS.
- Simplified layout styles: Header, Aside, Main, Footer only keep what’s used.
- A11y helpers preserved: focus-visible, reduced-motion, typography improvements.
- Navigation + HeaderActions integrated; mobile menu controlled by `src/scripts/components/menu.ts`.

## Layout Structure

- Grid template (`src/styles/layouts/_grid.css`) defines header/aside/main/footer tracks.
- Fixed Header and Aside; Main fills remaining space; Footer stays at bottom.
- Aside hides below 64rem to maximize content area.
- Main content: optional `.main__section` container centers content and caps width at 60rem.

## Client Scripts

- Global entry: `src/scripts/karameht.ts` (loaded in `BaseLayout.astro` via `<script src="/src/scripts/karameht.ts"></script>`; Astro processes this for bundling and TS support).
- Menu logic: `src/scripts/components/menu.ts` exports `initMenu()`; initializes on `DOMContentLoaded` and `astro:page-load`.

## Components

- `src/components/Navigation.astro`
  - Props: `class?`, `ariaLabel?`, `id?` (forwarded to `<nav>`).
  - Used twice in `Header.astro` for desktop and mobile.
- `src/components/HeaderActions.astro`
  - Icons + menu toggle button (`#menuToggle`).
- `src/components/Header.astro`
  - Adds `.header__logo` on the link; `<Logo />` no longer carries the container class.

## Files Touched

- `src/styles/layouts/_header.css` (flattened selectors)
- `src/styles/layouts/_aside.css` (flattened `.aside__top/.aside__bottom`)
- `src/styles/layouts/_main.css` (no min-height; grid controls height; `.main__section` width cap)
- `src/styles/layouts/_footer.css` (flattened, minimal rules; legal links styled like copyright)
- `src/styles/base/_global.css` (pruned unused globals)
- `src/styles/base/_typography.css` (flattened anchors, lists, blockquotes, address)

## Conventions

- BEM-like class names without nested CSS.
- Keep selectors shallow; prefer single-class selectors.
- Only add rules when markup needs them; avoid speculative styles.
