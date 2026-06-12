import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah K.',
    role: 'Thru-hiker, Appalachian Trail',
    rating: 5,
    text: 'The Apex Pro tent handled three consecutive nights of wind and rain without a single leak. I\'ve tried seven different tents over the years — this is the only one I\'d trust my life to.',
    product: 'Apex Pro 3-Person Tent',
    avatar: 'SK',
  },
  {
    id: 2,
    name: 'Marcus T.',
    role: 'Winter mountaineer',
    rating: 5,
    text: 'Used the Summit Sleeping Bag at -18°C in the Rockies. Slept comfortably. The hydrophobic down really makes the difference when your breath starts condensing inside the bag.',
    product: 'Summit Bag -20°F Rated',
    avatar: 'MT',
  },
  {
    id: 3,
    name: 'Priya R.',
    role: 'Trail runner & backpacker',
    rating: 5,
    text: 'I\'ve put 800 km on the TrailBlaze boots. The Vibram outsole still looks new. My ankles feel supported even on the worst scree. Worth every cent — I just ordered a second pair.',
    product: 'TrailBlaze Hiking Boots',
    avatar: 'PR',
  },
];

export default function Testimonials() {
  return (
    <section
      className="section-padding bg-forest-950/60"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-ember-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Social Proof
          </p>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-bold text-stone-50 mb-4"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            Trusted by Real Adventurers
          </h2>

          {/* Overall rating */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-forest-800/50 border border-forest-700/50 rounded-full">
            <div className="flex gap-0.5" aria-label="Overall rating: 4.8 out of 5">
              {[1,2,3,4,5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= 4 ? 'fill-brand-gold text-brand-gold' : 'fill-brand-gold/50 text-brand-gold/50'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-stone-200">4.8 / 5</span>
            <span className="text-stone-500 text-sm">from 12,400+ reviews</span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <blockquote
              key={review.id}
              className="bg-forest-800/50 border border-forest-700/50 rounded-2xl p-6 hover:border-forest-600 transition-colors duration-200 flex flex-col"
            >
              <Quote className="w-6 h-6 text-ember-600/40 mb-4 flex-shrink-0" aria-hidden="true" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3" aria-label={`Rating: ${review.rating} stars`}>
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${s <= review.rating ? 'fill-brand-gold text-brand-gold' : 'text-stone-600'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-stone-300 text-sm leading-relaxed flex-1 mb-5">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Product badge */}
              <p className="text-xs text-ember-500 font-medium mb-4">
                Verified purchase: {review.product}
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 pt-4 border-t border-forest-700/50">
                <div
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-ember-700 to-forest-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  {review.avatar}
                </div>
                <div>
                  <cite className="text-sm font-semibold text-stone-100 not-italic">{review.name}</cite>
                  <p className="text-xs text-stone-500">{review.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
