import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { parseResumeSections, structuredDataFromSections } from '@/lib/resume/processing';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume || resume.status === 'Deleted') {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  const text = resume.parsedText ?? resume.originalText ?? '';
  if (!text.trim()) {
    return NextResponse.json({ error: 'No resume text available to parse' }, { status: 422 });
  }

  const sections = parseResumeSections(text);
  const structuredData = structuredDataFromSections(sections);

  await prisma.$transaction(async (tx) => {
    await tx.resumeSection.deleteMany({ where: { resumeId: id } });
    await tx.resumeSkill.deleteMany({ where: { resumeId: id } });
    await tx.resumeSection.createMany({
      data: sections.map((section) => ({
        resumeId: id,
        sectionType: section.sectionType,
        title: section.title,
        content: section.content,
        orderIndex: section.orderIndex,
      })),
    });
    if (structuredData.skills.length) {
      await tx.resumeSkill.createMany({
        data: structuredData.skills.map((skill) => ({
          resumeId: id,
          name: skill,
          category: 'Extracted',
          source: 'resume_text',
        })),
        skipDuplicates: true,
      });
    }
  });

  return NextResponse.json({ sections, structuredData });
}
