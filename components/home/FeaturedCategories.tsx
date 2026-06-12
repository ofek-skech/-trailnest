import Link from 'next/link';
import { Utensils, Zap, Truck, Moon, Droplets, Package, ArrowRight } from 'lucide-react';
import { categories } from '@/lib/products';

const iconMap: Record<string, React.ElementType> = {
  utensils: Utensils, zap: Zap, truck: Truck, moon: Moon, droplets: Droplets, package: Package,
};

export default function FeaturedCategories() {
  return (
    <section className="section-py" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="overline text-tn-600 mb-2">Shop by Category</p>
            <h2 id="categories-heading" className="heading-md text-[#111]">Find Your Gear</h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-tn-600 hover:text-tn-800 transition-colors group">
            All categories <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const Icon = iconMap[cat.icon] ?? Package;
            return (
              <Link key={cat.id} href={`/shop/${cat.slug}`}
                className="group flex flex-col items-center text-center p-5 bg-white border border-[#E5DDD0] rounded-2xl hover:border-tn-600/40 hover:bg-[#F8F5F0] hover:shadow-[0_4px_20px_rgba(31,58,46,0.08)] transition-all duration-200 hover:-translate-y-0.5">
                <div className="w-14 h-14 rounded-2xl bg-[#F8F5F0] group-hover:bg-tn-600/10 flex items-center justify-center mb-3 transition-colors" aria-hidden="true">
                  <Icon className="w-6 h-6 text-tn-600" strokeWidth={1.8} />
                </div>
                <p className="text-sm font-bold text-[#111] leading-tight mb-1">{cat.name}</p>
                <p className="text-xs text-[#888]">{cat.productCount} items</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
