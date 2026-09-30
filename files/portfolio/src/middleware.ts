// Dev-only. npm run build copies the user-owned binaries from content/assets into
// dist via scripts/copy-content-assets.mjs, but the dev server never runs that
// step, so /assets/resume.pdf 404ed while developing. This serves them straight
// from content/ during `astro dev` so dev and the built site behave the same.
//
// A middleware is used rather than a Vite plugin so nothing is added to the
// production bundle: defineMiddleware is a no-op in a static build.
import fs from 'node:fs';
import path from 'node:path';
import { defineMiddleware } from 'astro:middleware';

const ROOT = 'content/assets';

// Same extensions scripts/copy-content-assets.mjs treats as plain downloads.
const PLAIN = /\.(pdf|zip|txt|webmanifest)$/i;

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url.pathname;
  if (!url.startsWith('/assets/') || !PLAIN.test(url)) return next();

  // Resolve inside content/assets only; reject anything that escapes it.
  const rel = decodeURIComponent(url.slice('/assets/'.length));
  const file = path.resolve(ROOT, rel);
  if (file !== path.resolve(ROOT) && !file.startsWith(path.resolve(ROOT) + path.sep)) {
    return new Response('Forbidden', { status: 403 });
  }

  let body: Buffer;
  try {
    body = await fs.promises.readFile(file);
  } catch {
    return next();
  }

  const type = rel.toLowerCase().endsWith('.pdf')
    ? 'application/pdf'
    : 'application/octet-stream';

  // Copy into a plain Uint8Array: Node's Buffer is not a valid BodyInit, and
  // copying avoids exposing Buffer's pooled underlying ArrayBuffer.
  const bytes = new Uint8Array(body);

  return new Response(bytes, {
    status: 200,
    headers: {
      'content-type': type,
      'content-length': String(bytes.byteLength),
      'cache-control': 'no-store',
    },
  });
});