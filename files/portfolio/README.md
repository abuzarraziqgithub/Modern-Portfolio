# Portfolio pack for opencode

Everything an agent needs to build your portfolio: rules, design brief, performance budgets, six skills, three commands, content templates, and scripts that fail the build if anything is fake, missing or too heavy.

**Decided:** light page with a soft yellow glow, rich CSS-only motion, 3 or more real projects with screenshots.
**Stack:** Astro (static, zero JS by default) + plain CSS, deployed to Cloudflare Workers static assets.

## Steps
1. Unzip into a new empty folder, then `git init`.
2. Fill `content/` (about 30 to 45 minutes). This is the only manual work.
   - `site.yaml`: name, one-line intro, email, socials, page title and description.
   - `projects/`: copy `_template.md` once per project (3 to 5).
   - `story.md`: 2 to 4 short paragraphs and 3 to 6 photo captions.
   - `assets/`: drop raw files as described in `assets/README.md`. No need to optimize them.
   - Rough wording is fine, but facts must be real. Fields marked `REQUIRED` fail the build if empty.
3. Open opencode in the folder. **Do not run `/init`**, it would overwrite `AGENTS.md`.
4. Press Tab for Plan mode, run `/build-page`, read the plan, press Tab again to build.
5. Run `/qa` when it finishes. Run `/intake` any time you add a project or photo.
6. Deploy only when you are happy: ask the agent to use the `ship-to-workers` skill. The first deploy goes to a staging name (`abuzar-next`) so your current site stays live until you approve the swap.

## Files
| Path | Purpose |
|---|---|
| `AGENTS.md` | stack, commands, do and never lists, definition of done (always loaded) |
| `opencode.json` | also loads `docs/DESIGN.md` and `docs/PERFORMANCE.md` |
| `docs/` | design brief, performance budgets |
| `.opencode/skills/` | `portfolio-intake`, `css-motion`, `image-pipeline`, `responsive-qa`, `anti-slop-review`, `ship-to-workers` (loaded on demand) |
| `.opencode/commands/` | `/build-page`, `/qa`, `/intake` |
| `scripts/` | `validate-content.mjs`, `budget-check.mjs`, `qa-shots.mjs` |
| `wrangler.jsonc`, `public/_headers` | Cloudflare deploy config and cache headers |

## If something does not load
Restart opencode after adding or editing skills. Skill folders must match their `name` and sit at `.opencode/skills/<name>/SKILL.md`. Config keys can change between opencode versions, so check https://opencode.ai/docs if a setting is ignored.
