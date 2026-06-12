import Link from 'next/link';
import { Tent, Shirt, Flame, Compass, ArrowRight } from 'lucide-react';
import { categories } from '@/lib/products';

const iconMap: Record<string, React.ElementType> = {
  tent:    Tent,
  shirt:   Shirt,
  flame:   Flame,
  compass: Compass,
};

const bgGradients = [
  'from-forest-800 to-forest-700',
  'from-stone-800/70 to-stone-700/50',
  'from-ember-900/40 to-forest-800',
  'from-forest-700 to-forest-800',
];

export default function FeaturedCategories() {
  return (
    <section className="section-padding" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-ember-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Shop by Category
            </p>
            <h2
              id="categories-heading"
              className="text-3xl sm:text-4xl font-bold text-stone-50"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              Find Your Gear
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-ember-500 hover:text-ember-400 transition-colors group"
          >
            All categories
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] ?? Tent;
            return (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradients[idx]} border border-forest-600/40 hover:border-ember-600/40 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:-translate-y-1 p-6 min-h-[180px] flex flex-col justify-between`}
              >
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-xl bg-forest-600/40 group-hover:bg-ember-600/20 flex items-center justify-center transition-colors duration-200"
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6 text-forest-200 group-hover:text-ember-400 transition-colors duration-200" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs text-stone-500">{cat.productCount} items</span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg font-bold text-stone-50 mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>
                    {cat.name}
                  </h3>
                  <p className="text-sm text-stone-400 line-clamp-2 leading-relaxed mb-3">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-ember-500 group-hover:text-ember-400 transition-colors">
                    Shop now
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </span>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(234,88,12,0.07) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
