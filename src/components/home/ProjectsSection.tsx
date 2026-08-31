'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectModal } from '@/components/projects/ProjectModal';

// ─── Cinematic Card ───────────────────────────────────────────────────────────
function CinematicCard({
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
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-12% 0px -12% 0px' });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const techBadges = project.technologies?.slice(0, 3) ?? [];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="relative"
    >
      {/* Index label */}
      <div className="absolute -top-3 left-0 z-10 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted/50 uppercase select-none">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.993 }}
        className="group w-full text-left block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[18px]"
        aria-label={`Open ${project.title}`}
      >
        {/* Card shell — adapts to theme */}
        <div className="relative rounded-[18px] overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-[0_4px_24px_rgba(0,0,0,0.18)]">

          {/* ── Full-bleed cinematic image ── */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ scale: imageScale, y: imageY }}
            >
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>

            {/* Cinematic vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Category + year pill — top left */}
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 bg-white/10 backdrop-blur-md border border-white/10">
                {project.category}
              </span>
            </div>

            {/* Year pill — top right */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold text-white/70 bg-black/30 backdrop-blur-md border border-white/10">
                {project.year || '2025'}
              </span>
            </div>

            {/* Bottom meta overlay (slides up on hover) */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <div className="flex items-end justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[22px] md:text-[26px] font-display font-semibold text-white leading-tight tracking-tight truncate">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-[13px] mt-1 line-clamp-2 leading-relaxed">
                    {project.shortDescription ?? project.description ?? ''}
                  </p>
                </div>

                {/* Arrow caret */}
                <motion.div
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.4, delay: index * 0.06 + 0.2 }}
                  className="shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-300"
                >
                  <ExternalLink size={15} className="text-white" />
                </motion.div>
              </div>

              {/* Tech tags */}
              {techBadges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {techBadges.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium text-white/60 bg-white/8 border border-white/10 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {(project.technologies?.length ?? 0) > 3 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-white/40 bg-white/5 border border-white/8">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function ProjectsSection({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  // Split projects: featured large card + grid
  const [featured, ...rest] = projects;

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

      {/* ── Layout: Large featured + side grid ── */}
      {projects.length > 0 ? (
        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-5">
          {/* Featured (left/top) — taller */}
          {featured && (
            <div className="lg:row-span-2">
              <CinematicCard
                project={featured}
                index={0}
                total={projects.length}
                onClick={() => setSelectedProject(featured)}
              />
            </div>
          )}

          {/* Rest (right/bottom stacked) */}
          {rest.map((project, i) => (
            <CinematicCard
              key={project.id ?? i}
              project={project}
              index={i + 1}
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
