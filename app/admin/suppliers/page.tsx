import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import type { Supplier } from '@/lib/admin-products';
import SuppliersClient from '@/components/admin/SuppliersClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'ספקים | CampIL Admin' };

interface SupplierWithStats extends Supplier {
  product_count: number;
  total_inventory_value: number;
}

export default async function SuppliersPage() {
  await getAdminUser();

  const supabase = getSupabase();
  const [{ data: suppliersData }, { data: productsAdminData }] = await Promise.all([
    supabase.from('suppliers').select('*').order('name'),
    supabase
      .from('product_admin_data')
      .select('supplier_id, supplier_cost_price, price')
      .not('supplier_id', 'is', null),
  ]);

  const suppliers: Supplier[] = (suppliersData ?? []) as Supplier[];
  const adminRows = (productsAdminData ?? []) as Array<{
    supplier_id: string;
    supplier_cost_price: number | null;
    price: number | null;
  }>;

  const suppliersWithStats: SupplierWithStats[] = suppliers.map(s => {
    const rows = adminRows.filter(r => r.supplier_id === s.id);
    const totalValue = rows.reduce((sum, r) => sum + (r.supplier_cost_price ?? 0), 0);
    return { ...s, product_count: rows.length, total_inventory_value: totalValue };
  });

  return (
    <div className="p-5 lg:p-8" dir="rtl">
      <SuppliersClient initialSuppliers={suppliersWithStats} />
    </div>
  );
}
