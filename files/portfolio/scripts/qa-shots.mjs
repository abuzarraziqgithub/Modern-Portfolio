// Screenshots every viewport and fails on horizontal overflow.
// Needs: npm i -D playwright && npx playwright install chromium
// Usage: npm run dev (other terminal), then npm run qa [url]
import { chromium } from 'playwright';
import fs from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:4321';
const sizes = [[320, 568], [360, 740], [390, 844], [430, 932], [844, 390], [768, 1024], [1024, 768], [1280, 720], [1440, 900], [1920, 1080], [2560, 1440]];
fs.mkdirSync('.qa', { recursive: true });

const browser = await chromium.launch();
let bad = 0;
for (const reduced of [false, true]) {
  for (const [w, h] of sizes) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduced ? 'reduce' : 'no-preference', hasTouch: w < 1000 });
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800); // let the intro sequence finish
    const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
    const small = await page.evaluate(() => [...document.querySelectorAll('a,button,summary')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.width < 44 || r.height < 44) && getComputedStyle(e).display !== 'inline'; }).length);
    const tag = `${w}x${h}${reduced ? '-reduced' : ''}`;
    await page.screenshot({ path: `.qa/${tag}.png`, fullPage: true });
    const overflow = sw > iw + 1;
    if (overflow) bad++;
    console.log(`${tag.padEnd(18)} ${overflow ? 'OVERFLOW ' + sw + '>' + iw : 'ok'}  small tap targets: ${small}`);
    await ctx.close();
  }
}
await browser.close();
process.exit(bad ? 1 : 0);
