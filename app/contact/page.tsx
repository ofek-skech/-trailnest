'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export default function ContactPage() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');
    await new Promise(r => setTimeout(r, 900));
    setStatus('success');
  }

  function field(key: keyof typeof form, label: string, type = 'text', multiline = false) {
    const Tag = multiline ? 'textarea' : 'input';
    return (
      <div>
        <label htmlFor={`c-${key}`} className="block text-sm font-semibold text-[#111] mb-1.5">{label} <span className="text-red-500" aria-hidden="true">*</span></label>
        <Tag id={`c-${key}`} type={type} value={form[key]} rows={multiline ? 5 : undefined}
          onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(ev => { const n = { ...ev }; delete n[key]; return n; }); }}
          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#111] placeholder-[#888] bg-white outline-none focus:ring-2 transition-colors resize-none ${errors[key] ? 'border-red-400 focus:ring-red-400/20' : 'border-[#E5DDD0] focus:border-tn-600 focus:ring-tn-600/20'}`}
          aria-describedby={errors[key] ? `c-${key}-err` : undefined}
        />
        {errors[key] && <p id={`c-${key}-err`} className="mt-1 text-xs text-red-500" role="alert">{errors[key]}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline text-sand-400 mb-3">Get In Touch</p>
          <h1 className="heading-lg text-white mb-4">We&rsquo;d Love to Hear From You</h1>
          <p className="text-white/70">Got a question about an order, need gear advice, or just want to say hi? Our team replies within one business day.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 section-py grid md:grid-cols-5 gap-12">
        {/* Contact info */}
        <aside className="md:col-span-2 space-y-6">
          <h2 className="heading-sm text-[#111]">Contact Details</h2>
          {[
            { icon: Mail,   label: 'Email',    value: 'support@campil.co', href: 'mailto:support@campil.co' },
            { icon: Phone,  label: 'Phone',    value: '+972 XX-XXX-XXXX',     href: undefined                    },
            { icon: MapPin, label: 'Location', value: 'Coming Soon',          href: undefined                    },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-tn-600/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Icon className="w-4.5 h-4.5 text-tn-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#888] uppercase tracking-wider">{label}</p>
                {href ? <a href={href} className="text-sm text-[#111] hover:text-tn-600 transition-colors font-semibold">{value}</a>
                      : <p className="text-sm text-[#111] font-semibold">{value}</p>}
              </div>
            </div>
          ))}
          <div className="p-4 bg-[#F8F5F0] rounded-xl border border-[#E5DDD0]">
            <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1">Support Hours</p>
            <p className="text-sm text-[#111]">Sun–Thu: 9am – 6pm</p>
            <p className="text-sm text-[#111]">Fri: 9am – 2pm</p>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-3">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle className="w-14 h-14 text-tn-600 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#111] mb-2">Message Sent!</h2>
              <p className="text-[#888]">Thanks for reaching out. We&apos;ll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {field('name', 'Full Name')}
                {field('email', 'Email Address', 'email')}
              </div>
              {field('subject', 'Subject')}
              {field('message', 'Message', 'text', true)}
              <button type="submit" disabled={status === 'loading'}
                className="w-full py-3.5 bg-tn-600 hover:bg-tn-800 disabled:bg-[#E0E0E0] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" /> Sending…</>
                  : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
