'use client';

import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

type Section = { title: string; skills: { id: string }[] };

export function StackHero({
  title,
  description,
  sections,
}: {
  title?: string | null;
  description?: string | null;
  sections?: Section[];
}) {
  return (
    <SectionReveal className="pt-6 md:pt-8 pb-10 md:pb-12 relative">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
        {/* Left Side: Titles */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-6">
            STACK / 01
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-medium leading-[1.1] tracking-tight mb-6 max-w-2xl">
            {title || 'Tools I use to design, build and ship.'}
          </h1>
          <p className="text-lg md:text-xl text-muted leading-[1.6] max-w-2xl font-light">
            {description || 'A focused toolkit for creating modern interfaces, scalable web applications and polished digital experiences.'}
          </p>
        </div>

        {/* Right Side: Dynamic Category Counts */}
        {sections && sections.length > 0 && (
          <StaggerContainer className="flex flex-col gap-3 lg:min-w-[280px]">
            {sections.map((sec, idx) => (
              <StaggerItem key={idx}>
                <div className="flex items-center justify-between py-2 border-b border-border-subtle">
                  <span className="text-[15px] font-medium text-foreground">{sec.title}</span>
                  <span className="text-[13px] font-mono text-muted">
                    {String(sec.skills.length).padStart(2, '0')}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </SectionReveal>
  );
}
