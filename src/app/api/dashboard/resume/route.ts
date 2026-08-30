import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { createResumeFromText } from '@/lib/resume/store';
import { resumeCreateSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const resumes = await prisma.resume.findMany({
    where: { status: { not: 'Deleted' } },
    orderBy: { updatedAt: 'desc' },
    include: {
      versions: { orderBy: { versionNumber: 'desc' }, take: 1 },
      analyses: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
  });

  return NextResponse.json({ resumes });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const payload = resumeCreateSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid resume content', details: payload.error.flatten() }, { status: 400 });
  }

  const created = await createResumeFromText({
    name: payload.data.name,
    fileName: payload.data.fileName,
    contentText: payload.data.contentText,
  });

  return NextResponse.json(created, { status: 201 });
}
