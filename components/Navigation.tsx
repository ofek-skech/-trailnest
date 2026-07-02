'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, ChevronDown, Truck, RotateCcw, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const annItems = [
  { icon: Truck,      text: 'משלוח מהיר לכל הארץ' },
  { icon: RotateCcw,  text: 'החזרות תוך 30 יום'   },
  { icon: Lock,       text: 'תשלום מאובטח'          },
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
  { label: 'חנות',         href: '/shop',    children: shopMenu },
  { label: 'אודות',        href: '/about' },
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'צור קשר',      href: '/contact' },
];

export default function Navigation() {
  const { itemCount, openCart } = useCart();
  const pathname                = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [mobile,    setMobile]    = useState(false);
  const [dropdown,  setDropdown]  = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">

      {/* ── Announcement bar ─────────────────────── */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: scrolled ? '0px' : '36px', opacity: scrolled ? 0 : 1, background: '#1E2020' }}
        aria-hidden={scrolled}
      >
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center">
          <div className="flex items-center" dir="rtl" style={{ gap: '0' }}>
            {annItems.map(({ icon: Icon, text }, i) => (
              <span
                key={text}
                className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-wide text-white/65"
                style={{ fontFamily: 'Rubik, sans-serif', padding: '0 20px', borderRight: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
              >
                <Icon className="w-3 h-3 text-white/40 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main nav — always white ───────────────── */}
      <nav
        className="bg-white"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : '0 1px 0 rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.3s ease',
        }}
        aria-label="ניווט ראשי"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            RTL layout:
              dir="rtl" on the row means flex-start = RIGHT, flex-end = LEFT
              → Logo (first child) appears on the RIGHT
              → Actions (last child) appear on the LEFT
          */}
          <div className="flex items-center justify-between h-[68px] lg:h-[76px]" dir="rtl">

            {/* ── Logo — RIGHT side (flex-start in RTL) ── */}
            <Link href="/" className="flex-shrink-0 group" aria-label="דף הבית CAMPIL">
              <img
                src="/images/campil-logo.png"
                alt="CAMPIL"
                className="h-12 lg:h-14 w-auto transition-opacity duration-200 group-hover:opacity-85"
                width={145}
                height={56}
                fetchPriority="high"
              />
            </Link>

            {/* ── Desktop nav links — CENTER ────────────── */}
            <ul className="hidden lg:flex items-center gap-0" role="list" dir="rtl">
              {navLinks.map(link => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  {link.children ? (
                    <button
                      className="flex items-center gap-1 px-4 py-2.5 text-[13.5px] font-semibold text-[#2a2a2a] rounded-lg hover:bg-[#F4EEE4] hover:text-[#3C4A32] transition-colors cursor-pointer"
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                      aria-haspopup="true"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#888] transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className={`block px-4 py-2.5 text-[13.5px] font-semibold rounded-lg hover:bg-[#F4EEE4] hover:text-[#3C4A32] transition-colors ${
                        pathname === link.href ? 'text-[#3C4A32]' : 'text-[#2a2a2a]'
                      }`}
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.children && dropdown === link.label && (
                    <div
                      className="absolute top-full right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#EDE8E0] overflow-hidden animate-scale-in"
                      role="menu"
                      dir="rtl"
                    >
                      {link.children.map((child, i) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`flex items-center px-4 py-2.5 text-sm transition-colors font-medium ${
                            i === 0 ? 'border-b border-[#F0EBE4]' : ''
                          } ${
                            child.sale
                              ? 'text-[#C0392B] font-bold hover:bg-red-50'
                              : 'text-[#333] hover:bg-[#F4EEE4] hover:text-[#3C4A32]'
                          }`}
                          style={{ fontFamily: 'Rubik, sans-serif' }}
                          role="menuitem"
                          onClick={() => setDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Actions — LEFT side (flex-end in RTL) ─── */}
            {/* dir="ltr" inside so icons order is logical left→right */}
            <div className="flex items-center gap-1" dir="ltr">

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#2a2a2a] hover:bg-[#F4EEE4] hover:text-[#3C4A32] transition-colors cursor-pointer"
                aria-label={`סל, ${itemCount} פריט${itemCount !== 1 ? 'ים' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-fade-in"
                    style={{ background: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Shop CTA — desktop only */}
              <Link
                href="/shop"
                className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-bold rounded-xl text-white transition-all duration-200 ml-1 hover:shadow-[0_4px_14px_rgba(60,74,50,0.28)] hover:-translate-y-px"
                style={{ background: '#3C4A32', fontFamily: 'Rubik, sans-serif' }}
              >
                לחנות
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#2a2a2a] hover:bg-[#F4EEE4] transition-colors cursor-pointer"
                onClick={() => setMobile(!mobile)}
                aria-label={mobile ? 'סגור תפריט' : 'פתח תפריט'}
                aria-expanded={mobile}
              >
                {mobile
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── Mobile menu ───────────────────────────── */}
      {mobile && (
        <div
          className="lg:hidden bg-white border-t border-[#EDE8E0] animate-fade-in overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 120px)' }}
          id="mobile-menu"
          role="navigation"
          dir="rtl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href ?? '/shop'}
                  className="flex items-center px-4 py-3 text-[#111] font-semibold hover:bg-[#F4EEE4] hover:text-[#3C4A32] rounded-xl transition-colors text-sm"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                  onClick={() => setMobile(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mr-4 mb-1.5 space-y-0">
                    {link.children.slice(1).map(c => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className={`block px-4 py-2 text-sm rounded-xl transition-colors ${
                          c.sale
                            ? 'text-[#C0392B] font-semibold hover:bg-red-50'
                            : 'text-[#555] hover:bg-[#F4EEE4] hover:text-[#3C4A32]'
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
            <div className="pt-3 pb-2 border-t border-[#EDE8E0]">
              <Link
                href="/shop"
                className="block text-center px-4 py-3.5 text-white font-bold rounded-2xl transition-colors text-sm"
                style={{ background: '#3C4A32', fontFamily: 'Rubik, sans-serif' }}
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
