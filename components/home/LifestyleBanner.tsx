import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LifestyleBanner() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 'clamp(420px, 58vh, 640px)' }}
      aria-label="הסיפור שלנו"
    >
      {/* Background photo */}
      <img
        src="/images/campfire-stars.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />

      {/* Layered gradient — brighter to show stars/sky */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to top,    rgba(8,20,12,0.88) 0%, rgba(8,20,12,0.48) 45%, rgba(8,20,12,0.12) 100%)',
            'linear-gradient(to right,  rgba(8,20,12,0.50) 0%, rgba(8,20,12,0.10) 55%, transparent 100%)',
          ].join(', '),
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 lg:pb-20 w-full">
          <div className="max-w-[560px]" dir="rtl">

            {/* Overline */}
            <p
              className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 animate-fade-in-up"
              style={{ fontFamily: 'Rubik, sans-serif', animationDelay: '0ms', color: 'rgba(212,131,10,0.80)' }}
            >
              CAMPIL — הסיפור שלנו
            </p>

            {/* Headline */}
            <h2
              className="font-black text-white leading-[1.07] mb-5 animate-fade-in-up"
              style={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                letterSpacing: '-0.025em',
                animationDelay: '80ms',
              }}
            >
              ציוד שעובד
              <br />
              <span style={{ color: '#E8940A' }}>כשאף אחד לא רואה</span>
            </h2>

            {/* Body */}
            <p
              className="text-white/60 leading-relaxed mb-9 animate-fade-in-up"
              style={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)',
                maxWidth: '440px',
                animationDelay: '160ms',
              }}
            >
              הציוד הטוב ביותר לא נבחן בחנות. הוא נבחן בשתיים בלילה, בגובה 800 מטר, כשהרוח מכה.
            </p>

            {/* CTA */}
            <div className="animate-fade-in-up" style={{ animationDelay: '240ms' }}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-white/22 hover:border-white/55 text-white font-bold text-sm rounded-xl transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                הסיפור שלנו
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
