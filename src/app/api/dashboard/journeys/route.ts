import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/dashboard/auth';
import { getJourneys } from '@/lib/dashboard/data';
import { analyticsQuerySchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const url = new URL(request.url);
  const query = analyticsQuerySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!query.success) return NextResponse.json({ error: 'Invalid journey query' }, { status: 400 });

  return NextResponse.json(await getJourneys({
    range: query.data.range,
    from: query.data.from,
    to: query.data.to,
    device: url.searchParams.get('device') ?? undefined,
    eventType: url.searchParams.get('eventType') ?? undefined,
    converted: url.searchParams.has('converted') ? url.searchParams.get('converted') === 'true' : undefined,
  }));
}
