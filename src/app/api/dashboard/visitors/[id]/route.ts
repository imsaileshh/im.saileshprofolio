import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { getVisitorDetail } from '@/lib/dashboard/data';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  try {
    return NextResponse.json(await getVisitorDetail(id));
  } catch {
    return NextResponse.json({ error: 'Visitor Not Found' }, { status: 404 });
  }
}
