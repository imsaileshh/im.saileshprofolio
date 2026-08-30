import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { verifySession } from '@/lib/auth/session';

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { startDate: 'desc' },
    });
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const education = await prisma.education.create({
      data: {
        institution: data.institution,
        degree: data.degree,
        field: data.field,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        score: data.score,
      },
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 });
  }
}
