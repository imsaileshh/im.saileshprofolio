import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { getDashboardVisitors } from '@/lib/dashboard/data';
import { visitorListQuerySchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const query = visitorListQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!query.success) {
    return NextResponse.json({ error: 'Invalid visitor query', details: query.error.flatten() }, { status: 400 });
  }

  return NextResponse.json(await getDashboardVisitors(query.data));
}
