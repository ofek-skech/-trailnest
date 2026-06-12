import Link from 'next/link';
import { Mountain, Camera, Play, AtSign, Mail, Phone, MapPin } from 'lucide-react';

const shop = [
  { label:'All Products',           href:'/shop' },
  { label:'Camp Kitchen',           href:'/shop/camp-kitchen' },
  { label:'Lighting',               href:'/shop/lighting' },
  { label:'Vehicle Gear',           href:'/shop/vehicle-gear' },
  { label:'Sleeping',               href:'/shop/sleeping' },
  { label:'Water & Shower',         href:'/shop/water-shower' },
  { label:'Storage & Organization', href:'/shop/storage-organization' },
];
const company = [
  { label:'About TrailNest', href:'/about' },
  { label:'Contact Us',      href:'/contact' },
  { label:'FAQ',             href:'/faq' },
];
const policies = [
  { label:'Shipping Policy', href:'/policies/shipping' },
  { label:'Return Policy',   href:'/policies/returns' },
  { label:'Privacy Policy',  href:'/policies/privacy' },
  { label:'Terms of Service',href:'/policies/terms' },
];
const socials = [
  { icon: Camera, label:'Instagram', href:'#' },
  { icon: Play,   label:'YouTube',   href:'#' },
  { icon: AtSign, label:'Twitter/X', href:'#' },
];

export default function Footer() {
  return (
    <footer className="bg-tn-600 text-white" aria-label="Site footer">
      {/* Top band */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4 group" aria-label="TrailNest home">
                <div className="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" strokeWidth={2.5} aria-hidden="true" />
                </div>
                <span className="text-xl font-black text-white" style={{ fontFamily:'Rubik, sans-serif' }}>
                  Trail<span className="text-sand-400">Nest</span>
                </span>
              </Link>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-5">
                Premium camping, overlanding and 4×4 outdoor gear. Everything you need for the next adventure.
              </p>
              <div className="flex gap-2.5 mb-6">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label} rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
              <div className="space-y-2 text-sm text-white/60">
                <a href="mailto:support@trailnest.co" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5" aria-hidden="true" />support@trailnest.co
                </a>
                <a href="tel:+97200-000-0000" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />+972 XX-XXX-XXXX
                </a>
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />Coming Soon
                </span>
              </div>
            </div>

            {/* Links */}
            {[{ title:'Shop', links:shop }, { title:'Company', links:company }, { title:'Policies', links:policies }].map(({ title, links }) => (
              <nav key={title} aria-label={`${title} links`}>
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
          <p>© 2026 TrailNest. All rights reserved.</p>
          <p>Built for adventurers — not algorithms.</p>
        </div>
      </div>
    </footer>
  );
}
