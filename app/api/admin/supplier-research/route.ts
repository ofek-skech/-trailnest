import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabase } from '@/lib/supabase-server';

export async function GET() {
  try {
    await requireAdminSession();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('supplier_research')
      .select('*')
      .order('product_slug');
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאה' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdminSession();
    const body = await req.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('supplier_research')
      .upsert(body, { onConflict: 'product_slug' })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאה' }, { status: 500 });
  }
}
