'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Check, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';

const badgeCfg = {
  new:        { label: 'חדש',     cls: 'bg-tn-600 text-white'                          },
  sale:       { label: 'מבצע',    cls: 'bg-[#C0392B] text-white'                      },
  bestseller: { label: 'פופולרי', cls: 'bg-[#111111] text-white'                      },
  limited:    { label: 'מוגבל',   cls: 'bg-[#6B5A3E] text-white'                      },
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem }                = useCart();
  const [added,    setAdded]       = useState(false);
  const [wishlist, setWishlist]    = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <article
      className="group flex flex-col bg-white card-lift"
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.065)',
        animationDelay: `${index * 0.06}s`,
      }}
    >
      {/* ── Image ───────────────────────────────────── */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
        style={{ aspectRatio: '1/1', background: '#F5F2EE' }}
        aria-label={`פרטים על ${product.name}`}
        tabIndex={-1}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          style={{ willChange: 'transform' }}
        />

        {/* Subtle dark vignette on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 60%)', opacity: 0 }}
          ref={el => {
            if (!el) return;
            const parent = el.closest('.group');
            if (!parent) return;
          }}
        />

        {/* Badge — top right in RTL context */}
        {product.badge && (
          <span
            className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badgeCfg[product.badge].cls}`}
            style={{ fontFamily: 'Rubik, sans-serif', letterSpacing: '0.08em' }}
          >
            {badgeCfg[product.badge].label}
          </span>
        )}

        {/* Discount pill — below badge or alone */}
        {discount && !product.badge && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C0392B] text-white"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            −{discount}%
          </span>
        )}

        {/* Wishlist — top left, visible on hover */}
        <button
          onClick={e => { e.preventDefault(); setWishlist(!wishlist); }}
          className={`absolute top-3 left-3 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 cursor-pointer ${
            wishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } hover:scale-110`}
          aria-label={wishlist ? 'הסר מרשימת מועדפים' : 'הוסף למועדפים'}
          aria-pressed={wishlist}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${wishlist ? 'fill-red-500 text-red-500' : 'text-[#666]'}`}
            aria-hidden="true"
          />
        </button>
      </Link>

      {/* ── Info ────────────────────────────────────── */}
      <div className="p-4 sm:p-5 flex flex-col flex-1" dir="rtl">

        {/* Brand badge */}
        {product.brand && (
          <span className="text-[10px] font-semibold text-[#888] uppercase tracking-wider mb-1.5 block"
            style={{ fontFamily: 'Rubik, sans-serif', letterSpacing: '0.06em' }}>
            {product.brand}
          </span>
        )}

        {/* Name */}
        <Link href={`/product/${product.slug}`} className="block mb-3 flex-1 min-h-0">
          <h3
            className="font-bold text-[#111] hover:text-tn-600 line-clamp-2 leading-snug transition-colors duration-150"
            style={{ fontFamily: 'Rubik, sans-serif', fontSize: '0.875rem' }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Delivery time */}
        {product.deliveryTime && (
          <div className="flex items-center gap-1 mb-3">
            <Truck className="w-3 h-3 text-tn-600 flex-shrink-0" aria-hidden="true" />
            <span className="text-[10px] text-[#777]">{product.deliveryTime}</span>
          </div>
        )}

        {/* Price row + CTA */}
        <div
          className="flex items-center justify-between gap-2 pt-3.5"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          {/* Prices */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-black text-[#111] leading-none"
                style={{ fontFamily: 'Rubik, sans-serif', fontSize: '1.05rem', fontVariantNumeric: 'tabular-nums' }}
              >
                ₪{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span
                  className="text-[11px] text-[#BBB] line-through leading-none"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  ₪{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {discount && (
              <span
                className="text-[10px] font-bold text-red-500 mt-0.5 block"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                חיסכון {discount}%
              </span>
            )}
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[11.5px] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${
              added
                ? 'bg-tn-600 text-white'
                : product.inStock
                ? 'bg-tn-600 text-white hover:bg-tn-800 hover:shadow-[0_4px_16px_rgba(31,77,58,0.35)] hover:-translate-y-0.5'
                : 'bg-[#EBEBEB] text-[#BBB] cursor-not-allowed'
            }`}
            style={{ fontFamily: 'Rubik, sans-serif', minHeight: '42px' }}
            aria-label={added ? 'נוסף לסל' : `הוסף ${product.name} לסל`}
          >
            {added ? (
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            {added ? 'נוסף' : product.inStock ? 'לסל' : 'אזל'}
          </button>
        </div>
      </div>
    </article>
  );
}
