import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
const OUT  = 'C:/Users/ofekd/CampingStore/qa-shots';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  { path: '/',                         name: 'home' },
  { path: '/shop',                     name: 'shop' },
  { path: '/shop/camp-kitchen',        name: 'shop-camp-kitchen' },
  { path: '/shop/vehicle-gear',        name: 'shop-vehicle-gear' },
  { path: '/shop/sleeping',            name: 'shop-sleeping' },
  { path: '/product/espresso-nayad',   name: 'product-espresso' },
  { path: '/product/plasma-lighter',   name: 'product-lighter' },
  { path: '/product/medeflatorm',      name: 'product-deflators' },
  { path: '/product/arasal-shtat',     name: 'product-hammock' },
  { path: '/cart',                     name: 'cart' },
  { path: '/checkout',                 name: 'checkout' },
];

const VIEWPORTS = [
  { width: 1440, height: 900,  label: 'desktop' },
  { width: 390,  height: 844,  label: 'mobile'  },
];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx  = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();

  for (const pg of PAGES) {
    await page.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(600);
    const file = `${OUT}/${vp.label}-${pg.name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${vp.label} ${pg.path}`);
  }

  await ctx.close();
}

await browser.close();
console.log('\nAll screenshots saved to', OUT);
