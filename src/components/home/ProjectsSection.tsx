'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectModal } from '@/components/projects/ProjectModal';

function CinematicStickyCard({
  project,
  index,
  total,
  onClick,
}: {
  project: any;
  index: number;
  total: number;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.8, 0]);
  const filter = useTransform(scrollYProgress, [0, 1], ['brightness(1)', 'brightness(0.3)']);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  const techBadges = project.technologies?.slice(0, 4) ?? [];

  return (
    <div ref={containerRef} className="h-[130vh] w-full relative -mt-[30vh] first:mt-0">
      <div className="sticky top-[10vh] md:top-[12vh] w-full h-[65vh] md:h-[75vh] flex items-center justify-center">
        <motion.div 
          style={{ scale, opacity, filter, y }} 
          className="w-full h-full relative origin-top"
        >
          <button
            onClick={onClick}
            className="group w-full h-full text-left block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-3xl"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={project.coverUrl || `/images/projects/project${(index % 4) + 1}.svg`}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 z-10">
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--accent)]/60"></span>
                <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white/90 bg-white/10 backdrop-blur-md border border-white/10">
                  {project.category ?? 'Project'}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10 lg:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  
                  <div className="flex-1 max-w-3xl">
                    <h3 className="text-3xl md:text-4xl lg:text-[44px] font-display font-medium text-white tracking-tight leading-[1.1] mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-[15px] md:text-base text-white/70 leading-relaxed line-clamp-2 md:line-clamp-3 mb-6 max-w-2xl">
                      {project.shortDescription ?? project.description}
                    </p>
                    
                    {techBadges.length > 0 && (
                      <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
                        {techBadges.map((tech: string, i: number, arr: string[]) => (
                          <span key={tech} className="text-[13px] font-medium text-white/50">
                            {tech}{i < arr.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[var(--accent)] transition-colors duration-300">
                    View Project 
                    <ArrowUpRight size={18} className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ProjectsSection({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  // We render all projects in the cinematic stack

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-12 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16"
    >
      {/* ── Section header ── */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-[18px] h-px bg-[var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase font-semibold">
              Selected Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-semibold tracking-tight text-[var(--text)] leading-[1.1]">
            Projects
          </h2>
          <p className="text-[var(--muted)] text-[15px] md:text-base mt-2 max-w-sm">
            A curated collection of work that tells a story.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--card)] border border-[var(--border)] text-[13px] font-semibold text-[var(--text)] hover:bg-[var(--nav-active)] hover:border-[var(--muted)]/40 hover:-translate-y-[2px] transition-all duration-200"
          >
            All Projects
            <ArrowUpRight size={15} className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>

      {/* ── Layout: Cinematic Sticky Stack ── */}
      {projects.length > 0 ? (
        <div className="flex flex-col relative w-full pb-20">
          {projects.map((project, i) => (
            <CinematicStickyCard
              key={project.id ?? i}
              project={project}
              index={i}
              total={projects.length}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-[var(--muted)] text-sm">No featured projects yet.</p>
        </div>
      )}

      {/* ── Modal ── */}
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
