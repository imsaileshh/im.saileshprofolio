import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('public project surfaces read only published database projects', () => {
  const homePage = read('../../src/app/page.tsx');
  const projectsPage = read('../../src/app/projects/page.tsx');

  assert.match(homePage, /published:\s*true/);
  assert.match(homePage, /archived:\s*false/);
  assert.match(projectsPage, /published:\s*true/);
  assert.match(projectsPage, /archived:\s*false/);
  assert.doesNotMatch(projectsPage, /Categories for the filter/);
  assert.doesNotMatch(projectsPage, /\['All', 'Web', 'Mobile', 'Tools', 'AI', 'Experiments'\]/);
});

test('public experience surface reads visible records from Prisma', () => {
  const experiencePage = read('../../src/app/experience/page.tsx');
  const homePreview = read('../../src/components/home/ExperienceEducationPreview.tsx');

  assert.match(experiencePage, /prisma\.experience\.findMany/);
  assert.match(experiencePage, /visible:\s*true/);
  assert.doesNotMatch(experiencePage, /@\/data\/experience/);
  assert.doesNotMatch(homePreview, /@\/data\/experience/);
  assert.match(homePreview, /No data available/);
});
