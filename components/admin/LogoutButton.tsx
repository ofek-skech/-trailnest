'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

export default function LogoutButton({ compact }: { compact?: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  if (compact) {
    return (
      <button
        onClick={handleLogout}
        className="p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="יציאה"
      >
        <LogOut className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/60 hover:text-white/90 hover:bg-white/8 rounded-xl transition-colors font-semibold cursor-pointer"
      style={{ fontFamily: 'Rubik, sans-serif' }}
    >
      <LogOut className="w-4 h-4 flex-shrink-0" />
      יציאה
    </button>
  );
}
