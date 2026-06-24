import { chromium } from 'playwright';
const BASE = 'https://trailnest-blond.vercel.app';
const pages = [
  { label: 'category',                  url: `${BASE}/shop/sleeping-comfort` },
  { label: 'neoair-xlite-nxt',          url: `${BASE}/product/neoair-xlite-nxt` },
  { label: 'z-lite-sol',                url: `${BASE}/product/z-lite-sol` },
  { label: 'nemo-tensor-all-season',    url: `${BASE}/product/nemo-tensor-all-season` },
  { label: 'sts-spark-down-sleeping-bag', url: `${BASE}/product/sts-spark-down-sleeping-bag` },
  { label: 'sts-aeros-pillow',          url: `${BASE}/product/sts-aeros-pillow` },
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
    await page.screenshot({ path: `.playwright-shots/sc-${label}.png` });
    console.log(`[${label}] imgs:${imgCount} thumbs:${thumbCount} yt:${hasYT} | ${h1.slice(0,55)}`);
    await page.close();
  }
  await browser.close();
})();
