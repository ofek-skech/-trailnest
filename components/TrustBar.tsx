import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';

const items = [
  {
    icon: Truck,
    title: 'Free Shipping',
    body: 'On all orders over $75',
  },
  {
    icon: RefreshCw,
    title: '60-Day Returns',
    body: 'Hassle-free return policy',
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    body: 'Built to last a lifetime',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    body: 'Talk to a real gear expert',
  },
];

export default function TrustBar() {
  return (
    <section
      className="bg-forest-800/40 border-y border-forest-700/50 py-8"
      aria-label="Why shop with CampNation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-center gap-3.5">
              <div
                className="flex-shrink-0 w-11 h-11 rounded-xl bg-ember-600/15 flex items-center justify-center"
                aria-hidden="true"
              >
                <Icon className="w-5 h-5 text-ember-500" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-100">{title}</p>
                <p className="text-xs text-stone-500 mt-0.5">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
