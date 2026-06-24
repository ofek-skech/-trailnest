import { chromium } from 'playwright';
const BASE = 'https://trailnest-blond.vercel.app';
const pages = [
  { label: 'category',                     url: `${BASE}/shop/storage-organization` },
  { label: 'sts-ultra-sil-dry-bag-8l',     url: `${BASE}/product/sts-ultra-sil-dry-bag-8l` },
  { label: 'sts-lightweight-dry-bag-20l',  url: `${BASE}/product/sts-lightweight-dry-bag-20l` },
  { label: 'sts-big-river-dry-bag-13l',    url: `${BASE}/product/sts-big-river-dry-bag-13l` },
  { label: 'sts-evac-compression-8l',      url: `${BASE}/product/sts-evac-compression-dry-bag-8l` },
  { label: 'ortlieb-dry-bag-10l',          url: `${BASE}/product/ortlieb-dry-bag-10l` },
];
(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const { label, url } of pages) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    const h1 = await page.evaluate(() => document.querySelector('h1')?.innerText ?? '');
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
    await page.screenshot({ path: `.playwright-shots/so-${label}.png` });
    console.log(`[${label}] imgs:${imgCount} thumbs:${thumbCount} yt:${hasYT} | ${h1.slice(0,55)}`);
    await page.close();
  }
  await browser.close();
})();
