export const dynamic = 'force-dynamic';

import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import { products } from '@/lib/products';
import { SupplierResearchRow } from '@/lib/supplier-research';
import ProductOptimizationClient from '@/components/admin/ProductOptimizationClient';

export default async function ProductOptimizationPage() {
  await getAdminUser();
  const supabase = getSupabase();

  const { data: researchData } = await supabase
    .from('supplier_research')
    .select('*')
    .order('product_slug');

  const researchMap = new Map<string, SupplierResearchRow>();
  for (const row of (researchData ?? []) as SupplierResearchRow[]) {
    researchMap.set(row.product_slug, row);
  }

  const enriched = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    image: p.image,
    research: researchMap.get(p.slug) ?? null,
  }));

  return (
    <div className="p-5 lg:p-8" dir="rtl">
      <ProductOptimizationClient products={enriched} />
    </div>
  );
}
