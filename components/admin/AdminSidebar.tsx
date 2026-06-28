'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mountain, LayoutDashboard, ShoppingBag,
  Package, Users, BarChart2, ClipboardList, Truck, Building2, FlaskConical, BarChart, Rocket,
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const navItems = [
  { href: '/admin/dashboard',        label: 'לוח מחוונים',  icon: LayoutDashboard },
  { href: '/admin/orders',           label: 'הזמנות',        icon: ShoppingBag },
  { href: '/admin/supplier-orders',  label: 'הזמנות ספק',   icon: Truck },
  { href: '/admin/products',         label: 'מוצרים',        icon: Package },
  { href: '/admin/suppliers',          label: 'ספקים',          icon: Building2 },
  { href: '/admin/supplier-research',    label: 'מחקר ספקים',   icon: FlaskConical },
  { href: '/admin/product-optimization', label: 'אופטימיזציה',  icon: BarChart },
  { href: '/admin/launch-catalog',       label: '🚀 קטלוג לאנץ׳', icon: Rocket },
  { href: '/admin/customers',            label: 'לקוחות',       icon: Users },
  { href: '/admin/analytics',        label: 'אנליטיקה',      icon: BarChart2 },
  { href: '/admin/catalog-check',    label: 'בדיקת קטלוג',   icon: ClipboardList },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin' && pathname.startsWith(href));

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-10 bg-[#0F2E24]" dir="rtl">
        {/* Logo row */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Mountain className="w-5 h-5 text-[#D8C8A8]" />
            <span className="font-black text-xl text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
              Camp<span className="text-[#D8C8A8]">IL</span>
            </span>
            <span className="text-white/30 text-xs">ניהול</span>
          </Link>
          <LogoutButton compact />
        </div>

        {/* Horizontal nav */}
        <div
          className="flex overflow-x-auto"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition-colors ${
                isActive(href)
                  ? 'border-[#D8C8A8] text-[#D8C8A8]'
                  : 'border-transparent text-white/55 hover:text-white/90'
              }`}
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Desktop sidebar ────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-[#0F2E24] h-full"
        dir="rtl"
      >
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-0.5">
            <Mountain className="w-6 h-6 text-[#D8C8A8]" />
            <span className="font-black text-xl text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
              Camp<span className="text-[#D8C8A8]">IL</span>
            </span>
          </div>
          <p className="text-white/35 text-xs">ממשק ניהול</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive(href)
                  ? 'bg-white/15 text-white'
                  : 'text-white/55 hover:bg-white/8 hover:text-white/90'
              }`}
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 ${isActive(href) ? 'text-[#D8C8A8]' : ''}`}
              />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <p className="text-white/35 text-xs truncate mb-2.5 px-1" dir="ltr">
            {userEmail}
          </p>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
