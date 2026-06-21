import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { analyzeOrder } from '@/lib/ai-fulfillment';
import { requireAdminSession } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { orderId } = await req.json();
  if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });

  const supabase = getSupabase();
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error || !order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const recommendation = await analyzeOrder(order);

  const { error: updateError } = await supabase
    .from('orders')
    .update({
      ai_recommendation: recommendation,
      ai_analyzed_at: new Date().toISOString(),
      fulfillment_status: 'ai_analyzed',
    })
    .eq('id', orderId);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ recommendation });
}
