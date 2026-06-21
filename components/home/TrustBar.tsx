import { Truck, RotateCcw, Package, MessageCircle } from 'lucide-react';

const items = [
  {
    icon: Truck,
    he:  'משלוח עד הבית',
    sub: '3–7 ימי עסקים לכל הארץ',
  },
  {
    icon: RotateCcw,
    he:  'החזרה תוך 30 יום',
    sub: 'ללא שאלות, ללא בירוקרטיה',
  },
  {
    icon: Package,
    he:  'אריזה מוגנת',
    sub: 'כל מוצר מגיע מוגן ומוכן לשטח',
  },
  {
    icon: MessageCircle,
    he:  'שירות לקוחות בעברית',
    sub: 'בוואטסאפ · יום עסקים אחד',
  },
];

export default function TrustBar() {
  return (
    <section
      className="bg-white"
      style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '40px 0' }}
      aria-label="ערכי החנות"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, he, sub }) => (
            <div key={he} className="flex items-start gap-4">
              {/* Icon container */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(31,77,58,0.08)' }}
                aria-hidden="true"
              >
                <Icon className="w-4.5 h-4.5 text-tn-600" strokeWidth={1.7} />
              </div>
              {/* Text */}
              <div className="min-w-0" dir="rtl">
                <p
                  className="font-bold text-[#111] text-sm leading-snug"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {he}
                </p>
                <p className="text-xs text-[#999] leading-normal mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
