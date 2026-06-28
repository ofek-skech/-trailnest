import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';
import { products } from '@/lib/products';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;

  // Verify product exists in catalog
  const product = products.find(p => p.slug === slug);
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const body = await req.json();

  // Build the upsert payload — only include fields that are explicitly provided
  const payload: Record<string, unknown> = { product_slug: slug };

  const stringFields = [
    'name', 'short_description', 'description', 'badge', 'brand', 'sku',
    'delivery_time', 'video_url', 'supplier_id', 'supplier_sku',
    'supplier_product_url', 'supplier_contact_email', 'supplier_notes', 'admin_notes',
  ];
  const numericFields = ['price', 'original_price', 'supplier_cost_usd', 'supplier_shipping_usd', 'supplier_cost_price'];
  const boolFields = ['in_stock', 'hidden'];
  const jsonFields = ['images', 'benefits', 'specs'];

  for (const f of stringFields) {
    if (f in body) payload[f] = body[f] === '' ? null : body[f];
  }
  for (const f of numericFields) {
    if (f in body) {
      const v = body[f];
      payload[f] = (v === '' || v === null || v === undefined) ? null : Number(v);
    }
  }
  for (const f of boolFields) {
    if (f in body) payload[f] = Boolean(body[f]);
  }
  for (const f of jsonFields) {
    if (f in body) payload[f] = body[f] ?? null;
  }

  // Auto-compute landed cost ILS when both USD fields are present
  const EXCHANGE_RATE = 3.65;
  const costUsd     = typeof payload.supplier_cost_usd     === 'number' ? payload.supplier_cost_usd     : null;
  const shippingUsd = typeof payload.supplier_shipping_usd === 'number' ? payload.supplier_shipping_usd : null;
  if (costUsd !== null && shippingUsd !== null && !('supplier_cost_price' in body)) {
    payload.supplier_cost_price = Math.round((costUsd + shippingUsd) * EXCHANGE_RATE);
  }

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('product_admin_data')
    .upsert(payload, { onConflict: 'product_slug' })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { slug } = await params;
  const supabase = getSupabase();
  const { error } = await supabase
    .from('product_admin_data')
    .upsert({ product_slug: slug, hidden: true }, { onConflict: 'product_slug' });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
