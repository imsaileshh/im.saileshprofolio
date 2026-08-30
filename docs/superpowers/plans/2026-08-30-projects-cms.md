# Projects CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional schema-backed Projects CMS inside the existing dashboard Projects page.

**Architecture:** Extend the existing Prisma `Project` model with nullable/defaulted CMS fields and add one taxonomy table. Keep the dashboard page server-rendered, use focused dashboard project helpers for query/filter/stat data, and use server actions for admin mutations.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Prisma, PostgreSQL, Zod, lucide-react, existing Tailwind dashboard classes.

**Spec:** `docs/superpowers/specs/2026-08-30-projects-cms-design.md`

## Global Constraints

- Do not redesign the dashboard shell, sidebar, navigation, or global theme.
- Reuse existing Project data, Prisma, API routes, auth, and dashboard page patterns.
- Do not create fake or mock project data.
- All filters, stats, CRUD, duplicate, archive, publish, featured, bulk, category, tag, and technology operations must use real database data.
- Admin mutations must check authorization and server-side validation.
- Public project pages must continue to read published, non-archived projects.

---

### Task 1: Schema And Validation Contracts

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260830090000_projects_cms/migration.sql`
- Modify: `src/lib/validation/schemas.ts`
- Test: `tests/dashboard/projects-cms-contract.test.mjs`

**Interfaces:**
- Produces: `projectListQuerySchema`, `projectMutationSchema`, `projectBulkMutationSchema`, `projectTaxonomyMutationSchema`.
- Produces: schema fields consumed by Prisma Client after `npm run db:generate`.

- [x] Write failing tests that assert the Project model has CMS fields, taxonomy exists, and validation exports exist.
- [ ] Add Prisma model fields with defaults that preserve existing records.
- [ ] Add migration SQL for the new fields and `ProjectTaxonomy`.
- [ ] Add Zod schemas for list queries, project mutations, bulk actions, and taxonomy mutations.
- [ ] Run the contract test and confirm it passes.

### Task 2: Project Data And Mutation Layer

**Files:**
- Create: `src/lib/dashboard/projects.ts`
- Modify: `src/lib/dashboard/data.ts`
- Test: `tests/dashboard/projects-cms-contract.test.mjs`

**Interfaces:**
- Consumes: schemas from `src/lib/validation/schemas.ts`.
- Produces: `getDashboardProjects(query)`, `createProjectRecord(data)`, `updateProjectRecord(id, data)`, `duplicateProjectRecord(id)`, `bulkUpdateProjects(ids, action)`, `deleteProjectRecord(id)`, `createProjectTaxonomy(data)`, `updateProjectTaxonomy(id, data)`, `deleteProjectTaxonomy(id)`.

- [ ] Write failing tests for helper names and real Prisma query usage.
- [ ] Implement query building for search, quick filters, category, technology, status, year, sort, pagination, stats, and taxonomy options.
- [ ] Implement validated mutation helpers including unique slug generation and duplicate-to-draft behavior.
- [ ] Run the contract test and confirm it passes.

### Task 3: Admin API And Actions

**Files:**
- Modify: `src/app/api/projects/route.ts`
- Modify: `src/app/api/projects/[id]/route.ts`
- Create: `src/app/dashboard/(protected)/projects/actions.ts`
- Test: `tests/dashboard/projects-cms-contract.test.mjs`

**Interfaces:**
- Consumes: dashboard project helpers.
- Produces: API handlers and server actions that revalidate `/dashboard/projects` and public project routes.

- [ ] Write failing tests for `requireAdmin`, validation schemas, duplicate, and bulk action wiring.
- [ ] Update API route handlers to use `requireAdmin` for mutations and validation for all write payloads.
- [ ] Add server actions for create, update, duplicate, delete, archive, publish, featured, bulk actions, and taxonomy management.
- [ ] Run the contract test and confirm it passes.

### Task 4: Projects Dashboard UI

**Files:**
- Modify: `src/app/dashboard/(protected)/projects/page.tsx`
- Create: `src/components/dashboard/projects/ProjectDialogState.tsx`
- Create: `src/components/dashboard/projects/ProjectForm.tsx`
- Create: `src/components/dashboard/projects/ProjectRows.tsx`
- Create: `src/components/dashboard/projects/TaxonomyManager.tsx`
- Test: `tests/dashboard/projects-cms-contract.test.mjs`

**Interfaces:**
- Consumes: `getDashboardProjects`, server actions, taxonomy options, and Prisma project rows.
- Produces: complete Projects CMS with stats, filters, responsive rows/cards, forms, case-study editor sections, taxonomy management, loading/error/empty states, and confirmation-backed destructive actions.

- [ ] Write failing tests for visible page copy and required controls/actions.
- [ ] Implement page header, stats, filters, pagination, table/card display, bulk toolbar, and empty state.
- [ ] Implement create/edit/case-study dialogs using server actions and client-side required fields/URL inputs.
- [ ] Implement taxonomy manager forms.
- [ ] Run the contract test and confirm it passes.

### Task 5: Verification

**Files:**
- No new production files.

**Interfaces:**
- Consumes: all prior tasks.
- Produces: verification evidence.

- [ ] Run `npm test -- tests/dashboard/projects-cms-contract.test.mjs`.
- [ ] Run `npm run db:generate`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run `npm run build`.
- [ ] Report exact verification outcomes and any residual gaps.
