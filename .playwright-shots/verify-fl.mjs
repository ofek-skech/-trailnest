import { chromium } from 'playwright';
const BASE = 'https://trailnest-blond.vercel.app';
const pages = [
  { label: 'category',                       url: `${BASE}/shop/fishing-leisure` },
  { label: 'ugly-stik-bigwater-rod',         url: `${BASE}/product/ugly-stik-bigwater-spinning-rod` },
  { label: 'ugly-stik-3700-tackle-bag',      url: `${BASE}/product/ugly-stik-3700-tackle-bag` },
  { label: 'plano-three-tray-tackle-box',    url: `${BASE}/product/plano-three-tray-tackle-box` },
  { label: 'plano-stowaway-3600-split',      url: `${BASE}/product/plano-stowaway-3600-split` },
  { label: 'bushnell-r3-binoculars-8x42',   url: `${BASE}/product/bushnell-r3-binoculars-8x42` },
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
    await page.screenshot({ path: `.playwright-shots/fl-${label}.png` });
    console.log(`[${label}] imgs:${imgCount} thumbs:${thumbCount} yt:${hasYT} | ${h1.slice(0,55)}`);
    await page.close();
  }
  await browser.close();
})();
