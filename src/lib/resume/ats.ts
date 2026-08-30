type StructuredResume = {
  personal?: Record<string, string | undefined>;
  summary?: string;
  skills?: string[];
  experience?: string[];
  projects?: string[];
  education?: string[];
  certifications?: string[];
};

export type ResumeAtsInput = {
  resumeText: string;
  structured?: StructuredResume;
  jobDescription?: string;
};

export type ResumeAtsResult = {
  label: string;
  overallScore: number | null;
  scores: {
    keyword: number | null;
    skills: number | null;
    experience: number | null;
    sectionCompleteness: number | null;
    formattingCompatibility: number | null;
    readability: number | null;
    contactInformation: number | null;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordRows: Array<{
    keyword: string;
    importance: 'Required' | 'Important' | 'Optional';
    foundInResume: boolean;
    foundInJobDescription: boolean;
    frequency: number;
    suggestion?: string;
  }>;
  suggestions: Array<{
    section: string;
    issue: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    whyItMatters: string;
    suggestedFix: string;
  }>;
  explanations: Record<string, string>;
};

export const atsWeights = {
  keywordMatchWeight: 25,
  skillsMatchWeight: 20,
  experienceRelevanceWeight: 15,
  sectionCompletenessWeight: 15,
  formattingCompatibilityWeight: 10,
  readabilityWeight: 10,
  contactInformationWeight: 5,
} as const;

const stopWords = new Set([
  'and',
  'the',
  'for',
  'with',
  'from',
  'that',
  'this',
  'will',
  'you',
  'your',
  'are',
  'our',
  'have',
  'has',
  'was',
  'were',
  'job',
  'role',
  'team',
  'work',
  'using',
  'into',
  'about',
]);

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}.+#-]+/gu, ' ').trim();
}

function tokenize(value: string) {
  return normalize(value)
    .split(/\s+/)
    .map((token) => token.replace(/^[^a-z0-9+#.]+|[^a-z0-9+#.]+$/gi, ''))
    .filter((token) => token.length >= 3 && !stopWords.has(token));
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function countToken(text: string, token: string) {
  const normalized = ` ${normalize(text)} `;
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (normalized.match(new RegExp(`\\b${escaped}\\b`, 'g')) ?? []).length;
}

export function extractKeywords(text: string, limit = 40) {
  const counts = tokenize(text).reduce<Record<string, number>>((acc, token) => {
    acc[token] = (acc[token] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([keyword]) => keyword);
}

function scoreRatio(part: number, total: number) {
  if (!total) return null;
  return Math.max(0, Math.min(100, Math.round((part / total) * 100)));
}

function detectSections(text: string, structured?: StructuredResume) {
  const normalized = normalize(text);
  return {
    summary: Boolean(structured?.summary) || /\b(summary|profile|objective)\b/.test(normalized),
    skills: Boolean(structured?.skills?.length) || /\b(skills|technologies|tools)\b/.test(normalized),
    experience: Boolean(structured?.experience?.length) || /\b(experience|employment|work history)\b/.test(normalized),
    projects: Boolean(structured?.projects?.length) || /\b(projects|portfolio)\b/.test(normalized),
    education: Boolean(structured?.education?.length) || /\b(education|degree|university|college)\b/.test(normalized),
  };
}

function contactScore(text: string, structured?: StructuredResume) {
  const email = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(text) || Boolean(structured?.personal?.email);
  const url = /https?:\/\/|linkedin\.com|github\.com/i.test(text) || Boolean(structured?.personal?.website);
  const phone = /(\+?\d[\d\s().-]{7,}\d)/.test(text) || Boolean(structured?.personal?.phone);
  return Math.round(([email, url, phone].filter(Boolean).length / 3) * 100);
}

function readabilityScore(text: string) {
  const sentences = text.split(/[.!?]+/).map((part) => part.trim()).filter(Boolean);
  const words = tokenize(text).length;
  if (!words) return null;
  if (!sentences.length) return 60;
  const averageWords = words / sentences.length;
  if (averageWords <= 22) return 100;
  if (averageWords <= 30) return 82;
  if (averageWords <= 40) return 65;
  return 45;
}

function formattingScore(text: string) {
  const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return null;
  const tooLongLines = lines.filter((line) => line.length > 140).length;
  const plainTextHealthy = !/[■◆●◦]/.test(text);
  const lineScore = scoreRatio(lines.length - tooLongLines, lines.length) ?? 0;
  return Math.round(lineScore * 0.8 + (plainTextHealthy ? 20 : 5));
}

function sectionScore(text: string, structured?: StructuredResume) {
  const sections = detectSections(text, structured);
  return scoreRatio(Object.values(sections).filter(Boolean).length, Object.keys(sections).length);
}

function skillsScore(resumeText: string, structured: StructuredResume | undefined, jobDescription?: string) {
  const skills = unique([...(structured?.skills ?? []), ...extractKeywords(resumeText, 18)]).map(normalize);
  if (!skills.length) return null;
  if (!jobDescription) return Math.min(100, Math.max(50, skills.length * 8));
  const job = normalize(jobDescription);
  const relevant = skills.filter((skill) => job.includes(skill));
  return scoreRatio(relevant.length, Math.min(skills.length, Math.max(1, relevant.length + 6)));
}

function experienceScore(resumeText: string, structured?: StructuredResume) {
  const hasExperienceText = /\b(experience|built|developed|led|created|implemented|improved|delivered)\b/i.test(resumeText);
  const experienceCount = structured?.experience?.length ?? 0;
  if (!hasExperienceText && !experienceCount) return 25;
  return Math.min(100, 55 + experienceCount * 12 + (hasExperienceText ? 25 : 0));
}

function weightedAverage(scores: Array<[number | null, number]>) {
  const available = scores.filter(([score]) => score !== null) as Array<[number, number]>;
  if (!available.length) return null;
  const weightTotal = available.reduce((total, [, weight]) => total + weight, 0);
  return Math.round(available.reduce((total, [score, weight]) => total + score * weight, 0) / weightTotal);
}

export function analyzeResume(input: ResumeAtsInput): ResumeAtsResult {
  const resumeText = input.resumeText.trim();
  const jobDescription = input.jobDescription?.trim();
  const label = 'ATS Compatibility Estimate';

  if (!resumeText) {
    return {
      label,
      overallScore: null,
      scores: {
        keyword: null,
        skills: null,
        experience: null,
        sectionCompleteness: null,
        formattingCompatibility: null,
        readability: null,
        contactInformation: null,
      },
      matchedKeywords: [],
      missingKeywords: [],
      keywordRows: [],
      suggestions: [{
        section: 'Resume',
        issue: 'No resume text was available for analysis.',
        severity: 'Critical',
        whyItMatters: 'ATS checks need readable resume text to compare role requirements.',
        suggestedFix: 'Upload a readable PDF or DOCX, or paste the resume text manually.',
      }],
      explanations: {
        overall: 'Score cannot be calculated until resume text is available.',
      },
    };
  }

  const jobKeywords = jobDescription ? extractKeywords(jobDescription, 35) : [];
  const matchedKeywords = jobKeywords.filter((keyword) => countToken(resumeText, keyword) > 0);
  const missingKeywords = jobKeywords.filter((keyword) => !matchedKeywords.includes(keyword));
  const keywordScore = jobKeywords.length ? scoreRatio(matchedKeywords.length, jobKeywords.length) : null;
  const skills = skillsScore(resumeText, input.structured, jobDescription);
  const experience = experienceScore(resumeText, input.structured);
  const sections = sectionScore(resumeText, input.structured);
  const formatting = formattingScore(resumeText);
  const readability = readabilityScore(resumeText);
  const contact = contactScore(resumeText, input.structured);
  const overallScore = weightedAverage([
    [keywordScore, atsWeights.keywordMatchWeight],
    [skills, atsWeights.skillsMatchWeight],
    [experience, atsWeights.experienceRelevanceWeight],
    [sections, atsWeights.sectionCompletenessWeight],
    [formatting, atsWeights.formattingCompatibilityWeight],
    [readability, atsWeights.readabilityWeight],
    [contact, atsWeights.contactInformationWeight],
  ]);

  const suggestions: ResumeAtsResult['suggestions'] = [];
  if (keywordScore !== null && keywordScore < 70) {
    suggestions.push({
      section: 'Keywords',
      issue: 'Important job description terms are missing from the resume.',
      severity: keywordScore < 45 ? 'High' : 'Medium',
      whyItMatters: 'Many ATS filters rank resumes by clear overlap with the job requirements.',
      suggestedFix: `Add truthful context for: ${missingKeywords.slice(0, 8).join(', ')}.`,
    });
  }
  if ((sections ?? 0) < 80) {
    suggestions.push({
      section: 'Sections',
      issue: 'One or more standard resume sections are not detected.',
      severity: 'Medium',
      whyItMatters: 'Consistent section labels help recruiters and parsers find the right information.',
      suggestedFix: 'Use clear headings for Summary, Skills, Experience, Projects, and Education.',
    });
  }
  if (contact < 70) {
    suggestions.push({
      section: 'Contact',
      issue: 'Contact information appears incomplete.',
      severity: 'High',
      whyItMatters: 'Recruiters need reliable email, portfolio, and phone details after screening.',
      suggestedFix: 'Add email, portfolio or LinkedIn URL, and phone number near the top.',
    });
  }

  return {
    label,
    overallScore,
    scores: {
      keyword: keywordScore,
      skills,
      experience,
      sectionCompleteness: sections,
      formattingCompatibility: formatting,
      readability,
      contactInformation: contact,
    },
    matchedKeywords,
    missingKeywords,
    keywordRows: jobKeywords.map((keyword, index) => ({
      keyword,
      importance: index < 8 ? 'Required' : index < 20 ? 'Important' : 'Optional',
      foundInResume: matchedKeywords.includes(keyword),
      foundInJobDescription: true,
      frequency: countToken(resumeText, keyword),
      suggestion: matchedKeywords.includes(keyword) ? undefined : `Include ${keyword} only where it accurately describes your work.`,
    })),
    suggestions,
    explanations: {
      overall: overallScore === null ? 'Score cannot be calculated from the available inputs.' : `${label} based on parseable text, sections, keywords, and contact signals.`,
      keywords: jobKeywords.length ? 'Keyword score compares extracted job description terms against resume text.' : 'Add a job description to calculate keyword overlap.',
    },
  };
}
