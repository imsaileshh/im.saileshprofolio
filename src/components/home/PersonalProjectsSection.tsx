'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Code2, ExternalLink, Github, Globe, Star, Terminal } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ease = [0.22, 1, 0.36, 1] as const;

export type PersonalProjectItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category?: string | null;
  year?: string | null;
  technologies?: string[];
  coverUrl: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  featured?: boolean;
};

function PersonalProjectHomeCard({
  project,
  index,
}: {
  project: PersonalProjectItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="flex"
    >
      <div className="group relative flex flex-col rounded-[22px] bg-[var(--card)] border border-border-subtle/80 hover:border-border-subtle p-3.5 sm:p-4 pb-5 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)] text-left w-full">
        
        {/* ── Top: Visual Image Preview ── */}
        <Link
          href={`/projects/${project.slug}`}
          className="relative w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-[#111214] mb-4 block"
        >
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top-Right Year Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 text-[10.5px] font-mono font-medium text-white/90 shadow-sm z-10">
            {project.year || '2025'}
          </div>

          {/* Top-Left Featured Badge (only if featured) */}
          {project.featured && (
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-amber-400/20 backdrop-blur-md border border-amber-400/30 text-[10.5px] font-mono font-semibold text-amber-200 shadow-sm z-10 flex items-center gap-1">
              <Star size={10} className="fill-amber-300 text-amber-300" />
              <span>Featured</span>
            </div>
          )}
        </Link>

        {/* ── Category / Tag ── */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-muted font-medium group-hover:text-accent transition-colors duration-200 truncate">
            {project.category || 'PERSONAL PROJECT'}
          </span>
        </div>

        {/* ── Title ── */}
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-[17px] sm:text-[18px] font-display font-semibold tracking-tight text-foreground leading-snug transition-colors duration-200 group-hover:text-accent mb-2 line-clamp-1">
            {project.title}
          </h3>
        </Link>

        {/* ── Description ── */}
        <p className="text-[13.5px] sm:text-[14px] text-muted leading-relaxed font-normal mb-4 flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* ── Tech Stack Tags ── */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-[var(--sidebar)] border border-border-subtle/60 text-[10.5px] font-mono text-muted"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono text-muted/60 self-center">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        )}

        {/* ── Footer Actions ── */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-border-subtle/50">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                title="GitHub Repository"
                className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-border-subtle/20 transition-colors"
              >
                <Github size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                title="Live URL"
                className="p-1.5 rounded-lg text-muted hover:text-accent hover:bg-accent/10 transition-colors"
              >
                <Globe size={14} />
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-foreground hover:text-accent transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

export function PersonalProjectsSection({
  personalProjects,
}: {
  personalProjects: PersonalProjectItem[];
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  if (!personalProjects || personalProjects.length === 0) return null;

  return (
    <section
      id="personal-projects"
      className="relative py-10 md:py-14 lg:py-16 px-5 sm:px-6 md:px-10 lg:px-16"
    >
      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-12"
      >
        <SectionHeader icon={Terminal} label="PERSONAL PROJECTS" className="!mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-display font-semibold tracking-tight text-foreground leading-[1.1]">
            Personal Projects
          </h2>
          <p className="text-muted text-[15px] md:text-base mt-2 max-w-md">
            Independent projects, experiments, and things I build.
          </p>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.55, delay: 0.15, ease }}
        >
          <Link
            href="/personal-projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--card)] border border-border-subtle text-[13px] font-semibold text-foreground hover:bg-[var(--nav-active)] hover:border-muted/40 hover:-translate-y-[2px] transition-all duration-200"
          >
            All Personal Projects
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>

      {/* ── 3-Column Desktop Grid / 2-Col Tablet / 1-Col Mobile ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full">
        {personalProjects.slice(0, 3).map((project, i) => (
          <PersonalProjectHomeCard
            key={project.id}
            project={project}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
