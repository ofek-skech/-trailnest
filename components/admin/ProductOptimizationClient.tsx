'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  TrendingUp, RefreshCw, Trash2, CheckCircle, Rocket,
  AlertCircle, ChevronDown, ChevronUp, ExternalLink,
} from 'lucide-react';
import { EnrichedProduct, calcLandedCostIls, calcMargin } from '@/lib/supplier-research';

type Tab = 'all' | 'keep' | 'reprice' | 'replace' | 'remove' | 'launch';

const TABS: { id: Tab; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'all',     label: 'הכל',          icon: <TrendingUp className="w-4 h-4" />,  color: 'text-white' },
  { id: 'keep',    label: '✅ שמור',      icon: <CheckCircle className="w-4 h-4" />, color: 'text-emerald-400' },
  { id: 'reprice', label: '💰 תמחר מחדש', icon: <RefreshCw className="w-4 h-4" />,  color: 'text-amber-400' },
  { id: 'replace', label: '🔄 החלף',      icon: <RefreshCw className="w-4 h-4" />,  color: 'text-blue-400' },
  { id: 'remove',  label: '❌ הסר',       icon: <Trash2 className="w-4 h-4" />,     color: 'text-red-400' },
  { id: 'launch',  label: '🚀 קטלוג ל런ץ׳', icon: <Rocket className="w-4 h-4" />,   color: 'text-purple-400' },
];

const CATEGORY_LABELS: Record<string, string> = {
  camping:              'קמפינג',
  'camp-kitchen':       'מטבח שדה',
  'vehicle-gear':       'ציוד רכב',
  lighting:             'תאורה ואנרגיה',
  'sleeping-comfort':   'שינה ונוחות',
  'water-showers':      'מים ומקלחות',
  'storage-organization': 'אחסון וארגון',
  'safety-emergency':   'בטיחות וחירום',
  'fishing-leisure':    'דיג ופנאי',
};

function marginColor(m: number | null) {
  if (m == null) return 'text-gray-400';
  if (m >= 40) return 'text-emerald-400 font-bold';
  if (m >= 25) return 'text-yellow-400';
  return 'text-red-400';
}

function OptBadge({ opt }: { opt: string | null }) {
  if (!opt) return <span className="text-gray-500 text-xs">—</span>;
  const map: Record<string, string> = {
    keep:    'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
    reprice: 'bg-amber-900/50 text-amber-300 border border-amber-700',
    replace: 'bg-blue-900/50 text-blue-300 border border-blue-700',
    remove:  'bg-red-900/50 text-red-300 border border-red-700',
  };
  const labels: Record<string, string> = {
    keep: 'שמור', reprice: 'תמחר', replace: 'החלף', remove: 'הסר',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[opt] ?? ''}`}>
      {labels[opt] ?? opt}
    </span>
  );
}

function AlternativesPanel({ alts }: { alts: { name: string; url: string; reason: string }[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {alts.map((a, i) => (
        <li key={i} className="bg-blue-950/40 rounded-lg p-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-blue-300 font-semibold">{a.name}</span>
            <a href={a.url} target="_blank" rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-200">
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-gray-400 mt-0.5">{a.reason}</p>
        </li>
      ))}
    </ul>
  );
}

function ProductRow({ p }: { p: EnrichedProduct }) {
  const [expanded, setExpanded] = useState(false);
  const r = p.research;
  const landed = r ? calcLandedCostIls(r) : null;
  const margin = r ? calcMargin(p.price, r) : null;
  const newMargin = r?.recommended_price
    ? calcMargin(r.recommended_price, r)
    : null;

  return (
    <>
      <tr className="border-b border-white/5 hover:bg-white/3 transition-colors">
        <td className="py-2 px-3">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0 bg-white/5">
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate max-w-[160px]">{p.name}</p>
              <p className="text-[10px] text-gray-500">{CATEGORY_LABELS[p.category] ?? p.category}</p>
            </div>
          </div>
        </td>
        <td className="py-2 px-3 text-center">
          <OptBadge opt={r?.optimization ?? null} />
        </td>
        <td className="py-2 px-3 text-center text-xs text-white">₪{p.price}</td>
        <td className="py-2 px-3 text-center text-xs text-gray-400">
          {landed != null ? `₪${landed}` : '—'}
        </td>
        <td className={`py-2 px-3 text-center text-xs ${marginColor(margin)}`}>
          {margin != null ? `${margin}%` : '—'}
        </td>
        <td className="py-2 px-3 text-center text-xs text-amber-300">
          {r?.recommended_price ? `₪${r.recommended_price}` : '—'}
        </td>
        <td className={`py-2 px-3 text-center text-xs ${marginColor(newMargin)}`}>
          {newMargin != null ? `${newMargin}%` : '—'}
        </td>
        <td className="py-2 px-3 text-center">
          {(r?.optimization_notes || r?.alternatives?.length) ? (
            <button onClick={() => setExpanded(!expanded)}
              className="text-gray-400 hover:text-white transition-colors">
              {expanded
                ? <ChevronUp className="w-4 h-4" />
                : <ChevronDown className="w-4 h-4" />}
            </button>
          ) : null}
        </td>
      </tr>
      {expanded && r && (
        <tr className="border-b border-white/5 bg-[#0a1f18]">
          <td colSpan={8} className="px-4 pb-3 pt-1">
            {r.optimization_notes && (
              <p className="text-xs text-gray-300 mb-2">{r.optimization_notes}</p>
            )}
            {r.alternatives && r.alternatives.length > 0 && (
              <AlternativesPanel alts={r.alternatives} />
            )}
            {r.research_notes && (
              <p className="text-[10px] text-gray-500 mt-2 italic">{r.research_notes}</p>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default function ProductOptimizationClient({ products }: { products: EnrichedProduct[] }) {
  const [tab, setTab] = useState<Tab>('all');

  const stats = useMemo(() => {
    const counts = { keep: 0, reprice: 0, replace: 0, remove: 0, unresearched: 0 };
    let totalMargin = 0, marginCount = 0;
    for (const p of products) {
      const r = p.research;
      if (!r) { counts.unresearched++; continue; }
      const opt = r.optimization;
      if (opt === 'keep')    counts.keep++;
      else if (opt === 'reprice') counts.reprice++;
      else if (opt === 'replace') counts.replace++;
      else if (opt === 'remove')  counts.remove++;
      const m = calcMargin(p.price, r);
      if (m != null) { totalMargin += m; marginCount++; }
    }
    return { ...counts, avgMargin: marginCount > 0 ? Math.round(totalMargin / marginCount) : 0 };
  }, [products]);

  const topProfit = useMemo(() => {
    return products
      .filter(p => p.research?.optimization === 'keep')
      .map(p => ({ ...p, margin: calcMargin(p.price, p.research!) }))
      .filter(p => p.margin != null)
      .sort((a, b) => (b.margin! - a.margin!))
      .slice(0, 5);
  }, [products]);

  const filtered = useMemo(() => {
    if (tab === 'all') return products;
    if (tab === 'launch') {
      return products.filter(p => {
        if (!p.research) return false;
        const opt = p.research.optimization;
        const m = calcMargin(p.price, p.research);
        return opt === 'keep' && m != null && m >= 30;
      });
    }
    return products.filter(p => p.research?.optimization === tab);
  }, [products, tab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
          דוח אופטימיזציית מוצרים
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          ניתוח {products.length} מוצרים · המלצות לפעולה · לא מבוצע שינוי ללא אישורך
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: '✅ שמור', value: stats.keep, bg: 'bg-emerald-900/30 border-emerald-700/40' },
          { label: '💰 תמחר מחדש', value: stats.reprice, bg: 'bg-amber-900/30 border-amber-700/40' },
          { label: '🔄 החלף', value: stats.replace, bg: 'bg-blue-900/30 border-blue-700/40' },
          { label: '❌ הסר', value: stats.remove, bg: 'bg-red-900/30 border-red-700/40' },
          { label: 'מרג׳ין ממוצע', value: `${stats.avgMargin}%`, bg: 'bg-white/5 border-white/10' },
        ].map(({ label, value, bg }) => (
          <div key={label} className={`rounded-xl p-4 border ${bg}`}>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Top profit products */}
      {tab === 'all' && topProfit.length > 0 && (
        <div className="bg-[#0F2E24]/60 rounded-2xl border border-white/8 p-4">
          <h2 className="text-sm font-bold text-white mb-3">🏆 מוצרים עם מרג׳ין גבוה ביותר</h2>
          <div className="flex flex-wrap gap-2">
            {topProfit.map(p => (
              <div key={p.slug} className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                <div className="relative w-6 h-6 rounded overflow-hidden bg-white/10 flex-shrink-0">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white max-w-[120px] truncate">{p.name}</p>
                  <p className={`text-xs font-bold ${marginColor(p.margin)}`}>{p.margin}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              tab === t.id
                ? 'bg-white/15 border-white/20 text-white'
                : 'bg-white/3 border-white/8 text-white/50 hover:text-white/80'
            }`}
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            {t.label}
            <span className="text-xs opacity-60">
              ({t.id === 'all'
                ? products.length
                : t.id === 'launch'
                  ? products.filter(p => {
                      if (!p.research) return false;
                      const m = calcMargin(p.price, p.research);
                      return p.research.optimization === 'keep' && m != null && m >= 30;
                    }).length
                  : products.filter(p => p.research?.optimization === t.id).length
              })
            </span>
          </button>
        ))}
      </div>

      {/* Launch catalog description */}
      {tab === 'launch' && (
        <div className="flex items-start gap-3 bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
          <Rocket className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-purple-300">קטלוג ברירת מחדל ללאנץ׳</p>
            <p className="text-xs text-gray-400 mt-1">
              מוצרים עם סטטוס ״שמור״ ומרג׳ין ≥30%. אלו המוצרים המומלצים לפתיחת החנות.
            </p>
          </div>
        </div>
      )}

      {/* Products table */}
      <div className="bg-[#0F2E24]/40 rounded-2xl border border-white/8 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="border-b border-white/8 text-xs text-gray-400">
              <th className="py-3 px-3 text-right font-semibold">מוצר</th>
              <th className="py-3 px-3 text-center font-semibold">פעולה</th>
              <th className="py-3 px-3 text-center font-semibold">מחיר נוכחי</th>
              <th className="py-3 px-3 text-center font-semibold">עלות נחתת</th>
              <th className="py-3 px-3 text-center font-semibold">מרג׳ין עכשיו</th>
              <th className="py-3 px-3 text-center font-semibold">מחיר מומלץ</th>
              <th className="py-3 px-3 text-center font-semibold">מרג׳ין חדש</th>
              <th className="py-3 px-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-500 text-sm">
                  אין מוצרים בקטגוריה זו
                </td>
              </tr>
            ) : (
              filtered.map(p => <ProductRow key={p.slug} p={p} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-3 bg-amber-900/20 border border-amber-700/30 rounded-xl p-4">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-300">המלצות בלבד — לא בוצע שינוי</p>
          <p className="text-xs text-gray-400 mt-1">
            דף זה מציג ניתוח ספקים והמלצות בלבד. כל שינוי במחירים או קטלוג דורש אישורך ידני.
          </p>
        </div>
      </div>
    </div>
  );
}
