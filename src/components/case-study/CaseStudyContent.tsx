'use client';

import { useEffect, useState } from 'react';
import type { CaseStudy, CaseStudySection } from '@prisma/client';
import { CustomBlockRenderer, ContentBlockItem } from './CustomBlockRenderer';

interface MediaItem {
  url: string;
  type?: 'image' | 'svg' | 'video' | 'pdf';
  caption?: string;
  alt?: string;
  width?: 'full' | 'half' | 'third' | 'contained';
  background?: 'transparent' | 'dark' | 'card';
}

export function CaseStudyContent({
  caseStudy,
}: {
  caseStudy: CaseStudy & { sections: CaseStudySection[] };
}) {
  const sections = (caseStudy.sections || []).filter((section) => {
    const meta = (section.metadata as any) || {};
    const hasBlocks = Array.isArray(meta?.blocks) && meta.blocks.length > 0;
    const hasMedia = (section.images && section.images.length > 0) || (Array.isArray(meta?.media) && meta.media.length > 0);
    const hasContent = Boolean(section.content?.trim());
    const hasStats = Array.isArray(meta?.stats) && meta.stats.length > 0;
    return hasBlocks || hasMedia || hasContent || hasStats || Boolean(section.title?.trim());
  });

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        root: scrollContainer,
        rootMargin: '-20% 0px -75% 0px' 
      }
    );

    const sectionElements = document.querySelectorAll('.case-study-section');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    // Desktop app-like layout main scrolling container
    const container = document.getElementById('scroll-container');
    
    if (element) {
      setActiveSection(id);
      
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const offsetTop = elementRect.top - containerRect.top + container.scrollTop - 96;
        container.scrollTo({ top: offsetTop, behavior: 'smooth' });
      } else {
        // Fallback for mobile / native body scroll
        const y = element.getBoundingClientRect().top + window.scrollY - 96;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 relative z-0">
      {/* Mobile/Tablet TOC */}
      {sections.length > 1 && (
        <details className="group mb-8 block rounded-xl border border-white/10 bg-black/30 lg:hidden">
          <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-bold uppercase tracking-widest text-zinc-300 outline-none">
            Case Study Sections
            <span className="text-zinc-500 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <nav className="flex flex-col gap-2 border-t border-white/10 p-4">
            {sections.map((section: CaseStudySection, idx) => {
              const safeId = section.slug ? section.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `section-${idx}`;
              return (
                <a
                  key={section.id}
                  href={`#${safeId}`}
                  onClick={(e) => {
                    scrollTo(e, safeId);
                    const details = e.currentTarget.closest('details');
                    if (details) details.removeAttribute('open');
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === safeId
                      ? 'bg-white/5 font-semibold text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span
                    className={`font-mono text-xs ${
                      activeSection === safeId ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{section.title}</span>
                </a>
              );
            })}
          </nav>
        </details>
      )}

      {/* Desktop Sticky TOC */}
      {sections.length > 1 && (
        <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block z-50 relative pointer-events-auto max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar pb-4">
          <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-muted">
            Case Study
          </h3>
          <nav className="flex flex-col gap-1">
            {sections.map((section: CaseStudySection, idx) => {
              const safeId = section.slug ? section.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `section-${idx}`;
              return (
                <a
                  key={section.id}
                  href={`#${safeId}`}
                  onClick={(e) => scrollTo(e, safeId)}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer pointer-events-auto ${
                    activeSection === safeId
                      ? 'bg-foreground/5 font-semibold text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  <span
                    className={`font-mono text-xs ${
                      activeSection === safeId
                        ? 'text-accent'
                        : 'text-muted/60 group-hover:text-muted'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{section.title}</span>
                </a>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main Content Area */}
      <article className="min-w-0 flex-1 space-y-20 sm:space-y-24 pb-32 relative z-0 pointer-events-auto">
        {sections.map((section: CaseStudySection, idx) => {
          const metadata = (section.metadata as any) || {};
          const mediaItems: MediaItem[] =
            metadata?.media ||
            (section.images || []).map((url) => ({
              url,
              type: url.endsWith('.svg') ? 'svg' : 'image',
            }));
          const stats: Array<{ value: string; label: string }> = metadata?.stats || [];
          const subtitle: string = metadata?.subtitle || '';
          const layout: string = metadata?.layout || 'full_width';
          const blocks: ContentBlockItem[] = metadata?.blocks || [];

          // Layout CSS classes
          let layoutContainerClass = 'space-y-8';
          if (layout === 'two_column') {
            layoutContainerClass = 'grid gap-8 lg:grid-cols-2 items-start';
          } else if (layout === 'split_text_media') {
            layoutContainerClass = 'grid gap-8 lg:grid-cols-12 items-center';
          } else if (layout === 'split_media_text') {
            layoutContainerClass = 'grid gap-8 lg:grid-cols-12 items-center lg:grid-flow-dense';
          } else if (layout === 'text_focus') {
            layoutContainerClass = 'max-w-2xl mx-auto space-y-6';
          }

          const safeId = section.slug ? section.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `section-${idx}`;

          return (
            <section
              key={section.id}
              id={safeId}
              className="case-study-section scroll-mt-24"
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-accent font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {subtitle && (
                    <span className="text-xs font-mono uppercase tracking-widest text-muted">
                      {subtitle}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold tracking-tight text-foreground">
                  {section.title}
                </h2>
              </div>

              <div className={layoutContainerClass}>
                {/* Standard Section Content */}
                  {section.content && (
                    <div className="prose prose-invert max-w-none text-muted leading-relaxed text-[15px] sm:text-base">
                      {section.content.split('\n').map((paragraph, pIdx) =>
                        paragraph.trim() ? (
                          <p key={pIdx} className="mb-4">
                            {paragraph}
                          </p>
                        ) : null
                      )}
                    </div>
                  )}

                  {/* Stats cards */}
                  {stats && stats.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6">
                      {stats.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className="rounded-2xl border border-border-subtle bg-card p-4 text-center space-y-1 shadow-sm"
                        >
                          <p className="text-2xl sm:text-3xl font-bold font-mono text-accent">
                            {st.value}
                          </p>
                          <p className="text-xs text-muted font-medium">
                            {st.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* DEDICATED CUSTOM CONTENT BLOCKS RENDERING */}
                  {blocks.length > 0 && (
                    <div className="space-y-6 my-8">
                      {blocks.map((blk) => (
                        <CustomBlockRenderer key={blk.id} block={blk} />
                      ))}
                    </div>
                  )}

                  {/* Section Media */}
                  {mediaItems.length > 0 && (
                    <div className="flex flex-wrap gap-6 pt-2">
                      {mediaItems.map((media, mIdx) => {
                        let widthClass = 'w-full';
                        if (media.width === 'half') widthClass = 'w-full sm:w-[calc(50%-0.75rem)]';
                        if (media.width === 'third') widthClass = 'w-full sm:w-[calc(33.33%-1rem)]';

                        let bgClass = 'bg-transparent';
                        if (media.background === 'dark') bgClass = 'bg-[#0b0c0e] p-6 border border-white/[0.08]';
                        if (media.background === 'card') bgClass = 'bg-[var(--card)] p-4 border border-border-subtle';

                        return (
                          <figure key={mIdx} className={`${widthClass} space-y-2`}>
                            <div
                              className={`relative overflow-hidden rounded-2xl ${bgClass} flex items-center justify-center`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={media.url}
                                alt={media.alt || media.caption || `Visual ${mIdx + 1}`}
                                className="max-w-full h-auto object-contain rounded-xl"
                                loading="lazy"
                              />
                            </div>
                            {media.caption && (
                              <figcaption className="text-xs font-mono text-zinc-500 text-center pt-1">
                                {media.caption}
                              </figcaption>
                            )}
                          </figure>
                        );
                      })}
                    </div>
                  )}
                </div>
            </section>
          );
        })}
      </article>
    </div>
  );
}
