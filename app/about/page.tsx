import type { Metadata } from 'next';
import { Mountain, Users, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story — TrailNest',
  description: 'Meet the adventurers behind TrailNest. We built the brand we always wished existed — premium overlanding and camping gear, tested in the real world.',
};

const stats = [
  { value: '50K+',  label: 'Happy Adventurers' },
  { value: '12,400+', label: 'Verified Reviews' },
  { value: '4.9★',  label: 'Average Rating'    },
  { value: '6+',    label: 'Gear Categories'    },
];

const values = [
  { icon: Mountain, title: 'Trail-Tested', body: 'Every product is tested in real conditions — desert heat, alpine cold, river crossings — before a single unit goes live.' },
  { icon: Shield,   title: 'Built to Last', body: 'We back every product with a lifetime warranty. If it breaks under normal use, we replace it — no questions asked.' },
  { icon: Users,    title: 'Community First', body: 'We listen to our customers. Product updates, new categories, and gear reviews are driven by real feedback from the trail.' },
  { icon: Globe,    title: 'Responsible Sourcing', body: 'We audit our suppliers for fair-labour standards and environmental practices. Premium gear shouldn\'t cost the planet.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-tn-600 text-white section-py">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="overline text-sand-400 mb-3">Our Story</p>
          <h1 className="heading-lg text-white mb-5">Built by Adventurers,<br className="hidden sm:block" /> for Adventurers</h1>
          <p className="text-white/70 leading-relaxed text-lg">TrailNest was born from frustration — gear that looked great in photos but failed when it mattered. We set out to build the brand we always wished existed.</p>
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
          <p>That question drove us: <em>Why is it so hard to find camping gear that actually works?</em> The market was flooded with products that looked premium in stock photos but fell apart under real-world conditions. So we decided to do something about it.</p>
          <p>TrailNest launched with a single mission: source, test, and stand behind gear that adventurers can genuinely rely on. Every product in our range is put through a rigorous testing protocol before it earns a place on the site — cold nights, desert heat, river crossings, and everything in between.</p>
          <p>Today, TrailNest serves tens of thousands of adventurers who demand more from their gear. Our team is still small, still passionate, and still takes the gear out on every trip we can. That won't change.</p>
          <h2 className="heading-sm text-[#111] pt-4">Our Promise to You</h2>
          <p>Every product on TrailNest comes with a lifetime warranty, free returns within 30 days, and a support team who have actually used the gear. We&rsquo;re not a faceless warehouse — we&rsquo;re a team of people who care deeply about getting it right.</p>
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
