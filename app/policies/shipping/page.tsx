import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות משלוחים — CampIL',
  description: 'כל מה שצריך לדעת על משלוחים ומעקב הזמנות ב-CampIL.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#0F2E24' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <p className="overline text-sand-400 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מדיניות</p>
          <h1 className="heading-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>מדיניות משלוחים</h1>
          <p className="text-white/60 text-sm mt-2">עדכון אחרון: בקרוב</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>זמן עיבוד הזמנה</h2>
            <p>כל ההזמנות מעובדות תוך 1–2 ימי עסקים. תקבלו אישור הזמנה מייל מיד לאחר הרכישה, ועדכון משלוח עם מספר מעקב לאחר שהחבילה יצאה.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>עלויות וזמני משלוח</h2>
            <div className="border border-[#E4DDD2] rounded-xl overflow-hidden">
              {[
                ['משלוח רגיל (הזמנות מתחת ₪300)', '₪35',   '3–5 ימי עסקים'],
                ['משלוח רגיל (הזמנות מעל ₪300)',    'חינם',  '3–5 ימי עסקים'],
                ['משלוח אקספרס',                     '₪65',   '1–2 ימי עסקים'],
              ].map(([method, price, eta], i) => (
                <div key={i} className={`grid grid-cols-3 gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8F7F3]'}`}>
                  <span className="font-semibold text-[#111]">{method}</span>
                  <span className={price === 'חינם' ? 'text-tn-600 font-bold' : 'text-[#555]'}>{price}</span>
                  <span className="text-[#555]">{eta}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm">הזמנים המוצגים הם הערכות בלבד ועשויים להשתנות בעונות עומס.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מעקב הזמנה</h2>
            <p>לאחר שהחבילה נשלחת, תקבלו מייל עם מספר מעקב וקישור לצפייה בזמן אמת. לשאלות, צרו קשר ב-<a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>הזמנה שלא הגיעה או הגיעה פגומה</h2>
            <p>חבילה פגומה? צרו קשר תוך 48 שעות עם תמונות — נשלח החלפה מיידית. חבילה שלא הגיעה תוך 10 ימי עסקים מהודעת המשלוח? פנו אלינו ונברר מול חברת השליחויות.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>אזורי משלוח</h2>
            <p>אזורי המשלוח ושותפי הלוגיסטיקה יפורסמו בקרוב. לשאלות על משלוח למקומכם, צרו קשר ב-<a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
