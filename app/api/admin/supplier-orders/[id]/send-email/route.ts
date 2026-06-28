import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';
import { sendTrackingEmail, isEmailConfigured } from '@/lib/email';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: 'Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables.' },
      { status: 503 }
    );
  }

  const { id } = await params;
  const supabase = getSupabase();

  // Fetch the supplier order
  const { data: supplierOrder, error: soError } = await supabase
    .from('supplier_orders')
    .select('*')
    .eq('id', id)
    .single();

  if (soError || !supplierOrder) {
    return NextResponse.json({ error: 'הזמנת ספק לא נמצאה' }, { status: 404 });
  }
  if (!supplierOrder.tracking_number) {
    return NextResponse.json({ error: 'לא הוגדר מספר מעקב' }, { status: 400 });
  }

  // Fetch the customer order
  const { data: order, error: oError } = await supabase
    .from('orders')
    .select('customer_name, email')
    .eq('order_id', supplierOrder.campil_order_id)
    .single();

  if (oError || !order) {
    return NextResponse.json({ error: `הזמנת לקוח ${supplierOrder.campil_order_id} לא נמצאה` }, { status: 404 });
  }

  try {
    await sendTrackingEmail({
      to: order.email,
      customerName: order.customer_name,
      orderId: supplierOrder.campil_order_id,
      supplierName: supplierOrder.supplier_name,
      trackingNumber: supplierOrder.tracking_number,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `שגיאה בשליחת האימייל: ${message}` }, { status: 500 });
  }

  // Record notification time and update status to in_transit if still 'ordered'
  const statusUpdate: Record<string, unknown> = { customer_notified_at: new Date().toISOString() };
  if (supplierOrder.status === 'ordered') statusUpdate.status = 'in_transit';

  await supabase.from('supplier_orders').update(statusUpdate).eq('id', id);

  return NextResponse.json({ ok: true, email: order.email });
}
