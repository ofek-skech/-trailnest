import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-server';
import { requireAdminSession } from '@/lib/admin-auth';
import type { SupplierOrderStatus } from '@/lib/supabase-server';

const VALID_STATUSES: SupplierOrderStatus[] = ['ordered', 'in_transit', 'delivered', 'problem'];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { supplier_name, supplier_order_number, tracking_number, status, notes } = body;

  if (status && !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (supplier_name !== undefined)        updates.supplier_name = supplier_name?.trim() || null;
  if (supplier_order_number !== undefined) updates.supplier_order_number = supplier_order_number?.trim() || null;
  if (tracking_number !== undefined)      updates.tracking_number = tracking_number?.trim() || null;
  if (status !== undefined)               updates.status = status;
  if (notes !== undefined)                updates.notes = notes?.trim() || null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = getSupabase();
  const { data: updated, error } = await supabase
    .from('supplier_orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ order: updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireAdminSession();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const supabase = getSupabase();
  const { error } = await supabase.from('supplier_orders').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
