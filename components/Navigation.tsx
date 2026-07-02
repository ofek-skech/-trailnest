'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, Truck, RotateCcw, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const annItems = [
  { icon: Truck,     text: 'משלוח מהיר לכל הארץ' },
  { icon: RotateCcw, text: 'החזרות תוך 30 יום'   },
  { icon: Lock,      text: 'תשלום מאובטח'          },
];

const shopMenu = [
  { label: 'כל הציוד',         href: '/shop' },
  { label: 'מבצעים',           href: '/shop/sale',           sale: true },
  { label: 'קמפינג וציוד שטח', href: '/shop/camping' },
  { label: 'קפה ובישול שטח',   href: '/shop/camp-kitchen' },
  { label: 'ציוד לרכבי שטח',   href: '/shop/vehicle-gear' },
  { label: 'תאורה וחשמל',      href: '/shop/lighting-power' },
  { label: 'קמפינג ושינה',     href: '/shop/sleeping' },
];

const navLinks = [
  { label: 'חנות',         href: '/shop',    children: shopMenu },
  { label: 'אודות',        href: '/about' },
  { label: 'שאלות נפוצות', href: '/faq' },
  { label: 'צור קשר',      href: '/contact' },
];

export default function Navigation() {
  const { itemCount, openCart } = useCart();
  const pathname  = usePathname();
  const router    = useRouter();
  const isHome    = pathname === '/';
  const [scrolled,  setScrolled]  = useState(false);
  const [mobile,    setMobile]    = useState(false);
  const [dropdown,  setDropdown]  = useState<string | null>(null);
  const [query,     setQuery]     = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
    setQuery('');
    setMobile(false);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">

      {/* ── Announcement bar — homepage only ─── */}
      {isHome && (
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: scrolled ? '0' : '36px', opacity: scrolled ? 0 : 1, background: '#1E2020' }}
          aria-hidden={scrolled}
        >
          <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-center">
            <div className="flex items-center" dir="rtl">
              {annItems.map(({ icon: Icon, text }, i) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-[10.5px] font-semibold text-white/60"
                  style={{ fontFamily: 'Rubik, sans-serif', padding: '0 18px', borderRight: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}
                >
                  <Icon className="w-3 h-3 text-white/35 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── White header ─────────────────────── */}
      <nav
        className="bg-white"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.3s ease',
        }}
        aria-label="ניווט ראשי"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── ROW 1: Logo | Search | Icons ─── */}
          {/*
            dir="rtl" → flex-start = RIGHT → Logo appears on the RIGHT
                        flex-end   = LEFT  → Icons appear on the LEFT
          */}
          <div className="flex items-center justify-between gap-4 py-3 lg:py-4" dir="rtl">

            {/* Logo — RIGHT */}
            <Link href="/" className="flex-shrink-0 group" aria-label="דף הבית CAMPIL">
              <img
                src="/images/campil-logo.png"
                alt="CAMPIL"
                className="h-32 lg:h-36 w-auto transition-opacity duration-200 group-hover:opacity-85"
                width={144}
                height={144}
                fetchPriority="high"
              />
            </Link>

            {/* Search bar — CENTER, desktop only */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-[560px] mx-auto"
              role="search"
              aria-label="חיפוש מוצרים"
            >
              <div
                className="flex w-full items-center rounded-2xl border transition-all duration-200"
                dir="rtl"
                style={{ background: '#F4EEE4', borderColor: '#DDD5C8' }}
                onFocus={() => {}}
              >
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="חיפוש ציוד, מותגים ומוצרים..."
                  aria-label="חיפוש"
                  className="flex-1 min-w-0 bg-transparent px-4 py-3 text-[14px] text-[#222] placeholder-[#aaa] outline-none"
                  dir="rtl"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                />
                <button
                  type="submit"
                  aria-label="חפש"
                  className="flex-shrink-0 m-1.5 w-10 h-10 flex items-center justify-center rounded-xl text-white transition-all duration-200 hover:-translate-y-px"
                  style={{ background: '#D4830A', boxShadow: '0 2px 8px rgba(212,131,10,0.35)' }}
                >
                  <Search className="w-4.5 h-4.5" strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
            </form>

            {/* Icons — LEFT (dir="ltr" inside for correct icon order) */}
            <div className="flex items-center gap-0.5" dir="ltr">

              {/* Account */}
              <button
                className="w-11 h-11 flex items-center justify-center rounded-xl text-[#444] hover:bg-[#F4EEE4] hover:text-[#3C4A32] transition-colors cursor-pointer"
                aria-label="חשבון"
                title="חשבון"
              >
                <User className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
              </button>

              {/* Wishlist */}
              <button
                className="w-11 h-11 flex items-center justify-center rounded-xl text-[#444] hover:bg-[#F4EEE4] hover:text-[#D4830A] transition-colors cursor-pointer"
                aria-label="רשימת משאלות"
                title="רשימת משאלות"
              >
                <Heart className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-11 h-11 flex items-center justify-center rounded-xl text-[#444] hover:bg-[#F4EEE4] hover:text-[#3C4A32] transition-colors cursor-pointer"
                aria-label={`סל קניות, ${itemCount} פריטים`}
              >
                <ShoppingCart className="w-5 h-5" strokeWidth={1.8} aria-hidden="true" />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] text-white text-[10px] font-black rounded-full flex items-center justify-center px-1"
                    style={{ background: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl text-[#444] hover:bg-[#F4EEE4] transition-colors cursor-pointer"
                onClick={() => setMobile(!mobile)}
                aria-label={mobile ? 'סגור תפריט' : 'פתח תפריט'}
                aria-expanded={mobile}
                aria-controls="mobile-nav"
              >
                {mobile
                  ? <X className="w-5 h-5" aria-hidden="true" />
                  : <Menu className="w-5 h-5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* ── ROW 2: Nav links — desktop only ── */}
          <div className="hidden lg:block" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <ul className="flex items-center justify-center h-11 gap-0" role="list" dir="rtl">
              {navLinks.map(link => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  {link.children ? (
                    <button
                      className="flex items-center gap-1 px-5 h-11 text-[13px] font-semibold text-[#333] hover:text-[#3C4A32] transition-colors cursor-pointer"
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                      aria-haspopup="true"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#aaa] transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className={`flex items-center px-5 h-11 text-[13px] font-semibold transition-colors ${
                        pathname === link.href ? 'text-[#3C4A32]' : 'text-[#333] hover:text-[#3C4A32]'
                      }`}
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                    >
                      {link.label}
                    </Link>
                  )}

                  {link.children && dropdown === link.label && (
                    <div
                      className="absolute top-full right-0 mt-1 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.14)] border border-[#EDE8E0] overflow-hidden animate-scale-in"
                      role="menu"
                      dir="rtl"
                    >
                      {link.children.map((child, i) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setDropdown(null)}
                          className={`flex items-center px-4 py-2.5 text-[13px] font-medium transition-colors ${
                            i === 0 ? 'border-b border-[#F0EBE4]' : ''
                          } ${
                            'sale' in child && child.sale
                              ? 'text-[#C0392B] font-bold hover:bg-red-50'
                              : 'text-[#333] hover:bg-[#F4EEE4] hover:text-[#3C4A32]'
                          }`}
                          style={{ fontFamily: 'Rubik, sans-serif' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Mobile search row ─────────────── */}
          <div className="lg:hidden py-2.5" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSearch} role="search">
              <div
                className="flex items-center rounded-xl border"
                dir="rtl"
                style={{ background: '#F4EEE4', borderColor: '#DDD5C8' }}
              >
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="חיפוש ציוד..."
                  className="flex-1 bg-transparent px-3 py-2.5 text-[14px] text-[#222] placeholder-[#aaa] outline-none"
                  dir="rtl"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                />
                <button
                  type="submit"
                  className="m-1 w-9 h-9 flex items-center justify-center rounded-lg text-white"
                  style={{ background: '#D4830A' }}
                  aria-label="חפש"
                >
                  <Search className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ─────────────────────── */}
      {mobile && (
        <div
          id="mobile-nav"
          className="lg:hidden bg-white border-t border-[#EDE8E0] animate-fade-in overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 200px)' }}
          role="navigation"
          dir="rtl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href ?? '/shop'}
                  className="flex items-center px-4 py-3 text-[#111] font-semibold hover:bg-[#F4EEE4] hover:text-[#3C4A32] rounded-xl transition-colors text-[14px]"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                  onClick={() => setMobile(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="mr-3 mb-1">
                    {link.children.slice(1).map(c => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className={`block px-4 py-2 text-[13px] rounded-xl transition-colors ${'sale' in c && c.sale ? 'text-[#C0392B] font-semibold hover:bg-red-50' : 'text-[#555] hover:bg-[#F4EEE4] hover:text-[#3C4A32]'}`}
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
                className="block text-center px-4 py-3.5 text-white font-bold rounded-2xl text-[14px] transition-colors"
                style={{ background: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
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
