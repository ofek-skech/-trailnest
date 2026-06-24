/**
 * Gallery interaction verification — live site
 * Tests: arrows, thumbnails, keyboard, mobile dots, single-image hiding
 */
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'https://trailnest-blond.vercel.app';
const SHOTS = new URL('.', import.meta.url).pathname.replace(/^\//, '');
const SLUGS = [
  'camp-stove-single',
  'espresso-nayad',
  'medeflatorm',
  'arasal-shtat',
  'multi-tool-pro',
];

const results = [];

async function testProduct(browser, slug) {
  const url = `${BASE}/product/${slug}`;
  const log = [];
  const r = { slug, url, pass: true, log };

  // ── Desktop context (1440px) ──────────────────────────────────────
  const desktop = await browser.newPage();
  await desktop.setViewportSize({ width: 1440, height: 900 });
  await desktop.goto(url, { waitUntil: 'load', timeout: 60000 });

  // Count images passed to gallery
  const imgCount = await desktop.evaluate(() => {
    const imgs = document.querySelectorAll('[class*="aspect-[4/3]"] img');
    return imgs.length;
  });
  r.imageCount = imgCount;
  log.push(`images in gallery: ${imgCount}`);

  const single = imgCount <= 1;

  // Screenshot: initial state
  await desktop.screenshot({ path: `${SHOTS}/${slug}-01-initial.png`, fullPage: false });

  // ── Arrows visible / hidden ───────────────────────────────────────
  const leftArrow  = desktop.locator('button[aria-label="תמונה הבאה"]');   // next (left side, RTL)
  const rightArrow = desktop.locator('button[aria-label="תמונה קודמת"]');  // prev (right side, RTL)
  const leftVisible  = await leftArrow.isVisible().catch(() => false);
  const rightVisible = await rightArrow.isVisible().catch(() => false);

  if (single) {
    if (leftVisible || rightVisible) {
      log.push('❌ FAIL: single-image product showing arrows');
      r.pass = false;
    } else {
      log.push('✅ arrows correctly hidden for single-image product');
    }
    await desktop.close();
    results.push(r);
    return;
  }

  if (!leftVisible || !rightVisible) {
    log.push(`❌ FAIL: arrows not visible — left:${leftVisible} right:${rightVisible}`);
    r.pass = false;
  } else {
    log.push('✅ both arrows visible');
  }

  // ── Read initial main image src ───────────────────────────────────
  const getActiveSrc = () => desktop.evaluate(() => {
    const imgs = [...document.querySelectorAll('[class*="aspect-[4/3]"] img')];
    const active = imgs.find(img => !img.className.includes('opacity-0'));
    return active ? active.src : null;
  });

  const src0 = await getActiveSrc();
  log.push(`initial image: ${src0?.split('/').pop()}`);

  // ── Click NEXT arrow (left button in RTL) ────────────────────────
  await leftArrow.click();
  await desktop.waitForTimeout(400);
  const src1 = await getActiveSrc();
  if (src1 === src0) {
    log.push('❌ FAIL: next arrow did not change image');
    r.pass = false;
  } else {
    log.push(`✅ next arrow → image changed to ${src1?.split('/').pop()}`);
  }
  await desktop.screenshot({ path: `${SHOTS}/${slug}-02-after-next.png` });

  // ── Click PREV arrow (right button in RTL) ────────────────────────
  await rightArrow.click();
  await desktop.waitForTimeout(400);
  const src2 = await getActiveSrc();
  if (src2 !== src0) {
    log.push(`❌ FAIL: prev arrow did not return to first image (got ${src2?.split('/').pop()})`);
    r.pass = false;
  } else {
    log.push('✅ prev arrow → returned to first image');
  }

  // ── Thumbnail click ───────────────────────────────────────────────
  const thumbnails = desktop.locator('.hidden.md\\:flex button[aria-label]');
  const thumbCount = await thumbnails.count();
  log.push(`thumbnails found: ${thumbCount}`);

  if (thumbCount >= 2) {
    // Active border on first thumb
    const firstThumbBorder = await thumbnails.nth(0).evaluate(el =>
      window.getComputedStyle(el).borderColor
    );
    log.push(`first thumb border-color: ${firstThumbBorder}`);

    // Click second thumbnail
    await thumbnails.nth(1).click();
    await desktop.waitForTimeout(400);
    const src3 = await getActiveSrc();
    if (src3 === src0) {
      log.push('❌ FAIL: thumbnail click did not change image');
      r.pass = false;
    } else {
      log.push(`✅ thumbnail[1] click → image changed to ${src3?.split('/').pop()}`);
    }

    // Verify second thumb now has active border
    const secondThumbBorder = await thumbnails.nth(1).evaluate(el =>
      el.className
    );
    const hasActiveBorder = secondThumbBorder.includes('border-tn-600');
    if (!hasActiveBorder) {
      log.push('❌ FAIL: active thumbnail does not have border-tn-600 class');
      r.pass = false;
    } else {
      log.push('✅ active thumbnail has border-tn-600');
    }
    await desktop.screenshot({ path: `${SHOTS}/${slug}-03-thumbnail.png` });
  }

  // ── Keyboard navigation ───────────────────────────────────────────
  // First go back to image 0
  await rightArrow.click();
  await desktop.waitForTimeout(300);

  await desktop.keyboard.press('ArrowRight');
  await desktop.waitForTimeout(400);
  const srcKbRight = await getActiveSrc();
  if (srcKbRight === src0) {
    log.push('❌ FAIL: ArrowRight key did not change image');
    r.pass = false;
  } else {
    log.push(`✅ ArrowRight → image changed to ${srcKbRight?.split('/').pop()}`);
  }

  await desktop.keyboard.press('ArrowLeft');
  await desktop.waitForTimeout(400);
  const srcKbLeft = await getActiveSrc();
  if (srcKbLeft !== src0) {
    log.push('❌ FAIL: ArrowLeft key did not return to first image');
    r.pass = false;
  } else {
    log.push('✅ ArrowLeft → returned to first image');
  }

  // ── Infinite loop: prev from first → should go to last ───────────
  await rightArrow.click();
  await desktop.waitForTimeout(400);
  const srcLoop = await getActiveSrc();
  if (srcLoop === src0) {
    log.push('❌ FAIL: prev from index 0 did not wrap to last image');
    r.pass = false;
  } else {
    log.push(`✅ infinite loop: prev from [0] → ${srcLoop?.split('/').pop()}`);
  }

  await desktop.close();

  // ── Mobile context (390px) ────────────────────────────────────────
  const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const mobile = await mobileCtx.newPage();
  await mobile.goto(url, { waitUntil: 'load', timeout: 60000 });

  // Dot indicators visible
  const dots = mobile.locator('.md\\:hidden button[aria-label^="תמונה"]');
  const dotCount = await dots.count();
  log.push(`mobile dots: ${dotCount}`);
  if (dotCount !== imgCount) {
    log.push(`⚠️ dot count (${dotCount}) !== image count (${imgCount})`);
  } else {
    log.push('✅ mobile dot count matches image count');
  }

  // Desktop arrows hidden on mobile
  const mobileLeftVisible = await mobile.locator('button[aria-label="תמונה הבאה"]').isVisible().catch(() => false);
  if (mobileLeftVisible) {
    log.push('⚠️ desktop arrows visible on 390px viewport (should be hidden)');
  } else {
    log.push('✅ desktop arrows hidden on mobile');
  }

  // Swipe left (RTL: swipe left = next)
  const galleryBox = await mobile.locator('[class*="aspect-\\[4\\/3\\]"]').boundingBox();
  if (galleryBox) {
    const cx = galleryBox.x + galleryBox.width / 2;
    const cy = galleryBox.y + galleryBox.height / 2;

    const getMobileSrc = () => mobile.evaluate(() => {
      const imgs = [...document.querySelectorAll('[class*="aspect-[4/3]"] img')];
      const active = imgs.find(img => !img.className.includes('opacity-0'));
      return active ? active.src : null;
    });

    const mobileSrc0 = await getMobileSrc();

    // Simulate pointer-based swipe left (dx < 0 → next in RTL)
    await mobile.touchscreen.tap(cx, cy);
    await mobile.waitForTimeout(100);
    await mobile.touchscreen.tap(cx, cy);

    // Use dispatchEvent to fire pointer events directly
    await mobile.evaluate(({ x, y, dx }) => {
      const el = document.elementFromPoint(x, y);
      const gallery = el?.closest('[class*="aspect-[4/3]"]') || el;
      if (!gallery) return;
      const make = (type, clientX, clientY) => {
        const e = new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 1, clientX, clientY, pointerType: 'touch' });
        gallery.dispatchEvent(e);
      };
      make('pointerdown', x, y);
      make('pointermove', x - 20, y);
      make('pointermove', x - 60, y);
      make('pointermove', x + dx, y);
      make('pointerup', x + dx, y);
    }, { x: cx, y: cy, dx: -120 });

    await mobile.waitForTimeout(500);
    const mobileSrc1 = await getMobileSrc();
    if (mobileSrc1 !== mobileSrc0) {
      log.push('✅ mobile swipe left (pointer events) changed image');
    } else {
      log.push('⚠️ mobile swipe did not change image');
    }
  }

  await mobile.screenshot({ path: `${SHOTS}/${slug}-04-mobile.png` });
  await mobile.close();
  await mobileCtx.close();

  results.push(r);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const slug of SLUGS) {
    console.log(`\n── Testing: ${slug} ──`);
    try {
      await testProduct(browser, slug);
    } catch (err) {
      results.push({ slug, url: `${BASE}/product/${slug}`, pass: false, imageCount: 0, log: [`❌ ERROR: ${err.message}`] });
    }
  }

  await browser.close();

  // Print report
  console.log('\n\n══════════════════════════════════════════');
  console.log('GALLERY VERIFICATION REPORT');
  console.log('══════════════════════════════════════════\n');
  for (const r of results) {
    const verdict = r.pass ? '✅ PASS' : '❌ FAIL';
    console.log(`${verdict}  ${r.slug}  (${r.imageCount} images)`);
    console.log(`        ${r.url}`);
    for (const line of r.log) {
      console.log(`        ${line}`);
    }
    console.log('');
  }

  const allPass = results.every(r => r.pass);
  console.log(`\nOverall: ${allPass ? '✅ ALL PASS' : '❌ FAILURES FOUND'}`);
  console.log(`Screenshots saved to: ${SHOTS}`);

  writeFileSync(`${SHOTS}/report.json`, JSON.stringify(results, null, 2));
  process.exit(allPass ? 0 : 1);
})();
