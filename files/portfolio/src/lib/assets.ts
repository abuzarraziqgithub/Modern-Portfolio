// Build-time only. Every path in content/ starts with "assets/", so this maps those
// strings onto the real files. Raster images go through astro:assets (AVIF + WebP with
// width/height); SVGs are passed through untouched, the same way a browser would.
import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../../content/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

const svgUrls = import.meta.glob<string>('../../content/assets/**/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const svgText = import.meta.glob<string>('../../content/assets/**/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const byPath = new Map<string, ImageMetadata>();
for (const [id, mod] of Object.entries(images)) {
  byPath.set(id.replace(/^.*content\//, ''), mod.default);
}

const svgByPath = new Map<string, { src: string; width: number; height: number }>();
for (const [id, url] of Object.entries(svgUrls)) {
  const key = id.replace(/^.*content\//, '');
  // Read the intrinsic size from the viewBox so the img reserves the right space.
  const box = svgText[id]?.match(/viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/);
  svgByPath.set(key, {
    src: url,
    width: box ? Math.round(Number(box[1])) : 1200,
    height: box ? Math.round(Number(box[2])) : 800,
  });
}

export const asset = (contentPath: string): ImageMetadata => {
  const found = byPath.get(contentPath);
  if (!found) {
    throw new Error(
      `No image at content/${contentPath}. Found: ${[...byPath.keys()].join(', ') || '(none)'}`,
    );
  }
  return found;
};

export const svg = (contentPath: string): { src: string; width: number; height: number } => {
  const found = svgByPath.get(contentPath);
  if (!found) {
    throw new Error(
      `No SVG at content/${contentPath}. Found: ${[...svgByPath.keys()].join(', ') || '(none)'}`,
    );
  }
  return found;
};

export const hasAsset = (contentPath: string): boolean =>
  byPath.has(contentPath) || svgByPath.has(contentPath);
