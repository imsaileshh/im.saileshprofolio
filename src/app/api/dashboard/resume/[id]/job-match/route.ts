import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { analyzeAndStoreResume } from '@/lib/resume/store';
import { atsAnalyzeSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const payload = atsAnalyzeSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid job match request', details: payload.error.flatten() }, { status: 400 });
  }

  const analysis = await analyzeAndStoreResume({
    resumeId: id,
    versionId: payload.data.versionId,
    jobDescription: payload.data.jobDescription,
  });

  if (!analysis) {
    return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
  }

  return NextResponse.json({ analysis }, { status: 201 });
}
