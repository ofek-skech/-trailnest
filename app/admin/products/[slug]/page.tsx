import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import { products } from '@/lib/products';
import type { ProductAdminData, Supplier } from '@/lib/admin-products';
import { notFound } from 'next/navigation';
import ProductEditClient from '@/components/admin/ProductEditClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const p = products.find(x => x.slug === slug);
  return { title: p ? `עריכה: ${p.name} | CampIL Admin` : 'עריכת מוצר | CampIL Admin' };
}

export default async function ProductEditPage({ params }: PageProps) {
  await getAdminUser();
  const { slug } = await params;

  const base = products.find(p => p.slug === slug);
  if (!base) notFound();

  const supabase = getSupabase();
  const [
    { data: adminData, error: adminErr },
    { data: suppliersData, error: suppErr },
  ] = await Promise.all([
    supabase.from('product_admin_data').select('*').eq('product_slug', slug).maybeSingle(),
    supabase.from('suppliers').select('*').order('name'),
  ]);

  if (adminErr) console.error('[ProductEditPage] product_admin_data error:', adminErr.message);
  if (suppErr)  console.error('[ProductEditPage] suppliers error:', suppErr.message);

  return (
    <div className="p-5 lg:p-8" dir="rtl">
      {(adminErr || suppErr) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-mono">
          {adminErr && <div>DB error (product_admin_data): {adminErr.message}</div>}
          {suppErr  && <div>DB error (suppliers): {suppErr.message}</div>}
        </div>
      )}
      <ProductEditClient
        base={base}
        adminData={(adminData as ProductAdminData | null) ?? null}
        suppliers={(suppliersData ?? []) as Supplier[]}
      />
    </div>
  );
}
