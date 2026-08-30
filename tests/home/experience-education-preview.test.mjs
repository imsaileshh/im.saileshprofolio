import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const previewUrl = new URL('../../src/components/home/ExperienceEducationPreview.tsx', import.meta.url);

const pageSource = readFileSync(
  new URL('../../src/app/page.tsx', import.meta.url),
  'utf8',
);

const previewSource = existsSync(previewUrl) ? readFileSync(previewUrl, 'utf8') : '';

test('homepage renders the animated experience and education preview component', () => {
  assert.ok(existsSync(previewUrl), 'ExperienceEducationPreview component should exist');
  assert.match(pageSource, /ExperienceEducationPreview/);
  assert.doesNotMatch(pageSource, /style=\{\{ animation: 'scaleY/);
});

test('experience education preview uses scroll-linked timeline animation', () => {
  assert.match(previewSource, /useScroll/);
  assert.match(previewSource, /useTransform/);
  assert.match(previewSource, /useReducedMotion/);
  assert.match(previewSource, /data-home-experience-progress/);
});

test('experience education rows stagger in with trending hover treatment', () => {
  assert.match(previewSource, /experienceRowVariants/);
  assert.match(previewSource, /StaggerContainer/);
  assert.match(previewSource, /TRENDING/);
  assert.match(previewSource, /group-hover:shadow-\[0_0_0_6px_rgba\(45,212,191,0\.12\)\]/);
});
