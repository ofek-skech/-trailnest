import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const mosaicImages = [
  { src: '/images/camping-chairs.jpg',  alt: 'כיסאות קמפינג בשקיעה' },
  { src: '/images/campfire-stars.jpg',  alt: 'מדורה תחת כוכבים' },
  { src: '/images/family-camping.jpg',  alt: 'קמפינג משפחתי' },
  { src: '/images/tent-stars.jpg',      alt: 'אוהל תחת שמי הלילה' },
];

export default function Community() {
  return (
    <section
      className="section-py bg-[#F8F5F0]"
      aria-labelledby="community-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image mosaic */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4 order-2 lg:order-1">
            {mosaicImages.map(({ src, alt }, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden img-zoom ${i === 0 ? 'aspect-[4/3]' : i === 3 ? 'aspect-[4/3]' : 'aspect-square'}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Text block */}
          <div className="order-1 lg:order-2" dir="rtl">
            <p
              className="overline text-tn-600 mb-4"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              קהילת השטח הישראלית
            </p>
            <h2
              id="community-heading"
              className="heading-md text-[#111] mb-5"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              נבנה על ידי אנשים
              <br />
              <span className="text-tn-600">שאוהבים שטח</span>
            </h2>
            <p
              className="text-[#555] leading-relaxed mb-4"
              style={{ fontFamily: 'Rubik, sans-serif', fontSize: '1.05rem' }}
            >
              CampIL נולד מתוך אהבה לטיולים, קמפינג ונהיגת שטח. אנחנו בוחרים מוצרים שאנחנו בעצמנו היינו לוקחים איתנו לשטח.
            </p>
            <p
              className="text-[#888] leading-relaxed mb-9 text-sm"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              אם אתם נוסעים עם Jimny, Jeep, Hilux, Isuzu או כל רכב שטח אחר — CampIL נבנה בשבילכם. זה לא חנות גנרית. זו קהילה.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-tn-600 hover:bg-tn-800 text-white font-bold text-sm rounded-xl transition-all duration-200"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                לכל הציוד
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#E5DDD0] hover:border-tn-600 text-[#555] hover:text-tn-600 font-bold text-sm rounded-xl transition-all duration-200"
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
