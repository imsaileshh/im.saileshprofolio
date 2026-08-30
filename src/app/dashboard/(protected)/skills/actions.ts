'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

export async function addSkillAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const category = formData.get('category') as string;
  const level = formData.get('level') as any;
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);

  if (!name || !category) return;

  await prisma.skill.create({
    data: { name, category, level, orderIndex },
  });
  revalidatePath('/dashboard/skills');
}

export async function deleteSkillAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.skill.delete({ where: { id } });
  revalidatePath('/dashboard/skills');
}
