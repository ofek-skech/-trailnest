import AdminSidebar from '@/components/admin/AdminSidebar';
import { getAdminUserOrNull } from '@/lib/supabase-session';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUserOrNull();

  // Unauthenticated — render login page without shell
  if (!user) {
    return <div className="fixed inset-0 z-[100] bg-[#0F2E24]">{children}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden" dir="rtl">
      <AdminSidebar userEmail={user.email ?? ''} />
      <main className="flex-1 overflow-y-auto bg-[#F8F7F3]">
        {/* Mobile top-bar offset (56px logo + ~36px nav tabs) */}
        <div className="pt-[96px] lg:pt-0 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
