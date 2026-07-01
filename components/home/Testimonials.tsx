import Link from 'next/link';
import { MessageCircle, Star } from 'lucide-react';

const pillars = [
  {
    icon: '🏕️',
    title: 'נבחן בשטח',
    text: 'כל מוצר נבדק בשטח ישראלי — נגב, גליל, גולן — לפני שנכנס לחנות.',
  },
  {
    icon: '💬',
    title: 'שירות אישי',
    text: 'אנחנו מותג חדש ואיכפת לנו. כל שאלה מקבלת תשובה אישית מאנשים שמכירים את הציוד.',
  },
  {
    icon: '🔄',
    title: '30 יום החזרה',
    text: 'אם לא מרוצים — מחזירים ומקבלים החזר מלא. ללא שאלות, ללא בירוקרטיה.',
  },
];

export default function Testimonials() {
  return (
    <section className="section-py" style={{ background: '#F4EEE4' }} aria-labelledby="trust-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-14" dir="rtl">
          <p className="overline text-tn-500 mb-3" style={{ fontFamily: 'Rubik, sans-serif' }}>
            שקיפות מלאה, ציוד אמיתי
          </p>
          <h2 id="trust-heading" className="heading-md text-[#111]" style={{ fontFamily: 'Rubik, sans-serif' }}>
            למה לסמוך עלינו?
          </h2>
          <p className="text-[#666] text-sm mt-3 max-w-md mx-auto leading-relaxed">
            CAMPIL בתחילת הדרך. אנחנו לא נציג ביקורות מנופחות — רק ציוד שאנחנו מאמינים בו ושירות שאפשר לסמוך עליו.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {pillars.map(({ icon, title, text }) => (
            <div
              key={title}
              className="bg-white border border-[#E4DDD2] rounded-2xl p-7 flex flex-col"
              dir="rtl"
            >
              <span className="text-3xl mb-4" aria-hidden="true">{icon}</span>
              <h3 className="font-bold text-[#111] mb-2" style={{ fontFamily: 'Rubik, sans-serif' }}>{title}</h3>
              <p className="text-sm text-[#555] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Stars + CTA */}
        <div className="bg-white border border-[#E4DDD2] rounded-2xl p-8 text-center" dir="rtl">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5" style={{ color: '#D4830A', fill: '#D4830A' }} aria-hidden="true" />
            ))}
          </div>
          <p className="font-bold text-[#111] mb-1" style={{ fontFamily: 'Rubik, sans-serif' }}>
            היו מהראשונים לדרג
          </p>
          <p className="text-sm text-[#888] mb-5 max-w-xs mx-auto">
            קנו, נסו, ספרו לנו. חוות דעת אמיתיות יתווספו לאחר הזמנות ראשונות.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-colors"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            לציוד בחנות
          </Link>
          <p className="text-xs text-[#888] mt-3 flex items-center justify-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5" />
            שאלות? נשמח לענות בוואטסאפ
          </p>
        </div>
      </div>
    </section>
  );
}
