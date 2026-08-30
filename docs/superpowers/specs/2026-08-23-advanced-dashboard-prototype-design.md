# Advanced Dashboard Prototype Design

## Goal

Build a high-fidelity, frontend-only private dashboard prototype for the portfolio admin area. The result should feel production-ready visually and interaction-wise while every metric, visitor, message, chart, notification, report, and activity record comes from local mock data.

## Source

Source PDF: `C:\Users\user\Downloads\Advanced_Portfolio_Dashboard_Mockup_Features.pdf`

## Scope

The prototype covers these dashboard areas:

- Overview: KPI cards, trend comparisons, simulated live sessions, goal trackers, insight cards, quick actions, and recent activity.
- Analytics: date controls, comparison mode, time-series charts, conversion funnel, scroll funnel, engagement score, anomaly alert, and drill-down details.
- Visitor Explorer: fictional anonymous visitor profiles, device/source summaries, session journeys, path comparison, drop-off analysis, attribution, segment filters, and privacy labels.
- Content operations: projects, skills, experience, education, resume, draft/published/archive states, visibility controls, featured markers, reorder controls, content health, and preview-only actions.
- Messages and notifications: mock inbox, status tabs, priorities, search/filtering, message details, demo replies, unread center, bulk actions, and preference preview.
- Reports and productivity: saved views, report builder preview, export UI, scheduled report configuration, command palette, and global search over mock dashboard entities.
- Mobile dashboard: responsive layout, stacked metrics, horizontally scrollable chart areas, bottom dashboard navigation, large touch targets, and accessible drawers.

## Out Of Scope

- No real analytics collection.
- No live visitor tracking.
- No production authentication changes.
- No new API endpoints.
- No email, push, or notification delivery.
- No personally identifiable visitor data.
- No database schema changes.

The existing `/dashboard` auth wrapper remains in place. Pages inside the authenticated shell may use local static mock data and local component state.

## Architecture

Create one local TypeScript mock dataset module under `src/data/dashboard.ts`. Dashboard route files consume that dataset directly and render frontend-only UI. Shared visual primitives live under `src/components/dashboard/advanced/` so pages stay focused and the current dashboard components are not overloaded.

The prototype uses existing dependencies only: Next.js App Router, React, Tailwind CSS, lucide-react, and framer-motion. Charts are implemented with accessible HTML/CSS/SVG primitives rather than adding a charting dependency.

## Visual Direction

The dashboard should be darker and denser than the public portfolio, matching the existing dashboard shell. Use a restrained operational interface with clear hierarchy:

- Background: zinc/black dashboard shell.
- Surfaces: dark cards with subtle white borders.
- Accent: existing blue `#4F8CFF`, plus teal/emerald for positive conversion signals.
- Radius: 8px to 12px for dashboard cards and controls.
- Cards are for individual metrics, panels, list rows, drawers, and repeated entities. Avoid nested cards.

## Data Model

Mock datasets must include:

- Overview metrics: visitors, pageViews, downloads, messages, liveNow, conversionRate.
- Analytics series: date, visitors, views, downloads, contacts.
- Visitor sessions: id, device, source, pages, duration, journey, completionScore, status.
- Projects: id, title, status, featured, views, interactions, liveClicks, repositoryClicks, health.
- Messages: id, senderName, emailPlaceholder, subject, status, priority, body, createdAtLabel, tags.
- Notifications: id, type, title, read, createdAtLabel.
- Activity: id, action, entity, userLabel, timestampLabel.
- Reports: id, name, cadence, widgets, status.
- Search records: type, title, detail, href.

Every user-facing dataset value is fictional and must be labelled as demo or mock data in the UI.

## Interactions

- Buttons may update local state only.
- Filters and tabs filter local arrays in memory.
- Drawers show local details for selected chart points, visitors, messages, notifications, and projects.
- Export buttons show preview-only state or local download placeholders; they do not call APIs.
- Saved views and command palette operate in local component state or `localStorage`.
- All interactive controls need visible focus states.
- Reduced-motion users receive non-animated state changes where practical.

## Responsive Requirements

- Desktop keeps the dashboard sidebar.
- Tablet and mobile support compact responsive layouts inside the existing dashboard shell.
- KPI cards stack on mobile.
- Tables become card lists or horizontally scrollable panels.
- Chart panels preserve readable labels and do not overflow the viewport.
- Dashboard bottom navigation is available on mobile for Overview, Analytics, Content, Messages, and Settings.

## Testing Strategy

Use lightweight Node source tests, matching the existing tests in this repo, for:

- Mock dataset completeness and demo labelling.
- Shared advanced dashboard component exports.
- Route files rendering the expected advanced dashboard components.
- Local-only implementation: no new analytics endpoints or production service calls.

Use `npx tsc --noEmit` and `npm run build` for full verification.

## Acceptance Criteria

- `/dashboard` no longer shows placeholder chart/message panels.
- `/dashboard/analytics`, `/dashboard/visitors`, `/dashboard/projects`, `/dashboard/skills`, `/dashboard/experience`, `/dashboard/education`, `/dashboard/resume`, `/dashboard/messages`, `/dashboard/notifications`, `/dashboard/settings`, and `/dashboard/reports` render polished mock-data UI.
- A persistent `DEMO / MOCK DATA` label is visible in the dashboard shell and/or page headers.
- All major numbers and records come from `src/data/dashboard.ts`.
- No real visitor records, analytics endpoints, email delivery, notification services, or database schema changes are introduced for the prototype.
