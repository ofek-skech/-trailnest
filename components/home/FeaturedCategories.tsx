import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/lib/products';

const categoryData: Record<string, { he: string; emoji: string; desc: string }> = {
  'camp-kitchen':         { he: 'קפה ובישול שטח',  emoji: '☕', desc: 'מטבח שטח מקצועי' },
  'lighting':             { he: 'תאורה',            emoji: '💡', desc: 'תאורת שטח ולינה'  },
  'vehicle-gear':         { he: 'ציוד לרכבי שטח',  emoji: '🚙', desc: 'ציוד Jimny, Jeep ועוד' },
  'sleeping':             { he: 'קמפינג ושינה',     emoji: '🏕️', desc: 'לינה נוחה בשטח'  },
  'water-shower':         { he: 'מים ומקלחת',       emoji: '🚿', desc: 'מקלחות וציוד מים' },
  'storage-organization': { he: 'אחסון וארגון',     emoji: '📦', desc: 'ארגון הרכב והמחנה' },
};

export default function FeaturedCategories() {
  return (
    <section className="section-py" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10" dir="rtl">
          <div>
            <p
              className="overline text-tn-600 mb-2"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              קטגוריות ציוד
            </p>
            <h2
              id="categories-heading"
              className="heading-md text-[#111]"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              מה אתם מחפשים?
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-tn-600 hover:text-tn-800 transition-colors group flex-shrink-0"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            כל הציוד
          </Link>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
          {categories.map(cat => {
            const data = categoryData[cat.slug];
            if (!data) return null;
            return (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className="group flex flex-col items-center text-center p-5 bg-white border border-[#E5DDD0] rounded-2xl hover:border-tn-600/50 hover:shadow-[0_6px_24px_rgba(31,58,46,0.10)] transition-all duration-200 hover:-translate-y-0.5"
              >
                {/* Emoji icon */}
                <div className="w-14 h-14 rounded-2xl bg-[#F8F5F0] group-hover:bg-tn-600/8 flex items-center justify-center mb-3 transition-colors text-2xl" aria-hidden="true">
                  {data.emoji}
                </div>

                {/* Hebrew name */}
                <p
                  className="text-sm font-black text-[#111] leading-tight mb-0.5"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                  dir="rtl"
                >
                  {data.he}
                </p>

                {/* Hebrew description */}
                <p
                  className="text-[11px] text-[#999] leading-snug"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                  dir="rtl"
                >
                  {data.desc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
