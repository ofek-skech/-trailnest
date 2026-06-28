'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import type { ProductAdminData, Supplier } from '@/lib/admin-products';
import { profitMargin } from '@/lib/admin-products';

interface Props {
  base: Product;
  adminData: ProductAdminData | null;
  suppliers: Supplier[];
}

type BadgeOption = 'new' | 'sale' | 'bestseller' | 'limited' | '';

function field<T>(db: T | null | undefined, fallback: T): T {
  return db != null ? db : fallback;
}

export default function ProductEditClient({ base, adminData, suppliers }: Props) {
  const router = useRouter();

  // Basic Info
  const [name, setName] = useState(field(adminData?.name, base.name));
  const [shortDescription, setShortDescription] = useState(field(adminData?.short_description, base.shortDescription));
  const [description, setDescription] = useState(field(adminData?.description, base.description));
  const [brand, setBrand] = useState(field(adminData?.brand, base.brand ?? ''));
  const [sku, setSku] = useState(field(adminData?.sku, base.sku));

  // Pricing
  const [price, setPrice] = useState(String(field(adminData?.price, base.price) ?? ''));
  const [originalPrice, setOriginalPrice] = useState(String(field(adminData?.original_price, base.originalPrice ?? '') ?? ''));
  const [badge, setBadge] = useState<BadgeOption>((field(adminData?.badge, base.badge ?? '') as BadgeOption) ?? '');

  // Stock
  const [inStock, setInStock] = useState(field(adminData?.in_stock, base.inStock));
  const [deliveryTime, setDeliveryTime] = useState(field(adminData?.delivery_time, base.deliveryTime ?? ''));

  // Media
  const [videoUrl, setVideoUrl] = useState(field(adminData?.video_url, base.videoUrl ?? ''));
  const [imagesText, setImagesText] = useState(
    (field(adminData?.images, base.images ?? []) ?? []).join('\n')
  );

  // Benefits
  const [benefitsText, setBenefitsText] = useState(
    (field(adminData?.benefits, base.benefits ?? []) ?? []).join('\n')
  );

  // Specs
  const [specs, setSpecs] = useState<Array<{ label: string; value: string }>>(
    field(adminData?.specs, base.specs ?? []) ?? []
  );
  function addSpec() { setSpecs(s => [...s, { label: '', value: '' }]); }
  function removeSpec(i: number) { setSpecs(s => s.filter((_, idx) => idx !== i)); }
  function updateSpec(i: number, k: 'label' | 'value', v: string) {
    setSpecs(s => s.map((sp, idx) => idx === i ? { ...sp, [k]: v } : sp));
  }

  // Supplier
  const [supplierId, setSupplierId] = useState(adminData?.supplier_id ?? '');
  const [supplierSku, setSupplierSku] = useState(adminData?.supplier_sku ?? '');
  const [supplierProductUrl, setSupplierProductUrl] = useState(adminData?.supplier_product_url ?? '');
  const [supplierCostUsd, setSupplierCostUsd] = useState(String(adminData?.supplier_cost_usd ?? ''));
  const [supplierShippingUsd, setSupplierShippingUsd] = useState(String(adminData?.supplier_shipping_usd ?? ''));
  const [supplierContactEmail, setSupplierContactEmail] = useState(adminData?.supplier_contact_email ?? '');
  const [supplierNotes, setSupplierNotes] = useState(adminData?.supplier_notes ?? '');

  // Admin
  const [adminNotes, setAdminNotes] = useState(adminData?.admin_notes ?? '');

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        name: name.trim() || null,
        short_description: shortDescription.trim() || null,
        description: description.trim() || null,
        brand: brand.trim() || null,
        sku: sku.trim() || null,
        price: price !== '' ? Number(price) : null,
        original_price: originalPrice !== '' ? Number(originalPrice) : null,
        badge: badge || null,
        in_stock: inStock,
        delivery_time: deliveryTime.trim() || null,
        video_url: videoUrl.trim() || null,
        images: imagesText.trim() ? imagesText.split('\n').map(l => l.trim()).filter(Boolean) : null,
        benefits: benefitsText.trim() ? benefitsText.split('\n').map(l => l.trim()).filter(Boolean) : null,
        specs: specs.filter(s => s.label || s.value).length > 0 ? specs.filter(s => s.label || s.value) : null,
        supplier_id: supplierId || null,
        supplier_sku: supplierSku.trim() || null,
        supplier_product_url: supplierProductUrl.trim() || null,
        supplier_cost_usd: supplierCostUsd !== '' ? Number(supplierCostUsd) : null,
        supplier_shipping_usd: supplierShippingUsd !== '' ? Number(supplierShippingUsd) : null,
        supplier_contact_email: supplierContactEmail.trim() || null,
        supplier_notes: supplierNotes.trim() || null,
        admin_notes: adminNotes.trim() || null,
      };

      const res = await fetch(`/api/admin/products/${base.slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'שגיאה בשמירה');
      showToast('המוצר נשמר בהצלחה', true);
      router.refresh();
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : 'שגיאה', false);
    } finally {
      setSaving(false);
    }
  }

  const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 bg-white';
  const labelCls = 'block text-sm font-medium text-gray-700 mb-1';
  const sectionCls = 'bg-white rounded-xl border border-gray-200 p-5 space-y-4';
  const sectionTitle = 'text-base font-semibold text-gray-900 mb-4';

  return (
    <div dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-gray-400 hover:text-gray-600 transition-colors text-sm">
            ← חזרה למוצרים
          </Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-bold text-gray-900 truncate max-w-[400px]">{base.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/product/${base.slug}`} target="_blank" className="text-sm text-green-700 hover:underline">
            צפה בחנות ↗
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors text-sm"
          >
            {saving ? 'שומר...' : 'שמור שינויים'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Main column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Basic Info */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>פרטי מוצר</h2>
            <div>
              <label className={labelCls}>שם המוצר</label>
              <input value={name} onChange={e => setName(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>תיאור קצר</label>
              <input value={shortDescription} onChange={e => setShortDescription(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>תיאור מלא</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>מותג</label>
                <input value={brand} onChange={e => setBrand(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>מק&quot;ט (SKU)</label>
                <input value={sku} onChange={e => setSku(e.target.value)} className={inputCls} />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>תמחור</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>מחיר מכירה (₪)</label>
                <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>מחיר מקורי / השוואה (₪)</label>
                <input type="number" min="0" step="0.01" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className={inputCls} placeholder="ריק = ללא מבצע" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>תג</label>
                <select value={badge} onChange={e => setBadge(e.target.value as BadgeOption)} className={inputCls}>
                  <option value="">ללא תג</option>
                  <option value="new">חדש</option>
                  <option value="sale">מבצע</option>
                  <option value="bestseller">מומלץ</option>
                  <option value="limited">מוגבל</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>זמן אספקה</label>
                <input value={deliveryTime} onChange={e => setDeliveryTime(e.target.value)} placeholder="3–5 ימי עסקים" className={inputCls} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="inStock" checked={inStock} onChange={e => setInStock(e.target.checked)} className="rounded w-4 h-4 text-green-600" />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer">במלאי</label>
            </div>
          </div>

          {/* Features / Benefits */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>יתרונות / תכונות</h2>
            <div>
              <label className={labelCls}>יתרונות (שורה לכל יתרון)</label>
              <textarea
                value={benefitsText}
                onChange={e => setBenefitsText(e.target.value)}
                rows={5}
                placeholder="יתרון 1&#10;יתרון 2&#10;יתרון 3"
                className={inputCls}
              />
            </div>
          </div>

          {/* Specs */}
          <div className={sectionCls}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={sectionTitle.replace('mb-4', '')}>מפרט טכני</h2>
              <button onClick={addSpec} className="text-sm text-green-700 hover:underline">+ הוסף שורה</button>
            </div>
            {specs.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">אין מפרט. לחץ &quot;הוסף שורה&quot; להוספה.</p>
            )}
            <div className="space-y-2">
              {specs.map((sp, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={sp.label}
                    onChange={e => updateSpec(i, 'label', e.target.value)}
                    placeholder="שם שדה"
                    className={`${inputCls} flex-1`}
                  />
                  <input
                    value={sp.value}
                    onChange={e => updateSpec(i, 'value', e.target.value)}
                    placeholder="ערך"
                    className={`${inputCls} flex-1`}
                  />
                  <button onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600 text-lg leading-none flex-shrink-0">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Media */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>תמונות ומדיה</h2>
            <div>
              <label className={labelCls}>כתובות URL לתמונות (שורה לכל תמונה)</label>
              <textarea
                value={imagesText}
                onChange={e => setImagesText(e.target.value)}
                rows={4}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                className={`${inputCls} font-mono text-xs`}
              />
            </div>
            <div>
              <label className={labelCls}>URL לסרטון (YouTube)</label>
              <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className={inputCls} />
            </div>
          </div>
        </div>

        {/* Sidebar column */}
        <div className="space-y-5">
          {/* Supplier */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>ספק</h2>
            <div>
              <label className={labelCls}>ספק</label>
              <select value={supplierId} onChange={e => setSupplierId(e.target.value)} className={inputCls}>
                <option value="">ללא ספק</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>URL מוצר אצל ספק</label>
              <input value={supplierProductUrl} onChange={e => setSupplierProductUrl(e.target.value)} placeholder="https://..." className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>מק&quot;ט ספק</label>
              <input value={supplierSku} onChange={e => setSupplierSku(e.target.value)} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>עלות ספק ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" step="0.01" value={supplierCostUsd} onChange={e => setSupplierCostUsd(e.target.value)} className={`${inputCls} pl-7`} placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className={labelCls}>משלוח לישראל ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input type="number" min="0" step="0.01" value={supplierShippingUsd} onChange={e => setSupplierShippingUsd(e.target.value)} className={`${inputCls} pl-7`} placeholder="0.00" />
                </div>
              </div>
            </div>
            <div>
              <label className={labelCls}>אימייל קשר ספק</label>
              <input type="email" value={supplierContactEmail} onChange={e => setSupplierContactEmail(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>הערות ספק</label>
              <textarea value={supplierNotes} onChange={e => setSupplierNotes(e.target.value)} rows={3} className={inputCls} />
            </div>
          </div>

          {/* Supplier Economics */}
          {(() => {
            const RATE = 3.65;
            const sellingPrice   = price !== '' ? Number(price) : null;
            const comparePrice   = originalPrice !== '' ? Number(originalPrice) : null;
            const costUsd        = supplierCostUsd !== '' ? Number(supplierCostUsd) : null;
            const shippingUsd    = supplierShippingUsd !== '' ? Number(supplierShippingUsd) : null;
            const landedCostIls  = costUsd != null && shippingUsd != null
              ? Math.round((costUsd + shippingUsd) * RATE)
              : null;
            const profit = sellingPrice != null && landedCostIls != null ? sellingPrice - landedCostIls : null;
            const margin = sellingPrice != null ? profitMargin(sellingPrice, landedCostIls) : null;
            const marginColor = margin == null ? 'text-gray-400' : margin >= 40 ? 'text-green-700' : margin >= 25 ? 'text-yellow-700' : 'text-red-600';
            const hasCost = costUsd != null || shippingUsd != null;
            return (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-2.5">
                <h2 className="text-sm font-semibold text-gray-700 mb-3">כלכלת ספק</h2>

                {/* Cost breakdown */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">עלות ספק (USD)</span>
                  <span className="font-medium text-gray-800">{costUsd != null ? `$${costUsd.toFixed(2)}` : '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">משלוח לישראל (USD)</span>
                  <span className="font-medium text-gray-800">{shippingUsd != null ? `$${shippingUsd.toFixed(2)}` : '—'}</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
                  <span className="text-gray-700 font-medium">עלות נחיתה (₪)</span>
                  <span className="font-semibold text-gray-900">
                    {landedCostIls != null ? `₪${landedCostIls.toLocaleString('he-IL')}` : '—'}
                  </span>
                </div>
                {landedCostIls != null && (
                  <p className="text-xs text-gray-400">= (${costUsd?.toFixed(2)} + ${shippingUsd?.toFixed(2)}) × {RATE}</p>
                )}

                {/* Selling price reference */}
                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                  <span className="text-gray-500">מחיר מכירה CampIL</span>
                  <span className="font-medium text-gray-800">{sellingPrice != null ? `₪${sellingPrice.toLocaleString('he-IL')}` : '—'}</span>
                </div>
                {comparePrice != null && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">מחיר השוואה</span>
                    <span className="text-gray-500 line-through">₪{comparePrice.toLocaleString('he-IL')}</span>
                  </div>
                )}

                {/* Profit & Margin */}
                <div className="border-t border-gray-200 pt-2 flex justify-between text-sm">
                  <span className="text-gray-500">רווח גולמי</span>
                  <span className={`font-semibold ${profit != null && profit < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                    {profit != null ? `₪${profit.toLocaleString('he-IL')}` : '—'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">מרווח %</span>
                  <span className={`font-bold text-lg ${marginColor}`}>
                    {margin != null ? `${margin}%` : '—'}
                  </span>
                </div>

                {/* Alerts */}
                {margin != null && margin < 0 && (
                  <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mt-1">
                    ⛔ מרווח שלילי — המוצר נמכר מתחת לעלות
                  </p>
                )}
                {margin != null && margin >= 0 && margin < 25 && (
                  <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-1">
                    ⚠️ מרווח נמוך מ-25% — בדוק תמחור
                  </p>
                )}
                {!hasCost && (
                  <p className="text-xs text-gray-400 bg-gray-100 rounded-lg px-3 py-2 mt-1">
                    הכנס עלות ספק ומשלוח כדי לחשב רווח ומרווח
                  </p>
                )}
              </div>
            );
          })()}

          {/* Product Info (read-only) */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">מידע מוצר</h2>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">קטגוריה</span>
              <span className="font-medium text-gray-800">{base.category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">דירוג</span>
              <span className="font-medium text-gray-800">{base.rating} ★</span>
            </div>
            {base.reviewCount != null && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">ביקורות</span>
                <span className="font-medium text-gray-800">{base.reviewCount}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Slug</span>
              <span className="font-mono text-xs text-gray-600">{base.slug}</span>
            </div>
          </div>

          {/* Admin Notes */}
          <div className={sectionCls}>
            <h2 className={sectionTitle}>הערות פנימיות</h2>
            <textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} rows={4} placeholder="הערות לשימוש פנימי בלבד..." className={inputCls} />
          </div>

          {/* Save button (mobile-friendly duplicate) */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 disabled:opacity-50 transition-colors"
          >
            {saving ? 'שומר...' : 'שמור שינויים'}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl text-white text-sm font-medium shadow-lg z-50 ${toast.ok ? 'bg-green-700' : 'bg-red-600'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
