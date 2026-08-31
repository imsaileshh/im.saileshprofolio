import { SectionReveal } from '@/components/ui/SectionReveal';
import { prisma } from '@/lib/database/prisma';
import { ProjectsSection } from '@/components/home/ProjectsSection';
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
  const [workProjects, experienceItems, educationItems, settings, skillSections] = await Promise.all([
    prisma.project.findMany({
      where: { published: true, archived: false },
      include: { images: { orderBy: { order: 'asc' } } },
      orderBy: { orderIndex: 'asc' },
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

  const projectCards = workProjects.map((project, index) => ({
    ...project,
    coverUrl: project.images.find((image) => image.isCover)?.url ?? project.images[0]?.url ?? `/images/projects/project${(index % 4) + 1}.svg`,
    category: project.category ?? project.technologies[0] ?? 'Project',
    year: project.year ?? project.createdAt.getFullYear().toString(),
  }));

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
      {/* 01 - INTRODUCTION */}
      <HomeHero heroContent={settings?.heroContent} />

      {/* 02 - PROJECTS */}
      <ProjectsSection projects={projectCards} />

      {/* 03 - ABOUT ME */}
      <AboutSection aboutContent={settings?.aboutContent} />

      {/* 04 - STACK PREVIEW */}
      <StackPreview skillSections={skillSections} />

      {/* 05 - EXPERIENCE & EDUCATION */}
      <ExperienceEducationPreview
        experienceItems={experiencePreviewItems}
        educationItems={educationPreviewItems}
      />

      {/* 06 - CONTACT CTA */}
      <ContactCTASection />

    </div>
  );
}
