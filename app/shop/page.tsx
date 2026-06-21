'use client';
import { useState, useMemo } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { products, categories } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

const SORT_OPTIONS = [
  { label: 'מומלצים',            value: 'featured'   },
  { label: 'מחיר: מהנמוך לגבוה', value: 'price-asc'  },
  { label: 'מחיר: מהגבוה לנמוך', value: 'price-desc' },
  { label: 'מדורגים',            value: 'rating'     },
  { label: 'חדשים',              value: 'new'        },
];

export default function ShopPage() {
  const [search, setSearch]   = useState('');
  const [cat, setCat]         = useState('all');
  const [sort, setSort]       = useState('featured');

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== 'all') list = list.filter(p => p.categorySlug === cat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.tags ?? []).some(t => t.toLowerCase().includes(q))
      );
    }
    if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);
    if (sort === 'new')        list.sort((a, b) => (a.badge === 'new' ? -1 : b.badge === 'new' ? 1 : 0));
    return list;
  }, [search, cat, sort]);

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
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888] pointer-events-none" aria-hidden="true" />
            <label htmlFor="shop-search" className="sr-only">חיפוש מוצרים</label>
            <input id="shop-search" type="search" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="חיפוש מוצרים..."
              className="w-full pl-9 pr-8 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] placeholder-[#888] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20" />
            {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#111] cursor-pointer" aria-label="Clear search"><X className="w-3.5 h-3.5" /></button>}
          </div>

          <div className="relative">
            <label htmlFor="shop-cat" className="sr-only">קטגוריה</label>
            <select id="shop-cat" value={cat} onChange={e => setCat(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 cursor-pointer">
              <option value="all">כל הקטגוריות</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#888] pointer-events-none" aria-hidden="true" />
          </div>

          <div className="relative">
            <label htmlFor="shop-sort" className="sr-only">מיון לפי</label>
            <select id="shop-sort" value={sort} onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 cursor-pointer">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#888] pointer-events-none" aria-hidden="true" />
          </div>

          <p className="text-sm text-[#888] ml-auto hidden sm:block">{filtered.length} מוצרים</p>
        </div>
      </div>

      {/* Category pills */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex gap-2 flex-wrap">
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
            <p className="text-[#888] mb-6">נסה לשנות את החיפוש או הסינון.</p>
            <button onClick={() => { setSearch(''); setCat('all'); }}
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
