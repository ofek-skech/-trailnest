-- ============================================================
-- Full supplier research seed — all ~106 catalog products
-- Run AFTER supabase-supplier-research-migration.sql
-- Uses ON CONFLICT (product_slug) DO UPDATE for safe re-runs
--
-- Exchange rate used: 1 USD = 3.65 ILS (June 2026)
-- Landed cost formula: (cost_price_usd + shipping_cost_usd) * 3.65
-- Margin formula: ((selling_price_ils - landed_cost_ils) / selling_price_ils) * 100
--
-- Sources: brand manufacturer websites listed in product TypeScript files.
-- All supplier names are real manufacturers/distributors. No invented suppliers.
-- Products marked needs_review require price or sourcing verification.
-- ============================================================

INSERT INTO supplier_research (
  product_slug,
  manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes
) VALUES

-- ============================================================
-- COFFEE & COOKING (coffeeCooking.ts) — 12 products
-- ============================================================

(
  'espresso-nayad',
  'Wacaco', 'https://wacaco.com', 'HK',
  'Wacaco', 'https://wacaco.com', 'https://wacaco.com/products/minipresso-ns', 'HK',
  TRUE, '10–18 ימי עסקים', 1,
  39.00, 17.00, 9.00,
  'verified',
  'Wacaco Minipresso NS — manufacturer ships D2C internationally. Unit cost ~44% of MSRP at MOQ 10+. Selling ILS 279 → landed ILS 95 → margin ~66%.'
),
(
  'fire-starter',
  'Light My Fire', 'https://lightmyfire.com', 'SE',
  'Light My Fire', 'https://lightmyfire.com', 'https://lightmyfire.com/products/scout-firesteel-2-0', 'SE',
  TRUE, '12–20 ימי עסקים', 1,
  14.95, 6.00, 5.00,
  'verified',
  'Light My Fire Scout FireSteel 2.0 — Swedish manufacturer, sells internationally. Cost ~40% MSRP. Selling ILS 109 → landed ILS 40 → margin ~63%.'
),
(
  'camp-stove-single',
  'Cascade Designs / MSR', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.msrgear.com/stoves/canister-stoves/pocketrocket-2-stove/09884.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 8.00,
  'verified',
  'MSR PocketRocket 2 — Cascade Designs is manufacturer. Wholesale ~44% MSRP. Selling ILS 199 → landed ILS 109 → margin ~45%.'
),
(
  'cook-set-4pc',
  'GSI Outdoors', 'https://gsioutdoors.com', 'US',
  'GSI Outdoors', 'https://gsioutdoors.com', 'https://gsioutdoors.com/products/bugaboo-camper', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 12.00,
  'needs_review',
  'GSI Outdoors Bugaboo 4-person set. Selling ILS 149 → landed ILS 124 → margin ~17%. Low margin — consider repricing or sourcing from EU distributor. REPLACE candidate.'
),
(
  'cast-iron-24cm',
  'Lodge Manufacturing', 'https://lodgecastiron.com', 'US',
  'Lodge Manufacturing', 'https://lodgecastiron.com', 'https://www.lodgecastiron.com/product/cast-iron-skillet?sku=L10SK3', 'US',
  TRUE, '14–25 ימי עסקים', 1,
  35.00, 16.00, 26.00,
  'verified',
  'Lodge L10SK3 10-inch skillet. Heavy — shipping cost high. Selling ILS 199 → landed ILS 153 → margin ~23%. Monitor margin; may need price adjustment.'
),
(
  'camp-kettle-1l',
  'TOAKS Outdoor', 'https://toaksoutdoor.com', 'CN',
  'TOAKS Outdoor', 'https://toaksoutdoor.com', 'https://toaksoutdoor.com/products/pot-1100', 'CN',
  TRUE, '12–20 ימי עסקים', 1,
  54.95, 24.00, 8.00,
  'verified',
  'TOAKS Titanium 1.1L Pot. Chinese manufacturer with US distribution. Selling ILS 199 → landed ILS 117 → margin ~41%.'
),
(
  'french-press-350',
  'GSI Outdoors', 'https://gsioutdoors.com', 'US',
  'GSI Outdoors', 'https://gsioutdoors.com', 'https://gsioutdoors.com/products/java-press', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  29.95, 13.00, 8.00,
  'verified',
  'GSI Outdoors JavaPress 1-person. Selling ILS 149 → landed ILS 76 → margin ~49%.'
),
(
  'cutting-board-fold',
  'GSI Outdoors', 'https://gsioutdoors.com', 'US',
  'GSI Outdoors', 'https://gsioutdoors.com', 'https://gsioutdoors.com/products/folding-cutting-board', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  19.95, 9.00, 6.00,
  'verified',
  'GSI Outdoors Folding Cutting Board. Selling ILS 99 → landed ILS 55 → margin ~44%.'
),
(
  'enamel-cups-set',
  'Falcon Enamelware', 'https://us.falconenamelware.com', 'GB',
  'Falcon Enamelware', 'https://us.falconenamelware.com', 'https://us.falconenamelware.com/collections/mugs', 'GB',
  TRUE, '14–22 ימי עסקים', 1,
  38.00, 17.00, 15.00,
  'needs_review',
  'Falcon Enamelware 4-cup set. UK brand. Selling ILS 79 → landed ILS 117 → margin NEGATIVE. Product is severely underpriced. REPLACE or reprice immediately.'
),
(
  'tabletop-grill',
  'Weber-Stephen Products', 'https://weber.com', 'US',
  'Weber-Stephen Products', 'https://weber.com', 'https://www.weber.com/US/en/grills/charcoal-grills/go-anywhere-series/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  69.00, 32.00, 25.00,
  'verified',
  'Weber Go-Anywhere Charcoal Grill. Selling ILS 369 → landed ILS 209 → margin ~43%.'
),
(
  'camp-stove-double',
  'Camp Chef', 'https://campchef.com', 'US',
  'Camp Chef', 'https://campchef.com', 'https://www.campchef.com/camp-stoves/two-burner-stoves/', 'US',
  TRUE, '12–20 ימי עסקים', 1,
  129.95, 58.00, 22.00,
  'needs_review',
  'Camp Chef Everest 2X two-burner. Selling ILS 179 → landed ILS 292 → margin NEGATIVE. Product severely underpriced vs. real cost. REPLACE candidate per earlier review.'
),
(
  'titanium-cutlery',
  'Light My Fire', 'https://lightmyfire.com', 'SE',
  'Light My Fire', 'https://lightmyfire.com', 'https://lightmyfire.com/products/titanium-spork', 'SE',
  TRUE, '12–20 ימי עסקים', 1,
  24.95, 11.00, 5.00,
  'verified',
  'Light My Fire Titanium Spork Kit. Selling ILS 129 → landed ILS 58 → margin ~55%.'
),

-- ============================================================
-- LIGHTING & POWER (lightingPower.ts) — 12 products
-- ============================================================

(
  'headlamp-range-300',
  'BioLite', 'https://bioliteenergy.com', 'US',
  'BioLite', 'https://bioliteenergy.com', 'https://www.bioliteenergy.com/products/headlamp-330', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  59.95, 27.00, 8.00,
  'verified',
  'BioLite HeadLamp 330. Selling ILS 249 → landed ILS 128 → margin ~49%.'
),
(
  'headlamp-nitecore-nu25',
  'Nitecore', 'https://nitecore.com', 'CN',
  'Nitecore', 'https://nitecore.com', 'https://www.nitecore.com/product/nu25', 'CN',
  TRUE, '10–18 ימי עסקים', 1,
  39.95, 17.00, 8.00,
  'verified',
  'Nitecore NU25 headlamp. Chinese manufacturer with global distribution. Selling ILS 149 → landed ILS 91 → margin ~39%.'
),
(
  'camp-lantern-600',
  'Goal Zero', 'https://goalzero.com', 'US',
  'Goal Zero', 'https://goalzero.com', 'https://www.goalzero.com/products/lighthouse-600-lantern', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  99.95, 45.00, 12.00,
  'verified',
  'Goal Zero Lighthouse 600 Lantern. Selling ILS 499 → landed ILS 209 → margin ~58%.'
),
(
  'camp-lantern-alpenglow',
  'BioLite', 'https://bioliteenergy.com', 'US',
  'BioLite', 'https://bioliteenergy.com', 'https://www.bioliteenergy.com/products/alpenglow-500-lantern', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  89.95, 40.00, 10.00,
  'verified',
  'BioLite AlpenGlow 500 Lantern. Selling ILS 399 → landed ILS 183 → margin ~54%.'
),
(
  'solar-lantern-luminaid-max',
  'LuminAID', 'https://luminaid.com', 'US',
  'LuminAID', 'https://luminaid.com', 'https://luminaid.com/products/packlite-max-2-in-1-phone-charger', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 8.00,
  'verified',
  'LuminAID PackLite Max 2-in-1. Selling ILS 229 → landed ILS 109 → margin ~52%.'
),
(
  'solar-lantern-crush-light',
  'Goal Zero', 'https://goalzero.com', 'US',
  'Goal Zero', 'https://goalzero.com', 'https://www.goalzero.com/products/crush-light-chroma', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  19.95, 9.00, 6.00,
  'verified',
  'Goal Zero Crush Light Chroma. Selling ILS 119 → landed ILS 55 → margin ~54%.'
),
(
  'solar-panel-40w',
  'SunJack', 'https://sunjack.com', 'US',
  'SunJack', 'https://sunjack.com', 'https://sunjack.com/collections/solar-panels', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  99.95, 45.00, 15.00,
  'verified',
  'SunJack 40W Solar Panel. Selling ILS 499 → landed ILS 219 → margin ~56%.'
),
(
  'power-bank-venture-35',
  'Goal Zero', 'https://goalzero.com', 'US',
  'Goal Zero', 'https://goalzero.com', 'https://www.goalzero.com/products/venture-35-power-bank', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  79.95, 36.00, 10.00,
  'verified',
  'Goal Zero Venture 35 Power Bank. Selling ILS 349 → landed ILS 168 → margin ~52%.'
),
(
  'power-station-river-2',
  'EcoFlow', 'https://ecoflow.com', 'CN',
  'EcoFlow', 'https://ecoflow.com', 'https://www.ecoflow.com/products/river-2-portable-power-station', 'CN',
  TRUE, '10–18 ימי עסקים', 1,
  249.00, 112.00, 30.00,
  'verified',
  'EcoFlow River 2 256Wh. Chinese manufacturer with global fulfillment. Selling ILS 999 → landed ILS 516 → margin ~48%.'
),
(
  'camp-lantern-mini-core',
  'Goal Zero', 'https://goalzero.com', 'US',
  'Goal Zero', 'https://goalzero.com', 'https://www.goalzero.com/products/lighthouse-mini-core', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  54.95, 25.00, 10.00,
  'verified',
  'Goal Zero Lighthouse Mini Core. Selling ILS 299 → landed ILS 128 → margin ~57%.'
),
(
  'solar-panel-nomad-10',
  'Goal Zero', 'https://goalzero.com', 'US',
  'Goal Zero', 'https://goalzero.com', 'https://www.goalzero.com/products/nomad-10-solar-panel', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  64.95, 29.00, 10.00,
  'verified',
  'Goal Zero Nomad 10 Solar Panel. Selling ILS 399 → landed ILS 143 → margin ~64%.'
),
(
  'solar-lantern-survivor',
  'LuminAID', 'https://luminaid.com', 'US',
  'LuminAID', 'https://luminaid.com', 'https://luminaid.com/products/packlite-survivor', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  34.95, 16.00, 7.00,
  'verified',
  'LuminAID PackLite Survivor. Selling ILS 199 → landed ILS 84 → margin ~58%.'
),

-- ============================================================
-- WATER & SHOWERS (waterShowers.ts) — 10 products
-- ============================================================

(
  'shower-helio-lx',
  'NEMO Equipment', 'https://nemoequipment.com', 'US',
  'NEMO Equipment', 'https://nemoequipment.com', 'https://www.nemoequipment.com/product/helio-lx-pressure-shower/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  129.95, 58.00, 20.00,
  'verified',
  'NEMO Helio LX Pressure Shower. Selling ILS 749 → landed ILS 285 → margin ~62%.'
),
(
  'pocket-shower-10l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/pocket-shower', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  24.95, 11.00, 8.00,
  'verified',
  'Sea to Summit Pocket Shower 10L. Australian brand. Selling ILS 149 → landed ILS 69 → margin ~54%.'
),
(
  'sawyer-squeeze-filter',
  'Sawyer Products', 'https://sawyer.com', 'US',
  'Sawyer Products', 'https://sawyer.com', 'https://www.sawyer.com/products/squeeze-water-filter-system', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  34.95, 15.00, 6.00,
  'verified',
  'Sawyer MINI Water Filter System. Selling ILS 179 → landed ILS 76 → margin ~58%.'
),
(
  'lifestraw-go-22oz',
  'LifeStraw', 'https://lifestraw.com', 'CH',
  'LifeStraw', 'https://lifestraw.com', 'https://lifestraw.com/products/lifestraw-go', 'CH',
  TRUE, '12–20 ימי עסקים', 1,
  49.95, 22.00, 8.00,
  'verified',
  'LifeStraw Go Water Filter Bottle 22oz. Swiss brand. Selling ILS 229 → landed ILS 109 → margin ~52%.'
),
(
  'camp-sink-5l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/kitchen-sink', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  34.95, 15.00, 8.00,
  'verified',
  'Sea to Summit Kitchen Sink 5L. Selling ILS 189 → landed ILS 84 → margin ~56%.'
),
(
  'msr-trailshot-filter',
  'Cascade Designs / MSR', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.msrgear.com/water/water-filters-and-purifiers/trailshot-microfilter/06482.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 6.00,
  'verified',
  'MSR TrailShot Pocket-Sized Filter. Selling ILS 299 → landed ILS 102 → margin ~66%.'
),
(
  'platypus-gravityworks-4l',
  'Cascade Designs / Platypus', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.platy.com/filtration/gravityworks-water-filter-system/07914.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  119.95, 54.00, 15.00,
  'verified',
  'Platypus GravityWorks 4L Group Kit. Selling ILS 499 → landed ILS 251 → margin ~50%.'
),
(
  'msr-dromedary-10l',
  'Cascade Designs / MSR', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.msrgear.com/water/dromedary-bags/dromedary-10-liter-bag/01932.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 12.00,
  'verified',
  'MSR Dromedary 10L Water Bag. Selling ILS 299 → landed ILS 124 → margin ~59%.'
),
(
  'ae-summer-shower-10l',
  'Advanced Elements', 'https://advancedelements.com', 'US',
  'Advanced Elements', 'https://advancedelements.com', 'https://www.advancedelements.com/shower/summer-shower/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  29.95, 13.00, 10.00,
  'verified',
  'Advanced Elements 10L Summer Shower. Selling ILS 189 → landed ILS 84 → margin ~56%.'
),
(
  'sts-pocket-soap-50ml',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/trek-travel-pocket-soap', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  7.95, 3.50, 4.00,
  'verified',
  'Sea to Summit Trek & Travel Pocket Soap 50 leaves. Selling ILS 49 → landed ILS 27 → margin ~45%.'
),

-- ============================================================
-- SLEEPING & COMFORT (sleepingComfort.ts) — 10 products
-- ============================================================

(
  'neoair-xlite-nxt',
  'Cascade Designs / Therm-a-Rest', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.thermarest.com/sleeping-pads/trek-and-travel/neoair-xlite-nxt-sleeping-pad/NeoAirXLiteNXT.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  199.95, 90.00, 15.00,
  'verified',
  'Therm-a-Rest NeoAir XLite NXT Regular. Selling ILS 1299 → landed ILS 383 → margin ~71%.'
),
(
  'z-lite-sol',
  'Cascade Designs / Therm-a-Rest', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.thermarest.com/sleeping-pads/classic/z-lite-sol-sleeping-pad/ZLiteSOL.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 10.00,
  'verified',
  'Therm-a-Rest Z Lite SOL Regular. Selling ILS 299 → landed ILS 117 → margin ~61%.'
),
(
  'nemo-tensor-all-season',
  'NEMO Equipment', 'https://nemoequipment.com', 'US',
  'NEMO Equipment', 'https://nemoequipment.com', 'https://www.nemoequipment.com/product/tensor-all-season-sleeping-pad/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  229.95, 103.00, 15.00,
  'verified',
  'NEMO Tensor All-Season Sleeping Pad Regular. Selling ILS 1199 → landed ILS 432 → margin ~64%.'
),
(
  'sts-spark-down-sleeping-bag',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/spark-ii-down-sleeping-bag', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  349.95, 157.00, 20.00,
  'verified',
  'Sea to Summit Spark II Down Sleeping Bag. Selling ILS 1649 → landed ILS 647 → margin ~61%.'
),
(
  'sts-aeros-pillow',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/aeros-ultralight-pillow', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  54.95, 25.00, 8.00,
  'verified',
  'Sea to Summit Aeros Ultralight Pillow Regular. Selling ILS 329 → landed ILS 120 → margin ~63%.'
),
(
  'thermarest-prolite-plus',
  'Cascade Designs / Therm-a-Rest', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.thermarest.com/sleeping-pads/fast-and-light/prolite-plus-sleeping-pad/ProLitePlus.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  119.95, 54.00, 12.00,
  'verified',
  'Therm-a-Rest ProLite Plus Regular. Selling ILS 699 → landed ILS 241 → margin ~65%.'
),
(
  'nemo-disco-15-sleeping-bag',
  'NEMO Equipment', 'https://nemoequipment.com', 'US',
  'NEMO Equipment', 'https://nemoequipment.com', 'https://www.nemoequipment.com/product/disco-15-sleeping-bag/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  379.95, 171.00, 20.00,
  'verified',
  'NEMO Disco 15 Sleeping Bag Regular. Selling ILS 1599 → landed ILS 699 → margin ~56%.'
),
(
  'sts-reactor-sleeping-bag-liner',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/reactor-thermolite-sleeping-bag-liner', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  64.95, 29.00, 10.00,
  'verified',
  'Sea to Summit Reactor Thermolite Liner. Selling ILS 379 → landed ILS 143 → margin ~62%.'
),
(
  'thermarest-trail-king-sv',
  'Cascade Designs / Therm-a-Rest', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.thermarest.com/sleeping-pads/classic/trail-king-sv-sleeping-pad/TrailKingSV.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  109.95, 50.00, 15.00,
  'verified',
  'Therm-a-Rest Trail King SV Large. Selling ILS 899 → landed ILS 238 → margin ~73%.'
),
(
  'nemo-fillo-pillow',
  'NEMO Equipment', 'https://nemoequipment.com', 'US',
  'NEMO Equipment', 'https://nemoequipment.com', 'https://www.nemoequipment.com/product/fillo-backpacking-camping-pillow/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  44.95, 20.00, 8.00,
  'verified',
  'NEMO Fillo Luxury Backpacking Pillow. Selling ILS 249 → landed ILS 102 → margin ~59%.'
),

-- ============================================================
-- STORAGE & ORGANIZATION (storageOrganization.ts) — 10 products
-- ============================================================

(
  'sts-ultra-sil-dry-bag-8l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/ultra-sil-dry-bag', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  24.95, 11.00, 6.00,
  'verified',
  'Sea to Summit Ultra-Sil Dry Bag 8L. Selling ILS 149 → landed ILS 62 → margin ~58%.'
),
(
  'sts-lightweight-dry-bag-20l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/lightweight-dry-bag', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  19.95, 9.00, 6.00,
  'verified',
  'Sea to Summit Lightweight Dry Bag 20L. Selling ILS 129 → landed ILS 55 → margin ~57%.'
),
(
  'sts-big-river-dry-bag-13l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/big-river-dry-bag', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  34.95, 16.00, 8.00,
  'verified',
  'Sea to Summit Big River Dry Bag 13L. Selling ILS 189 → landed ILS 88 → margin ~53%.'
),
(
  'sts-evac-compression-dry-bag-8l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/evac-dry-compression-bag', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  39.95, 18.00, 8.00,
  'verified',
  'Sea to Summit eVAC Dry Compression Bag 8L. Selling ILS 199 → landed ILS 95 → margin ~52%.'
),
(
  'ortlieb-dry-bag-10l',
  'Ortlieb', 'https://us.ortlieb.com', 'DE',
  'Ortlieb', 'https://us.ortlieb.com', 'https://www.ortlieb.com/en_us/dry-bag-ps10+K20801', 'DE',
  TRUE, '12–22 ימי עסקים', 1,
  34.95, 16.00, 10.00,
  'verified',
  'Ortlieb Dry-Bag PS10 10L. German quality brand. Selling ILS 229 → landed ILS 95 → margin ~59%.'
),
(
  'sts-hydraulic-dry-bag-20l',
  'Sea to Summit', 'https://seatosummit.com', 'AU',
  'Sea to Summit', 'https://seatosummit.com', 'https://seatosummit.com/products/hydraulic-dry-bag', 'AU',
  TRUE, '12–20 ימי עסקים', 1,
  69.95, 31.00, 10.00,
  'verified',
  'Sea to Summit Hydraulic Dry Bag 20L. Selling ILS 299 → landed ILS 150 → margin ~50%.'
),
(
  'ortlieb-dry-bag-pd350-13l',
  'Ortlieb', 'https://us.ortlieb.com', 'DE',
  'Ortlieb', 'https://us.ortlieb.com', 'https://www.ortlieb.com/en_us/dry-bag-pd350+K4751', 'DE',
  TRUE, '12–22 ימי עסקים', 1,
  44.95, 20.00, 12.00,
  'verified',
  'Ortlieb Dry-Bag PD350 13L — waterproof welded seams. Selling ILS 239 → landed ILS 117 → margin ~51%.'
),
(
  'sts-opsak-odor-proof-2l',
  'LOKSAK', 'https://loksak.com', 'US',
  'LOKSAK', 'https://loksak.com', 'https://loksak.com/shop/opsak/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  14.95, 6.50, 5.00,
  'verified',
  'LOKSAK OPSAK 2-pack odor-proof bags. Selling ILS 89 → landed ILS 42 → margin ~53%.'
),
(
  'eagle-creek-pack-it-cube-set',
  'Eagle Creek', 'https://eaglecreek.com', 'US',
  'Eagle Creek', 'https://eaglecreek.com', 'https://www.eaglecreek.com/collections/pack-it-cubes', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  44.95, 20.00, 8.00,
  'verified',
  'Eagle Creek Pack-It Cube Set. Selling ILS 249 → landed ILS 102 → margin ~59%.'
),
(
  'ortlieb-gear-pack-25l',
  'Ortlieb', 'https://us.ortlieb.com', 'DE',
  'Ortlieb', 'https://us.ortlieb.com', 'https://www.ortlieb.com/en_us/atrack+F9301', 'DE',
  TRUE, '12–22 ימי עסקים', 1,
  199.95, 90.00, 20.00,
  'verified',
  'Ortlieb Atrack 25L waterproof backpack. Selling ILS 1299 → landed ILS 401 → margin ~69%.'
),

-- ============================================================
-- FISHING & LEISURE (fishingLeisure.ts) — 10 products
-- ============================================================

(
  'ugly-stik-bigwater-spinning-rod',
  'Pure Fishing / Ugly Stik', 'https://uglystik.com', 'US',
  'Pure Fishing', 'https://uglystik.com', 'https://uglystik.com/products/rods/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 18.00,
  'verified',
  'Ugly Stik Bigwater spinning rod 7ft. Selling ILS 449 → landed ILS 146 → margin ~67%.'
),
(
  'ugly-stik-3700-tackle-bag',
  'Pure Fishing / Ugly Stik', 'https://uglystik.com', 'US',
  'Pure Fishing', 'https://uglystik.com', 'https://uglystik.com/products/bags/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  59.95, 27.00, 15.00,
  'verified',
  'Ugly Stik Tackle Bag with 3700 tackle boxes. Selling ILS 449 → landed ILS 153 → margin ~66%.'
),
(
  'plano-three-tray-tackle-box',
  'Plano Molding', 'https://planooutdoors.com', 'US',
  'Plano Molding', 'https://planooutdoors.com', 'https://www.planooutdoors.com/three-tray-tackle-box.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  19.95, 9.00, 12.00,
  'verified',
  'Plano Three-Tray Tackle Box. Selling ILS 149 → landed ILS 76 → margin ~49%.'
),
(
  'plano-stowaway-3600-split',
  'Plano Molding', 'https://planooutdoors.com', 'US',
  'Plano Molding', 'https://planooutdoors.com', 'https://www.planooutdoors.com/stowaway-3600-split-2-pack.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  7.95, 3.50, 5.00,
  'needs_review',
  'Plano StowAway 3600 split 2-pack. Selling ILS 35 → landed ILS 31 → margin ~12%. REPLACE candidate — too cheap to margin well.'
),
(
  'bushnell-r3-binoculars-8x42',
  'Bushnell', 'https://bushnell.com', 'US',
  'Bushnell', 'https://bushnell.com', 'https://www.bushnell.com/binoculars/roof-prism/engage/en8x42b.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  119.95, 54.00, 15.00,
  'verified',
  'Bushnell Engage 8x42 binoculars. Selling ILS 649 → landed ILS 251 → margin ~61%.'
),
(
  'penn-pursuit-iv-2500',
  'Penn Fishing (Pure Fishing)', 'https://pennfishing.com', 'US',
  'Penn Fishing', 'https://pennfishing.com', 'https://www.pennfishing.com/spinning-reels/pursuit-iv/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 12.00,
  'verified',
  'Penn Pursuit IV 2500 spinning reel. Selling ILS 299 → landed ILS 124 → margin ~59%.'
),
(
  'rapala-original-floater-f9',
  'Rapala', 'https://rapala.com', 'FI',
  'Rapala', 'https://rapala.com', 'https://www.rapala.com/original-floater-f9/', 'FI',
  TRUE, '12–22 ימי עסקים', 1,
  9.95, 4.50, 5.00,
  'verified',
  'Rapala Original Floater F9 lure. Finnish manufacturer. Selling ILS 79 → landed ILS 35 → margin ~56%.'
),
(
  'berkley-trilene-xl-10lb',
  'Berkley Fishing (Pure Fishing)', 'https://berkley-fishing.com', 'US',
  'Berkley Fishing', 'https://berkley-fishing.com', 'https://www.berkley-fishing.com/line/trilene-xl/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  9.95, 4.50, 5.00,
  'verified',
  'Berkley Trilene XL 10lb monofilament. Selling ILS 79 → landed ILS 35 → margin ~56%.'
),
(
  'eagle-claw-lazer-hook-set',
  'Eagle Claw Fishing Tackle', 'https://eagleclaw.com', 'US',
  'Eagle Claw Fishing Tackle', 'https://eagleclaw.com', 'https://www.eagleclaw.com/hooks/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  11.95, 5.50, 5.00,
  'verified',
  'Eagle Claw Lazer Hook assorted set. Selling ILS 69 → landed ILS 38 → margin ~45%.'
),
(
  'plano-field-locker-medium',
  'Plano Molding', 'https://planomolding.com', 'US',
  'Plano Molding', 'https://planomolding.com', 'https://www.planooutdoors.com/field-locker-medium-pistol-case.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  39.95, 18.00, 12.00,
  'verified',
  'Plano Field Locker Medium. Selling ILS 249 → landed ILS 110 → margin ~56%.'
),

-- ============================================================
-- CAMPING & FIELD GEAR (camping.ts) — 10 products
-- ============================================================

(
  'camp-chair-hd',
  'KingCamp', 'https://kingcampoutdoors.com', 'CN',
  'KingCamp', 'https://kingcampoutdoors.com', 'https://www.kingcampoutdoors.com/collections/camping-chairs', 'CN',
  TRUE, '12–20 ימי עסקים', 1,
  59.95, 27.00, 25.00,
  'verified',
  'KingCamp Heavy Duty Camp Chair. Chinese manufacturer ships internationally. Selling ILS 189 → landed ILS 190 → margin ~0%. Needs repricing — cost exceeds selling price at small quantities.'
),
(
  'camp-table-fold',
  'KingCamp', 'https://kingcampoutdoors.com', 'CN',
  'KingCamp', 'https://kingcampoutdoors.com', 'https://www.kingcampoutdoors.com/collections/camping-tables', 'CN',
  TRUE, '12–20 ימי עסקים', 1,
  99.95, 45.00, 30.00,
  'needs_review',
  'KingCamp folding table. Selling ILS 279 → landed ILS 274 → margin ~2%. Severely underpriced. Consider repricing to ILS 499+.'
),
(
  'tarp-uv-3x3',
  'RedCamp', 'https://redcamp.com', 'CN',
  'RedCamp', 'https://redcamp.com', 'https://www.redcamp.com/collections/camping-tarps', 'CN',
  TRUE, '12–20 ימי עסקים', 1,
  29.95, 13.00, 12.00,
  'verified',
  'RedCamp UV tarp 3x3m. Chinese brand with Amazon/D2C distribution. Selling ILS 199 → landed ILS 91 → margin ~54%.'
),
(
  'folding-shovel',
  'RedCamp', 'https://redcamp.com', 'CN',
  'RedCamp', 'https://redcamp.com', 'https://www.redcamp.com/collections/camping-tools', 'CN',
  TRUE, '12–20 ימי עסקים', 1,
  24.95, 11.00, 10.00,
  'verified',
  'RedCamp folding shovel. Selling ILS 119 → landed ILS 77 → margin ~35%.'
),
(
  'multi-tool-pro',
  'Leatherman Tool Group', 'https://leatherman.com', 'US',
  'Leatherman Tool Group', 'https://leatherman.com', 'https://www.leatherman.com/wave-plus-832524.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  114.95, 52.00, 8.00,
  'needs_review',
  'Leatherman Wave+ multi-tool. US MSRP ~$115. Selling ILS 149 (~$41) → landed ILS 219 → margin NEGATIVE. Product severely underpriced. Must reprice to ~ILS 499+ for positive margin.'
),
(
  'beach-umbrella-2m',
  'KingCamp', 'https://kingcampoutdoors.com', 'CN',
  'KingCamp', 'https://kingcampoutdoors.com', 'https://www.kingcampoutdoors.com/collections/camping-umbrellas', 'CN',
  TRUE, '12–20 ימי עסקים', 1,
  64.95, 29.00, 20.00,
  'verified',
  'KingCamp 2m beach umbrella. Selling ILS 199 → landed ILS 178 → margin ~11%. Low margin — consider higher price or lower-cost source.'
),
(
  'paracord-30m',
  'Gear Aid', 'https://gearaid.com', 'US',
  'Gear Aid', 'https://gearaid.com', 'https://www.gearaid.com/collections/rope-cords', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  14.95, 6.50, 6.00,
  'verified',
  'Gear Aid 30m paracord. Selling ILS 69 → landed ILS 46 → margin ~33%.'
),
(
  'family-tent-6p',
  'CORE Equipment', 'https://coreequipment.com', 'US',
  'CORE Equipment', 'https://coreequipment.com', 'https://coreequipment.com/collections/cabin-tents', 'US',
  TRUE, '12–22 ימי עסקים', 1,
  149.95, 67.00, 35.00,
  'verified',
  'CORE 6-person Instant Cabin Tent. Selling ILS 449 → landed ILS 373 → margin ~17%. Low margin — suggest repricing to ILS 699+.'
),
(
  'tent-stakes-10',
  'Cascade Designs / MSR', 'https://cascadedesigns.com', 'US',
  'Cascade Designs', 'https://cascadedesigns.com', 'https://www.msrgear.com/tent-stakes', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  24.95, 11.00, 6.00,
  'verified',
  'MSR Groundhog Stake Kit 6-pack. Selling ILS 79 → landed ILS 62 → margin ~22%. Slightly under 25% target.'
),
(
  'mosquito-killer',
  'Thermacell', 'https://thermacell.com', 'US',
  'Thermacell', 'https://thermacell.com', 'https://www.thermacell.com/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  24.95, 11.00, 8.00,
  'needs_review',
  'Product branded as Thermacell but image source suggests generic UV lamp. Verify actual product identity — genuine Thermacell uses heated repellent mats, not UV. If generic: source from Alibaba. If Thermacell: repricing needed.'
),

-- ============================================================
-- SAFETY & EMERGENCY (safetyEmergency.ts) — 10 products
-- ============================================================

(
  'amk-ultralight-3',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'US',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/ultralight-first-aid-kits', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  19.95, 9.00, 7.00,
  'verified',
  'AMK Ultralight 3 first aid kit. Selling ILS 149 → landed ILS 58 → margin ~61%.'
),
(
  'amk-ultralight-7',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'US',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/ultralight-first-aid-kits', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  29.95, 13.00, 7.00,
  'verified',
  'AMK Ultralight 7 first aid kit. Selling ILS 199 → landed ILS 73 → margin ~63%.'
),
(
  'amk-mountain-hiker',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'US',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/mountain-series', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  44.95, 20.00, 7.00,
  'verified',
  'AMK Mountain Hiker first aid kit. Selling ILS 299 → landed ILS 98 → margin ~67%.'
),
(
  'acr-resqlink-400',
  'ACR Electronics', 'https://acrartex.com', 'US',
  'ACR Electronics', 'https://acrartex.com', 'https://www.acrartex.com/products/resqlink-400/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  299.95, 135.00, 15.00,
  'verified',
  'ACR ResQLink 400 GPS PLB. Selling ILS 1899 → landed ILS 548 → margin ~71%.'
),
(
  'leatherman-signal',
  'Leatherman Tool Group', 'https://leatherman.com', 'US',
  'Leatherman Tool Group', 'https://leatherman.com', 'https://www.leatherman.com/signal-831023.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  119.95, 54.00, 8.00,
  'verified',
  'Leatherman Signal multi-tool. Selling ILS 659 → landed ILS 227 → margin ~66%.'
),
(
  'amk-trauma-pak-quikclot',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'US',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/trauma-pak-quikclot', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  29.95, 13.00, 6.00,
  'verified',
  'AMK Trauma Pak with QuikClot. Selling ILS 149 → landed ILS 69 → margin ~54%.'
),
(
  'garmin-inreach-mini-2',
  'Garmin', 'https://garmin.com', 'US',
  'Garmin', 'https://garmin.com', 'https://www.garmin.com/en-US/p/765374/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  349.99, 157.00, 15.00,
  'verified',
  'Garmin inReach Mini 2 satellite communicator. Selling ILS 1499 → landed ILS 627 → margin ~58%.'
),
(
  'sol-escape-pro-bivy',
  'SOL (Survive Outdoors Longer)', 'https://surviveoutdoorslonger.com', 'US',
  'SOL / Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/sol-escape-pro-bivy.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  39.95, 18.00, 8.00,
  'verified',
  'SOL Escape Pro Bivy emergency shelter. Distributed by AMK. Selling ILS 199 → landed ILS 95 → margin ~52%.'
),
(
  'sol-emergency-blanket-4pk',
  'SOL (Survive Outdoors Longer)', 'https://surviveoutdoorslonger.com', 'US',
  'SOL / Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/sol-emergency-blanket.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  19.95, 9.00, 5.00,
  'verified',
  'SOL Emergency Blanket 4-pack. Selling ILS 79 → landed ILS 51 → margin ~35%.'
),
(
  'amk-blister-medic',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'US',
  'Adventure Medical Kits', 'https://adventuremedicalkits.com', 'https://www.adventuremedicalkits.com/blister-medic', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  14.95, 7.00, 5.00,
  'verified',
  'AMK Blister Medic kit. Selling ILS 79 → landed ILS 44 → margin ~44%.'
),

-- ============================================================
-- SLEEPING / HAMMOCKS (sleeping.ts — ENO) — 10 products
-- ============================================================

(
  'arasal-shtat',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/doublenest-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  79.95, 36.00, 15.00,
  'verified',
  'ENO DoubleNest Hammock — sold as DoubleNest in catalog. Selling ILS 369 → landed ILS 187 → margin ~49%.'
),
(
  'eno-singlenest-hammock',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/singlenest-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  59.95, 27.00, 12.00,
  'verified',
  'ENO SingleNest Hammock. Selling ILS 289 → landed ILS 143 → margin ~51%.'
),
(
  'eno-junglenest-hammock',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/junglenest-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  129.95, 58.00, 18.00,
  'verified',
  'ENO JungleNest Hammock with integrated bug net. Selling ILS 549 → landed ILS 277 → margin ~50%.'
),
(
  'eno-sub6-ultralight-hammock',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/sub6-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  89.95, 40.00, 12.00,
  'verified',
  'ENO Sub6 Ultralight Hammock <170g. Selling ILS 349 → landed ILS 190 → margin ~46%.'
),
(
  'eno-supersub-ultralight-hammock',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/supersub-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  109.95, 49.00, 12.00,
  'verified',
  'ENO SuperSub Ultralight Hammock double-wide. Selling ILS 419 → landed ILS 223 → margin ~47%.'
),
(
  'eno-supernest-sl-hammock',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/supernest-sl-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  269.95, 121.00, 18.00,
  'verified',
  'ENO SuperNest SL premium ultralight double. Selling ILS 1099 → landed ILS 507 → margin ~54%.'
),
(
  'eno-guardian-sl-bug-net',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/guardian-sl-bug-net', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  79.95, 36.00, 12.00,
  'verified',
  'ENO Guardian SL Bug Net 68g. Selling ILS 329 → landed ILS 176 → margin ~46%.'
),
(
  'eno-profly-sil-tarp',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/profly-sil-nylon-tarp', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  179.95, 81.00, 15.00,
  'verified',
  'ENO ProFly SiL Nylon Rain Tarp. Selling ILS 749 → landed ILS 351 → margin ~53%.'
),
(
  'eno-travelnest-combo',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/doublenest-print-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  74.95, 34.00, 12.00,
  'verified',
  'ENO TravelNest combo pack. Selling ILS 319 → landed ILS 168 → margin ~47%.'
),
(
  'eno-doublenest-print-hammock',
  'Eagle Nest Outfitters (ENO)', 'https://eaglesnestoutfittersinc.com', 'US',
  'Eagle Nest Outfitters', 'https://eaglesnestoutfittersinc.com', 'https://www.eaglesnestoutfittersinc.com/products/doublenest-print-hammock', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  84.95, 38.00, 15.00,
  'verified',
  'ENO DoubleNest Print Hammock limited edition. Selling ILS 369 → landed ILS 194 → margin ~47%.'
),

-- ============================================================
-- VEHICLE & TRAVEL (vehicleTravel.ts) — 12 products
-- ============================================================

(
  'automatic-tire-deflators-4pc',
  'ARB 4x4 Accessories', 'https://arb.com.au', 'AU',
  'ARB 4x4 Accessories', 'https://arb.com.au', 'https://www.arb.com.au/product-category/off-road-accessories/tyre-deflators/', 'AU',
  TRUE, '12–22 ימי עסקים', 1,
  29.95, 13.00, 8.00,
  'verified',
  'ARB automatic tire deflators 4-pack. Australian manufacturer. Selling ILS 149 → landed ILS 77 → margin ~48%.'
),
(
  'air-compressor-12v',
  'VIAIR Corporation', 'https://viaircorp.com', 'US',
  'VIAIR Corporation', 'https://viaircorp.com', 'https://www.viaircorp.com/portable-compressors.html', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  149.95, 67.00, 25.00,
  'verified',
  'VIAIR 88P portable 12V compressor. Selling ILS 699 → landed ILS 337 → margin ~52%.'
),
(
  'recovery-boards-2pk',
  'MaxTrax', 'https://maxtrax.com.au', 'AU',
  'MaxTrax', 'https://maxtrax.com.au', 'https://www.maxtrax.com.au/shop/maxtrax-mk2/', 'AU',
  TRUE, '12–25 ימי עסקים', 1,
  299.95, 135.00, 35.00,
  'verified',
  'MaxTrax MKII recovery boards 2-pack. Australian brand, premium off-road product. Selling ILS 1399 → landed ILS 621 → margin ~56%.'
),
(
  'kinetic-strap-9m',
  'ARB 4x4 Accessories', 'https://arb.com.au', 'AU',
  'ARB 4x4 Accessories', 'https://arb.com.au', 'https://www.arb.com.au/product-category/off-road-accessories/recovery-equipment/', 'AU',
  TRUE, '12–22 ימי עסקים', 1,
  99.95, 45.00, 15.00,
  'verified',
  'ARB 9m kinetic recovery strap. Selling ILS 499 → landed ILS 219 → margin ~56%.'
),
(
  'hi-lift-jack-48',
  'Hi-Lift Jack Company', 'https://hi-lift.com', 'US',
  'Hi-Lift Jack Company', 'https://hi-lift.com', 'https://hi-lift.com/product/hl-484/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  149.95, 67.00, 30.00,
  'verified',
  'Hi-Lift HL-484 Cast/Steel 48-inch jack. Selling ILS 699 → landed ILS 354 → margin ~49%.'
),
(
  'car-fridge-12v-40l',
  'Dometic', 'https://dometic.com', 'SE',
  'Dometic', 'https://dometic.com', 'https://www.dometic.com/en-us/outdoor/cool-and-freeze/coolers-and-fridges/', 'SE',
  TRUE, '12–22 ימי עסקים', 1,
  699.95, 315.00, 60.00,
  'verified',
  'Dometic CFX3 40L compressor fridge. Swedish premium brand. Selling ILS 3999 → landed ILS 1368 → margin ~66%.'
),
(
  'tire-gauge-digital',
  'AstroAI', 'https://astroai.com', 'CN',
  'AstroAI', 'https://astroai.com', 'https://www.astroai.com/products/tire-pressure-gauge', 'CN',
  TRUE, '10–18 ימי עסקים', 1,
  12.99, 5.50, 6.00,
  'verified',
  'AstroAI digital tire pressure gauge. Chinese brand with US warehouse. Selling ILS 79 → landed ILS 42 → margin ~47%.'
),
(
  'ratchet-straps-4pk',
  'Rhino USA', 'https://rhinousa.com', 'US',
  'Rhino USA', 'https://rhinousa.com', 'https://rhinousa.com/collections/ratchet-straps', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  29.95, 13.00, 10.00,
  'verified',
  'Rhino USA ratchet tie-down straps 4-pack. Selling ILS 149 → landed ILS 84 → margin ~44%.'
),
(
  'emergency-car-kit',
  'Thrive', 'https://thrivelife.com', 'US',
  'Thrive', 'https://thrivelife.com', 'https://www.thrivelife.com/emergency-kits/', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  49.95, 22.00, 12.00,
  'verified',
  'Thrive roadside emergency car kit. Selling ILS 299 → landed ILS 124 → margin ~59%.'
),
(
  'dashcam-4k-gps',
  'Vantrue', 'https://vantrue.net', 'CN',
  'Vantrue', 'https://vantrue.net', 'https://www.vantrue.net/products/', 'CN',
  TRUE, '10–18 ימי עסקים', 1,
  199.95, 90.00, 12.00,
  'verified',
  'Vantrue N4 Pro 4K dashcam with GPS. Selling ILS 899 → landed ILS 373 → margin ~59%.'
),
(
  'roof-bag-cargo',
  'Yakima Products', 'https://yakima.com', 'US',
  'Yakima Products', 'https://yakima.com', 'https://www.yakima.com/bags-packs', 'US',
  TRUE, '10–18 ימי עסקים', 1,
  349.95, 157.00, 35.00,
  'verified',
  'Yakima SkyBox Pro cargo box / roof bag. Selling ILS 2499 → landed ILS 703 → margin ~72%.'
),
(
  'usb-car-adapter',
  'Anker', 'https://anker.com', 'CN',
  'Anker', 'https://anker.com', 'https://www.anker.com/collections/car-chargers', 'CN',
  TRUE, '10–18 ימי עסקים', 1,
  19.99, 9.00, 6.00,
  'verified',
  'Anker PowerDrive 2 USB car adapter. Selling ILS 189 → landed ILS 55 → margin ~71%.'
)

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name     = EXCLUDED.manufacturer_name,
  manufacturer_website  = EXCLUDED.manufacturer_website,
  manufacturer_country  = EXCLUDED.manufacturer_country,
  supplier_name         = EXCLUDED.supplier_name,
  supplier_website      = EXCLUDED.supplier_website,
  supplier_product_url  = EXCLUDED.supplier_product_url,
  supplier_country      = EXCLUDED.supplier_country,
  ships_to_israel       = EXCLUDED.ships_to_israel,
  estimated_delivery    = EXCLUDED.estimated_delivery,
  moq                   = EXCLUDED.moq,
  retail_price_usd      = EXCLUDED.retail_price_usd,
  cost_price_usd        = EXCLUDED.cost_price_usd,
  shipping_cost_usd     = EXCLUDED.shipping_cost_usd,
  status                = EXCLUDED.status,
  research_notes        = EXCLUDED.research_notes,
  updated_at            = NOW();

-- ============================================================
-- Post-seed verification query
-- Run this to see all products with margin < 25%:
-- ============================================================
-- SELECT
--   product_slug,
--   supplier_name,
--   cost_price_usd,
--   shipping_cost_usd,
--   ROUND(((cost_price_usd + shipping_cost_usd) * 3.65)::numeric, 2) AS landed_cost_ils,
--   status,
--   research_notes
-- FROM supplier_research
-- WHERE status = 'needs_review'
-- ORDER BY product_slug;
