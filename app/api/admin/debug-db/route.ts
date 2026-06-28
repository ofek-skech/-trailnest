import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const slug = req.nextUrl.searchParams.get('slug') ?? 'espresso-nayad';
  const supabase = getSupabase();

  // Fetch all queries in parallel
  const [
    suppliersRes,
    allSlugsRes,
    exactRowRes,
    suppliersListRes,
  ] = await Promise.all([
    supabase.from('suppliers').select('*', { count: 'exact' }),
    supabase.from('product_admin_data').select('product_slug, supplier_id, supplier_cost_usd').order('product_slug').limit(25),
    supabase.from('product_admin_data').select('*').eq('product_slug', slug).maybeSingle(),
    supabase.from('suppliers').select('id, name').order('name').limit(5),
  ]);

  const storedSlugs: string[] = (allSlugsRes.data ?? []).map(
    (r: { product_slug: string }) => r.product_slug
  );

  // Fuzzy match: find stored slugs closest to the queried slug
  const target = slug.toLowerCase();
  const closestMatches = storedSlugs
    .map(s => ({ slug: s, score: s.toLowerCase().includes(target) || target.includes(s.toLowerCase()) ? 1 : 0 }))
    .filter(x => x.score > 0)
    .map(x => x.slug);

  return NextResponse.json({
    slug_queried: slug,
    exact_match_found: exactRowRes.data !== null,
    exact_row: exactRowRes.data ?? null,
    exact_row_error: exactRowRes.error?.message ?? null,

    suppliers: {
      count: suppliersRes.data?.length ?? 0,
      error: suppliersRes.error?.message ?? null,
      sample_names: (suppliersListRes.data ?? []).map((s: { id: string; name: string }) => s.name),
    },

    product_admin_data: {
      total_rows_in_sample: allSlugsRes.data?.length ?? 0,
      error: allSlugsRes.error?.message ?? null,
      first_25_slugs: storedSlugs,
      rows_with_supplier_id: (allSlugsRes.data ?? [])
        .filter((r: { supplier_id: string | null }) => r.supplier_id !== null)
        .length,
      closest_match_to_queried_slug: closestMatches,
    },
  });
}
