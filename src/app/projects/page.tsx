import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { prisma } from '@/lib/database/prisma';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

export const metadata = {
  title: 'Projects | Sailesh P',
  description: 'A collection of selected works and technical projects.',
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true, archived: false },
    include: { images: { orderBy: { order: 'asc' } } },
    orderBy: { orderIndex: 'asc' },
  });

  const categories = [
    'All',
    ...Array.from(
      new Set(projects.map((project) => project.category ?? project.technologies[0]).filter(Boolean)),
    ),
  ];

  return (
    <div className="flex flex-col p-5 sm:p-6 md:p-10 lg:p-14 pb-20">
      <SectionReveal className="mb-8 md:mb-10 border-b border-border-subtle pb-6">
        <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-4">
          Projects
        </h1>
        <p className="text-lg text-muted max-w-2xl">
          Experiments, tools and products I've built while exploring ideas and technologies.
        </p>
      </SectionReveal>

      {/* Optional Filters */}
      <SectionReveal className="flex flex-wrap gap-2 mb-8 md:mb-10">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              idx === 0 
                ? 'bg-foreground text-[var(--bg)]' 
                : 'border border-border-subtle text-muted hover:text-foreground hover:bg-border-subtle/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </SectionReveal>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        {projects.map((project, idx) => {
          const coverUrl = project.images.find((image) => image.isCover)?.url ?? project.images[0]?.url ?? `/images/projects/project${(idx % 4) + 1}.svg`;
          const category = project.category ?? project.technologies[0] ?? 'Project';
          const year = project.year ?? project.createdAt.getFullYear().toString();

          return (
          <StaggerItem key={project.id || idx}>
            <Link href={`/projects/${project.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl h-full">
              <div className="flex flex-col gap-4 group p-5 rounded-2xl bg-[var(--card)] border border-border-subtle hover:border-muted/50 hover:-translate-y-1 transition-all duration-300 h-full">
                
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-border-subtle/50 mb-2">
                  <Image 
                    src={coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <div className="flex items-center gap-2 text-[10px] font-bold text-muted uppercase tracking-widest">
                  <span>{year}</span>
                  <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
                  <span>{category}</span>
                </div>
                
                <h2 className="text-xl font-display font-medium group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                
                <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-4 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                    <span key={i} className="text-[10px] px-2 py-1 rounded bg-[var(--bg)] border border-border-subtle text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto pt-4 border-t border-border-subtle/50 flex items-center text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  View Project 
                  <ArrowUpRight size={16} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </StaggerItem>
        );
        })}
      </StaggerContainer>
    </div>
  );
}
