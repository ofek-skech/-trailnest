const suppliers = [
  { name: 'ARB',         logo: '🏕️', desc: 'ציוד 4x4 ואוברלנד' },
  { name: 'Dometic',     logo: '❄️', desc: 'קירור ונוחות שטח'   },
  { name: 'Goal Zero',   logo: '⚡', desc: 'אנרגיה סולארית'     },
  { name: 'MSR',         logo: '🔥', desc: 'מבשלות שטח'         },
  { name: 'Thule',       logo: '🚗', desc: 'נשיאה ואחסון'       },
  { name: 'Black Diamond', logo: '💎', desc: 'ציוד טיפוס ואביזרים' },
];

export default function Suppliers() {
  return (
    <section className="py-16 px-4 sm:px-6" style={{ background: '#1E2020' }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10" dir="rtl">
          <p
            className="text-[10px] font-black uppercase tracking-[0.28em] mb-3"
            style={{ color: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
          >
            ספקים מאומתים
          </p>
          <h2
            className="text-2xl sm:text-3xl font-black"
            style={{ fontFamily: 'Rubik, sans-serif', color: '#FAF8F3', letterSpacing: '-0.025em' }}
          >
            ספקים מומלצים
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: 'rgba(250,248,243,0.55)', fontFamily: 'Nunito Sans, sans-serif' }}
          >
            מותגים מובילים עולמיים שנבחרו בקפידה לאנשי השטח
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {suppliers.map(s => (
            <div
              key={s.name}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl py-6 px-4 group transition-all hover:-translate-y-1 cursor-default"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="text-3xl leading-none">{s.logo}</span>
              <span
                className="text-sm font-black text-center leading-tight"
                style={{ color: '#FAF8F3', fontFamily: 'Rubik, sans-serif' }}
              >
                {s.name}
              </span>
              <span
                className="text-[10.5px] text-center leading-tight"
                style={{ color: 'rgba(250,248,243,0.48)', fontFamily: 'Nunito Sans, sans-serif' }}
              >
                {s.desc}
              </span>
              <div
                className="w-8 h-[1.5px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: '#D4830A' }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
