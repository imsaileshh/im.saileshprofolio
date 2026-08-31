import { SectionReveal } from '@/components/ui/SectionReveal';
import { prisma } from '@/lib/database/prisma';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { AboutSection } from '@/components/home/AboutSection';
import { StackPreview } from '@/components/home/StackPreview';
import { HomeHero } from '@/components/home/HomeHero';
import { ExperienceEducationPreview } from '@/components/home/ExperienceEducationPreview';
import { HireMeCTAButton } from '@/components/hire/HireMeCTAButton';
import { LetsTalkButton } from '@/components/hire/LetsTalkButton';

function formatYearRange(startDate: Date, endDate?: Date | null) {
  const start = startDate.getFullYear();
  const end = endDate ? endDate.getFullYear() : 'Present';
  return `${start} - ${end}`;
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [workProjects, experienceItems, educationItems] = await Promise.all([
    prisma.project.findMany({
      where: { featured: true, published: true, archived: false },
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
  ]);

  const projectCards = workProjects.map((project, index) => ({
    ...project,
    coverUrl: project.images.find((image) => image.isCover)?.url ?? project.images[0]?.url ?? `/images/projects/project${(index % 4) + 1}.svg`,
    category: project.category ?? project.technologies[0] ?? 'Project',
    year: project.year ?? project.createdAt.getFullYear().toString(),
  }));

  const experiencePreviewItems = experienceItems.map((item) => ({
    year: formatYearRange(item.startDate, item.endDate),
    role: item.role,
    company: item.company,
    description: item.description.join(' '),
  }));

  const educationPreviewItems = educationItems.map((item) => ({
    year: formatYearRange(item.startDate, item.endDate),
    role: item.degree,
    company: item.institution,
    description: item.description ?? item.field ?? 'No description available.',
  }));

  return (
    <div className="flex flex-col">
      {/* 01 - INTRODUCTION */}
      <HomeHero />

      {/* 02 - PROJECTS */}
      <ProjectsSection projects={projectCards} />

      {/* 03 - ABOUT ME */}
      <AboutSection />

      {/* 04 - STACK PREVIEW */}
      <StackPreview />

      {/* 05 - EXPERIENCE & EDUCATION */}
      <ExperienceEducationPreview
        experienceItems={experiencePreviewItems}
        educationItems={educationPreviewItems}
      />

      {/* 06 - CONTACT CTA */}
      <SectionReveal id="contact-cta" className="pt-10 md:pt-14 lg:pt-16 pb-14 md:pb-16 px-5 sm:px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-3">
              Let's work together
            </h2>
            <p className="text-muted text-base md:text-lg max-w-xl">
              Have a project, collaboration or idea in mind? Send me a message.
            </p>
          </div>
          <HireMeCTAButton />
        </div>
      </SectionReveal>

    </div>
  );
}
