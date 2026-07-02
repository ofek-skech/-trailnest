import { Truck, ShieldCheck, RotateCcw, MessageCircle } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'משלוח לכל הארץ',
    desc: '3–7 ימי עסקים, אריזה מוגנת',
  },
  {
    icon: ShieldCheck,
    title: 'ספקים מאומתים',
    desc: 'כל ספק נבדק לפני שיתוף פעולה',
  },
  {
    icon: RotateCcw,
    title: 'החזרות קלות',
    desc: '30 יום ללא שאלות',
  },
  {
    icon: MessageCircle,
    title: 'שירות לקוחות',
    desc: 'בעברית, בוואטסאפ, מהיר',
  },
];

export default function TrustBadges() {
  return (
    <section
      aria-label="יתרונות CAMPIL"
      style={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.07)', padding: '28px 0' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {badges.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3.5" dir="rtl">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(212,131,10,0.10)' }}
                aria-hidden="true"
              >
                <Icon className="w-[18px] h-[18px]" style={{ color: '#D4830A' }} strokeWidth={1.9} />
              </div>
              <div className="min-w-0">
                <p
                  className="font-bold text-[#111] text-[13px] leading-snug"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {title}
                </p>
                <p
                  className="text-[11.5px] text-[#999] mt-0.5 leading-snug"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
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
