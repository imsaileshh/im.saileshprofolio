import { NextResponse } from 'next/server';
import { loginWithPin } from '@/lib/auth/auth';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
    }

    const result = await loginWithPin(pin);

    if (result.success) {
      return NextResponse.json({ user: result.user, token: result.token }, { status: 200 });
    } else {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
