import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות החזרות — CampIL',
  description: 'מדיניות ההחזרה של CampIL — 30 יום, ללא שאלות.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#0F2E24' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <p className="overline text-sand-400 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מדיניות</p>
          <h1 className="heading-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>מדיניות החזרות והחזר כספי</h1>
          <p className="text-white/60 text-sm mt-2">עדכון אחרון: בקרוב</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>30 יום החזרה — ללא שאלות</h2>
            <p>אנחנו עומדים מאחורי כל מוצר שאנחנו מוכרים. אם מסיבה כלשהי אינכם מרוצים מהרכישה, ניתן להחזיר את המוצר תוך 30 יום ממועד המסירה ולקבל החזר כספי מלא.</p>
            <p>לפתיחת בקשת החזרה, שלחו מייל ל-<a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a> עם מספר ההזמנה שלכם. נחזור אליכם תוך יום עסקים.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>תנאי ההחזרה</h2>
            <p>כדי לקבל זכאות להחזר, הפריט צריך:</p>
            <ul className="list-disc pr-5 space-y-1 mt-2">
              <li>להיות מוחזר תוך 30 יום ממועד המסירה</li>
              <li>להיות במצב מקורי או קרוב למקורי</li>
              <li>להיות מלווה באישור הרכישה (אישור הזמנה במייל)</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>תהליך החזר הכספי</h2>
            <p>לאחר קבלת הפריט המוחזר ובדיקתו, החזר הכספי יעובד תוך 3–5 ימי עסקים באמצעות התשלום המקורי.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>פריטים פגומים</h2>
            <p>קיבלתם פריט פגום? צרו קשר תוך 48 שעות ממועד הקבלה עם תמונות של הנזק. נשלח החלפה מיידית — אין צורך להחזיר את הפריט הפגום.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
