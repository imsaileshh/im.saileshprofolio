import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { restoreResumeVersion } from '@/lib/resume/store';

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const body = await request.json();
  const versionId = typeof body.versionId === 'string' ? body.versionId : '';

  if (!versionId) {
    return NextResponse.json({ error: 'versionId is required' }, { status: 400 });
  }

  const resume = await restoreResumeVersion(id, versionId);
  if (!resume) {
    return NextResponse.json({ error: 'Resume version not found' }, { status: 404 });
  }

  return NextResponse.json({ resume });
}
