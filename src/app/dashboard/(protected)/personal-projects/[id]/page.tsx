import { notFound } from 'next/navigation';
import { prisma } from '@/lib/database/prisma';
import { PersonalProjectForm } from '@/components/dashboard/personal-projects/PersonalProjectForm';

export const metadata = {
  title: 'Edit Personal Project | CMS Dashboard',
};

export const dynamic = 'force-dynamic';

export default async function EditPersonalProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: 'asc' } },
      caseStudy: { include: { sections: { orderBy: { order: 'asc' } } } },
    },
  });

  if (!project) {
    notFound();
  }

  const featuredCount = await prisma.project.count({
    where: {
      projectType: { in: ['Personal Project', 'Open Source'] },
      featured: true,
      archived: false,
      id: { not: id },
    },
  });

  return (
    <main className="space-y-6">
      <header className="border-b border-white/5 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Edit Personal Project
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Update details, external links, and visibility for {project.title}.
        </p>
      </header>

      <PersonalProjectForm project={project} featuredCount={featuredCount} />
    </main>
  );
}
