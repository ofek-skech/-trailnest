import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', display: 'flex', alignItems: 'flex-end' }}
      aria-label="CAMPIL — Gear For Every Adventure"
    >
      {/* ── Background photo ─────────────────────────── */}
      <img
        src="/images/hero-overlanding.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        style={{ transform: 'scale(1.02)' }}
      />

      {/* ── Noise grain overlay ──────────────────────── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Cinematic gradient layers — brighter to show photography ── */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top,    rgba(8,20,12,0.78) 0%, rgba(8,20,12,0.38) 45%, rgba(8,20,12,0.06) 78%, transparent 100%)',
            'linear-gradient(to left,   rgba(8,20,12,0.42) 0%, rgba(8,20,12,0.10) 52%, transparent 82%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 lg:pb-24 pt-56 lg:pt-72">
        <div className="max-w-[620px] ml-auto" dir="rtl">

          {/* Brand overline */}
          <div
            className="flex items-center gap-3 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <span className="inline-block w-10 h-px" style={{ background: 'rgba(212,131,10,0.7)' }} aria-hidden="true" />
            <p
              className="overline"
              style={{ letterSpacing: '0.26em', fontSize: '0.68rem', color: 'rgba(212,131,10,0.85)' }}
            >
              GEAR FOR EVERY ADVENTURE
            </p>
          </div>

          {/* Headline — bigger, more commanding */}
          <h1
            className="font-black text-white mb-6 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(3rem, 7vw, 5.8rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              animationDelay: '80ms',
              textShadow: '0 2px 20px rgba(0,0,0,0.25)',
            }}
          >
            הציוד שאתם
            <br />
            <span style={{ color: '#E8940A' }}>באמת צריכים</span>
          </h1>

          {/* Sub */}
          <p
            className="text-white/65 leading-relaxed mb-11 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(0.95rem, 1.9vw, 1.1rem)',
              maxWidth: '420px',
              animationDelay: '160ms',
            }}
          >
            ציוד קמפינג, אוברלנדינג וטיולי 4×4 שנבחר על ידי אנשים שחיים את השטח — לנגב, לגליל, לגולן.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-14 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <Link
              href="/shop"
              className="hero-cta-primary group inline-flex items-center justify-center gap-2.5 px-8 py-4.5 font-black text-sm rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ fontFamily: 'Rubik, sans-serif', paddingTop: '14px', paddingBottom: '14px', fontSize: '0.925rem' }}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
              לכל הציוד
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/22 hover:border-white/50 text-white/85 hover:text-white font-semibold text-sm rounded-2xl transition-all duration-200 backdrop-blur-sm hover:bg-white/8"
              style={{ fontFamily: 'Rubik, sans-serif', paddingTop: '14px', paddingBottom: '14px', fontSize: '0.925rem' }}
            >
              הסיפור שלנו
            </Link>
          </div>

          {/* Trust row */}
          <div
            className="flex items-center justify-end gap-0 animate-fade-in-up"
            style={{ animationDelay: '360ms' }}
            dir="rtl"
          >
            {[
              'משלוח מהיר',
              'החזרה תוך 30 יום',
              'שירות בעברית',
            ].map((text, i) => (
              <span key={text} className="flex items-center gap-0">
                <span
                  className="text-white/50 text-[11.5px] font-semibold"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {text}
                </span>
                {i < 2 && (
                  <span className="mx-3.5 text-white/25 text-xs select-none" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div
        className="animate-float absolute bottom-6"
        style={{ left: '50%' }}
        aria-hidden="true"
      >
        <div
          className="flex flex-col items-center gap-1.5 opacity-20"
        >
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
          <div className="w-1 h-1 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
