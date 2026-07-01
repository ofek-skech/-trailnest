import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '׳׳“׳™׳ ׳™׳•׳× ׳׳©׳׳•׳—׳™׳ ג€” CAMPIL',
  description: '׳›׳ ׳׳” ׳©׳¦׳¨׳™׳ ׳׳“׳¢׳× ׳¢׳ ׳׳©׳׳•׳—׳™׳ ׳•׳׳¢׳§׳‘ ׳”׳–׳׳ ׳•׳× ׳‘-CAMPIL.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#1E2020' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <p className="overline text-sand-400 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>׳׳“׳™׳ ׳™׳•׳×</p>
          <h1 className="heading-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>׳׳“׳™׳ ׳™׳•׳× ׳׳©׳׳•׳—׳™׳</h1>
          <p className="text-white/60 text-sm mt-2">׳¢׳“׳›׳•׳ ׳׳—׳¨׳•׳: ׳‘׳§׳¨׳•׳‘</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>׳–׳׳ ׳¢׳™׳‘׳•׳“ ׳”׳–׳׳ ׳”</h2>
            <p>׳›׳ ׳”׳”׳–׳׳ ׳•׳× ׳׳¢׳•׳‘׳“׳•׳× ׳×׳•׳ 1ג€“2 ׳™׳׳™ ׳¢׳¡׳§׳™׳. ׳×׳§׳‘׳׳• ׳׳™׳©׳•׳¨ ׳”׳–׳׳ ׳” ׳׳™׳™׳ ׳׳™׳“ ׳׳׳—׳¨ ׳”׳¨׳›׳™׳©׳”, ׳•׳¢׳“׳›׳•׳ ׳׳©׳׳•׳— ׳¢׳ ׳׳¡׳₪׳¨ ׳׳¢׳§׳‘ ׳׳׳—׳¨ ׳©׳”׳—׳‘׳™׳׳” ׳™׳¦׳׳”.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>׳¢׳׳•׳™׳•׳× ׳•׳–׳׳ ׳™ ׳׳©׳׳•׳—</h2>
            <div className="border border-[#E4DDD2] rounded-xl overflow-hidden">
              {[
                ['׳׳©׳׳•׳— ׳¨׳’׳™׳ (׳”׳–׳׳ ׳•׳× ׳׳×׳—׳× ג‚×300)', 'ג‚×35',   '3ג€“5 ׳™׳׳™ ׳¢׳¡׳§׳™׳'],
                ['׳׳©׳׳•׳— ׳¨׳’׳™׳ (׳”׳–׳׳ ׳•׳× ׳׳¢׳ ג‚×300)',    '׳—׳™׳ ׳',  '3ג€“5 ׳™׳׳™ ׳¢׳¡׳§׳™׳'],
                ['׳׳©׳׳•׳— ׳׳§׳¡׳₪׳¨׳¡',                     'ג‚×65',   '1ג€“2 ׳™׳׳™ ׳¢׳¡׳§׳™׳'],
              ].map(([method, price, eta], i) => (
                <div key={i} className={`grid grid-cols-3 gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F7F3]'}`}>
                  <span className="font-semibold text-[#111]">{method}</span>
                  <span className={price === '׳—׳™׳ ׳' ? 'text-tn-600 font-bold' : 'text-[#555]'}>{price}</span>
                  <span className="text-[#555]">{eta}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">׳”׳–׳׳ ׳™׳ ׳”׳׳•׳¦׳’׳™׳ ׳”׳ ׳”׳¢׳¨׳›׳•׳× ׳‘׳׳‘׳“ ׳•׳¢׳©׳•׳™׳™׳ ׳׳”׳©׳×׳ ׳•׳× ׳‘׳¢׳•׳ ׳•׳× ׳¢׳•׳׳¡.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>׳׳¢׳§׳‘ ׳”׳–׳׳ ׳”</h2>
            <p>׳׳׳—׳¨ ׳©׳”׳—׳‘׳™׳׳” ׳ ׳©׳׳—׳×, ׳×׳§׳‘׳׳• ׳׳™׳™׳ ׳¢׳ ׳׳¡׳₪׳¨ ׳׳¢׳§׳‘ ׳•׳§׳™׳©׳•׳¨ ׳׳¦׳₪׳™׳™׳” ׳‘׳–׳׳ ׳׳׳×. ׳׳©׳׳׳•׳×, ׳¦׳¨׳• ׳§׳©׳¨ ׳‘-<a href="mailto:CAMPIL.info@gmail.com" className="text-tn-600 hover:underline">CAMPIL.info@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>׳”׳–׳׳ ׳” ׳©׳׳ ׳”׳’׳™׳¢׳” ׳׳• ׳”׳’׳™׳¢׳” ׳₪׳’׳•׳׳”</h2>
            <p>׳—׳‘׳™׳׳” ׳₪׳’׳•׳׳”? ׳¦׳¨׳• ׳§׳©׳¨ ׳×׳•׳ 48 ׳©׳¢׳•׳× ׳¢׳ ׳×׳׳•׳ ׳•׳× ג€” ׳ ׳©׳׳— ׳”׳—׳׳₪׳” ׳׳™׳™׳“׳™׳×. ׳—׳‘׳™׳׳” ׳©׳׳ ׳”׳’׳™׳¢׳” ׳×׳•׳ 10 ׳™׳׳™ ׳¢׳¡׳§׳™׳ ׳׳”׳•׳“׳¢׳× ׳”׳׳©׳׳•׳—? ׳₪׳ ׳• ׳׳׳™׳ ׳• ׳•׳ ׳‘׳¨׳¨ ׳׳•׳ ׳—׳‘׳¨׳× ׳”׳©׳׳™׳—׳•׳™׳•׳×.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>׳׳–׳•׳¨׳™ ׳׳©׳׳•׳—</h2>
            <p>׳׳–׳•׳¨׳™ ׳”׳׳©׳׳•׳— ׳•׳©׳•׳×׳₪׳™ ׳”׳׳•׳’׳™׳¡׳˜׳™׳§׳” ׳™׳₪׳•׳¨׳¡׳׳• ׳‘׳§׳¨׳•׳‘. ׳׳©׳׳׳•׳× ׳¢׳ ׳׳©׳׳•׳— ׳׳׳§׳•׳׳›׳, ׳¦׳¨׳• ׳§׳©׳¨ ׳‘-<a href="mailto:CAMPIL.info@gmail.com" className="text-tn-600 hover:underline">CAMPIL.info@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

