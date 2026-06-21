import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import type { Order } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'אנליטיקה | CampIL Admin' };

const FULFILLMENT_LABELS: Record<string, string> = {
  pending_review:   'ממתין לבדיקה',
  ai_analyzed:      'AI בדק',
  pending_approval: 'ממתין לאישור',
  supplier_ordered: 'הוזמן מהספק',
  shipped:          'נשלח',
  completed:        'הושלם',
  problem:          'בעיה',
};
const FULFILLMENT_COLORS: Record<string, string> = {
  pending_review: 'bg-gray-400', ai_analyzed: 'bg-blue-400',
  pending_approval: 'bg-yellow-400', supplier_ordered: 'bg-purple-400',
  shipped: 'bg-indigo-400', completed: 'bg-green-500', problem: 'bg-red-400',
};

export default async function AnalyticsPage() {
  await getAdminUser();

  const supabase = getSupabase();
  const { data } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const orders = (data as Order[]) ?? [];
  const paid   = orders.filter(o => o.payment_status === 'paid');

  // ── Last 30 days revenue ──────────────────────────────────
  const now = new Date();
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().split('T')[0];
  });

  const revenueByDay = last30.map(date => ({
    date,
    revenue: paid
      .filter(o => o.created_at.startsWith(date))
      .reduce((s, o) => s + o.total, 0),
    count: paid.filter(o => o.created_at.startsWith(date)).length,
  }));
  const maxRevenue = Math.max(...revenueByDay.map(d => d.revenue), 1);

  // ── Summary stats ─────────────────────────────────────────
  const totalRevenue    = paid.reduce((s, o) => s + o.total, 0);
  const avgOrderValue   = paid.length > 0 ? Math.round(totalRevenue / paid.length) : 0;
  const uniqueCustomers = new Set(orders.map(o => o.email)).size;
  const thisMonthRevenue = paid
    .filter(o => o.created_at.startsWith(now.toISOString().slice(0, 7)))
    .reduce((s, o) => s + o.total, 0);

  // ── Fulfillment breakdown ─────────────────────────────────
  const fulfillmentCounts: Record<string, number> = {};
  orders.forEach(o => {
    const s = o.fulfillment_status || 'pending_review';
    fulfillmentCounts[s] = (fulfillmentCounts[s] ?? 0) + 1;
  });

  // ── Top products ──────────────────────────────────────────
  const productRevenue: Record<string, { name: string; revenue: number; count: number }> = {};
  paid.forEach(order => {
    order.items_json.forEach(item => {
      if (!productRevenue[item.id]) {
        productRevenue[item.id] = { name: item.name, revenue: 0, count: 0 };
      }
      productRevenue[item.id].revenue += item.price * item.quantity;
      productRevenue[item.id].count += item.quantity;
    });
  });
  const topProducts = Object.values(productRevenue)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8);
  const maxProductRevenue = Math.max(...topProducts.map(p => p.revenue), 1);

  // ── Top cities ────────────────────────────────────────────
  const cityCounts: Record<string, number> = {};
  orders.forEach(o => {
    cityCounts[o.city] = (cityCounts[o.city] ?? 0) + 1;
  });
  const topCities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
          אנליטיקה
        </h1>
        <p className="text-[#888] text-sm">נתונים לפי הזמנות שולמו</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
        {[
          { label: 'הכנסות סה"כ',     value: `₪${totalRevenue.toLocaleString()}`,     color: 'text-tn-600' },
          { label: 'החודש הנוכחי',     value: `₪${thisMonthRevenue.toLocaleString()}`, color: 'text-green-600' },
          { label: 'ממוצע הזמנה',      value: `₪${avgOrderValue.toLocaleString()}`,    color: 'text-blue-600' },
          { label: 'לקוחות ייחודיים', value: uniqueCustomers,                         color: 'text-purple-600' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E4DDD2] rounded-2xl p-4">
            <p className={`text-2xl font-black mb-0.5 ${s.color}`} style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
              {s.value}
            </p>
            <p className="text-xs text-[#888]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue bar chart */}
      <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5 mb-5">
        <h2 className="font-black text-sm text-[#111] mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
          הכנסות — 30 ימים אחרונים
        </h2>

        {revenueByDay.every(d => d.revenue === 0) ? (
          <p className="text-[#888] text-sm py-4">אין נתונים לתקופה זו</p>
        ) : (
          <div className="flex items-end gap-0.5 h-24 overflow-x-auto pb-1" dir="ltr">
            {revenueByDay.map(day => (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center gap-0.5 min-w-[6px]"
                title={`${day.date}: ₪${day.revenue.toLocaleString()} (${day.count} הזמנות)`}
              >
                <div
                  className="w-full bg-tn-600 rounded-t transition-all"
                  style={{
                    height: `${Math.max((day.revenue / maxRevenue) * 80, day.revenue > 0 ? 2 : 0)}px`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between text-xs text-[#CCC] mt-1.5" dir="ltr">
          <span>{last30[0]?.slice(5)}</span>
          <span>{last30[14]?.slice(5)}</span>
          <span>{last30[29]?.slice(5)}</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Top products */}
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5">
          <h2 className="font-black text-sm text-[#111] mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
            מוצרים מובילים (לפי הכנסה)
          </h2>
          {topProducts.length === 0 ? (
            <p className="text-[#888] text-sm">אין נתונים</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-[#333] truncate flex-1 ml-2">{p.name}</span>
                    <span className="text-xs font-bold text-tn-600 flex-shrink-0" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      ₪{p.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#F0EDE8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-tn-600 rounded-full"
                      style={{ width: `${(p.revenue / maxProductRevenue) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-[#AAA] mt-0.5">{p.count} יחידות</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top cities */}
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5">
          <h2 className="font-black text-sm text-[#111] mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
            ערים מובילות
          </h2>
          {topCities.length === 0 ? (
            <p className="text-[#888] text-sm">אין נתונים</p>
          ) : (
            <div className="space-y-2">
              {topCities.map(([city, count]) => (
                <div key={city} className="flex items-center justify-between">
                  <span className="text-sm text-[#333]">{city}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 bg-[#F0EDE8] rounded-full overflow-hidden w-24">
                      <div
                        className="h-full bg-purple-400 rounded-full"
                        style={{ width: `${(count / (topCities[0]?.[1] ?? 1)) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#555] w-4 text-left">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fulfillment status breakdown */}
      <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5">
        <h2 className="font-black text-sm text-[#111] mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
          סטטוס מילוי הזמנות
        </h2>
        {Object.keys(fulfillmentCounts).length === 0 ? (
          <p className="text-[#888] text-sm">אין נתונים</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {Object.entries(fulfillmentCounts).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${FULFILLMENT_COLORS[status] ?? 'bg-gray-300'}`} />
                <span className="text-sm text-[#333]">
                  {FULFILLMENT_LABELS[status] ?? status}
                </span>
                <span className="text-sm font-bold text-[#111]">{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
