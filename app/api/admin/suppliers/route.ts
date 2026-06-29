import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = getSupabase();

  // ?debug=1 returns product_admin_data slug sample to diagnose lookup failures
  if (req.nextUrl.searchParams.get('debug') === '1') {
    const slug = req.nextUrl.searchParams.get('slug') ?? 'espresso-nayad';
    const [slugsRes, exactRes] = await Promise.all([
      supabase.from('product_admin_data').select('product_slug, supplier_id').order('product_slug').limit(25),
      supabase.from('product_admin_data').select('product_slug, supplier_id, supplier_cost_usd').eq('product_slug', slug).maybeSingle(),
    ]);
    return NextResponse.json({
      queried_slug: slug,
      exact_row: exactRes.data,
      exact_error: exactRes.error?.message ?? null,
      first_25_slugs: (slugsRes.data ?? []).map((r) => r.product_slug),
      slugs_error: slugsRes.error?.message ?? null,
    });
  }

  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ suppliers: data ?? [] });
}

export async function POST(req: NextRequest) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, website, contact_email, notes } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: 'name is required' }, { status: 400 });

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('suppliers')
    .insert({
      name: name.trim(),
      website: website?.trim() || null,
      contact_email: contact_email?.trim() || null,
      notes: notes?.trim() || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ supplier: data }, { status: 201 });
}
