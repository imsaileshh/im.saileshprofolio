import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const dashboardLayoutUrl = new URL('../../src/app/dashboard/layout.tsx', import.meta.url);
const protectedLayoutUrl = new URL('../../src/app/dashboard/(protected)/layout.tsx', import.meta.url);
const loginPageUrl = new URL('../../src/app/dashboard/login/page.tsx', import.meta.url);

test('dashboard login route is outside the protected redirecting layout', () => {
  assert.ok(existsSync(loginPageUrl), 'login page should remain at /dashboard/login');
  assert.ok(existsSync(protectedLayoutUrl), 'protected dashboard layout should exist in a route group');

  const dashboardLayout = readFileSync(dashboardLayoutUrl, 'utf8');
  const protectedLayout = readFileSync(protectedLayoutUrl, 'utf8');

  assert.doesNotMatch(dashboardLayout, /redirect\('\/dashboard\/login'\)/);
  assert.match(protectedLayout, /redirect\('\/dashboard\/login'\)/);
  assert.match(protectedLayout, /verifySession/);
});
