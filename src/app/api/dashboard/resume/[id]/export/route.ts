import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { resumeExportSchema } from '@/lib/validation/schemas';

async function exportResume(id: string, versionId: string | undefined, format: 'txt' | 'json') {
  const resume = await prisma.resume.findUnique({
    where: { id },
    include: { versions: { orderBy: { versionNumber: 'desc' } } },
  });
  if (!resume || resume.status === 'Deleted') {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  const version = versionId
    ? resume.versions.find((item) => item.id === versionId)
    : resume.versions.find((item) => item.id === resume.activeVersionId) ?? resume.versions[0];
  if (!version) {
    return NextResponse.json({ error: 'Resume version not found' }, { status: 404 });
  }

  if (format === 'json') {
    return NextResponse.json({ resume, version });
  }

  return new NextResponse(version.contentText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${(version.fileName ?? resume.fileName ?? 'resume').replace(/\.[^.]+$/, '')}.txt"`,
    },
  });
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const url = new URL(request.url);
  const format = url.searchParams.get('format') === 'json' ? 'json' : 'txt';
  const versionId = url.searchParams.get('versionId') ?? undefined;

  return exportResume(id, versionId, format);
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const payload = resumeExportSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid resume export request', details: payload.error.flatten() }, { status: 400 });
  }

  return exportResume(id, payload.data.versionId, payload.data.format);
}
