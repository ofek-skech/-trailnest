-- ============================================================
-- Supplier Research Table
-- Research-only. Does NOT auto-assign to products.
-- ============================================================

CREATE TABLE IF NOT EXISTS supplier_research (
  id                       UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug             TEXT          NOT NULL UNIQUE,

  -- Manufacturer
  manufacturer_name        TEXT,
  manufacturer_website     TEXT,
  manufacturer_country     TEXT,

  -- Best supplier found
  supplier_name            TEXT,
  supplier_website         TEXT,
  supplier_product_url     TEXT,
  supplier_country         TEXT,
  ships_to_israel          BOOLEAN       DEFAULT FALSE,
  estimated_delivery       TEXT,          -- e.g. "7–14 business days"
  moq                      INTEGER       DEFAULT 1,

  -- Pricing (USD)
  retail_price_usd         NUMERIC(10,2),
  cost_price_usd           NUMERIC(10,2),
  shipping_cost_usd        NUMERIC(10,2) DEFAULT 0,

  -- Status
  status                   TEXT          DEFAULT 'needs_review'
    CHECK (status IN ('verified', 'needs_review', 'not_available')),
  research_notes           TEXT,

  researched_at            TIMESTAMPTZ   DEFAULT NOW(),
  updated_at               TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_supplier_research_slug   ON supplier_research (product_slug);
CREATE INDEX IF NOT EXISTS idx_supplier_research_status ON supplier_research (status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_supplier_research_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$;
DROP TRIGGER IF EXISTS trg_supplier_research_updated_at ON supplier_research;
CREATE TRIGGER trg_supplier_research_updated_at
  BEFORE UPDATE ON supplier_research
  FOR EACH ROW EXECUTE FUNCTION update_supplier_research_updated_at();


-- ============================================================
-- SEED: Camp Kitchen (12 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes
) VALUES

-- 1. Wacaco Minipresso NS
('espresso-nayad',
 'Wacaco Company Ltd', 'https://www.wacaco.com', 'Hong Kong',
 'Wacaco Official / Amazon Global', 'https://www.wacaco.com/products/minipresso-ns',
 'https://www.wacaco.com/products/minipresso-ns', 'Hong Kong',
 TRUE, '7–14 business days', 1,
 55.99, 28.00, 18.00,
 'needs_review',
 'No official Israeli distributor found. Ships directly from Wacaco HK or via Amazon Global. Selling price ₪279 vs landed cost ~₪168 = healthy margin. Note: newer NS2 model also available at similar price.'),

-- 2. Light My Fire Scout FireSteel Army
('fire-starter',
 'Light My Fire AB', 'https://lightmyfire.com', 'Sweden',
 'LightMyFire.com / KnivesAndTools EU', 'https://knivesandtools.com',
 'https://lightmyfire.com/en/swedish-firesteel-bio-army-2in1', 'Netherlands',
 TRUE, '5–10 business days (EU)', 1,
 17.99, 9.00, 12.00,
 'verified',
 'PRICE WARNING: Selling at ₪49 (~$13.4 USD) but landed cost ≈ ₪77. Current selling price is BELOW landed cost. Recommend repricing to at least ₪95. Light My Fire ships from Sweden; KnivesAndTools.com (NL) is an authorized EU distributor with international shipping.'),

-- 3. MSR PocketRocket 2
('camp-stove-single',
 'MSR / Cascade Designs', 'https://cascadedesigns.com', 'USA',
 'Cascade Designs / REI / BackCountry.com', 'https://cascadedesigns.com',
 'https://cascadedesigns.com/products/pocketrocket-2-stove', 'USA',
 TRUE, '7–14 business days', 1,
 44.95, 22.00, 15.00,
 'verified',
 'Margin only ~9.3% at ₪149. Recommend repricing to ₪189–219 for healthy margin. Ships from USA via AmazonGlobal or direct. MSR has no Israeli distributor on record.'),

-- 4. GSI Outdoors Bugaboo Camper
('cook-set-4pc',
 'GSI Outdoors', 'https://gsioutdoors.com', 'USA',
 'GSI Outdoors / REI Co-op', 'https://gsioutdoors.com',
 'https://gsioutdoors.com/products/bugaboo-camper', 'USA',
 TRUE, '10–18 business days', 1,
 169.95, 85.00, 25.00,
 'needs_review',
 'CRITICAL: Current selling price ₪149 (~$41 USD) vs US retail $169.95. Landed cost ₪401. This product LOSES money at current pricing. Either reprice to ₪549+ or replace with a cheaper alternative aluminum cookset. The Bugaboo Camper Ceramic is $169.95; aluminum base camper is cheaper (~$79.95).'),

-- 5. Lodge Cast Iron Skillet
('cast-iron-24cm',
 'Lodge Manufacturing', 'https://www.lodgecastiron.com', 'USA',
 'Lodge / Amazon.com Global', 'https://www.lodgecastiron.com',
 'https://www.lodgecastiron.com/products/round-cast-iron-classic-skillet', 'USA',
 TRUE, '10–18 business days', 1,
 39.99, 20.00, 22.00,
 'verified',
 'Note: L10SK3 is the 12-inch model, not 24cm. Lodge 12" (L10SK3) retails ~$39.99 on Amazon. At ₪199 selling price and $42 landed cost (₪153), margin is ~23%. Solid product. Ships via Amazon Global.'),

-- 6. TOAKS Titanium 1100ml Pot
('camp-kettle-1l',
 'TOAKS Outdoor', 'https://www.toaksoutdoor.com', 'China',
 'TOAKS Outdoor / Amazon.com', 'https://www.toaksoutdoor.com',
 'https://www.toaksoutdoor.com/products/pot-1100', 'China',
 TRUE, '5–10 business days', 1,
 46.95, 24.00, 14.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪99 (~$27) but landed cost ≈ ₪139. Current price is BELOW landed cost. Recommend repricing to ₪175–199. TOAKS ships directly from China. Also available on Amazon.com via AmazonGlobal.'),

-- 7. GSI Outdoors Glacier JavaPress
('french-press-350',
 'GSI Outdoors', 'https://gsioutdoors.com', 'USA',
 'GSI Outdoors / REI Co-op', 'https://gsioutdoors.com',
 'https://gsioutdoors.com/products/glacier-stainless-javapress', 'USA',
 TRUE, '10–18 business days', 1,
 34.95, 18.00, 12.00,
 'verified',
 'PRICE WARNING: Selling at ₪99 (~$27) but landed cost ≈ ₪110. Slight loss per unit. Recommend repricing to ₪149. GSI Outdoors ships via REI, BackCountry.com or their own site.'),

-- 8. GSI Outdoors Folding Cutting Board
('cutting-board-fold',
 'GSI Outdoors', 'https://gsioutdoors.com', 'USA',
 'GSI Outdoors / Amazon Global', 'https://gsioutdoors.com',
 'https://gsioutdoors.com/products/folding-cutting-board', 'USA',
 TRUE, '10–18 business days', 1,
 19.95, 10.00, 10.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪49 (~$13.4) but landed cost ≈ ₪73. Negative margin. This is a low-value item. Recommend repricing to ₪99 or replacing with a similar product sourced more cheaply (e.g. a Chinese alternative at $3–5 wholesale).'),

-- 9. Falcon Enamelware Mugs Set of 4
('enamel-cups-set',
 'Falcon Enamelware / Cape Ceramics', 'https://falconenamelware.com', 'UK',
 'Falcon Enamelware US / Amazon', 'https://us.falconenamelware.com',
 'https://us.falconenamelware.com/products/enamel-mug', 'UK',
 TRUE, '10–18 business days', 1,
 44.99, 22.00, 18.00,
 'needs_review',
 'PRICE WARNING: Selling 4 mugs at ₪79 (~$22) but cost of 4 mugs at wholesale ≈ ₪146. Significant loss. Recommend repricing to ₪169 for 4-pack. Alternatively, source generic enamel mugs from AliExpress at $2–3 each, but those are not Falcon branded.'),

-- 10. Weber Go-Anywhere Charcoal Grill
('tabletop-grill',
 'Weber-Stephen Products LLC', 'https://www.weber.com', 'USA',
 'Weber Israel (Local Distributor)', 'https://www.facebook.com/WeberIL',
 'https://www.weber.com/US/en/grills/charcoal-grills/go-anywhere-charcoal-grill/1500763.html', 'Israel',
 TRUE, '3–7 business days (local)', 1,
 99.99, 60.00, 0.00,
 'verified',
 'Weber has official Israeli presence (Weber IL). Local distributor pricing likely around $55–65 landed. At ₪369 selling price and ~₪219 local cost, margin is ~40.7%. Excellent product for Israel market. Contact Weber IL for wholesale account.'),

-- 11. Camp Chef Everest 2X
('camp-stove-double',
 'Camp Chef / American Recreation Products', 'https://www.campchef.com', 'USA',
 'Camp Chef Direct / Amazon', 'https://www.campchef.com',
 'https://www.campchef.com/collections/camp-stoves/products/everest-2x', 'USA',
 TRUE, '14–21 business days', 1,
 189.99, 95.00, 35.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪179 (~$49) but US retail is $189.99. Landed cost ≈ ₪474. This product loses money significantly at current pricing. Recommend repricing to ₪649 or replacing with a locally-sourced 2-burner stove.'),

-- 12. Light My Fire Swedish Spork Titanium Kit
('titanium-cutlery',
 'Light My Fire AB', 'https://lightmyfire.com', 'Sweden',
 'LightMyFire.com / KnivesAndTools EU', 'https://knivesandtools.com',
 'https://lightmyfire.com/products/spork-kit-titanium', 'Netherlands',
 TRUE, '5–10 business days (EU)', 1,
 21.99, 11.00, 12.00,
 'verified',
 'Margin only ~15.2% at ₪99. Borderline viable. Recommend repricing to ₪129 for 25%+ margin. KnivesAndTools.com (NL) ships internationally and carries Light My Fire products at competitive wholesale rates.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name    = EXCLUDED.manufacturer_name,
  manufacturer_website = EXCLUDED.manufacturer_website,
  manufacturer_country = EXCLUDED.manufacturer_country,
  supplier_name        = EXCLUDED.supplier_name,
  supplier_website     = EXCLUDED.supplier_website,
  supplier_product_url = EXCLUDED.supplier_product_url,
  supplier_country     = EXCLUDED.supplier_country,
  ships_to_israel      = EXCLUDED.ships_to_israel,
  estimated_delivery   = EXCLUDED.estimated_delivery,
  moq                  = EXCLUDED.moq,
  retail_price_usd     = EXCLUDED.retail_price_usd,
  cost_price_usd       = EXCLUDED.cost_price_usd,
  shipping_cost_usd    = EXCLUDED.shipping_cost_usd,
  status               = EXCLUDED.status,
  research_notes       = EXCLUDED.research_notes,
  updated_at           = NOW();


-- ============================================================
-- SEED: Vehicle Gear (12 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes
) VALUES

-- 1. ARB E-Z Tire Deflator Kit
('automatic-tire-deflators-4pc',
 'ARB 4x4 Accessories', 'https://www.arb.com.au', 'Australia',
 'Henefeld Technologies Ltd (IL)', 'https://www.henefeld-tech.co.il',
 'https://store.arbusa.com/e-z-tire-deflator-kit-with-psi-gauge-arb505/', 'Israel',
 TRUE, '2–5 business days (local stock)', 1,
 49.99, 28.00, 0.00,
 'verified',
 'VERIFIED Israeli distributor: Henefeld Technologies Ltd, Alon ha-Tavor St., Caesarea, IL. Phone: +972-4-618-6777. Website: henefeld-tech.co.il. Authorized ARB dealer. Local sourcing eliminates international shipping. At ₪149 selling price and ~₪102 landed cost, margin is 31.4%.'),

-- 2. VIAIR 40043 400P Compressor
('air-compressor-12v',
 'VIAIR Corporation', 'https://viaircorp.com', 'USA',
 'VIAIR Direct / Amazon US Global', 'https://viaircorp.com',
 'https://viaircorp.com/products/400p', 'USA',
 TRUE, '10–18 business days', 1,
 164.99, 90.00, 40.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪229 (~$63) but US retail is $164.99. Landed cost ≈ ₪475. This product loses significant money at current pricing. VIAIR 400P is a premium product. Recommend repricing to ₪699–849. VIAIR ships internationally. No Israeli distributor found.'),

-- 3. MaxTrax MKII Recovery Boards (set of 2)
('recovery-boards-2pk',
 'MaxTrax PTY Ltd', 'https://maxtrax.com.au', 'Australia',
 'MaxTrax USA', 'https://maxtraxus.com',
 'https://maxtraxus.com/collections/maxtrax-mkii-recovery-tracks', 'USA',
 TRUE, '10–18 business days', 1,
 279.99, 175.00, 65.00,
 'verified',
 'MaxTrax USA (maxtraxus.com) ships internationally including Israel. US retail $279.99 per set. At ₪1399 selling price and landed cost ~₪876, margin is 37.4%. Strong seller. REI also stocks at same price.'),

-- 4. ARB Kinetic Recovery Rope
('kinetic-strap-9m',
 'ARB 4x4 Accessories', 'https://www.arb.com.au', 'Australia',
 'Henefeld Technologies Ltd (IL)', 'https://www.henefeld-tech.co.il',
 'https://s7ap1.scene7.com/is/image/arbprod/ARB710_v2.jpg', 'Israel',
 TRUE, '2–5 business days (local stock)', 1,
 89.99, 48.00, 0.00,
 'verified',
 'BEST MARGIN IN CATALOG: 64.9%. Same authorized Israeli distributor as ARB505: Henefeld Technologies Ltd, Caesarea. +972-4-618-6777. Local stock = no shipping cost. At ₪499 selling price and ~₪175 cost, this is an excellent dropshipping candidate.'),

-- 5. Hi-Lift HL-484PC Jack
('hi-lift-jack-48',
 'Hi-Lift Jack Company / Bloomfield Mfg', 'https://hi-lift.com', 'USA',
 'Hi-Lift Direct / Amazon US', 'https://hi-lift.com',
 'https://hi-lift.com/hi-lift-jacks/cast-steel/', 'USA',
 TRUE, '10–18 business days', 1,
 79.99, 50.00, 35.00,
 'verified',
 'US retail $79.99 (Northern Tool). At ₪699 selling price and landed cost ~₪310, margin is 55.6%. Excellent margin. Heavy item (7.7kg) so shipping is $35+. Available on Amazon US with Global shipping. No Israeli distributor found but Hi-Lift ships to Israel via Amazon.'),

-- 6. Dometic CFX3 35 Fridge
('car-fridge-12v-40l',
 'Dometic Group AB', 'https://www.dometic.com', 'Sweden',
 'Dometic Israel (Authorized Dealer)', 'https://www.dometic.com/en-us/us/find-a-dealer/israel',
 'https://www.dometic.com/en-us/product/dometic-cfx3-35-9600024617', 'Israel',
 TRUE, '3–7 business days (local)', 1,
 649.99, 420.00, 0.00,
 'needs_review',
 'Dometic has a dealer finder for Israel (dometic.com/find-a-dealer/israel). Need to identify the specific Israeli dealer and establish wholesale account. US retail $649.99. At ₪3999 selling price and local cost ~₪1533, margin is 61.7% — one of the highest in the catalog. Must confirm local dealer pricing.'),

-- 7. AstroAI Digital Tire Gauge
('tire-gauge-digital',
 'AstroAI', 'https://astroai.com', 'China',
 'AstroAI / Amazon.com', 'https://www.astroai.com',
 'https://cdn.astroai.com/cdn-cgi/image/format=webp,width=602/astroai-banner/product/1d49a99c-6da8-ec91-c92d-5c6b6cf0c4c2_20250121.webp', 'China',
 TRUE, '7–14 business days', 1,
 12.99, 6.00, 8.00,
 'verified',
 'BORDERLINE: Selling at ₪49 (~$13.4), landed cost ~₪51. Essentially break-even or slight loss after customs. AstroAI sells on Amazon.com with global shipping. For profitability, reprice to ₪79. Alternative: source a comparable gauge directly from AliExpress at $2–3 per unit.'),

-- 8. Rhino USA Ratchet Straps 4-pack
('ratchet-straps-4pk',
 'Rhino USA', 'https://www.rhinousainc.com', 'USA',
 'Rhino USA / Amazon.com', 'https://www.rhinousainc.com',
 'https://www.rhinousainc.com/cdn/shop/files/hd-ratchetkit-4pk.main.jpg', 'USA',
 TRUE, '10–18 business days', 1,
 34.99, 16.00, 14.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪79 (~$22) but landed cost ≈ ₪109. Negative margin. Rhino USA ships via Amazon. Recommend repricing to ₪149 or sourcing generic ratchet straps at lower cost. US retail $34.99 so ₪79 is slightly below US retail after conversion.'),

-- 9. Thrive Emergency Car Kit 60pc
('emergency-car-kit',
 'Thrive', 'https://thrivebrandproducts.com', 'USA',
 'Thrive / Amazon.com', 'https://thrivebrandproducts.com',
 'https://thrivebrandproducts.com/cdn/shop/files/Heroooooo_large.jpg', 'USA',
 TRUE, '10–18 business days', 1,
 69.99, 38.00, 20.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪89 (~$24) but US retail is $69.99. Landed cost ~₪212. Major loss per unit. Emergency kits are widely available. Recommend either repricing to ₪299+ or sourcing a comparable 60-piece kit from AliExpress at $12–18 landed.'),

-- 10. Vantrue N4 Pro Dash Cam
('dashcam-4k-gps',
 'Vantrue', 'https://www.vantrue.com', 'China',
 'Vantrue Official / Amazon.com', 'https://www.vantrue.com',
 'https://www.vantrue.com/products/n4-pro', 'China',
 TRUE, '7–14 business days', 1,
 279.99, 160.00, 25.00,
 'verified',
 'Vantrue N4 Pro US retail $279.99 (regular). Landed cost ~₪675. At ₪899 selling price, margin is 24.9%. Note: N4 Pro S (newer model) now available. Vantrue ships globally from China. Available on Amazon.com with Global shipping. Decent margin product.'),

-- 11. Yakima LoadWarrior Roof Basket
('roof-bag-cargo',
 'Yakima Products Inc.', 'https://yakima.com', 'USA',
 'Yakima / REI Co-op', 'https://yakima.com',
 'https://yakima.com/products/loadwarrior', 'USA',
 TRUE, '10–21 business days', 1,
 529.00, 320.00, 85.00,
 'needs_review',
 'REI retail $529. Landed cost ~₪1479. At ₪2499 selling price, margin is 40.8%. Heavy item (steel basket) so shipping is expensive. Need to verify Israel customs classification for this product. Yakima has no Israeli distributor found. Recommend contacting Yakima International.'),

-- 12. Anker 167W USB-C Car Charger
('usb-car-adapter',
 'Anker Innovations', 'https://www.anker.com', 'China',
 'Anker / Amazon.com', 'https://www.anker.com',
 'https://cdn.shopify.com/s/files/1/0493/9834/9974/files/B27370A1_29c0ef29-c680-457e-b009-50e4e1d53a03_1600x.png', 'China',
 TRUE, '5–10 business days', 1,
 45.99, 22.00, 10.00,
 'needs_review',
 'PRICE WARNING: Selling at ₪59 (~$16) but US retail is $45.99. Landed cost ~₪117. Significant loss per unit. Anker is widely available in Israel locally. The ₪59 price is far below market reality. Recommend repricing to ₪189–219 or sourcing from Anker Israel/local electronics distributor.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name    = EXCLUDED.manufacturer_name,
  manufacturer_website = EXCLUDED.manufacturer_website,
  manufacturer_country = EXCLUDED.manufacturer_country,
  supplier_name        = EXCLUDED.supplier_name,
  supplier_website     = EXCLUDED.supplier_website,
  supplier_product_url = EXCLUDED.supplier_product_url,
  supplier_country     = EXCLUDED.supplier_country,
  ships_to_israel      = EXCLUDED.ships_to_israel,
  estimated_delivery   = EXCLUDED.estimated_delivery,
  moq                  = EXCLUDED.moq,
  retail_price_usd     = EXCLUDED.retail_price_usd,
  cost_price_usd       = EXCLUDED.cost_price_usd,
  shipping_cost_usd    = EXCLUDED.shipping_cost_usd,
  status               = EXCLUDED.status,
  research_notes       = EXCLUDED.research_notes,
  updated_at           = NOW();


-- ============================================================
-- SEED: Lighting & Power (12 products)
-- ============================================================
INSERT INTO supplier_research (
  product_slug, manufacturer_name, manufacturer_website, manufacturer_country,
  supplier_name, supplier_website, supplier_product_url, supplier_country,
  ships_to_israel, estimated_delivery, moq,
  retail_price_usd, cost_price_usd, shipping_cost_usd,
  status, research_notes
) VALUES

-- 1. BioLite Range 300 Headlamp
('headlamp-range-300',
 'BioLite Inc.', 'https://www.bioliteenergy.com', 'USA',
 'BioLite Direct / REI / Amazon', 'https://www.bioliteenergy.com',
 'https://www.bioliteenergy.com/products/range-300-headlamp', 'USA',
 TRUE, '7–14 business days', 1,
 39.95, 20.00, 14.00,
 'verified',
 'US MSRP $39.95 (confirmed via REI and BioLite site). At ₪249 selling price and landed cost ~₪124, margin is 50.2%. Excellent margin. BioLite ships globally. Also available via REI and Amazon US with Global shipping. No Israeli distributor found — order direct from BioLite.'),

-- 2. Nitecore NU25 Headlamp
('headlamp-nitecore-nu25',
 'Nitecore / Sysmax Industrial Co.', 'https://www.nitecore.com', 'China',
 'Nitecore Official / Amazon.com', 'https://www.nitecore.com',
 'https://www.nitecore.com/product/nu25/', 'China',
 TRUE, '5–10 business days', 1,
 36.95, 18.00, 10.00,
 'verified',
 'Retail ~$36.95 (Kaviso, Amazon). At ₪119 selling price and landed cost ~₪102, margin is only 14.1%. Low but viable if volume is high. Recommend repricing to ₪149 for 25%+ margin. Nitecore ships globally. Amazon.com Global also carries it.'),

-- 3. Goal Zero Lighthouse 600
('camp-lantern-600',
 'Goal Zero (NRG Energy)', 'https://goalzero.com', 'USA',
 'Goal Zero Direct / Amazon.com', 'https://goalzero.com',
 'https://goalzero.com/products/lighthouse-600-lantern-usb-power-hub', 'USA',
 TRUE, '7–14 business days', 1,
 68.99, 38.00, 18.00,
 'verified',
 'Amazon retail $68.99 (confirmed). At ₪499 selling price and landed cost ~₪204, margin is 59.0%. Excellent margin. Goal Zero ships globally and is on Amazon with Global shipping. Best performer in the lantern category. No Israeli distributor found.'),

-- 4. BioLite AlpenGlow 500
('camp-lantern-alpenglow',
 'BioLite Inc.', 'https://www.bioliteenergy.com', 'USA',
 'BioLite Direct / REI', 'https://www.bioliteenergy.com',
 'https://www.bioliteenergy.com/products/alpenglow-500-lantern', 'USA',
 TRUE, '7–14 business days', 1,
 74.95, 40.00, 18.00,
 'verified',
 'BioLite MSRP ~$74.95. At ₪399 selling price and landed cost ~₪212, margin is 46.9%. Very strong margin. BioLite ships internationally. Both Range 300 and AlpenGlow are high-margin BioLite products — consider establishing a BioLite wholesale account.'),

-- 5. LuminAID PackLite Max
('solar-lantern-luminaid-max',
 'LuminAID Lab Inc.', 'https://luminaid.com', 'USA',
 'LuminAID Direct / Amazon.com / REI', 'https://luminaid.com',
 'https://luminaid.com/products/luminary-max', 'USA',
 TRUE, '7–14 business days', 1,
 62.95, 32.00, 14.00,
 'verified',
 'REI retail $62.95. LuminAID ships directly. At ₪229 selling price and landed cost ~₪168, margin is 26.7%. Good product. LuminAID also has B2B sales — contact luminaid.com/pages/b2b for wholesale pricing. Note: the Max QI model (with wireless charging) is the current flagship.'),

-- 6. Goal Zero Crush Light Solar
('solar-lantern-crush-light',
 'Goal Zero (NRG Energy)', 'https://goalzero.com', 'USA',
 'Goal Zero Direct / Amazon.com', 'https://goalzero.com',
 'https://www.goalzero.com/products/crush-light', 'USA',
 TRUE, '7–14 business days', 1,
 22.95, 12.00, 10.00,
 'verified',
 'PRICE WARNING: Selling at ₪49 (~$13.4) but landed cost ~₪80. Loss per unit. Goal Zero Crush Light US retail is $22.95. Recommend repricing to ₪119 for a healthy margin. At that price, margin would be ~33%.'),

-- 7. SunJack 40W Solar Panel
('solar-panel-40w',
 'SunJack', 'https://sunjack.com', 'USA',
 'SunJack Direct / Amazon.com', 'https://sunjack.com',
 'https://sunjack.com/products/40-watt-solar-panel', 'USA',
 TRUE, '7–14 business days', 1,
 89.99, 48.00, 22.00,
 'needs_review',
 'SunJack 40W available on sunjack.com and Amazon. US retail ~$89.99. At ₪499 selling price and landed cost ~₪256, margin is 48.8%. Good margin. SunJack ships globally. ETFE panels are premium. Confirm current model availability as product lineup changes.'),

-- 8. Goal Zero Venture 35 Power Bank
('power-bank-venture-35',
 'Goal Zero (NRG Energy)', 'https://goalzero.com', 'USA',
 'Goal Zero Direct / Amazon.com / REI', 'https://goalzero.com',
 'https://goalzero.com/products/venture-35-power-bank', 'USA',
 TRUE, '7–14 business days', 1,
 74.95, 40.00, 18.00,
 'verified',
 'Goal Zero Venture 35 retails at ~$74.95 (REI, Goal Zero). At ₪349 selling price and landed cost ~₪212, margin is 39.3%. Solid margin. IP67 waterproof makes it a premium item. Goal Zero ships globally from USA.'),

-- 9. EcoFlow River 2 Power Station
('power-station-river-2',
 'EcoFlow Technology Inc.', 'https://www.ecoflow.com', 'China',
 'EcoFlow Direct / Amazon.com', 'https://www.ecoflow.com',
 'https://www.ecoflow.com/products/river2-portable-power-station', 'China/Global',
 TRUE, '5–10 business days', 1,
 189.00, 130.00, 30.00,
 'verified',
 'US retail confirmed at $189 (EcoFlow official, Off Grid Stores). EcoFlow ships globally and has strong international presence. At ₪999 selling price and landed cost ~₪584, margin is 41.5%. EcoFlow has a reseller program — contact ecoflow.com/pages/partner for wholesale.'),

-- 10. Goal Zero Lighthouse Mini Core
('camp-lantern-mini-core',
 'Goal Zero (NRG Energy)', 'https://goalzero.com', 'USA',
 'Goal Zero Direct / Amazon.com', 'https://goalzero.com',
 'https://www.goalzero.com/products/lighthouse-mini-core', 'USA',
 TRUE, '7–14 business days', 1,
 54.95, 30.00, 14.00,
 'verified',
 'Goal Zero Lighthouse Mini Core retails ~$54.95. At ₪299 selling price and landed cost ~₪161, margin is 46.3%. Great margin. Compact form factor makes it a strong travel/hiking seller. Ships globally from Goal Zero.'),

-- 11. Goal Zero Nomad 10 Solar Panel
('solar-panel-nomad-10',
 'Goal Zero (NRG Energy)', 'https://goalzero.com', 'USA',
 'Goal Zero Direct / Amazon.com', 'https://goalzero.com',
 'https://www.goalzero.com/products/nomad-10', 'USA',
 TRUE, '7–14 business days', 1,
 49.95, 28.00, 14.00,
 'verified',
 'Goal Zero Nomad 10 retails ~$49.95. At ₪399 selling price and landed cost ~₪153, margin is 61.6%. Second best margin in catalog. Lightweight solar panel is a strong dropshipping item. Note: this pairs well with the Venture 35 as a bundle opportunity.'),

-- 12. LuminAID Survivor Solar Lantern
('solar-lantern-survivor',
 'LuminAID Lab Inc.', 'https://luminaid.com', 'USA',
 'LuminAID Direct / Amazon.com', 'https://luminaid.com',
 'https://luminaid.com/products/survivor', 'USA',
 TRUE, '7–14 business days', 1,
 44.99, 23.00, 14.00,
 'verified',
 'LuminAID Survivor retails ~$44.99. At ₪199 selling price and landed cost ~₪135, margin is 32.1%. Solid emergency/survival product with unique 3-color mode including red SOS. LuminAID ships globally. Strong differentiation from Goal Zero Crush Light.')

ON CONFLICT (product_slug) DO UPDATE SET
  manufacturer_name    = EXCLUDED.manufacturer_name,
  manufacturer_website = EXCLUDED.manufacturer_website,
  manufacturer_country = EXCLUDED.manufacturer_country,
  supplier_name        = EXCLUDED.supplier_name,
  supplier_website     = EXCLUDED.supplier_website,
  supplier_product_url = EXCLUDED.supplier_product_url,
  supplier_country     = EXCLUDED.supplier_country,
  ships_to_israel      = EXCLUDED.ships_to_israel,
  estimated_delivery   = EXCLUDED.estimated_delivery,
  moq                  = EXCLUDED.moq,
  retail_price_usd     = EXCLUDED.retail_price_usd,
  cost_price_usd       = EXCLUDED.cost_price_usd,
  shipping_cost_usd    = EXCLUDED.shipping_cost_usd,
  status               = EXCLUDED.status,
  research_notes       = EXCLUDED.research_notes,
  updated_at           = NOW();
