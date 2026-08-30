import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { attachAnalyticsCookies, recordAnalyticsEvent } from '@/lib/analytics/server';
import { contactMessageSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = contactMessageSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json(
        { error: 'Invalid contact message', details: payload.error.flatten() },
        { status: 400 },
      );
    }

    const message = await prisma.contactMessage.create({
      data: {
        name: payload.data.name,
        email: payload.data.email,
        subject: payload.data.subject,
        message: payload.data.message,
        status: 'New',
        priority: 'Normal',
      },
    });

    await prisma.notification.create({
      data: {
        type: 'ContactMessage',
        title: 'New contact message',
        body: `${message.name} sent a portfolio inquiry.`,
        linkUrl: `/dashboard/messages/${message.id}`,
        metadata: { contactMessageId: message.id },
      },
    });

    const { ids } = await recordAnalyticsEvent(request, {
      eventType: 'contact_submit',
      pagePath: typeof body.pagePath === 'string' && body.pagePath.startsWith('/') ? body.pagePath : '/hire',
      metadata: {},
    });

    const response = NextResponse.json({ success: true, id: message.id }, { status: 201 });
    attachAnalyticsCookies(response, ids);

    return response;
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to send contact message' }, { status: 500 });
  }
}
