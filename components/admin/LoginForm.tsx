'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mountain, Eye, EyeOff } from 'lucide-react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

interface Props {
  unauthorizedError: boolean;
}

export default function LoginForm({ unauthorizedError }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = getSupabaseBrowser();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('כתובת האימייל או הסיסמה שגויות');
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#0F2E24] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Mountain className="w-8 h-8 text-[#D8C8A8]" />
            <span
              className="text-3xl font-black text-white"
              style={{ fontFamily: 'Rubik, sans-serif', letterSpacing: '-0.02em' }}
            >
              Camp<span className="text-[#D8C8A8]">IL</span>
            </span>
          </div>
          <p className="text-white/40 text-sm">ממשק ניהול</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1
            className="text-xl font-black text-[#111] mb-6"
            style={{ fontFamily: 'Rubik, sans-serif' }}
          >
            כניסה למערכת
          </h1>

          {unauthorizedError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              אין לך הרשאת גישה לממשק הניהול
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">
                כתובת אימייל
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-3 border border-[#E4DDD2] rounded-xl text-sm focus:outline-none focus:border-[#0F2E24] focus:ring-1 focus:ring-[#0F2E24] transition-colors"
                style={{ direction: 'ltr', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#555] mb-1.5">סיסמה</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-[#E4DDD2] rounded-xl text-sm focus:outline-none focus:border-[#0F2E24] focus:ring-1 focus:ring-[#0F2E24] transition-colors"
                  style={{ direction: 'ltr' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#AAA] hover:text-[#555] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />
                  }
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0F2E24] text-white font-black text-sm rounded-xl hover:bg-[#1a4a35] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              style={{ fontFamily: 'Rubik, sans-serif' }}
            >
              {loading ? 'מתחבר...' : 'כניסה'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          CampIL Admin · גישה מורשית בלבד
        </p>
      </div>
    </div>
  );
}
