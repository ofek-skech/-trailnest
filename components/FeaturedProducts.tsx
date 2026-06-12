import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="section-padding bg-forest-950/60" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-ember-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Top Picks
            </p>
            <h2
              id="products-heading"
              className="text-3xl sm:text-4xl font-bold text-stone-50"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              Best-Selling Gear
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ember-500 hover:text-ember-400 transition-colors group"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Mobile view-all */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 border border-forest-600 text-stone-300 hover:text-stone-50 hover:border-forest-400 font-semibold text-sm rounded-xl transition-colors"
          >
            View all products
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
