import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(path, import.meta.url));

test('requested dashboard API routes exist and require admin authorization', () => {
  const routes = [
    '../../src/app/api/dashboard/messages/route.ts',
    '../../src/app/api/dashboard/messages/[id]/route.ts',
    '../../src/app/api/dashboard/visitors/route.ts',
    '../../src/app/api/dashboard/visitors/[id]/route.ts',
    '../../src/app/api/dashboard/live/route.ts',
    '../../src/app/api/dashboard/analytics/route.ts',
    '../../src/app/api/dashboard/analytics/visitors/route.ts',
    '../../src/app/api/dashboard/analytics/pages/route.ts',
    '../../src/app/api/dashboard/analytics/devices/route.ts',
    '../../src/app/api/dashboard/analytics/referrers/route.ts',
    '../../src/app/api/dashboard/analytics/conversions/route.ts',
    '../../src/app/api/dashboard/analytics/scroll-depth/route.ts',
    '../../src/app/api/dashboard/journeys/route.ts',
  ];

  for (const route of routes) {
    assert.ok(exists(route), `${route} should exist`);
    const source = read(route);
    assert.match(source, /requireAdmin/);
    assert.doesNotMatch(source, /Math\.random|mock|fake|endpoint: '.*'/i);
  }
});

test('public heartbeat endpoint validates and updates real analytics sessions', () => {
  const route = read('../../src/app/api/analytics/heartbeat/route.ts');

  assert.match(route, /heartbeatSchema/);
  assert.match(route, /recordAnalyticsEvent/);
  assert.doesNotMatch(route, /Math\.random|mock|fake/i);
});

test('dashboard pages render real database data and empty states', () => {
  const pages = [
    '../../src/app/dashboard/(protected)/messages/page.tsx',
    '../../src/app/dashboard/(protected)/messages/[id]/page.tsx',
    '../../src/app/dashboard/(protected)/visitors/page.tsx',
    '../../src/app/dashboard/(protected)/visitors/[id]/page.tsx',
    '../../src/app/dashboard/(protected)/live/page.tsx',
    '../../src/app/dashboard/(protected)/analytics/page.tsx',
    '../../src/app/dashboard/(protected)/journeys/page.tsx',
  ];

  for (const page of pages) {
    assert.ok(exists(page), `${page} should exist`);
    const source = read(page);
    assert.match(source, /prisma\.|getDashboard|getMessageDetail|getVisitorDetail|getLiveVisitors|getJourneys/);
    assert.match(source, /No .*available|No active visitors right now|No contact messages yet|notFound/);
    assert.doesNotMatch(source, /Math\.random|Coming Soon|mock|fake|\+0%/i);
  }
});

test('messages page exposes real status and priority actions', () => {
  const page = read('../../src/app/dashboard/(protected)/messages/page.tsx');
  const detail = read('../../src/app/dashboard/(protected)/messages/[id]/page.tsx');
  const route = read('../../src/app/api/dashboard/messages/[id]/route.ts');

  for (const source of [page, detail, route]) {
    assert.match(source, /New|Read|Replied|Archived/);
    assert.match(source, /Low|Normal|High|Urgent/);
  }

  assert.match(page, /Bulk select/i);
  assert.match(detail, /Previous|Next/);
});
