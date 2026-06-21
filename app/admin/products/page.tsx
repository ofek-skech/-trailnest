import { getAdminUser } from '@/lib/supabase-session';
import { products, categories } from '@/lib/products';

export const metadata = { title: 'מוצרים | CampIL Admin' };

export default async function ProductsPage() {
  await getAdminUser();

  const inStock    = products.filter(p => p.inStock).length;
  const outOfStock = products.filter(p => !p.inStock).length;

  return (
    <div className="p-5 lg:p-8 max-w-6xl" dir="rtl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
          קטלוג מוצרים
        </h1>
        <p className="text-[#888] text-sm">
          {products.length} מוצרים · {categories.length} קטגוריות ·{' '}
          <span className="text-green-600">{inStock} במלאי</span>
          {outOfStock > 0 && <span className="text-red-600"> · {outOfStock} חסרים</span>}
        </p>
      </div>

      {categories.map(cat => {
        const catProducts = products.filter(p => p.categorySlug === cat.slug);
        if (catProducts.length === 0) return null;
        return (
          <div key={cat.slug} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="font-black text-[#111] text-base" style={{ fontFamily: 'Rubik, sans-serif' }}>
                {cat.name}
              </h2>
              <span className="text-xs text-[#888] bg-[#F0EDE8] px-2 py-0.5 rounded-full">
                {catProducts.length} מוצרים
              </span>
            </div>

            <div className="grid gap-3">
              {catProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white border border-[#E4DDD2] rounded-2xl p-4 flex items-center gap-4"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F8F7F3]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#CCC] text-xs">
                        אין תמונה
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#111] truncate">{product.name}</p>
                    <p className="text-xs text-[#888] mt-0.5">
                      מק"ט: {product.sku ?? product.id} · /{product.slug}
                    </p>
                  </div>

                  {/* Price + stock */}
                  <div className="text-right flex-shrink-0">
                    <p
                      className="font-black text-[#111] text-base"
                      style={{ fontFamily: 'Rubik, sans-serif', fontVariantNumeric: 'tabular-nums' }}
                    >
                      ₪{product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <p className="text-xs text-[#AAA] line-through">₪{product.originalPrice}</p>
                    )}
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                      product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'במלאי' : 'אזל'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
