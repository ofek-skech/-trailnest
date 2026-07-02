import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

const badges = [
  {
    Icon: Truck,
    title: 'משלוח לכל הארץ',
    desc: '3–7 ימי עסקים, אריזה מוגנת',
  },
  {
    Icon: ShieldCheck,
    title: 'ספקים מאומתים',
    desc: 'כל ספק נבדק לפני שיתוף פעולה',
  },
  {
    Icon: RotateCcw,
    title: 'החזרות קלות',
    desc: '30 יום ללא שאלות',
  },
  {
    Icon: Headphones,
    title: 'שירות לקוחות',
    desc: 'בעברית, בוואטסאפ, מהיר',
  },
];

export default function TrustBadges() {
  return (
    <section
      aria-label="יתרונות CAMPIL"
      style={{
        background: '#ffffff',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '0',
      }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: '2px solid #D4830A' }}
        >
          {badges.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              className="flex items-start gap-4 py-6 px-2 sm:px-4"
              dir="rtl"
              style={{
                borderRight: i < badges.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
              }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: '#1E2020' }}
                aria-hidden="true"
              >
                <Icon
                  className="w-[18px] h-[18px]"
                  style={{ color: '#D4830A' }}
                  strokeWidth={1.8}
                />
              </div>

              {/* Text */}
              <div className="min-w-0 pt-0.5">
                <p
                  className="font-bold text-[13px] leading-snug"
                  style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }}
                >
                  {title}
                </p>
                <p
                  className="text-[11.5px] mt-1 leading-snug"
                  style={{ fontFamily: 'Nunito Sans, sans-serif', color: '#888' }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
