'use client';

import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

export function StackHero() {
  return (
    <SectionReveal className="pt-6 md:pt-8 pb-10 md:pb-12 relative">
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
        {/* Left Side: Titles */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-6">
            STACK / 01
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-medium leading-[1.1] tracking-tight mb-6 max-w-2xl">
            Tools I use to design, build and ship.
          </h1>
          <p className="text-lg md:text-xl text-muted leading-[1.6] max-w-2xl font-light">
            A focused toolkit for creating modern interfaces, scalable web applications and polished digital experiences.
          </p>
        </div>

        {/* Right Side: Animated Summaries */}
        <StaggerContainer className="flex flex-col gap-3 lg:min-w-[280px]">
          {[
            { count: '07', label: 'Frontend' },
            { count: '02', label: 'Backend' },
            { count: '02', label: 'Database' },
            { count: '04', label: 'Tools' },
            { count: '05', label: 'Software' },
          ].map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="flex items-center justify-between py-2 border-b border-border-subtle">
                <span className="text-[15px] font-medium text-foreground">{item.label}</span>
                <span className="text-[13px] font-mono text-muted">{item.count}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
