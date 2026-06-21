'use client';

import { useState, useCallback } from 'react';
import type { Order } from '@/lib/supabase-server';
import type { AIRecommendation, CustomerMessageType } from '@/lib/ai-fulfillment';

interface Props {
  order: Order;
}

const FULFILLMENT_LABELS: Record<string, string> = {
  pending_review:   'ממתין לבדיקה',
  ai_analyzed:      'AI בדק',
  pending_approval: 'ממתין לאישור מנהל',
  supplier_ordered: 'הוזמן מהספק',
  shipped:          'נשלח ללקוח',
  completed:        'הושלם',
  problem:          'בעיה בהזמנה',
};

const FULFILLMENT_COLORS: Record<string, string> = {
  pending_review:   'bg-gray-100 text-gray-600',
  ai_analyzed:      'bg-blue-100 text-blue-700',
  pending_approval: 'bg-yellow-100 text-yellow-700',
  supplier_ordered: 'bg-purple-100 text-purple-700',
  shipped:          'bg-indigo-100 text-indigo-700',
  completed:        'bg-green-100 text-green-700',
  problem:          'bg-red-100 text-red-700',
};

const RISK_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  low:    { label: 'סיכון נמוך',   color: 'text-green-700', bg: 'bg-green-50',  border: 'border-green-200' },
  medium: { label: 'סיכון בינוני', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  high:   { label: 'סיכון גבוה',   color: 'text-red-700',   bg: 'bg-red-50',    border: 'border-red-200' },
};

const MSG_TYPE_LABELS: Record<CustomerMessageType, string> = {
  order_received:   'אישור קבלת הזמנה',
  supplier_ordered: 'הזמנה בדרך',
  tracking_received: 'קוד מעקב',
  delay:            'עיכוב',
  refund:           'החזר כספי',
};

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="text-xs px-3 py-1.5 rounded-lg bg-[#0F2E24] text-white hover:bg-[#1a4a35] transition-colors font-semibold"
      style={{ fontFamily: 'Rubik, sans-serif' }}
    >
      {copied ? 'הועתק ✓' : (label || 'העתק')}
    </button>
  );
}

export default function FulfillmentPanel({ order }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rec, setRec] = useState<AIRecommendation | null>(order.ai_recommendation);
  const [fulfillmentStatus, setFulfillmentStatus] = useState(order.fulfillment_status || 'pending_review');
  const [trackingInput, setTrackingInput] = useState(order.tracking_number || '');
  const [adminNotes, setAdminNotes] = useState(order.admin_notes || '');

  const [msgType, setMsgType] = useState<CustomerMessageType>('order_received');
  const [msgLoading, setMsgLoading] = useState(false);
  const [generatedMsg, setGeneratedMsg] = useState<{ whatsapp: string; email_subject: string; email_body: string } | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const runAI = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/analyze-order', {
        method: 'POST',
        headers,
        body: JSON.stringify({ orderId: order.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאה');
      setRec(data.recommendation);
      setFulfillmentStatus('ai_analyzed');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'שגיאה לא ידועה');
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  const updateStatus = useCallback(async (newStatus: string, extra?: { tracking?: string; notes?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/update-fulfillment-status', {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          orderId: order.id,
          fulfillmentStatus: newStatus,
          trackingNumber: extra?.tracking,
          adminNotes: extra?.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאה');
      setFulfillmentStatus(newStatus as typeof fulfillmentStatus);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'שגיאה לא ידועה');
    } finally {
      setLoading(false);
    }
  }, [order.id]);

  const generateMessage = useCallback(async () => {
    setMsgLoading(true);
    setGeneratedMsg(null);
    try {
      const res = await fetch('/api/admin/generate-customer-message', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          orderId: order.id,
          messageType: msgType,
          trackingNumber: trackingInput || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאה');
      setGeneratedMsg(data.message);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'שגיאה לא ידועה');
    } finally {
      setMsgLoading(false);
    }
  }, [order.id, msgType, trackingInput]);

  const statusCfg = RISK_CONFIG[rec?.risk_level || 'low'];
  const fStatus = FULFILLMENT_LABELS[fulfillmentStatus] || fulfillmentStatus;
  const fColor = FULFILLMENT_COLORS[fulfillmentStatus] || 'bg-gray-100 text-gray-600';

  return (
    <div className="border-t border-[#E4DDD2] mt-4 pt-4">
      {/* Fulfillment status + toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${fColor}`}>{fStatus}</span>
          {rec && (
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color} border ${statusCfg.border}`}>
              {statusCfg.label}
            </span>
          )}
        </div>
        <button
          onClick={() => setOpen(o => !o)}
          className="text-xs font-bold text-tn-600 hover:text-tn-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EDE8]"
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          {open ? 'סגור פאנל AI ▲' : 'פאנל AI מילוי הזמנה ▼'}
        </button>
      </div>

      {open && (
        <div className="mt-4 space-y-5" dir="rtl">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          {/* --- AI Analyze button --- */}
          {!rec && (
            <div className="p-4 bg-[#F8F7F3] border border-[#E4DDD2] rounded-xl">
              <p className="text-sm text-[#555] mb-3">
                AI יבדוק את פרטי ההזמנה, יאתר בעיות, ויכין המלצה לרכישה מספק.
              </p>
              <button
                onClick={runAI}
                disabled={loading}
                className="px-5 py-2.5 bg-tn-600 text-white text-sm font-bold rounded-xl hover:bg-tn-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {loading ? 'AI מנתח...' : 'נתח עם AI'}
              </button>
            </div>
          )}

          {/* --- AI Recommendation --- */}
          {rec && (
            <div className={`p-4 border rounded-xl ${statusCfg.bg} ${statusCfg.border}`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className={`font-black text-sm ${statusCfg.color}`} style={{ fontFamily: 'Rubik, sans-serif' }}>
                  AI המלצה להזמנה · {statusCfg.label}
                </h4>
                <button
                  onClick={runAI}
                  disabled={loading}
                  className="text-xs text-[#888] hover:text-[#444] underline"
                >
                  {loading ? 'טוען...' : 'עדכן ניתוח'}
                </button>
              </div>

              {/* Risk notes */}
              {rec.risk_notes.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1">הערות סיכון</p>
                  <ul className="space-y-0.5">
                    {rec.risk_notes.map((note, i) => (
                      <li key={i} className={`text-xs ${statusCfg.color}`}>• {note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Checks before ordering */}
              {rec.checks_before_ordering.length > 0 && (
                <div className="mb-3 p-3 bg-white/60 rounded-lg">
                  <p className="text-xs font-bold text-[#555] mb-1.5">מה לבדוק לפני הזמנה</p>
                  <ul className="space-y-1">
                    {rec.checks_before_ordering.map((check, i) => (
                      <li key={i} className="text-xs text-[#333] flex gap-1.5">
                        <span className="text-yellow-600 flex-shrink-0">□</span>
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Missing data */}
              {rec.missing_data.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-bold text-red-600 mb-1">מידע חסר</p>
                  {rec.missing_data.map((d, i) => (
                    <p key={i} className="text-xs text-red-600">⚠ {d}</p>
                  ))}
                </div>
              )}

              {/* Supplier + products */}
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-white/60 rounded-lg">
                  <p className="text-xs font-bold text-[#555] mb-1.5">ספק מומלץ</p>
                  <p className="text-sm font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>{rec.supplier_name}</p>
                  <p className="text-xs text-[#555] mt-1">זמן משלוח: ~{rec.estimated_shipping_days} ימים</p>
                </div>
                <div className="p-3 bg-white/60 rounded-lg">
                  <p className="text-xs font-bold text-[#555] mb-1.5">הערכת עלות ורווח</p>
                  <p className="text-sm text-[#333]">עלות: <span className="font-bold">₪{rec.estimated_total_cost_ils.toLocaleString()}</span></p>
                  <p className="text-sm text-green-700">רווח: <span className="font-bold">₪{rec.estimated_profit_ils.toLocaleString()}</span></p>
                </div>
              </div>

              {/* Products to order */}
              {rec.supplier_product_links.length > 0 && (
                <div className="mb-3 p-3 bg-white/60 rounded-lg">
                  <p className="text-xs font-bold text-[#555] mb-2">מוצרים להזמנה מהספק</p>
                  <div className="space-y-2">
                    {rec.supplier_product_links.map((link, i) => (
                      <div key={i} className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#111] truncate">{link.product_name}</p>
                          <p className="text-xs text-[#888]">חיפוש: {link.search_query} · ~₪{link.estimated_cost_ils}</p>
                        </div>
                        <CopyButton text={link.search_query} label="העתק חיפוש" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supplier order text */}
              <div className="mb-3 p-3 bg-white/60 rounded-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-bold text-[#555]">טקסט הזמנה לספק</p>
                  <CopyButton text={rec.supplier_order_text} label="העתק פרטי הזמנה" />
                </div>
                <pre className="text-xs text-[#333] whitespace-pre-wrap font-mono bg-white/80 p-2 rounded-lg leading-relaxed">
                  {rec.supplier_order_text}
                </pre>
              </div>

              {/* Formatted address */}
              <div className="mb-3 p-3 bg-white/60 rounded-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs font-bold text-[#555]">כתובת משלוח מפורמטת</p>
                  <CopyButton text={rec.formatted_address} />
                </div>
                <p className="text-xs font-mono text-[#333]">{rec.formatted_address}</p>
              </div>

              {rec.notes && (
                <p className="text-xs text-[#666] italic">{rec.notes}</p>
              )}
            </div>
          )}

          {/* --- Approval action --- */}
          {rec && fulfillmentStatus !== 'supplier_ordered' && fulfillmentStatus !== 'completed' && fulfillmentStatus !== 'shipped' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-800 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>
                אישור הזמנה מהספק
              </p>
              <p className="text-xs text-green-700 mb-3">
                לחיצה על הכפתור מאשרת שהוזמנת את המוצרים מהספק ידנית. הזמנה אוטומטית לא תתבצע.
              </p>
              <button
                onClick={() => updateStatus('supplier_ordered')}
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white text-sm font-black rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {loading ? 'מעדכן...' : 'אישרתי — הוזמן מהספק ✓'}
              </button>
            </div>
          )}

          {/* --- Tracking + shipped --- */}
          {(fulfillmentStatus === 'supplier_ordered' || fulfillmentStatus === 'shipped') && (
            <div className="p-4 bg-[#F8F7F3] border border-[#E4DDD2] rounded-xl">
              <p className="text-xs font-bold text-[#555] mb-2">מספר מעקב</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={e => setTrackingInput(e.target.value)}
                  placeholder="לדוגמה: IL123456789IL"
                  className="flex-1 text-sm px-3 py-2 border border-[#E4DDD2] rounded-lg focus:outline-none focus:border-tn-600"
                  style={{ fontFamily: 'Rubik, sans-serif', direction: 'ltr' }}
                />
                <button
                  onClick={() => updateStatus('shipped', { tracking: trackingInput })}
                  disabled={loading || !trackingInput}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {loading ? 'שומר...' : 'נשלח ✓'}
                </button>
              </div>
            </div>
          )}

          {/* --- Mark completed / problem --- */}
          {(fulfillmentStatus === 'shipped') && (
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus('completed')}
                disabled={loading}
                className="flex-1 py-2.5 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                הושלם ✓
              </button>
              <button
                onClick={() => updateStatus('problem')}
                disabled={loading}
                className="flex-1 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                בעיה בהזמנה ✗
              </button>
            </div>
          )}

          {/* --- Admin notes --- */}
          <div>
            <p className="text-xs font-bold text-[#555] mb-1.5">הערות מנהל</p>
            <div className="flex gap-2">
              <textarea
                value={adminNotes}
                onChange={e => setAdminNotes(e.target.value)}
                rows={2}
                placeholder="הערות פנימיות (לא נשלחות ללקוח)"
                className="flex-1 text-xs px-3 py-2 border border-[#E4DDD2] rounded-lg focus:outline-none focus:border-tn-600 resize-none"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              />
              <button
                onClick={() => updateStatus(fulfillmentStatus, { notes: adminNotes })}
                disabled={loading}
                className="px-3 py-2 bg-[#0F2E24] text-white text-xs font-bold rounded-lg hover:bg-[#1a4a35] transition-colors disabled:opacity-50 self-end"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                שמור
              </button>
            </div>
          </div>

          {/* --- Customer message generator --- */}
          <div className="p-4 bg-[#F8F7F3] border border-[#E4DDD2] rounded-xl">
            <p className="text-xs font-bold text-[#555] mb-3">יצירת הודעה ללקוח</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {(Object.keys(MSG_TYPE_LABELS) as CustomerMessageType[]).map(type => (
                <button
                  key={type}
                  onClick={() => { setMsgType(type); setGeneratedMsg(null); }}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    msgType === type
                      ? 'bg-tn-600 text-white'
                      : 'bg-white border border-[#E4DDD2] text-[#555] hover:border-tn-600'
                  }`}
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {MSG_TYPE_LABELS[type]}
                </button>
              ))}
            </div>
            <button
              onClick={generateMessage}
              disabled={msgLoading}
              className="px-4 py-2 bg-[#0F2E24] text-white text-xs font-bold rounded-lg hover:bg-[#1a4a35] transition-colors disabled:opacity-50"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              {msgLoading ? 'מייצר...' : 'צור הודעה'}
            </button>

            {generatedMsg && (
              <div className="mt-4 space-y-3">
                {/* WhatsApp */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-bold text-green-700">WhatsApp</p>
                    <CopyButton text={generatedMsg.whatsapp} />
                  </div>
                  <pre className="text-xs text-[#333] whitespace-pre-wrap leading-relaxed">{generatedMsg.whatsapp}</pre>
                </div>
                {/* Email */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs font-bold text-blue-700">אימייל — {generatedMsg.email_subject}</p>
                    <CopyButton text={`${generatedMsg.email_subject}\n\n${generatedMsg.email_body}`} />
                  </div>
                  <pre className="text-xs text-[#333] whitespace-pre-wrap leading-relaxed">{generatedMsg.email_body}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
