'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase-client';
import type { User } from '@supabase/supabase-js';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseClient();
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      if (!data.user) {
        router.replace('/auth/login');
      } else {
        setUser(data.user);
        setLoading(false);
      }
    });
  }, [router]);

  async function handleSignOut() {
    setSigningOut(true);
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#FAF8F3' }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#D4830A', borderTopColor: 'transparent' }} />
      </main>
    );
  }

  const displayName = (user?.user_metadata?.full_name as string) || user?.email?.split('@')[0] || 'משתמש';

  return (
    <main className="min-h-screen px-4 pb-16" style={{ background: '#FAF8F3', paddingTop: '100px' }}>
      <div className="max-w-[680px] mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8" dir="rtl">
          <div>
            <h1 className="text-2xl font-black" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }}>
              שלום, {displayName} 👋
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#888', fontFamily: 'Nunito Sans, sans-serif' }}>
              {user?.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-sm font-semibold px-4 py-2 rounded-xl border transition-all hover:bg-red-50 disabled:opacity-60"
            style={{ borderColor: '#e5e7eb', color: '#DC2626', fontFamily: 'Rubik, sans-serif' }}
          >
            {signingOut ? '...' : 'יציאה'}
          </button>
        </div>

        {/* Account details card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4" dir="rtl">
          <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }}>
            פרטי החשבון
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm" style={{ color: '#888', fontFamily: 'Nunito Sans, sans-serif' }}>שם</span>
              <span className="text-sm font-semibold" style={{ color: '#1E2020', fontFamily: 'Nunito Sans, sans-serif' }}>{displayName}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm" style={{ color: '#888', fontFamily: 'Nunito Sans, sans-serif' }}>אימייל</span>
              <span className="text-sm font-semibold" style={{ color: '#1E2020', fontFamily: 'Nunito Sans, sans-serif', direction: 'ltr' }}>{user?.email}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm" style={{ color: '#888', fontFamily: 'Nunito Sans, sans-serif' }}>חבר מאז</span>
              <span className="text-sm font-semibold" style={{ color: '#1E2020', fontFamily: 'Nunito Sans, sans-serif' }}>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString('he-IL') : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Order history placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4" dir="rtl">
          <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }}>
            היסטוריית הזמנות
          </h2>
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-sm" style={{ color: '#888', fontFamily: 'Nunito Sans, sans-serif' }}>
              עדיין אין לך הזמנות
            </p>
            <Link
              href="/shop"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: '#D4830A', boxShadow: '0 4px 14px rgba(212,131,10,0.32)', fontFamily: 'Rubik, sans-serif' }}
            >
              לכל המוצרים
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" dir="rtl">
          <h2 className="text-base font-bold mb-4" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }}>
            קישורים מהירים
          </h2>
          <div className="space-y-2">
            {[
              { label: 'כל המוצרים', href: '/shop' },
              { label: 'מבצעים', href: '/shop/sale' },
              { label: 'יצירת קשר', href: '/contact' },
              { label: 'מדיניות החזרות', href: '/policies/returns' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-[#FDF8F2] transition-colors group"
              >
                <span className="text-sm font-semibold" style={{ color: '#1E2020', fontFamily: 'Nunito Sans, sans-serif' }}>{link.label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4830A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
