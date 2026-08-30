import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(path, import.meta.url));

test('resume CMS Prisma schema stores structured versions, analyses, keywords, and suggestions', () => {
  const schema = read('../../prisma/schema.prisma');

  for (const model of [
    'ResumeVersion',
    'ResumeSection',
    'ResumeSkill',
    'ResumeExperience',
    'ResumeProject',
    'ResumeEducation',
    'ResumeCertification',
    'JobDescription',
    'ResumeAnalysis',
    'KeywordAnalysis',
    'ResumeSuggestion',
  ]) {
    assert.match(schema, new RegExp(`model ${model}`));
  }

  assert.match(schema, /ResumeStatus/);
  assert.match(schema, /AnalysisSeverity/);
  assert.match(schema, /@@index\(\[resumeId, createdAt\]\)/);
  assert.match(schema, /@@index\(\[analysisId, importance\]\)/);
});

test('resume dashboard pages and protected APIs exist', () => {
  const paths = [
    '../../src/app/dashboard/(protected)/resume/page.tsx',
    '../../src/app/dashboard/(protected)/resume/upload/page.tsx',
    '../../src/app/dashboard/(protected)/resume/[id]/page.tsx',
    '../../src/app/dashboard/(protected)/resume/[id]/edit/page.tsx',
    '../../src/app/dashboard/(protected)/resume/[id]/ats/page.tsx',
    '../../src/app/dashboard/(protected)/resume/[id]/compare/page.tsx',
    '../../src/app/dashboard/(protected)/resume/[id]/versions/page.tsx',
    '../../src/app/dashboard/(protected)/resume/templates/page.tsx',
    '../../src/app/api/dashboard/resume/route.ts',
    '../../src/app/api/dashboard/resume/[id]/route.ts',
    '../../src/app/api/dashboard/resume/[id]/upload/route.ts',
    '../../src/app/api/dashboard/resume/[id]/parse/route.ts',
    '../../src/app/api/dashboard/resume/[id]/versions/route.ts',
    '../../src/app/api/dashboard/resume/[id]/restore/route.ts',
    '../../src/app/api/dashboard/resume/[id]/ats/route.ts',
    '../../src/app/api/dashboard/resume/[id]/ats/analyze/route.ts',
    '../../src/app/api/dashboard/resume/[id]/job-match/route.ts',
    '../../src/app/api/dashboard/resume/[id]/compare/route.ts',
    '../../src/app/api/dashboard/resume/[id]/export/route.ts',
  ];

  for (const path of paths) {
    assert.ok(exists(path), `${path} should exist`);
  }

  for (const path of paths.filter((path) => path.includes('/api/'))) {
    const source = read(path);
    assert.match(source, /requireAdmin/);
    assert.doesNotMatch(source, /mock|fake|Math\.random|hardcoded/i);
  }
});

test('resume validation and extraction pipeline validates PDF/DOCX files', () => {
  const validation = read('../../src/lib/validation/schemas.ts');
  const processing = read('../../src/lib/resume/processing.ts');

  assert.match(validation, /resumeUploadSchema/);
  assert.match(processing, /validateResumeFile/);
  assert.match(processing, /extractResumeText/);
  assert.match(processing, /application\/pdf/);
  assert.match(processing, /application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/);
  assert.match(processing, /Unable to extract resume text/);
});

test('ATS engine calculates deterministic scores from actual resume and job text only', async () => {
  const source = read('../../src/lib/resume/ats.ts');
  assert.match(source, /ATS Compatibility Estimate/);
  assert.match(source, /keywordMatchWeight/);
  assert.match(source, /extractKeywords/);
  assert.doesNotMatch(source, /mock|fake|Math\.random|lorem|placeholder/i);

  void process.platform;
  const output = execFileSync(process.execPath, [
    '--import',
    'tsx',
    '-e',
    `
      import atsModule from './src/lib/resume/ats.ts';
      const { analyzeResume } = atsModule;
      const input = {
        resumeText: 'Sailesh Frontend Developer React TypeScript Next.js PostgreSQL email sailesh@example.com portfolio https://example.com Experience built dashboards.',
        structured: {
          personal: { email: 'sailesh@example.com', title: 'Frontend Developer' },
          summary: 'Frontend developer building dashboards with React and TypeScript.',
          skills: ['React', 'TypeScript', 'Next.js', 'PostgreSQL'],
          experience: ['Built production dashboards'],
          education: ['Computer Science'],
        },
        jobDescription: 'Hiring React TypeScript frontend developer with dashboard and PostgreSQL experience.',
      };
      console.log(JSON.stringify({ first: analyzeResume(input), second: analyzeResume(input) }));
    `,
  ], { cwd: fileURLToPath(new URL('../..', import.meta.url)), encoding: 'utf8' });
  const { first, second } = JSON.parse(output);

  assert.equal(first.overallScore, second.overallScore);
  assert.ok(first.overallScore >= 0 && first.overallScore <= 100);
  assert.ok(first.matchedKeywords.includes('react'));
  assert.ok(first.label.includes('ATS Compatibility Estimate'));
});
