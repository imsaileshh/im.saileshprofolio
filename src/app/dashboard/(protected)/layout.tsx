import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth/session';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default async function ProtectedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authSession = await verifySession();

  if (!authSession) {
    redirect('/dashboard/login');
  }

  if (authSession.user.role !== 'ADMIN') {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold text-red-500">Unauthorized Access</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-white">
      <Sidebar user={authSession.user} />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
