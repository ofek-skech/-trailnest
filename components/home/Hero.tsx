import Link from 'next/link';

const categories = [
  { icon: '⛺', label: 'קמפינג',    href: '/shop/camping' },
  { icon: '🔥', label: 'בישול שטח', href: '/shop/camp-kitchen' },
  { icon: '🚙', label: 'ציוד שטח',  href: '/shop/vehicle-gear' },
  { icon: '💡', label: 'תאורה',     href: '/shop/lighting-power' },
  { icon: '🛏️', label: 'שינה',      href: '/shop/sleeping' },
  { icon: '🏷️', label: 'מבצעים',    href: '/shop/sale', hot: true },
] as const;

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

      {/* Light warm overlay — 40%+ less dark than before */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top, rgba(18,9,2,0.52) 0%, rgba(14,7,1,0.22) 45%, rgba(10,5,0,0.06) 72%, transparent 100%)',
            'linear-gradient(to left,  rgba(14,7,1,0.18) 0%, transparent 52%)',
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
        style={{ paddingTop: 'clamp(260px, 32vh, 400px)', paddingBottom: 'clamp(96px, 13vh, 160px)' }}
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

          {/* Headline — new text */}
          <h1
            className="text-white font-black leading-[1.04] mb-4"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 28px rgba(0,0,0,0.35)',
            }}
          >
            כל מה שצריך לשטח
            <br />
            <span style={{ color: '#E8940A' }}>במקום אחד</span>
          </h1>

          {/* Sub-headline — character line */}
          <p
            className="leading-relaxed mb-8"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
              maxWidth: '430px',
              color: 'rgba(255,255,255,0.72)',
              textShadow: '0 1px 10px rgba(0,0,0,0.3)',
            }}
          >
            אביזרי שטח וקמפינג לאנשים שאוהבים לצאת מהשביל — לנגב, לגליל, לגולן.
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
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.07)' }}
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-stretch overflow-x-auto" style={{ scrollbarWidth: 'none' }} aria-label="קטגוריות">
            {categories.map(cat => (
              <Link
                key={cat.label}
                href={cat.href}
                className="relative flex flex-col items-center justify-center gap-1.5 px-5 py-3.5 min-w-[88px] flex-1 group transition-colors hover:bg-[#FDF8F2]"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {'hot' in cat && cat.hot && (
                  <span
                    className="absolute top-2 left-2 text-[8px] font-black text-white px-1.5 py-0.5 rounded-full leading-none"
                    style={{ background: '#C0392B' }}
                  >
                    HOT
                  </span>
                )}
                <span className="text-[20px] leading-none">{cat.icon}</span>
                <span className="text-[11px] font-semibold text-[#333] group-hover:text-[#3C4A32] whitespace-nowrap transition-colors">
                  {cat.label}
                </span>
                <span
                  className="absolute bottom-0 inset-x-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
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
