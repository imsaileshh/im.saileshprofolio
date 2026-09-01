import { notFound } from 'next/navigation';
import { prisma } from '@/lib/database/prisma';
import { AdvancedCaseStudyEditor } from '@/components/dashboard/case-studies/AdvancedCaseStudyEditor';

export const metadata = {
  title: 'Edit Case Study | CMS Dashboard',
};

export const dynamic = 'force-dynamic';

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    include: {
      sections: { orderBy: { order: 'asc' } },
      project: true,
    },
  });

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="-m-6 md:-m-10">
      <AdvancedCaseStudyEditor caseStudy={caseStudy} isNew={false} />
    </div>
  );
}
