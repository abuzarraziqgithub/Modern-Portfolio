// Run after `astro build`. Fails when dist/ exceeds the budgets in docs/PERFORMANCE.md.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dist = path.resolve(process.argv[2] ?? 'dist');
const KB = 1024;
const budget = { js: 15 * KB, html: 45 * KB, fonts: 70 * KB, image: 220 * KB };

if (!fs.existsSync(dist)) { console.error(`No ${dist}. Run astro build first.`); process.exit(1); }
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    e.isDirectory() ? walk(p) : files.push(p);
  }
})(dist);

const gz = (f) => zlib.gzipSync(fs.readFileSync(f), { level: 9 }).length;
const raw = (f) => fs.statSync(f).size;
const ext = (f) => path.extname(f).toLowerCase();
const sum = (fs_, fn) => fs_.reduce((n, f) => n + fn(f), 0);

const js = files.filter((f) => ['.js', '.mjs'].includes(ext(f)));
const html = files.filter((f) => f.endsWith(`${path.sep}index.html`) && path.dirname(f) === dist);
const fonts = files.filter((f) => ['.woff2', '.woff', '.ttf'].includes(ext(f)));
const images = files.filter((f) => ['.avif', '.webp', '.jpg', '.jpeg', '.png'].includes(ext(f)));
const big = images.filter((f) => raw(f) > budget.image);

const rows = [
  ['JS (gzip)', sum(js, gz), budget.js],
  ['index.html (gzip)', sum(html, gz), budget.html],
  ['Fonts (raw)', sum(fonts, raw), budget.fonts],
  ['Largest image', Math.max(0, ...images.map(raw)), budget.image],
];
let fail = false;
console.log('\nBudget'.padEnd(22) + 'Actual'.padStart(10) + 'Limit'.padStart(10) + '  Status');
for (const [name, actual, limit] of rows) {
  const ok = actual <= limit; if (!ok) fail = true;
  console.log(name.padEnd(21) + `${(actual / KB).toFixed(1)} KB`.padStart(11) + `${(limit / KB).toFixed(0)} KB`.padStart(10) + (ok ? '  ok' : '  OVER'));
}
if (fonts.length > 2) { fail = true; console.log(`Fonts: ${fonts.length} files, max 2`); }
big.forEach((f) => console.log(`Image over budget: ${path.relative(dist, f)} (${(raw(f) / KB).toFixed(0)} KB)`));
process.exit(fail || big.length ? 1 : 0);
