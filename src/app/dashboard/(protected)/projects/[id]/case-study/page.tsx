import { notFound } from 'next/navigation';
import { prisma } from '@/lib/database/prisma';
import { CaseStudyEditor } from './CaseStudyEditor';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const project = await prisma.project.findUnique({
    where: { id: resolvedParams.id },
    include: {
      caseStudy: {
        include: {
          sections: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  if (!project) notFound();

  return (
    <main className="space-y-6">
      <CaseStudyEditor project={project} initialCaseStudy={project.caseStudy} />
    </main>
  );
}
