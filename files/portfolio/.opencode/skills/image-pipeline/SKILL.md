---
name: image-pipeline
description: Use when placing any image, screenshot, photo, polaroid, logo or video in the page, or when a page feels heavy or images shift the layout. Covers astro:assets usage, formats, sizes, cropping, loading order and frames drawn in CSS.
---

# Image pipeline

## Loading user assets
Originals live in `content/assets/`. Resolve them at build time in `src/lib/content.ts`:
```ts
const images = import.meta.glob('../../content/assets/**/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });
```
Look up by the path in the content file (`assets/projects/shop/desktop.png`). If Astro refuses files outside `src/`, copy `content/assets` to `src/assets-gen/` in a prebuild script instead. Do not ask the user to move files.

## Usage
```astro
---
import { Picture } from 'astro:assets';
---
<Picture src={img} formats={['avif','webp']} widths={[480,768,1024,1600]}
  sizes="(min-width:1200px) 640px, 90vw" alt={alt} loading="lazy" decoding="async" />
```
- Always `width`, `height` (Astro sets them), plus a `sizes` that matches the real layout. Never upscale. Cap widths at the largest rendered size times 2.
- AVIF quality about 55, WebP fallback. Strip EXIF and GPS. Total per image under the budget in `docs/PERFORMANCE.md`.
- Only one image may use `fetchpriority="high"`, and only if it is in the first viewport. The hero has no image, so normally none.
- Set each image container's `aspect-ratio` and a dominant-colour `background` so nothing shifts while loading.

## Treatments
- **Polaroids:** the frame is CSS (white, padding `12px 12px 44px`, soft shadow, caption in Caveat). Never bake frames into files. Crop the photo with `aspect-ratio: 4/5; object-fit: cover`.
- **Project shots:** no baked device mockups. Round the corners, add a low shadow, crop with `overflow: hidden` and `object-position: top`. Desktop shot and mobile shot overlap on wide screens, mobile shows one shot only.
- **Logos, doodles, icons:** SVG, inline if under 1 KB, otherwise a file. Run through SVGO settings that keep `viewBox`.
- **Video:** only if the user supplies it. `muted playsinline preload="none"` with a poster, WebM and MP4, under 1.5 MB, never above the fold.
- **OG image:** the user's 1200x630 file, or a static screenshot of the hero taken at build time.
