'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

export async function updateAboutSectionAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const sectionKey = formData.get('sectionKey') as string;
  const jsonData = formData.get('jsonData') as string;

  if (!sectionKey || !jsonData) return;

  const parsedData = JSON.parse(jsonData);

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: { [sectionKey]: parsedData },
    create: {
      id: 'singleton',
      [sectionKey]: parsedData,
    }
  });

  revalidatePath('/dashboard/about');
  revalidatePath('/about');
}
