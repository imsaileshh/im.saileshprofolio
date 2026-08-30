import { prisma } from '@/lib/database/prisma';
import { createSession } from './session';

export async function loginWithPin(pin: string) {
  const validPin = process.env.ADMIN_PIN || '1010';
  
  if (pin === validPin) {
    let admin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (!admin) {
      admin = await prisma.user.create({
        data: {
          email: 'admin@local.dev',
          name: 'Admin',
          role: 'ADMIN',
        }
      });
    }

    const token = await createSession(admin.id);
    return { success: true, token, user: admin };
  }

  // TODO: Implement actual secure passkey/password auth for production
  return { success: false, error: 'Invalid credentials' };
}
