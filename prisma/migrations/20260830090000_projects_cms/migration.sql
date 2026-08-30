ALTER TABLE "Project"
  ADD COLUMN "projectType" TEXT NOT NULL DEFAULT 'Personal Project',
  ADD COLUMN "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "showOnHomepage" BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN "publishedAt" TIMESTAMP(3),
  ADD COLUMN "client" TEXT,
  ADD COLUMN "team" TEXT,
  ADD COLUMN "duration" TEXT,
  ADD COLUMN "coverImageUrl" TEXT,
  ADD COLUMN "thumbnailUrl" TEXT,
  ADD COLUMN "galleryImages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "demoVideoUrl" TEXT,
  ADD COLUMN "caseStudyEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "caseStudyOverview" TEXT,
  ADD COLUMN "caseStudyProblem" TEXT,
  ADD COLUMN "caseStudyGoals" TEXT,
  ADD COLUMN "caseStudyResearch" TEXT,
  ADD COLUMN "caseStudyProcess" TEXT,
  ADD COLUMN "caseStudyDesign" TEXT,
  ADD COLUMN "caseStudyDevelopment" TEXT,
  ADD COLUMN "caseStudyChallenges" TEXT,
  ADD COLUMN "caseStudySolution" TEXT,
  ADD COLUMN "caseStudyResults" TEXT,
  ADD COLUMN "caseStudyLearnings" TEXT,
  ADD COLUMN "seoTitle" TEXT,
  ADD COLUMN "seoDescription" TEXT,
  ADD COLUMN "seoKeywords" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "ogImage" TEXT;

UPDATE "Project"
SET "publishedAt" = "createdAt"
WHERE "published" = true AND "publishedAt" IS NULL;

CREATE TABLE "ProjectTaxonomy" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProjectTaxonomy_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProjectTaxonomy_type_slug_key" ON "ProjectTaxonomy"("type", "slug");
CREATE INDEX "ProjectTaxonomy_type_name_idx" ON "ProjectTaxonomy"("type", "name");
CREATE INDEX "Project_projectType_category_idx" ON "Project"("projectType", "category");
CREATE INDEX "Project_caseStudyEnabled_idx" ON "Project"("caseStudyEnabled");
