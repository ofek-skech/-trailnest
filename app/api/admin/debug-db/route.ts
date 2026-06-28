import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = req.nextUrl.searchParams.get('slug') ?? 'espresso-nayad';
  const supabase = getSupabase();

  const [
    { data: supplierCount, error: scErr },
    { data: padCount, error: padCountErr },
    { data: padRow, error: padErr },
    { data: suppliers, error: suppErr },
  ] = await Promise.all([
    supabase.from('suppliers').select('id', { count: 'exact', head: true }),
    supabase.from('product_admin_data').select('id', { count: 'exact', head: true }),
    supabase.from('product_admin_data').select('*').eq('product_slug', slug).maybeSingle(),
    supabase.from('suppliers').select('id, name').order('name').limit(5),
  ]);

  return NextResponse.json({
    slug_queried: slug,
    suppliers: {
      error: scErr?.message ?? null,
      count: (supplierCount as unknown as { count?: number })?.count ?? 0,
      sample: suppliers ?? [],
      sample_error: suppErr?.message ?? null,
    },
    product_admin_data: {
      error: padCountErr?.message ?? null,
      count: (padCount as unknown as { count?: number })?.count ?? 0,
      row_for_slug: padRow ?? null,
      row_error: padErr?.message ?? null,
    },
  });
}
