'use client';

import { useState } from 'react';
import { Plus, Pencil, Mail, Trash2, Check, X, AlertCircle, Package, Truck, CheckCircle } from 'lucide-react';
import type { SupplierOrderRow } from '@/app/admin/supplier-orders/page';
import type { SupplierOrderStatus } from '@/lib/supabase-server';

/* ── Status metadata ─────────────────────────────────────────────── */
const STATUS_META: Record<SupplierOrderStatus, { label: string; color: string; icon: React.ElementType }> = {
  ordered:    { label: 'הוזמן',   color: 'bg-blue-100 text-blue-700',   icon: Package },
  in_transit: { label: 'בדרך',    color: 'bg-amber-100 text-amber-700', icon: Truck },
  delivered:  { label: 'נמסר',    color: 'bg-green-100 text-green-700', icon: CheckCircle },
  problem:    { label: 'בעיה',    color: 'bg-red-100 text-red-700',     icon: AlertCircle },
};

const FILTER_TABS: Array<{ key: string; label: string }> = [
  { key: 'all',        label: 'הכל' },
  { key: 'ordered',    label: 'הוזמן' },
  { key: 'in_transit', label: 'בדרך' },
  { key: 'delivered',  label: 'נמסר' },
  { key: 'problem',    label: 'בעיה' },
];

/* ── Blank form ──────────────────────────────────────────────────── */
const BLANK_FORM = {
  campil_order_id: '',
  supplier_name: '',
  supplier_order_number: '',
  tracking_number: '',
  status: 'ordered' as SupplierOrderStatus,
  notes: '',
};

/* ── Component ───────────────────────────────────────────────────── */
interface Props {
  initialOrders: SupplierOrderRow[];
  emailConfigured: boolean;
}

export default function SupplierOrdersClient({ initialOrders, emailConfigured }: Props) {
  const [orders, setOrders]         = useState<SupplierOrderRow[]>(initialOrders);
  const [filter, setFilter]         = useState('all');
  const [modal, setModal]           = useState<'closed' | 'create' | string>('closed'); // string = id being edited
  const [form, setForm]             = useState(BLANK_FORM);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError]   = useState('');
  const [sendingId, setSendingId]   = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast]           = useState<{ text: string; ok: boolean } | null>(null);

  /* helpers */
  const showToast = (text: string, ok = true) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const openCreate = () => {
    setForm(BLANK_FORM);
    setFormError('');
    setModal('create');
  };

  const openEdit = (row: SupplierOrderRow) => {
    setForm({
      campil_order_id:      row.campil_order_id,
      supplier_name:        row.supplier_name,
      supplier_order_number: row.supplier_order_number ?? '',
      tracking_number:      row.tracking_number ?? '',
      status:               row.status,
      notes:                row.notes ?? '',
    });
    setFormError('');
    setModal(row.id);
  };

  const closeModal = () => setModal('closed');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  /* ── Create ─────────────────────────────────────────────────────── */
  const handleCreate = async () => {
    if (!form.campil_order_id.trim() || !form.supplier_name.trim()) {
      setFormError('מספר הזמנה CampIL ושם הספק הם שדות חובה.');
      return;
    }
    setFormLoading(true);
    setFormError('');
    try {
      const res = await fetch('/api/admin/supplier-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) { setFormError(json.error ?? 'שגיאה'); return; }
      setOrders(prev => [json.order, ...prev]);
      closeModal();
      showToast('הזמנת ספק נוספה בהצלחה');
    } finally {
      setFormLoading(false);
    }
  };

  /* ── Edit/save ──────────────────────────────────────────────────── */
  const handleSave = async () => {
    if (!form.supplier_name.trim()) { setFormError('שם הספק הוא שדה חובה.'); return; }
    setFormLoading(true);
    setFormError('');
    try {
      const res = await fetch(`/api/admin/supplier-orders/${modal}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          supplier_name:        form.supplier_name,
          supplier_order_number: form.supplier_order_number || null,
          tracking_number:      form.tracking_number || null,
          status:               form.status,
          notes:                form.notes || null,
        }),
      });
      const json = await res.json();
      if (!res.ok) { setFormError(json.error ?? 'שגיאה'); return; }

      // Preserve customer fields from the existing row
      const existing = orders.find(o => o.id === modal)!;
      setOrders(prev => prev.map(o => o.id === modal ? { ...existing, ...json.order } : o));
      closeModal();
      showToast('שינויים נשמרו');
    } finally {
      setFormLoading(false);
    }
  };

  /* ── Send email ─────────────────────────────────────────────────── */
  const handleSendEmail = async (row: SupplierOrderRow) => {
    setSendingId(row.id);
    try {
      const res = await fetch(`/api/admin/supplier-orders/${row.id}/send-email`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) { showToast(json.error ?? 'שגיאה בשליחה', false); return; }
      setOrders(prev => prev.map(o =>
        o.id === row.id
          ? { ...o, customer_notified_at: new Date().toISOString(), status: o.status === 'ordered' ? 'in_transit' : o.status }
          : o
      ));
      showToast(`אימייל נשלח ל-${json.email}`);
    } finally {
      setSendingId(null);
    }
  };

  /* ── Delete ─────────────────────────────────────────────────────── */
  const handleDelete = async (id: string) => {
    if (!confirm('למחוק את הזמנת הספק?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/supplier-orders/${id}`, { method: 'DELETE' });
      if (!res.ok) { showToast('שגיאה במחיקה', false); return; }
      setOrders(prev => prev.filter(o => o.id !== id));
      showToast('הזמנת ספק נמחקה');
    } finally {
      setDeletingId(null);
    }
  };

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
            הזמנות ספק
          </h1>
          <p className="text-[#888] text-sm mt-0.5">{orders.length} הזמנות · campilorders@gmail.com</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F2E24] hover:bg-[#1a4a38] text-white text-sm font-bold rounded-xl transition-colors"
          style={{ fontFamily: 'Rubik, sans-serif' }}
        >
          <Plus className="w-4 h-4" />
          הוסף הזמנה
        </button>
      </div>

      {/* Email config warning */}
      {!emailConfigured && (
        <div className="mb-5 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            שליחת אימייל לא מוגדרת.
            הוסף <code className="bg-amber-100 px-1 rounded">GMAIL_USER=campilorders@gmail.com</code> ו-<code className="bg-amber-100 px-1 rounded">GMAIL_APP_PASSWORD</code> למשתני הסביבה של Vercel.
          </span>
        </div>
      )}

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {FILTER_TABS.map(({ key, label }) => {
          const count = key === 'all' ? orders.length : orders.filter(o => o.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors ${
                filter === key
                  ? 'bg-[#0F2E24] text-white'
                  : 'bg-white border border-[#E4DDD2] text-[#555] hover:border-[#0F2E24] hover:text-[#0F2E24]'
              }`}
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              {label}
              {count > 0 && <span className="mr-1.5 opacity-60 text-xs">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Order list */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-12 text-center">
          <Package className="w-8 h-8 text-[#CCC] mx-auto mb-3" />
          <p className="text-[#888] text-sm">אין הזמנות ספק להצגה</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(row => {
            const meta = STATUS_META[row.status];
            const StatusIcon = meta.icon;
            return (
              <div key={row.id} className="bg-white border border-[#E4DDD2] rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  {/* Left: IDs + status */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-tn-600 text-sm" style={{ fontFamily: 'Rubik, sans-serif' }}>
                      {row.campil_order_id}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${meta.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {meta.label}
                    </span>
                    {row.customer_notified_at && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                        <Mail className="w-3 h-3" />
                        נשלח {new Date(row.customer_notified_at).toLocaleDateString('he-IL')}
                      </span>
                    )}
                  </div>
                  {/* Right: Action buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    {row.tracking_number && (
                      <button
                        onClick={() => handleSendEmail(row)}
                        disabled={!emailConfigured || sendingId === row.id}
                        title={!emailConfigured ? 'Email לא מוגדר' : 'שלח עדכון מעקב ללקוח'}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-tn-600 hover:bg-tn-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-colors"
                        style={{ fontFamily: 'Rubik, sans-serif' }}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {sendingId === row.id ? 'שולח...' : 'שלח מעקב ללקוח'}
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(row)}
                      className="p-1.5 text-[#888] hover:text-[#111] hover:bg-[#F8F7F3] rounded-lg transition-colors"
                      title="עריכה"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deletingId === row.id}
                      className="p-1.5 text-[#888] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40"
                      title="מחיקה"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-1">לקוח</p>
                    <p className="text-sm font-semibold text-[#111]">{row.customer_name}</p>
                    <p className="text-xs text-[#555]">{row.customer_email}</p>
                    <p className="text-xs text-[#888]">{row.customer_phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-1">ספק</p>
                    <p className="text-sm font-semibold text-[#111]">{row.supplier_name}</p>
                    {row.supplier_order_number && (
                      <p className="text-xs text-[#555]">מס' הזמנה: {row.supplier_order_number}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-1">מעקב</p>
                    {row.tracking_number ? (
                      <p className="text-sm font-mono font-bold text-[#111]">{row.tracking_number}</p>
                    ) : (
                      <p className="text-xs text-[#CCC] italic">לא הוזן עדיין</p>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-1">נוסף</p>
                    <p className="text-xs text-[#555]">
                      {new Date(row.created_at).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    {row.notes && (
                      <p className="text-xs text-[#888] mt-0.5 italic">"{row.notes}"</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ─────────────────────────────────────────────────── */}
      {modal !== 'closed' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" dir="rtl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4DDD2]">
              <h2 className="text-base font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
                {modal === 'create' ? 'הוספת הזמנת ספק' : 'עריכת הזמנת ספק'}
              </h2>
              <button onClick={closeModal} className="p-1 text-[#888] hover:text-[#111] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-4">
              {modal === 'create' && (
                <div>
                  <label className="block text-xs font-bold text-[#555] mb-1.5">
                    מספר הזמנה CampIL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="CIL-XXXXXX-XXXX"
                    value={form.campil_order_id}
                    onChange={e => setForm(f => ({ ...f, campil_order_id: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20"
                    dir="ltr"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#555] mb-1.5">
                  שם ספק <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="לדוגמה: AliExpress, Amazon"
                  value={form.supplier_name}
                  onChange={e => setForm(f => ({ ...f, supplier_name: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#555] mb-1.5">מספר הזמנה אצל הספק</label>
                <input
                  type="text"
                  placeholder="לדוגמה: ORDER-1234567"
                  value={form.supplier_order_number}
                  onChange={e => setForm(f => ({ ...f, supplier_order_number: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#555] mb-1.5">מספר מעקב</label>
                <input
                  type="text"
                  placeholder="לדוגמה: IL1234567890"
                  value={form.tracking_number}
                  onChange={e => setForm(f => ({ ...f, tracking_number: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#555] mb-1.5">סטטוס</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as SupplierOrderStatus }))}
                  className="w-full px-3 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] bg-white outline-none focus:border-tn-600 cursor-pointer"
                >
                  <option value="ordered">הוזמן</option>
                  <option value="in_transit">בדרך</option>
                  <option value="delivered">נמסר</option>
                  <option value="problem">בעיה</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#555] mb-1.5">הערות</label>
                <textarea
                  placeholder="הערות פנימיות..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2.5 border border-[#E4DDD2] rounded-xl text-sm text-[#111] outline-none focus:border-tn-600 focus:ring-2 focus:ring-tn-600/20 resize-none"
                />
              </div>

              {formError && (
                <p className="text-sm text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  {formError}
                </p>
              )}
            </div>

            {/* Modal footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-[#E4DDD2]">
              <button
                onClick={modal === 'create' ? handleCreate : handleSave}
                disabled={formLoading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#0F2E24] hover:bg-[#1a4a38] disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <Check className="w-4 h-4" />
                {formLoading ? 'שומר...' : (modal === 'create' ? 'הוסף' : 'שמור')}
              </button>
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-[#E4DDD2] text-[#555] text-sm font-semibold rounded-xl hover:bg-[#F8F7F3] transition-colors"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ─────────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white animate-fade-in ${
          toast.ok ? 'bg-[#0F2E24]' : 'bg-red-600'
        }`}>
          {toast.ok ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.text}
        </div>
      )}
    </>
  );
}
