import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session';

export async function requireAdmin(request?: Request) {
  const authHeader = request?.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;
  const session = await verifySession(token);

  if (!session || session.user.role !== 'ADMIN') {
    return {
      authorized: false as const,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { authorized: true as const, session };
}
