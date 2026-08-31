import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/database/prisma';
import { ProjectForm } from '@/components/dashboard/projects/ProjectForm';
import { updateProjectAction } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!project) notFound();
  
  const categories = await prisma.projectTaxonomy.findMany({
    where: { type: 'category' },
    orderBy: { name: 'asc' },
  });

  return (
    <main className="space-y-6 pb-24">
      <ProjectForm project={project} action={updateProjectAction} submitLabel="Save Changes" isNew={false} categories={categories.map(c => c.name)} />
    </main>
  );
}
