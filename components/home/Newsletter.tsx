'use client';
import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 800));
    setStatus('success');
    setEmail('');
  }
  return (
    <section className="section-py bg-[#F8F5F0] border-t border-[#E5DDD0]" aria-labelledby="newsletter-heading">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-tn-600/10 flex items-center justify-center mx-auto mb-5" aria-hidden="true">
          <Mail className="w-7 h-7 text-tn-600" />
        </div>
        <p className="overline text-tn-600 mb-3">Join the Community</p>
        <h2 id="newsletter-heading" className="heading-md text-[#111] mb-3">Gear Drops. Trail Guides. Exclusive Deals.</h2>
        <p className="text-[#888] mb-8 leading-relaxed">Get early access to new products, trail guides, and subscriber-only discounts. No spam — just gear worth knowing about.</p>
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-4" role="status" aria-live="polite">
            <CheckCircle className="w-6 h-6 text-tn-600" aria-hidden="true" />
            <p className="text-tn-600 font-semibold">You&rsquo;re in! Check your inbox for a welcome discount.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
            <div className="flex-1">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" value={email} onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
                placeholder="your@email.com" autoComplete="email" required
                className={`w-full px-4 py-3.5 bg-white border text-[#111] placeholder-[#888] rounded-xl text-sm transition-colors outline-none focus:ring-2 focus:ring-tn-600/25 ${status==='error'?'border-red-400':'border-[#E5DDD0] focus:border-tn-600'}`} />
            </div>
            <button type="submit" disabled={status==='loading'}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-tn-600 hover:bg-tn-800 disabled:bg-[#E0E0E0] text-white font-bold text-sm rounded-xl transition-colors group cursor-pointer whitespace-nowrap">
              {status==='loading'
                ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                : <><span>Subscribe</span><ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" /></>
              }
            </button>
          </form>
        )}
        {status==='error' && <p className="mt-2 text-sm text-red-500" role="alert">Please enter a valid email address.</p>}
        <p className="mt-4 text-xs text-[#888]">No spam. Unsubscribe any time. <a href="/policies/privacy" className="underline hover:text-[#111]">Privacy Policy</a>.</p>
      </div>
    </section>
  );
}
