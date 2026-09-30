---
description: Scaffold and build the whole portfolio from content/, following AGENTS.md
---
Read AGENTS.md, docs/DESIGN.md and docs/PERFORMANCE.md. Run `node scripts/validate-content.mjs`. If it fails, stop and use the portfolio-intake skill before writing any UI.

Then scaffold Astro (static, TypeScript strict, minimal) in a temp folder and move it in without touching content/, docs/, scripts/ or .opencode/. Add js-yaml and zod as build-time dependencies, create the package.json scripts from AGENTS.md, and keep the existing wrangler.jsonc.

Build in this order: tokens, Nav, Hero, Work, Story, Collage, Connect, footer. Load the css-motion and image-pipeline skills before Hero and Work. After each step run the dev server, screenshot at 390 and 1440, and fix problems before moving on.

Finish with `npm run build`, `npm run qa`, then the anti-slop-review skill. Do not deploy, commit or push. $ARGUMENTS
