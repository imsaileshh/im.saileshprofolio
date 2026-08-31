import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';
import { createProjectAction } from '../actions';
import { prisma } from '@/lib/database/prisma';

export const dynamic = 'force-dynamic';

export default async function NewProjectPage() {
  const categories = await prisma.projectTaxonomy.findMany({
    where: { type: 'category' },
    orderBy: { name: 'asc' },
  });

  return (
    <main className="space-y-6 pb-24">
      <header className="flex flex-col gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/projects" className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-zinc-400 hover:bg-white/10 hover:text-white">
            <ChevronLeft size={16} /> Back to Projects
          </Link>
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create Project</h1>
          <p className="mt-1 text-sm text-zinc-400">Add a project to your portfolio.</p>
        </div>
      </header>

      <ProjectForm action={createProjectAction} submitLabel="Create Project" isNew={true} categories={categories.map(c => c.name)} />
    </main>
  );
}
