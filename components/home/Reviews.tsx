import { Star, Quote } from 'lucide-react';
const reviews = [
  { id:1, name:'Sarah K.', role:'Overlander, Baja 1000 finisher', rating:5, text:'The car side awning is hands-down the best camping purchase I\'ve made in 10 years of overlanding. Solo deploy, bomber build quality, and the LED strip is a game changer after dark.', product:'Car Side Awning 2.5m', avatar:'SK' },
  { id:2, name:'Marcus T.', role:'Off-road guide, Moab, UT', rating:5, text:'I run TrailNest gear on every guided trip I lead. The air compressor has aired up well over 200 sets of tyres without missing a beat. My clients ask where to buy one every single time.', product:'Portable Air Compressor 12V', avatar:'MT' },
  { id:3, name:'Priya R.', role:'Overlanding photographer', rating:5, text:'As someone who needs reliable light for camp shoots, the rechargeable lantern is perfect. 60 hours on a charge means it lasts the whole trip. The warm glow mode is exactly right for evening shots.', product:'Rechargeable LED Lantern', avatar:'PR' },
  { id:4, name:'James D.', role:'Weekend camper, Pacific Coast Trail', rating:5, text:'The camping shower took our family car camping to a completely different level. Kids now actually want to camp. Worth every penny just for the hot showers after a long hike.', product:'Portable Camping Shower', avatar:'JD' },
];
export default function Reviews() {
  return (
    <section className="section-py" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="overline text-tn-600 mb-3">Customer Reviews</p>
          <h2 id="reviews-heading" className="heading-md text-[#111] mb-4">What Adventurers Say</h2>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#F8F5F0] border border-[#E5DDD0] rounded-full">
            <div className="flex gap-0.5" aria-label="4.9 out of 5 stars">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-sand-500 text-sand-500" aria-hidden="true" />)}
            </div>
            <span className="text-sm font-bold text-[#111]">4.9 / 5</span>
            <span className="text-[#888] text-sm">· 12,400+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map(r => (
            <blockquote key={r.id} className="bg-white border border-[#E5DDD0] rounded-2xl p-5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] transition-shadow flex flex-col">
              <Quote className="w-5 h-5 text-sand-500/50 mb-3 flex-shrink-0" aria-hidden="true" />
              <div className="flex gap-0.5 mb-3" aria-label={`${r.rating} stars`}>
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s<=r.rating?'fill-sand-500 text-sand-500':'text-[#E0E0E0]'}`} aria-hidden="true" />)}
              </div>
              <p className="text-sm text-[#4A4A4A] leading-relaxed flex-1 mb-4">&ldquo;{r.text}&rdquo;</p>
              <p className="text-xs text-tn-600 font-semibold mb-3">✓ {r.product}</p>
              <footer className="flex items-center gap-2.5 pt-3 border-t border-[#E5DDD0]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-tn-400 to-tn-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" aria-hidden="true">{r.avatar}</div>
                <div>
                  <cite className="text-xs font-bold text-[#111] not-italic">{r.name}</cite>
                  <p className="text-[10px] text-[#888]">{r.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
