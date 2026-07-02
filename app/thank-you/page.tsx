import Link from 'next/link';
import { CheckCircle, Package, Phone, Mail, ShoppingBag } from 'lucide-react';
import { getSupabase } from '@/lib/supabase-server';
import type { Order } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ order_id?: string }>;
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { order_id } = await searchParams;

  let order: Order | null = null;

  if (order_id) {
    const supabase = getSupabase();
    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', order_id)
      .single();
    order = data;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex flex-col items-center justify-center gap-6 px-4 text-center" dir="rtl">
        <ShoppingBag className="w-12 h-12 text-[#888]" />
        <div>
          <h1 className="text-2xl font-bold text-[#111] mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>לא נמצאה הזמנה</h1>
          <p className="text-[#888]">מספר ההזמנה אינו תקין.</p>
        </div>
        <Link href="/shop" className="px-6 py-3 bg-tn-600 text-white font-bold text-sm rounded-xl hover:bg-tn-800 transition-colors" style={{ fontFamily: 'Rubik, sans-serif' }}>
          לחנות
        </Link>
      </div>
    );
  }

  const isPaid = order.payment_status === 'paid';

  return (
    <div className="min-h-screen bg-[#F8F7F3]" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-[212px] pb-16 lg:pt-[228px] lg:pb-20">

        {/* Success banner */}
        <div className={`rounded-2xl p-6 text-center mb-6 ${isPaid ? 'bg-tn-600' : 'bg-[#F59E0B]'}`}>
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>
            {isPaid ? 'ההזמנה התקבלה בהצלחה!' : 'ההזמנה נרשמה!'}
          </h1>
          <p className="text-white/80 text-sm">
            {isPaid
              ? 'תודה על הרכישה. נשלח אישור למייל שלך בקרוב.'
              : 'אנחנו מעבדים את התשלום. תקבלו אישור בקרוב.'}
          </p>
        </div>

        {/* Order number */}
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-[#888] uppercase tracking-wider">מספר הזמנה</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-bold"
              style={{ background: isPaid ? '#D1FAE5' : '#FEF3C7', color: isPaid ? '#065F46' : '#92400E' }}>
              {isPaid ? 'שולם' : 'ממתין לאישור'}
            </span>
          </div>
          <p className="text-xl font-black text-tn-600 tracking-wide" style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
            {order.order_id}
          </p>
          <p className="text-xs text-[#888] mt-1">
            {new Date(order.created_at).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Ordered items */}
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5 mb-4">
          <h2 className="font-bold text-[#111] mb-4 flex items-center gap-2" style={{ fontFamily: 'Rubik, sans-serif' }}>
            <Package className="w-4 h-4 text-tn-600" aria-hidden="true" />
            המוצרים שהוזמנו
          </h2>
          <div className="space-y-3">
            {order.items_json.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.image && (
                  <div className="w-12 h-12 rounded-xl bg-[#F8F7F3] border border-[#E4DDD2] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#111] line-clamp-2" style={{ fontFamily: 'Rubik, sans-serif' }}>{item.name}</p>
                  <p className="text-xs text-[#888]">כמות: {item.quantity}</p>
                </div>
                <span className="text-sm font-bold text-[#111]">₪{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#E4DDD2] mt-4 pt-4 space-y-1.5 text-sm">
            <div className="flex justify-between text-[#888]">
              <span>סכום ביניים</span>
              <span className="text-[#111]">₪{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#888]">
              <span>משלוח</span>
              <span className={order.shipping === 0 ? 'text-tn-600 font-semibold' : 'text-[#111]'}>
                {order.shipping === 0 ? 'חינם' : `₪${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-[#111] text-base pt-1.5 border-t border-[#E4DDD2]">
              <span>סה"כ ששולם</span>
              <span>₪{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Customer details */}
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>פרטי משלוח</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2"><dt className="text-[#888] w-20 flex-shrink-0">שם:</dt><dd className="text-[#111] font-medium">{order.customer_name}</dd></div>
            <div className="flex gap-2"><dt className="text-[#888] w-20 flex-shrink-0">כתובת:</dt><dd className="text-[#111]">{order.address}, {order.city}</dd></div>
            {order.notes && <div className="flex gap-2"><dt className="text-[#888] w-20 flex-shrink-0">הערות:</dt><dd className="text-[#111]">{order.notes}</dd></div>}
          </dl>
        </div>

        {/* Contact + CTA */}
        <div className="text-center space-y-4">
          <p className="text-sm text-[#666]">שאלות? דברו איתנו:</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href="mailto:campil.info@gmail.com" className="flex items-center gap-1.5 text-tn-600 hover:underline font-medium">
              <Mail className="w-4 h-4" />
              campil.info@gmail.com
            </a>
          </div>
          <Link
            href="/shop"
            className="inline-block mt-4 px-8 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            המשך קנייה
          </Link>
        </div>

      </div>
    </div>
  );
}
