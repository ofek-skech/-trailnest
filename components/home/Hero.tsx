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
      aria-label="CampIL — ציוד שטח ישראלי"
    >
      {/* ── Cinematic 4x4 overlanding background ─── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1533282960533-51328aa49826?w=1920&q=85&fit=crop')",
          backgroundColor: '#0a0e0d',
        }}
        aria-hidden="true"
      />

      {/* Gradient overlays — single, clean, no duplication */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to left, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Hero content — single layer, RTL, right-aligned ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 lg:pt-52 lg:pb-32">
        <div className="max-w-[620px] ml-auto" dir="rtl">

          {/* Overline */}
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-sand-400/80 mb-5 animate-fade-in-up"
            style={{ animationDelay: '0ms', fontFamily: 'Rubik, sans-serif' }}
          >
            קמפינג · אוברלנדינג · 4×4
          </p>

          {/* Headline — single, clear, no duplication */}
          <h1
            className="font-black text-white leading-[1.06] mb-5 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 4.75rem)',
              animationDelay: '120ms',
            }}
          >
            הציוד שאתם באמת
            <br />
            <span className="text-sand-400">צריכים לשטח</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-white/65 leading-relaxed mb-9 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              animationDelay: '240ms',
              maxWidth: '480px',
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
              className="inline-flex items-center justify-center px-7 py-3.5 border border-white/25 hover:border-white/50 text-white/90 font-semibold text-sm rounded-xl transition-all duration-200 backdrop-blur-sm hover:bg-white/8"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              הסיפור שלנו
            </Link>
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sand-500 hover:bg-sand-400 text-tn-950 font-black text-sm rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(214,194,161,0.45)]"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
              לכל הציוד
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="flex items-center justify-end gap-5 pt-7 border-t border-white/12 animate-fade-in-up"
            style={{ animationDelay: '480ms' }}
          >
            {trustBadges.map(({ emoji, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-white/60 text-xs font-semibold"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <span className="text-sm">{emoji}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-float"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
