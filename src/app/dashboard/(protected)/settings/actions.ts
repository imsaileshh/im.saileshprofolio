'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { verifySession } from '@/lib/auth/session';

export async function updateSettingsAction(formData: FormData) {
  const session = await verifySession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  
  const isHiringOpen = formData.get('isHiringOpen') === 'on';
  const availabilityMsg = formData.get('availabilityMsg') as string || null;
  const maintenanceMode = formData.get('maintenanceMode') === 'on';
  const analyticsEnabled = formData.get('analyticsEnabled') === 'on';
  const sessionTimeoutMinutes = parseInt(formData.get('sessionTimeoutMinutes') as string) || 5;

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {
      isHiringOpen,
      availabilityMsg,
      maintenanceMode,
      analyticsEnabled,
      sessionTimeoutMinutes,
    },
    create: {
      id: 'singleton',
      isHiringOpen,
      availabilityMsg,
      maintenanceMode,
      analyticsEnabled,
      sessionTimeoutMinutes,
    }
  });

  revalidatePath('/dashboard/settings');
  revalidatePath('/'); // Revalidate public pages since settings like hiring status might show there
}
