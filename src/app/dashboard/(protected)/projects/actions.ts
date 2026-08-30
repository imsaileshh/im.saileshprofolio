'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/auth/session';
import {
  bulkUpdateProjects,
  createProjectRecord,
  createProjectTaxonomy,
  deleteProjectRecord,
  deleteProjectTaxonomy,
  duplicateProjectRecord,
  updateProjectRecord,
  updateProjectTaxonomy,
} from '@/lib/dashboard/projects';
import {
  projectBulkMutationSchema,
  projectMutationSchema,
  projectTaxonomyMutationSchema,
} from '@/lib/validation/schemas';

async function requireProjectAdmin() {
  const authSession = await verifySession();
  if (!authSession || authSession.user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

function optionalString(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function checked(formData: FormData, name: string) {
  return formData.get(name) === 'on' || formData.get(name) === 'true';
}

function projectPayload(formData: FormData) {
  return {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    longText: optionalString(formData.get('longText')),
    projectType: formData.get('projectType'),
    category: optionalString(formData.get('category')),
    tags: formData.get('tags'),
    technologies: formData.get('technologies'),
    status: formData.get('status'),
    featured: checked(formData, 'featured'),
    showOnHomepage: checked(formData, 'showOnHomepage'),
    publishedAt: optionalString(formData.get('publishedAt')),
    client: optionalString(formData.get('client')),
    role: optionalString(formData.get('role')),
    team: optionalString(formData.get('team')),
    duration: optionalString(formData.get('duration')),
    year: optionalString(formData.get('year')),
    liveUrl: optionalString(formData.get('liveUrl')),
    githubUrl: optionalString(formData.get('githubUrl')),
    coverImageUrl: optionalString(formData.get('coverImageUrl')),
    thumbnailUrl: optionalString(formData.get('thumbnailUrl')),
    galleryImages: optionalString(formData.get('galleryImages')),
    demoVideoUrl: optionalString(formData.get('demoVideoUrl')),
    caseStudyEnabled: checked(formData, 'caseStudyEnabled'),
    caseStudyOverview: optionalString(formData.get('caseStudyOverview')),
    caseStudyProblem: optionalString(formData.get('caseStudyProblem')),
    caseStudyGoals: optionalString(formData.get('caseStudyGoals')),
    caseStudyResearch: optionalString(formData.get('caseStudyResearch')),
    caseStudyProcess: optionalString(formData.get('caseStudyProcess')),
    caseStudyDesign: optionalString(formData.get('caseStudyDesign')),
    caseStudyDevelopment: optionalString(formData.get('caseStudyDevelopment')),
    caseStudyChallenges: optionalString(formData.get('caseStudyChallenges')),
    caseStudySolution: optionalString(formData.get('caseStudySolution')),
    caseStudyResults: optionalString(formData.get('caseStudyResults')),
    caseStudyLearnings: optionalString(formData.get('caseStudyLearnings')),
    seoTitle: optionalString(formData.get('seoTitle')),
    seoDescription: optionalString(formData.get('seoDescription')),
    seoKeywords: formData.get('seoKeywords'),
    ogImage: optionalString(formData.get('ogImage')),
    orderIndex: formData.get('orderIndex') ?? 0,
  };
}

function selectedIds(formData: FormData) {
  return formData.getAll('ids').map(String).filter(Boolean);
}

function revalidateProjects() {
  revalidatePath('/dashboard/projects');
  revalidatePath('/projects');
  revalidatePath('/');
}

export async function createProjectAction(formData: FormData) {
  await requireProjectAdmin();
  const payload = projectMutationSchema.parse(projectPayload(formData));
  const project = await createProjectRecord(payload);
  revalidateProjects();
  redirect(`/dashboard/projects/${project.id}/success`);
}

export async function updateProjectAction(formData: FormData) {
  await requireProjectAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) throw new Error('Missing project id');
  const payload = projectMutationSchema.parse(projectPayload(formData));
  await updateProjectRecord(id, payload);
  revalidateProjects();
  redirect('/dashboard/projects?saved=updated');
}

export async function duplicateProjectAction(formData: FormData) {
  await requireProjectAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) throw new Error('Missing project id');
  await duplicateProjectRecord(id);
  revalidateProjects();
}

export async function deleteProjectAction(formData: FormData) {
  await requireProjectAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) throw new Error('Missing project id');
  await deleteProjectRecord(id);
  revalidateProjects();
}

export async function quickProjectAction(formData: FormData) {
  await requireProjectAdmin();
  const id = String(formData.get('id') ?? '');
  const action = String(formData.get('action') ?? '');
  if (!id) throw new Error('Missing project id');
  const parsed = projectBulkMutationSchema.parse({ ids: [id], action });
  await bulkUpdateProjects(parsed.ids, parsed.action);
  revalidateProjects();
}

export async function bulkProjectAction(formData: FormData) {
  await requireProjectAdmin();
  const parsed = projectBulkMutationSchema.parse({
    ids: selectedIds(formData),
    action: formData.get('action'),
  });
  await bulkUpdateProjects(parsed.ids, parsed.action);
  revalidateProjects();
}

export async function createProjectTaxonomyAction(formData: FormData) {
  await requireProjectAdmin();
  const payload = projectTaxonomyMutationSchema.parse({
    type: formData.get('type'),
    name: formData.get('name'),
    slug: optionalString(formData.get('slug')),
    description: optionalString(formData.get('description')),
  });
  await createProjectTaxonomy(payload);
  revalidateProjects();
}

export async function updateProjectTaxonomyAction(formData: FormData) {
  await requireProjectAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) throw new Error('Missing taxonomy id');
  const payload = projectTaxonomyMutationSchema.parse({
    type: formData.get('type'),
    name: formData.get('name'),
    slug: optionalString(formData.get('slug')),
    description: optionalString(formData.get('description')),
  });
  await updateProjectTaxonomy(id, payload);
  revalidateProjects();
}

export async function deleteProjectTaxonomyAction(formData: FormData) {
  await requireProjectAdmin();
  const id = String(formData.get('id') ?? '');
  if (!id) throw new Error('Missing taxonomy id');
  await deleteProjectTaxonomy(id);
  revalidateProjects();
}
