'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Star, ShieldCheck, Truck, RotateCcw, ChevronDown, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import { ProductSVG } from '@/components/ProductSVG';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params  = useParams();
  const slug    = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const product = getProductBySlug(slug);

  const [qty, setQty]         = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [added, setAdded]     = useState(false);
  const { addItem }           = useCart();

  if (!product) return notFound();
  const p = product as NonNullable<typeof product>;

  const related  = getRelatedProducts(p.relatedSlugs ?? []);
  const discount = p.originalPrice
    ? Math.round((1 - p.price / p.originalPrice) * 100)
    : null;

  function handleAdd() {
    addItem(p, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#888] flex-wrap">
          <Link href="/" className="hover:text-tn-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <Link href="/shop" className="hover:text-tn-600 transition-colors">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <Link href={`/shop/${product.categorySlug}`} className="hover:text-tn-600 transition-colors">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          <span className="text-[#111] font-semibold line-clamp-1" aria-current="page">{product.name}</span>
        </nav>
      </div>

      {/* Product hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-[#E5DDD0] aspect-square flex items-center justify-center bg-[#F8F5F0]">
            <ProductSVG type={product.image} size={300} />
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24">
            {product.badge && (
              <span className={`inline-block px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 ${
                product.badge === 'sale'       ? 'bg-red-100 text-red-600' :
                product.badge === 'new'        ? 'bg-tn-600/10 text-tn-600' :
                product.badge === 'bestseller' ? 'bg-sand-100 text-sand-700' :
                'bg-[#F8F5F0] text-[#555]'
              }`}>{product.badge}</span>
            )}

            <h1 className="heading-md text-[#111] mb-2">{product.name}</h1>
            <p className="text-xs text-[#888] mb-4 font-mono">SKU: {product.sku}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'fill-sand-500 text-sand-500' : 'text-[#E0E0E0] fill-[#E0E0E0]'}`} aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#111]">{product.rating}</span>
              <span className="text-sm text-[#888]">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-[#111]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#888] line-through">${product.originalPrice.toFixed(2)}</span>
                  {discount && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-sm font-bold rounded-full">Save {discount}%</span>}
                </>
              )}
            </div>

            <p className="text-[#555] leading-relaxed mb-6">{product.shortDescription}</p>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-[#E5DDD0] rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-3 py-3 hover:bg-[#F8F5F0] transition-colors cursor-pointer" aria-label="Decrease quantity">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-[#111] font-semibold min-w-[40px] text-center" aria-live="polite">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="px-3 py-3 hover:bg-[#F8F5F0] transition-colors cursor-pointer" aria-label="Increase quantity">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={handleAdd} disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 font-bold text-sm rounded-xl transition-all cursor-pointer ${
                  added            ? 'bg-tn-600 text-white' :
                  !product.inStock ? 'bg-[#E0E0E0] text-[#888] cursor-not-allowed' :
                  'bg-[#D4A853] hover:bg-[#c49743] text-[#111]'
                }`}>
                {added
                  ? <><Check className="w-4 h-4" aria-hidden="true" /> Added!</>
                  : !product.inStock
                  ? 'Out of Stock'
                  : <><ShoppingCart className="w-4 h-4" aria-hidden="true" /> Add to Cart</>
                }
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#F8F5F0] rounded-xl border border-[#E5DDD0]">
              {[
                { icon: Truck,       text: 'Free shipping $75+' },
                { icon: RotateCcw,   text: '30-day returns'     },
                { icon: ShieldCheck, text: 'Lifetime warranty'  },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-4 h-4 text-tn-600" aria-hidden="true" />
                  <span className="text-[10px] text-[#555] font-semibold leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description + Benefits */}
      <div className="bg-[#F8F5F0] border-y border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="heading-sm text-[#111] mb-4">Product Description</h2>
            <p className="text-[#555] leading-relaxed">{product.description}</p>
          </div>
          <div>
            <h2 className="heading-sm text-[#111] mb-4">Key Benefits</h2>
            <ul className="space-y-3">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-tn-600/10 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <Check className="w-3 h-3 text-tn-600" />
                  </span>
                  <span className="text-[#555] text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="heading-sm text-[#111] mb-6">Specifications</h2>
        <div className="border border-[#E5DDD0] rounded-2xl overflow-hidden max-w-xl">
          {product.specs.map((spec, i) => (
            <div key={i} className={`grid grid-cols-2 gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F5F0]'}`}>
              <span className="font-semibold text-[#111]">{spec.label}</span>
              <span className="text-[#555]">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-[#F8F5F0] border-t border-[#E5DDD0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="heading-sm text-[#111] mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {product.faqs.map((faq, i) => (
              <div key={i} className="border border-[#E5DDD0] rounded-xl bg-white overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-[#F8F5F0] transition-colors"
                  aria-expanded={openFaq === i}>
                  <span className="font-semibold text-[#111] text-sm">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#888] flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-[#555] leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
          <h2 className="heading-sm text-[#111] mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
