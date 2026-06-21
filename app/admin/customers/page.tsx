import { getAdminUser } from '@/lib/supabase-session';
import { getSupabase } from '@/lib/supabase-server';
import type { Order } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'לקוחות | CampIL Admin' };

interface Customer {
  name: string;
  email: string;
  phone: string;
  city: string;
  orderCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default async function CustomersPage() {
  await getAdminUser();

  const supabase = getSupabase();
  const { data } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const orders = (data as Order[]) ?? [];

  // Build customer map from orders
  const customerMap = new Map<string, Customer>();
  orders.forEach(order => {
    const key = order.email.toLowerCase();
    if (!customerMap.has(key)) {
      customerMap.set(key, {
        name: order.customer_name,
        email: order.email,
        phone: order.phone,
        city: order.city,
        orderCount: 0,
        totalSpent: 0,
        lastOrderDate: order.created_at,
      });
    }
    const c = customerMap.get(key)!;
    c.orderCount++;
    if (order.payment_status === 'paid') c.totalSpent += order.total;
    if (order.created_at > c.lastOrderDate) c.lastOrderDate = order.created_at;
  });

  const customers = Array.from(customerMap.values())
    .sort((a, b) => b.totalSpent - a.totalSpent);

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
          לקוחות
        </h1>
        <p className="text-[#888] text-sm">
          {customers.length} לקוחות ייחודיים · הכנסות ₪{totalRevenue.toLocaleString()}
        </p>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-12 text-center">
          <p className="text-[#888]">אין לקוחות עדיין</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden sm:block bg-white border border-[#E4DDD2] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E4DDD2] text-right">
                  {['שם', 'אימייל', 'טלפון', 'עיר', 'הזמנות', 'סה"כ שילם', 'הזמנה אחרונה'].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-bold text-[#888] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F3EF]">
                {customers.map(c => (
                  <tr key={c.email} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#111]">{c.name}</td>
                    <td className="px-4 py-3 text-[#555] text-xs" dir="ltr">{c.email}</td>
                    <td className="px-4 py-3 text-[#555] text-xs" dir="ltr">{c.phone}</td>
                    <td className="px-4 py-3 text-[#777]">{c.city}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {c.orderCount}
                      </span>
                    </td>
                    <td
                      className="px-4 py-3 font-black text-tn-600"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      ₪{c.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#888]">
                      {new Date(c.lastOrderDate).toLocaleDateString('he-IL')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-3">
            {customers.map(c => (
              <div key={c.email} className="bg-white border border-[#E4DDD2] rounded-2xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-[#111]">{c.name}</p>
                    <p className="text-xs text-[#555]" dir="ltr">{c.email}</p>
                    <p className="text-xs text-[#555]" dir="ltr">{c.phone}</p>
                  </div>
                  <p
                    className="font-black text-tn-600 text-lg"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    ₪{c.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 text-xs text-[#888]">
                  <span>{c.city}</span>
                  <span>·</span>
                  <span>{c.orderCount} הזמנות</span>
                  <span>·</span>
                  <span>{new Date(c.lastOrderDate).toLocaleDateString('he-IL')}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
