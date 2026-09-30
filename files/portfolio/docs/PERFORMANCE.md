# Performance budgets (fail the build, do not just warn)

| Metric | Budget |
|---|---|
| Lighthouse mobile | Performance 98+, others 100 |
| LCP / CLS / TBT | under 1.2s on throttled 4G / 0 / 0ms |
| JS total (gzip) | 15 KB or less, target under 3 KB |
| `index.html` with inlined CSS (gzip) | 45 KB or less |
| Fonts | 2 files, 70 KB total, `font-display: swap`, Latin subset |
| Any single image | 220 KB or less, hero-adjacent ones under 120 KB |
| Requests before first paint | HTML plus at most 1 font |

## How
- `build.inlineStylesheets: 'always'` and `compressHTML: true` in `astro.config.mjs`. No render-blocking requests.
- The hero uses CSS only (gradient and text), so the LCP element is text. No hero image.
- Below the fold: `content-visibility: auto` with `contain-intrinsic-size`, `loading="lazy"`, `decoding="async"`. Only one image may use `fetchpriority="high"`.
- Every `<img>` has `width`, `height` and a correct `sizes`. Widths 480, 768, 1024, 1600. AVIF q55 with WebP fallback. Strip EXIF/GPS. Never upscale.
- Animate `transform`, `opacity`, `filter` only. `will-change` only on the currently animating element, removed after.
- No third-party origins at all, so no preconnect is needed.
- `public/_headers`: immutable cache on `/_astro/*`, plus `X-Content-Type-Options: nosniff` and `Referrer-Policy: strict-origin-when-cross-origin`.
- Report the `budget-check` table in every "done" message.
