import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { getDashboardMessages } from '@/lib/dashboard/data';
import { messageListQuerySchema, messageMutationSchema } from '@/lib/validation/schemas';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const url = new URL(request.url);
  const query = messageListQuerySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!query.success) {
    return NextResponse.json({ error: 'Invalid message query', details: query.error.flatten() }, { status: 400 });
  }

  return NextResponse.json(await getDashboardMessages(query.data));
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const payload = messageMutationSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid message update', details: payload.error.flatten() }, { status: 400 });
  }

  const data = {
    ...(payload.data.status ? { status: payload.data.status, isRead: payload.data.status !== 'New', isArchived: payload.data.status === 'Archived' } : {}),
    ...(payload.data.priority ? { priority: payload.data.priority } : {}),
  };

  const updated = await prisma.contactMessage.updateMany({
    where: { id: { in: payload.data.ids } },
    data,
  });

  return NextResponse.json({ success: true, updated: updated.count });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const payload = messageMutationSchema.pick({ ids: true }).safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: 'Invalid message delete', details: payload.error.flatten() }, { status: 400 });
  }

  const deleted = await prisma.contactMessage.deleteMany({ where: { id: { in: payload.data.ids } } });
  return NextResponse.json({ success: true, deleted: deleted.count });
}
