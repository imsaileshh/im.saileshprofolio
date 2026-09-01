import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Globe, Sparkles, Terminal } from 'lucide-react';
import { prisma } from '@/lib/database/prisma';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = {
  title: 'Personal Projects | Sailesh P',
  description: 'Explorations, experiments, open source tools, and side projects built with modern technologies.',
};

export const dynamic = 'force-dynamic';

export default async function PersonalProjectsPage() {
  // Query personal projects and open source experiments from DB
  const dbProjects = await prisma.project.findMany({
    where: {
      published: true,
      archived: false,
      OR: [
        { projectType: 'Personal Project' },
        { projectType: 'Open Source' },
      ],
    },
    include: { images: { orderBy: { order: 'asc' } } },
    orderBy: { orderIndex: 'asc' },
  });

  // Fallback high-craft personal side projects if database has none flagged as Personal Project yet
  const fallbackPersonalProjects = [
    {
      id: 'personal-1',
      title: 'DevScope — Developer Analytics CLI',
      slug: 'devscope-cli',
      category: 'CLI TOOL / DEVTOOLS',
      year: '2025',
      description: 'A lightning-fast terminal tool for visualizing Git contributions, commit velocity, and code review trends.',
      technologies: ['TypeScript', 'Rust', 'Node.js'],
      coverUrl: '/images/projects/project1.svg',
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com',
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
    },
  ];

  const projects = dbProjects.length > 0
    ? dbProjects.map((p, idx) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        category: p.category ?? (p.projectType || 'PERSONAL PROJECT'),
        year: p.year ?? p.createdAt.getFullYear().toString(),
        description: p.shortDescription ?? p.description,
        technologies: p.technologies,
        coverUrl: p.images.find((img) => img.isCover)?.url ?? p.images[0]?.url ?? `/images/projects/project${(idx % 4) + 1}.svg`,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
      }))
    : fallbackPersonalProjects;

  return (
    <div className="flex flex-col p-5 sm:p-6 md:p-10 lg:p-14 pb-20 max-w-7xl mx-auto w-full">
      
      {/* ── Page Header ── */}
      <div className="mb-10 sm:mb-12 md:mb-14">
        <SectionHeader icon={Terminal} label="PERSONAL PROJECTS" className="!mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-3">
            Personal Projects
          </h1>
          <p className="text-[15px] sm:text-base md:text-lg text-muted max-w-2xl font-normal leading-relaxed">
            Independent experiments, developer utilities, creative explorations, and open-source tools I build in my free time.
          </p>
        </SectionHeader>
      </div>

      {/* ── Personal Projects Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col rounded-[22px] bg-[var(--card)] border border-border-subtle/80 hover:border-border-subtle p-3.5 sm:p-4 pb-5 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)] text-left"
          >
            {/* Project Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-[#111214] mb-4">
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Year Pill Badge */}
              <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/45 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-white/90 shadow-sm z-10">
                {project.year}
              </div>
            </div>

            {/* Category / Taxonomy */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-muted font-medium group-hover:text-accent transition-colors duration-200 truncate">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[17px] sm:text-[18px] font-display font-semibold tracking-tight text-foreground leading-snug transition-colors duration-200 group-hover:text-accent mb-2">
              {project.title}
            </h2>

            {/* Description */}
            <p className="text-[13.5px] sm:text-[14px] text-muted leading-relaxed font-normal mb-5 flex-1 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies Badges */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.slice(0, 3).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-[var(--sidebar)] border border-border-subtle/60 text-[11px] font-mono text-muted/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Compact Action Buttons */}
            <div className="flex items-center gap-2.5 pt-1 mt-auto border-t border-border-subtle/50">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-foreground text-[var(--bg)] text-[12.5px] font-medium tracking-tight hover:brightness-95 active:scale-[0.98] transition-all duration-200"
              >
                <span>Details</span>
                <ArrowUpRight size={14} />
              </Link>

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-transparent text-foreground border border-border-subtle hover:border-foreground/30 hover:bg-border-subtle/20 text-[12.5px] font-medium tracking-tight active:scale-[0.98] transition-all duration-200"
                  aria-label="GitHub Repository"
                >
                  <Github size={13} className="opacity-75" />
                  <span>Code</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-transparent text-foreground border border-border-subtle hover:border-foreground/30 hover:bg-border-subtle/20 text-[12.5px] font-medium tracking-tight active:scale-[0.98] transition-all duration-200"
                  aria-label="Live Demo"
                >
                  <Globe size={13} className="opacity-75" />
                  <span>Live</span>
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
