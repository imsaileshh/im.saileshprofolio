import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { addResumeVersion } from '@/lib/resume/store';
import { resumeVersionSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const versions = await prisma.resumeVersion.findMany({
    where: { resumeId: id },
    orderBy: { versionNumber: 'desc' },
  });

  return NextResponse.json({ versions });
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const payload = resumeVersionSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid resume version', details: payload.error.flatten() }, { status: 400 });
  }

  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume || resume.status === 'Deleted') {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  const version = await addResumeVersion({
    resumeId: id,
    name: payload.data.name ?? resume.name ?? 'Edited resume',
    changeSummary: payload.data.changeSummary ?? 'Edited resume content',
    contentText: payload.data.contentText,
  });

  return NextResponse.json({ version }, { status: 201 });
}
