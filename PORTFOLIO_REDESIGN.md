# Portfolio Redesign Instructions (for opencode)

> Goal: Rework the portfolio at `abuzar.iabuzarraziq.workers.dev` to match the
> design language of `heyalok.com` — minimal, dark, monospace-accented,
> terminal/dev-tool aesthetic with a command palette — while keeping the
> content specific to **Abuzar Raziq, Backend Engineer**.
>
> This file is meant to be handed directly to opencode as a task brief.
> All content below marked `DUMMY:` is placeholder — replace later with
> real data. Everything else (structure, components, behavior) should be
> implemented as described.

---

## 0. Reference & Source

- **Design reference:** https://heyalok.com/ (study the layout, spacing,
  typography, nav pattern, and command palette — do not copy exact copy
  or personal branding)
- **Current site to modify:** the existing Cloudflare Workers portfolio
  in this repo
- Keep the existing deployment target (Cloudflare Workers). Don't
  migrate frameworks unless the current stack can't support the
  features below — if a rewrite is genuinely needed, prefer a
  lightweight setup (Vite + React, or plain TS) that still deploys
  cleanly to Workers.

---

## 1. Design Language to Adopt

Study these traits from heyalok.com and replicate the *feel*, not literal
pixel copies:

1. **Dark theme, minimal palette** — near-black background, off-white
   text, one accent color used sparingly (links, highlights, active nav
   state).
2. **Monospace or mixed serif/mono typography** — headings can use a
   slightly heavier weight; body text stays plain and readable. Code-ish
   accents (e.g. `⌘+K` hint, inline `code` styling for keywords) fit the
   "developer" vibe.
3. **Command palette (⌘K / Ctrl+K)** — a fuzzy-search modal to jump to
   sections/pages (Home, Projects, Blog, Resume, socials). This is the
   single most distinctive feature of the reference site — treat it as
   a must-have, not optional polish.
4. **Simple top-left/top-right nav** — logo or initials on the left,
   3–4 links on the right (Home / Projects / Blog / Resume). No heavy
   hamburger menus on desktop.
5. **Footer as a sitemap, not just copyright** — grouped columns:
   `navigate`, `explore`, `social`, `work`, `creator` (or similar
   groupings relevant to Abuzar — trim groups that don't apply, e.g. no
   "creator" column if there's no blog/YouTube yet).
6. **Subtle background texture/image** — heyalok uses a faint background
   image (a tree) behind the hero. Use something on-theme instead (e.g.
   a subtle grid, circuit-board pattern, or terminal-cursor motif) at
   low opacity — don't reuse the tree image.
7. **Big name/title hero** — large uppercase name as the visual anchor,
   short one-line role under it, and a scroll/marquee-style stat or
   counter (heyalok shows a "0" counter — could be repurposed as a
   "years of experience" or "commits" counter, or dropped if it doesn't
   fit).
8. **Experience shown as a timeline list** — role, company, duration,
   one-line description, and tag pills for the tech stack used in that
   role.
9. **Content sections load progressively** — About → GitHub contribution
   graph → Experience → Recent posts/projects preview → Footer. Keep
   this general order.
10. **`llms.txt` easter egg** — heyalok links an `/llms.txt` for LLMs
    reading the page. Optional nice-to-have: add a simple `/llms.txt`
    describing Abuzar for AI crawlers.

---

## 2. Site Structure (Pages/Routes)

```
/                → Home (hero, about, GitHub graph, experience, latest projects preview, footer)
/projects        → Full projects list/grid
/blog            → Blog list (optional — only if Abuzar wants to blog; otherwise skip and remove nav link)
/resume.pdf      → Static resume file (or link out to a hosted PDF)
```

If blogging isn't a priority right now, drop `/blog` from the nav and
just ship `/` and `/projects`. Don't build a CMS — a simple projects
data file is enough (see section 4).

---

## 3. Component Checklist

Implement these as discrete components:

- [ ] `Nav` — logo/initials + route links + `⌘K` hint button
- [ ] `CommandPalette` — modal, keyboard-triggered (`Cmd+K` / `Ctrl+K`),
      fuzzy search over: pages, social links, "copy email", "download
      resume", theme toggle (if implemented)
- [ ] `Hero` — big name, role tagline, subtle background motif, social
      icon row
- [ ] `About` — 3–5 short punchy lines, bold keywords (mirrors the
      "Namaste, I'm a full-stack developer..." tone but in Abuzar's own
      voice)
- [ ] `GithubGraph` — embed a GitHub contributions graph (can use a
      public image-based API like `ghchart.rshah.org` or
      `github-readme-stats` style embeds, since a full GitHub API
      integration is heavier)
- [ ] `ExperienceTimeline` — list of roles with tag pills per role
- [ ] `ProjectsPreview` (home) + `ProjectsGrid` (full page) — card per
      project: title, one-line description, tag pills, live link +
      repo link
- [ ] `Footer` — sitemap-style columns + copyright line
- [ ] `ThemeStyles` — CSS variables for colors/fonts, single source of
      truth for the palette

---

## 4. Dummy Content (fill in for now)

### 4.1 Identity

```
Name: Abuzar Raziq
Title: Backend Engineer
Tagline: Backend developer focused on Node.js, TypeScript, and clean,
         well-structured APIs.
Location: DUMMY: Islamabad, Pakistan
Email: DUMMY: hello@iabuzarraziq.dev
```

### 4.2 About Section (dummy copy, rewrite in your own voice later)

```
Hey, I'm Abuzar — a **backend engineer** who likes things done **properly**.

I mostly live in **Node.js** and **TypeScript**, building APIs that don't
fall over — auth, validation, hashing, pagination, all the unglamorous
stuff that actually matters.

I run **Arch Linux**, so yes, I will mention it unprompted.

I'm not scared of the frontend either, I just prefer the backend does
the heavy lifting.
```

### 4.3 Experience (dummy — replace with real roles/dates)

```json
[
  {
    "role": "Backend Developer",
    "company": "DUMMY: Some Startup Pvt Ltd",
    "duration": "Jan 2025 – Present",
    "description": "Building and maintaining REST APIs, authentication systems, and backend services.",
    "tags": ["Node.js", "Express", "MongoDB", "TypeScript", "JWT", "Docker"]
  },
  {
    "role": "Backend Developer Intern",
    "company": "DUMMY: Some Agency",
    "duration": "Jun 2024 – Dec 2024",
    "description": "Worked on API design, validation, and database schema design for client projects.",
    "tags": ["Node.js", "Express", "MongoDB", "Postman"]
  }
]
```

### 4.4 Skills / Stack (based on your real stack — keep this list, it's accurate)

```
Languages: TypeScript, JavaScript (ES6+), C++, Python
Backend: Node.js, Express, Mongoose, REST APIs, JWT auth, hashing,
         pagination, filtering, validation, WebSockets
Database: PostgreSQL, MongoDB
Testing: Jest
Tools: Neovim, Tmux, kitty, Postman, Obsidian
Deployment: Vercel, Heroku, Cloudflare Workers
OS: Arch Linux
```

### 4.5 Projects (dummy — replace with real projects + links)

```json
[
  {
    "title": "DUMMY: Auth Service",
    "description": "A reusable JWT-based authentication microservice with role-based access control.",
    "tags": ["Node.js", "Express", "MongoDB", "JWT"],
    "live": "https://example.com",
    "repo": "https://github.com/iabuzarraziq/auth-service"
  },
  {
    "title": "DUMMY: Shopping Cart API",
    "description": "Backend for a shopping app — products, cart, and fake checkout flow.",
    "tags": ["Node.js", "Express", "PostgreSQL"],
    "live": "https://example.com",
    "repo": "https://github.com/iabuzarraziq/shopping-api"
  },
  {
    "title": "DUMMY: Realtime Chat Backend",
    "description": "WebSocket-based chat backend with rooms, presence, and message persistence.",
    "tags": ["Node.js", "WebSockets", "Redis"],
    "live": "https://example.com",
    "repo": "https://github.com/iabuzarraziq/chat-backend"
  }
]
```

### 4.6 Social / Work Links (dummy — fix handles/URLs)

```
GitHub:   https://github.com/iabuzarraziq
LinkedIn: DUMMY: https://linkedin.com/in/abuzarraziq
X:        DUMMY: https://x.com/iabuzarraziq
Peerlist: DUMMY: https://peerlist.io/abuzarraziq
```

---

## 5. Footer Column Layout (adapt from heyalok, trim to what applies)

```
navigate   → Home, Projects
explore    → Resume
social     → GitHub, LinkedIn, X
work       → Peerlist (if used)
```

Drop the "creator" column entirely (no blog/YouTube yet) until that
content exists.

---

## 6. Task Order for opencode

Work through this in order, committing after each step:

1. Set up/confirm project structure and CSS variable theme (colors,
   fonts, spacing scale) matching the dark/minimal palette described in
   §1.
2. Build `Nav` + `Footer` shells with the routes/columns from §2 and §5.
3. Build `Hero` + `About` using the dummy copy in §4.1–4.2.
4. Build `ExperienceTimeline` using §4.3 data (as a local JSON/TS data
   file, not hardcoded JSX, so it's easy to edit later).
5. Build `GithubGraph` embed.
6. Build `ProjectsGrid` + `ProjectsPreview` using §4.5 data (also as a
   local data file).
7. Build `CommandPalette` last, once routes/content exist for it to
   search over.
8. Polish: responsive pass (mobile nav, mobile hero), accessibility
   pass (focus states, aria labels on the command palette), and a
   basic `/llms.txt`.
9. Deploy to Cloudflare Workers and verify.

---

## 7. Explicit Non-Goals

- Don't copy heyalok.com's exact text, images, or personal branding —
  only the layout/interaction patterns.
- Don't build a full CMS or blog engine unless requested — static data
  files are enough for now.
- Don't add analytics/tracking unless asked.
- Don't change the deployment target away from Cloudflare Workers
  without discussing it first.

---

## 8. Data Files to Create

Put all placeholder content in editable data files so real data can
drop in later without touching component code:

```
/src/data/experience.ts
/src/data/projects.ts
/src/data/social.ts
/src/data/profile.ts   (name, title, tagline, about copy)
```
