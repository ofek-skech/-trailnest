'use client';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const FREE_SHIPPING = 300;

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart, itemCount, subtotal } = useCart();
  const shipping = subtotal >= FREE_SHIPPING ? 0 : 35;
  const total    = subtotal + shipping;
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center" style={{ background: '#FAF8F3' }}>
        <div className="w-20 h-20 rounded-full bg-[#FAF8F3] border border-[#E4DDD2] flex items-center justify-center" aria-hidden="true">
          <ShoppingBag className="w-9 h-9 text-[#888]" />
        </div>
        <div>
          <h1 className="heading-sm text-[#111] mb-2">הסל שלך ריק</h1>
          <p className="text-[#888]">הוסף מוצרים וחזור!</p>
        </div>
        <Link href="/shop" className="px-6 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors">
          לקנייה
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] pb-16 lg:pt-[140px] lg:pb-20">
        <h1 className="heading-md text-[#111] mb-8">
          הסל שלי <span className="text-[#888] font-normal text-xl">({itemCount} פריטים)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map(({ product: p, quantity: q }) => (
              <div key={p.id} className="bg-white border border-[#E4DDD2] rounded-2xl p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-[#FAF8F3] border border-[#E4DDD2] overflow-hidden flex-shrink-0">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${p.slug}`} className="font-bold text-[#111] text-sm hover:text-tn-600 line-clamp-2 transition-colors">
                    {p.name}
                  </Link>
                  <p className="text-xs text-[#888] mt-0.5">{p.category}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E4DDD2] rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(p.id, q - 1)}
                        className="px-2.5 py-1.5 hover:bg-[#FAF8F3] transition-colors cursor-pointer" aria-label="הפחת כמות">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-semibold text-[#111]" aria-live="polite">{q}</span>
                      <button onClick={() => updateQuantity(p.id, q + 1)}
                        className="px-2.5 py-1.5 hover:bg-[#FAF8F3] transition-colors cursor-pointer" aria-label="הוסף כמות">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#111]">₪{(p.price * q).toLocaleString()}</span>
                      <button onClick={() => removeItem(p.id)}
                        className="text-[#888] hover:text-red-500 transition-colors cursor-pointer" aria-label={`הסר ${p.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Link href="/shop" className="text-sm text-tn-600 font-semibold hover:underline">← המשך קנייה</Link>
              <button onClick={clearCart} className="text-sm text-[#888] hover:text-red-500 transition-colors cursor-pointer">ריקון הסל</button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5 sticky top-24">
              <h2 className="font-bold text-[#111] mb-5">סיכום הזמנה</h2>

              {/* Free shipping progress */}
              <div className="mb-5">
                <div className="flex justify-between text-xs text-[#888] mb-1.5">
                  <span>{shipping === 0 ? 'משלוח חינם!' : `הוסף ₪${(FREE_SHIPPING - subtotal).toLocaleString()} למשלוח חינם`}</span>
                  <span>₪{FREE_SHIPPING}</span>
                </div>
                <div className="h-2 bg-[#FAF8F3] rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full bg-tn-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <dl className="space-y-3 text-sm mb-5">
                <div className="flex justify-between">
                  <dt className="text-[#888]">סכום ביניים</dt>
                  <dd className="font-semibold text-[#111]">₪{subtotal.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#888]">משלוח</dt>
                  <dd className={`font-semibold ${shipping === 0 ? 'text-tn-600' : 'text-[#111]'}`}>
                    {shipping === 0 ? 'חינם' : `₪${shipping}`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-[#E4DDD2] pt-3">
                  <dt className="font-bold text-[#111]">סה&quot;כ</dt>
                  <dd className="font-bold text-[#111] text-base">₪{total.toLocaleString()}</dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:bg-tn-800 hover:shadow-[0_4px_16px_rgba(31,77,58,0.30)]"
                style={{ background: '#1F4D3A', fontFamily: 'Rubik, sans-serif' }}
              >
                <Lock className="w-4 h-4" />
                לתשלום מאובטח
              </Link>
              <p className="text-center text-xs text-[#888] mt-3">מאובטח על ידי Tranzila · PCI DSS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
