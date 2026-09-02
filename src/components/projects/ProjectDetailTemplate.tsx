'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe } from 'lucide-react';
import { getTechLogo } from '@/lib/stack/tech-logos';

export interface ProjectDetailData {
  id: string;
  title: string;
  slug: string;
  description: string;
  longText?: string | null;
  projectType?: string;
  category?: string | null;
  year?: string | null;
  role?: string | null;
  client?: string | null;
  technologies: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  coverUrl: string;
  galleryUrls?: string[];
  caseStudy?: {
    slug: string;
    status: string;
  } | null;
  customGlowColor?: string | null;
}

export interface AdjacentProject {
  title: string;
  slug: string;
  category?: string | null;
}

interface ProjectDetailTemplateProps {
  project: ProjectDetailData;
  prevProject?: AdjacentProject | null;
  nextProject?: AdjacentProject | null;
  backHref: string;
  backLabel: string;
}

export function ProjectDetailTemplate({
  project,
  prevProject,
  nextProject,
  backHref,
  backLabel,
}: ProjectDetailTemplateProps) {
  const category = project.category || (project.projectType === 'Personal Project' ? 'CLI / DEVTOOL' : 'SELECTED WORK');
  const year = project.year || '2025';
  const role = project.role || (project.projectType === 'Personal Project' ? 'Independent Creator / Developer' : 'Lead Designer & Developer');
  const gallery = project.galleryUrls || [];

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-foreground selection:bg-accent/20">
      
      {/* ── 01. Subtle Ambient Radial Background Glow ── */}
      {project.customGlowColor ? (
        <div 
          className="pointer-events-none absolute inset-x-0 top-0 h-[800px] opacity-70 mix-blend-screen dark:mix-blend-lighten animate-pulse" 
          style={{
            background: `radial-gradient(circle 800px at 50% -100px, ${project.customGlowColor}, transparent 80%)`
          }}
          aria-hidden="true" 
        />
      ) : (
        <div 
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(79,140,255,0.04),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent)]" 
          aria-hidden="true" 
        />
      )}

      {/* ── 02. Sticky Top Project Bar ── */}
      <div className="sticky top-0 z-50 w-full border-b border-border-subtle/80 bg-[var(--bg)]/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[60px] max-w-[1180px] items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16">
          
          {/* Left: Back Button */}
          <div className="flex-1 flex items-center gap-5">
            <Link
              href={backHref}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle/80 bg-[var(--card)] hover:bg-border-subtle/20 text-xs sm:text-sm font-semibold text-foreground transition-all shadow-sm shrink-0"
            >
              <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
              <span className="hidden xs:inline">{backLabel.replace('Back to ', 'Back')}</span>
              <span className="xs:hidden">Back</span>
            </Link>
            <div className="h-6 w-px bg-border-subtle/50 hidden sm:block" />
          </div>

          {/* Center: Project Title */}
          <div className="hidden sm:flex flex-1 justify-center px-3 text-center overflow-hidden">
            <span className="block truncate text-sm font-semibold text-muted tracking-wide max-w-[200px] sm:max-w-[360px] md:max-w-[480px]">
              {project.title}
            </span>
          </div>

          {/* Right: Year / Category Meta */}
          <div className="flex-1 flex justify-end items-center gap-5">
            <div className="h-6 w-px bg-border-subtle/50 hidden sm:block" />
            <div className="flex items-center gap-2 text-right shrink-0">
              <span className="font-semibold text-sm text-muted">
                {year}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 03. Main Editorial Content Area ── */}
      <main className="relative mx-auto max-w-[1180px] px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 space-y-10 sm:space-y-14">
        
        {/* Project Header (Centered Alignment & Tight Spacing) */}
        <header className="space-y-4 sm:space-y-5 text-center max-w-3xl mx-auto flex flex-col items-center">
          {/* Category & Year Tag */}
          <div className="flex items-center justify-center gap-2 font-mono text-xs tracking-wider uppercase text-accent font-semibold">
            <span>{category}</span>
            <span className="text-muted/40 font-mono text-xs">&bull;</span>
            <span className="text-muted/80">{year}</span>
            {project.client && (
              <>
                <span className="text-muted/40">&bull;</span>
                <span className="text-muted/80">{project.client}</span>
              </>
            )}
          </div>

          {/* Large Project Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-display font-semibold tracking-tight text-foreground leading-[1.06] text-center">
            {project.title}
          </h1>

          {/* Description */}
          {project.description && (
            <p className="text-base sm:text-lg text-muted leading-relaxed font-normal max-w-[660px] text-center mx-auto">
              {project.description}
            </p>
          )}

          {/* Technology Badges with Central Stack SVG Logos */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              {project.technologies.map((tech) => {
                const logo = getTechLogo(tech);

                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--card)] border border-border-subtle text-xs font-mono text-foreground shadow-xs"
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

          {/* Action Buttons: Live Project / GitHub */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-[var(--bg)] px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
              >
                <Globe size={15} />
                <span>Live Project</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--card)] text-foreground border border-border-subtle hover:border-foreground/30 hover:bg-[var(--nav-active)] px-5 py-2.5 rounded-xl text-sm font-medium active:scale-[0.98] transition-all shadow-xs"
              >
                <Github size={15} />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </header>

        {/* ── 04. Hero / Main Project Image (Compact Framed Showcase Container) ── */}
        {project.coverUrl && (
          <section className="w-full max-w-[960px] mx-auto rounded-2xl border border-border-subtle/80 bg-[var(--card)] p-1.5 shadow-sm">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/5 dark:bg-black/50 border border-border-subtle/40">
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                className="object-contain sm:object-cover"
                priority
                sizes="(max-width: 960px) 100vw, 960px"
              />
            </div>
          </section>
        )}

        {/* ── 05. Project Content & Two-Column Specs ── */}
        <section className="space-y-10 sm:space-y-14 pt-2">
          
          {/* Row 1: Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 border-t border-border-subtle/60 pt-8 sm:pt-10">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-accent">
                01 / OVERVIEW
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground tracking-tight mt-1">
                About the project
              </h2>
            </div>

            <div className="md:col-span-8">
              <div className="prose dark:prose-invert max-w-none text-base sm:text-lg text-muted/90 leading-relaxed font-normal">
                {project.longText ? (
                  <div dangerouslySetInnerHTML={{ __html: project.longText }} />
                ) : (
                  <p>{project.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10 border-t border-border-subtle/60 pt-8 sm:pt-10">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-accent">
                02 / PROJECT INFO
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-foreground tracking-tight mt-1">
                Role & Specifications
              </h2>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-muted font-medium">ROLE</span>
                <p className="text-sm sm:text-base font-medium text-foreground">{role}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-muted font-medium">PROJECT TYPE</span>
                <p className="text-sm sm:text-base font-medium text-foreground">{project.projectType || 'Independent Project'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-muted font-medium">RELEASE YEAR</span>
                <p className="text-sm sm:text-base font-medium text-foreground">{year}</p>
              </div>

              {project.client && (
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted font-medium">CLIENT</span>
                  <p className="text-sm sm:text-base font-medium text-foreground">{project.client}</p>
                </div>
              )}

              <div className="sm:col-span-2 space-y-1 pt-1">
                <span className="text-xs font-mono uppercase tracking-wider text-muted font-medium">TECHNOLOGIES</span>
                <p className="text-sm sm:text-base text-muted/90 leading-relaxed font-mono text-xs">
                  {project.technologies?.join(' · ') || 'TypeScript · React · Tailwind CSS'}
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: Optional Linked Case Study Banner */}
          {project.caseStudy && project.caseStudy.status === 'PUBLISHED' && (
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-accent uppercase font-semibold">
                  CASE STUDY
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground">
                  A deeper look into the design process
                </h3>
                <p className="text-sm text-muted max-w-xl leading-relaxed">
                  Explore UX research, design systems, wireframe iterations, and interactive prototype testing.
                </p>
              </div>
              <Link
                href={`/case-studies/${project.caseStudy.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-medium text-sm transition-all shadow-md active:scale-95 shrink-0"
              >
                <span>View Full Case Study</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          )}

        </section>

        {/* ── 06. Gallery Showcase (if available) ── */}
        {gallery.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-border-subtle/60">
            <div>
              <span className="text-xs font-mono font-semibold tracking-widest uppercase text-accent">
                03 / INTERFACE GALLERY
              </span>
              <h2 className="text-2xl font-display font-semibold text-foreground tracking-tight mt-1">
                Visual Artifacts & Screenshots
              </h2>
            </div>

            <div className="space-y-5 max-w-[960px] mx-auto">
              {/* Primary large image */}
              <div className="w-full rounded-2xl border border-border-subtle/80 bg-[var(--card)] p-1.5 shadow-sm">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/5 dark:bg-black/50 border border-border-subtle/40">
                  <Image
                    src={gallery[0]}
                    alt={`${project.title} preview 1`}
                    fill
                    className="object-contain sm:object-cover"
                  />
                </div>
              </div>

              {/* Remaining images in 2-column grid */}
              {gallery.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {gallery.slice(1).map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border-subtle/80 bg-[var(--card)] p-1.5 shadow-sm"
                    >
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/5 dark:bg-black/50 border border-border-subtle/40">
                        <Image
                          src={imgUrl}
                          alt={`${project.title} preview ${idx + 2}`}
                          fill
                          className="object-contain sm:object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── 07. Previous / Next Project Navigation ── */}
        <nav className="border-t border-border-subtle/60 pt-8 sm:pt-12 mt-12 sm:mt-16">
          <div className="flex items-center justify-between gap-6">
            {prevProject ? (
              <Link
                href={`${backHref}/${prevProject.slug}`}
                className="group flex flex-col items-start gap-1 max-w-[45%]"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wider group-hover:text-accent transition-colors">
                  <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1" />
                  <span>Previous Project</span>
                </span>
                <span className="text-base sm:text-lg font-display font-medium text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                  {prevProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`${backHref}/${nextProject.slug}`}
                className="group flex flex-col items-end gap-1 max-w-[45%] text-right ml-auto"
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted uppercase tracking-wider group-hover:text-accent transition-colors">
                  <span>Next Project</span>
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="text-base sm:text-lg font-display font-medium text-foreground line-clamp-1 group-hover:text-accent transition-colors">
                  {nextProject.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>

      </main>
    </div>
  );
}
