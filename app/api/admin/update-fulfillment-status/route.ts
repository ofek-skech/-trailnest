import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';
import type { FulfillmentStatus } from '@/lib/supabase-server';

const VALID_STATUSES: FulfillmentStatus[] = [
  'pending_review', 'ai_analyzed', 'pending_approval',
  'supplier_ordered', 'shipped', 'completed', 'problem',
];

export async function PATCH(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { orderId, fulfillmentStatus, trackingNumber, adminNotes } = await req.json();
  if (!orderId || !fulfillmentStatus) {
    return NextResponse.json({ error: 'orderId and fulfillmentStatus required' }, { status: 400 });
  }
  if (!VALID_STATUSES.includes(fulfillmentStatus)) {
    return NextResponse.json({ error: 'Invalid fulfillment status' }, { status: 400 });
  }

  const updates: Record<string, unknown> = { fulfillment_status: fulfillmentStatus };
  if (fulfillmentStatus === 'supplier_ordered') updates.supplier_ordered_at = new Date().toISOString();
  if (trackingNumber !== undefined) updates.tracking_number = trackingNumber;
  if (adminNotes !== undefined) updates.admin_notes = adminNotes;

  const supabase = getSupabase();
  const { error } = await supabase.from('orders').update(updates).eq('id', orderId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
