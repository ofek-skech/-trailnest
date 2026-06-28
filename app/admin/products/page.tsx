import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import { products, categories } from '@/lib/products';
import { mergeProduct } from '@/lib/admin-products';
import type { ProductAdminData, Supplier } from '@/lib/admin-products';
import AdminProductListClient from '@/components/admin/AdminProductListClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'מוצרים | CampIL Admin' };

export default async function ProductsPage() {
  await getAdminUser();

  const supabase = getSupabase();
  const [{ data: adminData }, { data: suppliersData }] = await Promise.all([
    supabase.from('product_admin_data').select('*'),
    supabase.from('suppliers').select('*').order('name'),
  ]);

  const dbMap = new Map<string, ProductAdminData>();
  for (const row of (adminData ?? []) as ProductAdminData[]) {
    dbMap.set(row.product_slug, row);
  }

  const suppliers: Supplier[] = (suppliersData ?? []) as Supplier[];
  const merged = products.map(p => mergeProduct(p, dbMap.get(p.slug) ?? null, suppliers));

  return (
    <div className="p-5 lg:p-8" dir="rtl">
      <AdminProductListClient
        products={merged}
        categories={categories}
        suppliers={suppliers}
      />
    </div>
  );
}
