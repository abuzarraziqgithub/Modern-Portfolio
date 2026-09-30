// Post-build finaliser, run after `astro build`.
//
// 1. Copies user-owned binary assets from content/assets into dist so paths like
//    /assets/resume.pdf resolve. Raster images and SVGs referenced from content go
//    through astro:assets instead and are not copied here.
// 2. Prunes assets astro emitted but nothing references. Importing an image module
//    for its width/height makes Astro write the original file into dist; with the
//    fallback capped by ResponsiveImage.astro those originals are never requested,
//    but they are still uploaded to Cloudflare and counted against the budget.
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'content/assets';
const OUT = 'dist/assets';
// Binary files a browser downloads directly rather than through astro:assets.
const PLAIN = new Set(['.pdf', '.zip', '.txt', '.webmanifest']);

let copied = 0;

const walk = async (dir, rel = '') => {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const from = path.join(dir, e.name);
    const relPath = path.join(rel, e.name);
    if (e.isDirectory()) {
      await walk(from, relPath);
    } else if (PLAIN.has(path.extname(e.name).toLowerCase())) {
      const to = path.join(OUT, relPath);
      await fs.mkdir(path.dirname(to), { recursive: true });
      await fs.copyFile(from, to);
      const { size } = await fs.stat(to);
      console.log(`  copied ${relPath} (${(size / 1024).toFixed(1)} KB)`);
      copied++;
    }
  }
};

await walk(SRC);
console.log(`\ncontent binary assets copied to dist: ${copied}`);

// ---- prune unreferenced build assets ----

const dist = 'dist';
const files = [];
await (async function collect(d) {
  let entries;
  try {
    entries = await fs.readdir(d, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(d, e.name);
    e.isDirectory() ? await collect(p) : files.push(p);
  }
})(dist);

const text = files.filter((f) => ['.html', '.css', '.js', '.mjs', '.json', '.txt', '.xml'].includes(path.extname(f).toLowerCase()));
const referenced = new Set();
for (const f of text) {
  const src = await fs.readFile(f, 'utf8');
  for (const m of src.matchAll(/[A-Za-z0-9._-]+\.(?:avif|webp|jpe?g|png|gif|svg|woff2?)/g)) {
    referenced.add(m[0]);
  }
}

let pruned = 0;
let bytes = 0;
for (const f of files) {
  if (path.dirname(f) !== path.join(dist, '_astro')) continue;
  if (referenced.has(path.basename(f))) continue;
  bytes += (await fs.stat(f)).size;
  await fs.rm(f);
  pruned++;
}

console.log(`unreferenced build assets pruned: ${pruned} (${(bytes / 1024).toFixed(0)} KB)`);
console.log(`distinct assets referenced in markup: ${referenced.size}`);