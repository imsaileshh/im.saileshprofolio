'use client';

import { useEffect, useState } from 'react';
import type { CaseStudy, CaseStudySection } from '@prisma/client';
import Image from 'next/image';

type MediaSize = 'full' | 'half' | 'original';
type MediaType = 'image' | 'pdf' | 'svg';

type MediaItem = {
  url: string;
  type: MediaType;
  size: MediaSize;
};

export function CaseStudyContent({ caseStudy }: { caseStudy: CaseStudy & { sections: CaseStudySection[] } }) {
  const sections = caseStudy.sections || [];
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sectionElements = document.querySelectorAll('.case-study-section');
    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
      {/* Mobile/Tablet TOC */}
      <details className="group mb-8 block rounded-xl border border-white/10 bg-black/30 lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-bold uppercase tracking-widest text-zinc-300 outline-none">
          Case Study Sections
          <span className="text-zinc-500 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <nav className="flex flex-col gap-2 border-t border-white/10 p-4">
          {sections.map((section: CaseStudySection, idx) => (
            <a
              key={section.id}
              href={`#${section.slug}`}
              onClick={(e) => {
                scrollTo(e, section.slug);
                const details = e.currentTarget.closest('details');
                if (details) details.removeAttribute('open');
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === section.slug
                  ? 'bg-white/5 font-semibold text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className={`font-mono text-xs ${activeSection === section.slug ? 'text-[#4F8CFF]' : 'text-zinc-600'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{section.title}</span>
            </a>
          ))}
        </nav>
      </details>

      {/* Desktop Sticky TOC */}
      <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block">
        <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Case Study</h3>
        <nav className="flex flex-col gap-1">
          {sections.map((section: CaseStudySection, idx) => (
            <a
              key={section.id}
              href={`#${section.slug}`}
              onClick={(e) => scrollTo(e, section.slug)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activeSection === section.slug
                  ? 'bg-white/5 font-semibold text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span className={`font-mono text-xs ${activeSection === section.slug ? 'text-[#4F8CFF]' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{section.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <article className="min-w-0 flex-1 space-y-32 pb-32">
        {sections.map((section: CaseStudySection, idx) => {
          const metadata = section.metadata as any;
          const mediaItems: MediaItem[] = metadata?.media || [];

          return (
            <section
              key={section.id}
              id={section.slug}
              className="case-study-section scroll-mt-24"
            >
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-sm text-[#4F8CFF] font-semibold">{String(idx + 1).padStart(2, '0')}</span>
                  <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                    {section.title}
                  </h2>
                </div>
                
                {section.content && (
                  <div className="prose prose-invert prose-lg max-w-3xl text-zinc-300">
                    {section.content.split('\n').map((paragraph, i) => (
                      paragraph.trim() ? <p key={i} className="leading-relaxed">{paragraph}</p> : <br key={i} />
                    ))}
                  </div>
                )}
              </div>

              {mediaItems.length > 0 && (
                <div className="flex flex-wrap gap-8">
                  {mediaItems.map((media, mIdx) => {
                    let widthClass = 'w-full';
                    if (media.size === 'half') widthClass = 'w-full md:w-[calc(50%-1rem)]';
                    if (media.size === 'original') widthClass = 'w-auto max-w-full';

                    return (
                      <div key={mIdx} className={`${widthClass} overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl flex justify-center`}>
                        {media.type === 'pdf' ? (
                          <iframe 
                            src={`${media.url}#view=FitH`} 
                            className="w-full h-[800px] bg-white" 
                            title={`PDF Document ${mIdx}`}
                          />
                        ) : (
                          <img 
                            src={media.url} 
                            alt={`Section media ${mIdx + 1}`} 
                            className="max-w-full h-auto object-contain"
                            loading="lazy"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </article>
    </div>
  );
}
