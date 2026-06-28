export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';
import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import { products } from '@/lib/products';
import { SupplierResearchRow, calcLandedCostIls, calcMargin } from '@/lib/supplier-research';

const CATEGORY_LABELS: Record<string, string> = {
  camping:                'קמפינג',
  'camp-kitchen':         'מטבח שטח',
  'vehicle-gear':         'ציוד רכב',
  'lighting-power':       'תאורה ואנרגיה',
  sleeping:               'קמפינג ושינה',
  'water-showers':        'מים ומקלחות',
  'sleeping-comfort':     'שינה ונוחות',
  'storage-organization': 'אחסון וארגון',
  'safety-emergency':     'בטיחות וחירום',
  'fishing-leisure':      'דיג ופנאי',
};

function marginColor(m: number) {
  if (m >= 40) return 'text-emerald-600 font-bold';
  if (m >= 30) return 'text-amber-600 font-bold';
  return 'text-gray-500';
}

export default async function LaunchCatalogPage() {
  await getAdminUser();
  const supabase = getSupabase();

  const { data: researchData } = await supabase
    .from('supplier_research')
    .select('*')
    .eq('optimization', 'keep');

  const researchMap = new Map<string, SupplierResearchRow>();
  for (const row of (researchData ?? []) as SupplierResearchRow[]) {
    researchMap.set(row.product_slug, row);
  }

  const launchProducts = products
    .map((p) => {
      const r = researchMap.get(p.slug);
      if (!r) return null;
      const landed = calcLandedCostIls(r);
      const margin = landed != null ? calcMargin(p.price, r) : null;
      if (margin == null || margin < 30) return null;
      return { ...p, research: r, landed, margin };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .sort((a, b) => b.margin - a.margin);

  const byCategory = new Map<string, typeof launchProducts>();
  for (const p of launchProducts) {
    const cat = p.categorySlug ?? p.category;
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat)!.push(p);
  }

  const totalRevenuePotential = launchProducts.reduce((s, p) => s + p.price, 0);
  const avgMargin = launchProducts.length
    ? Math.round(launchProducts.reduce((s, p) => s + p.margin, 0) / launchProducts.length)
    : 0;

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
              🚀 קטלוג לאנץ׳
            </h1>
            <p className="text-[#888] text-sm mt-0.5">
              {launchProducts.length} מוצרים מומלצים ליום הפתיחה · מרג׳ין ≥30% · ספק מאומת
            </p>
          </div>
          <Link href="/admin/product-optimization"
            className="text-xs font-bold text-tn-600 hover:underline">
            דוח אופטימיזציה מלא ←
          </Link>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-7">
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-4">
          <p className="text-2xl font-black text-emerald-600" style={{ fontFamily: 'Rubik, sans-serif' }}>
            {launchProducts.length}
          </p>
          <p className="text-xs text-[#888]">מוצרים בקטלוג</p>
        </div>
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-4">
          <p className="text-2xl font-black text-tn-600" style={{ fontFamily: 'Rubik, sans-serif' }}>
            {avgMargin}%
          </p>
          <p className="text-xs text-[#888]">מרג׳ין ממוצע</p>
        </div>
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-4 col-span-2 sm:col-span-1">
          <p className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
            {byCategory.size}
          </p>
          <p className="text-xs text-[#888]">קטגוריות</p>
        </div>
      </div>

      {/* Notice */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm text-amber-800">
        <strong>המלצה בלבד — לא בוצע שינוי אוטומטי.</strong> מוצרים אלו מומלצים לפתיחת החנות בהתבסס על מחקר ספקים ומרג׳ין ≥30%. לאישור — פנה לעדכון הקטלוג ידנית.
      </div>

      {/* Products by category */}
      {Array.from(byCategory.entries()).map(([catSlug, catProducts]) => (
        <div key={catSlug} className="mb-8">
          <h2 className="text-base font-black text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>
            {CATEGORY_LABELS[catSlug] ?? catSlug}
            <span className="text-xs font-normal text-[#888] mr-2">{catProducts.length} מוצרים</span>
          </h2>
          <div className="bg-white border border-[#E4DDD2] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#F5F3EF] text-xs text-[#888]">
                  <th className="py-3 px-4 text-right font-semibold">מוצר</th>
                  <th className="py-3 px-4 text-center font-semibold">מחיר מכירה</th>
                  <th className="py-3 px-4 text-center font-semibold">עלות נחתת</th>
                  <th className="py-3 px-4 text-center font-semibold">מרג׳ין</th>
                  <th className="py-3 px-4 text-center font-semibold">ספק</th>
                  <th className="py-3 px-4 text-center font-semibold">משלוח לישראל</th>
                </tr>
              </thead>
              <tbody>
                {catProducts.map((p, i) => (
                  <tr key={p.slug}
                    className={`border-b border-[#F5F3EF] last:border-0 hover:bg-[#FAFAF8] transition-colors ${i % 2 === 0 ? '' : 'bg-[#FDFCFB]'}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F3EF]">
                          <Image src={p.image} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[#111] truncate max-w-[180px]">{p.name}</p>
                          <p className="text-[10px] text-[#999]">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-xs font-bold text-[#111]">
                      ₪{p.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-[#666]">
                      ₪{p.landed!.toLocaleString()}
                    </td>
                    <td className={`py-3 px-4 text-center text-xs ${marginColor(p.margin)}`}>
                      {p.margin}%
                    </td>
                    <td className="py-3 px-4 text-center text-xs text-[#555]">
                      {p.research.supplier_name ?? '—'}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        p.research.ships_to_israel
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {p.research.ships_to_israel ? '✓ כן' : '✗ לא'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Footer note */}
      <div className="p-4 bg-[#F5F3EF] rounded-2xl text-xs text-[#888] text-center">
        סך {launchProducts.length} מוצרים · {byCategory.size} קטגוריות · מרג׳ין ממוצע {avgMargin}% ·
        שווי קטלוג ₪{totalRevenuePotential.toLocaleString()} (מחירי מכירה)
      </div>
    </div>
  );
}
