-- CampIL Fulfillment AI Migration
-- Run this in the Supabase SQL editor: https://app.supabase.com → SQL Editor

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS fulfillment_status TEXT NOT NULL DEFAULT 'pending_review',
  ADD COLUMN IF NOT EXISTS ai_recommendation  JSONB,
  ADD COLUMN IF NOT EXISTS ai_analyzed_at     TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS supplier_ordered_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS tracking_number    TEXT,
  ADD COLUMN IF NOT EXISTS admin_notes        TEXT;

-- Index for filtering by fulfillment status
CREATE INDEX IF NOT EXISTS orders_fulfillment_status_idx ON orders (fulfillment_status);

-- Backfill existing paid orders to 'pending_review'
UPDATE orders SET fulfillment_status = 'pending_review' WHERE payment_status = 'paid';
