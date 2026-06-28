'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MergedProduct } from '@/lib/admin-products';
import type { Category } from '@/lib/types';
import type { Supplier } from '@/lib/admin-products';
import { profitMargin } from '@/lib/admin-products';

interface Props {
  products: MergedProduct[];
  categories: Category[];
  suppliers: Supplier[];
}

const BADGE_LABELS: Record<string, string> = {
  new: 'חדש',
  sale: 'מבצע',
  bestseller: 'מומלץ',
  limited: 'מוגבל',
};

type SupplierStatus = 'missing' | 'verified' | 'needs_review' | 'low_margin';

function getSupplierStatus(p: MergedProduct): SupplierStatus {
  const hasName = !!p.supplier_name;
  const hasCost = p.supplier_cost_price != null && p.supplier_cost_price > 0;
  if (!hasName && !hasCost) return 'missing';
  if (hasName && hasCost) {
    const m = profitMargin(p.price, p.supplier_cost_price);
    if (m != null && m < 25) return 'low_margin';
    return 'verified';
  }
  return 'needs_review';
}

const STATUS_LABELS: Record<SupplierStatus, string> = {
  missing: 'Missing Supplier',
  verified: 'ספק מאומת',
  needs_review: 'לבדיקה',
  low_margin: 'מרווח נמוך',
};

const STATUS_COLORS: Record<SupplierStatus, string> = {
  missing: 'bg-gray-100 text-gray-500',
  verified: 'bg-green-100 text-green-700',
  needs_review: 'bg-yellow-100 text-yellow-700',
  low_margin: 'bg-red-100 text-red-700',
};

export default function AdminProductListClient({ products, categories, suppliers }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [supplierFilter, setSupplierFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter(p => {
      if (!showHidden && p.hidden) return false;
      if (catFilter && p.categorySlug !== catFilter) return false;
      if (supplierFilter && p.supplier_id !== supplierFilter) return false;
      if (stockFilter === 'in' && !p.inStock) return false;
      if (stockFilter === 'out' && p.inStock) return false;
      if (statusFilter && getSupplierStatus(p) !== statusFilter) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.sku.toLowerCase().includes(q) && !p.brand?.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, search, catFilter, supplierFilter, stockFilter, statusFilter, showHidden]);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleDelete(slug: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'שגיאה');
      showToast('המוצר הוסתר בהצלחה', true);
      setDeleteSlug(null);
      router.refresh();
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'שגיאה', false);
    } finally {
      setDeleting(false);
    }
  }

  async function handleRestore(slug: string) {
    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hidden: false }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'שגיאה');
      showToast('המוצר שוחזר', true);
      router.refresh();
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'שגיאה', false);
    }
  }

  const hiddenCount = products.filter(p => p.hidden).length;

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">מוצרים</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} מוצרים בסה&quot;כ · {filtered.length} מוצגים</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-5 flex flex-wrap gap-3 items-center">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="חיפוש לפי שם / מק&quot;ט / מותג..."
          className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">כל הקטגוריות</option>
          {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <select
          value={supplierFilter}
          onChange={e => setSupplierFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">כל הספקים</option>
          {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select
          value={stockFilter}
          onChange={e => setStockFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">מלאי — הכל</option>
          <option value="in">במלאי</option>
          <option value="out">אזל</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">סטטוס ספק — הכל</option>
          <option value="missing">Missing Supplier</option>
          <option value="verified">ספק מאומת</option>
          <option value="needs_review">לבדיקה</option>
          <option value="low_margin">מרווח נמוך (&lt;25%)</option>
        </select>
        {hiddenCount > 0 && (
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input type="checkbox" checked={showHidden} onChange={e => setShowHidden(e.target.checked)} className="rounded" />
            הצג מוסתרים ({hiddenCount})
          </label>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 w-[260px]">מוצר</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">קטגוריה</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">מחיר מכירה</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">עלות</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">מרווח</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">ספק</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">סטטוס ספק</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">מלאי</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700 w-[110px]">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-400">לא נמצאו מוצרים</td>
                </tr>
              )}
              {filtered.map(p => {
                const margin = profitMargin(p.price, p.supplier_cost_price);
                const supStatus = getSupplierStatus(p);
                return (
                  <tr key={p.slug} className={`hover:bg-gray-50 transition-colors ${p.hidden ? 'opacity-50' : ''}`}>
                    {/* Product */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {p.image && (
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate max-w-[190px]">{p.name}</div>
                          <div className="text-gray-400 text-xs">{p.sku}</div>
                          {p.badge && (
                            <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded font-medium mt-0.5 ${
                              p.badge === 'sale' ? 'bg-red-100 text-red-700' :
                              p.badge === 'new' ? 'bg-blue-100 text-blue-700' :
                              p.badge === 'bestseller' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>{BADGE_LABELS[p.badge] ?? p.badge}</span>
                          )}
                          {p.hidden && <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600 mr-1">מוסתר</span>}
                        </div>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                      {categories.find(c => c.slug === p.categorySlug)?.name ?? p.category}
                    </td>
                    {/* Selling price */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-900">₪{p.price.toLocaleString('he-IL')}</span>
                      {p.originalPrice && (
                        <div className="text-xs text-gray-400 line-through">₪{p.originalPrice.toLocaleString('he-IL')}</div>
                      )}
                    </td>
                    {/* Cost */}
                    <td className="py-3 px-4 whitespace-nowrap text-gray-600">
                      {p.supplier_cost_price != null
                        ? `₪${p.supplier_cost_price.toLocaleString('he-IL')}`
                        : <span className="text-gray-300">—</span>}
                    </td>
                    {/* Margin */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {margin != null ? (
                        <span className={`font-semibold ${margin >= 40 ? 'text-green-600' : margin >= 20 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {margin}%
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    {/* Supplier */}
                    <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                      {p.supplier_name ?? <span className="text-gray-300">—</span>}
                    </td>
                    {/* Supplier Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[supStatus]}`}>
                        {STATUS_LABELS[supStatus]}
                      </span>
                    </td>
                    {/* Stock */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                        {p.inStock ? 'במלאי' : 'אזל'}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${p.slug}`}
                          className="text-xs px-2.5 py-1.5 rounded-lg bg-green-700 text-white hover:bg-green-800 transition-colors whitespace-nowrap"
                        >
                          עריכה
                        </Link>
                        {p.hidden ? (
                          <button
                            onClick={() => handleRestore(p.slug)}
                            className="text-xs px-2.5 py-1.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                          >
                            שחזר
                          </button>
                        ) : (
                          <button
                            onClick={() => setDeleteSlug(p.slug)}
                            className="text-xs px-2.5 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                          >
                            הסתר
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteSlug && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" dir="rtl">
            <h3 className="font-bold text-lg text-gray-900 mb-2">הסתרת מוצר</h3>
            <p className="text-gray-600 mb-5">המוצר יוסתר מהחנות. ניתן לשחזר אותו מהרשימה.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteSlug)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? 'מסתיר...' : 'הסתר'}
              </button>
              <button
                onClick={() => setDeleteSlug(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg z-50 ${toast.ok ? 'bg-green-700' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
