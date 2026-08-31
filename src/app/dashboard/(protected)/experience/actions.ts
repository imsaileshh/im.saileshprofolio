'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { z } from 'zod';

const experienceSchema = z.object({
  id: z.string().optional().nullable(),
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  employmentType: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  current: z.boolean().default(false),
  description: z.string(),
  technologies: z.string().optional().nullable(),
  orderIndex: z.number().default(0),
}).superRefine((data, ctx) => {
  if (!data.current && !data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "End date is required unless this is your current position",
    });
  }
});

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function saveExperienceAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { error: 'Unauthorized' };

    const getStringOrNull = (key: string) => {
      const val = formData.get(key);
      if (!val || typeof val !== 'string' || val.trim() === '') return null;
      return val;
    };

    const rawData = {
      id: getStringOrNull('id'),
      company: getStringOrNull('company') || '',
      role: getStringOrNull('role') || '',
      employmentType: getStringOrNull('employmentType'),
      location: getStringOrNull('location'),
      startDate: getStringOrNull('startDate') || '',
      endDate: getStringOrNull('endDate'),
      current: formData.get('current') === 'on' || formData.get('current') === 'true',
      description: getStringOrNull('description') || '',
      technologies: getStringOrNull('technologies'),
      orderIndex: parseInt((formData.get('orderIndex') as string) || '0', 10),
    };

    const validated = experienceSchema.safeParse(rawData);
    if (!validated.success) {
      return { error: validated.error.errors[0]?.message || 'Validation failed' };
    }

    const data = validated.data;
    const descriptionArray = data.description ? data.description.split('\n').map(s => s.trim()).filter(Boolean) : [];
    const techArray = data.technologies ? data.technologies.split(',').map(s => s.trim()).filter(Boolean) : [];

    const payload = {
      company: data.company,
      role: data.role,
      employmentType: data.employmentType || null,
      location: data.location || null,
      startDate: new Date(data.startDate),
      endDate: data.endDate && !data.current ? new Date(data.endDate) : null,
      current: data.current,
      description: descriptionArray,
      technologies: techArray,
      orderIndex: data.orderIndex,
    };

    if (data.id) {
      await prisma.experience.update({
        where: { id: data.id },
        data: payload,
      });
    } else {
      await prisma.experience.create({
        data: payload,
      });
    }

    revalidatePath('/dashboard/experience');
    revalidatePath('/');
    return { success: true, message: data.id ? 'Experience updated successfully' : 'Experience added successfully' };
  } catch (error) {
    console.error('Error saving experience:', error);
    return { error: 'An unexpected error occurred while saving.' };
  }
}

export async function deleteExperienceAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.experience.delete({ where: { id } });
  revalidatePath('/dashboard/experience');
  revalidatePath('/');
}

export async function reorderExperiencesAction(updates: { id: string; orderIndex: number }[]) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  try {
    // Update all in a transaction
    await prisma.$transaction(
      updates.map((update) =>
        prisma.experience.update({
          where: { id: update.id },
          data: { orderIndex: update.orderIndex },
        })
      )
    );
    revalidatePath('/dashboard/experience');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to reorder:', error);
    return { error: 'Failed to reorder items' };
  }
}
