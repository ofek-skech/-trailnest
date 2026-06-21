import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase env vars are missing, surface a clear error instead of crashing
  if (!supabaseUrl || !supabaseAnonKey) {
    const { pathname } = request.nextUrl;
    if (pathname === '/admin/login') {
      return new NextResponse(
        '<html><body style="font-family:monospace;padding:2rem;direction:rtl">' +
        '<h2>⚠️ הגדרות חסרות</h2>' +
        '<p>Add these to Vercel → Settings → Environment Variables, then redeploy:</p>' +
        '<pre>NEXT_PUBLIC_SUPABASE_URL\nNEXT_PUBLIC_SUPABASE_ANON_KEY</pre>' +
        '</body></html>',
        { status: 503, headers: { 'Content-Type': 'text/html' } }
      );
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/admin/login';

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (user && isLoginPage) {
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean);
    if (adminEmails.length > 0 && !adminEmails.includes(user.email!)) {
      return NextResponse.redirect(new URL('/admin/login?error=unauthorized', request.url));
    }
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
