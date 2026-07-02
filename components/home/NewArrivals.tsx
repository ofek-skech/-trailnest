import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getBestSellers, products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function NewArrivals() {
  const bestSellerIds = new Set(getBestSellers().map(p => p.id));
  const newProducts = products.filter(p => !bestSellerIds.has(p.id)).slice(0, 4);

  if (newProducts.length === 0) return null;

  return (
    <section
      style={{ background: '#ffffff', paddingTop: '52px', paddingBottom: '64px' }}
      aria-labelledby="new-arrivals-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="flex items-end justify-between mb-8 lg:mb-10" dir="rtl">
          <div>
            <p
              className="text-[10.5px] font-black uppercase tracking-[0.22em] mb-2"
              style={{ color: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
            >
              חדש בחנות
            </p>
            <h2
              id="new-arrivals-heading"
              className="font-black text-[#111] leading-tight"
              style={{ fontFamily: 'Rubik, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}
            >
              מוצרים חדשים
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-[13px] font-bold text-[#666] hover:text-[#D4830A] group transition-colors flex-shrink-0"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            לכל הציוד
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {newProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-white font-bold text-sm rounded-2xl transition-all duration-200"
            style={{ background: '#D4830A', fontFamily: 'Rubik, sans-serif', boxShadow: '0 4px 16px rgba(212,131,10,0.35)' }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            לכל הציוד
          </Link>
        </div>
      </div>
    </section>
  );
}
