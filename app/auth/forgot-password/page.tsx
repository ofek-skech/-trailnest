'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    setLoading(false);
    if (error) {
      setError('שגיאה בשליחת האימייל, נסה שוב');
    } else {
      setDone(true);
    }
  }

  if (done) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF8F3', paddingTop: '80px' }}>
        <div className="w-full max-w-[400px] text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }} dir="rtl">
            בדוק את האימייל שלך
          </h2>
          <p className="text-sm mb-6" style={{ color: '#666', fontFamily: 'Nunito Sans, sans-serif' }} dir="rtl">
            שלחנו לך קישור לאיפוס הסיסמה ל-<strong>{email}</strong>.
          </p>
          <Link href="/auth/login" className="text-sm font-semibold hover:underline" style={{ color: '#D4830A', fontFamily: 'Rubik, sans-serif' }}>
            חזרה להתחברות
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#FAF8F3', paddingTop: '80px' }}>
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '28px', fontWeight: 900, color: '#1E2020', letterSpacing: '-0.03em' }}>
              CAMPIL
            </span>
          </Link>
          <p className="mt-1 text-sm" style={{ color: '#666', fontFamily: 'Nunito Sans, sans-serif' }}>
            איפוס סיסמה
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-xl font-bold mb-2 text-center" style={{ fontFamily: 'Rubik, sans-serif', color: '#1E2020' }} dir="rtl">
            שכחתי סיסמה
          </h1>
          <p className="text-sm text-center mb-6" style={{ color: '#666', fontFamily: 'Nunito Sans, sans-serif' }} dir="rtl">
            הכנס את האימייל שלך ונשלח לך קישור לאיפוס
          </p>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: '#D4830A', boxShadow: '0 4px 16px rgba(212,131,10,0.36)', fontFamily: 'Rubik, sans-serif' }}
            >
              {loading ? 'שולח...' : 'שליחת קישור לאיפוס'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm" style={{ color: '#666', fontFamily: 'Nunito Sans, sans-serif' }} dir="rtl">
            <Link href="/auth/login" className="font-semibold hover:underline" style={{ color: '#D4830A' }}>
              חזרה להתחברות
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
