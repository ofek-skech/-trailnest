import { ShieldCheck, Truck, Star, Wrench, Leaf, HeadphonesIcon } from 'lucide-react';
const reasons = [
  { icon: ShieldCheck, title:'Lifetime Warranty', body:'Every TrailNest product is backed by a lifetime warranty against manufacturing defects. If it breaks under normal use, we replace it — full stop.' },
  { icon: Truck,       title:'Fast, Free Shipping', body:'Orders over $75 ship free via 3–5 day tracked delivery. Expedited options available at checkout. Every order includes a tracking link.' },
  { icon: Star,        title:'4.9-Star Rated',   body:'Over 12,400 verified reviews with an average of 4.9 stars. Real adventurers, honest feedback — we don\'t filter our reviews.' },
  { icon: Wrench,      title:'Trail-Tested Gear', body:'Our team tests every product in real-world conditions: desert heat, alpine cold, and river crossings — before a single unit goes live.' },
  { icon: Leaf,        title:'Responsible Sourcing', body:'We work with factories audited for fair-labour and environmental standards. Premium gear shouldn\'t cost the planet.' },
  { icon: HeadphonesIcon, title:'Expert Support',  body:'Our support team are real overlanders who use the gear themselves. Reach us 7 days a week via chat, email, or phone.' },
];
export default function WhyChooseUs() {
  return (
    <section className="section-py bg-tn-600" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="overline text-sand-400 mb-3">Why TrailNest</p>
          <h2 id="why-heading" className="heading-md text-white mb-4">The Standard Other Brands<br className="hidden sm:block" /> Don&rsquo;t Meet</h2>
          <p className="text-white/60 max-w-xl mx-auto leading-relaxed">We built TrailNest because we kept getting let down by gear that looked great in photos but failed when it mattered. Every decision we make is for the adventurer, not the spreadsheet.</p>
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
