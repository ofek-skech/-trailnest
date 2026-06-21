'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Trash2, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const FREE_SHIPPING_THRESHOLD = 300;
const SHIPPING_COST = 35;

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    if (state.isOpen) { document.addEventListener('keydown', onKey); ref.current?.focus(); }
    return () => document.removeEventListener('keydown', onKey);
  }, [state.isOpen, closeCart]);

  if (!state.isOpen) return null;

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total    = subtotal + shipping;
  const toFree   = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="סל קניות">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={closeCart} aria-hidden="true" />
      <div
        ref={ref}
        tabIndex={-1}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl outline-none"
        style={{ animation: 'slideInRight .3s cubic-bezier(0.22,1,0.36,1)' }}
        dir="rtl"
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4DDD2]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-tn-600" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
              הסל שלך{' '}
              {itemCount > 0 && (
                <span className="text-sm font-normal text-[#888]">({itemCount})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F8F7F3] text-[#888] hover:text-[#111] transition-colors cursor-pointer"
            aria-label="סגור סל"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free shipping progress */}
        {subtotal > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
          <div className="px-6 py-3 bg-[#F8F7F3]">
            <p className="text-xs text-[#888] mb-1.5">
              הוסיפו עוד{' '}
              <span className="text-tn-600 font-semibold">₪{toFree.toLocaleString()}</span>
              {' '}לקבלת משלוח חינם
            </p>
            <div className="h-1.5 bg-[#E4DDD2] rounded-full overflow-hidden">
              <div
                className="h-full bg-tn-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= FREE_SHIPPING_THRESHOLD && (
          <div className="px-6 py-3 bg-tn-50 text-xs text-tn-600 font-semibold">
            ✓ משלוח חינם נפתח!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F8F7F3] flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#C2C2C2]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#111] mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>
                  הסל שלך ריק
                </p>
                <p className="text-sm text-[#888]">הכינו ציוד להרפתקה הבאה</p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-2 px-5 py-2.5 bg-tn-600 hover:bg-tn-800 text-white text-sm font-bold rounded-xl transition-colors"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                לכל הציוד
              </Link>
            </div>
          ) : (
            state.items.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 bg-[#F8F7F3] rounded-2xl">
                {/* Product image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F5F2EE] flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#999] uppercase tracking-wide mb-0.5 font-medium">
                    {item.product.category}
                  </p>
                  <p
                    className="text-sm font-semibold text-[#111] line-clamp-2 leading-snug"
                    style={{ fontFamily: 'Rubik, sans-serif' }}
                  >
                    {item.product.name}
                  </p>
                  <p
                    className="text-tn-600 font-bold text-sm mt-1"
                    style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}
                  >
                    ₪{(item.product.price * item.quantity).toLocaleString()}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-[#E4DDD2] hover:border-tn-600 text-[#888] hover:text-tn-600 transition-colors cursor-pointer"
                      aria-label="הפחת כמות"
                    >
                      <Minus className="w-3 h-3" aria-hidden="true" />
                    </button>
                    <span
                      className="text-sm font-semibold text-[#111] w-6 text-center"
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-[#E4DDD2] hover:border-tn-600 text-[#888] hover:text-tn-600 transition-colors cursor-pointer"
                      aria-label="הוסף כמות"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="mr-auto w-7 h-7 flex items-center justify-center rounded-lg text-[#C2C2C2] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label={`הסר ${item.product.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E4DDD2] space-y-4 bg-white">
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-[#888]">
                <span>סכום ביניים</span>
                <span className="text-[#111] font-medium" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  ₪{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#888]">
                <span>משלוח</span>
                <span className={shipping === 0 ? 'text-tn-600 font-semibold' : 'text-[#111] font-medium'}>
                  {shipping === 0 ? 'חינם' : `₪${shipping}`}
                </span>
              </div>
              <div
                className="flex justify-between font-bold text-[#111] text-base pt-2.5 border-t border-[#E4DDD2]"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <span>סה"כ</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>₪{total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:bg-tn-800 hover:shadow-[0_6px_20px_rgba(31,77,58,0.30)]"
              style={{ background: '#1F4D3A', fontFamily: 'Rubik, sans-serif' }}
            >
              <Lock className="w-4 h-4" aria-hidden="true" />
              לתשלום מאובטח
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center text-xs text-[#888] hover:text-[#111] transition-colors py-1"
            >
              לסל המלא
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
