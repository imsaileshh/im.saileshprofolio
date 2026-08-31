'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

// --- STACK HERO ---

export async function updateStackHeroAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');
  
  const stackTitle = formData.get('stackTitle') as string;
  const stackDescription = formData.get('stackDescription') as string;

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: { stackTitle, stackDescription },
    create: { id: 'singleton', stackTitle, stackDescription }
  });
  
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}

// --- SECTIONS ---

export async function addSectionAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');
  
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const visible = formData.get('visible') === 'on';
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);
  
  if (!title) return;
  await prisma.skillSection.create({ data: { title, description, visible, orderIndex } });
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}

export async function updateSectionAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');
  
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const visible = formData.get('visible') === 'on';
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);
  
  if (!id || !title) return;
  await prisma.skillSection.update({ where: { id }, data: { title, description, visible, orderIndex } });
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}

export async function deleteSectionAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.skillSection.delete({ where: { id } });
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}

// --- TECHNOLOGIES ---

export async function addSkillAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const name = formData.get('name') as string;
  const sectionId = formData.get('sectionId') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;
  const icon = formData.get('icon') as string;
  const visible = formData.get('visible') === 'on';
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);

  if (!name || !sectionId) return;

  await prisma.skill.create({
    data: { name, sectionId, description, type, icon, visible, orderIndex },
  });
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}

export async function updateSkillAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const type = formData.get('type') as string;
  const icon = formData.get('icon') as string;
  const visible = formData.get('visible') === 'on';
  const orderIndex = parseInt((formData.get('orderIndex') as string) || '0', 10);

  if (!id || !name) return;

  await prisma.skill.update({
    where: { id },
    data: { name, description, type, icon, visible, orderIndex },
  });
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}

export async function deleteSkillAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');
  const id = formData.get('id') as string;
  if (!id) return;
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/dashboard/stack');
  revalidatePath('/stack');
}
