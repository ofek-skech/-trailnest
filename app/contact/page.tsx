'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())         e.name    = 'שם נדרש';
    if (!form.email.includes('@')) e.email   = 'כתובת מייל לא תקינה';
    if (!form.subject.trim())      e.subject = 'נושא נדרש';
    if (!form.message.trim())      e.message = 'הודעה נדרשת';
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
        <label htmlFor={`c-${key}`} className="block text-sm font-semibold text-[#111] mb-1.5">
          {label} <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <Tag
          id={`c-${key}`}
          type={type}
          value={form[key]}
          rows={multiline ? 5 : undefined}
          onChange={e => {
            setForm(f => ({ ...f, [key]: e.target.value }));
            setErrors(ev => { const n = { ...ev }; delete n[key]; return n; });
          }}
          className={`w-full px-4 py-3 border rounded-xl text-sm text-[#111] placeholder-[#888] bg-white outline-none focus:ring-2 transition-colors resize-none ${
            errors[key] ? 'border-red-400 focus:ring-red-400/20' : 'border-[#E4DDD2] focus:border-tn-600 focus:ring-tn-600/20'
          }`}
          aria-describedby={errors[key] ? `c-${key}-err` : undefined}
        />
        {errors[key] && (
          <p id={`c-${key}-err`} className="mt-1 text-xs text-red-500" role="alert">{errors[key]}</p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F3' }}>
      {/* Header */}
      <div className="text-white pt-[152px] pb-16 lg:pt-[168px] lg:pb-20" style={{ background: '#1E2020' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
          <p className="overline mb-3" style={{ fontFamily: 'Rubik, sans-serif', color: '#E8940A' }}>צרו קשר</p>
          <h1 className="heading-lg text-white mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>שמחים לשמוע מכם</h1>
          <p className="text-white/70" style={{ fontFamily: 'Rubik, sans-serif' }}>
            שאלה על הזמנה, ייעוץ ציוד, או סתם משוב? הצוות שלנו עונה תוך יום עסקים.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 section-py grid md:grid-cols-5 gap-12" dir="rtl">
        {/* Contact info */}
        <aside className="md:col-span-2 space-y-6">
          <h2 className="heading-sm text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>פרטי יצירת קשר</h2>
          {[
            { icon: Mail,   label: 'מייל',    value: 'campil.info@gmail.com', href: 'mailto:campil.info@gmail.com' },
            { icon: Phone,  label: 'טלפון',   value: '+972 XX-XXX-XXXX',      href: undefined                       },
            { icon: MapPin, label: 'כתובת',   value: 'בקרוב',                  href: undefined                       },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-tn-600/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Icon className="w-4 h-4 text-tn-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#888] uppercase tracking-wider">{label}</p>
                {href
                  ? <a href={href} className="text-sm text-[#111] hover:text-tn-600 transition-colors font-semibold">{value}</a>
                  : <p className="text-sm text-[#111] font-semibold">{value}</p>}
              </div>
            </div>
          ))}
          <div className="p-4 bg-[#F8F7F3] rounded-xl border border-[#E4DDD2]">
            <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1">שעות מענה</p>
            <p className="text-sm text-[#111]">ראשון–חמישי: 9:00–18:00</p>
            <p className="text-sm text-[#111]">שישי: 9:00–14:00</p>
          </div>

          {/* WhatsApp shortcut */}
          <a
            href="https://wa.me/972XXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-[0_4px_16px_rgba(37,211,102,0.4)]"
            style={{ background: '#25D366', fontFamily: 'Rubik, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            דברו איתנו בוואטסאפ
          </a>
          <p className="text-[11px] text-[#888] text-center">ניתן לפנות גם בוואטסאפ לתשובות מהירות</p>
        </aside>

        {/* Form */}
        <div className="md:col-span-3">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <CheckCircle className="w-14 h-14 text-tn-600 mb-4" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[#111] mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>
                ההודעה נשלחה!
              </h2>
              <p className="text-[#888]">תודה שפניתם. נחזור אליכם תוך יום עסקים.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                {field('name',    'שם מלא')}
                {field('email',   'כתובת מייל', 'email')}
              </div>
              {field('subject', 'נושא')}
              {field('message', 'הודעה', 'text', true)}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-tn-600 hover:bg-tn-800 disabled:bg-[#E0E0E0] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {status === 'loading' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    שולח…
                  </>
                ) : (
                  'שלח הודעה'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
