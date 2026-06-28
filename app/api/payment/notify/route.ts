import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { sendOrderConfirmationEmail, isEmailConfigured } from '@/lib/email';

async function handleNotification(params: URLSearchParams) {
  const response        = params.get('Response');
  const transactionId   = params.get('TransactionId');
  const orderId         = params.get('myid');
  const sum             = params.get('sum');
  const credType        = params.get('cred_type');
  const numPayments     = params.get('num_of_payments');

  if (!orderId) return;

  const supabase = getSupabase();

  if (response === '000') {
    const { data: order } = await supabase
      .from('orders')
      .update({
        payment_status:          'paid',
        order_status:            'processing',
        tranzila_transaction_id: transactionId,
      })
      .eq('order_id', orderId)
      .select('email, customer_name, items_json, subtotal, shipping, total, city, address')
      .single();

    if (order && isEmailConfigured()) {
      sendOrderConfirmationEmail({
        to:           order.email,
        customerName: order.customer_name,
        orderId,
        items:        order.items_json as Array<{ name: string; quantity: number; price: number }>,
        subtotal:     order.subtotal,
        shipping:     order.shipping,
        total:        order.total,
        city:         order.city,
        address:      order.address,
      }).catch((err: unknown) => console.error('Order confirmation email failed:', err));
    }
  } else {
    await supabase
      .from('orders')
      .update({ payment_status: 'failed' })
      .eq('order_id', orderId);
  }
}

export async function POST(req: NextRequest) {
  const text = await req.text();
  const params = new URLSearchParams(text);
  await handleNotification(params);
  return NextResponse.json({ received: true });
}

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  await handleNotification(params);
  return NextResponse.json({ received: true });
}
