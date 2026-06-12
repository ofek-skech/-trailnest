import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getBestSellers, products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function BestSellers() {
  const featured = getBestSellers().length >= 4 ? getBestSellers().slice(0,4) : products.slice(0,4);
  return (
    <section className="section-py bg-[#F8F5F0]" aria-labelledby="bestsellers-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="overline text-tn-600 mb-2">Proven on the Trail</p>
            <h2 id="bestsellers-heading" className="heading-md text-[#111]">Best Sellers</h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-tn-600 hover:text-tn-800 group transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 border border-[#E5DDD0] text-[#111] font-bold text-sm rounded-xl hover:border-tn-600 transition-colors">
            See all products <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
