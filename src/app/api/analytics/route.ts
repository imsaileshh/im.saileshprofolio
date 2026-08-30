import { NextRequest, NextResponse } from 'next/server';
import { allowedAnalyticsEventTypes, analyticsEventSchema } from '@/lib/validation/schemas';
import { attachAnalyticsCookies, recordAnalyticsEvent } from '@/lib/analytics/server';

export async function GET() {
  return NextResponse.json({ allowedEventTypes: allowedAnalyticsEventTypes });
}

export async function POST(request: NextRequest) {
  try {
    const payload = analyticsEventSchema.safeParse(await request.json());

    if (!payload.success) {
      return NextResponse.json(
        { error: 'Invalid analytics event', details: payload.error.flatten() },
        { status: 400 },
      );
    }

    const { ids } = await recordAnalyticsEvent(request, payload.data);
    const response = NextResponse.json({ success: true }, { status: 201 });
    attachAnalyticsCookies(response, ids);

    return response;
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ error: 'Failed to record analytics event' }, { status: 500 });
  }
}
