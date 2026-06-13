import { RotateCcw, Truck, Wrench, Leaf, HeadphonesIcon, Lock } from 'lucide-react';

const reasons = [
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    body: 'Not happy with your purchase? Return it within 30 days for a full refund — no questions asked. We want you to shop with confidence.',
  },
  {
    icon: Truck,
    title: 'Tracked Shipping',
    body: 'Every order is dispatched with full tracking. You\'ll receive a tracking link as soon as your gear leaves our warehouse.',
  },
  {
    icon: Wrench,
    title: 'Trail-Tested Gear',
    body: 'We review every product for real-world performance before it earns a place in our range. Durability and practicality come first.',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    body: 'All transactions are protected by 256-bit SSL encryption. Your payment details are never stored on our servers.',
  },
  {
    icon: Leaf,
    title: 'Responsible Sourcing',
    body: 'We work with suppliers who meet fair-labour and environmental standards. Premium gear shouldn\'t cost the planet.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Customer Support',
    body: 'Have a question about your order or a product? Our support team replies quickly and knows the gear inside out.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-py bg-tn-600" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="overline text-sand-400 mb-3">Why TrailNest</p>
          <h2 id="why-heading" className="heading-md text-white mb-4">
            The Standard Other Brands<br className="hidden sm:block" /> Don&rsquo;t Meet
          </h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">
            We built TrailNest because we kept getting let down by gear that looked great in photos but failed when it mattered. Every decision we make is for the adventurer, not the spreadsheet.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-sand-500/20 flex items-center justify-center mb-4" aria-hidden="true">
                <Icon className="w-5 h-5 text-sand-400" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
