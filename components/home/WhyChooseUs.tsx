import { Wrench, Package, Users, HeadphonesIcon } from 'lucide-react';

const reasons = [
  {
    icon: Wrench,
    title: 'ציוד שנבדק בשטח',
    titleEn: 'Trail-Tested Gear',
    body: 'Every product is reviewed for real-world performance before it earns a place in our range. Durability and practicality come first — not how it looks in a catalog.',
  },
  {
    icon: Package,
    title: 'ציוד מעשי בלבד',
    titleEn: 'Practical Equipment Only',
    body: 'We stock what you actually need on a trip — not filler, not fast fashion. A focused range chosen for real value on the trail.',
  },
  {
    icon: Users,
    title: 'קהילת השטח',
    titleEn: 'The Outdoors Community',
    body: 'CampIL was built by and for the Israeli overlanding and camping community. We\'re here because we love the outdoors too — this is our home.',
  },
  {
    icon: HeadphonesIcon,
    title: 'תמיכה אמיתית',
    titleEn: 'Real Customer Support',
    body: 'Got a question about your order or gear? Our team knows the products and responds fast — in Hebrew or English. No bots, no templates.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-tn-600" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="overline text-sand-400 mb-3">Why CampIL</p>
          <h2
            id="why-heading"
            className="heading-md text-white mb-4"
            style={{ fontFamily: 'Rubik, sans-serif' }}
            dir="rtl"
          >
            למה CampIL?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed" dir="rtl" style={{ fontFamily: 'Rubik, sans-serif' }}>
            בנינו את CampIL כי קשה מדי למצוא ציוד שטח שבאמת עובד. ציוד שמגיע מאנשים שיוצאים לשטח — לא מאלגוריתמים.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, titleEn, body }) => (
            <div key={titleEn} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-sand-500/20 flex items-center justify-center mb-4 flex-shrink-0" aria-hidden="true">
                <Icon className="w-5 h-5 text-sand-400" strokeWidth={1.8} />
              </div>
              <p
                className="text-xs font-bold text-sand-400/70 uppercase tracking-wider mb-1"
                dir="rtl"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                {title}
              </p>
              <h3 className="text-base font-bold text-white mb-2">{titleEn}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
