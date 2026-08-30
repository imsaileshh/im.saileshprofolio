import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session';
import { getDashboardOverview, resolveDashboardDateRange, type DashboardRangeKey } from '@/lib/dashboard/overview';
import { dashboardDateRangeSchema } from '@/lib/validation/schemas';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
    
    const session = await verifySession(token);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(request.url);
    const parsedRange = dashboardDateRangeSchema.safeParse({
      range: url.searchParams.get('range') ?? undefined,
      from: url.searchParams.get('from') ?? undefined,
      to: url.searchParams.get('to') ?? undefined,
    });

    if (!parsedRange.success) {
      return NextResponse.json(
        { error: 'Invalid dashboard date range', details: parsedRange.error.flatten() },
        { status: 400 },
      );
    }

    const dateRange = resolveDashboardDateRange(
      parsedRange.data.range as DashboardRangeKey,
      parsedRange.data.from,
      parsedRange.data.to,
    );

    return NextResponse.json(await getDashboardOverview(dateRange));
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
