import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';

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
    await supabase
      .from('orders')
      .update({
        payment_status:          'paid',
        order_status:            'processing',
        tranzila_transaction_id: transactionId,
      })
      .eq('order_id', orderId);
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
