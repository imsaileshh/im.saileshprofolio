'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

export async function addEducationAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const institution = formData.get('institution') as string;
  const degree = formData.get('degree') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const description = formData.get('description') as string;
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);

  if (!institution || !degree || !startDateStr) return;

  await prisma.education.create({
    data: { 
      institution, 
      degree, 
      startDate: new Date(startDateStr),
      endDate: endDateStr ? new Date(endDateStr) : null,
      description: description || null,
      orderIndex 
    },
  });
  revalidatePath('/dashboard/education');
}

export async function deleteEducationAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.education.delete({ where: { id } });
  revalidatePath('/dashboard/education');
}
