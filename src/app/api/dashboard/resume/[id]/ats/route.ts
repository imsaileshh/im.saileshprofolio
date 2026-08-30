import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request);
  if (!auth.authorized) return auth.response;

  const { id } = await context.params;
  const analyses = await prisma.resumeAnalysis.findMany({
    where: { resumeId: id },
    orderBy: { createdAt: 'desc' },
    include: {
      keywordAnalysis: { orderBy: [{ importance: 'asc' }, { keyword: 'asc' }] },
      suggestions: { orderBy: { createdAt: 'asc' } },
      jobDescription: true,
      version: true,
    },
  });

  return NextResponse.json({ analyses });
}
