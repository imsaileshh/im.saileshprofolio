import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { getConversionAnalytics } from '@/lib/dashboard/data';
import { analyticsQuerySchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;
  const query = analyticsQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!query.success) return NextResponse.json({ error: 'Invalid conversion analytics query' }, { status: 400 });
  return NextResponse.json(await getConversionAnalytics(query.data.range, query.data.from, query.data.to));
}
