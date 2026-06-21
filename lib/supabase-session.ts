import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

function makeClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {}, // read-only — middleware refreshes tokens
      },
    }
  );
}

export async function getAdminUser(): Promise<User> {
  const cookieStore = await cookies();
  const supabase = makeClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
  if (adminEmails.length > 0 && !adminEmails.includes(user.email!)) {
    redirect('/admin/login?error=unauthorized');
  }

  return user;
}

export async function getAdminUserOrNull(): Promise<User | null> {
  const cookieStore = await cookies();
  const supabase = makeClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
