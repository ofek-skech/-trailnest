'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const SORT_OPTIONS = [
  { label: 'מומלצים',            value: 'featured'   },
  { label: 'פופולריים ביותר',    value: 'popularity' },
  { label: 'חדשים',              value: 'new'        },
  { label: 'מחיר: מהנמוך לגבוה', value: 'price-asc'  },
  { label: 'מחיר: מהגבוה לנמוך', value: 'price-desc' },
  { label: 'מדורגים',            value: 'rating'     },
];

const PRICE_RANGES = [
  { label: 'הכל',           min: 0,    max: Infinity },
  { label: 'עד ₪100',       min: 0,    max: 100      },
  { label: '₪100 – ₪300',   min: 100,  max: 300      },
  { label: '₪300 – ₪700',   min: 300,  max: 700      },
  { label: '₪700 – ₪1,500', min: 700,  max: 1500     },
  { label: 'מעל ₪1,500',    min: 1500, max: Infinity },
];

export default function ShopPage() {
  const [search, setSearch]         = useState('');
  const [cat, setCat]               = useState('all');
  const [sort, setSort]             = useState('featured');
  const [brand, setBrand]           = useState('all');
  const [priceRange, setPriceRange] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters]         = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => { if (p.brand) set.add(p.brand); });
    return Array.from(set).sort();
  }, []);

  const suggestions = useMemo(() => {
    if (!search.trim() || search.length < 2) return [];
    const q = search.toLowerCase();
    return products
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(q)) ||
        (p.brand ?? '').toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [search]);

  const { min: priceMin, max: priceMax } = PRICE_RANGES[priceRange];

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== 'all') list = list.filter(p => p.categorySlug === cat);
    if (brand !== 'all') list = list.filter(p => p.brand === brand);
    if (priceRange > 0) list = list.filter(p => p.price >= priceMin && p.price <= priceMax);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(q)) ||
        (p.brand ?? '').toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    if (sort === 'new')        list.sort((a, b) => (a.badge === 'new' ? -1 : b.badge === 'new' ? 1 : 0));
    if (sort === 'popularity') list.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
    return list;
  }, [search, cat, sort, brand, priceRange, priceMin, priceMax]);

  const activeFilters = (cat !== 'all' ? 1 : 0) + (brand !== 'all' ? 1 : 0) + (priceRange > 0 ? 1 : 0);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-white pt-[120px] pb-12 lg:pt-[140px] lg:pb-16" style={{ background: '#0F2E24' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline mb-3" style={{ color: '#D8C8A8', opacity: 0.7 }}>המוצרים שלנו</p>
          <h1 className="heading-lg text-white mb-4">כל הציוד שצריכים לשטח</h1>
          <p className="max-w-xl mx-auto text-[0.95rem]" style={{ color: 'rgba(255,255,255,0.65)' }}>נבחר על ידי אנשים שחיים את השטח — לנגב, לגליל, לגולן. מאוברלנדינג ועד קמפינג משפחתי.</p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[64px] lg:top-[80px] z-30 bg-white border-b border-[#E4DDD2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">

          {/* Search with autocomplete */}
          <div className="relative flex-1 min-w-[180px]" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none" aria-hidden="true" />
            <label htmlFor="shop-search" className="sr-only">חיפוש מוצרים</label>
            <input
              id="shop-search" type="search" value={search}
              onChange={e => { setSearch(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="חיפוש מוצרים, מותגים..."
              className="w-full pl-9 pr-8 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] placeholder-[#888] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20"
            />
            {search && (
              <button onClick={() => { setSearch(''); setShowSuggestions(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#111] cursor-pointer" aria-label="נקה חיפוש">
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Autocomplete dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E4DDD2] rounded-xl shadow-lg z-50 overflow-hidden">
                {suggestions.map(p => (
                  <button key={p.id}
                    onMouseDown={e => { e.preventDefault(); setSearch(p.name); setShowSuggestions(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8F7F3] transition-colors cursor-pointer">
                    <img src={p.image} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0 flex-1 text-right" dir="rtl">
                      <p className="text-[12px] font-semibold text-[#111] truncate" style={{ fontFamily: 'Rubik, sans-serif' }}>{p.name}</p>
                      {p.brand && <p className="text-[10px] text-[#888]">{p.brand}</p>}
                    </div>
                    <span className="text-[11px] font-bold text-tn-600 flex-shrink-0">₪{p.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="relative">
            <label htmlFor="shop-cat" className="sr-only">קטגוריה</label>
            <select id="shop-cat" value={cat} onChange={e => setCat(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 cursor-pointer">
              <option value="all">כל הקטגוריות</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#888] pointer-events-none" aria-hidden="true" />
          </div>

          {/* Sort */}
          <div className="relative">
            <label htmlFor="shop-sort" className="sr-only">מיון לפי</label>
            <select id="shop-sort" value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#888] pointer-events-none" aria-hidden="true" />
          </div>

          {/* Filters toggle */}
          <button onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-2.5 border rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
              showFilters || activeFilters > 0
                ? 'border-tn-600 text-tn-600 bg-tn-600/5'
                : 'border-[#E4DDD2] text-[#555] hover:border-tn-600 hover:text-tn-600'
            }`}>
            <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
            סינון
            {activeFilters > 0 && (
              <span className="w-4 h-4 rounded-full bg-tn-600 text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>

          <p className="text-sm text-[#888] ml-auto hidden sm:block">{filtered.length} מוצרים</p>
        </div>

        {/* Expanded filter panel */}
        {showFilters && (
          <div className="border-t border-[#E4DDD2] bg-[#FAFAF8]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-6 items-end">
              {/* Brand filter */}
              <div>
                <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-2">מותג</p>
                <div className="relative">
                  <select value={brand} onChange={e => setBrand(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 border border-[#E4DDD2] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 cursor-pointer">
                    <option value="all">כל המותגים</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#888] pointer-events-none" aria-hidden="true" />
                </div>
              </div>

              {/* Price range */}
              <div>
                <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-2">טווח מחיר</p>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((r, i) => (
                    <button key={r.label} onClick={() => setPriceRange(i)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer ${
                        priceRange === i
                          ? 'bg-tn-600 text-white border-tn-600'
                          : 'border-[#E4DDD2] text-[#555] hover:border-tn-600 hover:text-tn-600'
                      }`}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear filters */}
              {activeFilters > 0 && (
                <button onClick={() => { setCat('all'); setBrand('all'); setPriceRange(0); }}
                  className="flex items-center gap-1.5 text-sm text-[#C0392B] font-semibold hover:underline cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                  נקה סינון
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Category pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex gap-2 flex-wrap">
        <Link
          href="/shop/sale"
          className="px-4 py-1.5 rounded-full text-sm font-semibold border border-[#E4DDD2] text-[#C0392B] hover:border-[#C0392B] hover:bg-[#FDF0EE] transition-colors"
        >
          מבצעים
        </Link>
        {[{ slug: 'all', name: 'הכל' }, ...categories].map(c => (
          <button key={c.slug} onClick={() => setCat(c.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer ${cat === c.slug ? 'bg-tn-600 text-white border-tn-600' : 'border-[#E4DDD2] text-[#555] hover:border-tn-600 hover:text-tn-600'}`}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4" aria-hidden="true">🏕️</p>
            <h2 className="text-xl font-bold text-[#111] mb-2">לא נמצאו מוצרים</h2>
            <p className="text-[#888] mb-6">נסו לשנות את החיפוש או הסינון.</p>
            <button onClick={() => { setSearch(''); setCat('all'); setBrand('all'); setPriceRange(0); }}
              className="px-6 py-3 bg-tn-600 text-white font-bold text-sm rounded-xl hover:bg-tn-800 transition-colors cursor-pointer">
              נקה סינון
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
