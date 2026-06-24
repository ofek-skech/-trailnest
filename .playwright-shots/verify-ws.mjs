import { chromium } from 'playwright';
const BASE = 'https://trailnest-blond.vercel.app';
const pages = [
  { label: 'category',        url: `${BASE}/shop/water-showers` },
  { label: 'shower-helio-lx', url: `${BASE}/product/shower-helio-lx` },
  { label: 'pocket-shower',   url: `${BASE}/product/pocket-shower-10l` },
  { label: 'sawyer-squeeze',  url: `${BASE}/product/sawyer-squeeze-filter` },
  { label: 'lifestraw-go',    url: `${BASE}/product/lifestraw-go-22oz` },
  { label: 'camp-sink',       url: `${BASE}/product/camp-sink-5l` },
];
(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const { label, url } of pages) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    const title = await page.title();
    const imgCount = await page.evaluate(() =>
      document.querySelectorAll('.aspect-\\[4\\/3\\] img').length
    );
    const thumbCount = await page.evaluate(() =>
      document.querySelectorAll('.hidden.md\\:flex button img').length
    );
    const hasYT = await page.evaluate(() =>
      !!document.querySelector('iframe[src*="youtube"]') ||
      document.body.innerHTML.includes('youtube.com/embed')
    );
    const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText ?? '');
    await page.screenshot({ path: `.playwright-shots/ws-${label}.png` });
    console.log(`[${label}] imgs:${imgCount} thumbs:${thumbCount} yt:${hasYT} | ${h1.slice(0,50)}`);
    await page.close();
  }
  await browser.close();
})();
