import { z } from 'zod';

export const allowedAnalyticsEventTypes = [
  'page_view',
  'project_view',
  'project_live_click',
  'github_click',
  'linkedin_click',
  'hire_click',
  'resume_download',
  'contact_submit',
  'nav_click',
  'scroll_depth',
] as const;

const analyticsMetadataSchema = z
  .object({
    projectId: z.string().min(1).max(120).optional(),
    projectSlug: z.string().min(1).max(160).optional(),
    href: z.string().url().max(500).optional(),
    label: z.string().min(1).max(120).optional(),
    referrer: z.string().max(500).optional(),
    scrollDepth: z.number().int().min(0).max(100).optional(),
  })
  .strict();

export const analyticsEventSchema = z.object({
  eventType: z.enum(allowedAnalyticsEventTypes),
  pagePath: z
    .string()
    .min(1)
    .max(300)
    .refine((value) => value.startsWith('/'), 'pagePath must be an absolute app path'),
  visitorKey: z.string().min(16).max(128).optional(),
  sessionKey: z.string().min(16).max(128).optional(),
  metadata: analyticsMetadataSchema.optional().default({}),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().min(10).max(4000),
});

export const dashboardDateRangeSchema = z.object({
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  range: z
    .enum(['today', 'yesterday', 'last7', 'last30', 'last90', 'custom'])
    .optional()
    .default('last7'),
});

export const heartbeatSchema = z.object({
  pagePath: z
    .string()
    .min(1)
    .max(300)
    .refine((value) => value.startsWith('/'), 'pagePath must be an absolute app path'),
  visitorKey: z.string().min(16).max(128).optional(),
  sessionKey: z.string().min(16).max(128).optional(),
});

export const messageStatusSchema = z.enum(['New', 'Read', 'Replied', 'Archived']);
export const messagePrioritySchema = z.enum(['Low', 'Normal', 'High', 'Urgent']);
export const projectStatusSchema = z.enum(['Draft', 'Published', 'Archived']);
export const projectTypeSchema = z.enum([
  'Case Study',
  'Client Work',
  'Personal Project',
  'Open Source',
]);
export const projectTaxonomyTypeSchema = z.enum(['category', 'technology', 'tag']);

const optionalText = (max = 4000) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().max(max).nullable().optional(),
  );

const optionalUrl = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  z.string().trim().url().max(500).nullable().optional(),
);

const stringListSchema = z.preprocess((value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}, z.array(z.string().trim().min(1).max(80)).max(30).default([]));

const checkboxBooleanSchema = z.preprocess((value) => {
  if (value === true || value === false) return value;
  if (typeof value === 'string') return ['true', 'on', '1', 'yes'].includes(value.toLowerCase());
  return false;
}, z.boolean());

export const messageListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  search: z.string().trim().max(120).optional(),
  status: messageStatusSchema.optional(),
  priority: messagePrioritySchema.optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  sort: z.enum(['newest', 'oldest']).optional().default('newest'),
});

export const messageMutationSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
  status: messageStatusSchema.optional(),
  priority: messagePrioritySchema.optional(),
});

export const projectListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12),
  search: z.string().trim().max(160).optional(),
  view: z
    .enum(['all', 'caseStudies', 'featured', 'clientWork', 'personalProjects', 'openSource'])
    .optional()
    .default('all'),
  category: z.string().trim().max(120).optional(),
  technology: z.string().trim().max(120).optional(),
  status: projectStatusSchema.optional(),
  year: z.string().trim().max(10).optional(),
  sort: z
    .enum(['newest', 'oldest', 'az', 'recentlyUpdated'])
    .optional()
    .default('newest'),
});

export const projectMutationSchema = z.object({
  title: z.string().trim().min(2).max(160),
  slug: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val === null ? undefined : val),
    z.string()
      .trim()
      .min(2)
      .max(180)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase URL slug with hyphens.')
      .optional()
  ),
  description: z.string().trim().min(5).max(500),
  longText: optionalText(12000),
  projectType: projectTypeSchema.default('Personal Project'),
  category: optionalText(120),
  tags: stringListSchema,
  technologies: stringListSchema,
  status: projectStatusSchema.default('Draft'),
  featured: checkboxBooleanSchema.optional().default(false),
  showOnHomepage: checkboxBooleanSchema.optional().default(true),
  publishedAt: z.coerce.date().optional(),
  client: optionalText(160),
  role: optionalText(160),
  team: optionalText(160),
  duration: optionalText(120),
  year: optionalText(10),
  liveUrl: optionalUrl,
  githubUrl: optionalUrl,
  coverImageUrl: optionalUrl,
  thumbnailUrl: optionalUrl,
  galleryImages: z.preprocess((value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split('\n').map((item) => item.trim()).filter(Boolean);
    return [];
  }, z.array(z.string().trim().url().max(500)).max(20).default([])),
  demoVideoUrl: optionalUrl,
  seoTitle: optionalText(180),
  seoDescription: optionalText(300),
  seoKeywords: stringListSchema,
  ogImage: optionalUrl,
  orderIndex: z.coerce.number().int().min(0).max(9999).optional().default(0),
});

export const projectBulkMutationSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
  action: z.enum(['publish', 'unpublish', 'archive', 'delete', 'markFeatured', 'removeFeatured', 'duplicate']),
});

export const projectTaxonomyMutationSchema = z.object({
  type: projectTaxonomyTypeSchema,
  name: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase slug with hyphens.')
    .optional(),
  description: optionalText(500),
});

export const visitorListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  device: z.string().trim().max(80).optional(),
  browser: z.string().trim().max(80).optional(),
  os: z.string().trim().max(80).optional(),
  referrer: z.string().trim().max(160).optional(),
  kind: z.enum(['new', 'returning']).optional(),
  hasConversion: z.coerce.boolean().optional(),
  sort: z.enum(['lastSeenDesc', 'firstSeenAsc']).optional().default('lastSeenDesc'),
});

export const analyticsQuerySchema = z.object({
  range: dashboardDateRangeSchema.shape.range,
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  search: z.string().trim().max(160).optional(),
  sort: z.enum(['desc', 'asc']).optional().default('desc'),
});

export const resumeUploadSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  fileName: z.string().trim().min(1).max(240),
  fileType: z
    .enum([
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]),
  fileSize: z.number().int().min(1).max(8 * 1024 * 1024),
});

export const resumeCreateSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  fileName: z.string().trim().min(1).max(240).optional(),
  contentText: z.string().trim().min(20).max(120000),
});

export const resumeUpdateSchema = z.object({
  name: z.string().trim().min(1).max(160).optional(),
  status: z.enum(['Active', 'Inactive', 'Archived', 'Deleted']).optional(),
  isActive: z.boolean().optional(),
});

export const resumeVersionSchema = z.object({
  name: z.string().trim().max(160).optional(),
  changeSummary: z.string().trim().max(500).optional(),
  contentText: z.string().trim().min(20).max(120000),
});

export const jobDescriptionSchema = z.object({
  title: z.string().trim().min(2).max(160),
  company: z.string().trim().max(160).optional(),
  industry: z.string().trim().max(120).optional(),
  description: z.string().trim().min(20).max(120000),
});

export const atsAnalyzeSchema = z.object({
  versionId: z.string().trim().min(1).optional(),
  jobDescription: jobDescriptionSchema,
});

export const resumeCompareSchema = z.object({
  versionAId: z.string().trim().min(1),
  versionBId: z.string().trim().min(1),
});

export const resumeExportSchema = z.object({
  versionId: z.string().trim().min(1).optional(),
  format: z.enum(['txt', 'json']).default('txt'),
});

export const caseStudySectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1).max(160),
  content: optionalText(60000),
  images: z.array(z.string().url()).optional().default([]), // Kept for backwards compatibility / simple storing
  metadata: z.object({
    media: z.array(z.object({
      url: z.string().url(),
      type: z.enum(['image', 'pdf', 'svg']),
      size: z.enum(['full', 'half', 'original']),
    })).optional(),
    layout: z.string().optional(), // Kept for backwards compatibility but unused now
    sourcePage: z.number().int().optional(),
    visualNotes: z.any().optional()
  }).optional(),
});

export const caseStudyMutationSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().trim().min(2).max(160),
  slug: z.string().trim().min(2).max(180),
  description: optionalText(500),
  coverImage: optionalUrl,
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  sourceType: z.enum(['MANUAL', 'PDF']).default('MANUAL'),
  sourcePdf: optionalUrl,
  metadata: z.object({
    subtitle: z.string().optional(),
    theme: z.any().optional(),
    typography: z.any().optional(),
    hero: z.any().optional(),
    navigation: z.any().optional(),
  }).optional(),
  sections: z.array(caseStudySectionSchema).optional().default([]),
});

export const schemas = {
  analyticsEventSchema,
  contactMessageSchema,
  dashboardDateRangeSchema,
  heartbeatSchema,
  messageListQuerySchema,
  messageMutationSchema,
  projectStatusSchema,
  projectTypeSchema,
  projectListQuerySchema,
  projectMutationSchema,
  projectBulkMutationSchema,
  projectTaxonomyMutationSchema,
  visitorListQuerySchema,
  analyticsQuerySchema,
  resumeUploadSchema,
  resumeCreateSchema,
  resumeUpdateSchema,
  resumeVersionSchema,
  jobDescriptionSchema,
  atsAnalyzeSchema,
  resumeCompareSchema,
  resumeExportSchema,
  caseStudyMutationSchema,
  caseStudySectionSchema,
};
