import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const trustBadges = [
  { emoji: '🚚', text: 'משלוח מהיר' },
  { emoji: '🔒', text: 'תשלום מאובטח' },
  { emoji: '🏕️', text: 'ציוד שנבחר לשטח' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="CampIL"
    >
      {/* ── Real photo: 4x4 truck with rooftop tent at sunrise ── */}
      <img
        src="/images/hero-overlanding.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Single gradient overlay — no duplicate layers */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top,    rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.10) 100%)',
            'linear-gradient(to left,   rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.20) 55%, transparent 100%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Content — one text layer, RTL, right-aligned ────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20 lg:pt-52 lg:pb-28">
        <div className="max-w-[600px] ml-auto" dir="rtl">

          {/* Overline */}
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-sand-400/80 mb-5 animate-fade-in-up"
            style={{ animationDelay: '0ms', fontFamily: 'Rubik, sans-serif' }}
          >
            קמפינג · אוברלנדינג · 4×4
          </p>

          {/* Single clean headline — no duplicate, no forced break */}
          <h1
            className="font-black text-white leading-[1.06] mb-5 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
              animationDelay: '120ms',
            }}
          >
            הציוד שאתם באמת{' '}
            <span className="text-sand-400">צריכים לשטח</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-white/65 leading-relaxed mb-9 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              animationDelay: '240ms',
              maxWidth: '460px',
            }}
          >
            ציוד קמפינג, אוברלנדינג וטיולי 4X4 שנבחר על ידי אנשים שחיים את השטח.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-end justify-end gap-3 mb-10 animate-fade-in-up"
            style={{ animationDelay: '360ms' }}
          >
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/25 hover:border-white/55 text-white/90 font-semibold text-sm rounded-xl transition-all duration-200 backdrop-blur-sm hover:bg-white/8"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              הסיפור שלנו
            </Link>
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sand-500 hover:bg-sand-400 text-tn-950 font-black text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(214,194,161,0.5)]"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
              לכל הציוד
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex items-center justify-end gap-5 pt-6 border-t border-white/12 animate-fade-in-up"
            style={{ animationDelay: '480ms' }}
          >
            {trustBadges.map(({ emoji, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-white/60 text-[11px] font-semibold"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <span className="text-sm">{emoji}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 animate-float" aria-hidden="true">
        <div className="w-px h-10 bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
