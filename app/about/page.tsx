import type { Metadata } from 'next';
import { Mountain, Package, RotateCcw, Headphones, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'הסיפור שלנו — CampIL',
  description: 'CampIL — הבית הישראלי לציוד קמפינג, אוברלנדינג ורכב שטח. נבנה על ידי אנשים שחיים את השטח.',
};

const stats = [
  { value: '100+', label: 'מוצרים נבחרים' },
  { value: '10',   label: 'קטגוריות ציוד' },
  { value: '30',   label: 'יום החזרה'     },
  { value: '48',   label: 'שעות עיבוד'    },
];

const values = [
  {
    icon: Mountain,
    title: 'נבחן בשטח',
    body: 'כל מוצר עובר בדיקה על פי הצרכים האמיתיים של השטח הישראלי — מחוספד הנגב ועד גבהי הגולן.',
  },
  {
    icon: Users,
    title: 'נבנה על ידי מטיילים',
    body: 'CampIL נבנה על ידי אנשים שיוצאים לשטח. אנחנו מבינים מה נחוץ כי אנחנו עצמנו יוצאים לשם.',
  },
  {
    icon: Package,
    title: 'איכות, לא כמות',
    body: 'אנחנו בוחרים מוצרים בקפידה, לא מוכרים הכל לכולם. כל מה שבחנות — ציוד שנבחר בקפידה ועובד בשטח.',
  },
  {
    icon: Headphones,
    title: 'תמיכה מקומית',
    body: 'צרו קשר במייל או בוואטסאפ ותקבלו תשובה ממישהו שמכיר את הציוד — בעברית, ביום עסקים.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="text-white pt-[120px] pb-16 lg:pt-[140px] lg:pb-20" style={{ background: '#0F2E24' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline text-sand-400 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>
            הסיפור שלנו
          </p>
          <h1 className="heading-lg text-white mb-5" dir="rtl" style={{ fontFamily: 'Rubik, sans-serif' }}>
            הבית הישראלי<br className="hidden sm:block" /> לציוד שטח אמיתי
          </h1>
          <p className="text-white/70 leading-relaxed" dir="rtl" style={{ fontFamily: 'Rubik, sans-serif' }}>
            CampIL נבנה על ידי אנשים שחיים את השטח — עבור אנשים שחיים את השטח.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#F8F7F3] border-b border-[#E4DDD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-tn-600 mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>{s.value}</p>
              <p className="text-sm text-[#888]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py" dir="rtl">
        <div className="space-y-6 text-[#555] leading-relaxed">
          <h2 className="heading-sm text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
            הסיפור של CampIL
          </h2>
          <p>
            CampIL נולד מתוך תסכון אמיתי: למצוא ציוד שטח איכותי בישראל היה קשה מדי. סצנת הקמפינג והאוברלנד הישראלית גדלה בקצב מהיר — אנשים יוצאים לנגב, לגליל, לגולן — אבל הציוד הזמין לא תמיד עמד ברמה.
          </p>
          <p>
            רצינו לבנות משהו אחר: חנות מרוכזת, ישרה, שנוהלת על ידי אנשים שבאמת יוצאים לשטח. כל מוצר נבחר תוך מחשבה על השטח הישראלי — מסלעי הגליל ועד חולות ערבה.
          </p>
          <p>
            CampIL הוא מותג חדש — ואנחנו מאמינים שיש ערך בישרות ובשקיפות. לא נציג ביקורות מנופחות. נציג ציוד שאנחנו מאמינים בו, מידע ברור, ושירות שמפשר לסמוך עלינו.
          </p>
          <h2 className="heading-sm text-[#111] pt-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
            ההתחייבויות שלנו
          </h2>
          <p>
            כל מוצר ב-CampIL מגיע עם חלון החזרה של 30 יום וצוות תמיכה שמאפשר להגיע אלינו בוואטסאפ או במייל. אנחנו צוות קטן שמכיר ואוהב את השטח — ואתכם.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#F8F7F3] border-t border-[#E4DDD2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
          <div className="text-center mb-12" dir="rtl">
            <p className="overline text-tn-600 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>מה אנחנו מאמינים</p>
            <h2 className="heading-md text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>הערכים שלנו</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" dir="rtl">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-[#E4DDD2] rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-tn-600/10 flex items-center justify-center mb-4" aria-hidden="true">
                  <Icon className="w-5 h-5 text-tn-600" strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-bold text-[#111] mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>{title}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
