'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError('כתובת אימייל או סיסמה שגויים');
    } else {
      router.push('/profile');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF8F3', paddingTop: '80px' }}>
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '28px', fontWeight: 900, color: '#1E2020', letterSpacing: '-0.03em' }}>
              CAMPIL
            </span>
          </Link>
          <p className="mt-1 text-sm" style={{ color: '#666', fontFamily: 'Nunito Sans, sans-serif' }}>
            ברוכים הבאים חזרה
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-xl font-bold mb-6 text-center" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }} dir="rtl">
            כניסה לחשבון
          </h1>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm text-center" style={{ background: '#FEF2F2', color: '#DC2626', fontFamily: 'Nunito Sans, sans-serif' }} dir="rtl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1E2020', fontFamily: 'Rubik, sans-serif' }}>
                אימייל
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all"
                style={{ fontFamily: 'Nunito Sans, sans-serif', direction: 'ltr', textAlign: 'left' }}
                onFocus={e => (e.target.style.borderColor = '#D4830A')}
                onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#1E2020', fontFamily: 'Rubik, sans-serif' }}>
                סיסמה
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition-all"
                style={{ fontFamily: 'Nunito Sans, sans-serif', direction: 'ltr', textAlign: 'left' }}
                onFocus={e => (e.target.style.borderColor = '#D4830A')}
                onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
              />
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-xs hover:underline" style={{ color: '#D4830A', fontFamily: 'Nunito Sans, sans-serif' }}>
                שכחתי סיסמה
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#D4830A', boxShadow: '0 4px 16px rgba(212,131,10,0.36)', fontFamily: 'Rubik, sans-serif' }}
            >
              {loading ? 'מתחבר...' : 'כניסה'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: '#666', fontFamily: 'Nunito Sans, sans-serif' }} dir="rtl">
            אין לך חשבון?{' '}
            <Link href="/auth/register" className="font-semibold hover:underline" style={{ color: '#D4830A' }}>
              הרשמה
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
