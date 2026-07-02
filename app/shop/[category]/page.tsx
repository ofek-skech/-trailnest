import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { categories, getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return categories.map(c => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find(c => c.slug === category);
  if (!cat) return {};
  return { title: `${cat.name} — CAMPIL`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find(c => c.slug === category);
  if (!cat) notFound();
  const prods = getProductsByCategory(category);

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F3' }}>
      {/* Hero */}
      <div className="text-white pt-[152px] pb-12 lg:pt-[168px] lg:pb-16" style={{ background: '#1E2020' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">בית</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <Link href="/shop" className="hover:text-white transition-colors">חנות</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">{cat.name}</span>
          </nav>
          <div className="max-w-xl">
            <p className="overline mb-3" style={{ color: '#D4830A' }}>{prods.length} מוצרים</p>
            <h1 className="heading-lg text-white mb-4">{cat.name}</h1>
            <p className="text-white/70 leading-relaxed">{cat.description}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        {prods.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#888] mb-4">אין מוצרים בקטגוריה זו עדיין.</p>
            <Link href="/shop" className="px-6 py-3 bg-tn-600 text-white font-bold text-sm rounded-xl hover:bg-tn-800 transition-colors inline-flex">לכל המוצרים</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {prods.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>

      {/* Other categories */}
      <div className="bg-[#F8F7F3] border-t border-[#E4DDD2] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-[#888] uppercase tracking-wider mb-5">קטגוריות נוספות</p>
          <div className="flex flex-wrap gap-3">
            {categories.filter(c => c.slug !== category).map(c => (
              <Link key={c.slug} href={`/shop/${c.slug}`}
                className="px-4 py-2 border border-[#E4DDD2] bg-white rounded-xl text-sm font-semibold text-[#555] hover:border-tn-600 hover:text-tn-600 transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
