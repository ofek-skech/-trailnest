import { Check } from 'lucide-react';
import Link from 'next/link';

const reasons = [
  {
    he: 'ציוד שנבחר בקפידה',
    body: 'כל מוצר נבחן בשטח ולא רק בקטלוג. אנחנו בוחרים רק מה שעובד — גם בחום הנגב, גם בקור הגולן.',
  },
  {
    he: 'פתרונות מעשיים לשטח',
    body: 'אין מלאי למראית עין. כל מה שנמצא כאן הוא ציוד שמישהו ממנו לקח ליציאה אמיתית.',
  },
  {
    he: "קהילה של מטיילים ואנשי 4×4",
    body: "CAMPIL נבנה עבור ציבור האוברלנדינג הישראלי. ג'ימני, ג'יפ, הילוקס — זה הבית שלנו גם.",
  },
  {
    he: 'שירות לקוחות אישי',
    body: 'תשובות אמיתיות מאנשים שמכירים את הציוד. בעברית, בוואטסאפ, ללא בוטים.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-py overflow-hidden bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── Left: manifesto panel with photo bg ─── */}
          <div className="relative rounded-3xl overflow-hidden min-h-[480px] flex flex-col">
            {/* Background lifestyle photo */}
            <img
              src="/images/desert-tent.jpg"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Brand overlay — lighter to let photography breathe */}
            <div className="absolute inset-0 bg-tn-900/72" />
            {/* Texture */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 80%, #D6C2A1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #3a6b53 0%, transparent 50%)',
              }}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full p-10 lg:p-12">
              <p
                className="text-[9px] font-bold uppercase tracking-[0.22em] mb-5"
                style={{ fontFamily: 'Rubik, sans-serif', color: 'rgba(212,131,10,0.65)' }}
              >
                CAMPIL
              </p>
              <p
                className="font-black text-white leading-[1.06] mb-5 flex-1"
                dir="rtl"
                style={{
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  letterSpacing: '-0.026em',
                }}
              >
                נבחן בנגב,
                <br />
                בגליל וברמת הגולן.
                <br />
                <span style={{ color: '#E8940A' }}>לא בקטלוג.</span>
              </p>
              <p
                className="text-white/55 text-sm leading-relaxed mb-8"
                dir="rtl"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                כל מוצר נבחן בשטח ולא רק על מסך. אם לא היינו לוקחים אותו איתנו, הוא לא מופיע כאן.
              </p>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4 mb-8 pt-7 border-t border-white/10" dir="rtl">
                {[
                  { n: '100+', l: 'מוצרים'       },
                  { n: '30',   l: 'יום החזרה'    },
                  { n: '48',   l: 'שעות עיבוד'   },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-black text-white text-lg leading-tight" style={{ fontFamily: 'Rubik, sans-serif' }}>{n}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{l}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="self-start inline-flex items-center gap-2 text-sand-400 hover:text-sand-300 text-sm font-bold transition-colors"
                dir="rtl"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                הסיפור שלנו
                <span aria-hidden="true">←</span>
              </Link>
            </div>
          </div>

          {/* ── Right: feature checklist ─────────────── */}
          <div>
            <p className="overline text-tn-500 mb-3" dir="rtl" style={{ fontFamily: 'Rubik, sans-serif' }}>
              למה CAMPIL
            </p>
            <h2
              id="why-heading"
              className="heading-md text-[#111] mb-12"
              dir="rtl"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              ציוד שנבנה עבור<br />
              <span className="text-tn-600">השטח הישראלי</span>
            </h2>

            <ul className="space-y-8" dir="rtl">
              {reasons.map(({ he, body }, i) => (
                <li key={he} className="flex items-start gap-5">
                  <div
                    className="w-7 h-7 rounded-full bg-tn-600/10 border border-tn-600/15 flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Check className="w-3.5 h-3.5 text-tn-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p
                      className="font-black text-[#111] mb-1.5 leading-snug"
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
