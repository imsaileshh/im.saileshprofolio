import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { compareResumeVersions } from '@/lib/resume/store';
import { resumeCompareSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const url = new URL(request.url);
  const payload = resumeCompareSchema.safeParse({
    versionAId: url.searchParams.get('versionAId'),
    versionBId: url.searchParams.get('versionBId'),
  });
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid comparison request', details: payload.error.flatten() }, { status: 400 });
  }

  const comparison = await compareResumeVersions(id, payload.data.versionAId, payload.data.versionBId);
  if (!comparison) {
    return NextResponse.json({ error: 'Resume versions not found' }, { status: 404 });
  }

  return NextResponse.json({ comparison });
}
