# Abuzar Raziq — portfolio

One long, fast, responsive page for a backend engineer looking for a first internship or junior role. A recruiter must understand who he is, see real work and find the contact button within 10 seconds, on any screen from 320px to 2560px.

Look: light page, soft yellow glow at the top, giant name, floating pill nav, big rounded project cards with device shots, a polaroid-and-doodle "story", a huge glossy "Connect" button that opens a dock of links. Motion: rich, but CSS-only.

## Read order
1. `docs/DESIGN.md` and `docs/PERFORMANCE.md` (loaded automatically)
2. `content/` is the single source of truth for every word and image
3. Skills load on demand: `portfolio-intake`, `css-motion`, `image-pipeline`, `responsive-qa`, `anti-slop-review`, `ship-to-workers`

## Stack (decided, do not swap without asking)
- Astro, latest stable, static output, TypeScript strict. Zero client JS by default.
- Plain CSS: `src/styles/tokens.css`, `global.css`, and scoped `<style>` in components. No Tailwind, UI kit, animation library, or React/Vue islands.
- Allowed vanilla JS: pill-nav scroll-spy (under 0.6 KB) and an optional reveal fallback (under 0.5 KB). Everything else is HTML and CSS: `popover`, `:has()`, scroll-driven animations.
- Images through `astro:assets` (AVIF + WebP). Fonts self-hosted, Latin subset, max 2 files.
- Deploy: Cloudflare Workers static assets (`wrangler.jsonc`, `assets.directory: ./dist`). No adapter, no Worker code.
- Use pnpm if installed, otherwise npm. Scaffold with `npm create astro@latest` (check `--help` for current flags), minimal template. Scaffold into a temp folder and move the files in. Never let the scaffolder clear this directory, it holds `content/`, `docs/` and `.opencode/`.

## Scripts to create in package.json
- `dev`: `astro dev`
- `build`: `node scripts/validate-content.mjs && astro build && node scripts/budget-check.mjs`
- `check`: `astro check`
- `qa`: `node scripts/qa-shots.mjs` (needs `playwright` dev dependency)
- `deploy`: `wrangler deploy` (never run unless the user asks)

## Layout
```
content/   site.yaml, story.md, projects/*.md, assets/**     user-owned, read-only for you
src/       pages/index.astro, components/, styles/, lib/content.ts (js-yaml + zod, build-time only)
public/    favicon.svg, _headers, robots.txt
scripts/   validate-content.mjs, budget-check.mjs, qa-shots.mjs
```
Components: `Nav`, `Hero`, `ProjectCard`, `Story`, `PolaroidRail`, `Collage`, `Connect`, `Dock`, `Doodle`.

## Do
- Build mobile-first. Start at 320px and enhance upward with `clamp()`, container queries and `min()`.
- Build in this order and screenshot after each step: tokens, nav, hero, work, story, collage, connect, footer.
- Make the default state (no JS, no scroll-driven animation support) fully visible and usable. Motion is an enhancement wrapped in `@supports`.
- Respect `prefers-reduced-motion` and use `@media (hover: hover)` for hover-only effects.
- Write real alt text from the content files. Keep visible focus rings. Keep contrast at WCAG AA.
- Run `npm run build` before saying anything is done, and report the budget table.
- Ask the user when something is missing (use the `portfolio-intake` skill). One message, all gaps at once.

## Never
- Invent projects, metrics, testimonials, employers, quotes, photos or links. No lorem ipsum, no stock photos, no AI-generated faces.
- Copy the reference site's copy, illustrations, photos, logos or code. Its layout and feel are inspiration only. Draw original doodles as inline SVG.
- Add a dependency without stating its gzip cost and why CSS or HTML cannot do it.
- Use `localStorage`, cookies, analytics, chat widgets, or third-party scripts.
- Animate anything except `transform`, `opacity`, `filter` and `translate/rotate/scale`. No layout-thrashing animation, no scroll listeners.
- Autoplay video above the fold. Load fonts or images from a third-party host.
- Run `/init` (it would overwrite this file), `git push`, or `wrangler deploy` unless the user asks.

## Copy voice
First person, plain words, specific over impressive. Short sentences. No "passionate", "cutting-edge", "leverage", "seamless". Numbers only if the user supplied them.

## Definition of done
- `npm run build` passes (content validation, Astro build, budgets).
- `npm run qa` shows no horizontal overflow at any listed viewport.
- Lighthouse mobile: Performance 98+, Accessibility 100, Best Practices 100, SEO 100.
- `anti-slop-review` finished, two passes maximum.
