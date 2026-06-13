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
  return { title: `${cat.name} — Shop CampIL`, description: cat.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = categories.find(c => c.slug === category);
  if (!cat) notFound();
  const prods = getProductsByCategory(category);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-white/60 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-white font-semibold" aria-current="page">{cat.name}</span>
          </nav>
          <div className="max-w-xl">
            <p className="overline text-sand-400 mb-3">{prods.length} Product{prods.length !== 1 ? 's' : ''}</p>
            <h1 className="heading-lg text-white mb-4">{cat.name}</h1>
            <p className="text-white/70 leading-relaxed">{cat.description}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        {prods.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#888] mb-4">No products in this category yet.</p>
            <Link href="/shop" className="px-6 py-3 bg-tn-600 text-white font-bold text-sm rounded-xl hover:bg-tn-800 transition-colors inline-flex">Browse all products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {prods.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>

      {/* Other categories */}
      <div className="bg-[#F8F5F0] border-t border-[#E5DDD0] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-[#888] uppercase tracking-wider mb-5">Other Categories</p>
          <div className="flex flex-wrap gap-3">
            {categories.filter(c => c.slug !== category).map(c => (
              <Link key={c.slug} href={`/shop/${c.slug}`}
                className="px-4 py-2 border border-[#E5DDD0] bg-white rounded-xl text-sm font-semibold text-[#555] hover:border-tn-600 hover:text-tn-600 transition-colors">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
