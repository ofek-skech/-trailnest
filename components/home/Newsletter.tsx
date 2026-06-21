'use client';
import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  }

  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: '#0A1F18' }}
      aria-labelledby="newsletter-heading"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, #3e7a65 0%, transparent 55%), radial-gradient(ellipse at 85% 30%, #D8C8A8 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center" dir="rtl">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(58,107,83,0.22)', border: '1px solid rgba(58,107,83,0.35)' }}
          aria-hidden="true"
        >
          <Mail className="w-6 h-6 text-[#7EC8A2]" />
        </div>

        {/* Overline */}
        <p
          className="text-[9px] font-bold uppercase tracking-[0.22em] text-sand-400/45 mb-4"
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          ניוזלטר CampIL
        </p>

        {/* Heading */}
        <h2
          id="newsletter-heading"
          className="font-black text-white mb-4 leading-[1.08]"
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            letterSpacing: '-0.022em',
          }}
        >
          ציוד חדש. מדריכי שטח.
          <br />
          <span className="text-sand-400">הנחות בלעדיות.</span>
        </h2>

        {/* Body */}
        <p
          className="text-white/40 leading-relaxed mb-10 text-sm"
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          קבלו גישה מוקדמת למוצרים חדשים, מדריכי יציאה לשטח, והנחות למנויים בלבד. ללא ספאם — רק ציוד שכדאי לדעת עליו.
        </p>

        {/* Form or success */}
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-4" role="status" aria-live="polite">
            <CheckCircle className="w-5 h-5 text-[#7EC8A2]" aria-hidden="true" />
            <p className="text-[#7EC8A2] font-semibold text-sm" style={{ fontFamily: 'Rubik, sans-serif' }}>
              נרשמת בהצלחה! בדקו את תיבת הדואר שלכם.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
            dir="rtl"
          >
            <div className="flex-1">
              <label htmlFor="nl-email" className="sr-only">כתובת מייל</label>
              <input
                id="nl-email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                placeholder="המייל שלך"
                autoComplete="email"
                required
                className={`w-full px-4 py-3.5 text-white placeholder-white/25 rounded-xl text-sm transition-colors outline-none focus:ring-2 focus:ring-tn-600/40 ${
                  status === 'error'
                    ? 'border border-red-400 bg-red-950/30'
                    : 'border border-white/10 bg-white/6 focus:border-tn-500/60'
                }`}
                style={{ fontFamily: 'Rubik, sans-serif' }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-tn-600 hover:bg-tn-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap hover:shadow-[0_6px_20px_rgba(58,107,83,0.40)]"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              {status === 'loading' ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                  הרשמה
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-400" role="alert" style={{ fontFamily: 'Rubik, sans-serif' }}>
            אנא הכניסו כתובת מייל תקינה.
          </p>
        )}

        <p className="mt-5 text-[11px] text-white/20" style={{ fontFamily: 'Rubik, sans-serif' }}>
          ללא ספאם. ניתן לבטל בכל עת.{' '}
          <a href="/policies/privacy" className="underline hover:text-white/40 transition-colors">
            מדיניות פרטיות
          </a>
        </p>
      </div>
    </section>
  );
}
