'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Github, Globe, Laptop } from 'lucide-react';
import Link from 'next/link';
import { PrototypePreviewModal } from '@/components/case-study/PrototypePreviewModal';
import { getTechLogo } from '@/lib/stack/tech-logos';

interface ProjectDetailHeaderProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    projectType?: string;
    category?: string | null;
    year?: string | null;
    technologies: string[];
    liveUrl?: string | null;
    githubUrl?: string | null;
    figmaUrl?: string | null;
    role?: string | null;
    client?: string | null;
  };
  backHref?: string;
  backLabel?: string;
}

export function ProjectDetailHeader({
  project,
  backHref = '/works',
  backLabel = 'Back to Works',
}: ProjectDetailHeaderProps) {
  const [previewState, setPreviewState] = useState<{ isOpen: boolean; url: string; title: string } | null>(null);

  const prototypeUrl = project.figmaUrl || (project.liveUrl?.includes('figma.com') || project.liveUrl?.includes('proto') ? project.liveUrl : null);
  const category = project.category || (project.projectType === 'Personal Project' ? 'CLI / DEVTOOL' : 'SELECTED WORK');
  const year = project.year || '2025';

  return (
    <header className="mb-10 sm:mb-14 md:mb-16">
      {/* ── 01. Back Navigation ── */}
      <div className="mb-8 md:mb-10">
        <Link 
          href={backHref} 
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>{backLabel}</span>
        </Link>
      </div>

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center space-y-5 sm:space-y-6">
        {/* ── 02. Taxonomy / Type & Year ── */}
        <div className="flex items-center justify-center gap-2.5 font-mono text-xs tracking-wider uppercase text-accent font-semibold">
          <span>{category}</span>
          <span className="text-muted/40">&bull;</span>
          <span className="text-muted/80">{year}</span>
          {project.client && (
            <>
              <span className="text-muted/40">&bull;</span>
              <span className="text-muted/80">{project.client}</span>
            </>
          )}
        </div>

        {/* ── 03. Large Editorial Title ── */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight text-foreground leading-[1.08] text-center">
          {project.title}
        </h1>

        {/* ── 04. Description ── */}
        {project.description && (
          <p className="text-base sm:text-lg md:text-xl text-muted leading-relaxed font-normal max-w-2xl text-center mx-auto">
            {project.description}
          </p>
        )}

        {/* ── 05. Tech Stack Pills with Central Stack SVG Logos ── */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {project.technologies.map((tech) => {
              const logo = getTechLogo(tech);

              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--card)] border border-border-subtle/80 text-xs font-mono text-foreground shadow-xs"
                >
                  {logo && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={logo.url}
                      alt=""
                      width={13}
                      height={13}
                      className="w-3.5 h-3.5 object-contain shrink-0"
                      style={logo.filter ? { filter: logo.filter } : undefined}
                    />
                  )}
                  <span>{tech}</span>
                </span>
              );
            })}
          </div>
        )}

        {/* ── 06. Action Buttons: Live Project & GitHub ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          {project.liveUrl && (
            <button
              type="button"
              onClick={() => setPreviewState({ isOpen: true, url: project.liveUrl!, title: `${project.title} — Live Preview` })}
              className="inline-flex items-center gap-2 bg-foreground text-[var(--bg)] px-5 py-2.5 rounded-xl text-sm font-medium hover:brightness-95 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
            >
              <Globe size={15} />
              <span>Live Project</span>
              <ArrowUpRight size={14} />
            </button>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--card)] text-foreground border border-border-subtle hover:border-foreground/30 hover:bg-border-subtle/20 px-5 py-2.5 rounded-xl text-sm font-medium active:scale-[0.98] transition-all"
            >
              <Github size={15} />
              <span>GitHub Repository</span>
            </a>
          )}

          {prototypeUrl && (
            <button
              type="button"
              onClick={() => setPreviewState({ isOpen: true, url: prototypeUrl, title: `${project.title} — Figma Prototype` })}
              className="inline-flex items-center gap-2 bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 px-5 py-2.5 rounded-xl text-sm font-medium active:scale-[0.98] transition-all cursor-pointer"
            >
              <Laptop size={15} />
              <span>View Prototype</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive In-App Browser & Prototype Preview Modal */}
      {previewState && previewState.isOpen && (
        <PrototypePreviewModal
          isOpen={previewState.isOpen}
          onClose={() => setPreviewState(null)}
          title={previewState.title}
          prototypeUrl={previewState.url}
          defaultDevice="desktop"
        />
      )}
    </header>
  );
}
