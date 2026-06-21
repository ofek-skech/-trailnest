import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'תנאי שימוש — CampIL',
  description: 'תנאי השימוש המסדירים את השימוש באתר CampIL ורכישות מהחנות.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#0F2E24' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
          <p className="overline mb-3" style={{ fontFamily: 'Rubik, sans-serif', color: '#D8C8A8', opacity: 0.7 }}>מדיניות</p>
          <h1 className="heading-lg text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>תנאי שימוש</h1>
          <p className="text-white/60 text-sm mt-2">עדכון אחרון: בקרוב</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
        <div className="prose text-[#555] space-y-8">
          <section>
            <h2 className="heading-sm text-[#111] mb-3">1. הסכמה לתנאים</h2>
            <p>כניסה לאתר CampIL או רכישת מוצרים מהחנות מהווה הסכמה לתנאי שימוש אלה. אם אינכם מסכימים לתנאים, אין להשתמש באתר.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">2. מוצרים ומחירים</h2>
            <p>אנו שומרים לעצמנו את הזכות לשנות או להפסיק מוצרים בכל עת ללא הודעה מוקדמת. המחירים מוצגים בשקלים חדשים (₪) וכוללים מע"מ, אלא אם צוין אחרת. שינויי מחיר לא יחולו על הזמנות שאושרו.</p>
            <p>תמונות ותיאורי המוצרים הינם לצורכי המחשה. אנו שואפים לדיוק, אך לא נוכל להבטיח שהצבעים, המידות והמאפיינים יתאימו בדיוק למוצר הפיזי.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">3. הזמנות ותשלום</h2>
            <p>בביצוע הזמנה אתם מצהירים שאתם בני 18 לפחות ורשאים להשתמש באמצעי התשלום שסיפקתם. אנו שומרים לעצמנו את הזכות לסרב או לבטל כל הזמנה לפי שיקול דעתנו, לרבות במקרים של חשד לתרמית.</p>
            <p>אישור הזמנה במייל אינו מהווה קבלת ההזמנה. הקבלה מתרחשת עם משלוח הסחורה ואישור המשלוח.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">4. קניין רוחני</h2>
            <p>כל התוכן באתר זה — כולל טקסטים, תמונות, גרפיקה, לוגואים ותוכנות — הינו רכושה של CampIL או ספקי התוכן שלה ומוגן על פי דיני קניין רוחני. אין לשכפל, להפיץ או ליצור עבודות נגזרות ללא אישורנו המפורש בכתב.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">5. הגבלת אחריות</h2>
            <p>ככל המותר על פי דין, CampIL לא תהיה אחראית לנזקים עקיפים, מקריים, מיוחדים, תוצאתיים או עונשיים הנובעים מהשימוש באתר או במוצרים. האחריות הכוללת שלנו לא תעלה על הסכום ששולם עבור המוצר הספציפי.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">6. שימושים אסורים</h2>
            <p>אסור להשתמש באתר או בשירותים שלנו כדי:</p>
            <ul className="list-disc pr-5 space-y-1 mt-2">
              <li>להפר כל חוק או תקנה חלים</li>
              <li>להגיש מידע שקרי, מטעה או מרמה</li>
              <li>לנסות לגשת ללא הרשאה למערכות שלנו</li>
              <li>להעביר תוכן מזיק, פוגעני או מפריע</li>
              <li>למכור מחדש את מוצרינו מסחרית ללא הסכמתנו הכתובה</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">7. דין חל</h2>
            <p>הדין החל על תנאים אלה יאושר עם השלמת הרישום המשפטי שלנו. לעת עתה, כל מחלוקת תיפתר בתום לב ישירות בין הצדדים. צרו קשר ב-<a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a>.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">8. שינויים בתנאים</h2>
            <p>אנו עשויים לתקן תנאים אלה בכל עת. תאריך "העדכון האחרון" בראש דף זה ישקף את השינויים האחרונים. המשך שימוש באתר לאחר שינויים מהווה הסכמה לתנאים המתוקנים.</p>
          </section>

          <section>
            <h2 className="heading-sm text-[#111] mb-3">9. יצירת קשר</h2>
            <p>לשאלות על תנאי שימוש אלה, צרו קשר ב-<a href="mailto:campil.info@gmail.com" className="text-tn-600 hover:underline">campil.info@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
