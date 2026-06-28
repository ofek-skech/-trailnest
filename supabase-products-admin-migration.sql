-- Products Admin Migration
-- Run in Supabase SQL editor: https://app.supabase.com → SQL Editor

-- ── Suppliers table ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS suppliers (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT    NOT NULL,
  website       TEXT,
  contact_email TEXT,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── Product admin data table ────────────────────────────────────────
-- Stores admin overrides and supplier data per product slug.
-- NULL fields mean "use the TypeScript catalog value".
CREATE TABLE IF NOT EXISTS product_admin_data (
  id           UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  product_slug TEXT    NOT NULL UNIQUE,

  -- Core field overrides (NULL = use TypeScript value)
  name              TEXT,
  short_description TEXT,
  description       TEXT,
  price             NUMERIC(10,2),
  original_price    NUMERIC(10,2),
  badge             TEXT CHECK (badge IN ('new','sale','bestseller','limited') OR badge IS NULL),
  brand             TEXT,
  sku               TEXT,
  in_stock          BOOLEAN,
  delivery_time     TEXT,
  images            JSONB,   -- string[]
  video_url         TEXT,
  benefits          JSONB,   -- string[]
  specs             JSONB,   -- {label:string, value:string}[]

  -- Supplier link
  supplier_id           UUID REFERENCES suppliers(id) ON DELETE SET NULL,
  supplier_sku          TEXT,
  supplier_product_url  TEXT,
  supplier_cost_price   NUMERIC(10,2),
  supplier_contact_email TEXT,
  supplier_notes        TEXT,

  -- Admin-only
  hidden     BOOLEAN DEFAULT FALSE,
  admin_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS product_admin_data_slug_idx
  ON product_admin_data (product_slug);

CREATE INDEX IF NOT EXISTS product_admin_data_supplier_idx
  ON product_admin_data (supplier_id);

-- Auto-update triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS suppliers_updated_at ON suppliers;
CREATE TRIGGER suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS product_admin_data_updated_at ON product_admin_data;
CREATE TRIGGER product_admin_data_updated_at
  BEFORE UPDATE ON product_admin_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
