import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Community() {
  return (
    <section className="section-py bg-white" aria-labelledby="community-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Image mosaic (staggered heights) ─────── */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 order-2 lg:order-1">
            {/* Top-left: large portrait */}
            <div className="rounded-2xl overflow-hidden img-zoom aspect-[3/4]">
              <img src="/images/camping-chairs.jpg" alt="קמפינג בשקיעה" className="w-full h-full object-cover" loading="lazy" />
            </div>
            {/* Top-right: short landscape */}
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="rounded-2xl overflow-hidden img-zoom aspect-square">
                <img src="/images/campfire-stars.jpg" alt="מדורה תחת כוכבים" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl overflow-hidden img-zoom flex-1">
                <img src="/images/family-camping.jpg" alt="קמפינג משפחתי" className="w-full h-full object-cover min-h-[120px]" loading="lazy" />
              </div>
            </div>
          </div>

          {/* ── Text block ───────────────────────────── */}
          <div className="order-1 lg:order-2" dir="rtl">
            <p className="overline text-tn-500 mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
              קהילת השטח הישראלית
            </p>
            <h2
              id="community-heading"
              className="heading-md text-[#111] mb-6"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              לא חנות גנרית.
              <br />
              <span className="text-tn-600">קהילה של אנשי שטח</span>
            </h2>

            {/* Pull quote */}
            <div className="border-r-[3px] border-sand-400 pr-5 mb-7">
              <p
                className="text-[#333] leading-relaxed italic"
                style={{ fontFamily: 'Rubik, sans-serif', fontSize: '1.05rem' }}
              >
                "אנחנו בוחרים מוצרים שאנחנו בעצמנו היינו לוקחים איתנו לשטח. לא מוצרים שנראים טוב בתמונה."
              </p>
            </div>

            <p
              className="text-[#777] leading-relaxed mb-10 text-sm"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              אם אתם נוסעים עם Jimny, Jeep, Hilux, Isuzu או כל רכב שטח אחר — CampIL נבנה בשבילכם. זו לא חנות גנרית. זו קהילה.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-all duration-200 hover:shadow-[0_6px_20px_rgba(31,58,46,0.32)]"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                לכל הציוד
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E4DDD2] hover:border-tn-600/40 text-[#555] hover:text-tn-600 font-bold text-sm rounded-xl transition-all duration-200"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                הסיפור שלנו
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
