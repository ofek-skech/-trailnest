import Link from 'next/link';
import { Camera, Play, AtSign, Mail, Phone, MapPin } from 'lucide-react';

const shop = [
  { label:'כל המוצרים',      href:'/shop' },
  { label:'קפה ובישול שטח', href:'/shop/camp-kitchen' },
  { label:'ציוד לרכבי שטח', href:'/shop/vehicle-gear' },
  { label:'קמפינג ושינה',   href:'/shop/sleeping' },
];
const company = [
  { label:'אודות CAMPIL', href:'/about' },
  { label:'צור קשר',      href:'/contact' },
  { label:'שאלות נפוצות', href:'/faq' },
];
const policies = [
  { label:'מדיניות משלוחים', href:'/policies/shipping' },
  { label:'מדיניות החזרות',  href:'/policies/returns' },
  { label:'מדיניות פרטיות',  href:'/policies/privacy' },
  { label:'תנאי שימוש',      href:'/policies/terms' },
];
const socials = [
  { icon: Camera, label:'Instagram', href:'#' },
  { icon: Play,   label:'YouTube',   href:'#' },
  { icon: AtSign, label:'Twitter/X', href:'#' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1E2020' }} className="text-white" aria-label="תחתית הדף">
      {/* Top band */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center mb-5 group" aria-label="דף הבית CAMPIL">
                <div className="bg-white rounded-xl px-2.5 py-1.5 transition-all duration-200 group-hover:bg-white/90">
                  <img
                    src="/images/campil-logo.png"
                    alt="CAMPIL"
                    className="h-12 w-auto"
                    width={130}
                    height={48}
                  />
                </div>
              </Link>
              <p className="text-sm text-white/55 leading-relaxed max-w-xs mb-5">
                ציוד קמפינג, אוברלנדינג וטיולי 4×4 — נבחר על ידי אנשים שחיים את השטח. הבית הישראלי לציוד שטח אמיתי.
              </p>
              <div className="flex gap-2.5 mb-6">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label} rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 hover:text-[#D4830A]">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <div className="space-y-2 text-sm text-white/60">
                <a href="mailto:campil.info@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />campil.info@gmail.com
                </a>
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />בקרוב
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />בקרוב
                </span>
              </div>
            </div>

            {/* Links */}
            {[{ title:'חנות', links:shop }, { title:'אודות', links:company }, { title:'מדיניות', links:policies }].map(({ title, links }) => (
              <nav key={title} aria-label={title}>
                <p className="overline text-white/40 mb-4">{title}</p>
                <ul className="space-y-2.5" role="list">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 CAMPIL. כל הזכויות שמורות.</p>
          <p style={{ color: 'rgba(212,131,10,0.65)' }}>GEAR FOR EVERY ADVENTURE</p>
        </div>
      </div>
    </footer>
  );
}
