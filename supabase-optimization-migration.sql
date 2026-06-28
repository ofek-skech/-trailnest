-- ============================================================
-- Part 1: Add optimization columns
-- ============================================================
ALTER TABLE supplier_research
  ADD COLUMN IF NOT EXISTS optimization TEXT
    CHECK (optimization IN ('keep','reprice','replace','remove')),
  ADD COLUMN IF NOT EXISTS recommended_price NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS alternatives JSONB,
  ADD COLUMN IF NOT EXISTS optimization_notes TEXT;

-- ============================================================
-- Part 2: Camping (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('camp-chair-hd',
 'OEM / KZM Outdoor', 'https://www.amazon.com', 'China',
 'Amazon.com Global', 'https://www.amazon.com',
 'https://www.amazon.com/s?k=heavy+duty+camp+chair+150kg', 'China',
 TRUE, '7–14 business days', 1,
 49.99, 18.00, 18.00,
 'needs_review', 'Generic OEM heavy-duty 150kg camp chair. Multiple suppliers on Amazon. Cost $36 landed.',
 'reprice', 219.00, 'Current ₪149 gives 12% margin. Reprice to ₪219 for 34% margin.'),

('camp-table-fold',
 'OEM Aluminum Furniture', 'https://www.amazon.com', 'China',
 'Amazon.com Global', 'https://www.amazon.com',
 'https://www.amazon.com/s?k=aluminum+folding+camp+table+120cm', 'China',
 TRUE, '10–18 business days', 1,
 59.99, 28.00, 25.00,
 'needs_review', 'Generic OEM aluminum folding table 120cm. Landed cost $53 = ₪193. Selling below cost.',
 'reprice', 279.00, 'Current ₪189 loses money (cost ₪193). Reprice to ₪279 for 31% margin.'),

('tarp-uv-3x3',
 'OEM / Aqua Quest', 'https://aquaquestgear.com', 'China',
 'Amazon.com Global / Aqua Quest', 'https://aquaquestgear.com',
 'https://aquaquestgear.com/collections/tarps', 'Canada',
 TRUE, '7–14 business days', 1,
 39.99, 20.00, 15.00,
 'needs_review', 'UV reinforced 3x3m tarp. Aqua Quest or OEM. Landed $35 = ₪128.',
 'reprice', 199.00, 'Current ₪149 = 14% margin. Reprice to ₪199 for 36% margin.'),

('folding-shovel',
 'SOG Specialty Knives / OEM', 'https://sogknives.com', 'USA',
 'Amazon.com Global', 'https://www.amazon.com',
 'https://www.amazon.com/s?k=folding+shovel+3+position+military', 'USA',
 TRUE, '7–14 business days', 1,
 24.99, 10.00, 10.00,
 'needs_review', 'Military-style 3-position folding shovel. SOG or OEM. Landed $20 = ₪73.',
 'reprice', 119.00, 'Current ₪79 = 8% margin. Reprice to ₪119 for 39% margin.'),

('multi-tool-pro',
 'Gerber Gear / OEM', 'https://gerbergear.com', 'USA',
 'Amazon.com Global / Gerber', 'https://gerbergear.com',
 'https://www.amazon.com/s?k=21+tool+stainless+multi+tool', 'USA',
 TRUE, '7–14 business days', 1,
 34.99, 18.00, 10.00,
 'needs_review', 'OEM or Gerber-style 21-tool multi-tool. Landed $28 = ₪102.',
 'keep', NULL, '₪149 selling price with ₪102 landed cost = 31.5% margin. Solid product.'),

('beach-umbrella-2m',
 'OEM Beach Goods', 'https://www.amazon.com', 'China',
 'Amazon.com Global', 'https://www.amazon.com',
 'https://www.amazon.com/s?k=beach+umbrella+2m+UV50', 'China',
 TRUE, '10–18 business days', 1,
 44.99, 20.00, 20.00,
 'needs_review', 'Generic UV50+ 2m beach umbrella. Landed $40 = ₪146. Almost break-even.',
 'reprice', 229.00, 'Current ₪149 = 2% margin. Reprice to ₪229 for 36% margin.'),

('paracord-30m',
 'Atwood Rope MFG / OEM', 'https://atwoodrope.com', 'USA',
 'Amazon.com / Atwood Rope', 'https://atwoodrope.com',
 'https://atwoodrope.com/collections/paracord', 'USA',
 TRUE, '7–14 business days', 1,
 12.99, 5.00, 8.00,
 'needs_review', '550 MIL-SPEC 30m paracord. Atwood or OEM. Landed $13 = ₪47. Selling below cost.',
 'reprice', 69.00, 'Current ₪39 loses money (cost ₪47). Reprice to ₪69 for 32% margin.'),

('family-tent-6p',
 'Coleman / Core Equipment / OEM', 'https://coleman.com', 'USA',
 'Amazon.com Global / Coleman', 'https://coleman.com',
 'https://www.amazon.com/s?k=6+person+dome+tent+family', 'USA',
 TRUE, '10–18 business days', 1,
 89.99, 55.00, 35.00,
 'needs_review', '6-person family dome tent. Coleman or OEM equivalent. Landed $90 = ₪329.',
 'keep', NULL, '₪449 selling price with ₪329 landed = 26.7% margin. Viable product.'),

('tent-stakes-10',
 'MSR / OEM Aluminum', 'https://cascadedesigns.com', 'USA',
 'Amazon.com Global', 'https://www.amazon.com',
 'https://www.amazon.com/s?k=aluminum+V+tent+stakes+10+pack', 'USA',
 TRUE, '7–14 business days', 1,
 9.99, 6.00, 8.00,
 'needs_review', 'Aluminum V-stakes 10-pack. MSR or OEM. Landed $14 = ₪51. Selling below cost.',
 'reprice', 79.00, 'Current ₪49 loses money. Reprice to ₪79 for 35% margin.'),

('mosquito-killer',
 'OEM UV Insect Killers', 'https://www.amazon.com', 'China',
 'Amazon.com Global', 'https://www.amazon.com',
 'https://www.amazon.com/s?k=UV+mosquito+killer+electric+USB+40m', 'China',
 TRUE, '7–14 business days', 1,
 24.99, 12.00, 10.00,
 'needs_review', 'OEM UV mosquito killer 40m² USB-C. Generic Chinese product. Landed $22 = ₪80.',
 'reprice', 139.00, 'Current ₪89 = 10% margin. Reprice to ₪139 for 42% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 3: Sleeping / Hammocks — ENO (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('arasal-shtat',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/doublenest-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 79.90, 62.00, 18.00,
 'verified', 'ENO DoubleNest ($49.95) + Atlas straps ($29.95) bundle. Landed $80 = ₪292.',
 'reprice', 429.00, 'Current ₪369 = 21% margin. Reprice to ₪429 for 32% margin.'),

('eno-singlenest-hammock',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/singlenest-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 44.95, 25.00, 14.00,
 'verified', 'ENO SingleNest. Retail $44.95. Landed $39 = ₪142.',
 'keep', NULL, '₪289 vs ₪142 landed = 50.9% margin. Top performer.'),

('eno-junglenest-hammock',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/junglenest-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 89.95, 50.00, 16.00,
 'verified', 'ENO JungleNest with integrated bug net. Retail $89.95. Landed $66 = ₪241.',
 'keep', NULL, '₪549 vs ₪241 landed = 56.1% margin. Excellent.'),

('eno-sub6-ultralight-hammock',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/sub6-ultralight-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 69.95, 40.00, 14.00,
 'verified', 'ENO Sub6 Ultralight <170g. Retail $69.95. Landed $54 = ₪197.',
 'keep', NULL, '₪349 vs ₪197 landed = 43.6% margin.'),

('eno-supersub-ultralight-hammock',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/supersub-ultralight-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 84.95, 48.00, 14.00,
 'verified', 'ENO SuperSub Ultralight ripstop. Retail $84.95. Landed $62 = ₪226.',
 'keep', NULL, '₪419 vs ₪226 landed = 46.1% margin.'),

('eno-supernest-sl-hammock',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/supernest-sl-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 149.95, 85.00, 16.00,
 'verified', 'ENO SuperNest SL premium padded hammock. Retail $149.95. Landed $101 = ₪369.',
 'keep', NULL, '₪1099 vs ₪369 landed = 66.4% margin. Best ENO item.'),

('eno-guardian-sl-bug-net',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/guardian-bug-net', 'USA',
 TRUE, '7–14 business days', 1,
 74.95, 42.00, 12.00,
 'verified', 'ENO Guardian SL bug net. Retail $74.95. Landed $54 = ₪197.',
 'keep', NULL, '₪329 vs ₪197 landed = 40.1% margin.'),

('eno-profly-sil-tarp',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/profly-sil-rain-tarp', 'USA',
 TRUE, '7–14 business days', 1,
 119.95, 68.00, 16.00,
 'verified', 'ENO ProFly Sil 30D silicone tarp 510g. Retail $119.95. Landed $84 = ₪307.',
 'keep', NULL, '₪749 vs ₪307 landed = 59% margin. Excellent.'),

('eno-travelnest-combo',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/travelnest-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 79.90, 44.00, 16.00,
 'verified', 'ENO TravelNest + Atlas straps combo. Landed $60 = ₪219.',
 'keep', NULL, '₪319 vs ₪219 landed = 31.3% margin.'),

('eno-doublenest-print-hammock',
 'Eagles Nest Outfitters (ENO)', 'https://eaglesnestonline.com', 'USA',
 'ENO / REI / Amazon Global', 'https://eaglesnestonline.com',
 'https://eaglesnestonline.com/products/doublenest-print-hammock', 'USA',
 TRUE, '7–14 business days', 1,
 64.95, 36.00, 16.00,
 'verified', 'ENO DoubleNest Print 70D. Retail $64.95. Landed $52 = ₪190.',
 'keep', NULL, '₪369 vs ₪190 landed = 48.5% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 4: Water & Showers (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('shower-helio-lx',
 'NEMO Equipment', 'https://nemoequipment.com', 'USA',
 'NEMO / REI / Amazon Global', 'https://nemoequipment.com',
 'https://nemoequipment.com/product/helio-lx-pressure-shower/', 'USA',
 TRUE, '7–14 business days', 1,
 149.95, 80.00, 20.00,
 'verified', 'NEMO Helio LX 11L foot-pump pressure shower. Retail $149.95. Landed $100 = ₪365.',
 'keep', NULL, '₪749 vs ₪365 landed = 51.3% margin.'),

('pocket-shower-10l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon', 'https://seatosummit.com',
 'https://seatosummit.com/products/pocket-shower/', 'Australia',
 TRUE, '7–14 business days', 1,
 34.95, 18.00, 12.00,
 'verified', 'Sea to Summit Pocket Shower 10L. Retail $34.95. Landed $30 = ₪110.',
 'keep', NULL, '₪149 vs ₪110 landed = 26.2% margin. Borderline — monitor.'),

('sawyer-squeeze-filter',
 'Sawyer Products', 'https://sawyer.com', 'USA',
 'Sawyer / REI / Amazon Global', 'https://sawyer.com',
 'https://sawyer.com/products/squeeze-water-filtration-system', 'USA',
 TRUE, '7–14 business days', 1,
 39.95, 20.00, 12.00,
 'verified', 'Sawyer Squeeze SP129CL 0.1 micron filter. Retail $39.95. Landed $32 = ₪117.',
 'keep', NULL, '₪179 vs ₪117 landed = 34.6% margin.'),

('lifestraw-go-22oz',
 'LifeStraw (Vestergaard)', 'https://lifestraw.com', 'Switzerland',
 'LifeStraw / REI / Amazon Global', 'https://lifestraw.com',
 'https://lifestraw.com/products/lifestraw-go-water-filter-bottle', 'Switzerland',
 TRUE, '7–14 business days', 1,
 49.95, 25.00, 13.00,
 'verified', 'LifeStraw Go 22oz/650ml filter bottle. Retail $49.95. Landed $38 = ₪139.',
 'keep', NULL, '₪229 vs ₪139 landed = 39.3% margin.'),

('camp-sink-5l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon', 'https://seatosummit.com',
 'https://seatosummit.com/products/kitchen-sink/', 'Australia',
 TRUE, '7–14 business days', 1,
 44.95, 22.00, 12.00,
 'verified', 'Sea to Summit Kitchen Sink 5L folding. Retail $44.95. Landed $34 = ₪124.',
 'reprice', 189.00, 'Current ₪149 = 16.8% margin. Reprice to ₪189 for 34% margin.'),

('msr-trailshot-filter',
 'MSR / Cascade Designs', 'https://cascadedesigns.com', 'USA',
 'MSR / REI / Amazon Global', 'https://cascadedesigns.com',
 'https://cascadedesigns.com/products/trailshot-filter', 'USA',
 TRUE, '7–14 business days', 1,
 49.95, 25.00, 12.00,
 'verified', 'MSR TrailShot pocket-size inline filter. Retail $49.95. Landed $37 = ₪135.',
 'keep', NULL, '₪299 vs ₪135 landed = 54.8% margin. Excellent.'),

('platypus-gravityworks-4l',
 'Platypus / Cascade Designs', 'https://cascadedesigns.com', 'USA',
 'Platypus / REI / Amazon Global', 'https://cascadedesigns.com',
 'https://cascadedesigns.com/products/gravityworks-filter-system', 'USA',
 TRUE, '7–14 business days', 1,
 119.95, 65.00, 15.00,
 'verified', 'Platypus GravityWorks 4L complete kit. Retail $119.95. Landed $80 = ₪292.',
 'keep', NULL, '₪499 vs ₪292 landed = 41.5% margin.'),

('msr-dromedary-10l',
 'MSR / Cascade Designs', 'https://cascadedesigns.com', 'USA',
 'MSR / REI / Amazon Global', 'https://cascadedesigns.com',
 'https://cascadedesigns.com/products/dromedary-bag', 'USA',
 TRUE, '7–14 business days', 1,
 44.95, 22.00, 12.00,
 'verified', 'MSR Dromedary 10L water storage bag. Retail $44.95. Landed $34 = ₪124.',
 'keep', NULL, '₪299 vs ₪124 landed = 58.5% margin. Top performer.'),

('ae-summer-shower-10l',
 'Advanced Elements', 'https://advancedelements.com', 'USA',
 'Advanced Elements / Amazon Global', 'https://advancedelements.com',
 'https://advancedelements.com/products/summer-shower', 'USA',
 TRUE, '10–18 business days', 1,
 34.95, 18.00, 15.00,
 'needs_review', 'Advanced Elements Summer Shower 10L solar. Retail $34.95. Landed $33 = ₪120.',
 'reprice', 189.00, 'Current ₪149 = 19.5% margin. Reprice to ₪189 for 36% margin.'),

('sts-pocket-soap-50ml',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon', 'https://seatosummit.com',
 'https://seatosummit.com/products/trek-travel-pocket-soap/', 'Australia',
 TRUE, '7–14 business days', 1,
 7.95, 4.00, 8.00,
 'verified', 'Sea to Summit Pocket Soap 50ml leaves. Retail $7.95. Landed $12 = ₪44.',
 'reprice', 79.00, 'Current ₪49 = 10% margin. Reprice to ₪79 for 44% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 5: Sleeping Comfort (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('neoair-xlite-nxt',
 'Therm-a-Rest / Cascade Designs', 'https://thermarest.com', 'USA',
 'Therm-a-Rest / REI / Amazon Global', 'https://thermarest.com',
 'https://thermarest.com/products/neoair-xlite-nxt-sleeping-pad', 'USA',
 TRUE, '7–14 business days', 1,
 239.95, 130.00, 20.00,
 'verified', 'Therm-a-Rest NeoAir XLite NXT R4.5. Retail $239.95. Landed $150 = ₪548.',
 'keep', NULL, '₪1299 vs ₪548 landed = 57.8% margin. Premium product.'),

('z-lite-sol',
 'Therm-a-Rest / Cascade Designs', 'https://thermarest.com', 'USA',
 'Therm-a-Rest / REI / Amazon Global', 'https://thermarest.com',
 'https://thermarest.com/products/z-lite-sol-sleeping-pad', 'USA',
 TRUE, '7–14 business days', 1,
 59.95, 30.00, 15.00,
 'verified', 'Therm-a-Rest Z Lite SOL foam pad. Retail $59.95. Landed $45 = ₪164.',
 'keep', NULL, '₪299 vs ₪164 landed = 45.2% margin.'),

('nemo-tensor-all-season',
 'NEMO Equipment', 'https://nemoequipment.com', 'USA',
 'NEMO / REI / Amazon Global', 'https://nemoequipment.com',
 'https://nemoequipment.com/product/tensor-all-season-sleeping-pad/', 'USA',
 TRUE, '7–14 business days', 1,
 249.95, 140.00, 20.00,
 'verified', 'NEMO Tensor All-Season R4.8. Retail $249.95. Landed $160 = ₪584.',
 'keep', NULL, '₪1199 vs ₪584 landed = 51.3% margin.'),

('sts-spark-down-sleeping-bag',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/spark-ultralight-down-sleeping-bag/', 'Australia',
 TRUE, '7–14 business days', 1,
 349.95, 195.00, 22.00,
 'verified', 'Sea to Summit Spark Down 7°C 275g. Retail $349.95. Landed $217 = ₪792.',
 'keep', NULL, '₪1649 vs ₪792 landed = 52% margin. Premium ultralight bag.'),

('sts-aeros-pillow',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/aeros-ultralight-pillow/', 'Australia',
 TRUE, '7–14 business days', 1,
 49.95, 25.00, 10.00,
 'verified', 'Sea to Summit Aeros Ultralight Pillow 57g. Retail $49.95. Landed $35 = ₪128.',
 'keep', NULL, '₪329 vs ₪128 landed = 61.1% margin. Best-in-class.'),

('thermarest-prolite-plus',
 'Therm-a-Rest / Cascade Designs', 'https://thermarest.com', 'USA',
 'Therm-a-Rest / REI / Amazon Global', 'https://thermarest.com',
 'https://thermarest.com/products/trail-pro-sleeping-pad', 'USA',
 TRUE, '7–14 business days', 1,
 139.95, 75.00, 18.00,
 'verified', 'Therm-a-Rest Trail ProLite R2.4 self-inflating. Retail $139.95. Landed $93 = ₪339.',
 'keep', NULL, '₪699 vs ₪339 landed = 51.5% margin.'),

('nemo-disco-15-sleeping-bag',
 'NEMO Equipment', 'https://nemoequipment.com', 'USA',
 'NEMO / REI / Amazon Global', 'https://nemoequipment.com',
 'https://nemoequipment.com/product/disco-sleeping-bag/', 'USA',
 TRUE, '7–14 business days', 1,
 299.95, 165.00, 20.00,
 'verified', 'NEMO Disco 15 duck down sleeping bag. Retail $299.95. Landed $185 = ₪675.',
 'keep', NULL, '₪1599 vs ₪675 landed = 57.8% margin.'),

('sts-reactor-sleeping-bag-liner',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/reactor-liner/', 'Australia',
 TRUE, '7–14 business days', 1,
 79.95, 42.00, 12.00,
 'verified', 'Sea to Summit Reactor Thermal Liner. Retail $79.95. Landed $54 = ₪197.',
 'keep', NULL, '₪379 vs ₪197 landed = 48% margin.'),

('thermarest-trail-king-sv',
 'Therm-a-Rest / Cascade Designs', 'https://thermarest.com', 'USA',
 'Therm-a-Rest / REI / Amazon Global', 'https://thermarest.com',
 'https://thermarest.com/products/basecamp-sleeping-pad', 'USA',
 TRUE, '7–14 business days', 1,
 134.95, 72.00, 20.00,
 'verified', 'Therm-a-Rest BaseCamp R3.0 self-inflating. Retail $134.95. Landed $92 = ₪336.',
 'keep', NULL, '₪899 vs ₪336 landed = 62.6% margin. Excellent.'),

('nemo-fillo-pillow',
 'NEMO Equipment', 'https://nemoequipment.com', 'USA',
 'NEMO / REI / Amazon Global', 'https://nemoequipment.com',
 'https://nemoequipment.com/product/fillo-luxury-camping-pillow/', 'USA',
 TRUE, '7–14 business days', 1,
 49.95, 25.00, 12.00,
 'verified', 'NEMO Fillo Luxury Camp Pillow microfiber fill. Retail $49.95. Landed $37 = ₪135.',
 'keep', NULL, '₪249 vs ₪135 landed = 45.8% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 6: Storage & Organization (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('sts-ultra-sil-dry-bag-8l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/ultra-sil-dry-bag/', 'Australia',
 TRUE, '7–14 business days', 1,
 29.95, 15.00, 10.00,
 'verified', 'Sea to Summit Ultra-Sil Dry Bag 8L 43g. Retail $29.95. Landed $25 = ₪91.',
 'reprice', 149.00, 'Current ₪99 = 8% margin. Reprice to ₪149 for 39% margin.'),

('sts-lightweight-dry-bag-20l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/lightweight-dry-bag/', 'Australia',
 TRUE, '7–14 business days', 1,
 24.95, 12.00, 10.00,
 'verified', 'Sea to Summit Lightweight Dry Bag 20L 70g. Retail $24.95. Landed $22 = ₪80.',
 'keep', NULL, '₪129 vs ₪80 landed = 38% margin.'),

('sts-big-river-dry-bag-13l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/big-river-dry-bag/', 'Australia',
 TRUE, '7–14 business days', 1,
 49.95, 25.00, 12.00,
 'verified', 'Sea to Summit Big River Dry Bag 13L 420D. Retail $49.95. Landed $37 = ₪135.',
 'keep', NULL, '₪189 vs ₪135 landed = 28.6% margin.'),

('sts-evac-compression-dry-bag-8l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/evac-compression-dry-bag/', 'Australia',
 TRUE, '7–14 business days', 1,
 59.95, 30.00, 12.00,
 'verified', 'Sea to Summit Evac Compression Dry Bag UL 8L. Retail $59.95. Landed $42 = ₪153.',
 'reprice', 249.00, 'Current ₪199 = 23% margin. Reprice to ₪249 for 39% margin.'),

('ortlieb-dry-bag-10l',
 'Ortlieb', 'https://ortlieb.com', 'Germany',
 'Ortlieb / Amazon Global / REI', 'https://ortlieb.com',
 'https://ortlieb.com/en/dry-bags/dry-bag/', 'Germany',
 TRUE, '7–14 business days', 1,
 39.95, 22.00, 12.00,
 'verified', 'Ortlieb Dry-Bag 10L made in Germany. Retail $39.95. Landed $34 = ₪124.',
 'keep', NULL, '₪229 vs ₪124 landed = 45.9% margin.'),

('sts-hydraulic-dry-bag-20l',
 'Sea to Summit', 'https://seatosummit.com', 'Australia',
 'Sea to Summit / REI / Amazon Global', 'https://seatosummit.com',
 'https://seatosummit.com/products/hydraulic-dry-bag/', 'Australia',
 TRUE, '7–14 business days', 1,
 79.95, 42.00, 14.00,
 'verified', 'Sea to Summit Hydraulic Dry Bag 20L heavy duty. Retail $79.95. Landed $56 = ₪204.',
 'keep', NULL, '₪299 vs ₪204 landed = 31.8% margin.'),

('ortlieb-dry-bag-pd350-13l',
 'Ortlieb', 'https://ortlieb.com', 'Germany',
 'Ortlieb / Amazon Global / REI', 'https://ortlieb.com',
 'https://ortlieb.com/en/dry-bags/dry-bag-pd350/', 'Germany',
 TRUE, '7–14 business days', 1,
 49.95, 28.00, 12.00,
 'verified', 'Ortlieb Dry Bag PD350 13L ultra-resistant. Retail $49.95. Landed $40 = ₪146.',
 'keep', NULL, '₪239 vs ₪146 landed = 38.9% margin.'),

('sts-opsak-odor-proof-2l',
 'LOKSAK', 'https://loksak.com', 'USA',
 'LOKSAK / Amazon Global', 'https://loksak.com',
 'https://loksak.com/products/opsak', 'USA',
 TRUE, '7–14 business days', 1,
 14.95, 8.00, 10.00,
 'verified', 'LOKSAK OPSAK odor-proof bags 2+4L. Retail $14.95. Landed $18 = ₪66.',
 'keep', NULL, '₪89 vs ₪66 landed = 25.8% margin. Borderline — consider ₪109.'),

('eagle-creek-pack-it-cube-set',
 'Eagle Creek', 'https://eaglecreek.com', 'USA',
 'Eagle Creek / REI / Amazon Global', 'https://eaglecreek.com',
 'https://eaglecreek.com/products/pack-it-original-cube-set', 'USA',
 TRUE, '7–14 business days', 1,
 49.95, 25.00, 12.00,
 'verified', 'Eagle Creek Pack-It Original Cube Set S+M. Retail $49.95. Landed $37 = ₪135.',
 'keep', NULL, '₪249 vs ₪135 landed = 45.8% margin.'),

('ortlieb-gear-pack-25l',
 'Ortlieb', 'https://ortlieb.com', 'Germany',
 'Ortlieb / Amazon Global', 'https://ortlieb.com',
 'https://ortlieb.com/en/backpacks/atrack/', 'Germany',
 TRUE, '10–18 business days', 1,
 279.95, 160.00, 25.00,
 'verified', 'Ortlieb Atrack 25L waterproof backpack. Retail $279.95. Landed $185 = ₪675.',
 'keep', NULL, '₪1299 vs ₪675 landed = 48% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 7: Safety & Emergency (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('amk-ultralight-3',
 'Adventure Medical Kits (Tender Corp)', 'https://adventuremedicalkits.com', 'USA',
 'AMK / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/ultralight-3-first-aid-kit', 'USA',
 TRUE, '7–14 business days', 1,
 24.95, 12.00, 10.00,
 'verified', 'AMK Ultralight .3 first aid kit. Retail $24.95. Landed $22 = ₪80.',
 'keep', NULL, '₪149 vs ₪80 landed = 46.3% margin.'),

('amk-ultralight-7',
 'Adventure Medical Kits (Tender Corp)', 'https://adventuremedicalkits.com', 'USA',
 'AMK / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/ultralight-7-first-aid-kit', 'USA',
 TRUE, '7–14 business days', 1,
 39.95, 20.00, 10.00,
 'verified', 'AMK Ultralight .7 first aid kit. Retail $39.95. Landed $30 = ₪110.',
 'keep', NULL, '₪199 vs ₪110 landed = 44.7% margin.'),

('amk-mountain-hiker',
 'Adventure Medical Kits (Tender Corp)', 'https://adventuremedicalkits.com', 'USA',
 'AMK / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/mountain-hiker-first-aid-kit', 'USA',
 TRUE, '7–14 business days', 1,
 59.95, 30.00, 12.00,
 'verified', 'AMK Mountain Series Hiker first aid kit. Retail $59.95. Landed $42 = ₪153.',
 'keep', NULL, '₪299 vs ₪153 landed = 48.8% margin.'),

('acr-resqlink-400',
 'ACR Electronics', 'https://acrartex.com', 'USA',
 'ACR Electronics / Amazon Global / West Marine', 'https://acrartex.com',
 'https://acrartex.com/products/resqlink-400-personal-locator-beacon-plb', 'USA',
 TRUE, '7–14 business days', 1,
 399.95, 250.00, 25.00,
 'verified', 'ACR ResQLink 400 PLB 406MHz GPS. Retail $399.95. Landed $275 = ₪1004. Note: PLBs require Israeli Communications Ministry registration.',
 'keep', NULL, '₪1899 vs ₪1004 landed = 47.1% margin. Note required PLB registration docs for Israel.'),

('leatherman-signal',
 'Leatherman Tool Group', 'https://leatherman.com', 'USA',
 'Leatherman / Amazon Global', 'https://leatherman.com',
 'https://leatherman.com/signal-831523.html', 'USA',
 TRUE, '7–14 business days', 1,
 119.95, 70.00, 14.00,
 'verified', 'Leatherman Signal 19-tool multi-tool with fire starter + whistle. Retail $119.95. Landed $84 = ₪307. Leatherman has Israeli market presence.',
 'keep', NULL, '₪659 vs ₪307 landed = 53.4% margin.'),

('amk-trauma-pak-quikclot',
 'Adventure Medical Kits (Tender Corp)', 'https://adventuremedicalkits.com', 'USA',
 'AMK / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/trauma-pak-with-quikclot', 'USA',
 TRUE, '7–14 business days', 1,
 29.95, 15.00, 10.00,
 'verified', 'AMK Trauma Pak with QuikClot hemostatic. Retail $29.95. Landed $25 = ₪91.',
 'keep', NULL, '₪149 vs ₪91 landed = 38.9% margin.'),

('garmin-inreach-mini-2',
 'Garmin Ltd.', 'https://garmin.com', 'USA',
 'Garmin Israel / Amazon Global', 'https://www.garmin.com/en-IL/',
 'https://www.garmin.com/en-US/p/775697', 'Israel',
 TRUE, '3–7 business days (local)', 1,
 349.99, 245.00, 18.00,
 'verified', 'Garmin inReach Mini 2 satellite communicator. Retail $349.99. Garmin has official Israel office (garmin.com/en-IL/). Requires monthly satellite subscription ($14.95+/mo). Landed $263 = ₪960.',
 'keep', NULL, '₪1499 vs ₪960 landed = 35.9% margin. Requires subscription disclosure to buyers.'),

('sol-escape-pro-bivy',
 'SOL / Adventure Medical Kits', 'https://adventuremedicalkits.com', 'USA',
 'SOL / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/escape-pro-bivy', 'USA',
 TRUE, '7–14 business days', 1,
 59.95, 30.00, 12.00,
 'verified', 'SOL Escape Pro Bivy 70% heat return. Retail $59.95. Landed $42 = ₪153.',
 'reprice', 249.00, 'Current ₪199 = 23% margin. Reprice to ₪249 for 38.6% margin.'),

('sol-emergency-blanket-4pk',
 'SOL / Adventure Medical Kits', 'https://adventuremedicalkits.com', 'USA',
 'SOL / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/sol-emergency-blanket', 'USA',
 TRUE, '7–14 business days', 1,
 12.95, 6.00, 8.00,
 'verified', 'SOL Emergency Blanket 4-pack. Retail $12.95/4pk. Landed $14 = ₪51.',
 'keep', NULL, '₪79 vs ₪51 landed = 35.4% margin.'),

('amk-blister-medic',
 'Adventure Medical Kits (Tender Corp)', 'https://adventuremedicalkits.com', 'USA',
 'AMK / REI / Amazon Global', 'https://adventuremedicalkits.com',
 'https://adventuremedicalkits.com/products/blister-medic', 'USA',
 TRUE, '7–14 business days', 1,
 9.95, 5.00, 8.00,
 'verified', 'AMK Blister Medic kit. Retail $9.95. Landed $13 = ₪47.',
 'keep', NULL, '₪79 vs ₪47 landed = 40.5% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 8: Fishing & Leisure (10 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes,
  optimization, recommended_price, optimization_notes
) VALUES
('ugly-stik-bigwater-spinning-rod',
 'Ugly Stik / Pure Fishing', 'https://uglystik.com', 'USA',
 'Pure Fishing / Amazon Global', 'https://uglystik.com',
 'https://uglystik.com/collections/rods/products/ugly-stik-bigwater-spinning-rod', 'USA',
 TRUE, '10–18 business days', 1,
 69.99, 35.00, 25.00,
 'verified', 'Ugly Stik Bigwater spinning rod. Retail $69.99. Landed $60 = ₪219.',
 'keep', NULL, '₪449 vs ₪219 landed = 51.2% margin.'),

('ugly-stik-3700-tackle-bag',
 'Ugly Stik / Pure Fishing', 'https://uglystik.com', 'USA',
 'Pure Fishing / Amazon Global', 'https://uglystik.com',
 'https://uglystik.com/collections/tackle-storage/products/ugly-stik-3700-tackle-bag', 'USA',
 TRUE, '10–18 business days', 1,
 59.99, 30.00, 22.00,
 'verified', 'Ugly Stik 3700 tackle bag with 4 trays. Retail $59.99. Landed $52 = ₪190.',
 'keep', NULL, '₪449 vs ₪190 landed = 57.7% margin. Excellent.'),

('plano-three-tray-tackle-box',
 'Plano Molding Company', 'https://planomolding.com', 'USA',
 'Plano / Amazon Global', 'https://planomolding.com',
 'https://planomolding.com/collections/tackle-storage/products/three-tray-tackle-box', 'USA',
 TRUE, '10–18 business days', 1,
 24.99, 12.00, 15.00,
 'verified', 'Plano Three-Tray tackle box 39 compartments. Retail $24.99. Landed $27 = ₪99.',
 'reprice', 149.00, 'Current ₪89 = -11% margin (loss). Reprice to ₪149 for 33.6% margin.'),

('plano-stowaway-3600-split',
 'Plano Molding Company', 'https://planomolding.com', 'USA',
 'Plano / Amazon Global', 'https://planomolding.com',
 'https://planomolding.com/collections/tackle-storage/products/stowaway-3600', 'USA',
 TRUE, '10–18 business days', 1,
 9.99, 5.00, 10.00,
 'needs_review', 'Plano 50/50 StowAway 3600. Retail $9.99. Landed $15 = ₪55. Selling at ₪35 — major loss.',
 'remove', NULL, 'Impossible to ship profitably at ₪35. $10 retail item costs more to ship than it sells for. Remove or bundle with another product.'),

('bushnell-r3-binoculars-8x42',
 'Bushnell Outdoor Products', 'https://bushnell.com', 'USA',
 'Bushnell / Amazon Global', 'https://bushnell.com',
 'https://bushnell.com/binoculars/r-series/r3-8x42mm-binoculars/', 'USA',
 TRUE, '7–14 business days', 1,
 149.99, 85.00, 18.00,
 'verified', 'Bushnell R3 8x42 HD binoculars. Retail $149.99. Landed $103 = ₪376.',
 'keep', NULL, '₪649 vs ₪376 landed = 42.1% margin.'),

('penn-pursuit-iv-2500',
 'Penn Fishing / Pure Fishing', 'https://pennfishing.com', 'USA',
 'Penn / Amazon Global', 'https://pennfishing.com',
 'https://pennfishing.com/collections/spinning-reels/products/pursuit-iv', 'USA',
 TRUE, '10–18 business days', 1,
 59.99, 30.00, 15.00,
 'verified', 'Penn Pursuit IV 2500 spinning reel. Retail $59.99. Landed $45 = ₪164.',
 'keep', NULL, '₪299 vs ₪164 landed = 45.2% margin.'),

('rapala-original-floater-f9',
 'Rapala VMC Corporation', 'https://rapala.com', 'Finland',
 'Rapala / Amazon Global', 'https://rapala.com',
 'https://rapala.com/original-floater/', 'Finland',
 TRUE, '7–14 business days', 1,
 9.99, 5.00, 8.00,
 'verified', 'Rapala Original Floater F9 9cm lure. Retail $9.99. Landed $13 = ₪47.',
 'reprice', 79.00, 'Current ₪59 = 20% margin. Reprice to ₪79 for 40.5% margin.'),

('berkley-trilene-xl-10lb',
 'Berkley / Pure Fishing', 'https://berkley-fishing.com', 'USA',
 'Berkley / Amazon Global', 'https://berkley-fishing.com',
 'https://berkley-fishing.com/collections/monofilament/products/trilene-xl', 'USA',
 TRUE, '10–18 business days', 1,
 12.99, 6.00, 8.00,
 'needs_review', 'Berkley Trilene XL 10lb 300yd monofilament. Retail $12.99. Landed $14 = ₪51. Selling below cost at ₪49.',
 'reprice', 79.00, 'Current ₪49 = -4% (loss). Reprice to ₪79 for 35.4% margin.'),

('eagle-claw-lazer-hook-set',
 'Eagle Claw Fishing Tackle', 'https://eagleclaw.com', 'USA',
 'Eagle Claw / Amazon Global', 'https://eagleclaw.com',
 'https://eagleclaw.com/collections/hooks', 'USA',
 TRUE, '10–18 business days', 1,
 12.99, 6.00, 8.00,
 'needs_review', 'Eagle Claw Lazer Sharp 85-piece hook set. Retail $12.99. Landed $14 = ₪51. Selling at ₪39 — loss.',
 'reprice', 69.00, 'Current ₪39 = -30.8% (loss). Reprice to ₪69 for 26% margin.'),

('plano-field-locker-medium',
 'Plano Molding Company', 'https://planomolding.com', 'USA',
 'Plano / Amazon Global', 'https://planomolding.com',
 'https://planomolding.com/collections/tackle-storage/products/field-locker-medium-pistol-case', 'USA',
 TRUE, '10–18 business days', 1,
 49.99, 25.00, 20.00,
 'verified', 'Plano Field Locker Medium tackle organizer. Retail $49.99. Landed $45 = ₪164.',
 'reprice', 249.00, 'Current ₪179 = 8.4% margin. Reprice to ₪249 for 34% margin.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name=EXCLUDED.manufacturer_name, manufacturer_website=EXCLUDED.manufacturer_website,
  manufacturer_country=EXCLUDED.manufacturer_country, supplier_name=EXCLUDED.supplier_name,
  supplier_website=EXCLUDED.supplier_website, supplier_product_url=EXCLUDED.supplier_product_url,
  supplier_country=EXCLUDED.supplier_country, ships_to_israel=EXCLUDED.ships_to_israel,
  estimated_delivery=EXCLUDED.estimated_delivery, moq=EXCLUDED.moq,
  retail_price_usd=EXCLUDED.retail_price_usd, cost_price_usd=EXCLUDED.cost_price_usd,
  shipping_cost_usd=EXCLUDED.shipping_cost_usd, status=EXCLUDED.status,
  research_notes=EXCLUDED.research_notes, optimization=EXCLUDED.optimization,
  recommended_price=EXCLUDED.recommended_price, optimization_notes=EXCLUDED.optimization_notes,
  updated_at=NOW();

-- ============================================================
-- Part 9: Apply optimization to original 36 products
-- ============================================================

-- Camp Kitchen
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪279 at 40% margin. Healthy.' WHERE product_slug='espresso-nayad';
UPDATE supplier_research SET optimization='reprice',  recommended_price=109.00, optimization_notes='₪49 is below landed cost ₪77. Reprice to ₪109 for 29% margin.' WHERE product_slug='fire-starter';
UPDATE supplier_research SET optimization='reprice',  recommended_price=199.00, optimization_notes='₪149 = 9% margin. Reprice to ₪199 for 32% margin.' WHERE product_slug='camp-stove-single';
UPDATE supplier_research SET optimization='replace',  recommended_price=NULL,   optimization_notes='Current ₪149 is 171% below landed cost ₪401. Cannot be made profitable at this price point.',
  alternatives='[{"name":"GSI Outdoors Halulite Boiler Solo","url":"https://gsioutdoors.com","reason":"Compact 1L pot, retail $29.95, wholesale $15+ship $10=$91 ILS, margin 39% at ₪149"},{"name":"Olicamp Space Saver Gold","url":"https://www.amazon.com","reason":"Titanium/aluminum 2-person set, retail $29.95, similar landed cost, better margin"},{"name":"MSR Ceramic 2-pot Solo Cook Kit","url":"https://cascadedesigns.com","reason":"Lightweight 2-piece, retail $39.95, landed ~$109 ILS, price at ₪199 = 45% margin"}]'
  WHERE product_slug='cook-set-4pc';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪199 at 23% margin. Borderline but solid brand (Lodge).' WHERE product_slug='cast-iron-24cm';
UPDATE supplier_research SET optimization='reprice',  recommended_price=199.00, optimization_notes='₪99 is below landed cost ₪139. Reprice to ₪199 for 30% margin.' WHERE product_slug='camp-kettle-1l';
UPDATE supplier_research SET optimization='reprice',  recommended_price=149.00, optimization_notes='₪99 slightly below landed cost ₪110. Reprice to ₪149 for 26% margin.' WHERE product_slug='french-press-350';
UPDATE supplier_research SET optimization='reprice',  recommended_price=99.00,  optimization_notes='₪49 is below landed cost ₪73. Reprice to ₪99 for 26% margin.' WHERE product_slug='cutting-board-fold';
UPDATE supplier_research SET optimization='replace',  recommended_price=NULL,   optimization_notes='₪79 for 4 Falcon mugs is 85% below landed cost ₪146. Not viable.',
  alternatives='[{"name":"Sea to Summit Delta Camp Mug (4-pack)","url":"https://seatosummit.com","reason":"Plastic camp mugs, retail $16.95 each, 4x at wholesale $36+ship $14=₪183, sell at ₪249 = 26.5% margin"},{"name":"Stanley Classic Camp Mug 10oz (each)","url":"https://stanley1913.com","reason":"Sell individually ₪79 each; retail $20, wholesale $10+ship $8=₪66, margin 17% — needs repricing to ₪99"},{"name":"Generic enamel 4-pack from AliExpress","url":"https://aliexpress.com","reason":"Non-branded, wholesale $8+ship $12=₪73, sell at ₪149 for 51% margin — lower prestige"}]'
  WHERE product_slug='enamel-cups-set';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪369 at 40.7% via Weber IL local distributor. Strong product.' WHERE product_slug='tabletop-grill';
UPDATE supplier_research SET optimization='replace',  recommended_price=NULL,   optimization_notes='Camp Chef Everest 2X US retail $189.99 vs our selling price ₪179 ($49). Structural pricing error.',
  alternatives='[{"name":"MSR WhisperLite Universal stove","url":"https://cascadedesigns.com","reason":"Multi-fuel single burner, retail $99.95, wholesale $50+ship $14=₪234, sell at ₪499 = 53% margin"},{"name":"Primus Kuchoma Camp Stove","url":"https://primusequipment.com","reason":"2-burner camp stove, retail $79.95, wholesale $40+ship $20=₪219, sell at ₪449 = 51% margin"},{"name":"Camp Chef Explorer Pro single burner","url":"https://campchef.com","reason":"Single large burner, retail $69.95, wholesale $35+ship $18=₪194, sell at ₪369 = 47% margin"}]'
  WHERE product_slug='camp-stove-double';
UPDATE supplier_research SET optimization='reprice',  recommended_price=129.00, optimization_notes='₪99 = 15% margin. Reprice to ₪129 for 35% margin.' WHERE product_slug='titanium-cutlery';

-- Vehicle Gear
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪149 at 31% via Henefeld IL. Good local supplier.' WHERE product_slug='automatic-tire-deflators-4pc';
UPDATE supplier_research SET optimization='reprice',  recommended_price=699.00, optimization_notes='₪229 is way below landed cost ₪475. VIAIR 400P is a premium product. Reprice to ₪699 for 32% margin.' WHERE product_slug='air-compressor-12v';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪1399 at 37.4%. MaxTrax USA ships to Israel.' WHERE product_slug='recovery-boards-2pk';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪499 at 64.9% via Henefeld IL. Best margin in Vehicle Gear.' WHERE product_slug='kinetic-strap-9m';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪699 at 55.6%. Hi-Lift ships globally.' WHERE product_slug='hi-lift-jack-48';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪3999 at 61.7% via Dometic IL dealer. Must confirm dealer account.' WHERE product_slug='car-fridge-12v-40l';
UPDATE supplier_research SET optimization='reprice',  recommended_price=79.00,  optimization_notes='₪49 is nearly break-even. Reprice to ₪79 for 35% margin.' WHERE product_slug='tire-gauge-digital';
UPDATE supplier_research SET optimization='reprice',  recommended_price=149.00, optimization_notes='₪79 is below landed cost ₪109. Reprice to ₪149 for 27% margin.' WHERE product_slug='ratchet-straps-4pk';
UPDATE supplier_research SET optimization='reprice',  recommended_price=299.00, optimization_notes='₪89 is far below landed cost ₪212. Reprice to ₪299 for 29% margin.' WHERE product_slug='emergency-car-kit';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪899 at 24.9%. Borderline — keep for now, reprice to ₪999 if sales allow.' WHERE product_slug='dashcam-4k-gps';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪2499 at 40.8%. Yakima ships globally, good margin on premium item.' WHERE product_slug='roof-bag-cargo';
UPDATE supplier_research SET optimization='reprice',  recommended_price=189.00, optimization_notes='₪59 is far below landed cost ₪117. Reprice to ₪189 for 38% margin.' WHERE product_slug='usb-car-adapter';

-- Lighting & Power
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪249 at 50.2%. BioLite ships globally.' WHERE product_slug='headlamp-range-300';
UPDATE supplier_research SET optimization='reprice',  recommended_price=149.00, optimization_notes='₪119 = 14% margin. Reprice to ₪149 for 31.5% margin.' WHERE product_slug='headlamp-nitecore-nu25';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪499 at 59%. Best lantern in catalog.' WHERE product_slug='camp-lantern-600';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪399 at 46.9%. BioLite ships globally.' WHERE product_slug='camp-lantern-alpenglow';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪229 at 26.7%. LuminAID ships globally.' WHERE product_slug='solar-lantern-luminaid-max';
UPDATE supplier_research SET optimization='reprice',  recommended_price=119.00, optimization_notes='₪49 is below landed cost ₪80. Reprice to ₪119 for 32.8% margin.' WHERE product_slug='solar-lantern-crush-light';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪499 at 48.8%. SunJack ships globally.' WHERE product_slug='solar-panel-40w';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪349 at 39.3%. Goal Zero ships globally.' WHERE product_slug='power-bank-venture-35';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪999 at 41.5%. EcoFlow ships globally, has reseller program.' WHERE product_slug='power-station-river-2';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪299 at 46.3%. Goal Zero ships globally.' WHERE product_slug='camp-lantern-mini-core';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪399 at 61.6%. Second best margin in catalog.' WHERE product_slug='solar-panel-nomad-10';
UPDATE supplier_research SET optimization='keep',    recommended_price=NULL,   optimization_notes='₪199 at 32.1%. LuminAID ships globally.' WHERE product_slug='solar-lantern-survivor';
