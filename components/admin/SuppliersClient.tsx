'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Supplier } from '@/lib/admin-products';

interface SupplierWithStats extends Supplier {
  product_count: number;
  total_inventory_value: number;
}

interface Props {
  initialSuppliers: SupplierWithStats[];
}

const emptyForm = { name: '', website: '', contact_email: '', notes: '' };

export default function SuppliersClient({ initialSuppliers }: Props) {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<SupplierWithStats[]>(initialSuppliers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SupplierWithStats | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(s: SupplierWithStats) {
    setEditing(s);
    setForm({ name: s.name, website: s.website ?? '', contact_email: s.contact_email ?? '', notes: s.notes ?? '' });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) { showToast('שם ספק נדרש', false); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/admin/suppliers/${editing.id}` : '/api/admin/suppliers';
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'שגיאה');
      showToast(editing ? 'הספק עודכן' : 'הספק נוצר', true);
      setModalOpen(false);
      router.refresh();
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'שגיאה', false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/suppliers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'שגיאה');
      setSuppliers(prev => prev.filter(s => s.id !== id));
      showToast('הספק נמחק', true);
      setDeleteId(null);
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'שגיאה', false);
    } finally {
      setDeleting(false);
    }
  }

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white';
  const labelCls = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ספקים</h1>
          <p className="text-sm text-gray-500 mt-1">{suppliers.length} ספקים רשומים</p>
        </div>
        <button
          onClick={openCreate}
          className="px-4 py-2.5 rounded-xl bg-green-700 text-white text-sm font-semibold hover:bg-green-800 transition-colors"
        >
          + הוסף ספק
        </button>
      </div>

      {suppliers.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <div className="text-gray-400 mb-3 text-4xl">📦</div>
          <p className="text-gray-500 mb-4">אין ספקים עדיין</p>
          <button onClick={openCreate} className="text-green-700 hover:underline text-sm">הוסף ספק ראשון</button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {suppliers.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{s.name}</h3>
                  {s.website && (
                    <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 hover:underline truncate block max-w-[200px]">
                      {s.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(s)} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">עריכה</button>
                  <button onClick={() => setDeleteId(s.id)} className="text-xs px-2.5 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors">מחיקה</button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {s.contact_email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">✉</span>
                    <a href={`mailto:${s.contact_email}`} className="hover:underline truncate">{s.contact_email}</a>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{s.product_count}</div>
                    <div className="text-xs text-gray-500">
                      <Link href={`/admin/products?supplier=${s.id}`} className="hover:text-green-700 hover:underline">מוצרים</Link>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {s.total_inventory_value > 0 ? `₪${s.total_inventory_value.toLocaleString('he-IL')}` : '—'}
                    </div>
                    <div className="text-xs text-gray-500">ערך מלאי</div>
                  </div>
                </div>
                {s.notes && (
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{s.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md" dir="rtl">
            <h3 className="font-bold text-lg text-gray-900 mb-5">{editing ? 'עריכת ספק' : 'ספק חדש'}</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>שם ספק *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="שם החברה" />
              </div>
              <div>
                <label className={labelCls}>אתר</label>
                <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} className={inputCls} placeholder="https://..." />
              </div>
              <div>
                <label className={labelCls}>אימייל קשר</label>
                <input type="email" value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>הערות</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} className={inputCls} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
              >
                {saving ? 'שומר...' : editing ? 'עדכן' : 'צור ספק'}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full" dir="rtl">
            <h3 className="font-bold text-lg text-gray-900 mb-2">מחיקת ספק</h3>
            <p className="text-gray-600 mb-5">הספק יימחק לצמיתות. מוצרים שהיו מקושרים לספק זה יישארו ללא ספק.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {deleting ? 'מוחק...' : 'מחק'}
              </button>
              <button
                onClick={() => setDeleteId(null)}
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
