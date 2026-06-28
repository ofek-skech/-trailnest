-- Supplier Orders table
-- Run this in your Supabase SQL editor: https://app.supabase.com → SQL Editor

CREATE TABLE IF NOT EXISTS supplier_orders (
  id                   UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  campil_order_id      TEXT          NOT NULL,
  supplier_name        TEXT          NOT NULL,
  supplier_order_number TEXT,
  tracking_number      TEXT,
  status               TEXT          NOT NULL DEFAULT 'ordered'
                         CHECK (status IN ('ordered', 'in_transit', 'delivered', 'problem')),
  notes                TEXT,
  customer_notified_at TIMESTAMPTZ,
  created_at           TIMESTAMPTZ   DEFAULT NOW(),
  updated_at           TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS supplier_orders_campil_order_id_idx
  ON supplier_orders (campil_order_id);

CREATE INDEX IF NOT EXISTS supplier_orders_status_idx
  ON supplier_orders (status);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_supplier_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS supplier_orders_updated_at ON supplier_orders;
CREATE TRIGGER supplier_orders_updated_at
  BEFORE UPDATE ON supplier_orders
  FOR EACH ROW EXECUTE FUNCTION update_supplier_orders_updated_at();
