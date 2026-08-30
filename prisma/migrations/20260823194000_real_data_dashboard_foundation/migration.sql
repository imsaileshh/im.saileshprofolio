DO $$ BEGIN
  CREATE TYPE "SkillLevel" AS ENUM ('Beginner', 'Intermediate', 'Advanced', 'Expert');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ContactMessageStatus" AS ENUM ('New', 'Read', 'Replied', 'Archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "MessagePriority" AS ENUM ('Low', 'Normal', 'High', 'Urgent');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "published" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "archived" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "category" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "role" TEXT;
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "year" TEXT;

ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "employmentType" TEXT;
ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "companyLogo" TEXT;
ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Experience" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Education" ADD COLUMN IF NOT EXISTS "description" TEXT;
ALTER TABLE "Education" ADD COLUMN IF NOT EXISTS "logo" TEXT;
ALTER TABLE "Education" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Education" ADD COLUMN IF NOT EXISTS "orderIndex" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "Skill" ADD COLUMN IF NOT EXISTS "level" "SkillLevel" NOT NULL DEFAULT 'Advanced';
ALTER TABLE "Skill" ADD COLUMN IF NOT EXISTS "icon" TEXT;
ALTER TABLE "Skill" ADD COLUMN IF NOT EXISTS "yearsOfExperience" DECIMAL(4,1);
ALTER TABLE "Skill" ADD COLUMN IF NOT EXISTS "description" TEXT;
ALTER TABLE "Skill" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE "Visitor" ADD COLUMN IF NOT EXISTS "referrer" TEXT;
ALTER TABLE "Visitor" ADD COLUMN IF NOT EXISTS "source" TEXT;

CREATE TABLE IF NOT EXISTS "VisitorSession" (
  "id" TEXT NOT NULL,
  "visitorId" TEXT NOT NULL,
  "sessionHash" TEXT NOT NULL,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "entryPage" TEXT NOT NULL,
  "exitPage" TEXT,
  "referrer" TEXT,
  "userAgent" TEXT,
  "deviceType" TEXT,
  "browser" TEXT,
  "os" TEXT,
  CONSTRAINT "VisitorSession_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "AnalyticsEvent" ADD COLUMN IF NOT EXISTS "sessionId" TEXT;
ALTER TABLE "AnalyticsEvent" ADD COLUMN IF NOT EXISTS "projectId" TEXT;

ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "status" "ContactMessageStatus" NOT NULL DEFAULT 'New';
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "priority" "MessagePriority" NOT NULL DEFAULT 'Normal';
ALTER TABLE "ContactMessage" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "Notification" ADD COLUMN IF NOT EXISTS "readAt" TIMESTAMP(3);
ALTER TABLE "Notification" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "analyticsEnabled" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "sessionTimeoutMinutes" INTEGER NOT NULL DEFAULT 5;

CREATE TABLE IF NOT EXISTS "ActivityLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "action" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "VisitorSession_sessionHash_key" ON "VisitorSession"("sessionHash");
CREATE INDEX IF NOT EXISTS "Project_published_archived_orderIndex_idx" ON "Project"("published", "archived", "orderIndex");
CREATE INDEX IF NOT EXISTS "Project_featured_published_idx" ON "Project"("featured", "published");
CREATE INDEX IF NOT EXISTS "Experience_visible_featured_orderIndex_idx" ON "Experience"("visible", "featured", "orderIndex");
CREATE INDEX IF NOT EXISTS "Education_visible_orderIndex_idx" ON "Education"("visible", "orderIndex");
CREATE INDEX IF NOT EXISTS "Skill_visible_category_orderIndex_idx" ON "Skill"("visible", "category", "orderIndex");
CREATE INDEX IF NOT EXISTS "Resume_isActive_createdAt_idx" ON "Resume"("isActive", "createdAt");
CREATE INDEX IF NOT EXISTS "Visitor_firstSeen_idx" ON "Visitor"("firstSeen");
CREATE INDEX IF NOT EXISTS "Visitor_lastSeen_idx" ON "Visitor"("lastSeen");
CREATE INDEX IF NOT EXISTS "Visitor_deviceType_idx" ON "Visitor"("deviceType");
CREATE INDEX IF NOT EXISTS "VisitorSession_visitorId_startedAt_idx" ON "VisitorSession"("visitorId", "startedAt");
CREATE INDEX IF NOT EXISTS "VisitorSession_lastSeenAt_idx" ON "VisitorSession"("lastSeenAt");
CREATE INDEX IF NOT EXISTS "VisitorSession_deviceType_idx" ON "VisitorSession"("deviceType");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_visitorId_timestamp_idx" ON "AnalyticsEvent"("visitorId", "timestamp");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_sessionId_timestamp_idx" ON "AnalyticsEvent"("sessionId", "timestamp");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_eventType_timestamp_idx" ON "AnalyticsEvent"("eventType", "timestamp");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_pagePath_timestamp_idx" ON "AnalyticsEvent"("pagePath", "timestamp");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_projectId_timestamp_idx" ON "AnalyticsEvent"("projectId", "timestamp");
CREATE INDEX IF NOT EXISTS "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "ContactMessage_priority_createdAt_idx" ON "ContactMessage"("priority", "createdAt");
CREATE INDEX IF NOT EXISTS "Notification_type_createdAt_idx" ON "Notification"("type", "createdAt");
CREATE INDEX IF NOT EXISTS "Notification_readAt_idx" ON "Notification"("readAt");
CREATE INDEX IF NOT EXISTS "ActivityLog_userId_createdAt_idx" ON "ActivityLog"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "ActivityLog_entityType_entityId_idx" ON "ActivityLog"("entityType", "entityId");
CREATE INDEX IF NOT EXISTS "ActivityLog_action_createdAt_idx" ON "ActivityLog"("action", "createdAt");

DO $$ BEGIN
  ALTER TABLE "VisitorSession" ADD CONSTRAINT "VisitorSession_visitorId_fkey"
    FOREIGN KEY ("visitorId") REFERENCES "Visitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_sessionId_fkey"
    FOREIGN KEY ("sessionId") REFERENCES "VisitorSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
