DO $$ BEGIN
  CREATE TYPE "ResumeStatus" AS ENUM ('Active', 'Inactive', 'Archived', 'Deleted');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "AnalysisSeverity" AS ENUM ('Low', 'Medium', 'High', 'Critical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "KeywordImportance" AS ENUM ('Required', 'Important', 'Optional');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "name" TEXT;
ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "fileType" TEXT;
ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "originalFilePath" TEXT;
ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "originalText" TEXT;
ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "parsedText" TEXT;
ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "activeVersionId" TEXT;
ALTER TABLE "Resume" ADD COLUMN IF NOT EXISTS "status" "ResumeStatus" NOT NULL DEFAULT 'Active';

CREATE TABLE IF NOT EXISTS "ResumeVersion" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "versionNumber" INTEGER NOT NULL,
  "name" TEXT,
  "changeSummary" TEXT,
  "filePath" TEXT,
  "fileName" TEXT,
  "fileType" TEXT,
  "contentText" TEXT NOT NULL,
  "structuredData" JSONB,
  "atsScore" INTEGER,
  "isActive" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeVersion_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeVersion_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeSection" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "sectionType" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeSection_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeSection_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeSkill" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "category" TEXT,
  "proficiency" INTEGER,
  "years" DECIMAL(4,1),
  "source" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeSkill_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeSkill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeExperience" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "company" TEXT,
  "location" TEXT,
  "startDate" TEXT,
  "endDate" TEXT,
  "current" BOOLEAN NOT NULL DEFAULT false,
  "description" TEXT[],
  "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeExperience_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeExperience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeProject" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "url" TEXT,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeProject_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeProject_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeEducation" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "institution" TEXT NOT NULL,
  "degree" TEXT,
  "field" TEXT,
  "startDate" TEXT,
  "endDate" TEXT,
  "score" TEXT,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeEducation_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeEducation_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeCertification" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "issuer" TEXT,
  "issuedAt" TEXT,
  "credentialUrl" TEXT,
  "orderIndex" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeCertification_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeCertification_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "JobDescription" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "company" TEXT,
  "industry" TEXT,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "JobDescription_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "JobDescription_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeAnalysis" (
  "id" TEXT NOT NULL,
  "resumeId" TEXT NOT NULL,
  "versionId" TEXT,
  "jobDescriptionId" TEXT,
  "label" TEXT NOT NULL DEFAULT 'ATS Compatibility Estimate',
  "overallScore" INTEGER,
  "keywordScore" INTEGER,
  "sectionScore" INTEGER,
  "formattingScore" INTEGER,
  "readabilityScore" INTEGER,
  "contactScore" INTEGER,
  "summary" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ResumeAnalysis_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeAnalysis_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "ResumeAnalysis_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "ResumeVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT "ResumeAnalysis_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "KeywordAnalysis" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "keyword" TEXT NOT NULL,
  "importance" "KeywordImportance" NOT NULL DEFAULT 'Important',
  "foundInResume" BOOLEAN NOT NULL DEFAULT false,
  "foundInJobDescription" BOOLEAN NOT NULL DEFAULT false,
  "frequency" INTEGER NOT NULL DEFAULT 0,
  "suggestion" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "KeywordAnalysis_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "KeywordAnalysis_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "ResumeAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "ResumeSuggestion" (
  "id" TEXT NOT NULL,
  "analysisId" TEXT NOT NULL,
  "section" TEXT NOT NULL,
  "issue" TEXT NOT NULL,
  "severity" "AnalysisSeverity" NOT NULL DEFAULT 'Medium',
  "whyItMatters" TEXT NOT NULL,
  "suggestedFix" TEXT NOT NULL,
  "acceptedAt" TIMESTAMP(3),
  "rejectedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ResumeSuggestion_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "ResumeSuggestion_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "ResumeAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Resume_status_createdAt_idx" ON "Resume"("status", "createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "ResumeVersion_resumeId_versionNumber_key" ON "ResumeVersion"("resumeId", "versionNumber");
CREATE INDEX IF NOT EXISTS "ResumeVersion_resumeId_createdAt_idx" ON "ResumeVersion"("resumeId", "createdAt");
CREATE INDEX IF NOT EXISTS "ResumeVersion_resumeId_isActive_idx" ON "ResumeVersion"("resumeId", "isActive");
CREATE INDEX IF NOT EXISTS "ResumeSection_resumeId_sectionType_orderIndex_idx" ON "ResumeSection"("resumeId", "sectionType", "orderIndex");
CREATE UNIQUE INDEX IF NOT EXISTS "ResumeSkill_resumeId_name_key" ON "ResumeSkill"("resumeId", "name");
CREATE INDEX IF NOT EXISTS "ResumeSkill_resumeId_category_idx" ON "ResumeSkill"("resumeId", "category");
CREATE INDEX IF NOT EXISTS "ResumeExperience_resumeId_orderIndex_idx" ON "ResumeExperience"("resumeId", "orderIndex");
CREATE INDEX IF NOT EXISTS "ResumeProject_resumeId_orderIndex_idx" ON "ResumeProject"("resumeId", "orderIndex");
CREATE INDEX IF NOT EXISTS "ResumeEducation_resumeId_orderIndex_idx" ON "ResumeEducation"("resumeId", "orderIndex");
CREATE INDEX IF NOT EXISTS "ResumeCertification_resumeId_orderIndex_idx" ON "ResumeCertification"("resumeId", "orderIndex");
CREATE INDEX IF NOT EXISTS "JobDescription_resumeId_createdAt_idx" ON "JobDescription"("resumeId", "createdAt");
CREATE INDEX IF NOT EXISTS "ResumeAnalysis_resumeId_createdAt_idx" ON "ResumeAnalysis"("resumeId", "createdAt");
CREATE INDEX IF NOT EXISTS "ResumeAnalysis_versionId_createdAt_idx" ON "ResumeAnalysis"("versionId", "createdAt");
CREATE INDEX IF NOT EXISTS "ResumeAnalysis_jobDescriptionId_createdAt_idx" ON "ResumeAnalysis"("jobDescriptionId", "createdAt");
CREATE UNIQUE INDEX IF NOT EXISTS "KeywordAnalysis_analysisId_keyword_key" ON "KeywordAnalysis"("analysisId", "keyword");
CREATE INDEX IF NOT EXISTS "KeywordAnalysis_analysisId_importance_idx" ON "KeywordAnalysis"("analysisId", "importance");
CREATE INDEX IF NOT EXISTS "ResumeSuggestion_analysisId_severity_idx" ON "ResumeSuggestion"("analysisId", "severity");
