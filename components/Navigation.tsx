'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, ChevronDown, Truck, Lock, RotateCcw } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const annItems = [
  { icon: Truck,    text: 'משלוח מהיר לכל הארץ' },
  { icon: RotateCcw, text: 'החזרות תוך 30 יום'  },
  { icon: Lock,     text: 'תשלום מאובטח Tranzila' },
];

const shopMenu: { label: string; href: string; sale?: boolean }[] = [
  { label: 'כל הציוד',          href: '/shop' },
  { label: 'מבצעים',            href: '/shop/sale', sale: true },
  { label: 'קמפינג וציוד שטח', href: '/shop/camping' },
  { label: 'קפה ובישול שטח',   href: '/shop/camp-kitchen' },
  { label: 'ציוד לרכבי שטח',   href: '/shop/vehicle-gear' },
  { label: 'תאורה וחשמל',       href: '/shop/lighting-power' },
  { label: 'קמפינג ושינה',      href: '/shop/sleeping' },
];

const navLinks = [
  { label: 'חנות',    href: '/shop',    children: shopMenu },
  { label: 'אודות',  href: '/about' },
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'צור קשר', href: '/contact' },
];

export default function Navigation() {
  const { itemCount, openCart } = useCart();
  const pathname                = usePathname();
  const isHome                  = pathname === '/';
  const [scrolled,  setScrolled]  = useState(false);
  const [mobile,    setMobile]    = useState(false);
  const [dropdown,  setDropdown]  = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  // Transparent only on the homepage before scrolling; solid everywhere else
  const transparent = isHome && !scrolled;
  const textColor   = transparent ? 'text-white' : 'text-[#111111]';

  return (
    <header className="fixed top-0 inset-x-0 z-50">

      {/* ── Announcement bar ─────────────────────── */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: scrolled ? '0px' : '40px', opacity: scrolled ? 0 : 1, background: '#1E2020' }}
        aria-hidden={scrolled}
      >
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center">
          <div className="flex items-center divide-x divide-white/15" dir="rtl">
            {annItems.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="flex items-center gap-1.5 px-4 sm:px-6 text-[10px] sm:text-[11px] font-bold tracking-wide text-white/70"
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                <Icon className="w-3 h-3 text-white/50 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav ──────────────────────────────── */}
      <nav
        className={`transition-all duration-300 ${
          transparent
            ? 'bg-transparent'
            : 'glass-nav shadow-[0_1px_24px_rgba(0,0,0,0.07)] border-b border-black/[0.04]'
        }`}
        aria-label="ניווט ראשי"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group" aria-label="דף הבית CAMPIL">
              <div className={`flex items-center rounded-xl transition-all duration-300 ${
                transparent
                  ? 'bg-white/90 backdrop-blur-sm shadow-lg px-2.5 py-1'
                  : 'px-0 py-0'
              }`}>
                <img
                  src="/images/campil-logo.png"
                  alt="CAMPIL"
                  className="h-10 lg:h-12 w-auto transition-all duration-300 group-hover:opacity-90"
                  width={130}
                  height={48}
                />
              </div>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-0.5" role="list" dir="rtl">
              {navLinks.map(link => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  {link.children ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-black/10 transition-colors cursor-pointer ${textColor}`}
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                      aria-haspopup="true"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className={`block px-4 py-2 text-sm font-semibold rounded-lg hover:bg-black/10 transition-colors ${textColor}`}
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.children && dropdown === link.label && (
                    <div
                      className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#E4DDD2] overflow-hidden animate-scale-in"
                      role="menu"
                      dir="rtl"
                    >
                      {link.children.map(child => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm hover:bg-[#F8F7F3] transition-colors font-medium ${
                            child.sale
                              ? 'text-[#C0392B] font-semibold hover:text-[#A93226]'
                              : 'text-[#4A4A4A] hover:text-tn-600'
                          }`}
                          style={{ fontFamily: 'Rubik, sans-serif' }}
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={openCart}
                className={`relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 transition-colors cursor-pointer ${textColor}`}
                aria-label={`סל, ${itemCount} פריט${itemCount !== 1 ? 'ים' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-fade-in" style={{ background: '#D4830A' }}>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              <Link
                href="/shop"
                className={`hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ml-2 ${
                  transparent
                    ? 'bg-white/14 hover:bg-white/24 text-white border border-white/22 backdrop-blur-sm'
                    : 'bg-tn-600 hover:bg-tn-800 text-white hover:shadow-[0_4px_16px_rgba(31,77,58,0.30)]'
                }`}
                style={{ fontFamily: 'Rubik, sans-serif' }}
              >
                לחנות
              </Link>

              <button
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 transition-colors cursor-pointer ${textColor}`}
                onClick={() => setMobile(!mobile)}
                aria-label={mobile ? 'סגור תפריט' : 'פתח תפריט'}
                aria-expanded={mobile}
              >
                {mobile ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────── */}
      {mobile && (
        <div className="lg:hidden bg-white border-t border-[#E4DDD2] animate-fade-in" id="mobile-menu" role="navigation" dir="rtl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href ?? '/shop'}
                  className="block px-4 py-3 text-[#111111] font-semibold hover:bg-[#F8F7F3] rounded-xl transition-colors"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                  onClick={() => setMobile(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mr-4 space-y-0.5 mb-2">
                    {link.children.slice(1).map(c => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className={`block px-4 py-2 text-sm hover:bg-[#F8F7F3] rounded-xl transition-colors ${
                          c.sale ? 'text-[#C0392B] font-semibold hover:text-[#A93226]' : 'text-[#4A4A4A] hover:text-tn-600'
                        }`}
                        style={{ fontFamily: 'Rubik, sans-serif' }}
                        onClick={() => setMobile(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[#E4DDD2]">
              <Link
                href="/shop"
                className="block text-center px-4 py-3 bg-tn-600 text-white font-bold rounded-xl transition-colors hover:bg-tn-800"
                style={{ fontFamily: 'Rubik, sans-serif' }}
                onClick={() => setMobile(false)}
              >
                לכל הציוד
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
