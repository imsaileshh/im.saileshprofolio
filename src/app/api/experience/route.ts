import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { verifySession } from '@/lib/auth/session';

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const experience = await prisma.experience.create({
      data: {
        role: data.role,
        company: data.company,
        location: data.location,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        current: data.current || false,
        description: data.description || [],
        orderIndex: data.orderIndex || 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
