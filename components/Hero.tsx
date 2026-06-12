'use client';

import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero – CampNation premium outdoor gear"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800" aria-hidden="true" />

      {/* Mountain silhouette */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 400 L0 250 L180 80 L360 200 L500 60 L640 180 L720 30 L800 160 L940 70 L1080 200 L1200 100 L1380 220 L1440 180 L1440 400 Z" fill="#0d2b17" opacity="0.8" />
          <path d="M0 400 L0 300 L120 160 L280 280 L420 150 L560 260 L680 140 L800 230 L960 120 L1100 240 L1280 160 L1440 260 L1440 400 Z" fill="#0f2219" opacity="0.9" />
          <path d="M0 400 L0 340 L200 220 L400 320 L600 200 L760 300 L900 180 L1100 290 L1300 200 L1440 300 L1440 400 Z" fill="#102418" />
        </svg>
      </div>

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width:   Math.random() < 0.3 ? '2px' : '1px',
              height:  Math.random() < 0.3 ? '2px' : '1px',
              top:    `${Math.random() * 70}%`,
              left:   `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Glow effect */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ea580c 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ember-600/15 border border-ember-600/30 mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-500 animate-pulse" aria-hidden="true" />
            <span className="text-ember-400 text-xs font-semibold tracking-wider uppercase">
              New 2026 Collection Available
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-stone-50 leading-none tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s', fontFamily: 'Rubik, sans-serif' }}
          >
            Gear Up
            <br />
            <span className="gradient-text">for the Unknown.</span>
          </h1>

          {/* Sub-heading */}
          <p
            className="text-lg sm:text-xl text-stone-400 max-w-xl leading-relaxed mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Premium camping and outdoor equipment trusted by serious adventurers.
            Built to perform where it counts — so you can push further.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-12 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-ember-600 hover:bg-ember-500 active:bg-ember-700 text-white font-bold text-base rounded-2xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:-translate-y-0.5"
            >
              Shop All Gear
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <Link
              href="/shop/shelter-sleep"
              className="inline-flex items-center justify-center px-7 py-4 border border-forest-600 hover:border-forest-400 text-stone-300 hover:text-stone-50 font-semibold text-base rounded-2xl transition-all duration-200 hover:bg-forest-800/60"
            >
              Explore Categories
            </Link>
          </div>

          {/* Trust signals */}
          <div
            className="flex flex-wrap gap-4 sm:gap-6 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {[
              { icon: Truck,  text: 'Free shipping over $75' },
              { icon: Shield, text: 'Lifetime warranty' },
              { icon: Star,   text: '50,000+ happy adventurers' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-stone-500 text-sm">
                <Icon className="w-4 h-4 text-ember-500 flex-shrink-0" aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-50"
        aria-hidden="true"
      >
        <span className="text-xs text-stone-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone-500 to-transparent" />
      </div>
    </section>
  );
}
