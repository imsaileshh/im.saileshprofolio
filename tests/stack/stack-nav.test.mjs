import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const stackNavSource = readFileSync(
  new URL('../../src/components/stack/StackNav.tsx', import.meta.url),
  'utf8',
);

test('stack nav category buttons give feedback even when already active', () => {
  assert.match(stackNavSource, /setActiveId\(id\)/);
  assert.match(stackNavSource, /hover:bg-accent/);
  assert.match(stackNavSource, /active:scale-\[0\.97\]/);
});

test('stack nav category buttons expose selected state accessibly', () => {
  assert.match(stackNavSource, /aria-current=\{isActive \? 'true' : undefined\}/);
  assert.match(stackNavSource, /type="button"/);
});

test('stack nav animates category scrolling and active position', () => {
  assert.match(stackNavSource, /useReducedMotion/);
  assert.match(stackNavSource, /layoutId="stack-active-category"/);
  assert.match(stackNavSource, /scrollIntoView\(\{ behavior: prefersReducedMotion \? 'auto' : 'smooth'/);
  assert.match(stackNavSource, /scrollContainerRef/);
  assert.match(stackNavSource, /buttonRefs/);
  assert.match(stackNavSource, /scrollTo\(\{/);
});
