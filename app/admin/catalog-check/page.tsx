import { categories, products } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default function CatalogCheckPage() {
  const productsByCategory = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.categorySlug === cat.slug),
  }));

  const missingImages = products.filter(
    p => !p.image || p.image.includes('picsum.photos')
  );
  const missingDescriptions = products.filter(
    p => !p.description || p.description.trim().length < 20
  );
  const missingPrices = products.filter(p => !p.price || p.price <= 0);
  const missingSlugMatch = products.filter(
    p => !categories.find(c => c.slug === p.categorySlug)
  );

  return (
    <div dir="rtl" style={{ fontFamily: 'monospace', padding: '2rem', background: '#0f0f0f', minHeight: '100vh', color: '#e0e0e0' }}>
      <h1 style={{ color: '#7cfc7c', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
        🗂 CampIL — בדיקת קטלוג
      </h1>
      <p style={{ color: '#888', marginBottom: '2rem', fontSize: '0.85rem' }}>
        /admin/catalog-check — לא נדרש מפתח גישה
      </p>

      {/* Totals */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ffd700', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>סיכום</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {[
            { label: 'קטגוריות', value: categories.length, color: '#7cfc7c' },
            { label: 'מוצרים סה"כ', value: products.length, color: '#7cfc7c' },
            { label: 'חסרות תמונות', value: missingImages.length, color: missingImages.length > 0 ? '#ff6b6b' : '#7cfc7c' },
            { label: 'חסרות תיאור', value: missingDescriptions.length, color: missingDescriptions.length > 0 ? '#ff6b6b' : '#7cfc7c' },
            { label: 'חסרות מחיר', value: missingPrices.length, color: missingPrices.length > 0 ? '#ff6b6b' : '#7cfc7c' },
            { label: 'slug לא תואם', value: missingSlugMatch.length, color: missingSlugMatch.length > 0 ? '#ff6b6b' : '#7cfc7c' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ color, fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>
              <div style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.25rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products per category */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#ffd700', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>מוצרים לפי קטגוריה</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ color: '#888', textAlign: 'right', borderBottom: '1px solid #333' }}>
              <th style={{ padding: '0.5rem' }}>קטגוריה</th>
              <th style={{ padding: '0.5rem' }}>slug</th>
              <th style={{ padding: '0.5rem' }}>מוצרים</th>
              <th style={{ padding: '0.5rem' }}>URL</th>
            </tr>
          </thead>
          <tbody>
            {productsByCategory.map(cat => (
              <tr key={cat.slug} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '0.5rem', color: '#e0e0e0' }}>{cat.name}</td>
                <td style={{ padding: '0.5rem', color: '#7cfc7c' }}>{cat.slug}</td>
                <td style={{ padding: '0.5rem', color: cat.items.length === 0 ? '#ff6b6b' : '#7cfc7c', textAlign: 'center' }}>
                  {cat.items.length}
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <a href={`/shop/${cat.slug}`} style={{ color: '#60a5fa' }}>/shop/{cat.slug}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Issues */}
      {missingImages.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#ff6b6b', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
            ❌ תמונות חסרות / placeholders ({missingImages.length})
          </h2>
          <ul style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#ff9999' }}>
            {missingImages.map(p => (
              <li key={p.id} style={{ padding: '0.25rem 0' }}>
                [{p.id}] {p.name} — <span style={{ color: '#666' }}>{p.image}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {missingSlugMatch.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#ff6b6b', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
            ❌ slug לא מותאם לקטגוריה ({missingSlugMatch.length})
          </h2>
          <ul style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#ff9999' }}>
            {missingSlugMatch.map(p => (
              <li key={p.id} style={{ padding: '0.25rem 0' }}>
                [{p.id}] {p.name} — categorySlug: <span style={{ color: '#ff6b6b' }}>{p.categorySlug}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Full product list */}
      <section>
        <h2 style={{ color: '#ffd700', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
          כל המוצרים ({products.length})
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.75rem' }}>
          <thead>
            <tr style={{ color: '#888', textAlign: 'right', borderBottom: '1px solid #333' }}>
              <th style={{ padding: '0.4rem' }}>ID</th>
              <th style={{ padding: '0.4rem' }}>שם</th>
              <th style={{ padding: '0.4rem' }}>קטגוריה</th>
              <th style={{ padding: '0.4rem' }}>מחיר</th>
              <th style={{ padding: '0.4rem' }}>תמונה</th>
              <th style={{ padding: '0.4rem' }}>slug</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => {
              const hasImage = p.image && !p.image.includes('picsum.photos');
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ padding: '0.4rem', color: '#888' }}>{p.id}</td>
                  <td style={{ padding: '0.4rem', color: '#e0e0e0' }}>
                    <a href={`/product/${p.slug}`} style={{ color: '#60a5fa' }}>{p.name}</a>
                  </td>
                  <td style={{ padding: '0.4rem', color: '#aaa' }}>{p.categorySlug}</td>
                  <td style={{ padding: '0.4rem', color: '#7cfc7c' }}>₪{p.price}</td>
                  <td style={{ padding: '0.4rem', color: hasImage ? '#7cfc7c' : '#ff6b6b' }}>
                    {hasImage ? '✓' : '✗ placeholder'}
                  </td>
                  <td style={{ padding: '0.4rem', color: '#888' }}>{p.slug}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
