# Advanced Dashboard Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the frontend-only advanced portfolio dashboard prototype described in the PDF using local mock data.

**Architecture:** Add a local dashboard dataset, shared advanced dashboard UI primitives, and route-level dashboard screens that consume local data only. Keep the existing authenticated `/dashboard` shell, but upgrade its visuals and responsive behavior with a persistent demo-data label.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, lucide-react, framer-motion, Node test runner.

**Spec:** `docs/superpowers/specs/2026-08-23-advanced-dashboard-prototype-design.md`

## Global Constraints

- Use local mock data only.
- Do not add real analytics collection, visitor tracking, email delivery, push delivery, new API endpoints, or database schema changes.
- Keep the existing `/dashboard` authentication wrapper.
- Add visible `DEMO / MOCK DATA` labelling to dashboard UI.
- Use existing dependencies only; do not add a charting library.
- Use accessible controls with visible focus states.
- Preserve responsive mobile behavior.
- Run focused Node tests, `npx tsc --noEmit`, and `npm run build`.

---

## File Structure

- Create `src/data/dashboard.ts`: all mock metrics, charts, visitors, projects, content operations, messages, notifications, reports, and search records.
- Create `src/components/dashboard/advanced/DemoBadge.tsx`: persistent demo label.
- Create `src/components/dashboard/advanced/DashboardShellHeader.tsx`: page title, description, actions, demo badge.
- Create `src/components/dashboard/advanced/KpiCard.tsx`: KPI cards with icon, value, trend, and goal progress support.
- Create `src/components/dashboard/advanced/ChartPanels.tsx`: CSS/SVG charts for time series, bars, funnels, and engagement cards.
- Create `src/components/dashboard/advanced/DataPanels.tsx`: activity feed, quick actions, insight cards, visitor journey, content health, report preview, notification/message rows.
- Create `src/components/dashboard/advanced/InteractivePanels.tsx`: client components for tabs, filters, drawers, command palette, saved views, and local-state actions.
- Modify `src/components/dashboard/Sidebar.tsx`: add Analytics, Visitors, Notifications, Reports, and keep Content routes visible; add demo label.
- Modify `src/components/dashboard/DashboardMobileNav.tsx`: implement mobile dashboard bottom navigation.
- Modify `src/app/dashboard/layout.tsx`: responsive shell, demo badge area, mobile nav.
- Modify `src/app/dashboard/page.tsx`: advanced overview screen.
- Modify dashboard route files under `src/app/dashboard/*/page.tsx`: render mock-data screens.
- Add `src/app/dashboard/reports/page.tsx`: report builder and saved views.
- Add tests under `tests/dashboard/`.

---

### Task 1: Mock Dataset

**Files:**
- Create: `src/data/dashboard.ts`
- Test: `tests/dashboard/dashboard-data.test.mjs`

**Interfaces:**
- Produces: `dashboardOverview`, `analyticsSeries`, `visitorSessions`, `projectPerformance`, `contentOperations`, `messageInbox`, `dashboardNotifications`, `activityFeed`, `reports`, `globalSearchRecords`.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = readFileSync(new URL('../../src/data/dashboard.ts', import.meta.url), 'utf8');

test('dashboard mock data exports every prototype dataset', () => {
  for (const name of [
    'dashboardOverview',
    'analyticsSeries',
    'visitorSessions',
    'projectPerformance',
    'contentOperations',
    'messageInbox',
    'dashboardNotifications',
    'activityFeed',
    'reports',
    'globalSearchRecords',
  ]) {
    assert.match(source, new RegExp(`export const ${name}`));
  }
});

test('dashboard data is visibly labelled as demo data', () => {
  assert.match(source, /DEMO DATA/);
  assert.match(source, /MOCK DATA/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-data.test.mjs`

Expected: FAIL because `src/data/dashboard.ts` does not exist.

- [ ] **Step 3: Implement mock data**

Create `src/data/dashboard.ts` with typed exports:

```ts
export type TrendDirection = 'up' | 'down' | 'flat';

export const demoLabels = {
  primary: 'DEMO / MOCK DATA',
  privacy: 'DEMO DATA - fictional anonymous sessions only',
};

export const dashboardOverview = {
  visitors: 2481,
  pageViews: 8921,
  downloads: 137,
  messages: 24,
  liveNow: 3,
  conversionRate: '5.52%',
  goals: [
    { label: 'CV goal', value: 137, target: 200 },
    { label: 'Contact goal', value: 24, target: 40 },
  ],
  insights: [
    { label: 'Top project', value: 'Cyberloop', detail: 'Highest mock engagement' },
    { label: 'Top page', value: '/projects', detail: 'Strongest route traffic' },
    { label: 'Strongest referrer', value: 'LinkedIn', detail: 'Demo attribution leader' },
    { label: 'Best conversion path', value: 'Home > Projects > CV', detail: '5.52% conversion demo' },
  ],
};
```

Add the remaining arrays with at least 8 analytics points, 6 visitors, 4 projects, 6 messages, 6 notifications, 8 activity records, 3 reports, and 8 search records.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-data.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/dashboard.ts tests/dashboard/dashboard-data.test.mjs
git commit -m "feat: add dashboard mock data"
```

---

### Task 2: Shared Advanced Dashboard Components

**Files:**
- Create: `src/components/dashboard/advanced/DemoBadge.tsx`
- Create: `src/components/dashboard/advanced/DashboardShellHeader.tsx`
- Create: `src/components/dashboard/advanced/KpiCard.tsx`
- Create: `src/components/dashboard/advanced/ChartPanels.tsx`
- Create: `src/components/dashboard/advanced/DataPanels.tsx`
- Create: `src/components/dashboard/advanced/InteractivePanels.tsx`
- Test: `tests/dashboard/dashboard-components.test.mjs`

**Interfaces:**
- Consumes: datasets from `src/data/dashboard.ts`.
- Produces: `DemoBadge`, `DashboardShellHeader`, `KpiCard`, `TimeSeriesChart`, `FunnelChart`, `GoalTracker`, `ActivityFeed`, `InsightGrid`, `QuickActions`, `VisitorJourneyPanel`, `ContentHealthList`, `MessageInboxPanel`, `NotificationCenterPanel`, `CommandPalette`.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const files = [
  'DemoBadge.tsx',
  'DashboardShellHeader.tsx',
  'KpiCard.tsx',
  'ChartPanels.tsx',
  'DataPanels.tsx',
  'InteractivePanels.tsx',
];

test('advanced dashboard component files exist and export expected UI', () => {
  for (const file of files) {
    const url = new URL(`../../src/components/dashboard/advanced/${file}`, import.meta.url);
    assert.ok(existsSync(url), `${file} should exist`);
  }
  const badge = readFileSync(new URL('../../src/components/dashboard/advanced/DemoBadge.tsx', import.meta.url), 'utf8');
  assert.match(badge, /DEMO \/ MOCK DATA/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-components.test.mjs`

Expected: FAIL because component files do not exist.

- [ ] **Step 3: Implement shared components**

Create small focused components with these exported signatures:

```ts
export function DemoBadge({ compact = false }: { compact?: boolean }): JSX.Element
export function DashboardShellHeader(props: { title: string; description: string; actions?: React.ReactNode }): JSX.Element
export function KpiCard(props: { label: string; value: string | number; trend: string; icon: React.ElementType; tone?: 'blue' | 'green' | 'amber' | 'red' }): JSX.Element
export function TimeSeriesChart(props: { title: string; data: Array<{ date: string; visitors: number; views: number; downloads: number; contacts: number }> }): JSX.Element
export function FunnelChart(props: { title: string; steps: Array<{ label: string; value: number }> }): JSX.Element
export function GoalTracker(props: { goals: Array<{ label: string; value: number; target: number }> }): JSX.Element
```

Use Tailwind classes only. Use SVG for charts. Add `tabIndex={0}` to interactive chart bars/points.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-components.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/advanced tests/dashboard/dashboard-components.test.mjs
git commit -m "feat: add advanced dashboard components"
```

---

### Task 3: Dashboard Shell And Navigation

**Files:**
- Modify: `src/components/dashboard/Sidebar.tsx`
- Modify: `src/components/dashboard/DashboardMobileNav.tsx`
- Modify: `src/app/dashboard/layout.tsx`
- Test: `tests/dashboard/dashboard-shell.test.mjs`

**Interfaces:**
- Consumes: `DemoBadge`.
- Produces: responsive dashboard shell with sidebar and mobile nav.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const sidebar = readFileSync(new URL('../../src/components/dashboard/Sidebar.tsx', import.meta.url), 'utf8');
const mobile = readFileSync(new URL('../../src/components/dashboard/DashboardMobileNav.tsx', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../../src/app/dashboard/layout.tsx', import.meta.url), 'utf8');

test('dashboard shell includes reports navigation and demo labelling', () => {
  assert.match(sidebar, /Reports/);
  assert.match(sidebar, /DemoBadge/);
  assert.match(layout, /DashboardMobileNav/);
  assert.match(mobile, /Overview/);
  assert.match(mobile, /Analytics/);
  assert.match(mobile, /Content/);
  assert.match(mobile, /Messages/);
  assert.match(mobile, /Settings/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-shell.test.mjs`

Expected: FAIL because mobile nav is null and Reports is missing.

- [ ] **Step 3: Implement shell updates**

Add Reports to sidebar navigation with `FileBarChart` icon and href `/dashboard/reports`. Import and render `DemoBadge` near the logo. Implement `DashboardMobileNav` with fixed bottom mobile links for Overview, Analytics, Content, Messages, Settings. In layout, hide sidebar on small screens, add bottom nav, and adjust main padding to avoid overlap.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-shell.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/dashboard/Sidebar.tsx src/components/dashboard/DashboardMobileNav.tsx src/app/dashboard/layout.tsx tests/dashboard/dashboard-shell.test.mjs
git commit -m "feat: upgrade dashboard shell navigation"
```

---

### Task 4: Advanced Overview Page

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Test: `tests/dashboard/dashboard-overview.test.mjs`

**Interfaces:**
- Consumes: `dashboardOverview`, `analyticsSeries`, `activityFeed`, `KpiCard`, `TimeSeriesChart`, `GoalTracker`, `InsightGrid`, `QuickActions`, `ActivityFeed`.
- Produces: advanced overview dashboard.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const source = readFileSync(new URL('../../src/app/dashboard/page.tsx', import.meta.url), 'utf8');

test('dashboard overview renders advanced mock widgets', () => {
  for (const token of ['KpiCard', 'GoalTracker', 'InsightGrid', 'QuickActions', 'ActivityFeed', 'Live Now']) {
    assert.match(source, new RegExp(token));
  }
  assert.doesNotMatch(source, /Coming Soon/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-overview.test.mjs`

Expected: FAIL because Overview still has Coming Soon panels.

- [ ] **Step 3: Implement overview page**

Render:
- Four KPI cards: Visitors 2,481, Page Views 8,921, CV Downloads 137, Messages 24.
- Live Now panel with 3 simulated sessions.
- Goal tracker for CV and Contact goals.
- Insight grid for top project, top page, strongest referrer, best path.
- Quick actions: Add Project, Upload Resume, View Messages, Create Report.
- Recent activity feed.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-overview.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/page.tsx tests/dashboard/dashboard-overview.test.mjs
git commit -m "feat: build advanced dashboard overview"
```

---

### Task 5: Analytics And Visitors

**Files:**
- Modify: `src/app/dashboard/analytics/page.tsx`
- Modify: `src/app/dashboard/visitors/page.tsx`
- Modify: `src/app/dashboard/live/page.tsx`
- Test: `tests/dashboard/dashboard-analytics-visitors.test.mjs`

**Interfaces:**
- Consumes: analytics and visitor datasets plus chart and panel components.
- Produces: analytics, visitor explorer, and live monitor screens.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const analytics = readFileSync(new URL('../../src/app/dashboard/analytics/page.tsx', import.meta.url), 'utf8');
const visitors = readFileSync(new URL('../../src/app/dashboard/visitors/page.tsx', import.meta.url), 'utf8');
const live = readFileSync(new URL('../../src/app/dashboard/live/page.tsx', import.meta.url), 'utf8');

test('analytics and visitor routes render mock intelligence UI', () => {
  for (const token of ['TimeSeriesChart', 'Conversion Funnel', 'Scroll Funnel', 'Anomaly']) assert.match(analytics, new RegExp(token));
  for (const token of ['VisitorJourneyPanel', 'Path Explorer', 'Drop-off', 'Privacy']) assert.match(visitors, new RegExp(token));
  assert.match(live, /Simulated active sessions/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-analytics-visitors.test.mjs`

Expected: FAIL because routes are placeholders.

- [ ] **Step 3: Implement screens**

Analytics page renders date range tabs, comparison toggle, visitors chart, page views chart, conversion funnel, scroll funnel, engagement score, anomaly alert, and drill-down drawer. Visitors page renders segment filters, profile list, journey timeline, path explorer, drop-off analysis, attribution cards, and privacy label. Live page renders simulated active sessions and current pages.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-analytics-visitors.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/analytics/page.tsx src/app/dashboard/visitors/page.tsx src/app/dashboard/live/page.tsx tests/dashboard/dashboard-analytics-visitors.test.mjs
git commit -m "feat: add dashboard analytics and visitor intelligence"
```

---

### Task 6: Content CMS Screens

**Files:**
- Modify: `src/app/dashboard/projects/page.tsx`
- Modify: `src/app/dashboard/skills/page.tsx`
- Modify: `src/app/dashboard/experience/page.tsx`
- Modify: `src/app/dashboard/education/page.tsx`
- Modify: `src/app/dashboard/resume/page.tsx`
- Test: `tests/dashboard/dashboard-content.test.mjs`

**Interfaces:**
- Consumes: `projectPerformance`, `contentOperations`.
- Produces: mock content management screens with states, toggles, reorder UI, and health checks.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const files = ['projects', 'skills', 'experience', 'education', 'resume'];

test('content cms routes expose advanced mock operations', () => {
  for (const route of files) {
    const source = readFileSync(new URL(`../../src/app/dashboard/${route}/page.tsx`, import.meta.url), 'utf8');
    assert.match(source, /DashboardShellHeader/);
    assert.doesNotMatch(source, /<h1>CMS/);
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-content.test.mjs`

Expected: FAIL because routes are placeholders.

- [ ] **Step 3: Implement content routes**

Projects page: draft/published/archive tabs, bulk action toolbar, featured toggles, mock reorder handles, performance scorecards, technology filters, content health checks, and comparison preview. Skills/Experience/Education/Resume pages: structured cards with visibility toggles, featured markers, reorder controls, active resume badge, version history, and demo download history.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-content.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/projects/page.tsx src/app/dashboard/skills/page.tsx src/app/dashboard/experience/page.tsx src/app/dashboard/education/page.tsx src/app/dashboard/resume/page.tsx tests/dashboard/dashboard-content.test.mjs
git commit -m "feat: add dashboard content operations"
```

---

### Task 7: Messages, Notifications, Reports, Settings

**Files:**
- Modify: `src/app/dashboard/messages/page.tsx`
- Modify: `src/app/dashboard/notifications/page.tsx`
- Create: `src/app/dashboard/reports/page.tsx`
- Modify: `src/app/dashboard/settings/page.tsx`
- Test: `tests/dashboard/dashboard-operations.test.mjs`

**Interfaces:**
- Consumes: messages, notifications, reports, search records.
- Produces: inbox, notification center, report builder, command palette, settings preview.

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('operations routes render mock productivity UI', () => {
  const messages = readFileSync(new URL('../../src/app/dashboard/messages/page.tsx', import.meta.url), 'utf8');
  const notifications = readFileSync(new URL('../../src/app/dashboard/notifications/page.tsx', import.meta.url), 'utf8');
  const settings = readFileSync(new URL('../../src/app/dashboard/settings/page.tsx', import.meta.url), 'utf8');
  const reportsUrl = new URL('../../src/app/dashboard/reports/page.tsx', import.meta.url);
  assert.ok(existsSync(reportsUrl), 'reports route should exist');
  const reports = readFileSync(reportsUrl, 'utf8');
  for (const token of ['New', 'Read', 'Replied', 'Archived', 'Priority']) assert.match(messages, new RegExp(token));
  for (const token of ['Bulk actions', 'Preferences']) assert.match(notifications, new RegExp(token));
  for (const token of ['Report builder', 'Scheduled reports', 'Saved views']) assert.match(reports, new RegExp(token));
  assert.match(settings, /Command palette/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests\dashboard\dashboard-operations.test.mjs`

Expected: FAIL because reports route does not exist and operation routes are placeholders.

- [ ] **Step 3: Implement operations routes**

Messages page renders tabs, priority tags, search, status filter, selected message drawer, demo reply buttons, and status history. Notifications page renders unread filters, type filters, bulk action buttons, preferences preview, and alert rows. Reports page renders saved views, report builder widget selector, export buttons, scheduled report cards, and preview-only labels. Settings page renders command palette trigger, global search list, mock security settings, notification preferences, and demo mode warnings.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests\dashboard\dashboard-operations.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/dashboard/messages/page.tsx src/app/dashboard/notifications/page.tsx src/app/dashboard/reports/page.tsx src/app/dashboard/settings/page.tsx tests/dashboard/dashboard-operations.test.mjs
git commit -m "feat: add dashboard operations prototype"
```

---

### Task 8: Full Verification

**Files:**
- Modify only files needed to fix verification failures.

**Interfaces:**
- Consumes: all prior tasks.
- Produces: passing dashboard prototype.

- [ ] **Step 1: Run all focused dashboard tests**

Run:

```bash
node --test tests\dashboard\dashboard-data.test.mjs
node --test tests\dashboard\dashboard-components.test.mjs
node --test tests\dashboard\dashboard-shell.test.mjs
node --test tests\dashboard\dashboard-overview.test.mjs
node --test tests\dashboard\dashboard-analytics-visitors.test.mjs
node --test tests\dashboard\dashboard-content.test.mjs
node --test tests\dashboard\dashboard-operations.test.mjs
```

Expected: PASS for every command.

- [ ] **Step 2: Run existing regression tests**

Run:

```bash
node --test tests\mobile\mobile-nav-reveal.test.mjs
node --test tests\stack\stack-nav.test.mjs
node --test tests\home\experience-education-preview.test.mjs
```

Expected: PASS for every command.

- [ ] **Step 3: Run TypeScript**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 4: Run production build**

Run: `npm run build`

Expected: exit code 0 and all dashboard routes listed, including `/dashboard/reports`.

- [ ] **Step 5: Commit verification fixes**

```bash
git add src tests docs
git commit -m "test: verify advanced dashboard prototype"
```

---

## Self-Review

- Spec coverage: Overview, Analytics, Visitor Explorer, Content CMS, Messages, Notifications, Reports, Mobile/PWA-style shell, mock data model, demo labelling, and final frontend-only scope all map to tasks.
- Placeholder scan: This plan intentionally avoids placeholder tasks. Every task has concrete files, expected exports, test commands, and implementation targets.
- Type consistency: Export names from Task 1 are consumed consistently by later tasks. Shared component names from Task 2 are referenced by route tasks.
