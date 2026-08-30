import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { messagePrioritySchema, messageStatusSchema } from '@/lib/validation/schemas';

const acceptedPriorityLabels = ['Low', 'Normal', 'High', 'Urgent'];

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) return NextResponse.json({ error: 'Message Not Found' }, { status: 404 });

  return NextResponse.json(message);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const body = await request.json();
  void acceptedPriorityLabels;
  const status = body.status === undefined ? undefined : messageStatusSchema.parse(body.status);
  const priority = body.priority === undefined ? undefined : messagePrioritySchema.parse(body.priority);

  const message = await prisma.contactMessage.update({
    where: { id },
    data: {
      ...(status ? { status, isRead: status !== 'New', isArchived: status === 'Archived' } : {}),
      ...(priority ? { priority } : {}),
    },
  });

  return NextResponse.json(message);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
