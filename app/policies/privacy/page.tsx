import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'מדיניות פרטיות — CampIL',
  description: 'כיצד CampIL אוספת, משתמשת ומגינה על המידע האישי שלך.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#0F2E24' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <p className="overline text-sand-400 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מדיניות</p>
          <h1 className="heading-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>מדיניות פרטיות</h1>
          <p className="text-white/60 text-sm mt-2">עדכון אחרון: בקרוב</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מבוא</h2>
            <p>CampIL מחויבת להגנה על המידע האישי שלכם. מדיניות פרטיות זו מסבירה כיצד אנחנו אוספים, משתמשים ומגינים על המידע שלכם כאשר מבצעים קנייה באתר או יוצרים קשר.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מידע שאנחנו אוספים</h2>
            <p>אנחנו אוספים מידע שאתם מספקים ישירות, כולל:</p>
            <ul className="list-disc pr-5 space-y-1 mt-2">
              <li>שם, כתובת מייל ומספר טלפון בעת ביצוע הזמנה או יצירת קשר</li>
              <li>כתובת למשלוח בעת השלמת רכישה</li>
              <li>היסטוריית הזמנות ופרטי כרטיסי אשראי מוצפנים (מעובדים על ידי ספקי תשלום — אנחנו לא שומרים פרטי כרטיס)</li>
              <li>תכתובות שהחלפנו במייל</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>כיצד אנחנו משתמשים במידע</h2>
            <p>אנחנו משתמשים במידע שלכם כדי:</p>
            <ul className="list-disc pr-5 space-y-1 mt-2">
              <li>לעבד ולמלא הזמנות</li>
              <li>לשלוח אישורי הזמנה ועדכוני משלוח</li>
              <li>לענות לשאלות ולספק תמיכת לקוחות</li>
              <li>לשלוח עדכונים שיווקיים רק בהסכמת המקבל</li>
              <li>לשפר את האתר, המוצרים והשירותים</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>שיתוף מידע</h2>
            <p>אנחנו לא מוכרים את המידע האישי שלכם לגורמים שלישיים. אנחנו עשויים לשתף מידע עם:</p>
            <ul className="list-disc pr-5 space-y-1 mt-2">
              <li><strong>שליחים וחברות הפצה</strong> לצורך מסירת הזמנות</li>
              <li><strong>ספקי תשלום</strong> לעיבוד תשלומים מאובטח</li>
              <li><strong>ספקי שירותי אנליטיקה</strong> לניתוח השימוש באתר</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>אבטחת מידע</h2>
            <p>אנחנו מיישמים הצפנת SSL ואמצעי אבטחה סטנדרטיים להגנה על המידע שלכם. עם זאת, אף שיטת העברה דרך האינטרנט אינה בטוחה ב-100%.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>הזכויות שלך</h2>
            <p>יש לך זכות לגשת, לתקן או לבקש מחיקה של המידע האישי שלך. לפניות בנושא, צרו קשר ב-<a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>יצירת קשר</h2>
            <p>לשאלות על מדיניות הפרטיות:<br />CampIL | מייל: <a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a> | טלפון: +972 XX-XXX-XXXX</p>
          </section>
        </div>
      </div>
    </div>
  );
}
