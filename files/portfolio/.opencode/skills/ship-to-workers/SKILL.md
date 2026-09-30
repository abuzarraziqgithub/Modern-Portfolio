---
name: ship-to-workers
description: Use only when the user asks to deploy, publish, preview online, roll back, or connect a custom domain for the portfolio on Cloudflare Workers. Static assets deploy with wrangler, staging name first, then the live name.
---

# Ship to Cloudflare Workers

Never deploy, push or change DNS unless the user asked for it in this conversation.

## Before deploy
1. `npm run build` passes (content, Astro build, budgets) and `npm run qa` is clean.
2. `wrangler.jsonc` exists at the root. `compatibility_date` is today's date. `assets.directory` is `./dist`. No `main` field and no adapter, because the site is fully static.
3. `dist/_headers` exists (copied from `public/`).

## First deploy (staging)
The root config uses the name `abuzar-next`, so it goes to `abuzar-next.<account-subdomain>.workers.dev` and does not touch the live site.
```
npx wrangler login
npx wrangler deploy
```
Then check: `curl -I <url>/` (status, compression) and `curl -I <url>/_astro/<a-hashed-file>` (immutable cache header). Ask the user to review on a real phone.

## Replace the live site
A workers.dev address is `<worker-name>.<account-subdomain>.workers.dev`. The current site `abuzar.iabuzarraziq.workers.dev` is the worker named `abuzar`. Only after the user approves the staging URL and confirms overwriting: change `name` to `abuzar` and run `npx wrangler deploy` again. Note the previous version so it can be restored (`npx wrangler rollback`, check `--help` for the current flags).

## Custom domain later
Add the domain in the Cloudflare dashboard (Workers, Settings, Domains), or a `routes` entry with `custom_domain: true` in `wrangler.jsonc`. Update `seo.url` in `content/site.yaml` and rebuild.
