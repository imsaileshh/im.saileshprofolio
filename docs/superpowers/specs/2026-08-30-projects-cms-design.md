# Projects CMS Design

**Goal:** Upgrade `Dashboard -> Projects` from a placeholder into a real, schema-backed project and case-study management interface without redesigning the dashboard shell.

**Scope:** Reuse the existing `Project` and `ProjectImage` models, public project pages, admin session auth, Prisma, Zod validation, server-rendered dashboard pages, and current dark dashboard styling. Add only the CMS fields required for project metadata, case studies, SEO, media references, and taxonomy management.

**Data Model:** Keep existing `published`, `archived`, and `featured` booleans for public compatibility. Add nullable/defaulted project fields for project type, client/team/duration, tags, thumbnail/cover/gallery/demo media metadata, case-study sections, homepage visibility, publication date, and SEO. Add `ProjectTaxonomy` for editable categories, technologies, and tags.

**Behavior:** The dashboard Projects page loads real database records with working search, filters, sorting, statistics, pagination, bulk actions, duplicate, archive, delete, publish/unpublish, featured toggles, and taxonomy management. Create/edit/case-study flows use dashboard forms and server actions backed by server-side validation.

**Security:** The protected dashboard layout already gates admin pages. API mutations and server actions must also validate admin sessions and validate all incoming fields before database writes.

**Testing:** Add contract tests for schema and validation/service behavior before production edits, then run targeted tests, Prisma generation, TypeScript checks/build, and the production build.
