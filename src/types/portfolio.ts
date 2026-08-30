export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: number;
}
