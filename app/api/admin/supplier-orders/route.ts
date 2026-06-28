import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';

// GET — list all supplier orders, enriched with customer data
export async function GET() {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabase();

  const [{ data: supplierOrders, error: soError }, { data: orders }] = await Promise.all([
    supabase.from('supplier_orders').select('*').order('created_at', { ascending: false }),
    supabase.from('orders').select('order_id, customer_name, email, phone, created_at').eq('payment_status', 'paid'),
  ]);

  if (soError) return NextResponse.json({ error: soError.message }, { status: 500 });

  const orderMap = new Map<string, { customer_name: string; email: string; phone: string; created_at: string }>();
  for (const o of orders ?? []) orderMap.set(o.order_id, o);

  const rows = (supplierOrders ?? []).map(so => {
    const o = orderMap.get(so.campil_order_id);
    return {
      ...so,
      customer_name: o?.customer_name ?? '—',
      customer_email: o?.email ?? '—',
      customer_phone: o?.phone ?? '—',
      order_created_at: o?.created_at ?? '',
    };
  });

  return NextResponse.json({ orders: rows });
}

// POST — create a new supplier order
export async function POST(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { campil_order_id, supplier_name, supplier_order_number, tracking_number, notes } = body;

  if (!campil_order_id?.trim() || !supplier_name?.trim()) {
    return NextResponse.json({ error: 'campil_order_id and supplier_name are required' }, { status: 400 });
  }

  const supabase = getSupabase();

  // Verify the CampIL order exists
  const { data: order } = await supabase
    .from('orders')
    .select('order_id, customer_name, email, phone, created_at')
    .eq('order_id', campil_order_id.trim())
    .single();

  if (!order) {
    return NextResponse.json({ error: `הזמנה ${campil_order_id} לא נמצאה` }, { status: 404 });
  }

  const { data: created, error } = await supabase
    .from('supplier_orders')
    .insert({
      campil_order_id: campil_order_id.trim(),
      supplier_name: supplier_name.trim(),
      supplier_order_number: supplier_order_number?.trim() || null,
      tracking_number: tracking_number?.trim() || null,
      notes: notes?.trim() || null,
      status: 'ordered',
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    order: {
      ...created,
      customer_name: order.customer_name,
      customer_email: order.email,
      customer_phone: order.phone,
      order_created_at: order.created_at,
    },
  }, { status: 201 });
}
