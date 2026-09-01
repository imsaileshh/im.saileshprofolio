'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectGridCard({
  project,
  index,
  onClick,
}: {
  project: any;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="flex shrink-0 w-[84vw] max-w-[320px] snap-center md:w-full md:max-w-none"
    >
      <button
        onClick={onClick}
        className="group relative w-full flex flex-col rounded-[22px] bg-[var(--card)] border border-border-subtle/80 hover:border-border-subtle p-3.5 sm:p-4 pb-5 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-[0_14px_40px_rgba(0,0,0,0.25)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent overflow-hidden"
      >
        {/* ── Top: Visual Image Container ── */}
        <div className="relative w-full aspect-square rounded-[16px] overflow-hidden bg-[#111214] mb-4">
          <Image
            src={project.coverUrl || `/images/projects/project${(index % 4) + 1}.svg`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top-Right Year Pill Badge (Matching Reference) */}
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg bg-black/45 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-white/90 shadow-sm z-10">
            {project.year || '2024'}
          </div>
        </div>

        {/* ── Bottom: Category Label + Arrow Action ── */}
        <div className="flex items-center justify-between gap-3 w-full mb-1">
          <span className="text-[11px] font-mono tracking-[0.14em] uppercase text-muted font-medium transition-colors duration-200 group-hover:text-accent truncate">
            {project.category || 'CASE STUDY'}
          </span>

          <div className="w-7 h-7 rounded-full border border-border-subtle/80 flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-200 shrink-0">
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        {/* ── Project Title ── */}
        <h3 className="text-[17px] sm:text-[18px] font-display font-semibold tracking-tight text-foreground leading-snug transition-colors duration-200 group-hover:text-accent line-clamp-1">
          {project.title}
        </h3>
      </button>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ProjectsSection({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  return (
    <section
      id="projects"
      className="relative py-10 md:py-14 lg:py-16 px-5 sm:px-6 md:px-10 lg:px-16 overflow-hidden md:overflow-visible"
    >
      {/* ── Section header ── */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-12">
        <SectionHeader icon={Briefcase} label="SELECTED WORK" className="!mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-display font-semibold tracking-tight text-foreground leading-[1.1]">
            Projects
          </h2>
          <p className="text-muted text-[15px] md:text-base mt-2 max-w-sm">
            A curated collection of work that tells a story.
          </p>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.55, delay: 0.15, ease }}
          className="hidden md:block"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--card)] border border-border-subtle text-[13px] font-semibold text-foreground hover:bg-[var(--nav-active)] hover:border-muted/40 hover:-translate-y-[2px] transition-all duration-200"
          >
            All Projects
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200"
            />
          </Link>
        </motion.div>
      </div>

      {/* ── Layout: Swipeable on Mobile, 3-Column Grid on Tablet/Desktop ── */}
      {projects.length > 0 ? (
        <div className="w-full">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4.5 pb-4 -mx-5 px-5 sm:-mx-6 sm:px-6 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-7 md:mx-0 md:px-0 md:pb-0">
            {projects.map((project, i) => (
              <ProjectGridCard
                key={project.id ?? i}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

          {/* Mobile All Projects CTA */}
          <div className="flex md:hidden justify-center mt-6">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--card)] border border-border-subtle text-[13px] font-semibold text-foreground hover:bg-[var(--nav-active)] transition-all duration-200"
            >
              All Projects
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200"
              />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-border-subtle rounded-2xl">
          <p className="text-muted text-sm">No featured projects yet.</p>
        </div>
      )}

      {/* ── Project Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
