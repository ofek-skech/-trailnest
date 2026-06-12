'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, ChevronDown, Mountain, Truck, Star, Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const annItems = [
  { icon: Truck, text: 'Fast Shipping'   },
  { icon: Star,  text: 'Premium Quality' },
  { icon: Lock,  text: 'Secure Checkout' },
];

const shopMenu = [
  { label: 'All Products',           href: '/shop' },
  { label: 'Camp Kitchen',           href: '/shop/camp-kitchen' },
  { label: 'Lighting',               href: '/shop/lighting' },
  { label: 'Vehicle Gear',           href: '/shop/vehicle-gear' },
  { label: 'Sleeping',               href: '/shop/sleeping' },
  { label: 'Water & Shower',         href: '/shop/water-shower' },
  { label: 'Storage & Organization', href: '/shop/storage-organization' },
];

const navLinks = [
  { label: 'Shop',    href: '/shop',    children: shopMenu },
  { label: 'About',   href: '/about' },
  { label: 'FAQ',     href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const { itemCount, openCart } = useCart();
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

  const textColor = scrolled ? 'text-[#111111]' : 'text-white';

  return (
    <header className="fixed top-0 inset-x-0 z-50">

      {/* ── Announcement bar ──────────────────────── */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out bg-tn-800"
        style={{ maxHeight: scrolled ? '0px' : '40px', opacity: scrolled ? 0 : 1 }}
        aria-hidden={scrolled}
      >
        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-center">
          <div className="flex items-center divide-x divide-white/15">
            {annItems.map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 px-4 sm:px-6 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
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
          scrolled
            ? 'glass-nav shadow-[0_1px_24px_rgba(0,0,0,0.07)] border-b border-black/[0.04]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0" aria-label="TrailNest home">
              <div className="w-11 h-11 rounded-xl bg-tn-600 flex items-center justify-center group-hover:bg-tn-500 transition-colors">
                <Mountain className="w-6 h-6 text-white" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <span
                className={`font-black tracking-tight transition-colors ${scrolled ? 'text-[#111111]' : 'text-white'}`}
                style={{ fontFamily: 'Rubik, sans-serif', fontSize: '1.625rem' }}
              >
                Trail<span className="text-sand-500">Nest</span>
              </span>
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-0.5" role="list">
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
                      aria-haspopup="true"
                      aria-expanded={dropdown === link.label}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  ) : (
                    <Link href={link.href!} className={`block px-4 py-2 text-sm font-semibold rounded-lg hover:bg-black/10 transition-colors ${textColor}`}>
                      {link.label}
                    </Link>
                  )}

                  {link.children && dropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#E5DDD0] overflow-hidden animate-scale-in"
                      role="menu"
                    >
                      {link.children.map(child => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#4A4A4A] hover:text-[#1F3A2E] hover:bg-[#F8F5F0] transition-colors font-medium"
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
                className={`hidden sm:flex w-10 h-10 items-center justify-center rounded-xl hover:bg-black/10 transition-colors cursor-pointer ${textColor}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                onClick={openCart}
                className={`relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 transition-colors cursor-pointer ${textColor}`}
                aria-label={`Cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden="true" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-tn-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 animate-fade-in">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>

              <Link
                href="/shop"
                className={`hidden lg:inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl transition-all ml-2 ${
                  scrolled
                    ? 'bg-tn-600 hover:bg-tn-800 text-white'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-sm'
                }`}
              >
                Shop Now
              </Link>

              <button
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-black/10 transition-colors cursor-pointer ${textColor}`}
                onClick={() => setMobile(!mobile)}
                aria-label={mobile ? 'Close menu' : 'Open menu'}
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
        <div className="lg:hidden bg-white border-t border-[#E5DDD0] animate-fade-in" id="mobile-menu" role="navigation">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <div key={link.label}>
                <Link
                  href={link.href ?? '/shop'}
                  className="block px-4 py-3 text-[#111111] font-semibold hover:bg-[#F8F5F0] rounded-xl transition-colors"
                  onClick={() => setMobile(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 space-y-0.5 mb-2">
                    {link.children.slice(1).map(c => (
                      <Link
                        key={c.label}
                        href={c.href}
                        className="block px-4 py-2 text-[#4A4A4A] text-sm hover:text-[#1F3A2E] hover:bg-[#F8F5F0] rounded-xl transition-colors"
                        onClick={() => setMobile(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[#E5DDD0]">
              <Link
                href="/shop"
                className="block text-center px-4 py-3 bg-tn-600 text-white font-bold rounded-xl transition-colors hover:bg-tn-800"
                onClick={() => setMobile(false)}
              >
                Shop All Gear
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
