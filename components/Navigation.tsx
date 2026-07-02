'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, Truck, RotateCcw, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { getSupabaseClient } from '@/lib/supabase-client';

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

  const [scrolled,   setScrolled]   = useState(false);
  const [mobile,     setMobile]     = useState(false);
  const [dropdown,   setDropdown]   = useState<string | null>(null);
  const [query,      setQuery]      = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobile]);

  useEffect(() => {
    const sb = getSupabaseClient();
    sb.auth.getUser().then(({ data }: { data: { user: import('@supabase/supabase-js').User | null } }) => setIsLoggedIn(!!data.user));
    const { data: { subscription } } = sb.auth.onAuthStateChange((_event: import('@supabase/supabase-js').AuthChangeEvent, session: import('@supabase/supabase-js').Session | null) => {
      setIsLoggedIn(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
    setQuery('');
    setMobile(false);
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">

      {/* ── Announcement bar — homepage only, collapses on scroll ── */}
      {isHome && (
        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: scrolled ? '0' : '32px', opacity: scrolled ? 0 : 1, background: '#1E2020' }}
          aria-hidden={scrolled}
        >
          <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-center">
            <div className="flex items-center" dir="rtl">
              {annItems.map(({ icon: Icon, text }, i) => (
                <span
                  key={text}
                  className="flex items-center gap-1.5 text-[10px] font-semibold text-white/55"
                  style={{ fontFamily: 'Rubik, sans-serif', padding: '0 16px', borderRight: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none' }}
                >
                  <Icon className="w-2.5 h-2.5 text-white/30 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Main nav ── */}
      <nav
        className="bg-white"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.07)' : 'none',
          transition: 'box-shadow 0.25s ease',
        }}
        aria-label="ניווט ראשי"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Single compact row — dir="rtl":
              flex-start (RIGHT): Logo lockup
              center: Nav links
              flex-end (LEFT): Search + Icons
          */}
          <div className="flex items-center justify-between h-[62px] lg:h-[66px]" dir="rtl">

            {/* ── LOGO LOCKUP — RIGHT (flex-start in RTL) ── */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group" aria-label="CAMPIL — דף הבית">
              {/* Emblem — squircle crop, zoomed to fill with artwork */}
              <div
                className="flex-shrink-0 transition-all duration-200 group-hover:opacity-85"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: '#FAF8F3',
                  backgroundImage: "url('/images/campil-logo.png')",
                  backgroundSize: '158% 158%',
                  backgroundPosition: 'center top',
                  backgroundRepeat: 'no-repeat',
                  flexShrink: 0,
                }}
                role="img"
                aria-label="CAMPIL emblem"
              />

              {/* Gold vertical divider */}
              <div
                aria-hidden="true"
                style={{
                  width: '1px',
                  height: '24px',
                  background: 'rgba(212,131,10,0.30)',
                  flexShrink: 0,
                }}
              />

              {/* Wordmark */}
              <div className="flex flex-col" dir="ltr" style={{ gap: '3px' }}>
                <span
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '18px',
                    fontWeight: 900,
                    color: '#1E2020',
                    letterSpacing: '-0.025em',
                    lineHeight: 1,
                  }}
                >
                  CAMPIL
                </span>
                <span
                  className="hidden lg:block"
                  style={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '6.5px',
                    fontWeight: 700,
                    color: '#D4830A',
                    letterSpacing: '0.22em',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  GEAR FOR EVERY ADVENTURE
                </span>
              </div>
            </Link>

            {/* ── NAV LINKS — CENTER (desktop only) ── */}
            <ul className="hidden lg:flex items-center h-full gap-0" role="list" dir="rtl">
              {navLinks.map(link => (
                <li
                  key={link.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => link.children && setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  {link.children ? (
                    <button
                      className="flex items-center gap-1 px-4 h-full text-[13px] font-semibold text-[#333] hover:text-[#1E2020] transition-colors cursor-pointer relative"
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                      aria-haspopup="true"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 text-[#bbb] transition-transform duration-200 ${dropdown === link.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                      {dropdown === link.label && (
                        <span className="absolute bottom-0 inset-x-0 h-[2px]" style={{ background: '#D4830A' }} aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={link.href!}
                      className={`flex items-center px-4 h-full text-[13px] font-semibold transition-colors relative ${pathname === link.href ? 'text-[#1E2020]' : 'text-[#555] hover:text-[#1E2020]'}`}
                      style={{ fontFamily: 'Rubik, sans-serif' }}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <span className="absolute bottom-0 inset-x-0 h-[2px]" style={{ background: '#D4830A' }} aria-hidden="true" />
                      )}
                    </Link>
                  )}

                  {link.children && dropdown === link.label && (
                    <div
                      className="absolute top-full right-0 mt-1 w-52 bg-white rounded-2xl shadow-[0_8px_36px_rgba(0,0,0,0.12)] border border-[#EDE8E0] overflow-hidden animate-scale-in"
                      role="menu"
                      dir="rtl"
                    >
                      {link.children.map((child, i) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          role="menuitem"
                          onClick={() => setDropdown(null)}
                          className={`flex items-center px-4 py-2.5 text-[13px] transition-colors font-medium ${i === 0 ? 'border-b border-[#F0EBE4]' : ''} ${'sale' in child && child.sale ? 'text-[#C0392B] font-bold hover:bg-red-50' : 'text-[#444] hover:bg-[#F8F4EE] hover:text-[#1E2020]'}`}
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

            {/* ── SEARCH + ICONS — LEFT (flex-end in RTL) ── */}
            <div className="flex items-center gap-1" dir="ltr">

              {/* Search — desktop inline, compact */}
              <form onSubmit={handleSearch} className="hidden lg:flex items-center" role="search">
                <div
                  className="flex items-center rounded-xl border transition-all duration-200 focus-within:border-[#D4830A] focus-within:bg-white"
                  dir="rtl"
                  style={{ background: '#F4EEE4', borderColor: '#E0D8CE', width: '220px' }}
                >
                  <input
                    type="search"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="חיפוש..."
                    aria-label="חיפוש מוצרים"
                    className="flex-1 min-w-0 bg-transparent px-3 py-2 text-[13px] text-[#333] placeholder-[#bbb] outline-none"
                    dir="rtl"
                    style={{ fontFamily: 'Rubik, sans-serif' }}
                  />
                  <button
                    type="submit"
                    aria-label="חפש"
                    className="flex-shrink-0 m-0.5 w-7 h-7 flex items-center justify-center rounded-lg text-white transition-opacity hover:opacity-90"
                    style={{ background: '#D4830A' }}
                  >
                    <Search className="w-3.5 h-3.5" strokeWidth={2.2} aria-hidden="true" />
                  </button>
                </div>
              </form>

              {/* Account */}
              <Link
                href={isLoggedIn ? '/profile' : '/auth/login'}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-[#555] hover:bg-[#F4EEE4] hover:text-[#1E2020] transition-colors"
                aria-label={isLoggedIn ? 'הפרופיל שלי' : 'כניסה לחשבון'}
                title={isLoggedIn ? 'הפרופיל שלי' : 'כניסה לחשבון'}
              >
                <User className="w-[18px] h-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </Link>

              {/* Wishlist */}
              <button
                className="w-9 h-9 flex items-center justify-center rounded-xl text-[#555] hover:bg-[#F4EEE4] hover:text-[#D4830A] transition-colors cursor-pointer"
                aria-label="רשימת משאלות"
                title="רשימת משאלות"
              >
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[#555] hover:bg-[#F4EEE4] hover:text-[#1E2020] transition-colors cursor-pointer"
                aria-label={`סל קניות, ${itemCount} פריטים`}
              >
                <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.8} aria-hidden="true" />
                {itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] text-white text-[9px] font-black rounded-full flex items-center justify-center px-0.5"
                    style={{ background: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
                  >
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[#555] hover:bg-[#F4EEE4] transition-colors cursor-pointer"
                onClick={() => setMobile(!mobile)}
                aria-label={mobile ? 'סגור תפריט' : 'פתח תפריט'}
                aria-expanded={mobile}
                aria-controls="mobile-nav"
              >
                {mobile ? <X className="w-[18px] h-[18px]" aria-hidden="true" /> : <Menu className="w-[18px] h-[18px]" aria-hidden="true" />}
              </button>
            </div>

          </div>

          {/* ── Mobile search ── */}
          <div className="lg:hidden py-2" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSearch} role="search">
              <div className="flex items-center rounded-xl border" dir="rtl" style={{ background: '#F4EEE4', borderColor: '#E0D8CE' }}>
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="חיפוש ציוד..."
                  className="flex-1 bg-transparent px-3 py-2 text-[13px] text-[#333] placeholder-[#bbb] outline-none"
                  dir="rtl"
                  style={{ fontFamily: 'Rubik, sans-serif' }}
                />
                <button type="submit" className="m-0.5 w-8 h-8 flex items-center justify-center rounded-lg text-white" style={{ background: '#D4830A' }} aria-label="חפש">
                  <Search className="w-4 h-4" strokeWidth={2.2} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobile && (
        <div
          id="mobile-nav"
          className="lg:hidden bg-white border-t border-[#EDE8E0] animate-fade-in overflow-y-auto"
          style={{ maxHeight: 'calc(100dvh - 120px)' }}
          role="navigation"
          dir="rtl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href ?? '/shop'}
                  className="flex items-center px-3 py-2.5 text-[#111] font-semibold hover:bg-[#F8F4EE] hover:text-[#1E2020] rounded-xl transition-colors text-[13.5px]"
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
                        className={`block px-3 py-2 text-[13px] rounded-xl transition-colors ${'sale' in c && c.sale ? 'text-[#C0392B] font-semibold hover:bg-red-50' : 'text-[#666] hover:bg-[#F8F4EE]'}`}
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
            <div className="pt-3 pb-2 border-t border-[#EDE8E0] space-y-2">
              <Link
                href="/shop"
                className="block text-center px-4 py-3 text-white font-bold rounded-2xl text-[13.5px]"
                style={{ background: '#D4830A', fontFamily: 'Rubik, sans-serif' }}
                onClick={() => setMobile(false)}
              >
                לכל הציוד
              </Link>
              <Link
                href={isLoggedIn ? '/profile' : '/auth/login'}
                className="block text-center px-4 py-3 text-[#333] font-semibold rounded-2xl text-[13.5px] border"
                style={{ fontFamily: 'Rubik, sans-serif', borderColor: '#DDD5C8' }}
                onClick={() => setMobile(false)}
              >
                {isLoggedIn ? 'הפרופיל שלי' : 'כניסה לחשבון'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
