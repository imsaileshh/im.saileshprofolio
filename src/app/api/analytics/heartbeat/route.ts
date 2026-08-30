import { NextRequest, NextResponse } from 'next/server';
import { attachAnalyticsCookies, recordAnalyticsEvent } from '@/lib/analytics/server';
import { heartbeatSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const payload = heartbeatSchema.safeParse(await request.json());

    if (!payload.success) {
      return NextResponse.json(
        { error: 'Invalid heartbeat', details: payload.error.flatten() },
        { status: 400 },
      );
    }

    const { ids } = await recordAnalyticsEvent(request, {
      eventType: 'page_view',
      pagePath: payload.data.pagePath,
      visitorKey: payload.data.visitorKey,
      sessionKey: payload.data.sessionKey,
      metadata: {},
    });

    const response = NextResponse.json({ success: true }, { status: 201 });
    attachAnalyticsCookies(response, ids);
    return response;
  } catch (error) {
    console.error('Heartbeat API Error:', error);
    return NextResponse.json({ error: 'Failed to record heartbeat' }, { status: 500 });
  }
}
