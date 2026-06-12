import { Mountain, Users, Award, Globe } from 'lucide-react';

const stats = [
  { icon: Users,   value: '50,000+', label: 'Adventurers Equipped'   },
  { icon: Mountain,value: '12 Years', label: 'In the Outdoors Industry' },
  { icon: Award,   value: '48 Awards',label: 'for Gear Innovation'     },
  { icon: Globe,   value: '60+ Countries', label: 'Where We Ship'     },
];

export default function BrandStory() {
  return (
    <section className="section-padding overflow-hidden" aria-labelledby="brand-story-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: visual */}
          <div className="relative order-last lg:order-first">
            <div className="relative rounded-3xl overflow-hidden aspect-square max-w-md mx-auto lg:max-w-none bg-gradient-to-br from-forest-800 to-forest-900 border border-forest-700">
              {/* Mountain visual */}
              <svg viewBox="0 0 500 500" className="w-full h-full" aria-hidden="true">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0d1f12" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="500" height="500" fill="#0d1f12" />
                <circle cx="250" cy="250" r="200" fill="url(#glow)" />
                {/* Stars */}
                {[...Array(40)].map((_, i) => (
                  <circle key={i} cx={Math.sin(i * 137.5) * 200 + 250} cy={Math.cos(i * 137.5) * 200 + 250} r="1" fill="white" opacity={0.3 + Math.sin(i) * 0.3} />
                ))}
                {/* Mountain layers */}
                <path d="M50 420 L150 200 L220 300 L250 180 L280 290 L350 200 L450 420 Z" fill="#132a18" />
                <path d="M80 420 L200 250 L260 340 L300 220 L380 310 L450 420 Z" fill="#1c3d24" />
                <path d="M0 420 L120 300 L180 360 L250 280 L320 350 L400 300 L500 420 Z" fill="#265433" />
                {/* Snow caps */}
                <path d="M150 200 L170 230 L130 230 Z" fill="#e7e5e4" opacity="0.8" />
                <path d="M250 180 L268 210 L232 210 Z" fill="#e7e5e4" opacity="0.8" />
                <path d="M350 200 L370 230 L330 230 Z" fill="#e7e5e4" opacity="0.7" />
                {/* Moon */}
                <circle cx="380" cy="80" r="28" fill="#fcd34d" opacity="0.9" />
                <circle cx="395" cy="75" r="24" fill="#1a2e1a" />
              </svg>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:right-0 glass-card rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <p className="text-3xl font-black text-ember-500" style={{ fontFamily: 'Rubik, sans-serif' }}>
                #1
              </p>
              <p className="text-sm text-stone-300 font-medium mt-0.5">Rated outdoor brand</p>
              <p className="text-xs text-stone-500 mt-0.5">Outdoor Retailer 2025</p>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <p className="text-ember-500 text-sm font-semibold uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h2
              id="brand-story-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-50 mb-6 leading-tight"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              Born in the
              <br />
              <span className="gradient-text">Wild. Built for It.</span>
            </h2>
            <div className="space-y-4 text-stone-400 leading-relaxed mb-8">
              <p>
                CampNation was founded by guides and mountaineers who got fed up with gear that looked good in the shop but failed in the field. Every piece we sell has been stress-tested across four continents — from Patagonia to the Himalayas.
              </p>
              <p>
                We don&apos;t believe in disposable adventure. Our equipment is engineered to outlast trends, outlast conditions, and outlast excuses. When you pack CampNation, you pack confidence.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="bg-forest-800/50 border border-forest-700/50 rounded-xl p-4">
                  <Icon className="w-4 h-4 text-ember-500 mb-2" aria-hidden="true" />
                  <p className="text-xl font-bold text-stone-50" style={{ fontFamily: 'Rubik, sans-serif' }}>
                    {value}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
