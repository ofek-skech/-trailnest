'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';

const badgeCfg = {
  new:        { label: 'חדש',        cls: 'bg-tn-600 text-white' },
  sale:       { label: 'מבצע',       cls: 'bg-red-600 text-white' },
  bestseller: { label: 'פופולרי',    cls: 'bg-sand-500 text-tn-950' },
  limited:    { label: 'מוגבל',      cls: 'bg-neutral-800 text-white' },
};

/* Category slug → lifestyle photo that best represents it */
const categoryImage: Record<string, string> = {
  'vehicle-gear':         '/images/hero-overlanding.jpg',
  'camp-kitchen':         '/images/family-camping.jpg',
  'lighting':             '/images/campfire-stars.jpg',
  'sleeping':             '/images/tent-stars.jpg',
  'water-shower':         '/images/desert-tent.jpg',
  'storage-organization': '/images/camping-chairs.jpg',
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const [added,    setAdded]    = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const photo = categoryImage[product.categorySlug] ?? '/images/camping-chairs.jpg';

  return (
    <article
      className="group bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Real photo image area */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden"
        style={{ aspectRatio: '4/3' }}
        aria-label={`פרטים על ${product.name}`}
      >
        <img
          src={photo}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle bottom gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* Badges */}
        {product.badge && (
          <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeCfg[product.badge].cls}`}
            style={{ fontFamily: 'Rubik, sans-serif' }}>
            {badgeCfg[product.badge].label}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-full bg-red-600 text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={e => { e.preventDefault(); setWishlist(!wishlist); }}
          className="absolute bottom-3 left-3 w-8 h-8 flex items-center justify-center rounded-xl bg-white/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white transition-all cursor-pointer shadow-sm"
          aria-label={wishlist ? 'הסר מרשימת מועדפים' : 'הוסף למועדפים'}
          aria-pressed={wishlist}
        >
          <Heart className={`w-4 h-4 transition-colors ${wishlist ? 'fill-red-500 text-red-500' : 'text-[#888]'}`} aria-hidden="true" />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1" dir="rtl">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#999] mb-1">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="block mb-3">
          <h3
            className="text-sm font-bold text-[#111] hover:text-tn-600 line-clamp-2 leading-snug transition-colors"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center justify-between gap-2 mt-3">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              added            ? 'bg-green-600 text-white' :
              product.inStock ? 'bg-tn-600 hover:bg-tn-800 text-white' :
              'bg-[#F0F0F0] text-[#888] cursor-not-allowed'
            }`}
            style={{ fontFamily: 'Rubik, sans-serif' }}
            aria-label={added ? 'נוסף' : `הוסף ${product.name} לסל`}
          >
            {added
              ? <><Check className="w-3.5 h-3.5" aria-hidden="true" />נוסף</>
              : <><ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />{product.inStock ? 'הוסף לסל' : 'אזל'}</>
            }
          </button>
          <div className="text-right">
            <span className="text-base font-black text-[#111]" style={{ fontVariantNumeric: 'tabular-nums' }}>
              ₪{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="block text-xs text-[#888] line-through leading-none">₪{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
