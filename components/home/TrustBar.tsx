import { Truck, RotateCcw, Package, MessageCircle } from 'lucide-react';

const items = [
  { icon: Truck,         he: 'משלוח עד הבית',       sub: '3–7 ימי עסקים לכל הארץ' },
  { icon: RotateCcw,     he: 'החזרה תוך 30 יום',    sub: 'ללא שאלות, ללא בירוקרטיה' },
  { icon: Package,       he: 'אריזה מוגנת',          sub: 'כל מוצר מגיע מוגן ומוכן לשטח' },
  { icon: MessageCircle, he: 'שירות בעברית',         sub: 'בוואטסאפ · יום עסקים אחד' },
];

export default function TrustBar() {
  return (
    <section
      aria-label="ערכי החנות"
      style={{ background: '#FAF8F3', borderTop: '1px solid rgba(0,0,0,0.06)', borderBottom: '1px solid rgba(0,0,0,0.06)', padding: '36px 0' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, he, sub }) => (
            <div key={he} className="flex items-start gap-3.5" dir="rtl">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(60,74,50,0.09)' }}
                aria-hidden="true"
              >
                <Icon className="w-[18px] h-[18px] text-tn-600" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-[#111] text-[13px] leading-snug" style={{ fontFamily: 'Rubik, sans-serif' }}>
                  {he}
                </p>
                <p className="text-[11.5px] text-[#999] leading-normal mt-0.5" style={{ fontFamily: 'Rubik, sans-serif' }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
