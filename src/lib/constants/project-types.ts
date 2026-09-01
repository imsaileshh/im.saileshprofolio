export const WORK_PROJECT_TYPES = ['WORK', 'Client Work', 'Work', 'Case Study'] as const;
export const PERSONAL_PROJECT_TYPES = ['PERSONAL_PROJECT', 'Personal Project', 'Open Source'] as const;

export const WORK_WHERE_CLAUSE = {
  projectType: { in: ['WORK', 'Client Work', 'Work', 'Case Study'] },
  NOT: [
    { projectType: 'PERSONAL_PROJECT' },
    { projectType: 'Personal Project' },
    { projectType: 'Open Source' },
  ],
};

export const PERSONAL_PROJECT_WHERE_CLAUSE = {
  projectType: { in: ['PERSONAL_PROJECT', 'Personal Project', 'Open Source'] },
};

export function isWorkProjectType(type?: string | null): boolean {
  if (!type) return false;
  return (WORK_PROJECT_TYPES as readonly string[]).includes(type) && !(PERSONAL_PROJECT_TYPES as readonly string[]).includes(type);
}

export function isPersonalProjectType(type?: string | null): boolean {
  if (!type) return false;
  return (PERSONAL_PROJECT_TYPES as readonly string[]).includes(type);
}
