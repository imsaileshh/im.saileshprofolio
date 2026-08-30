import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { persistResumeUpload } from '@/lib/resume/processing';
import { addResumeVersion } from '@/lib/resume/store';
import { resumeUploadSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Resume file is required' }, { status: 400 });
  }

  const uploadMeta = resumeUploadSchema.safeParse({
    name: formData.get('name') ? String(formData.get('name')) : undefined,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
  });
  if (!uploadMeta.success) {
    return NextResponse.json({ error: 'Invalid resume upload', details: uploadMeta.error.flatten() }, { status: 400 });
  }

  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume || resume.status === 'Deleted') {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  const saved = await persistResumeUpload(file, id);
  const version = await addResumeVersion({
    resumeId: id,
    name: uploadMeta.data.name ?? resume.name ?? saved.fileName,
    fileName: saved.fileName,
    fileType: saved.fileType,
    filePath: saved.filePath,
    contentText: saved.text,
    changeSummary: 'Uploaded resume file',
  });

  return NextResponse.json({ version }, { status: 201 });
}
