import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { generateCustomerMessage } from '@/lib/ai-fulfillment';
import { requireAdminSession } from '@/lib/admin-auth';
import type { CustomerMessageType } from '@/lib/ai-fulfillment';

const VALID_TYPES: CustomerMessageType[] = [
  'order_received', 'supplier_ordered', 'tracking_received', 'delay', 'refund',
];

export async function POST(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { orderId, messageType, trackingNumber } = await req.json();
  if (!orderId || !messageType) {
    return NextResponse.json({ error: 'orderId and messageType required' }, { status: 400 });
  }
  if (!VALID_TYPES.includes(messageType)) {
    return NextResponse.json({ error: 'Invalid message type' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error || !order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const message = await generateCustomerMessage(order, messageType, trackingNumber);
  return NextResponse.json({ message });
}
