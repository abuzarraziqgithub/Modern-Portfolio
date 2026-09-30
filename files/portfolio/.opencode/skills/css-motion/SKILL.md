---
name: css-motion
description: Use when adding or changing any animation, hover effect, scroll effect, the pill nav, polaroid rail, sticky project cards, collage drift, the Connect button or the link dock. CSS-only recipes with fallbacks, reduced-motion handling and browser-support rules.
---

# CSS-only motion

## Rules
- Default state is complete and visible with no JS and no scroll-driven support. Motion is an enhancement.
- Scroll-driven animations (`animation-timeline`) work in Chromium and Safari 26+, and were still behind a flag in stable Firefox as of mid-2026. Always wrap them in `@supports (animation-timeline: view())`. Declare `animation-timeline` AFTER the `animation` shorthand and always set `animation-range`.
- Animate only `transform`, `translate`, `rotate`, `scale`, `opacity`, `filter`. One orchestrated load sequence (hero), everything else answers scroll or a user action. No per-letter spans, no scroll listeners, no animation libraries.
- Hover effects inside `@media (hover: hover)`. Every effect needs a touch equivalent or is decorative only.

## Tokens
```css
:root { --ease-out: cubic-bezier(.22,1,.36,1); --spring: cubic-bezier(.34,1.56,.64,1); }
```

## Recipes
**Hero glow (breathing)**
```css
.hero::before { content:""; position:absolute; inset:0; z-index:-1;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, var(--glow-1), var(--glow-2) 45%, transparent 75%);
  animation: breathe 9s ease-in-out infinite; }
@keyframes breathe { 50% { transform: scale(1.06); opacity: .9; } }
```

**Name intro (word level)**
```css
.name span { display:inline-block; animation: rise .9s var(--ease-out) both; animation-delay: calc(var(--i) * 90ms); }
@keyframes rise { from { translate: 0 40%; opacity: 0; filter: blur(10px); } }
```

**Hero polaroid** (animate the wrapper, hover the inner figure so they do not fight)
```css
.peek { translate: 0 30%; scale: .9; opacity: 0; animation: pop .7s var(--spring) 1.4s forwards; }
@keyframes pop { to { translate: 0 0; scale: 1; opacity: 1; } }
.peek figure { rotate: 6deg; transition: rotate .4s var(--spring), scale .4s var(--spring); }
@media (hover:hover) { .peek figure:hover { rotate: 2deg; scale: 1.05; } }
```

**Scroll reveal (headings, tiles)**
```css
@supports (animation-timeline: view()) {
  .reveal { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
}
@keyframes reveal { from { opacity: 0; filter: blur(8px); translate: 0 24px; } }
```

**Stacking project cards**
```css
.stack { display: grid; gap: 1.5rem; }
.stack .card { position: sticky; top: calc(4.5rem + var(--i) * 14px); }
```
Set `--i` per card (0, 1, 2). Below 700px use `position: static`.

**Pill nav.** Fixed top-centre, `backdrop-filter: blur(12px)`, active item styled via `[aria-current]` with a transition on `background` and `color`. Scroll-spy (the only nav JS, keep under 0.6 KB):
```js
const links = [...document.querySelectorAll('nav a[href^="#"]')];
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  links.forEach((l) => l.toggleAttribute('aria-current', l.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
links.forEach((l) => { const s = document.querySelector(l.hash); s && io.observe(s); });
```

**Polaroid rail**
```css
.rail { display:flex; gap:1.25rem; overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; padding-inline:1rem; }
.rail figure { flex:0 0 min(70%, 320px); scroll-snap-align:center; rotate: var(--r, -2deg); background:#fff; padding:12px 12px 44px; }
```
Set `--r` per figure between -4deg and 4deg. Caption in Caveat.

**Collage drift (wide screens only)**
```css
@media (min-width: 900px) and (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .collage > * { animation: drift linear both; animation-timeline: view(); animation-range: cover 0% cover 100%; }
  }
}
@keyframes drift { from { translate: 0 calc(var(--depth) * 40px); } to { translate: 0 calc(var(--depth) * -40px); } }
```
Set `--depth` between -1 and 1 per item, plus a static `rotate` and position.

**Connect button (glossy 3D pill)**
```css
.connect { border:0; border-radius:999px; padding:.4em 1.2em; font: 600 clamp(3rem, 12vw, 9rem)/1 var(--font); color:#fff;
  background: linear-gradient(#3a3a38, #1c1c1a); rotate: -3deg; cursor:pointer;
  box-shadow: 0 .06em 0 #000, 0 .12em 0 #555, 0 .3em .5em rgba(0,0,0,.3); transition: translate .15s, box-shadow .15s, filter .3s; }
.connect:active { translate: 0 .05em; box-shadow: 0 .02em 0 #000, 0 .06em 0 #555, 0 .12em .3em rgba(0,0,0,.3); }
.connect:hover, .connect:focus-visible, .connect:active { filter: drop-shadow(0 0 .35em var(--glow-1)); color: var(--glow-1); }
```

**Link dock (popover, no JS)**
```html
<button class="connect" popovertarget="dock">Connect</button>
<div id="dock" popover class="dock">...email + icon links...</div>
```
```css
.dock { position: fixed; inset: auto 1rem 1rem; margin-inline: auto; max-width: 44rem; translate: 0 120%; opacity: 0;
  transition: translate .5s var(--ease-out), opacity .3s, display .5s allow-discrete, overlay .5s allow-discrete; }
.dock:popover-open { translate: 0 0; opacity: 1; }
@starting-style { .dock:popover-open { translate: 0 120%; opacity: 0; } }
@supports not selector(:popover-open) { .dock { position: static; translate: none; opacity: 1; } }
/* magnify icons under the pointer and their neighbours */
@media (hover:hover) {
  .dock li { transition: scale .25s var(--spring); }
  .dock li:hover { scale: 1.4; }
  .dock li:hover + li, .dock li:has(+ li:hover) { scale: 1.18; }
}
```
Esc closes it natively. Each icon link has a visible label on hover/focus (tooltip via `::after` from `aria-label`).

**Reduced motion (always include)**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .collage > *, .reveal { animation: none; }
}
```

## Check
Test with reduced motion on, with `animation-timeline` support removed (use a Firefox stable window), and on a phone. Nothing may be hidden, cut off or unreachable in any of them.
