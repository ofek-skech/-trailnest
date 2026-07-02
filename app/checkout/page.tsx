'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Lock, CreditCard, AlertCircle, Loader2, ChevronLeft } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const FREE_SHIPPING = 300;
const SHIPPING_COST = 35;

interface FormData {
  name:    string;
  phone:   string;
  email:   string;
  city:    string;
  address: string;
  notes:   string;
}

const empty: FormData = { name: '', phone: '', email: '', city: '', address: '', notes: '' };

function field(
  id:          keyof FormData,
  label:       string,
  type:        string,
  placeholder: string,
  required:    boolean,
  value:       string,
  onChange:    (v: string) => void,
  error:       string | null,
) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#333] mb-1.5">
        {label}{required && <span className="text-red-500 mr-1">*</span>}
      </label>
      {id === 'notes' ? (
        <textarea
          id={id}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none transition-all ${
            error ? 'border-red-400 bg-red-50' : 'border-[#E4DDD2] bg-white focus:border-tn-600 focus:ring-2 focus:ring-tn-600/10'
          }`}
          style={{ fontFamily: 'Rubik, sans-serif' }}
          dir="rtl"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
            error ? 'border-red-400 bg-red-50' : 'border-[#E4DDD2] bg-white focus:border-tn-600 focus:ring-2 focus:ring-tn-600/10'
          }`}
          style={{ fontFamily: 'Rubik, sans-serif' }}
          dir="rtl"
        />
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { state, itemCount, subtotal, clearCart } = useCart();
  const [form, setForm]           = useState<FormData>(empty);
  const [errors, setErrors]       = useState<Partial<FormData>>({});
  const [loading, setLoading]     = useState(false);
  const [serverError, setServerError] = useState('');

  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const total    = subtotal + shipping;

  function set(k: keyof FormData) {
    return (v: string) => {
      setForm(f => ({ ...f, [k]: v }));
      if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
    };
  }

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim())    e.name    = 'שם מלא חובה';
    if (!form.phone.trim())   e.phone   = 'טלפון חובה';
    else if (!/^[0-9+\-() ]{7,15}$/.test(form.phone.trim())) e.phone = 'מספר טלפון לא תקין';
    if (!form.email.trim())   e.email   = 'אימייל חובה';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'כתובת אימייל לא תקינה';
    if (!form.city.trim())    e.city    = 'עיר חובה';
    if (!form.address.trim()) e.address = 'כתובת חובה';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    try {
      const items = state.items.map(i => ({
        id:       i.product.id,
        name:     i.product.name,
        price:    i.product.price,
        quantity: i.quantity,
        image:    i.product.image,
      }));

      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          customer: { ...form },
          items,
          subtotal,
          shipping,
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'שגיאה ביצירת ההזמנה');
      }

      const { paymentUrl } = await res.json();
      clearCart();
      window.location.href = paymentUrl;
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : 'שגיאה לא צפויה. נסו שנית.');
      setLoading(false);
    }
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center" style={{ background: '#FAF8F3' }}>
        <div className="w-20 h-20 rounded-full bg-[#F8F7F3] border border-[#E4DDD2] flex items-center justify-center" aria-hidden="true">
          <ShoppingBag className="w-9 h-9 text-[#888]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#111] mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>הסל שלך ריק</h1>
          <p className="text-[#888]">הוסף מוצרים כדי להמשיך לתשלום</p>
        </div>
        <Link href="/shop" className="px-6 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors" style={{ fontFamily: 'Rubik, sans-serif' }}>
          לקנייה
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F3' }} dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[152px] pb-16 lg:pt-[168px] lg:pb-20">

        {/* Heading */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-tn-600 transition-colors mb-4">
            <ChevronLeft className="w-4 h-4 rotate-180" />
            חזרה לסל
          </Link>
          <h1 className="text-3xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>פרטי תשלום</h1>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid lg:grid-cols-5 gap-8">

            {/* ── Left column: customer form ───────────────────────── */}
            <div className="lg:col-span-3 space-y-5">
              <div className="bg-white border border-[#E4DDD2] rounded-2xl p-6">
                <h2 className="font-bold text-[#111] text-lg mb-5" style={{ fontFamily: 'Rubik, sans-serif' }}>פרטי הלקוח</h2>
                <div className="space-y-4">
                  {field('name',    'שם מלא',           'text',  'ישראל ישראלי',       true,  form.name,    set('name'),    errors.name    ?? null)}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {field('phone', 'טלפון',             'tel',   '050-0000000',        true,  form.phone,   set('phone'),   errors.phone   ?? null)}
                    {field('email', 'אימייל',            'email', 'example@gmail.com',  true,  form.email,   set('email'),   errors.email   ?? null)}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {field('city',    'עיר',             'text',  'תל אביב',            true,  form.city,    set('city'),    errors.city    ?? null)}
                    {field('address', 'רחוב ומספר בית',  'text',  'הרצל 1 דירה 5',     true,  form.address, set('address'), errors.address ?? null)}
                  </div>
                  {field('notes', 'הערות להזמנה',       'text',  'הוראות מיוחדות למשלוח...', false, form.notes, set('notes'), null)}
                </div>
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-center gap-6 text-xs text-[#888] py-2">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-tn-600" />
                  תשלום מאובטח SSL
                </span>
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-tn-600" />
                  לא שומרים פרטי כרטיס
                </span>
              </div>
            </div>

            {/* ── Right column: order summary + CTA ────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5 sticky top-[108px]">
                <h2 className="font-bold text-[#111] mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>סיכום הזמנה</h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {state.items.map(({ product: p, quantity: q }) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-[#F8F7F3] border border-[#E4DDD2] overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#111] line-clamp-2 leading-snug" style={{ fontFamily: 'Rubik, sans-serif' }}>{p.name}</p>
                        <p className="text-xs text-[#888] mt-0.5">כמות: {q}</p>
                      </div>
                      <span className="text-sm font-bold text-[#111] flex-shrink-0">₪{(p.price * q).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-[#E4DDD2] pt-4 space-y-2 text-sm mb-5">
                  <div className="flex justify-between text-[#888]">
                    <span>סכום ביניים</span>
                    <span className="text-[#111] font-medium">₪{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#888]">
                    <span>משלוח</span>
                    <span className={shipping === 0 ? 'text-tn-600 font-semibold' : 'text-[#111] font-medium'}>
                      {shipping === 0 ? 'חינם' : `₪${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-[#111] text-base pt-2 border-t border-[#E4DDD2]">
                    <span>סה"כ לתשלום</span>
                    <span>₪{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Error */}
                {serverError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-bold text-base text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_6px_20px_rgba(31,77,58,0.30)]"
                  style={{ background: loading ? '#888' : '#1F4D3A', fontFamily: 'Rubik, sans-serif' }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                      מעביר לדף התשלום...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" aria-hidden="true" />
                      לתשלום מאובטח
                    </>
                  )}
                </button>

                {/* Payment methods */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-[#888] mb-2">אמצעי תשלום מקובלים</p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {['Visa', 'MC', 'Amex', 'Apple Pay', 'Google Pay', 'Bit'].map(m => (
                      <span key={m} className="text-[10px] font-semibold bg-[#F8F7F3] border border-[#E4DDD2] rounded px-2 py-0.5 text-[#555]">{m}</span>
                    ))}
                  </div>
                  <p className="text-[10px] text-[#AAA] mt-3">מאובטח על ידי Tranzila · PCI DSS Level 1</p>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
