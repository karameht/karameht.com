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

## Accessibility

- Skip link: Adds a visible “Zum Inhalt springen” link as first focusable element.
  - Markup: `<a href="#main-content" class="skip-link">Zum Inhalt springen</a>`
  - Target: `<main id="main-content" tabindex="-1">` to receive focus programmatically
  - Position: desktop → top-right; mobile (`<=48rem`) → bottom-right with safe-area offset
- Landmarks: `<header>`, `<main>`, `<aside aria-hidden="true">`, `<footer>`, `<nav aria-label="…">`
- Mobile navigation (a11y):
  - Toggle button uses `aria-controls`, `aria-expanded`, and switches `aria-label` (open/close)
  - Mobile nav toggles `aria-hidden` + `inert`, traps focus, closes on `Escape`, and releases scroll on close
  - Implemented in `src/scripts/components/menu.ts`, initialized via `src/scripts/karameht.ts`
- Focus: global `:focus-visible` outlines; links keep visible underline-animation and focus outline
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables animations/transitions
- Icons: Header action SVGs are `aria-hidden="true"` and `focusable="false"`; links provide labels
- Active link: Navigation marks the current page with `aria-current="page"`

## Layout Structure

- Grid template (`src/styles/layouts/_grid.css`) defines header/aside/main/footer tracks.
- Fixed Header and Aside; Main fills remaining space; Footer stays at bottom.
- Aside hides below 64rem to maximize content area.
- Main content: optional `.main__section` container centers content and caps width at 60rem.

## Breakpoints

- Desktop-first defaults (> 64rem):
  - Header fixed at top; desktop nav visible; menu toggle hidden
  - Aside visible on the left; grid spans header/aside/main/footer
  - Skip link appears top-right on focus
- `<= 64rem` (tablet):
  - Desktop nav hidden; menu toggle shown; mobile nav overlays on open
  - Aside hidden
  - Grid reflows to header, main, aside, footer stacked
- `<= 48rem` (mobile):
  - Header pinned to bottom; logo moved to bottom-left
  - Mobile nav overlays full height above header with safe-area padding
  - Main padding reduced; skip link moves to bottom-right and remains accessible

## Client Scripts

- Global entry: `src/scripts/karameht.ts` (loaded in `BaseLayout.astro` via `<script src="/src/scripts/karameht.ts"></script>`; Astro processes this for bundling and TS support).
- Menu logic: `src/scripts/components/menu.ts` exports `initMenu()`; initializes on `DOMContentLoaded` and `astro:page-load`.

## Components

- `src/components/Navigation.astro`
  - Props: `class?`, `ariaLabel?`, `id?` (forwarded to `<nav>`).
  - Used twice in `Header.astro` for desktop and mobile.
  - Sets `aria-current="page"` automatically for the active route.
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

## CSS Nesting Setup

- Install: `yarn add -D postcss-nested`
- Config: `postcss.config.cjs`
  - `module.exports = { plugins: [ require('postcss-nested') ] }`
- Rationale: We use BEM (`.block { &__element { ... } &--modifier { ... } }`) and nested pseudo/selectors (`a { &:hover { ... } }`). `postcss-nested` supports this Sass-like syntax reliably.

### Refactor Plan to Nested

- Header (`src/styles/layouts/_header.css`)
  - Group `.header__*` under `.header { ... }`, nest `ul/li/a`, `&.open`, and pseudo-classes.
- Aside (`src/styles/layouts/_aside.css`)
  - Move `.aside__top, .aside__bottom` inside `.aside { &__top, &__bottom { ... } }`.
- Main (`src/styles/layouts/_main.css`)
  - Move `.main__section` inside `main { &__section { ... } }`.
- Footer (`src/styles/layouts/_footer.css`)
  - Move `.footer__left p` and `.footer__links a:hover` inside `.footer { ... }`.
- Typography (`src/styles/base/_typography.css`)
  - Nest `ul li::marker`, `a::after`, `a:hover::after`, `blockquote::after`, `blockquote p/cite`, `address p`.

Once `postcss-nested` is installed, we can safely convert each file; the end result is identical CSS output with cleaner structure.
