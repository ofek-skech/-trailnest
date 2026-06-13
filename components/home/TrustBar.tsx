import { Truck, RotateCcw, Lock, Headphones } from 'lucide-react';

const items = [
  {
    icon: Truck,
    he: 'משלוח מהיר ועם מעקב',
    en: 'Fast Tracked Shipping',
  },
  {
    icon: RotateCcw,
    he: 'החזרות תוך 30 יום',
    en: '30-Day Returns',
  },
  {
    icon: Lock,
    he: 'תשלום מאובטח 100%',
    en: 'Secure Checkout',
  },
  {
    icon: Headphones,
    he: 'שירות לקוחות אישי',
    en: 'Personal Support',
  },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-[#EDEBE6] py-8 lg:py-10" aria-label="Store guarantees">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
          {items.map(({ icon: Icon, he, en }) => (
            <div key={en} className="flex items-center gap-3.5 group" dir="rtl">
              <div className="w-10 h-10 rounded-xl bg-tn-600/8 flex items-center justify-center flex-shrink-0 group-hover:bg-tn-600/14 transition-colors">
                <Icon className="w-5 h-5 text-tn-600" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div className="text-right">
                <p
                  className="text-sm font-black text-[#111] leading-tight"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                >
                  {he}
                </p>
                <p className="text-xs text-[#999] mt-0.5">{en}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
