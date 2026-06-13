import type { Metadata } from 'next';
import { Mountain, Package, RotateCcw, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story — TrailNest',
  description: 'Meet the people behind TrailNest. We built the brand we always wished existed — practical overlanding and camping gear, selected for real adventures.',
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
    icon: RotateCcw,
    title: '30-Day Returns',
    body: 'We back every product with a 30-day hassle-free return window. If you\'re not satisfied, we\'ll make it right — no questions asked.',
  },
  {
    icon: Package,
    title: 'Curated, Not Bloated',
    body: 'We keep our range intentionally small. Every product we list is one we genuinely believe in. Quality over quantity, always.',
  },
  {
    icon: Headphones,
    title: 'Real Support',
    body: 'Our support team knows the gear. Reach us by email or phone and you\'ll get a real answer from a person who understands what you need.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline text-sand-400 mb-3">Our Story</p>
          <h1 className="heading-lg text-white mb-5">Built for the Trail.<br className="hidden sm:block" /> Honest About What We Are.</h1>
          <p className="text-white/70 leading-relaxed text-lg">
            TrailNest is a new brand with a clear mission: curate the best outdoor and overlanding gear, stand behind every product, and build a brand adventurers can actually trust.
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
          <h2 className="heading-sm text-[#111]">The TrailNest Story</h2>
          <p>TrailNest was born from a simple frustration — great-looking gear that fails in the field. We kept buying products that promised performance but cracked, died, or collapsed on the first real trip out. So we set out to build the brand we always wished existed.</p>
          <p>That question drove us: <em>Why is it so hard to find camping gear that actually works?</em> The market is flooded with products that look premium in photos but fall apart under real-world conditions. We decided to do something about it.</p>
          <p>TrailNest launched with a focused range of gear for weekend campers, overlanders, and 4×4 travelers. We are a new brand — and we think that honesty matters. We won't show you thousands of fake reviews or inflated customer counts. What we will show you is carefully selected gear, clear product information, and a genuine commitment to making your experience right if anything goes wrong.</p>
          <h2 className="heading-sm text-[#111] pt-4">Our Promise to You</h2>
          <p>Every product on TrailNest comes with a 30-day return window and a support team that has actually used the gear. We&rsquo;re not a faceless warehouse — we&rsquo;re a small team that cares deeply about getting it right, every time.</p>
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
