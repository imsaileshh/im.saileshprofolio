import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

test('dashboard APIs do not return fake or randomized analytics values', () => {
  const dashboardRoute = read('../../src/app/api/dashboard/route.ts');
  const overviewPage = read('../../src/app/dashboard/(protected)/page.tsx');

  assert.doesNotMatch(dashboardRoute, /Math\.random/);
  assert.doesNotMatch(dashboardRoute, /Mock live visitors/i);
  assert.doesNotMatch(overviewPage, /Fake change/i);
  assert.doesNotMatch(overviewPage, /Coming Soon/i);
  assert.doesNotMatch(overviewPage, /\+0%/);
});

test('public ingestion APIs persist validated data instead of placeholder ok responses', () => {
  const analyticsRoute = read('../../src/app/api/analytics/route.ts');
  const contactRoute = read('../../src/app/api/contact/route.ts');
  const validationSchemas = read('../../src/lib/validation/schemas.ts');

  assert.doesNotMatch(analyticsRoute, /endpoint: 'analytics'/);
  assert.doesNotMatch(contactRoute, /endpoint: 'contact'/);
  assert.match(analyticsRoute, /allowedAnalyticsEventTypes/);
  assert.match(contactRoute, /contactMessageSchema/);
  assert.match(validationSchemas, /page_view/);
  assert.match(validationSchemas, /contact_submit/);
});

test('Prisma schema has session-based analytics storage and indexed dashboard records', () => {
  const schema = read('../../prisma/schema.prisma');

  assert.match(schema, /model VisitorSession/);
  assert.match(schema, /visitorSessions\s+VisitorSession\[\]/);
  assert.match(schema, /sessionId\s+String\?/);
  assert.match(schema, /@@index\(\[eventType, timestamp\]\)/);
  assert.match(schema, /@@index\(\[lastSeenAt\]\)/);
  assert.match(schema, /enum ContactMessageStatus/);
  assert.match(schema, /model ActivityLog/);
});
