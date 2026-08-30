import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(path, import.meta.url));

test('Project schema supports professional CMS fields and taxonomy management', () => {
  const schema = read('../../prisma/schema.prisma');

  for (const field of [
    'projectType',
    'client',
    'team',
    'duration',
    'tags',
    'thumbnailUrl',
    'coverImageUrl',
    'demoVideoUrl',
    'caseStudyEnabled',
    'caseStudyOverview',
    'caseStudyProblem',
    'caseStudyGoals',
    'caseStudyResearch',
    'caseStudyProcess',
    'caseStudyDesign',
    'caseStudyDevelopment',
    'caseStudyChallenges',
    'caseStudySolution',
    'caseStudyResults',
    'caseStudyLearnings',
    'showOnHomepage',
    'publishedAt',
    'seoTitle',
    'seoDescription',
    'seoKeywords',
    'ogImage',
  ]) {
    assert.match(schema, new RegExp(`\\b${field}\\b`), `${field} should exist on Project`);
  }

  assert.match(schema, /model ProjectTaxonomy/);
  assert.match(schema, /@@unique\(\[type, slug\]\)/);
});

test('Projects CMS validation schemas cover list, mutation, bulk, and taxonomy operations', () => {
  const validation = read('../../src/lib/validation/schemas.ts');

  for (const symbol of [
    'projectStatusSchema',
    'projectTypeSchema',
    'projectListQuerySchema',
    'projectMutationSchema',
    'projectBulkMutationSchema',
    'projectTaxonomyMutationSchema',
  ]) {
    assert.match(validation, new RegExp(`\\b${symbol}\\b`), `${symbol} should be exported`);
  }

  assert.match(validation, /caseStudyProblem/);
  assert.match(validation, /seoKeywords/);
  assert.match(validation, /duplicate/);
});

test('Projects CMS service and actions provide real database-backed operations', () => {
  assert.equal(exists('../../src/lib/dashboard/projects.ts'), true);
  assert.equal(exists('../../src/app/dashboard/(protected)/projects/actions.ts'), true);

  const service = read('../../src/lib/dashboard/projects.ts');
  const actions = read('../../src/app/dashboard/(protected)/projects/actions.ts');
  const apiList = read('../../src/app/api/projects/route.ts');
  const apiItem = read('../../src/app/api/projects/[id]/route.ts');

  for (const symbol of [
    'getDashboardProjects',
    'createProjectRecord',
    'updateProjectRecord',
    'duplicateProjectRecord',
    'bulkUpdateProjects',
    'deleteProjectRecord',
    'createProjectTaxonomy',
    'updateProjectTaxonomy',
    'deleteProjectTaxonomy',
  ]) {
    assert.match(service, new RegExp(`\\b${symbol}\\b`), `${symbol} should be implemented`);
  }

  assert.match(service, /prisma\.project\.findMany/);
  assert.match(service, /prisma\.projectTaxonomy/);
  assert.match(service, /getProjectTaxonomyDelegate/);
  assert.match(service, /getProjectFieldSet/);
  assert.match(service, /pickSupportedProjectData/);
  assert.match(service, /normalizeProjectForDashboard/);
  assert.match(service, /taxonomyDelegate \?/);
  assert.match(service, /generateUniqueProjectSlug/);
  assert.match(actions, /revalidatePath\('\/dashboard\/projects'\)/);
  assert.match(actions, /duplicateProjectRecord/);
  assert.match(actions, /bulkUpdateProjects/);
  assert.match(apiList, /projectMutationSchema/);
  assert.match(apiList, /requireAdmin/);
  assert.match(apiItem, /projectMutationSchema/);
  assert.match(apiItem, /duplicateProjectRecord/);
});

test('Dashboard Projects page exposes the required CMS interface without mock data', () => {
  const page = read('../../src/app/dashboard/(protected)/projects/page.tsx');
  const rows = read('../../src/components/dashboard/projects/ProjectRows.tsx');
  const surface = `${page}\n${rows}`;

  for (const copy of [
    'Manage portfolio projects and case studies.',
    '+ Add Project',
    'Total Projects',
    'Case Studies',
    'Search projects',
    'Client Work',
    'Personal Projects',
    'Open Source',
    'Recently Updated',
    'No projects yet',
    'Create your first portfolio project or case study.',
  ]) {
    assert.match(page, new RegExp(copy.replace(/[+]/g, '\\+')), `${copy} should be rendered`);
  }

  for (const action of [
    'View',
    'Edit',
    'Case Study',
    'Preview',
    'Duplicate',
    'Archive',
    'Delete',
    'Mark Featured',
    'Remove Featured',
  ]) {
    assert.match(surface, new RegExp(action), `${action} action should exist`);
  }

  assert.match(page, /getDashboardProjects/);
  assert.doesNotMatch(page, /const projects = \[/);
  assert.doesNotMatch(page, /mock/i);
});
