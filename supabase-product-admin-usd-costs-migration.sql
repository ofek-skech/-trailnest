-- Migration: add supplier_cost_usd and supplier_shipping_usd to product_admin_data
-- Run this in Supabase SQL Editor BEFORE deploying the updated admin UI.

ALTER TABLE product_admin_data
  ADD COLUMN IF NOT EXISTS supplier_cost_usd      NUMERIC(10, 2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS supplier_shipping_usd  NUMERIC(10, 2) DEFAULT NULL;

COMMENT ON COLUMN product_admin_data.supplier_cost_usd     IS 'Raw supplier cost in USD (ex-works or FOB)';
COMMENT ON COLUMN product_admin_data.supplier_shipping_usd IS 'Estimated shipping cost to Israel in USD';
COMMENT ON COLUMN product_admin_data.supplier_cost_price   IS 'Landed cost in ILS = (supplier_cost_usd + supplier_shipping_usd) * exchange_rate. Auto-computed by admin UI on save.';
