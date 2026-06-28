'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { EnrichedProduct, SupplierResearchRow } from '@/lib/supplier-research';
import { calcLandedCostIls, calcMargin, USD_TO_ILS } from '@/lib/supplier-research';

type Tab = 'all' | 'top' | 'no-supplier' | 'low-margin' | 'dropship';
type StatusFilter = 'all' | 'verified' | 'needs_review' | 'not_available';

interface Props {
  products: EnrichedProduct[];
}

const STATUS_LABELS: Record<string, string> = {
  verified: 'מאומת',
  needs_review: 'לבדיקה',
  not_available: 'לא זמין',
};
const STATUS_COLORS: Record<string, string> = {
  verified: 'bg-green-100 text-green-800',
  needs_review: 'bg-yellow-100 text-yellow-800',
  not_available: 'bg-red-100 text-red-800',
};

function marginColor(m: number | null): string {
  if (m == null) return 'text-gray-400';
  if (m >= 40) return 'text-green-700 font-semibold';
  if (m >= 20) return 'text-yellow-600 font-semibold';
  return 'text-red-600 font-semibold';
}

function marginBg(m: number | null): string {
  if (m == null) return '';
  if (m >= 40) return 'bg-green-50';
  if (m >= 20) return 'bg-yellow-50';
  return 'bg-red-50';
}

export default function SupplierResearchClient({ products }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [noteSlug, setNoteSlug] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);
  const [statusChanging, setStatusChanging] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))].sort();
    return cats;
  }, [products]);

  // Compute margins once
  const withMargins = useMemo(() => products.map(p => {
    const m = p.research ? calcMargin(p.price, p.research) : null;
    const landedCost = p.research ? calcLandedCostIls(p.research) : null;
    return { ...p, margin: m, landedCost };
  }), [products]);

  const filtered = useMemo(() => {
    let list = withMargins;

    if (tab === 'top') {
      list = [...withMargins]
        .filter(p => p.margin != null)
        .sort((a, b) => (b.margin ?? -999) - (a.margin ?? -999))
        .slice(0, 20);
    } else if (tab === 'no-supplier') {
      list = withMargins.filter(p => !p.research || p.research.status === 'not_available');
    } else if (tab === 'low-margin') {
      list = withMargins.filter(p => p.margin != null && p.margin < 20);
    } else if (tab === 'dropship') {
      list = withMargins.filter(p =>
        p.research &&
        p.research.ships_to_israel &&
        p.margin != null && p.margin >= 20 &&
        p.research.status !== 'not_available'
      ).sort((a, b) => (b.margin ?? 0) - (a.margin ?? 0));
    }

    if (statusFilter !== 'all') {
      list = list.filter(p => p.research?.status === statusFilter);
    }
    if (categoryFilter !== 'all') {
      list = list.filter(p => p.category === categoryFilter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.research?.supplier_name ?? '').toLowerCase().includes(q) ||
        (p.research?.manufacturer_name ?? '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [withMargins, tab, statusFilter, categoryFilter, search]);

  // Stats
  const stats = useMemo(() => {
    const researched = withMargins.filter(p => p.research);
    const positive = withMargins.filter(p => p.margin != null && p.margin > 0);
    const healthy = withMargins.filter(p => p.margin != null && p.margin >= 40);
    const avgMargin = positive.length
      ? Math.round(positive.reduce((s, p) => s + (p.margin ?? 0), 0) / positive.length)
      : 0;
    return {
      total: withMargins.length,
      researched: researched.length,
      healthy: healthy.length,
      avgMargin,
      noSupplier: withMargins.filter(p => !p.research || p.research.status === 'not_available').length,
      lowMargin: withMargins.filter(p => p.margin != null && p.margin < 20).length,
      dropship: withMargins.filter(p => p.research?.ships_to_israel && p.margin != null && p.margin >= 20).length,
    };
  }, [withMargins]);

  async function updateStatus(slug: string, status: SupplierResearchRow['status']) {
    setStatusChanging(slug);
    try {
      const res = await fetch(`/api/admin/supplier-research/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      showToast('הסטטוס עודכן', true);
      router.refresh();
    } catch {
      showToast('שגיאה בעדכון', false);
    } finally {
      setStatusChanging(null);
    }
  }

  async function saveNote(slug: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/supplier-research/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ research_notes: noteText }),
      });
      if (!res.ok) throw new Error();
      showToast('הערה נשמרה', true);
      setNoteSlug(null);
      router.refresh();
    } catch {
      showToast('שגיאה', false);
    } finally {
      setSaving(false);
    }
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'all',         label: 'כל המוצרים',           count: stats.total },
    { key: 'top',         label: 'מרווח הכי גבוה (TOP 20)', count: 20 },
    { key: 'dropship',    label: 'מומלץ לדרופשיפ',         count: stats.dropship },
    { key: 'low-margin',  label: 'מרווח נמוך (<20%)',       count: stats.lowMargin },
    { key: 'no-supplier', label: 'ללא ספק',                 count: stats.noSupplier },
  ];

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">מחקר ספקים</h1>
        <p className="text-sm text-gray-500 mt-1">ניתוח רווחיות על בסיס נתוני שוק אמיתיים — שע&quot;ח: 1$ = ₪{USD_TO_ILS}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="מוצרים שנחקרו" value={`${stats.researched}/${stats.total}`} color="text-blue-700" />
        <StatCard label="מרווח בריא (≥40%)" value={stats.healthy} color="text-green-700" />
        <StatCard label="מרווח נמוך (<20%)" value={stats.lowMargin} color="text-red-600" />
        <StatCard label="מומלץ לדרופשיפ" value={stats.dropship} color="text-purple-700" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap mb-4 border-b border-gray-200 pb-0">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg -mb-px transition-colors ${
              tab === t.key
                ? 'border border-gray-200 border-b-white bg-white text-green-800'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            <span className={`mr-1.5 text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="חיפוש מוצר / ספק..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="all">כל הקטגוריות</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as StatusFilter)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="all">כל הסטטוסים</option>
          <option value="verified">מאומת</option>
          <option value="needs_review">לבדיקה</option>
          <option value="not_available">לא זמין</option>
        </select>
        <span className="text-sm text-gray-500 self-center">{filtered.length} תוצאות</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-right px-4 py-3 font-semibold text-gray-700">מוצר</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-700">יצרן</th>
              <th className="text-right px-3 py-3 font-semibold text-gray-700">ספק</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">ישראל?</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">מחיר מכירה</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">עלות מחיר $</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">עלות נחיתה ₪</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">מרווח</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">סטטוס</th>
              <th className="text-center px-3 py-3 font-semibold text-gray-700">פעולות</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-12 text-gray-400">לא נמצאו תוצאות</td>
              </tr>
            )}
            {filtered.map((p, i) => {
              const r = p.research;
              const margin = p.margin;
              return (
                <tr key={p.slug} className={`hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  {/* Product */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {p.image && (
                          <Image src={p.image} alt={p.name} width={40} height={40} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate max-w-[180px]">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* Manufacturer */}
                  <td className="px-3 py-3">
                    {r ? (
                      <div>
                        <p className="text-gray-800 text-xs font-medium">{r.manufacturer_name ?? '—'}</p>
                        <p className="text-gray-400 text-xs">{r.manufacturer_country ?? ''}</p>
                      </div>
                    ) : <span className="text-gray-300">—</span>}
                  </td>

                  {/* Supplier */}
                  <td className="px-3 py-3">
                    {r?.supplier_name ? (
                      <div>
                        {r.supplier_website ? (
                          <a href={r.supplier_website} target="_blank" rel="noopener noreferrer"
                            className="text-green-700 hover:underline text-xs font-medium">
                            {r.supplier_name}
                          </a>
                        ) : (
                          <p className="text-xs font-medium text-gray-800">{r.supplier_name}</p>
                        )}
                        <p className="text-xs text-gray-400">{r.supplier_country ?? ''}</p>
                      </div>
                    ) : <span className="text-gray-300 text-xs">לא נמצא</span>}
                  </td>

                  {/* Ships to Israel */}
                  <td className="px-3 py-3 text-center">
                    {r == null ? (
                      <span className="text-gray-300">—</span>
                    ) : r.ships_to_israel ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      <span className="text-red-500 font-bold">✗</span>
                    )}
                  </td>

                  {/* Selling price */}
                  <td className="px-3 py-3 text-center">
                    <span className="font-semibold text-gray-900">₪{p.price.toLocaleString('he-IL')}</span>
                    {r?.retail_price_usd && (
                      <p className="text-xs text-gray-400">${r.retail_price_usd} מומלץ</p>
                    )}
                  </td>

                  {/* Cost USD */}
                  <td className="px-3 py-3 text-center">
                    {r?.cost_price_usd != null ? (
                      <div>
                        <span className="text-gray-800">${r.cost_price_usd}</span>
                        {r.shipping_cost_usd ? (
                          <p className="text-xs text-gray-400">+${r.shipping_cost_usd} משלוח</p>
                        ) : null}
                      </div>
                    ) : <span className="text-gray-300">—</span>}
                  </td>

                  {/* Landed cost ILS */}
                  <td className="px-3 py-3 text-center">
                    {p.landedCost != null ? (
                      <span className="text-gray-800">₪{p.landedCost.toLocaleString('he-IL')}</span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>

                  {/* Margin */}
                  <td className={`px-3 py-3 text-center ${marginBg(margin)}`}>
                    {margin != null ? (
                      <span className={marginColor(margin)}>
                        {margin > 0 ? '+' : ''}{margin}%
                      </span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3 text-center">
                    {r ? (
                      <select
                        value={r.status}
                        disabled={statusChanging === p.slug}
                        onChange={e => updateStatus(p.slug, e.target.value as SupplierResearchRow['status'])}
                        className={`text-xs px-2 py-1 rounded-full border-0 cursor-pointer font-semibold ${STATUS_COLORS[r.status] ?? ''}`}
                      >
                        <option value="verified">מאומת</option>
                        <option value="needs_review">לבדיקה</option>
                        <option value="not_available">לא זמין</option>
                      </select>
                    ) : <span className="text-gray-300 text-xs">לא נחקר</span>}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {r?.supplier_product_url && (
                        <a
                          href={r.supplier_product_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors whitespace-nowrap"
                        >
                          עמוד ספק
                        </a>
                      )}
                      <Link
                        href={`/admin/products/${p.slug}`}
                        className="text-xs px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      >
                        עריכה
                      </Link>
                      <button
                        onClick={() => {
                          setNoteSlug(p.slug);
                          setNoteText(r?.research_notes ?? '');
                        }}
                        className="text-xs px-2 py-1 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-700 transition-colors"
                      >
                        הערה
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Report Summary (shown on relevant tabs) */}
      {tab === 'top' && (
        <ReportBanner
          title="TOP 20 מוצרים לפי מרווח"
          body="המוצרים עם הפוטנציאל הגבוה ביותר לרווחיות, ממוינים לפי אחוז מרווח גולמי על בסיס עלות ספק + משלוח מול מחיר מכירה."
          color="green"
        />
      )}
      {tab === 'dropship' && (
        <ReportBanner
          title="מוצרים מומלצים לדרופשיפינג"
          body="מוצרים עם ספק שמשלח לישראל, מרווח ≥20% ועם מידע ספק זמין. ניתן להתחיל למכור את אלו מיד עם הסכם ספק."
          color="purple"
        />
      )}
      {tab === 'low-margin' && (
        <ReportBanner
          title="מוצרים עם מרווח נמוך / שלילי"
          body="מחירי המכירה הנוכחיים של מוצרים אלו עלולים לגרום להפסד. יש לשקול עדכון מחיר, מציאת ספק זול יותר, או הסרה מהקטלוג."
          color="red"
        />
      )}

      {/* Note modal */}
      {noteSlug && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md" dir="rtl">
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              הערת מחקר — {withMargins.find(p => p.slug === noteSlug)?.name}
            </h3>
            <textarea
              rows={6}
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="הוסף הערות על הספק, המחיר, זמינות, ועוד..."
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => saveNote(noteSlug)}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
              >
                {saving ? 'שומר...' : 'שמור'}
              </button>
              <button
                onClick={() => setNoteSlug(null)}
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

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

function ReportBanner({ title, body, color }: { title: string; body: string; color: 'green' | 'red' | 'purple' }) {
  const colors = {
    green: 'bg-green-50 border-green-200 text-green-900',
    red: 'bg-red-50 border-red-200 text-red-900',
    purple: 'bg-purple-50 border-purple-200 text-purple-900',
  };
  return (
    <div className={`mt-4 rounded-xl border p-4 text-sm ${colors[color]}`}>
      <p className="font-semibold mb-1">{title}</p>
      <p className="opacity-80">{body}</p>
    </div>
  );
}
