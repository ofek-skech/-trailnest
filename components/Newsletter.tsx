'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email,   setEmail]   = useState('');
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setErrMsg('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  }

  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 41px)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-ember-600/15 border border-ember-600/20 flex items-center justify-center mx-auto mb-6" aria-hidden="true">
          <Mail className="w-7 h-7 text-ember-500" />
        </div>

        <h2
          id="newsletter-heading"
          className="text-3xl sm:text-4xl font-bold text-stone-50 mb-3"
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          Gear drops. Trail guides. Exclusive deals.
        </h2>
        <p className="text-stone-400 mb-8 leading-relaxed">
          Join 50,000 adventurers who get early access to new gear, expert tips, and member-only discounts. Unsubscribe any time.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-4" role="status" aria-live="polite">
            <CheckCircle className="w-6 h-6 text-forest-300" aria-hidden="true" />
            <p className="text-forest-200 font-semibold">
              You&rsquo;re in! Check your inbox for a welcome gift.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <div className="flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus('idle'); setErrMsg(''); }}
                placeholder="your@email.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3.5 bg-forest-900/80 border border-forest-700 hover:border-forest-600 focus:border-ember-600 text-stone-200 placeholder-stone-600 rounded-xl text-sm transition-colors outline-none focus:ring-2 focus:ring-ember-600/30"
                aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-ember-600 hover:bg-ember-500 disabled:bg-forest-700 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-colors group cursor-pointer whitespace-nowrap"
            >
              {status === 'loading' ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p
            id="newsletter-error"
            className="mt-2 text-sm text-red-400"
            role="alert"
            aria-live="polite"
          >
            {errMsg}
          </p>
        )}

        <p className="mt-4 text-xs text-stone-600">
          No spam, ever. Read our{' '}
          <a href="/privacy" className="text-stone-500 hover:text-stone-300 underline underline-offset-2 transition-colors">
            Privacy Policy
          </a>.
        </p>
      </div>
    </section>
  );
}
