import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth/session';

export async function GET() {
  try {
    const authSession = await verifySession();

    if (authSession) {
      return NextResponse.json({ user: authSession.user, authenticated: true }, { status: 200 });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
