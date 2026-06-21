import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getBestSellers, products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function BestSellers() {
  const featured = getBestSellers().length >= 4 ? getBestSellers().slice(0, 4) : products.slice(0, 4);

  return (
    <section
      className="section-py"
      style={{ background: '#F8F7F3' }}
      aria-labelledby="bestsellers-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Section header ──────────────────────────── */}
        <div className="flex items-end justify-between mb-10 lg:mb-12" dir="rtl">
          <div>
            <p className="overline text-tn-500 mb-2.5">
              הציוד המוביל שלנו
            </p>
            <h2
              id="bestsellers-heading"
              className="heading-md text-[#111]"
            >
              נבחן בשטח, מוכח בפועל
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#555] hover:text-tn-600 group transition-colors flex-shrink-0"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            לכל הציוד
          </Link>
        </div>

        {/* ── Product grid ────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>

        {/* ── Mobile CTA ──────────────────────────────── */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-2xl transition-all duration-200"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            לכל הציוד
          </Link>
        </div>
      </div>
    </section>
  );
}
