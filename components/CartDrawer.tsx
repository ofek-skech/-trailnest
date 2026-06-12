'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { ProductSVG } from './ProductSVG';

export default function CartDrawer() {
  const { state, closeCart, removeItem, updateQuantity, itemCount, subtotal } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    if (state.isOpen) { document.addEventListener('keydown', onKey); ref.current?.focus(); }
    return () => document.removeEventListener('keydown', onKey);
  }, [state.isOpen, closeCart]);

  if (!state.isOpen) return null;

  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={closeCart} aria-hidden="true" />
      <div ref={ref} tabIndex={-1} className="absolute top-0 right-0 h-full w-full max-w-md bg-white flex flex-col shadow-2xl outline-none" style={{ animation:'slideInRight .3s ease-out' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5DDD0]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-tn-600" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#111]" style={{ fontFamily:'Rubik, sans-serif' }}>
              Your Cart {itemCount > 0 && <span className="text-sm font-normal text-[#888]">({itemCount})</span>}
            </h2>
          </div>
          <button onClick={closeCart} className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F8F5F0] text-[#888] hover:text-[#111] transition-colors cursor-pointer" aria-label="Close">
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Progress */}
        {subtotal > 0 && subtotal < 75 && (
          <div className="px-6 py-3 bg-[#F8F5F0]">
            <p className="text-xs text-[#888] mb-1.5">Add <span className="text-tn-600 font-semibold">${(75 - subtotal).toFixed(2)}</span> for free shipping</p>
            <div className="h-1.5 bg-[#E5DDD0] rounded-full overflow-hidden">
              <div className="h-full bg-tn-600 rounded-full transition-all duration-500" style={{ width:`${Math.min((subtotal/75)*100,100)}%` }} />
            </div>
          </div>
        )}
        {subtotal >= 75 && <div className="px-6 py-3 bg-tn-50 text-xs text-tn-600 font-semibold">✓ Free shipping unlocked!</div>}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#F8F5F0] flex items-center justify-center">
                <ShoppingBag className="w-7 h-7 text-[#C2C2C2]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-[#111] mb-1">Your cart is empty</p>
                <p className="text-sm text-[#888]">Gear up for your next adventure</p>
              </div>
              <Link href="/shop" onClick={closeCart} className="mt-2 px-5 py-2.5 bg-tn-600 hover:bg-tn-800 text-white text-sm font-bold rounded-xl transition-colors">
                Browse Gear
              </Link>
            </div>
          ) : state.items.map(item => (
            <div key={item.product.id} className="flex gap-4 p-4 bg-[#F8F5F0] rounded-2xl">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                <ProductSVG type={item.product.image} size={56} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#888] uppercase tracking-wide mb-0.5">{item.product.category}</p>
                <p className="text-sm font-semibold text-[#111] line-clamp-2 leading-snug">{item.product.name}</p>
                <p className="text-tn-600 font-bold text-sm mt-1">${(item.product.price * item.quantity).toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-[#E5DDD0] hover:border-tn-600 text-[#888] hover:text-tn-600 transition-colors cursor-pointer" aria-label="Decrease">
                    <Minus className="w-3 h-3" aria-hidden="true" />
                  </button>
                  <span className="text-sm font-semibold text-[#111] w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-[#E5DDD0] hover:border-tn-600 text-[#888] hover:text-tn-600 transition-colors cursor-pointer" aria-label="Increase">
                    <Plus className="w-3 h-3" aria-hidden="true" />
                  </button>
                  <button onClick={() => removeItem(item.product.id)} className="ml-auto w-7 h-7 flex items-center justify-center rounded-lg text-[#C2C2C2] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer" aria-label={`Remove ${item.product.name}`}>
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E5DDD0] space-y-4 bg-white">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#888]"><span>Subtotal</span><span className="text-[#111] font-medium">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-[#888]"><span>Shipping</span><span className={shipping === 0 ? 'text-tn-600 font-semibold' : 'text-[#111] font-medium'}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-bold text-[#111] text-base pt-2 border-t border-[#E5DDD0]"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <Link href="/checkout" onClick={closeCart} className="flex items-center justify-center gap-2 w-full py-3.5 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors group">
              Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
            <Link href="/cart" onClick={closeCart} className="block text-center text-xs text-[#888] hover:text-[#111] transition-colors py-1">View full cart</Link>
          </div>
        )}
      </div>
    </div>
  );
}
