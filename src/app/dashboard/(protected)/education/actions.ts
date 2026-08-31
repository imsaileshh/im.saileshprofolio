'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';
import { z } from 'zod';

const educationSchema = z.object({
  id: z.string().optional().nullable(),
  institution: z.string().min(1, 'Institution is required'),
  degree: z.string().min(1, 'Degree is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  orderIndex: z.number().default(0),
}).superRefine((data, ctx) => {
  if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["endDate"],
      message: "End date cannot be earlier than start date",
    });
  }
});

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function saveEducationAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
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
      institution: getStringOrNull('institution') || '',
      degree: getStringOrNull('degree') || '',
      startDate: getStringOrNull('startDate') || '',
      endDate: getStringOrNull('endDate'),
      description: getStringOrNull('description'),
      orderIndex: parseInt((formData.get('orderIndex') as string) || '0', 10),
    };

    const validated = educationSchema.safeParse(rawData);
    if (!validated.success) {
      return { error: validated.error.errors[0]?.message || 'Validation failed' };
    }

    const data = validated.data;

    const payload = {
      institution: data.institution,
      degree: data.degree,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      description: data.description || null,
      orderIndex: data.orderIndex,
    };

    if (data.id) {
      await prisma.education.update({
        where: { id: data.id },
        data: payload,
      });
    } else {
      await prisma.education.create({
        data: payload,
      });
    }

    revalidatePath('/dashboard/education');
    revalidatePath('/');
    return { success: true, message: data.id ? 'Education updated successfully' : 'Education added successfully' };
  } catch (error) {
    console.error('Error saving education:', error);
    return { error: 'An unexpected error occurred while saving.' };
  }
}

export async function deleteEducationAction(formData: FormData) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  if (!id) return;

  await prisma.education.delete({ where: { id } });
  revalidatePath('/dashboard/education');
  revalidatePath('/');
}

export async function reorderEducationAction(updates: { id: string; orderIndex: number }[]) {
  const auth = await requireAdmin();
  if (!auth.authorized) throw new Error('Unauthorized');

  try {
    await prisma.$transaction(
      updates.map((update) =>
        prisma.education.update({
          where: { id: update.id },
          data: { orderIndex: update.orderIndex },
        })
      )
    );
    revalidatePath('/dashboard/education');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Failed to reorder education:', error);
    return { error: 'Failed to reorder items' };
  }
}
