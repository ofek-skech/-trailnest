import { Truck, RotateCcw, Lock, Headphones } from 'lucide-react';

const items = [
  { icon: Truck,       title: 'Tracked Shipping',  body: 'Every order ships with tracking'   },
  { icon: RotateCcw,   title: '30-Day Returns',    body: 'Hassle-free, no questions asked'   },
  { icon: Lock,        title: 'Secure Checkout',   body: '256-bit SSL on every transaction'  },
  { icon: Headphones,  title: 'Customer Support',  body: 'Real help when you need it'        },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-[#EDEBE6] py-8 lg:py-10" aria-label="Store guarantees">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-tn-600/8 flex items-center justify-center flex-shrink-0 group-hover:bg-tn-600/14 transition-colors">
                <Icon className="w-5 h-5 text-tn-600" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111111] leading-tight tracking-tight">{title}</p>
                <p className="text-xs text-[#999] mt-0.5 leading-snug">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
