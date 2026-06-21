import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CIL-${ts}-${rand}`;
}

export async function POST(req: NextRequest) {
  let body: {
    customer: { name: string; phone: string; email: string; city: string; address: string; notes: string };
    items: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
    subtotal: number;
    shipping: number;
    total: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { customer, items, subtotal, shipping, total } = body;

  if (!customer?.name || !customer?.phone || !customer?.email || !customer?.city || !customer?.address) {
    return NextResponse.json({ error: 'Missing required customer fields' }, { status: 400 });
  }

  const orderId = generateOrderId();
  const supabase = getSupabase();

  const { error } = await supabase.from('orders').insert({
    order_id: orderId,
    customer_name: customer.name,
    phone: customer.phone,
    email: customer.email,
    city: customer.city,
    address: customer.address,
    notes: customer.notes || null,
    items_json: items,
    subtotal,
    shipping,
    total,
    payment_status: 'pending',
    order_status: 'new',
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }

  const host = req.headers.get('host') ?? 'localhost:3000';
  const proto = req.headers.get('x-forwarded-proto') ?? 'https';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${proto}://${host}`;
  const terminalName = process.env.TRANZILA_TERMINAL_NAME ?? '';

  const itemList = items.map(i => i.name).join(', ');

  const params = new URLSearchParams({
    supplier:              terminalName,
    sum:                   total.toFixed(2),
    currency:              '1',
    cred_type:             '1',
    max_payments:          '12',
    pdesc:                 `הזמנה CampIL ${orderId} — ${itemList}`.substring(0, 200),
    contact:               customer.name,
    phone:                 customer.phone,
    email:                 customer.email,
    address:               customer.address,
    city:                  customer.city,
    myid:                  orderId,
    notify_url_address:    `${baseUrl}/api/payment/notify`,
    success_url_address:   `${baseUrl}/thank-you?order_id=${orderId}`,
    fail_url_address:      `${baseUrl}/checkout?error=payment_failed&order_id=${orderId}`,
    lang:                  'he',
  });

  const paymentUrl = `https://secure5.tranzila.com/cgi-bin/tranzila71u.cgi?${params.toString()}`;

  return NextResponse.json({ paymentUrl, orderId });
}
