'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

export async function addExperienceAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const company = formData.get('company') as string;
  const role = formData.get('role') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const current = formData.get('current') === 'on';
  const descriptionStr = formData.get('description') as string;
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);

  if (!company || !role || !startDateStr) return;

  const description = descriptionStr.split('\n').map(s => s.trim()).filter(Boolean);

  await prisma.experience.create({
    data: { 
      company, 
      role, 
      startDate: new Date(startDateStr),
      endDate: endDateStr ? new Date(endDateStr) : null,
      current,
      description,
      orderIndex 
    },
  });
  revalidatePath('/dashboard/experience');
}

export async function deleteExperienceAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.experience.delete({ where: { id } });
  revalidatePath('/dashboard/experience');
}
