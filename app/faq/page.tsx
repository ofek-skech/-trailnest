'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'משלוחים והזמנות',
    items: [
      {
        q: 'כמה זמן לוקח המשלוח?',
        a: 'הזמנות רגילות נשלחות תוך 1–2 ימי עסקים ומגיעות תוך 3–5 ימי עסקים על שליח עד הבית ומספר מעקב.',
      },
      {
        q: 'האם יש משלוח חינם?',
        a: 'כן! הזמנות מעל ₪300 מקבלות משלוח חינם. הזמנות מתחת לסכום זה כוללות דמי משלוח קבועים של ₪35.',
      },
      {
        q: 'איך עוקבים אחרי ההזמנה?',
        a: 'לאחר שהחבילה יוצאת, תקבלו מייל עם מספר מעקב וקישור לצפייה בזמן אמת.',
      },
      {
        q: 'לאן שולחים?',
        a: 'אנחנו שולחים לכל רחבי ישראל. לפרטים נוספים על משלוח לאזורים מרוחקים, צרו קשר ונשמח לעזור.',
      },
    ],
  },
  {
    category: 'החזרות ואחריות',
    items: [
      {
        q: 'מה הם תנאי ההחזרות?',
        a: 'אנחנו מציעים חלון החזרה של 30 יום. אם מסיבה כלשהי אינכם מרוצים — כתבו לנו ב-campil.info@gmail.com ונסדר החזר כספי מלא.',
      },
      {
        q: 'מה קורה אם המוצר הגיע פגום?',
        a: 'צרו קשר תוך 48 שעות מהמסירה עם תמונה של הנזק. נשלח החלפה מיידית — אין צורך להחזיר את הפריט הפגום.',
      },
    ],
  },
  {
    category: 'מוצרים',
    items: [
      {
        q: 'האם המדפלטורים מתאימים לכל רכב?',
        a: 'המדפלטורים האוטומטיים מתאימים לכל שסתום סטנדרטי לצמיג — ג\'ימני, ג\'יפ, הילוקס, ולנד רובר ועוד. בדקו שהשסתום שלכם הוא Schrader (הנפוץ ביותר).',
      },
      {
        q: 'האם מכשיר האספרסו עובד בלי חשמל?',
        a: 'כן. מכשיר האספרסו הנייד עובד לחלוטין ידנית, ללא חשמל ובלי מטענים. מתאים לכל מחנה ולכל רכב.',
      },
      {
        q: 'כמה משקל נושא הערסל?',
        a: 'ערסל השטח המקצועי עומד בעומס של עד 200 ק"ג. ניתן לשימוש של שני אנשים בו-זמנית.',
      },
    ],
  },
  {
    category: 'תשלום ואבטחה',
    items: [
      {
        q: 'איך מבצעים הזמנה?',
        a: 'ההזמנות מתבצעות דרך האתר — בוחרים מוצר, לוחצים "הוסף לסל", ממלאים פרטי משלוח ומשלמים בצורה מאובטחת דרך Tranzila. תקבלו אישור הזמנה במייל מיד לאחר הרכישה.',
      },
      {
        q: 'האם ניתן לשנות או לבטל הזמנה?',
        a: 'הזמנות ניתנות לשינוי או ביטול תוך שעתיים מביצוע ההזמנה. צרו קשר בוואטסאפ או ב-campil.info@gmail.com.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#0F2E24' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center" dir="rtl">
          <p className="overline text-sand-400 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מרכז עזרה</p>
          <h1 className="heading-lg text-white mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>שאלות נפוצות</h1>
          <p className="text-white/70" style={{ fontFamily: 'Rubik, sans-serif' }}>כל מה שצריך לדעת על מוצרי CampIL, הזמנות ומדיניות.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py space-y-10" dir="rtl">
        {faqs.map(group => (
          <div key={group.category}>
            <h2 className="heading-sm text-[#111] mb-5 pb-3 border-b border-[#E4DDD2]" style={{ fontFamily: 'Rubik, sans-serif' }}>
              {group.category}
            </h2>
            <div className="space-y-3">
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`;
                const isOpen = openItem === key;
                return (
                  <div key={i} className="border border-[#E4DDD2] rounded-xl bg-white overflow-hidden">
                    <button
                      onClick={() => setOpenItem(isOpen ? null : key)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right cursor-pointer hover:bg-[#F8F7F3] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold text-[#111] text-sm" style={{ fontFamily: 'Rubik, sans-serif' }}>{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#888] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4">
                        <p className="text-sm text-[#555] leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="p-6 bg-tn-600/5 border border-tn-600/20 rounded-2xl text-center" dir="rtl">
          <p className="font-bold text-[#111] mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>יש לכם שאלה נוספת?</p>
          <p className="text-sm text-[#888] mb-4">הצוות שלנו עונה תוך יום עסקים אחד.</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            צרו קשר
          </a>
        </div>
      </div>
    </div>
  );
}
