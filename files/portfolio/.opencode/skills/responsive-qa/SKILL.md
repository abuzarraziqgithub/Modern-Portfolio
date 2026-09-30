---
name: responsive-qa
description: Use before saying a page or section is done, after any layout change, and when the user reports something broken on a phone, tablet or large monitor. Runs the viewport matrix, overflow and tap-target checks, keyboard and reduced-motion checks, and Lighthouse.
---

# Responsive and accessibility QA

## Viewports
320x568, 360x740, 390x844, 430x932, 844x390 (landscape phone), 768x1024, 1024x768, 1280x720, 1440x900, 1920x1080, 2560x1440. Each once normally and once with reduced motion.

## Run
1. `npm run build && npm run preview` in one terminal.
2. `npm run qa http://localhost:4321` in another. It prints overflow and small-tap-target counts and writes `.qa/*.png`.
3. Look at the screenshots at 390, 768, 1440 and 2560. Read them, do not just trust the numbers.
4. Lighthouse against the preview build:
   `npx lighthouse http://localhost:4321 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"`

## Must pass
- No horizontal scroll at any width. The giant name fits (one line from 600px, two lines below), never clipped.
- Body text 16px or larger, line length under 70 characters, tap targets 44px or larger.
- `100svh` with a fallback, safe-area insets respected, no layout jump when mobile browser bars hide.
- Sticky cards, polaroid rail and dock all work by touch. Dock is reachable and closable on a 320px screen.
- Keyboard only: skip link, logical tab order, visible focus everywhere, Esc closes the dock.
- 200% browser zoom is still usable. Reduced-motion screenshots look complete, not broken.
- Lighthouse mobile: Performance 98+, Accessibility 100, Best Practices 100, SEO 100.

## Fix loop
List failures with the viewport, fix the root cause (not a per-width patch), rebuild, re-run. Stop after three rounds and report what remains.
