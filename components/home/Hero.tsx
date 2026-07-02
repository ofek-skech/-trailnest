import Link from 'next/link';
import { Tent, Flame, Mountain, Zap, Moon, Tag, type LucideIcon } from 'lucide-react';

type Category = {
  Icon: LucideIcon;
  label: string;
  href: string;
  hot?: true;
};

const categories: Category[] = [
  { Icon: Tent,     label: 'קמפינג',    href: '/shop/camping' },
  { Icon: Flame,    label: 'בישול שטח', href: '/shop/camp-kitchen' },
  { Icon: Mountain, label: 'ציוד שטח',  href: '/shop/vehicle-gear' },
  { Icon: Zap,      label: 'תאורה',     href: '/shop/lighting-power' },
  { Icon: Moon,     label: 'שינה',      href: '/shop/sleeping' },
  { Icon: Tag,      label: 'מבצעים',    href: '/shop/sale', hot: true },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden" aria-label="ברוכים הבאים ל-CAMPIL">

      {/* Background — CSS-warmed for sunset atmosphere */}
      <img
        src="/images/hero-overlanding.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ filter: 'brightness(1.28) saturate(1.35) sepia(0.08)' }}
      />

      {/* Warm overlay — purposefully light, premium feel */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top, rgba(14,6,1,0.44) 0%, rgba(10,4,0,0.18) 42%, rgba(6,3,0,0.04) 68%, transparent 100%)',
            'linear-gradient(to left,  rgba(10,4,0,0.14) 0%, transparent 50%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Sunset amber glow — bottom right where the campfire/4x4 sits */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 78% 88%, rgba(212,131,10,0.26) 0%, transparent 52%)' }}
        aria-hidden="true"
      />

      {/* ── Hero content ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
        style={{ paddingTop: 'clamp(112px, 16vh, 200px)', paddingBottom: 'clamp(96px, 13vh, 160px)' }}
      >
        <div className="max-w-[580px] ml-auto" dir="rtl">

          {/* Overline */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px block flex-shrink-0" style={{ background: 'rgba(212,131,10,0.85)' }} aria-hidden="true" />
            <p
              className="text-[10.5px] font-black uppercase tracking-[0.26em]"
              style={{ color: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
            >
              GEAR FOR EVERY ADVENTURE
            </p>
          </div>

          {/* Headline */}
          <h1
            className="text-white font-black leading-[1.04] mb-4"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 24px rgba(0,0,0,0.32)',
            }}
          >
            כל מה שצריך לשטח
            <br />
            <span style={{ color: '#E8940A' }}>במקום אחד</span>
          </h1>

          {/* Sub-headline */}
          <p
            className="leading-relaxed mb-8"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: 'clamp(0.9rem, 1.7vw, 1rem)',
              maxWidth: '420px',
              color: 'rgba(255,255,255,0.78)',
              textShadow: '0 1px 8px rgba(0,0,0,0.28)',
            }}
          >
            ציוד קמפינג, אוברלנדינג ו-4X4 שנבחר בקפידה לאוהבי השטח.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 rounded-2xl text-white font-bold text-[0.9rem] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'Rubik, sans-serif',
                paddingTop: '14px', paddingBottom: '14px',
                background: '#D4830A',
                boxShadow: '0 4px 20px rgba(212,131,10,0.42)',
              }}
            >
              לכל הציוד
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>

            <Link
              href="/shop/sale"
              className="inline-flex items-center gap-2 px-7 rounded-2xl font-bold text-[0.9rem] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'Rubik, sans-serif',
                paddingTop: '14px', paddingBottom: '14px',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.30)',
                color: 'rgba(255,255,255,0.90)',
              }}
            >
              מבצעים
            </Link>
          </div>

        </div>
      </div>

      {/* ── Category quick-nav strip ── */}
      <div
        className="relative z-20"
        style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex items-stretch overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
            aria-label="קטגוריות"
          >
            {categories.map(({ Icon, label, href, hot }) => (
              <Link
                key={label}
                href={href}
                className="relative flex flex-col items-center justify-center gap-2 px-5 py-3.5 min-w-[80px] flex-1 group transition-colors hover:bg-[#FDF8F2]"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {hot && (
                  <span
                    className="absolute top-2 left-2 text-[7.5px] font-black text-white px-1.5 py-[3px] rounded-full leading-none tracking-wide"
                    style={{ background: '#C0392B' }}
                  >
                    SALE
                  </span>
                )}

                {/* Icon container */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(212,131,10,0.08)' }}
                >
                  <Icon
                    className="w-[17px] h-[17px] transition-colors duration-200"
                    style={{ color: '#B87209' }}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>

                <span
                  className="text-[11px] font-semibold whitespace-nowrap transition-colors duration-200"
                  style={{ color: '#444', letterSpacing: '-0.01em' }}
                >
                  {label}
                </span>

                {/* Active underline */}
                <span
                  className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
                  style={{ background: '#D4830A' }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
