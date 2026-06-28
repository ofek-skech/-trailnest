import Link from 'next/link';
import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import type { Order } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'לוח מחוונים | CampIL Admin' };

interface OptCounts { keep: number; reprice: number; replace: number; remove: number }

const STATUS_LABELS: Record<string, string> = {
  new: 'חדשה', processing: 'בעיבוד', shipped: 'נשלחה',
  delivered: 'נמסרה', cancelled: 'בוטלה',
};
const PAYMENT_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-gray-100 text-gray-500',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-orange-100 text-orange-700',
};

export default async function DashboardPage() {
  await getAdminUser();

  let orders: Order[] = [];
  let configError: string | null = null;
  let optCounts: OptCounts = { keep: 0, reprice: 0, replace: 0, remove: 0 };

  try {
    const supabase = getSupabase();
    const [ordersRes, optRes] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('supplier_research').select('optimization'),
    ]);
    if (ordersRes.error) throw ordersRes.error;
    orders = (ordersRes.data as Order[]) ?? [];
    for (const row of (optRes.data ?? []) as { optimization: string | null }[]) {
      const k = row.optimization as keyof OptCounts | null;
      if (k && k in optCounts) optCounts[k]++;
    }
  } catch (err: unknown) {
    configError = err instanceof Error ? err.message : String(err);
  }

  const paid = orders.filter(o => o.payment_status === 'paid');
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  const pendingFulfillment = paid.filter(
    o => !o.fulfillment_status || o.fulfillment_status === 'pending_review'
  ).length;
  const recent = orders.slice(0, 12);

  const quickStats = [
    { label: 'סה"כ הזמנות', value: orders.length, color: 'text-[#111]' },
    { label: 'שולמו',        value: paid.length,   color: 'text-green-600' },
    { label: 'הכנסות',       value: `₪${revenue.toLocaleString()}`, color: 'text-tn-600' },
    { label: 'ממתינות למילוי', value: pendingFulfillment, color: pendingFulfillment > 0 ? 'text-orange-600' : 'text-[#888]' },
  ];

  const sections = [
    { href: '/admin/orders',    label: 'הזמנות',       count: orders.length,            bg: 'bg-blue-50   border-blue-200   text-blue-700'   },
    { href: '/admin/products',  label: 'מוצרים',       count: null,                     bg: 'bg-green-50  border-green-200  text-green-700'  },
    { href: '/admin/customers', label: 'לקוחות',       count: new Set(orders.map(o => o.email)).size, bg: 'bg-purple-50 border-purple-200 text-purple-700' },
    { href: '/admin/analytics', label: 'אנליטיקה',     count: null,                     bg: 'bg-amber-50  border-amber-200  text-amber-700'  },
  ];

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      {configError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm font-mono text-red-800 whitespace-pre-wrap break-all">
          <strong className="block mb-1">⚠️ שגיאת הגדרות שרת</strong>
          {configError}
        </div>
      )}
      <div className="mb-7">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
          לוח מחוונים
        </h1>
        <p className="text-[#888] text-sm mt-0.5">CampIL Admin · בזמן אמת</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {quickStats.map(s => (
          <div key={s.label} className="bg-white border border-[#E4DDD2] rounded-2xl p-4">
            <p
              className={`text-2xl font-black mb-0.5 ${s.color}`}
              style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}
            >
              {s.value}
            </p>
            <p className="text-xs text-[#888]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
        {sections.map(s => (
          <Link
            key={s.href}
            href={s.href}
            className={`p-4 border rounded-2xl text-center transition-opacity hover:opacity-75 ${s.bg}`}
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            <p className="text-xl font-black">{s.count ?? '→'}</p>
            <p className="text-xs font-bold mt-0.5">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Optimization summary */}
      {(optCounts.keep + optCounts.reprice + optCounts.replace + optCounts.remove) > 0 && (
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
              דוח אופטימיזציית מוצרים
            </h2>
            <div className="flex gap-2">
              <Link href="/admin/product-optimization"
                className="text-xs font-bold text-tn-600 hover:underline">
                דוח מלא ←
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/admin/launch-catalog"
                className="text-xs font-bold text-purple-600 hover:underline">
                🚀 קטלוג לאנץ׳ ←
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: '✅ שמור כמות', value: optCounts.keep,    href: '/admin/product-optimization', bg: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
              { label: '💰 לתמחור מחדש', value: optCounts.reprice, href: '/admin/product-optimization', bg: 'bg-amber-50 border-amber-200 text-amber-800' },
              { label: '🔄 להחלפה',     value: optCounts.replace, href: '/admin/product-optimization', bg: 'bg-blue-50 border-blue-200 text-blue-800' },
              { label: '❌ להסרה',      value: optCounts.remove,  href: '/admin/product-optimization', bg: 'bg-red-50 border-red-200 text-red-800' },
            ].map(s => (
              <Link key={s.label} href={s.href}
                className={`p-4 border rounded-2xl text-center transition-opacity hover:opacity-75 ${s.bg}`}
                style={{ fontFamily: 'Rubik, sans-serif' }}>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-xs font-bold mt-0.5">{s.label}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-white border border-[#E4DDD2] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E4DDD2]">
          <h2 className="font-black text-[#111] text-sm" style={{ fontFamily: 'Rubik, sans-serif' }}>
            הזמנות אחרונות
          </h2>
          <Link href="/admin/orders" className="text-xs text-tn-600 font-bold hover:underline">
            כל ההזמנות ←
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="py-10 text-center text-[#888] text-sm">אין הזמנות עדיין</p>
        ) : (
          <div className="divide-y divide-[#F5F3EF]">
            {recent.map(order => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3 gap-4 text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-bold text-tn-600 text-xs whitespace-nowrap">{order.order_id}</span>
                  <span className="text-[#333] truncate">{order.customer_name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[#888] text-xs hidden sm:block">
                    {new Date(order.created_at).toLocaleDateString('he-IL')}
                  </span>
                  <span
                    className="font-bold text-[#111] text-xs"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    ₪{order.total.toLocaleString()}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${PAYMENT_COLORS[order.payment_status] ?? 'bg-gray-100 text-gray-500'}`}>
                    {order.payment_status === 'paid' ? 'שולם' : STATUS_LABELS[order.order_status] ?? order.order_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
