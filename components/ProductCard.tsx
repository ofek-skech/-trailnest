'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Heart, Check } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { ProductSVG } from './ProductSVG';
import type { Product } from '@/lib/types';

const badgeCfg = {
  new:        { label:'New',         cls:'bg-tn-600 text-white' },
  sale:       { label:'Sale',        cls:'bg-red-600 text-white' },
  bestseller: { label:'Best Seller', cls:'bg-sand-500 text-tn-950' },
  limited:    { label:'Limited',     cls:'bg-neutral-800 text-white' },
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

  return (
    <article className="group bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
      style={{ animationDelay:`${index * .05}s` }}>

      {/* Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square bg-[#F8F5F0] img-zoom" aria-label={`View ${product.name}`}>
        <div className="flex items-center justify-center h-full">
          <ProductSVG type={product.image} size={120} />
        </div>
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full ${badgeCfg[product.badge].cls}`}>
            {badgeCfg[product.badge].label}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-1 rounded-full bg-red-600 text-white">-{discount}%</span>
        )}
        <button
          onClick={e => { e.preventDefault(); setWishlist(!wishlist); }}
          className="absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 hover:bg-white transition-all cursor-pointer shadow-sm"
          aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={wishlist}>
          <Heart className={`w-4 h-4 transition-colors ${wishlist ? 'fill-red-500 text-red-500' : 'text-[#888]'}`} aria-hidden="true" />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="overline text-[#888] mb-1">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="block mb-2">
          <h3 className="text-sm font-bold text-[#111] hover:text-tn-600 line-clamp-2 leading-snug transition-colors" style={{ fontFamily:'Rubik, sans-serif' }}>
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-3 h-3 ${s <= Math.floor(product.rating) ? 'fill-[#D6C2A1] text-[#D6C2A1]' : 'text-[#E0E0E0]'}`} aria-hidden="true" />
            ))}
          </div>
          <span className="text-xs text-[#888]">({product.reviewCount})</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between gap-2 mt-3">
          <div>
            <span className="text-lg font-black text-[#111]" style={{ fontVariantNumeric:'tabular-nums' }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-1.5 text-sm text-[#888] line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              added ? 'bg-green-600 text-white' :
              product.inStock ? 'bg-tn-600 hover:bg-tn-800 text-white' :
              'bg-[#F0F0F0] text-[#888] cursor-not-allowed'
            }`}
            aria-label={added ? 'Added' : `Add ${product.name} to cart`}>
            {added
              ? <><Check className="w-3.5 h-3.5" aria-hidden="true" />Added</>
              : <><ShoppingCart className="w-3.5 h-3.5" aria-hidden="true" />{product.inStock ? 'Add' : 'Out of stock'}</>
            }
          </button>
        </div>
      </div>
    </article>
  );
}
