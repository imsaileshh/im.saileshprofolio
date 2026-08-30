import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { resumeUpdateSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const resume = await prisma.resume.findUnique({
    where: { id },
    include: {
      versions: { orderBy: { versionNumber: 'desc' } },
      sections: { orderBy: { orderIndex: 'asc' } },
      skills: { orderBy: { name: 'asc' } },
      analyses: {
        orderBy: { createdAt: 'desc' },
        include: { keywordAnalysis: true, suggestions: true, jobDescription: true },
      },
    },
  });

  if (!resume || resume.status === 'Deleted') {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  return NextResponse.json(resume);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const payload = resumeUpdateSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid resume update', details: payload.error.flatten() }, { status: 400 });
  }

  const resume = await prisma.resume.update({
    where: { id },
    data: payload.data,
  });

  return NextResponse.json(resume);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  await prisma.resume.update({
    where: { id },
    data: { status: 'Deleted', isActive: false },
  });

  return NextResponse.json({ success: true });
}
