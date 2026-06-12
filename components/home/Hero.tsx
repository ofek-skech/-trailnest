import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="TrailNest hero">

      {/* ── Cinematic background ─────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80&fit=crop')",
          backgroundColor: '#0c1a0e',
        }}
        aria-hidden="true"
      />

      {/* Multi-layer cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(0,0,0,0.5), transparent)' }}
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-44 pb-28 lg:pt-52 lg:pb-36">
        <div className="max-w-[620px]">

          {/* Overline */}
          <p
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-sand-400/75 mb-5 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            Overlanding · Camping · 4×4
          </p>

          {/* Heading */}
          <h1
            className="text-white font-black leading-[1.05] mb-6 animate-fade-in-up"
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
              animationDelay: '130ms',
            }}
          >
            Go Further.<br />
            <span className="text-sand-400">Stay Longer.</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-md animate-fade-in-up"
            style={{ animationDelay: '260ms' }}
          >
            Premium gear built for the trail. Every product tested where it matters — on the road less travelled.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
            style={{ animationDelay: '390ms' }}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-sand-500 hover:bg-sand-400 text-tn-950 font-black text-xs sm:text-sm uppercase tracking-[0.12em] rounded-xl transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_40px_rgba(214,194,161,0.4)]"
            >
              Shop the Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/22 hover:border-white/50 text-white font-semibold text-xs sm:text-sm uppercase tracking-[0.12em] rounded-xl transition-all duration-200 backdrop-blur-sm hover:bg-white/5"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-35" aria-hidden="true">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/45 to-transparent" />
      </div>
    </section>
  );
}
