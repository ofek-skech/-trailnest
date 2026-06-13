import type { Metadata } from 'next';
import { Mountain, Package, RotateCcw, Headphones, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story — CampIL',
  description: 'CampIL — הבית הישראלי לציוד קמפינג, אוברלנדינג וטיולי 4X4. נבנה על ידי אנשים שחיים את השטח, לאנשים שחיים את השטח.',
};

const stats = [
  { value: '10',    label: 'Carefully Curated Products' },
  { value: '6',     label: 'Gear Categories'            },
  { value: '30',    label: 'Day Return Window'           },
  { value: '100%',  label: 'Secure Checkout'            },
];

const values = [
  {
    icon: Mountain,
    title: 'Trail-Tested',
    body: 'Every product is reviewed for real-world performance — durability, practicality, and value — before it earns a place in our range.',
  },
  {
    icon: Users,
    title: 'Community-Driven',
    body: 'CampIL was built by people who camp, overland, and go off-road. We understand what you need because we need the same things.',
  },
  {
    icon: Package,
    title: 'Curated, Not Bloated',
    body: 'We keep our range intentionally focused. Every product we list is one we genuinely believe in. Quality over quantity, always.',
  },
  {
    icon: Headphones,
    title: 'Real Support',
    body: 'Our support team knows the gear. Reach us by email or phone — in Hebrew or English — and you\'ll get a real answer from a person who understands what you need.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline text-sand-400 mb-3">Our Story</p>
          <h1
            className="heading-lg text-white mb-5"
            dir="rtl"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            הבית הישראלי<br className="hidden sm:block" /> לציוד שטח אמיתי
          </h1>
          <p className="text-white/70 leading-relaxed text-lg" dir="rtl" style={{ fontFamily: 'Rubik, sans-serif' }}>
            CampIL נבנה על ידי אנשים שחיים את השטח — לאנשים שחיים את השטח. ציוד שנבחר בקפידה, ללא פשרות.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#F8F5F0] border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-tn-600 mb-1">{s.value}</p>
              <p className="text-sm text-[#888]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
        <div className="prose max-w-none text-[#555] space-y-5">
          <h2 className="heading-sm text-[#111]">The CampIL Story</h2>
          <p>CampIL was born out of a simple frustration — finding good outdoor gear in Israel shouldn't be this hard. The Israeli camping and overlanding scene is vibrant, passionate, and growing fast. But the gear available locally often didn't match the quality the terrain demands.</p>
          <p>We set out to build something different: a focused, honest store run by people who actually go off-road. Every product in our range has been reviewed with the Israeli landscape in mind — from the Negev to the Galilee, from Wadi Rum day trips to full multi-day overlanding routes.</p>
          <p>CampIL is a new brand — and we think that honesty matters. We won't show you fake reviews or inflated customer counts. What we will show you is gear we believe in, clear product information, and a genuine commitment to making things right if anything goes wrong.</p>
          <h2 className="heading-sm text-[#111] pt-4">Our Promise</h2>
          <p>Every product on CampIL comes with a 30-day return window and a support team you can actually reach — in Hebrew or English. We&rsquo;re not a faceless warehouse. We&rsquo;re a small team that cares about the outdoors and about getting your order right.</p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-[#F8F5F0] border-t border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-py">
          <div className="text-center mb-12">
            <p className="overline text-tn-600 mb-3">What We Stand For</p>
            <h2 className="heading-md text-[#111]">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white border border-[#E5DDD0] rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-tn-600/10 flex items-center justify-center mb-4" aria-hidden="true">
                  <Icon className="w-5 h-5 text-tn-600" strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-bold text-[#111] mb-2">{title}</h3>
                <p className="text-sm text-[#555] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
