import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = req.nextUrl.searchParams.get('slug') ?? 'espresso-nayad';
  const supabase = getSupabase();

  // 1. Get first 25 stored slugs to see what's actually in the table
  const { data: slugRows, error: slugErr } = await supabase
    .from('product_admin_data')
    .select('product_slug, supplier_id')
    .order('product_slug')
    .limit(25);

  // 2. Exact lookup for the queried slug
  const { data: exactRow, error: exactErr } = await supabase
    .from('product_admin_data')
    .select('product_slug, supplier_id, supplier_cost_usd, supplier_shipping_usd, supplier_cost_price')
    .eq('product_slug', slug)
    .maybeSingle();

  // 3. Supplier count
  const { data: allSuppliers, error: suppErr } = await supabase
    .from('suppliers')
    .select('id, name')
    .order('name')
    .limit(5);

  return NextResponse.json({
    slug_queried: slug,
    exact_match: exactRow,
    exact_error: exactErr?.message ?? null,
    slug_error: slugErr?.message ?? null,
    supplier_error: suppErr?.message ?? null,
    first_25_slugs: (slugRows ?? []).map((r) => ({
      slug: r.product_slug,
      has_supplier: r.supplier_id !== null,
    })),
    sample_suppliers: allSuppliers ?? [],
  });
}
