import { prisma } from '@/lib/database/prisma';
import { PersonalProjectForm } from '@/components/dashboard/personal-projects/PersonalProjectForm';

export const metadata = {
  title: 'Add Personal Project | CMS Dashboard',
};

export const dynamic = 'force-dynamic';

export default async function NewPersonalProjectPage() {
  const featuredCount = await prisma.project.count({
    where: {
      projectType: { in: ['Personal Project', 'Open Source'] },
      featured: true,
      archived: false,
    },
  });

  return (
    <main className="space-y-6">
      <header className="border-b border-white/5 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add Personal Project
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Create a new side experiment, tool, prototype, or open-source build.
        </p>
      </header>

      <PersonalProjectForm featuredCount={featuredCount} />
    </main>
  );
}
