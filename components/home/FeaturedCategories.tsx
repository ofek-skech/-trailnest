import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { categories } from '@/lib/products';

const categoryData: Record<string, {
  label: string;
  he: string;
  desc: string;
  image: string;
}> = {
  'camp-kitchen': {
    label: 'מטבח שטח',
    he:    'קפה ובישול שטח',
    desc:  'קפה נייד, מבשלי שטח וציוד בישול מקצועי — אוכל אמיתי בלב הטבע',
    image: '/images/family-camping.jpg',
  },
  'camping': {
    label: 'ציוד מחנאות',
    he:    'קמפינג וציוד שטח',
    desc:  'אוהלים, כיסאות, שולחנות וכל הציוד הבסיסי לקמפינג ישראלי',
    image: '/images/desert-tent.jpg',
  },
  'vehicle-gear': {
    label: 'אוברלנדינג ו-4×4',
    he:    'ציוד לרכבי שטח',
    desc:  'ג׳ימני, היילוקס, ג׳יפ ואיסוזו — כל מה שצריך לדרכים הבלתי סלולות',
    image: '/images/hero-overlanding.jpg',
  },
  'lighting-power': {
    label: 'תאורה וטעינה',
    he:    'תאורה וחשמל',
    desc:  'פנסים, מנורות מחנה, לוחות סולאריים ומטענים ניידים לשטח',
    image: '/images/campfire-stars.jpg',
  },
  'sleeping': {
    label: 'שינה ומנוחה',
    he:    'קמפינג ושינה',
    desc:  'ערסלים, שקי שינה ואוהלים — נוחות מקסימלית בכל שטח',
    image: '/images/tent-stars.jpg',
  },
};

const CARD_RADIUS = '20px';

/* Shared gradient configs — stronger bottom for readability */
const GRADIENT_HERO = [
  'rgba(8,20,12,0.94) 0%',
  'rgba(8,20,12,0.68) 35%',
  'rgba(8,20,12,0.28) 62%',
  'rgba(8,20,12,0.06) 88%',
  'transparent 100%',
].join(', ');

const GRADIENT_SMALL = [
  'rgba(8,20,12,0.96) 0%',
  'rgba(8,20,12,0.72) 42%',
  'rgba(8,20,12,0.24) 68%',
  'transparent 100%',
].join(', ');

const GRADIENT_MOBILE = [
  'rgba(8,20,12,0.93) 0%',
  'rgba(8,20,12,0.60) 45%',
  'rgba(8,20,12,0.15) 72%',
  'transparent 100%',
].join(', ');

const textShadow = '0 1px 10px rgba(0,0,0,0.55)';

export default function FeaturedCategories() {
  const cats = categories
    .map(cat => ({ ...cat, extra: categoryData[cat.slug] }))
    .filter(c => c.extra)
    .slice(0, 3);

  const [first, ...rest] = cats;

  return (
    <section className="section-py bg-white" aria-labelledby="categories-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* ── Section header ─────────────────────────── */}
        <div className="flex items-end justify-between mb-10 lg:mb-12" dir="rtl">
          <div>
            <p className="overline mb-2.5" style={{ color: '#D4830A' }}>קטגוריות מובילות</p>
            <h2
              id="categories-heading"
              className="heading-md text-[#111]"
            >
              ציוד שנבחר לשטח הישראלי
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-[#555] hover:text-tn-600 transition-colors group flex-shrink-0"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            כל הציוד
          </Link>
        </div>

        {/* ── Desktop grid: 2fr / 1fr, hero card spans 2 rows ── */}
        <div
          className="hidden lg:grid gap-3"
          style={{ gridTemplateColumns: '2fr 1fr', gridTemplateRows: '1fr 1fr' }}
        >
          {/* ── Hero card (large, left column) ──────── */}
          {first && (
            <Link
              href={`/shop/${first.slug}`}
              className="row-span-2 group relative overflow-hidden block focus-visible:ring-2 focus-visible:ring-tn-600"
              style={{ minHeight: '520px', borderRadius: CARD_RADIUS }}
              aria-label={first.extra.he}
            >
              <img
                src={first.extra.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />

              {/* Strong gradient for readability */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${GRADIENT_HERO})` }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-10 lg:p-11" dir="rtl">

                {/* Category label */}
                <p
                  className="overline mb-3 transition-transform duration-400 group-hover:-translate-y-0.5"
                  style={{ color: '#D8C8A8', opacity: 0.75, textShadow }}
                >
                  {first.extra.label}
                </p>

                {/* Title */}
                <h3
                  className="text-white font-black leading-tight mb-3 transition-transform duration-400 group-hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: 'clamp(1.8rem, 2.6vw, 2.4rem)',
                    letterSpacing: '-0.025em',
                    textShadow,
                  }}
                >
                  {first.extra.he}
                </h3>

                {/* Description — always visible */}
                <p
                  className="text-white/75 text-sm leading-relaxed mb-5 max-w-[340px] transition-transform duration-400 group-hover:-translate-y-0.5"
                  style={{ fontFamily: 'Rubik, sans-serif', textShadow }}
                >
                  {first.extra.desc}
                </p>

                {/* CTA — always visible, brighter on hover */}
                <div
                  className="flex items-center gap-2 text-sm font-bold transition-all duration-300"
                  style={{ color: '#D8C8A8' }}
                  dir="rtl"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                  <span>לצפייה בקטגוריה</span>
                </div>
              </div>
            </Link>
          )}

          {/* ── Two smaller cards (right column) ─────── */}
          {rest.map(cat => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="group relative overflow-hidden block focus-visible:ring-2 focus-visible:ring-tn-600"
              style={{ aspectRatio: '16/9', borderRadius: CARD_RADIUS }}
              aria-label={cat.extra.he}
            >
              <img
                src={cat.extra.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${GRADIENT_SMALL})` }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-7" dir="rtl">

                {/* Category label */}
                <p
                  className="overline mb-2 text-[9.5px] transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ color: '#D8C8A8', opacity: 0.70, textShadow }}
                >
                  {cat.extra.label}
                </p>

                {/* Title */}
                <h3
                  className="font-black text-white leading-tight mb-2 transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '1.15rem',
                    letterSpacing: '-0.018em',
                    textShadow,
                  }}
                >
                  {cat.extra.he}
                </h3>

                {/* Description — always visible */}
                <p
                  className="text-white/70 text-xs leading-relaxed mb-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
                  style={{ fontFamily: 'Rubik, sans-serif', textShadow, maxWidth: '280px' }}
                >
                  {cat.extra.desc}
                </p>

                {/* CTA */}
                <div
                  className="flex items-center gap-1.5 text-xs font-bold transition-all duration-300"
                  style={{ color: '#D8C8A8' }}
                  dir="rtl"
                >
                  <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                  <span>לצפייה בקטגוריה</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Mobile stacked layout ─────────────────── */}
        <div className="lg:hidden flex flex-col gap-3">
          {cats.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="relative overflow-hidden block active:scale-[0.99] transition-transform"
              style={{ aspectRatio: i === 0 ? '4/3' : '16/9', borderRadius: '16px' }}
              aria-label={cat.extra.he}
            >
              <img
                src={cat.extra.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${GRADIENT_MOBILE})` }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5" dir="rtl">
                <p
                  className="overline mb-1.5 text-[9px]"
                  style={{ color: '#D8C8A8', opacity: 0.70, textShadow }}
                >
                  {cat.extra.label}
                </p>
                <h3
                  className="font-black text-white text-xl leading-snug mb-1.5"
                  style={{ fontFamily: 'Rubik, sans-serif', letterSpacing: '-0.018em', textShadow }}
                >
                  {cat.extra.he}
                </h3>
                <p
                  className="text-white/70 text-xs leading-snug mb-3"
                  style={{ fontFamily: 'Rubik, sans-serif', textShadow }}
                >
                  {cat.extra.desc}
                </p>
                <div
                  className="flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: '#D8C8A8' }}
                  dir="rtl"
                >
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                  <span>לצפייה בקטגוריה</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
