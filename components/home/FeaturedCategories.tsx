import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/lib/products';

const categoryData: Record<string, {
  he: string; emoji: string; desc: string; image: string;
}> = {
  'vehicle-gear':         { he: 'ציוד לרכבי שטח',  emoji: '🚙', desc: 'Jimny · Jeep · Hilux',     image: '/images/hero-overlanding.jpg'  },
  'camp-kitchen':         { he: 'קפה ובישול שטח',  emoji: '☕', desc: 'מטבח שטח מקצועי',          image: '/images/family-camping.jpg'    },
  'lighting':             { he: 'תאורה',            emoji: '💡', desc: 'תאורת לילה ומחנה',          image: '/images/campfire-stars.jpg'    },
  'sleeping':             { he: 'קמפינג ושינה',     emoji: '🏕️', desc: 'אוהלים ושינת שטח',         image: '/images/tent-stars.jpg'        },
  'water-shower':         { he: 'מים ומקלחת',       emoji: '🚿', desc: 'ציוד מים לשטח',             image: '/images/desert-tent.jpg'       },
  'storage-organization': { he: 'אחסון וארגון',     emoji: '📦', desc: 'ארגון הרכב והמחנה',         image: '/images/camping-chairs.jpg'    },
};

export default function FeaturedCategories() {
  return (
    <section className="section-py" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8" dir="rtl">
          <div>
            <p className="overline text-tn-600 mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>
              קטגוריות ציוד
            </p>
            <h2 id="categories-heading" className="heading-md text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
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

        {/* Category grid — real photo cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {categories.map(cat => {
            const data = categoryData[cat.slug];
            if (!data) return null;
            return (
              <Link
                key={cat.id}
                href={`/shop/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden img-zoom focus-visible:ring-2 focus-visible:ring-tn-600"
                style={{ aspectRatio: '4/3' }}
              >
                {/* Real photo */}
                <img
                  src={data.image}
                  alt={data.he}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 group-hover:from-black/70 transition-all duration-300" />

                {/* Text */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5" dir="rtl">
                  <span className="text-xl mb-1.5" aria-hidden="true">{data.emoji}</span>
                  <p
                    className="font-black text-white leading-tight mb-0.5 text-sm sm:text-base"
                    style={{ fontFamily: 'Rubik, sans-serif' }}
                  >
                    {data.he}
                  </p>
                  <p className="text-white/55 text-xs" style={{ fontFamily: 'Rubik, sans-serif' }}>
                    {data.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
