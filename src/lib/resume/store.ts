import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/database/prisma';
import { analyzeResume, type ResumeAtsResult } from './ats';
import { parseResumeSections, structuredDataFromSections } from './processing';

type ResumeContentInput = {
  resumeId?: string;
  name?: string;
  fileName?: string;
  fileType?: string;
  filePath?: string;
  contentText: string;
  changeSummary?: string;
};

export async function createResumeFromText(input: ResumeContentInput) {
  const sections = parseResumeSections(input.contentText);
  const structuredData = structuredDataFromSections(sections);

  return prisma.$transaction(async (tx) => {
    const resume = await tx.resume.create({
      data: {
        version: '1',
        name: input.name ?? input.fileName ?? 'Resume',
        fileUrl: input.filePath ?? '',
        fileName: input.fileName ?? 'manual-entry.txt',
        fileType: input.fileType ?? 'text/plain',
        originalFilePath: input.filePath,
        originalText: input.contentText,
        parsedText: input.contentText,
      },
    });

    const version = await tx.resumeVersion.create({
      data: {
        resumeId: resume.id,
        versionNumber: 1,
        name: input.name ?? 'Initial resume',
        changeSummary: input.changeSummary ?? 'Initial resume content',
        filePath: input.filePath,
        fileName: input.fileName,
        fileType: input.fileType ?? 'text/plain',
        contentText: input.contentText,
        structuredData,
        isActive: true,
      },
    });

    await tx.resume.update({
      where: { id: resume.id },
      data: { activeVersionId: version.id },
    });

    await writeResumeStructure(tx, resume.id, sections, structuredData.skills);
    return { resume, version };
  });
}

export async function addResumeVersion(input: ResumeContentInput & { resumeId: string }) {
  const sections = parseResumeSections(input.contentText);
  const structuredData = structuredDataFromSections(sections);

  return prisma.$transaction(async (tx) => {
    const latest = await tx.resumeVersion.findFirst({
      where: { resumeId: input.resumeId },
      orderBy: { versionNumber: 'desc' },
      select: { versionNumber: true },
    });
    const nextVersionNumber = (latest?.versionNumber ?? 0) + 1;

    await tx.resumeVersion.updateMany({
      where: { resumeId: input.resumeId, isActive: true },
      data: { isActive: false },
    });

    const version = await tx.resumeVersion.create({
      data: {
        resumeId: input.resumeId,
        versionNumber: nextVersionNumber,
        name: input.name,
        changeSummary: input.changeSummary,
        filePath: input.filePath,
        fileName: input.fileName,
        fileType: input.fileType ?? 'text/plain',
        contentText: input.contentText,
        structuredData,
        isActive: true,
      },
    });

    await tx.resume.update({
      where: { id: input.resumeId },
      data: {
        version: String(nextVersionNumber),
        name: input.name,
        fileUrl: input.filePath ?? undefined,
        fileName: input.fileName ?? undefined,
        fileType: input.fileType ?? undefined,
        originalFilePath: input.filePath ?? undefined,
        parsedText: input.contentText,
        activeVersionId: version.id,
      },
    });

    await writeResumeStructure(tx, input.resumeId, sections, structuredData.skills);
    return version;
  });
}

export async function restoreResumeVersion(resumeId: string, versionId: string) {
  return prisma.$transaction(async (tx) => {
    const version = await tx.resumeVersion.findFirst({ where: { id: versionId, resumeId } });
    if (!version) return null;

    await tx.resumeVersion.updateMany({
      where: { resumeId, isActive: true },
      data: { isActive: false },
    });
    await tx.resumeVersion.update({ where: { id: versionId }, data: { isActive: true } });

    const sections = parseResumeSections(version.contentText);
    const structuredData = structuredDataFromSections(sections);
    await writeResumeStructure(tx, resumeId, sections, structuredData.skills);

    return tx.resume.update({
      where: { id: resumeId },
      data: {
        version: String(version.versionNumber),
        parsedText: version.contentText,
        activeVersionId: version.id,
      },
    });
  });
}

export async function analyzeAndStoreResume({
  resumeId,
  versionId,
  jobDescription,
}: {
  resumeId: string;
  versionId?: string;
  jobDescription: { title: string; company?: string; industry?: string; description: string };
}) {
  const resume = await prisma.resume.findUnique({
    where: { id: resumeId },
    include: {
      versions: { orderBy: { versionNumber: 'desc' } },
    },
  });
  if (!resume) return null;

  const selectedVersion = versionId
    ? resume.versions.find((version) => version.id === versionId)
    : resume.versions.find((version) => version.id === resume.activeVersionId) ?? resume.versions[0];
  const resumeText = selectedVersion?.contentText ?? resume.parsedText ?? resume.originalText ?? '';
  const structured = selectedVersion?.structuredData && typeof selectedVersion.structuredData === 'object'
    ? selectedVersion.structuredData as Record<string, unknown>
    : undefined;

  const result = analyzeResume({
    resumeText,
    structured: structured as never,
    jobDescription: jobDescription.description,
  });

  return persistAnalysis({
    resumeId,
    versionId: selectedVersion?.id,
    jobDescription,
    result,
  });
}

export async function persistAnalysis({
  resumeId,
  versionId,
  jobDescription,
  result,
}: {
  resumeId: string;
  versionId?: string;
  jobDescription: { title: string; company?: string; industry?: string; description: string };
  result: ResumeAtsResult;
}) {
  return prisma.$transaction(async (tx) => {
    const job = await tx.jobDescription.create({
      data: {
        resumeId,
        title: jobDescription.title,
        company: jobDescription.company,
        industry: jobDescription.industry,
        description: jobDescription.description,
      },
    });

    const analysis = await tx.resumeAnalysis.create({
      data: {
        resumeId,
        versionId,
        jobDescriptionId: job.id,
        label: result.label,
        overallScore: result.overallScore,
        keywordScore: result.scores.keyword,
        sectionScore: result.scores.sectionCompleteness,
        formattingScore: result.scores.formattingCompatibility,
        readabilityScore: result.scores.readability,
        contactScore: result.scores.contactInformation,
        summary: {
          scores: result.scores,
          matchedKeywords: result.matchedKeywords,
          missingKeywords: result.missingKeywords,
          explanations: result.explanations,
        },
      },
    });

    if (result.overallScore !== null && versionId) {
      await tx.resumeVersion.update({ where: { id: versionId }, data: { atsScore: result.overallScore } });
    }

    if (result.keywordRows.length) {
      await tx.keywordAnalysis.createMany({
        data: result.keywordRows.map((row) => ({
          analysisId: analysis.id,
          keyword: row.keyword,
          importance: row.importance,
          foundInResume: row.foundInResume,
          foundInJobDescription: row.foundInJobDescription,
          frequency: row.frequency,
          suggestion: row.suggestion,
        })),
      });
    }

    if (result.suggestions.length) {
      await tx.resumeSuggestion.createMany({
        data: result.suggestions.map((suggestion) => ({
          analysisId: analysis.id,
          section: suggestion.section,
          issue: suggestion.issue,
          severity: suggestion.severity,
          whyItMatters: suggestion.whyItMatters,
          suggestedFix: suggestion.suggestedFix,
        })),
      });
    }

    return tx.resumeAnalysis.findUnique({
      where: { id: analysis.id },
      include: { keywordAnalysis: true, suggestions: true, jobDescription: true },
    });
  });
}

export async function compareResumeVersions(resumeId: string, versionAId: string, versionBId: string) {
  const versions = await prisma.resumeVersion.findMany({
    where: { resumeId, id: { in: [versionAId, versionBId] } },
  });
  if (versions.length !== 2) return null;

  const [versionA, versionB] = [versions.find((version) => version.id === versionAId), versions.find((version) => version.id === versionBId)];
  if (!versionA || !versionB) return null;

  const tokensA = new Set(versionA.contentText.toLowerCase().split(/\W+/).filter(Boolean));
  const tokensB = new Set(versionB.contentText.toLowerCase().split(/\W+/).filter(Boolean));
  const added = [...tokensB].filter((token) => !tokensA.has(token)).slice(0, 80);
  const removed = [...tokensA].filter((token) => !tokensB.has(token)).slice(0, 80);

  return {
    versionA,
    versionB,
    addedKeywords: added,
    removedKeywords: removed,
    characterDelta: versionB.contentText.length - versionA.contentText.length,
  };
}

async function writeResumeStructure(
  tx: Prisma.TransactionClient,
  resumeId: string,
  sections: ReturnType<typeof parseResumeSections>,
  skills: string[],
) {
  await tx.resumeSection.deleteMany({ where: { resumeId } });
  await tx.resumeSkill.deleteMany({ where: { resumeId } });

  if (sections.length) {
    await tx.resumeSection.createMany({
      data: sections.map((section) => ({
        resumeId,
        sectionType: section.sectionType,
        title: section.title,
        content: section.content,
        orderIndex: section.orderIndex,
      })),
    });
  }

  if (skills.length) {
    await tx.resumeSkill.createMany({
      data: skills.map((skill) => ({
        resumeId,
        name: skill,
        category: 'Extracted',
        source: 'resume_text',
      })),
      skipDuplicates: true,
    });
  }
}
