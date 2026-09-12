# Portfolio Rebuild — "Fairytale / Dreamlike" Direction

> This replaces the previous minimal/terminal-inspired brief. That version
> came out compact, dated-looking, and included a fake Experience section.
> Starting fresh with a different, more personal direction.
>
> Hand this file to opencode as the build brief. Do NOT deploy — just
> build, commit locally. The user will push/deploy themselves.

---

## 0. Creative Direction — Read This First

The visual identity is **dreamlike, painterly, twilight-toned, botanical,
and quietly cosmic** — not a typical "dev portfolio." Think: a fairytale
that happens to be about a backend engineer. Vibrant but calm. Detailed
but never cluttered. Every scroll should feel like turning a page in an
illustrated storybook, not scanning a resume.

Mood references (already placed in `/public/images/` by the user):

| File | Mood it captures |
|---|---|
| `86201780363219947.jpeg` | cosmic dust-horse, dark navy + gold, motion + wonder |
| `_Rebirth_.jpeg` | flower-covered skeleton, pastel dawn sky — growth from stillness |
| `326933254224820154.jpeg` | jet trail, saturated red/blue gradient, speed + boldness |
| `600386194081051357.jpeg` | inverted film-grain sunset through trees, warm/cool contrast |
| `627759635602605429.jpeg` | rain on bougainvillea at night, blue/violet, quiet detail |
| `786300416229089882.jpeg` | moon behind pink blossoms, near-black background |
| `792141021995751428.jpeg` | astronaut lying in a pink wildflower field — stillness in wonder |
| `818036719858028144.jpeg` | starfield silhouette walking a garden path at dusk |
| `852869248164076839.jpeg` | magenta/teal misty mountain sunset through blossoms |
| `916975174146342362.jpeg` | impressionist painting-style, figure in a flower field under moonlight |
| `926474954603862516.jpeg` | pink roses against teal sky, crescent moon |
| `1092967403299158542.jpeg` | pillows in a wildflower meadow, peach sky, butterflies |
| `1093108140835497859.jpeg` | glittering dissolving figure in a wildflower field with butterflies |
| `Coding_wallpaper.jpeg` | tech stack logos collage — reference only, don't use directly, too busy/generic |
| `Killer_Look_Wallpapers_.jpeg` | painterly figure dissolving into flowers against blue sky |

**Design principles distilled from these:**

1. **Palette:** deep navy/near-black base, with pockets of warm gold,
   rose pink, violet, and teal used as accents per-section (not all at
   once — each section can have its own "time of day" feel: dusk,
   midnight, dawn, moonrise).
2. **Typography:** an elegant serif or editorial display font for
   headings (storybook feel), paired with a clean, quiet sans-serif for
   body text. Avoid anything that looks like a terminal/mono-heavy dev
   theme — that's the opposite of the direction this time.
3. **Motion:** slow, soft — fade-and-rise on scroll, gentle parallax on
   background art, floating particles (like fireflies/stardust) drifting
   very slowly. Nothing snappy or "SaaS product" feeling.
4. **Imagery as texture, not decoration:** the provided images should be
   used as full-bleed section backgrounds (with dark overlay/gradient
   for text legibility), not small thumbnails. Each major section gets
   one image "world."
5. **Whitespace and pacing:** let sections breathe. Full-height (`100vh`
   or close) sections that reveal content on scroll, rather than a dense
   single-page stack.
6. **No experience section.** This user has no professional experience
   yet — do not fabricate one. Replace it with a section about their
   learning journey / what they're building / what they're looking for.

---

## 1. Who This Is For (real content, no dummy data needed for this part)

```
Name: Abuzar Raziq
Role: Backend-focused Software Engineer (Node.js / TypeScript)
Status: BS Computer Science student, actively looking for a paid
        internship or junior/entry-level role
Open to relocation: Yes — based in Islamabad, Pakistan, happy to move
                     for the right team/environment
Core stack (confident): Node.js, TypeScript, JavaScript, MongoDB,
                         PostgreSQL, React.js
Currently learning: Next.js
Also comfortable in: Python (adapts to whatever a role needs)
Environment: Lives in the terminal, Arch Linux daily driver, codes in
             Neovim and VS Code, loves customizing his setup
Working style: Uses AI coding agents (like opencode) to move fast on
               ideas, but deliberately learns fundamentals himself to
               keep building real critical thinking and creativity —
               not just prompting
Philosophy: Prefers understanding over memorizing
Looking for: An environment/team that pushes him to learn faster and
             grow — more interested in the people and the growth than
             any specific company name
Links: GitHub, LinkedIn, X, Substack
Outside of code: gaming, reading, podcasts, tidying his space, prayer,
                 movies that leave him inspired/reflective
```

Use this as the actual copy basis — lightly rewritten in a warm,
first-person, unpretentious voice. Not corporate. Not try-hard. Confident
but honest about being early-career.

---

## 2. Page Structure (single-page scroll, section-based)

```
1. Hero               — name, role, one-line identity, scroll cue
2. About              — who he is, in his own voice
3. Stack / Tools      — what he works in, presented as a constellation
                         or garden of skills, not a boring grid
4. Now Learning        — Next.js, and general "always growing" framing
                         (replaces the old fake Experience section)
5. Projects           — dummy project cards for now (see §4)
6. Beyond Code        — the personal side: gaming, reading, podcasts,
                         prayer, movies, room-cleaning — a "who I am
                         outside the editor" section, illustrated with
                         the softer/dreamier images
7. Let's Talk / CTA   — contact + social links (GitHub, LinkedIn, X,
                         Substack), framed as "open to opportunities"
8. Footer             — minimal, quiet, no clutter
```

---

## 3. Section-by-Section Art Direction

### Hero
- Background: `818036719858028144.jpeg` (starfield silhouette on a
  garden path) or `1093108140835497859.jpeg` (glittering figure in
  flowers) — full-bleed, dark gradient overlay from bottom for text
  contrast.
- Large serif name treatment. Subtle floating-particle overlay (CSS/
  canvas) to echo the stardust texture already in the image.
- Small line: *"Backend engineer in the making — building with Node.js
  & TypeScript, one honest line of code at a time."*
- Scroll-down cue (soft bouncing chevron or a small animated star).

### About
- Background: `600386194081051357.jpeg` (inverted sunset through
  trees) at low opacity, or a solid deep-navy panel with the image as a
  side accent rather than full background — keep text very readable
  here since this section carries the most words.
- Short paragraphs, generous line-height, first-person voice from §1.

### Stack / Tools
- Treat this like a "garden" or "night sky" of skills rather than icon
  chips: e.g. skill nodes that gently glow/pulse, grouped loosely by
  category (Languages, Backend, Databases, Frontend, Environment).
- Background: `926474954603862516.jpeg` (roses against teal sky) or a
  custom dark gradient — avoid the busy tech-logo collage image
  (`Coding_wallpaper.jpeg`) entirely, it clashes with the aesthetic.
- Categories & real content:
  ```
  Languages:      TypeScript (primary), JavaScript, Python
  Backend:        Node.js, Express
  Databases:      MongoDB, PostgreSQL
  Frontend:       React.js, (learning) Next.js
  Environment:    Arch Linux, Neovim, VS Code, terminal-first workflow
  ```

### Now Learning (replaces Experience)
- Framing: growth-in-progress, not a job history. Something like a
  small illustrated "currently exploring" panel.
- Background: `792141021995751428.jpeg` (astronaut in wildflower field)
  — fits "still early in the journey, curious, exploring" perfectly.
- Content: Next.js (actively learning), general note about constantly
  strengthening TypeScript/React fundamentals, interest in eventually
  going deeper on system design.
- End with a soft callout: *"Looking for a team or environment that
  helps me learn faster and think sharper."*

### Projects
- Background: `326933254224820154.jpeg` (jet trail, bold color) works
  well here for energy/motion, used subtly (e.g. behind the section
  heading only, not behind the cards) so project cards stay readable.
- Cards should feel like framed illustrations — soft rounded corners,
  gentle shadow/glow, hover lift. Use dummy data (see §4) for now.

### Beyond Code
- This is where the dreamiest images live:
  `_Rebirth_.jpeg`, `627759635602605429.jpeg`, `786300416229089882.jpeg`,
  `852869248164076839.jpeg`, `1092967403299158542.jpeg`,
  `916975174146342362.jpeg`, `Killer_Look_Wallpapers_.jpeg`.
- Suggest a horizontal scroll gallery or a masonry-style grid mixing
  these images with short labels: Gaming, Reading, Podcasts, Prayer &
  Quiet, Movies That Move Me, A Tidy Room = A Tidy Mind.
- Keep copy to a few words per item — this section is about mood, not
  explanation.

### Let's Talk / CTA
- Background: `786300416229089882.jpeg` (moon through blossoms) or a
  calm dark solid panel with subtle particles — this is a closing
  moment, should feel peaceful and inviting, not salesy.
- Copy direction: openly state he's looking for a paid internship or
  junior role, open to relocation, values growth-focused teams over
  brand names.
- Social links: GitHub, LinkedIn, X, Substack — styled as small glowing
  icons/constellation points rather than plain buttons.

### Footer
- Minimal single line + copyright + maybe a tiny recurring motif (a
  single star icon). Don't repeat the full nav here — this isn't the
  multi-column sitemap footer from the previous brief.

---

## 4. Dummy Content

### Projects (placeholder — real projects to be swapped in later)

```json
[
  {
    "title": "DUMMY: Task Flow API",
    "description": "A RESTful task-management backend with JWT auth, role-based permissions, and MongoDB persistence.",
    "tags": ["Node.js", "TypeScript", "MongoDB", "Express"],
    "live": "",
    "repo": "https://github.com/iabuzarraziq/task-flow-api"
  },
  {
    "title": "DUMMY: Ledger — Expense Tracker Backend",
    "description": "PostgreSQL-backed expense tracking service with category analytics and monthly reports.",
    "tags": ["Node.js", "PostgreSQL", "TypeScript"],
    "live": "",
    "repo": "https://github.com/iabuzarraziq/ledger-api"
  },
  {
    "title": "DUMMY: Realtime Room",
    "description": "A small WebSocket-based chat app to learn real-time systems — rooms, presence, message history.",
    "tags": ["Node.js", "WebSockets", "React"],
    "live": "",
    "repo": "https://github.com/iabuzarraziq/realtime-room"
  }
]
```

### Social Links (fix handles/URLs before shipping)

```
GitHub:   https://github.com/iabuzarraziq
LinkedIn: DUMMY: https://linkedin.com/in/abuzarraziq
X:        DUMMY: https://x.com/iabuzarraziq
Substack: DUMMY: https://iabuzarraziq.substack.com
```

### Contact

```
Email: DUMMY: hello@iabuzarraziq.dev
Status line: "Open to paid internships & junior roles — Node.js / TypeScript. Based in Islamabad, open to relocating."
```

---

## 5. Technical Notes

- Images already live in the project's `public/` directory — reference
  them directly (e.g. `/images/818036719858028144.jpeg`); don't
  re-upload or duplicate them. If opencode wants clearer filenames,
  it's fine to rename them to something descriptive
  (`hero-stardust-path.jpeg`, `about-sunset-trees.jpeg`, etc.) as part
  of implementation — just update all references consistently.
- Use `next/image` (or equivalent) with proper `sizes`/`priority` so
  full-bleed background images don't tank performance — these are
  large, detailed photos.
- Lazy-load below-the-fold section images; only the hero image should
  load eagerly.
- Respect `prefers-reduced-motion` — disable parallax/floating particle
  animation for users who request it.
- Keep it a single framework, ideally the one already in the repo. Only
  introduce a new one if the current setup genuinely can't support
  smooth scroll-based animation (e.g. add `framer-motion` if using
  React/Next — that's a reasonable, lightweight addition).
- Fully responsive: test the design at mobile widths first — full-bleed
  photo sections need different crop/positioning on small screens
  (`object-position` per breakpoint) so faces/subjects in the images
  don't get cropped out awkwardly.
- Performance target: compress/serve appropriately sized images (the
  originals look like large JPEGs) — generate responsive srcsets rather
  than shipping full-res everywhere.
- Accessibility: ensure text over images always meets contrast
  guidelines (use gradient overlays generously), add alt text to every
  image, ensure focus states are visible or the nav's keyboard
  navigable.

---

## 6. Explicit Non-Goals / Fixes From Last Attempt

- ❌ Do NOT include an Experience section — replace with "Now Learning"
  (§3).
- ❌ Do NOT reuse the compact/terminal-style layout from the previous
  attempt — this is a different, more spacious, editorial/artistic
  direction.
- ❌ Do NOT use `Coding_wallpaper.jpeg` (tech logo collage) as a visual
  — it breaks the aesthetic; the stack section should feel calm, not
  like a sticker sheet.
- ❌ Do NOT deploy. Build and commit locally only — the user pushes and
  deploys themselves.
- ❌ Don't fabricate professional achievements, years of experience, or
  a polished "senior" tone — the honest early-career framing is a
  feature, not something to hide.

---

## 7. Task Order for opencode

1. Set up design tokens: color palette (per-section "time of day"
   variants), typography (serif display + sans body), spacing scale.
2. Rename/organize images into `public/images/` with descriptive names
   per §5, update a central `imageManifest` or similar config so
   sections reference images by role, not raw filenames.
3. Build Hero section with particle/parallax background.
4. Build About section.
5. Build Stack/Tools "garden" section with real content from §1/§3.
6. Build Now Learning section (replacing any old Experience component
   — remove that component entirely).
7. Build Projects section using dummy data (§4) as a local data file
   (`/src/data/projects.ts`), cards with hover states.
8. Build Beyond Code gallery section.
9. Build Let's Talk / CTA + Footer.
10. Global pass: scroll animations, reduced-motion handling, responsive
    breakpoints (mobile-first check), image optimization/lazy loading,
    accessibility pass (contrast, alt text, focus states).
11. Final review against §6 non-goals before handing back.

---

## 8. Data Files to Create/Update

```
/src/data/projects.ts     (§4 project list)
/src/data/social.ts       (§4 social links)
/src/data/profile.ts      (name, role, status line, about copy from §1)
/src/config/images.ts     (manifest mapping section → image path, per §2/§5)
```
