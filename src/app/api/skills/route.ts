import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import { verifySession } from '@/lib/auth/session';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { orderIndex: 'asc' },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await verifySession();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category,
        proficiency: data.proficiency || 80,
        orderIndex: data.orderIndex || 0,
      },
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
