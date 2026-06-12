'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, CreditCard, Truck, User, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { ProductSVG } from '@/components/ProductSVG';

type Step = 0 | 1 | 2 | 3;

function Input({ id, label, type = 'text', autoComplete }: { id: string; label: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-[#888] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input id={id} type={type} autoComplete={autoComplete}
        className="w-full px-4 py-3 border border-[#E5DDD0] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20" />
    </div>
  );
}

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>(0);
  const { state, clearCart, itemCount, subtotal } = useCart();
  const shipping = subtotal >= 75 ? 0 : 9.95;
  const total    = subtotal + shipping;

  if (itemCount === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4 text-center">
        <ShoppingBag className="w-12 h-12 text-[#888]" />
        <p className="font-bold text-[#111]">Your cart is empty</p>
        <Link href="/shop" className="px-5 py-3 bg-tn-600 text-white font-bold text-sm rounded-xl hover:bg-tn-800">Shop Now</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center px-4">
        <div className="bg-white border border-[#E5DDD0] rounded-2xl p-10 max-w-md w-full text-center shadow-sm">
          <div className="w-16 h-16 bg-tn-600/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="w-8 h-8 text-tn-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#111] mb-2">Order Confirmed!</h1>
          <p className="text-[#888] mb-6">Thanks for your order. You&apos;ll receive a confirmation email shortly.</p>
          <Link href="/shop" onClick={clearCart}
            className="w-full flex items-center justify-center py-3.5 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const STEPS = ['Information', 'Shipping', 'Payment'] as const;

  return (
    <div className="min-h-screen bg-[#F8F5F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        <div className="text-center mb-8">
          <h1 className="heading-md text-[#111] mb-4">Checkout</h1>
          <nav aria-label="Checkout steps" className="flex items-center justify-center gap-1">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold ${i <= step ? 'text-tn-600' : 'text-[#888]'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    i < step   ? 'bg-tn-600 text-white' :
                    i === step ? 'border-2 border-tn-600 text-tn-600' :
                    'border border-[#E5DDD0] text-[#888]'
                  }`}>
                    {i < step ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span className="hidden sm:block">{s}</span>
                </div>
                {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-[#E5DDD0] mx-0.5" aria-hidden="true" />}
              </div>
            ))}
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 bg-white border border-[#E5DDD0] rounded-2xl p-6">
            {step === 0 && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <User className="w-4 h-4 text-tn-600" />
                  <h2 className="font-bold text-[#111]">Contact &amp; Shipping</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input id="fname"    label="First Name"      autoComplete="given-name"    />
                  <Input id="lname"    label="Last Name"       autoComplete="family-name"   />
                  <div className="col-span-2"><Input id="email" label="Email"  type="email" autoComplete="email"          /></div>
                  <div className="col-span-2"><Input id="addr"  label="Street Address"      autoComplete="street-address" /></div>
                  <Input id="suburb"   label="Suburb / City"   autoComplete="address-level2"  />
                  <Input id="state"    label="State"           autoComplete="address-level1"  />
                  <Input id="post"     label="Postcode"        autoComplete="postal-code"      />
                  <Input id="country"  label="Country"         autoComplete="country-name"     />
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <Truck className="w-4 h-4 text-tn-600" />
                  <h2 className="font-bold text-[#111]">Shipping Method</h2>
                </div>
                <div className="space-y-3">
                  {[
                    { id: 'std', label: 'Standard Shipping',  detail: '3–5 business days', price: shipping === 0 ? 'FREE' : '$9.95', def: true  },
                    { id: 'exp', label: 'Express Shipping',   detail: '1–2 business days',  price: '$14.95',                          def: false },
                  ].map(opt => (
                    <label key={opt.id} className="flex items-center gap-3 p-4 border border-[#E5DDD0] rounded-xl cursor-pointer hover:border-tn-600 transition-colors">
                      <input type="radio" name="ship" defaultChecked={opt.def} className="accent-tn-600 w-4 h-4" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#111]">{opt.label}</p>
                        <p className="text-xs text-[#888]">{opt.detail}</p>
                      </div>
                      <span className={`text-sm font-bold ${opt.def && shipping === 0 ? 'text-tn-600' : 'text-[#111]'}`}>{opt.price}</span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard className="w-4 h-4 text-tn-600" />
                  <h2 className="font-bold text-[#111]">Payment Details</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><Input id="cc-name" label="Name on Card" autoComplete="cc-name"   /></div>
                  <div className="col-span-2"><Input id="cc-num"  label="Card Number"  autoComplete="cc-number" /></div>
                  <Input id="cc-exp" label="Expiry (MM/YY)" autoComplete="cc-exp"  />
                  <Input id="cc-cvv" label="CVV"            autoComplete="cc-csc"  />
                </div>
                <p className="mt-4 text-xs text-[#888] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-tn-600" />
                  Your card details are encrypted and never stored.
                </p>
              </>
            )}

            <div className="flex justify-between mt-8 pt-5 border-t border-[#E5DDD0]">
              {step > 0
                ? <button onClick={() => setStep(s => (s - 1) as Step)} className="text-sm text-tn-600 font-bold hover:underline cursor-pointer">← Back</button>
                : <Link href="/cart" className="text-sm text-tn-600 font-bold hover:underline">← Back to Cart</Link>
              }
              <button
                onClick={() => step < 2 ? setStep(s => (s + 1) as Step) : setStep(3)}
                className="px-6 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer">
                {step < 2 ? 'Continue' : 'Place Order'}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-5 sticky top-24">
              <h2 className="font-bold text-[#111] mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {state.items.map(({ product: p, quantity: q }) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F8F5F0] border border-[#E5DDD0] flex items-center justify-center flex-shrink-0">
                      <ProductSVG type={p.image} size={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#111] line-clamp-1">{p.name}</p>
                      <p className="text-xs text-[#888]">Qty {q}</p>
                    </div>
                    <span className="text-xs font-bold text-[#111]">${(p.price * q).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <dl className="space-y-2 text-sm border-t border-[#E5DDD0] pt-4">
                <div className="flex justify-between"><dt className="text-[#888]">Subtotal</dt><dd className="font-semibold text-[#111]">${subtotal.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt className="text-[#888]">Shipping</dt>
                  <dd className={`font-semibold ${shipping === 0 ? 'text-tn-600' : 'text-[#111]'}`}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</dd>
                </div>
                <div className="flex justify-between border-t border-[#E5DDD0] pt-3">
                  <dt className="font-bold text-[#111]">Total</dt><dd className="font-bold text-[#111]">${total.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
