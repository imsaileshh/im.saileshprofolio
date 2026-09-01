import { SectionReveal } from '@/components/ui/SectionReveal';
import { prisma } from '@/lib/database/prisma';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { PersonalProjectsSection, PersonalProjectItem } from '@/components/home/PersonalProjectsSection';
import { AboutSection } from '@/components/home/AboutSection';
import { StackPreview } from '@/components/home/StackPreview';
import { HomeHero } from '@/components/home/HomeHero';
import { ExperienceEducationPreview } from '@/components/home/ExperienceEducationPreview';
import { LetsTalkButton } from '@/components/hire/LetsTalkButton';
import { ContactCTASection } from '@/components/home/ContactCTASection';

function formatYearRange(startDate: Date, endDate?: Date | null, isCurrent?: boolean) {
  const startYear = startDate.getFullYear();
  const endYear = endDate ? endDate.getFullYear() : 'Present';
  
  // Calculate duration
  const end = endDate || (isCurrent ? new Date() : new Date());
  const diffInMonths = (end.getFullYear() - startDate.getFullYear()) * 12 + (end.getMonth() - startDate.getMonth());
  const years = Math.floor(diffInMonths / 12);
  const months = diffInMonths % 12;
  
  let durationStr = '';
  if (years > 0) durationStr += `${years} yr${years > 1 ? 's' : ''} `;
  if (months > 0 || years === 0) durationStr += `${months} mo${months > 1 ? 's' : ''}`;
  durationStr = durationStr.trim();
  
  return `${startYear} - ${endYear} · ${durationStr}`;
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [workProjects, dbPersonalProjects, experienceItems, educationItems, settings, skillSections] = await Promise.all([
    // 01. Works (Case Studies & Client Work)
    prisma.project.findMany({
      where: { 
        published: true, 
        archived: false,
        projectType: { in: ['Case Study', 'Client Work'] },
      },
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: [{ featured: 'desc' }, { orderIndex: 'asc' }],
      take: 3,
    }),
    // 02. Personal Projects (Independent Builds, Experiments & Open Source)
    prisma.project.findMany({
      where: { 
        published: true, 
        archived: false,
        projectType: { in: ['Personal Project', 'Open Source'] },
      },
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: [{ featured: 'desc' }, { orderIndex: 'asc' }, { createdAt: 'desc' }],
      take: 3,
    }),
    prisma.experience.findMany({
      where: { visible: true },
      orderBy: [{ featured: 'desc' }, { orderIndex: 'asc' }],
      take: 3,
    }),
    prisma.education.findMany({
      where: { visible: true },
      orderBy: { orderIndex: 'asc' },
      take: 2,
    }),
    prisma.siteSettings.findUnique({
      where: { id: 'singleton' },
    }),
    prisma.skillSection.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        skills: {
          where: { visible: true },
          orderBy: { orderIndex: 'asc' }
        }
      }
    })
  ]);

  // Fallback works if no specific Case Study flagged yet
  const resolvedWorkProjects = workProjects.length > 0 
    ? workProjects 
    : await prisma.project.findMany({
        where: { published: true, archived: false },
        include: { images: { orderBy: { order: 'asc' } } },
        orderBy: { orderIndex: 'asc' },
        take: 3,
      });

  const projectCards = resolvedWorkProjects.map((project, index) => ({
    ...project,
    coverUrl: project.images.find((image) => image.isCover)?.url ?? project.images[0]?.url ?? `/images/projects/project${(index % 4) + 1}.svg`,
    category: project.category ?? project.technologies[0] ?? 'Case Study',
    year: project.year ?? project.createdAt.getFullYear().toString(),
  }));

  // Fallback high-craft personal projects if database has none flagged as Personal Project yet
  const fallbackPersonalProjects: PersonalProjectItem[] = [
    {
      id: 'personal-1',
      title: 'DevScope — Developer Analytics CLI',
      slug: 'devscope-cli',
      category: 'CLI / DEVTOOLS',
      year: '2025',
      description: 'A lightning-fast terminal tool for visualizing Git contributions, commit velocity, and code review trends.',
      technologies: ['TypeScript', 'Rust', 'Node.js'],
      coverUrl: '/images/projects/project1.svg',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: true,
    },
    {
      id: 'personal-2',
      title: 'VibeEngine — Motion Design Preset Library',
      slug: 'vibeengine-motion',
      category: 'OPEN SOURCE / UI',
      year: '2024',
      description: 'An opinionated collection of accessible, fluid Framer Motion spring physics curves and UI micro-interactions.',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
      coverUrl: '/images/projects/project2.svg',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
    {
      id: 'personal-3',
      title: 'PaletteGen — Color Space Optimizer',
      slug: 'palette-gen',
      category: 'WEB APP / EXPERIMENT',
      year: '2024',
      description: 'Algorithmic color generator that computes WCAG 2.2 AAA contrast scales in OKLCH perceptual color space.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      coverUrl: '/images/projects/project3.svg',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
      featured: false,
    },
  ];

  const personalProjectCards: PersonalProjectItem[] = dbPersonalProjects.length > 0
    ? dbPersonalProjects.map((p, idx) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category ?? 'Personal Project',
        year: p.year ?? p.createdAt.getFullYear().toString(),
        description: p.shortDescription ?? p.description,
        technologies: p.technologies,
        coverUrl: p.images.find((img) => img.isCover)?.url ?? p.images[0]?.url ?? `/images/projects/project${(idx % 4) + 1}.svg`,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
        featured: p.featured,
      }))
    : fallbackPersonalProjects;

  const experiencePreviewItems = experienceItems.map((item) => ({
    year: formatYearRange(item.startDate, item.endDate, item.current),
    role: item.role,
    company: item.company,
    description: item.description,
    technologies: item.technologies,
  }));

  const educationPreviewItems = educationItems.map((item) => ({
    year: formatYearRange(item.startDate, item.endDate, false),
    role: item.degree,
    company: item.institution,
    description: [item.description ?? item.field ?? 'No description available.'],
    technologies: [],
  }));

  return (
    <div className="flex flex-col">
      {/* 01 - INTRODUCTION HERO */}
      <HomeHero heroContent={settings?.heroContent} />

      {/* 02 - WORKS (CASE STUDIES & CLIENT PROJECTS) */}
      <ProjectsSection projects={projectCards} />

      {/* 03 - PERSONAL PROJECTS (EXPERIMENTS & INDEPENDENT BUILDS) */}
      <PersonalProjectsSection personalProjects={personalProjectCards} />

      {/* 04 - ABOUT ME */}
      <AboutSection aboutContent={settings?.aboutContent} />

      {/* 05 - TOOLS & TECHNOLOGIES */}
      <StackPreview skillSections={skillSections} />

      {/* 06 - EXPERIENCE & EDUCATION */}
      <ExperienceEducationPreview
        experienceItems={experiencePreviewItems}
        educationItems={educationPreviewItems}
      />

      {/* 07 - CONTACT CTA */}
      <ContactCTASection />

    </div>
  );
}
