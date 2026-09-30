// Build-time only. Reads content/ and validates it with zod so a typo fails the build,
// not the page. Nothing here ships to the browser.
import fs from 'node:fs';
import path from 'node:path';
import { load } from 'js-yaml';
import { z } from 'zod';

const contentDir = path.resolve(process.cwd(), 'content');

const readYaml = (file: string): unknown =>
  load(fs.readFileSync(path.join(contentDir, file), 'utf8')) ?? {};

const readFront = (file: string): { data: unknown; body: string } => {
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  return { data: load(match[1]) ?? {}, body: (match[2] ?? '').trim() };
};

const nonEmpty = z.string().trim().min(1);

// The content templates ship optional fields as `""` to mean "not provided", so an empty
// string has to read as absent rather than as a validation failure.
const maybe = z.preprocess(
  (v) => (typeof v === 'string' && v.trim() === '' ? undefined : v),
  z.string().trim().min(1).optional(),
);

const polaroidSchema = z.object({
  image: nonEmpty,
  kind: z.enum(['photo', 'illustration']).default('photo'),
  alt: nonEmpty,
  caption: nonEmpty,
});

const socialSchema = z.object({
  name: z.enum(['github', 'linkedin', 'instagram', 'tiktok', 'facebook', 'x', 'youtube']),
  url: z.url(),
});

const siteSchema = z.object({
  name: nonEmpty,
  hero_name: nonEmpty,
  role: nonEmpty,
  intro: nonEmpty.max(120),
  location: maybe,
  status: maybe,
  seo: z.object({
    title: nonEmpty.max(60),
    description: nonEmpty.max(155),
    url: z.url(),
    og_image: maybe,
    // Repository the page itself is built from. Rendered in the footer only when set,
    // so the link never points at the deployed site it already lives on.
    source: maybe,
  }),
  hero_polaroid: z
    .object({ image: nonEmpty, alt: nonEmpty, caption: nonEmpty })
    .optional(),
  work: z.object({ note: maybe, heading: nonEmpty }),
  story: z.object({ heading: nonEmpty, note: maybe }),
  connect: z.object({
    email: nonEmpty,
    note: maybe,
    resume: maybe,
    socials: z.array(socialSchema),
  }),
});

const projectSchema = z
  .object({
    title: nonEmpty,
    order: z.number().int().positive(),
    year: z.number().int(),
    role: nonEmpty,
    pitch: nonEmpty.max(110),
    stack: z.array(nonEmpty).min(1),
    hard_part: nonEmpty,
    links: z
      .object({ live: maybe, repo: maybe })
      .optional(),
    visual: z.enum(['screenshot', 'terminal', 'diagram']),
    shots: z
      .object({
        desktop: maybe,
        desktop_alt: maybe,
        mobile: maybe,
        mobile_alt: maybe,
      })
      .optional(),
    logo: maybe,
    terminal: maybe,
    diagram: maybe,
  })
  .superRefine((p, ctx) => {
    if (p.visual === 'screenshot' && (!p.shots?.desktop || !p.shots?.desktop_alt)) {
      ctx.addIssue({ code: 'custom', message: 'visual: screenshot needs shots.desktop and shots.desktop_alt' });
    }
    if (p.visual === 'terminal' && !p.terminal) {
      ctx.addIssue({ code: 'custom', message: 'visual: terminal needs terminal output' });
    }
    if (p.visual === 'diagram' && !p.diagram) {
      ctx.addIssue({ code: 'custom', message: 'visual: diagram needs a diagram path' });
    }
  });

const storySchema = z.object({
  paragraphs: z.array(nonEmpty).min(2).max(4),
  polaroids: z.array(polaroidSchema).min(3).max(6),
  collage_extra: z.array(polaroidSchema).default([]),
});

export type Site = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema> & { slug: string; body: string };
export type Polaroid = z.infer<typeof polaroidSchema>;
export type Story = z.infer<typeof storySchema> & { body: string };

const parse = <T>(schema: z.ZodType<T>, data: unknown, where: string): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `  ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`${where} failed validation:\n${detail}`);
  }
  return result.data;
};

export const getSite = (): Site => parse(siteSchema, readYaml('site.yaml'), 'content/site.yaml');

export const getStory = (): Story => {
  const { data, body } = readFront('story.md');
  return { ...parse(storySchema, data, 'content/story.md'), body };
};

export const getProjects = (): Project[] => {
  const dir = path.join(contentDir, 'projects');
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .sort();

  const projects = files.map((file) => {
    const { data, body } = readFront(path.join('projects', file));
    const slug = file.replace(/\.md$/, '');
    return { ...parse(projectSchema, data, `content/projects/${file}`), slug, body };
  });

  return projects.sort((a, b) => a.order - b.order);
};
