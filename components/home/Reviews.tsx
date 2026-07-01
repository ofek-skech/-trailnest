import { Compass, Package, Wrench } from 'lucide-react';

const pillars = [
  {
    icon: Compass,
    title: 'Built for weekend campers, overlanders and 4ֳ—4 travelers',
    body: 'Every product in our range is selected with real trail use in mind ג€” not showroom aesthetics. If it doesn\'t perform in the field, it doesn\'t make the cut.',
  },
  {
    icon: Package,
    title: 'Curated outdoor gear for real adventures',
    body: 'We don\'t list hundreds of products. We list the right ones. Our range is small, deliberate, and chosen for durability, practicality, and honest value.',
  },
  {
    icon: Wrench,
    title: 'New arrivals selected for durability and practicality',
    body: 'Each product we add goes through a review process focused on build quality and real-world usefulness. No filler, no fast fashion, no compromises.',
  },
];

export default function BrandPillars() {
  return (
    <section className="section-py" aria-labelledby="pillars-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="overline text-tn-600 mb-3">Our Approach</p>
          <h2 id="pillars-heading" className="heading-md text-[#111]">Gear You Can Count On</h2>
          <p className="text-[#888] mt-4 max-w-xl mx-auto leading-relaxed">
            CAMPIL is a new brand with a clear focus: source the best gear for serious outdoor use and stand behind every product we sell.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-[#F8F5F0] border border-[#E5DDD0] rounded-2xl p-7 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-tn-600/10 flex items-center justify-center mb-5 flex-shrink-0" aria-hidden="true">
                <Icon className="w-5 h-5 text-tn-600" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-[#111] leading-snug mb-3">{title}</h3>
              <p className="text-sm text-[#555] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

