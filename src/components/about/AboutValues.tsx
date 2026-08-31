'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

export function AboutValues({ data }: { data?: any[] }) {
  const values = data || [
    { title: 'CRAFT' },
    { title: 'CURIOSITY' },
    { title: 'CONSISTENCY' },
    { title: 'GROWTH' },
    { title: 'IMPACT' },
  ];

  return (
    <SectionReveal className="py-24">
      <div className="mb-16">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          I BELIEVE IN / 07
        </h2>
      </div>

      <div className="flex justify-center max-w-4xl mx-auto border border-border-subtle rounded-2xl p-8 md:p-12 bg-[var(--sidebar)]">
        <StaggerContainer className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {values.map((val, i) => (
            <div key={i} className="flex items-center gap-4 md:gap-6">
              <StaggerItem>
                <span className="text-[15px] md:text-lg font-mono tracking-[0.2em] text-foreground transition-colors duration-300 hover:text-accent cursor-default">
                  {val.title}
                </span>
              </StaggerItem>

              {i < values.length - 1 && (
                <StaggerItem>
                  <span className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
                </StaggerItem>
              )}
            </div>
          ))}
        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
