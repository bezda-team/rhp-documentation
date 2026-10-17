// Check the gallery-only toolbar and one-request-per-page behavior with predictable counts.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, webkit, firefox } from 'playwright';
import { realPosters } from '../src/gallery/real-posters.js';
import { withRecipeNavigation } from './recipe-navigation.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = process.argv[2] ?? 'http://127.0.0.1:4397';
const engine = process.env.BROWSER ?? 'chromium';
const browser = await { chromium, webkit, firefox }[engine].launch();
const screenshots = process.env.SCREENSHOTS ?? '/tmp/rhp-poster-views';
await fs.mkdir(screenshots, { recursive: true });
const standalone = await fs.readFile(path.join(root, 'vendor/rhp/dist/standalone.js'));
try {
  for (const poster of realPosters()) {
    const html = await fs.readFile(path.join(root, 'public', poster.url, 'index.html'), 'utf8');
    assert.equal((html.match(/data-poster-views=/g) ?? []).length, 1, `${poster.slug}: one counter`);
    const regenerated = withRecipeNavigation(html, { href: '/gallery/#real-posters', label: 'Gallery navigation', views: poster.slug });
    assert.equal((regenerated.match(/data-poster-views=/g) ?? []).length, 1, `${poster.slug}: regeneration keeps one counter`);
    for (const width of [1280, 1024, 768, 390, 360, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const errors = [], requests = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route(/https:\/\/cdn\.jsdelivr\.net\/npm\/@bezda\/rhp@[^/]+\/dist\/standalone.js/, route => route.fulfill({ body: standalone, contentType: 'text/javascript' }));
      await page.route('**/api/poster-views', route => {
        requests.push({ method: route.request().method(), body: route.request().postDataJSON() });
        return route.fulfill({ json: { views: 9999 } });
      });
      await page.goto(new URL(poster.url, base).href);
      await page.getByRole('button', { name: 'Fit poster to screen', exact: true }).waitFor();
      await page.getByRole('img', { name: '9,999 total views', exact: true }).waitFor();
      await page.evaluate(() => document.fonts.ready);
      const check = async () => {
        const boxes = await page.evaluate(() => {
          const nav = document.querySelector('.recipe-navigation');
          const box = element => { const r = element.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, mid: (r.left + r.right) / 2 }; };
          return { nav: box(nav), back: box(nav.querySelector('a')), views: box(nav.querySelector('.poster-views')), actions: box(nav.querySelector('.poster-actions')),
            scroll: document.documentElement.scrollWidth, viewport: innerWidth,
            color: getComputedStyle(nav.querySelector('.poster-views')).color, backColor: getComputedStyle(nav.querySelector('a')).color };
        });
        assert(Math.abs(boxes.nav.mid - boxes.views.mid) < .5, `${poster.slug} ${width}px: count centered`);
        assert(boxes.back.right + 3 <= boxes.views.left, `${poster.slug} ${width}px: Gallery clear of count`);
        assert(boxes.views.right + 3 <= boxes.actions.left, `${poster.slug} ${width}px: count clear of buttons`);
        assert(boxes.views.top >= boxes.actions.top && boxes.views.bottom <= boxes.actions.bottom, `${poster.slug} ${width}px: same row`);
        assert(boxes.scroll <= boxes.viewport, `${poster.slug} ${width}px: no horizontal overflow`);
        assert.equal(boxes.color, boxes.backColor);
      };
      await check();
      await page.getByRole('button', { name: 'Fit poster to screen', exact: true }).click();
      await check();
      await page.getByRole('button', { name: 'Restore poster size', exact: true }).click();
      await check();
      if (poster.slug === 'acid-rain' && width === 1280) {
        const [download] = await Promise.all([
          page.waitForEvent('download'),
          page.getByRole('button', { name: 'Download poster as PNG', exact: true }).click(),
        ]);
        assert.equal(await download.failure(), null, 'PNG download succeeds with the counter present');
      }
      assert.deepEqual(requests, [{ method: 'POST', body: { poster: poster.slug } }], `${poster.slug}: one visit despite toolbar actions`);
      assert.deepEqual(errors, [], `${poster.slug}: no browser errors`);
      if ([1280, 320].includes(width)) await page.screenshot({ path: path.join(screenshots, `${poster.slug}-${width}-${engine}.png`) });
      await page.close();
    }
    console.log(`PASS ${poster.slug}: centered toolbar at six widths, fit/restore, correct request and no extra visits`);
  }
  const page = await browser.newPage({ viewport: { width: 320, height: 900 }, reducedMotion: 'reduce' });
  let views = 1234567, fail = false, requests = 0;
  await page.route(/https:\/\/cdn\.jsdelivr\.net\/npm\/@bezda\/rhp@[^/]+\/dist\/standalone.js/, route => route.fulfill({ body: standalone, contentType: 'text/javascript' }));
  await page.route('**/api/poster-views', route => { requests++; return route.fulfill({ status: fail ? 503 : 200, json: fail ? { error: 'Unavailable' } : { views } }); });
  await page.goto(new URL(realPosters()[0].url, base).href);
  await page.getByRole('img', { name: '1,234,567 total views', exact: true }).waitFor();
  assert.equal(await page.locator('[data-view-count]').innerText(), '1.2M');
  views = 1;
  await page.reload();
  await page.getByRole('img', { name: '1 total view', exact: true }).waitFor();
  assert.equal(requests, 2, 'returning page view counts again');
  fail = true;
  await page.reload();
  await page.getByRole('img', { name: 'View count is temporarily unavailable', exact: true }).waitFor();
  assert.equal(await page.locator('[data-view-count]').innerText(), '?');
  assert(await page.getByRole('button', { name: 'Fit poster to screen', exact: true }).isVisible());
  await page.close();
  for (const file of ['public/ai/rhp/recipes/histogram.html', 'public/gallery/posters/world-cities-sign/index.html', 'public/gallery/articles/every-word/index.html']) {
    const html = await fs.readFile(path.join(root, file), 'utf8');
    assert(!html.includes('data-poster-views'), `${file}: no poster view counter`);
  }
  console.log('PASS compact counts, return visits, unavailable-count fallback, and poster-only scope');
} finally { await browser.close(); }
