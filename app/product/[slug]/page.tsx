'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Truck, RotateCcw, Lock, ChevronDown, Minus, Plus, ShoppingCart, Check, Clock } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, products as allProducts } from '@/lib/products';
import { useCart } from '@/lib/cart-context';
import ProductCard from '@/components/ProductCard';
import ProductGallery from '@/components/ProductGallery';

const RECENTLY_VIEWED_KEY = 'tn_recently_viewed';
const MAX_RECENT = 8;

export default function ProductPage() {
  const params  = useParams();
  const slug    = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const product = getProductBySlug(slug);

  const [qty, setQty]                   = useState(1);
  const [openFaq, setOpenFaq]           = useState<number | null>(null);
  const [added, setAdded]               = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [recentSlugs, setRecentSlugs]   = useState<string[]>([]);
  const { addItem }                     = useCart();
  const mainCartBtnRef                  = useRef<HTMLButtonElement>(null);

  if (!product) return notFound();
  const p = product as NonNullable<typeof product>;

  // Track recently viewed
  useEffect(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) ?? '[]');
      const updated = [slug, ...stored.filter(s => s !== slug)].slice(0, MAX_RECENT);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      setRecentSlugs(updated.filter(s => s !== slug).slice(0, 4));
    } catch {}
  }, [slug]);

  // Sticky cart on mobile: show when main button leaves viewport
  useEffect(() => {
    const btn = mainCartBtnRef.current;
    if (!btn) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );
    obs.observe(btn);
    return () => obs.disconnect();
  }, []);

  const recentProducts = recentSlugs
    .map(s => allProducts.find(pr => pr.slug === s))
    .filter(Boolean)
    .slice(0, 4) as typeof allProducts;

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
    <div className="min-h-screen" style={{ background: '#FAF8F3' }}>

      {/* ── Offset for fixed header (announcement 40px + nav 64/80px) ── */}
      <div className="h-[104px] lg:h-[120px]" aria-hidden="true" />

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="bg-[#F8F7F3] border-b border-[#E4DDD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-[#888] flex-wrap">
            <Link href="/" className="hover:text-tn-600 transition-colors">בית</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <Link href="/shop" className="hover:text-tn-600 transition-colors">חנות</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <Link href={`/shop/${product.categorySlug}`} className="hover:text-tn-600 transition-colors">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="text-[#111] font-semibold line-clamp-1" aria-current="page">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product hero ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Gallery */}
          <ProductGallery
            images={product.images ?? [product.image]}
            alt={product.name}
          />

          {/* Details */}
          <div className="lg:sticky lg:top-32">
            {product.badge && (
              <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-4 ${
                product.badge === 'sale'       ? 'bg-red-100 text-red-600' :
                product.badge === 'new'        ? 'bg-tn-600/10 text-tn-600' :
                product.badge === 'bestseller' ? 'bg-sand-100 text-sand-700' :
                'bg-[#F8F5F0] text-[#555]'
              }`}>
                {product.badge === 'sale' ? 'מבצע' : product.badge === 'new' ? 'חדש' : product.badge === 'bestseller' ? 'פופולרי' : product.badge}
              </span>
            )}

            <h1 className="heading-md text-[#111] mb-2">{product.name}</h1>
            <p className="text-xs text-[#AAA] mb-5 font-mono">מק"ט: {product.sku}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span
                className="font-black text-[#111]"
                style={{ fontFamily: 'Rubik, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.25rem)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}
              >
                ₪{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#AAA] line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>₪{product.originalPrice.toLocaleString()}</span>
                  {discount && (
                    <span className="px-2.5 py-0.5 bg-red-50 text-red-600 text-xs font-bold rounded-full border border-red-100">
                      חיסכון {discount}%
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-[#555] leading-relaxed mb-8 text-[0.95rem]">{product.shortDescription}</p>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-[#E4DDD2] rounded-2xl overflow-hidden bg-[#F8F7F3]">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-4 py-3.5 hover:bg-[#EDE9E2] transition-colors cursor-pointer text-[#555] hover:text-[#111]" aria-label="הפחת כמות">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-[#111] font-bold min-w-[44px] text-center" style={{ fontFamily: 'Rubik, sans-serif' }} aria-live="polite">{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  className="px-4 py-3.5 hover:bg-[#EDE9E2] transition-colors cursor-pointer text-[#555] hover:text-[#111]" aria-label="הוסף כמות">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button ref={mainCartBtnRef} onClick={handleAdd} disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer ${
                  added            ? 'bg-tn-600 text-white shadow-[0_4px_16px_rgba(31,77,58,0.30)]' :
                  !product.inStock ? 'bg-[#E4E4E4] text-[#AAA] cursor-not-allowed' :
                  'bg-tn-600 hover:bg-tn-800 text-white hover:shadow-[0_6px_22px_rgba(31,77,58,0.35)] hover:-translate-y-0.5'
                }`}
                style={{ fontFamily: 'Rubik, sans-serif', minHeight: '52px' }}>
                {added
                  ? <><Check className="w-4 h-4" aria-hidden="true" /> נוסף לסל!</>
                  : !product.inStock
                  ? 'אזל המלאי'
                  : <><ShoppingCart className="w-4 h-4" aria-hidden="true" /> הוסף לסל</>
                }
              </button>
            </div>

            {/* Secure checkout link */}
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm text-white mb-8 transition-all hover:bg-tn-800 hover:shadow-[0_4px_16px_rgba(31,77,58,0.28)]"
              style={{ background: '#1F4D3A', fontFamily: 'Rubik, sans-serif' }}
            >
              <Lock className="w-4 h-4" aria-hidden="true" />
              לתשלום מאובטח
            </Link>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 p-5 bg-[#F8F7F3] rounded-2xl border border-[#E4DDD2]">
              {[
                { icon: Truck,     text: 'משלוח עד הבית',    sub: 'חינם מ-₪300'        },
                { icon: RotateCcw, text: '30 יום החזרה',     sub: 'ללא שאלות'           },
                { icon: Lock,      text: 'תשלום מאובטח',     sub: 'Tranzila · PCI DSS'  },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center">
                  <div className="w-9 h-9 rounded-xl bg-tn-600/8 flex items-center justify-center" aria-hidden="true">
                    <Icon className="w-4 h-4 text-tn-600" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#111] leading-tight" style={{ fontFamily: 'Rubik, sans-serif' }}>{text}</p>
                    <p className="text-[10px] text-[#888] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Description + Benefits ──────────────────────────────────── */}
      <div className="bg-[#F8F7F3] border-y border-[#E4DDD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-12">
          <div dir="rtl">
            <p className="overline text-tn-500 mb-3">אודות המוצר</p>
            <h2 className="heading-sm text-[#111] mb-5">תיאור המוצר</h2>
            <p className="text-[#555] leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>
          <div dir="rtl">
            <p className="overline text-tn-500 mb-3">למה לבחור בו</p>
            <h2 className="heading-sm text-[#111] mb-5">יתרונות עיקריים</h2>
            <ul className="space-y-3.5">
              {(product.benefits ?? []).map((b, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="w-5 h-5 rounded-full bg-tn-600/10 flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <Check className="w-3 h-3 text-tn-600" strokeWidth={2.5} />
                  </span>
                  <span className="text-[#555] text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Specifications ──────────────────────────────────────────── */}
      {(product.specs?.length ?? 0) > 0 && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" dir="rtl">
        <p className="overline text-tn-500 mb-3">פרטים טכניים</p>
        <h2 className="heading-sm text-[#111] mb-6">מפרט טכני</h2>
        <div className="border border-[#E4DDD2] rounded-2xl overflow-hidden max-w-xl">
          {(product.specs ?? []).map((spec, i) => (
            <div key={i} className={`grid grid-cols-2 gap-4 px-6 py-4 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F7F3]'}`}>
              <span className="font-semibold text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>{spec.label}</span>
              <span className="text-[#666]">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>}

      {/* ── Video ───────────────────────────────────────────────────── */}
      {product.videoUrl && (() => {
        const ytMatch = product.videoUrl!.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
        if (!ytMatch) return null;
        const embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" dir="rtl">
            <p className="overline text-tn-500 mb-3">סרטון מוצר</p>
            <h2 className="heading-sm text-[#111] mb-6">צפו במוצר בפעולה</h2>
            <div className="max-w-3xl aspect-video rounded-2xl overflow-hidden border border-[#E4DDD2] shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
              <iframe
                src={embedUrl}
                title={`סרטון: ${product.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        );
      })()}

      {/* ── FAQs ────────────────────────────────────────────────────── */}
      {(product.faqs?.length ?? 0) > 0 && (
      <div className="bg-[#F8F7F3] border-t border-[#E4DDD2]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14" dir="rtl">
          <p className="overline text-tn-500 mb-3 text-center">שאלות נפוצות על מוצר זה</p>
          <h2 className="heading-sm text-[#111] mb-8 text-center">שאלות ותשובות</h2>
          <div className="space-y-3">
            {(product.faqs ?? []).map((faq, i) => (
              <div key={i} className="border border-[#E4DDD2] rounded-2xl bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4.5 text-right cursor-pointer hover:bg-[#F8F7F3] transition-colors"
                  style={{ paddingTop: '16px', paddingBottom: '16px' }}
                  aria-expanded={openFaq === i}>
                  <span className="font-semibold text-[#111] text-sm" style={{ fontFamily: 'Rubik, sans-serif' }}>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#999] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-[#F0EBE4]">
                    <p className="text-sm text-[#555] leading-relaxed pt-3.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* ── Related products ────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
          <p className="overline text-tn-500 mb-3">ציוד נוסף</p>
          <h2 className="heading-sm text-[#111] mb-8">אולי גם תאהבו</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {related.map((pr, i) => <ProductCard key={pr.id} product={pr} index={i} />)}
          </div>
        </div>
      )}

      {/* ── Recently viewed ─────────────────────────────────────────── */}
      {recentProducts.length > 0 && (
        <div className="bg-[#F8F7F3] border-t border-[#E4DDD2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-4 h-4 text-[#888]" aria-hidden="true" />
              <p className="text-sm font-bold text-[#888] uppercase tracking-wider">צפית לאחרונה</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {recentProducts.map((pr, i) => <ProductCard key={pr.id} product={pr} index={i} />)}
            </div>
          </div>
        </div>
      )}

      {/* ── Sticky mobile Add to Cart ────────────────────────────────── */}
      {stickyVisible && (
        <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-white border-t border-[#E4DDD2] px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] safe-area-pb" dir="rtl">
          <div className="flex items-center gap-3 max-w-lg mx-auto">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#888] truncate">{p.name}</p>
              <p className="font-black text-[#111] text-lg leading-tight" style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                ₪{p.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleAdd}
              disabled={!p.inStock}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-2xl transition-all duration-200 cursor-pointer flex-shrink-0 ${
                added ? 'bg-tn-600 text-white' :
                !p.inStock ? 'bg-[#E4E4E4] text-[#AAA] cursor-not-allowed' :
                'bg-tn-600 hover:bg-tn-800 text-white'
              }`}
              style={{ fontFamily: 'Rubik, sans-serif', minHeight: '48px' }}
            >
              {added ? <Check className="w-4 h-4" aria-hidden="true" /> : <ShoppingCart className="w-4 h-4" aria-hidden="true" />}
              {added ? 'נוסף לסל!' : p.inStock ? 'הוסף לסל' : 'אזל המלאי'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
