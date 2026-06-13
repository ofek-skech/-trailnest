import { Check } from 'lucide-react';
import Link from 'next/link';

const reasons = [
  {
    he: 'ציוד שנבחר בקפידה',
    en: 'Carefully Selected Gear',
    body: 'Every product is reviewed for real-world trail performance — not just how it looks in a catalog.',
  },
  {
    he: 'פתרונות מעשיים לשטח',
    en: 'Practical Field Solutions',
    body: 'We stock what you actually need on a trip — practical, proven, no filler.',
  },
  {
    he: 'קהילה של מטיילים ואנשי 4X4',
    en: 'Community of Campers & 4x4 Owners',
    body: 'Built by and for the Israeli overlanding and camping community. This is our home too.',
  },
  {
    he: 'שירות לקוחות אישי',
    en: 'Personal Customer Service',
    body: 'Real answers from people who know the gear — in Hebrew or English. No bots.',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="section-py overflow-hidden"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — brand manifesto panel */}
          <div
            className="relative rounded-3xl overflow-hidden bg-tn-800 p-10 lg:p-12 flex flex-col min-h-[400px]"
            aria-hidden="true"
          >
            {/* background texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 20% 80%, #D6C2A1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #2d5240 0%, transparent 50%)',
              }}
            />
            <div className="relative z-10 flex flex-col h-full">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand-400/60 mb-4"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                CampIL
              </p>
              <p
                className="text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6 flex-1"
                dir="rtl"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                הבית הישראלי<br />
                <span className="text-sand-400">לציוד שטח אמיתי</span>
              </p>
              <p
                className="text-white/55 text-sm leading-relaxed mb-8"
                dir="rtl"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                בחרנו כל מוצר כאילו אנחנו לוקחים אותו איתנו לשטח. ציוד שעובד — לא ציוד שנראה טוב בתמונה.
              </p>
              <Link
                href="/about"
                className="self-end inline-flex items-center gap-2 text-sand-400 text-sm font-bold hover:text-sand-300 transition-colors"
                dir="rtl"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                הסיפור שלנו
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>

          {/* Right — feature checklist */}
          <div>
            <p
              className="overline text-tn-600 mb-3"
              dir="rtl"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              למה לבחור CampIL
            </p>
            <h2
              id="why-heading"
              className="heading-md text-[#111] mb-10"
              dir="rtl"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              למה CampIL?
            </h2>

            <ul className="space-y-7" dir="rtl">
              {reasons.map(({ he, en, body }) => (
                <li key={en} className="flex items-start gap-4">
                  <div
                    className="w-6 h-6 rounded-full bg-tn-600/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Check className="w-3.5 h-3.5 text-tn-600" strokeWidth={3} />
                  </div>
                  <div>
                    <p
                      className="font-black text-[#111] mb-1"
                      style={{ fontFamily: 'Rubik, sans-serif', fontSize: '1.05rem' }}
                    >
                      {he}
                    </p>
                    <p className="text-sm text-[#666] leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
