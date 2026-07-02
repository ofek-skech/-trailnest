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
    <section className="relative overflow-hidden" aria-label="CAMPIL — ציוד לכל הרפתקאה">

      {/* ── Background image ── */}
      <img
        src="/images/hero-overlanding.jpg"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ height: 'calc(100% + 40px)', top: '-20px' }}
      />

      {/* ── Lighter warm overlay — shows the photo more clearly ── */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top, rgba(12,22,8,0.80) 0%, rgba(10,18,6,0.46) 40%, rgba(10,18,6,0.18) 70%, transparent 100%)',
            'linear-gradient(to left, rgba(10,16,6,0.36) 0%, transparent 60%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Sunset glow at bottom-right (4x4/campfire area) */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 80% 85%, rgba(212,131,10,0.20) 0%, transparent 55%)' }}
        aria-hidden="true"
      />

      {/* ── Hero content ── */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8"
        style={{ paddingTop: 'clamp(140px, 20vh, 220px)', paddingBottom: 'clamp(100px, 14vh, 160px)' }}
      >
        {/* Content sits on the RIGHT in RTL (= logical start) */}
        <div className="max-w-[560px] ml-auto" dir="rtl">

          {/* Overline */}
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px block flex-shrink-0" style={{ background: 'rgba(212,131,10,0.75)' }} aria-hidden="true" />
            <p
              className="text-[10.5px] font-black uppercase tracking-[0.26em]"
              style={{ color: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
            >
              GEAR FOR EVERY ADVENTURE
            </p>
          </div>

          {/* Headline */}
          <h1
            className="text-white font-black leading-[1.04] mb-5"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            ציוד קמפינג<br />
            <span style={{ color: '#E8940A' }}>לכל שטח ולכל עונה</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-white/65 leading-relaxed mb-8"
            style={{
              fontFamily: 'Nunito Sans, sans-serif',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              maxWidth: '400px',
            }}
          >
            ציוד פרמיום לקמפינג, שטח וסיורי 4×4 — לנגב, לגליל, לגולן.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href="/shop"
              className="hero-cta-primary inline-flex items-center gap-2 px-7 rounded-2xl text-white font-bold text-[0.9rem] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_28px_rgba(212,131,10,0.55)]"
              style={{ fontFamily: 'Rubik, sans-serif', paddingTop: '13px', paddingBottom: '13px', boxShadow: '0 4px 20px rgba(212,131,10,0.38)' }}
            >
              לכל הציוד
              {/* chevron-left for RTL "go" direction */}
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>

            <Link
              href="/shop/sale"
              className="inline-flex items-center gap-2 px-7 rounded-2xl font-bold text-[0.9rem] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: 'Rubik, sans-serif',
                paddingTop: '13px',
                paddingBottom: '13px',
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.28)',
                color: 'rgba(255,255,255,0.88)',
              }}
            >
              מבצעים
            </Link>
          </div>

        </div>
      </div>

      {/* ── Category quick-strip at bottom of hero ── */}
      <div
        className="relative z-20"
        style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="flex items-stretch overflow-x-auto"
            dir="rtl"
            style={{ scrollbarWidth: 'none' }}
            aria-label="קטגוריות"
          >
            {categories.map(cat => (
              <Link
                key={cat.label}
                href={cat.href}
                className="relative flex flex-col items-center justify-center gap-1.5 px-5 py-3.5 min-w-[90px] flex-1 group transition-colors hover:bg-[#F4EEE4]"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {'hot' in cat && cat.hot && (
                  <span
                    className="absolute top-2 left-2 text-[8.5px] font-bold text-white px-1.5 py-0.5 rounded-full leading-none"
                    style={{ background: '#C0392B' }}
                    aria-label="מבצע"
                  >
                    HOT
                  </span>
                )}
                <span className="text-[20px] leading-none">{cat.icon}</span>
                <span className="text-[11px] font-semibold text-[#333] group-hover:text-[#3C4A32] whitespace-nowrap transition-colors">
                  {cat.label}
                </span>
                {/* Active indicator bar */}
                <span
                  className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center"
                  style={{ background: '#3C4A32' }}
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
