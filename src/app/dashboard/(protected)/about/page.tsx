import { prisma } from '@/lib/database/prisma';
import { AboutEditor } from '@/components/dashboard/about/AboutEditor';

export const dynamic = 'force-dynamic';

export default async function DashboardAboutPage() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 'singleton' }
  }) || {};

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-white">About Page Content</h1>
        <p className="mt-1 text-sm text-zinc-400">Manage all content for the public About page.</p>
      </header>

      <AboutEditor settings={settings} />
    </main>
  );
}
