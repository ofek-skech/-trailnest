import { createClient } from '@supabase/supabase-js';
import type { AIRecommendation } from './ai-fulfillment';

export function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type FulfillmentStatus =
  | 'pending_review'
  | 'ai_analyzed'
  | 'pending_approval'
  | 'supplier_ordered'
  | 'shipped'
  | 'completed'
  | 'problem';

export interface Order {
  id: string;
  order_id: string;
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  notes: string | null;
  items_json: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
  subtotal: number;
  shipping: number;
  total: number;
  payment_status: PaymentStatus;
  tranzila_transaction_id: string | null;
  order_status: OrderStatus;
  created_at: string;
  fulfillment_status: FulfillmentStatus;
  ai_recommendation: AIRecommendation | null;
  ai_analyzed_at: string | null;
  supplier_ordered_at: string | null;
  tracking_number: string | null;
  admin_notes: string | null;
}
