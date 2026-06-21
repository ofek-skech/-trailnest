const stats = [
  { number: '10',  suffix: '+', label: 'מוצרים נבחרים',   sub: 'ציוד שנבחר בקפידה לשטח'       },
  { number: '30',  suffix: '',  label: 'ימי החזרה',        sub: 'ללא שאלות, ללא בירוקרטיה'     },
  { number: '48',  suffix: 'h', label: 'עיבוד הזמנה',     sub: 'משעת ביצוע ההזמנה'             },
  { number: '100', suffix: '%', label: 'ציוד שטח ישראלי',  sub: 'נבנה עבור הנגב, הגליל והגולן' },
];

export default function StatsBanner() {
  return (
    <section className="py-16 lg:py-20" style={{ background: '#0F2E24' }} aria-label="נתוני CampIL">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <p
          className="overline text-center mb-12"
          style={{ fontFamily: 'Rubik, sans-serif', color: 'rgba(216,200,168,0.50)' }}
        >
          CampIL — במספרים
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map(({ number, suffix, label, sub }, i) => (
            <div
              key={label}
              className={`text-center ${i < stats.length - 1 ? 'lg:border-l lg:border-white/8' : ''}`}
              dir="rtl"
            >
              <p
                className="font-black text-white mb-1.5"
                style={{
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                  letterSpacing: '-0.035em',
                  lineHeight: 1,
                }}
              >
                {number}
                <span style={{ color: '#D8C8A8', fontSize: '0.52em', verticalAlign: 'super', marginRight: '1px' }}>{suffix}</span>
              </p>
              <p className="text-sm font-bold mb-1" style={{ fontFamily: 'Rubik, sans-serif', color: 'rgba(255,255,255,0.85)' }}>
                {label}
              </p>
              <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.32)' }}>{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
