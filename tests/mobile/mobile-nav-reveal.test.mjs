import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const mobileNavSource = readFileSync(
  new URL('../../src/components/navigation/MobileBottomNav.tsx', import.meta.url),
  'utf8',
);

const sectionRevealSource = readFileSync(
  new URL('../../src/components/ui/SectionReveal.tsx', import.meta.url),
  'utf8',
);

test('mobile route navigation uses Next links for tappable routes', () => {
  assert.match(mobileNavSource, /import Link from 'next\/link';/);
  assert.match(mobileNavSource, /<Link[\s\S]*href=\{item\.href\}/);
  assert.doesNotMatch(mobileNavSource, /router\.push/);
});

test('mobile nav icons expose hover and focus label text', () => {
  assert.match(mobileNavSource, /data-mobile-nav-label/);
  assert.match(mobileNavSource, /group-hover:opacity-100/);
  assert.match(mobileNavSource, /group-focus-visible:opacity-100/);
  assert.match(mobileNavSource, /\{item\.ariaLabel\}/);
});

test('mobile nav shows icons only until hover or focus reveals tooltip text', () => {
  assert.doesNotMatch(mobileNavSource, /<motion\.span[\s\S]*\{item\.label\}[\s\S]*<\/motion\.span>/);
  assert.match(mobileNavSource, /<span[\s\S]*data-mobile-nav-label[\s\S]*\{item\.ariaLabel\}[\s\S]*<\/span>/);
});

test('reveal animations are not bound to the desktop scroll container on mobile routes', () => {
  assert.doesNotMatch(sectionRevealSource, /document\.getElementById\('scroll-container'\)/);
});
