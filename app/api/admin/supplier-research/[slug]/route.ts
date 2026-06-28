import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/admin-auth';
import { getSupabase } from '@/lib/supabase-server';

type Params = Promise<{ slug: string }>;

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    await requireAdminSession();
    const { slug } = await params;
    const body = await req.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('supplier_research')
      .upsert({ ...body, product_slug: slug }, { onConflict: 'product_slug' })
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'שגיאה' }, { status: 500 });
  }
}
