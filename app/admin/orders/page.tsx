import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import type { Order } from '@/lib/supabase-server';
import FulfillmentPanel from '@/components/admin/FulfillmentPanel';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'הזמנות | CampIL Admin' };

const STATUS_LABELS: Record<string, string> = {
  new: 'חדשה', processing: 'בעיבוד', shipped: 'נשלחה',
  delivered: 'נמסרה', cancelled: 'בוטלה',
};
const PAYMENT_LABELS: Record<string, string> = {
  pending: 'ממתין', paid: 'שולם', failed: 'נכשל', refunded: 'הוחזר',
};
const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700', processing: 'bg-yellow-100 text-yellow-700',
  shipped: 'bg-purple-100 text-purple-700', delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const PAYMENT_COLORS: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-600', paid: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700', refunded: 'bg-orange-100 text-orange-700',
};
const FILTER_LABELS: Record<string, string> = {
  all: 'הכל', new: 'חדשות', processing: 'בעיבוד', shipped: 'נשלחו',
  delivered: 'נמסרו', cancelled: 'בוטלו',
};

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function OrdersPage({ searchParams }: Props) {
  await getAdminUser();
  const { status } = await searchParams;

  const supabase = getSupabase();
  let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (status && status !== 'all') query = query.eq('order_status', status);

  const { data, error } = await query;
  const orders = (data as Order[]) ?? [];

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
          הזמנות
        </h1>
        <p className="text-[#888] text-sm">{orders.length} הזמנות · בזמן אמת</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {Object.entries(FILTER_LABELS).map(([s, label]) => (
          <a
            key={s}
            href={`/admin/orders?status=${s}`}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
              (status ?? 'all') === s
                ? 'bg-[#0F2E24] text-white'
                : 'bg-white border border-[#E4DDD2] text-[#555] hover:border-[#0F2E24] hover:text-[#0F2E24]'
            }`}
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            {label}
          </a>
        ))}
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          שגיאה: {error.message}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-12 text-center">
          <p className="text-[#888]">אין הזמנות להצגה</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-[#E4DDD2] rounded-2xl p-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div>
                  <p className="font-black text-tn-600 text-base" style={{ fontFamily: 'Rubik, sans-serif' }}>
                    {order.order_id}
                  </p>
                  <p className="text-xs text-[#888] mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('he-IL', {
                      year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.order_status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {STATUS_LABELS[order.order_status] ?? order.order_status}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${PAYMENT_COLORS[order.payment_status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {PAYMENT_LABELS[order.payment_status] ?? order.payment_status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5">לקוח</p>
                  <p className="text-sm font-semibold text-[#111]">{order.customer_name}</p>
                  <p className="text-xs text-[#555]">{order.phone}</p>
                  <p className="text-xs text-[#555]">{order.email}</p>
                  <p className="text-xs text-[#777] mt-0.5">{order.address}, {order.city}</p>
                  {order.notes && <p className="text-xs text-[#888] italic mt-1">"{order.notes}"</p>}
                </div>

                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5">מוצרים</p>
                  <ul className="space-y-1">
                    {order.items_json.map((item, i) => (
                      <li key={i} className="text-xs text-[#333]">
                        <span className="font-semibold">{item.quantity}×</span> {item.name}
                        <span className="text-[#888] mr-1">— ₪{(item.price * item.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1.5">סיכום</p>
                  <p
                    className="text-lg font-black text-[#111]"
                    style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}
                  >
                    ₪{order.total.toLocaleString()}
                  </p>
                  {order.shipping > 0 && (
                    <p className="text-xs text-[#888]">
                      סכום ביניים ₪{order.subtotal.toLocaleString()} + משלוח ₪{order.shipping}
                    </p>
                  )}
                  {order.shipping === 0 && (
                    <p className="text-xs text-[#888]">כולל משלוח חינם</p>
                  )}
                  {order.tranzila_transaction_id && (
                    <p className="text-xs text-[#CCC] mt-1">Tranzila: {order.tranzila_transaction_id}</p>
                  )}
                </div>
              </div>

              {order.payment_status === 'paid' && (
                <FulfillmentPanel order={order} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
