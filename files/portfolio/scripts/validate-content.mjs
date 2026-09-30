// Fails the build when content/ is incomplete, still has placeholders, or points at missing files.
// Needs: npm i -D js-yaml
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';

const root = path.resolve(process.argv[2] ?? '.');
const dir = path.join(root, 'content');
const errors = [];
const warns = [];
const err = (m) => errors.push(m);

const readYaml = (file) => load(fs.readFileSync(file, 'utf8')) ?? {};
const readFront = (file) => {
  const m = fs.readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? (load(m[1]) ?? {}) : {};
};
const blank = (v) => typeof v !== 'string' || v.trim() === '';
const need = (obj, keys, where) => keys.forEach((k) => {
  const v = k.split('.').reduce((o, p) => o?.[p], obj);
  if (blank(v)) err(`${where}: "${k}" is empty`);
});
const max = (v, n, label) => { if (typeof v === 'string' && v.length > n) err(`${label} is ${v.length} chars, max ${n}`); };

const PLACEHOLDER = /\b(TODO|REPLACE|FIXME|lorem ipsum|yourname|your name|example\.(com|org))\b/i;
const strings = [];
const walk = (v, where) => {
  if (typeof v === 'string') strings.push([v, where]);
  else if (Array.isArray(v)) v.forEach((x) => walk(x, where));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => walk(x, where));
};

// site.yaml
const siteFile = path.join(dir, 'site.yaml');
if (!fs.existsSync(siteFile)) err('content/site.yaml is missing');
else {
  const s = readYaml(siteFile);
  need(s, ['name', 'hero_name', 'role', 'intro', 'seo.title', 'seo.description', 'seo.url', 'work.heading', 'story.heading', 'connect.email'], 'site.yaml');
  max(s.intro, 120, 'site.yaml intro'); max(s.seo?.title, 60, 'seo.title'); max(s.seo?.description, 155, 'seo.description');
  if (s.hero_polaroid) need(s, ['hero_polaroid.image', 'hero_polaroid.alt'], 'site.yaml (fill hero_polaroid or delete the block)');
  (s.connect?.socials ?? []).forEach((x, i) => blank(x.url) && err(`site.yaml: connect.socials[${i}] (${x.name}) has no url, fill it or delete it`));
  walk(s, 'site.yaml');
}

// story.md
const storyFile = path.join(dir, 'story.md');
if (!fs.existsSync(storyFile)) err('content/story.md is missing');
else {
  const st = readFront(storyFile);
  const paras = st.paragraphs ?? [];
  if (paras.length < 2 || paras.some(blank)) err('story.md: need at least 2 non-empty paragraphs');
  const pol = st.polaroids ?? [];
  if (pol.length < 3 || pol.length > 6) err(`story.md: need 3 to 6 polaroids, found ${pol.length}`);
  pol.forEach((p, i) => {
    need(p, ['image', 'alt', 'caption'], `story.md polaroids[${i}]`);
    if ((p.caption ?? '').trim().split(/\s+/).length > 4) warns.push(`story.md polaroids[${i}] caption is longer than 4 words`);
  });
  walk(st, 'story.md');
}

// projects
const projDir = path.join(dir, 'projects');
const projects = fs.existsSync(projDir) ? fs.readdirSync(projDir).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : [];
if (projects.length < 3) err(`projects: need at least 3, found ${projects.length}`);
if (projects.length > 5) warns.push(`projects: ${projects.length} projects, 3 to 5 reads best`);
for (const f of projects) {
  const p = readFront(path.join(projDir, f));
  const w = `projects/${f}`;
  need(p, ['title', 'role', 'pitch', 'hard_part'], w);
  if (!p.order || !p.year) err(`${w}: order and year are required`);
  if (!Array.isArray(p.stack) || p.stack.length === 0) err(`${w}: stack is empty`);
  max(p.pitch, 110, `${w} pitch`);
  if (p.visual === 'screenshot' || !p.visual) need(p, ['shots.desktop', 'shots.desktop_alt'], w);
  else if (p.visual === 'terminal') need(p, ['terminal'], w);
  else if (p.visual === 'diagram') need(p, ['diagram'], w);
  else err(`${w}: visual must be screenshot, terminal or diagram`);
  if (p.shots?.mobile && blank(p.shots.mobile_alt)) err(`${w}: shots.mobile_alt is empty`);
  if (!p.links?.live && !p.links?.repo) warns.push(`${w}: no live or repo link, recruiters will want one`);
  walk(p, w);
}

// placeholders and asset files
for (const [v, where] of strings) {
  if (PLACEHOLDER.test(v)) err(`${where}: placeholder text found: "${v.slice(0, 50)}"`);
  if (/^assets\//.test(v)) {
    const f = path.join(dir, v);
    if (!fs.existsSync(f)) err(`${where}: missing file ${v}`);
    else if (fs.statSync(f).size > 12 * 1024 * 1024) warns.push(`${v} is over 12 MB, consider a smaller original`);
  }
}

warns.forEach((w) => console.warn('warn  ' + w));
if (errors.length) {
  console.error(`\nContent is not ready (${errors.length} problem${errors.length > 1 ? 's' : ''}):`);
  errors.forEach((e) => console.error('  x ' + e));
  console.error('\nFix these in content/ or run the portfolio-intake skill.');
  process.exit(1);
}
console.log('Content OK');
