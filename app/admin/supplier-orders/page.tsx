import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import { isEmailConfigured } from '@/lib/email';
import SupplierOrdersClient from '@/components/admin/SupplierOrdersClient';
import type { SupplierOrder } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'הזמנות ספק | CampIL Admin' };

export interface SupplierOrderRow extends SupplierOrder {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  order_created_at: string;
}

export default async function SupplierOrdersPage() {
  await getAdminUser();

  const supabase = getSupabase();
  const [{ data: supplierOrders }, { data: orders }] = await Promise.all([
    supabase.from('supplier_orders').select('*').order('created_at', { ascending: false }),
    supabase.from('orders').select('order_id, customer_name, email, phone, created_at').eq('payment_status', 'paid'),
  ]);

  const orderMap = new Map<string, { customer_name: string; email: string; phone: string; created_at: string }>();
  for (const o of orders ?? []) orderMap.set(o.order_id, o);

  const rows: SupplierOrderRow[] = (supplierOrders ?? []).map(so => {
    const o = orderMap.get(so.campil_order_id);
    return {
      ...so,
      customer_name:   o?.customer_name ?? '—',
      customer_email:  o?.email         ?? '—',
      customer_phone:  o?.phone         ?? '—',
      order_created_at: o?.created_at   ?? '',
    };
  });

  const emailConfigured = isEmailConfigured();

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      <SupplierOrdersClient initialOrders={rows} emailConfigured={emailConfigured} />
    </div>
  );
}
