'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/database/prisma';
import { requireAdmin } from '@/lib/dashboard/auth';

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
};

function optionalString(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === 'on' || formData.get(name) === 'true';
}

function parseTechnologies(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== 'string') return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function revalidatePersonalProjects() {
  revalidatePath('/dashboard/personal-projects');
  revalidatePath('/personal-projects');
}

export async function createPersonalProjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { error: 'Unauthorized' };

    const title = String(formData.get('title') ?? '').trim();
    let slug = String(formData.get('slug') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();

    if (!title) return { error: 'Project title is required' };
    if (!description) return { error: 'Project description is required' };

    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const category = optionalString(formData.get('category')) ?? 'Personal Project';
    const year = optionalString(formData.get('year')) ?? new Date().getFullYear().toString();
    const technologies = parseTechnologies(formData.get('technologies'));
    const liveUrl = optionalString(formData.get('liveUrl'));
    const githubUrl = optionalString(formData.get('githubUrl'));
    const coverImageUrl = optionalString(formData.get('coverImageUrl'));
    const featured = checked(formData, 'featured');
    
    // Status resolution based on submit action or select
    const submitAction = formData.get('action');
    let published = true;
    if (submitAction === 'save_draft') {
      published = false;
    } else if (formData.get('status') === 'Draft') {
      published = false;
    }

    const created = await prisma.project.create({
      data: {
        title,
        slug,
        description,
        projectType: 'Personal Project',
        category,
        year,
        technologies,
        liveUrl,
        githubUrl,
        featured,
        published,
        archived: false,
        showOnHomepage: false, // Keep independent from main Works homepage showcase
        publishedAt: published ? new Date() : null,
        images: coverImageUrl
          ? {
              create: [
                {
                  url: coverImageUrl,
                  isCover: true,
                  order: 0,
                },
              ],
            }
          : undefined,
      },
    });

    revalidatePersonalProjects();
    redirect('/dashboard/personal-projects?saved=created');
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') throw error;
    console.error('Personal project creation failed:', error);
    if (error?.code === 'P2002' && error?.meta?.target?.includes('slug')) {
      return { error: 'This slug is already in use. Please choose a different URL slug.' };
    }
    return { error: error.message || 'An unexpected error occurred.' };
  }
}

export async function updatePersonalProjectAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { error: 'Unauthorized' };

    const id = String(formData.get('id') ?? '').trim();
    if (!id) return { error: 'Missing project ID' };

    const title = String(formData.get('title') ?? '').trim();
    let slug = String(formData.get('slug') ?? '').trim();
    const description = String(formData.get('description') ?? '').trim();

    if (!title) return { error: 'Project title is required' };
    if (!description) return { error: 'Project description is required' };

    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const category = optionalString(formData.get('category')) ?? 'Personal Project';
    const year = optionalString(formData.get('year')) ?? new Date().getFullYear().toString();
    const technologies = parseTechnologies(formData.get('technologies'));
    const liveUrl = optionalString(formData.get('liveUrl'));
    const githubUrl = optionalString(formData.get('githubUrl'));
    const coverImageUrl = optionalString(formData.get('coverImageUrl'));
    const featured = checked(formData, 'featured');
    
    const submitAction = formData.get('action');
    let published = true;
    if (submitAction === 'save_draft') {
      published = false;
    } else if (formData.get('status') === 'Draft') {
      published = false;
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        projectType: 'Personal Project',
        category,
        year,
        technologies,
        liveUrl,
        githubUrl,
        featured,
        published,
        archived: false,
        showOnHomepage: false,
        publishedAt: published ? new Date() : null,
      },
    });

    if (coverImageUrl) {
      // Upsert cover image
      await prisma.projectImage.deleteMany({ where: { projectId: id, isCover: true } });
      await prisma.projectImage.create({
        data: {
          projectId: id,
          url: coverImageUrl,
          isCover: true,
          order: 0,
        },
      });
    }

    revalidatePersonalProjects();
    redirect('/dashboard/personal-projects?saved=updated');
  } catch (error: any) {
    if (error.message === 'NEXT_REDIRECT') throw error;
    console.error('Personal project update failed:', error);
    if (error?.code === 'P2002' && error?.meta?.target?.includes('slug')) {
      return { error: 'This slug is already in use. Please choose a different URL slug.' };
    }
    return { error: error.message || 'An unexpected error occurred.' };
  }
}

export async function deletePersonalProjectAction(id: string) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { error: 'Unauthorized' };

    await prisma.project.delete({ where: { id } });
    revalidatePersonalProjects();
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete personal project:', error);
    return { error: error.message || 'Failed to delete project' };
  }
}

export async function togglePersonalProjectPublishedAction(id: string, currentPublished: boolean) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { error: 'Unauthorized' };

    await prisma.project.update({
      where: { id },
      data: {
        published: !currentPublished,
        publishedAt: !currentPublished ? new Date() : null,
      },
    });
    revalidatePersonalProjects();
    return { success: true };
  } catch (error: any) {
    console.error('Failed to toggle published status:', error);
    return { error: error.message || 'Failed to update status' };
  }
}

export async function togglePersonalProjectFeaturedAction(id: string, currentFeatured: boolean) {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { error: 'Unauthorized' };

    await prisma.project.update({
      where: { id },
      data: {
        featured: !currentFeatured,
      },
    });
    revalidatePersonalProjects();
    return { success: true };
  } catch (error: any) {
    console.error('Failed to toggle featured status:', error);
    return { error: error.message || 'Failed to update featured' };
  }
}
