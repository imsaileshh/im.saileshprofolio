'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

const frontendTech = [
  { id: 'react', name: 'React.js', label: 'FRONTEND LIBRARY', initial: 'RE', colSpan: 'md:col-span-2', height: 'min-h-[180px]' },
  { id: 'next', name: 'Next.js', label: 'FRAMEWORK', initial: 'NX', colSpan: 'md:col-span-2', height: 'min-h-[180px]' },
  { id: 'typescript', name: 'TypeScript', label: 'LANGUAGE', initial: 'TS', colSpan: 'md:col-span-1', height: 'min-h-[120px]' },
  { id: 'tailwind', name: 'Tailwind CSS', label: 'STYLING', initial: 'TW', colSpan: 'md:col-span-1', height: 'min-h-[120px]' },
  { id: 'javascript', name: 'JavaScript', label: 'LANGUAGE', initial: 'JS', colSpan: 'md:col-span-1', height: 'min-h-[120px]' },
  { id: 'html', name: 'HTML', label: 'MARKUP', initial: 'HT', colSpan: 'md:col-span-1', height: 'min-h-[120px]' },
  { id: 'css', name: 'CSS', label: 'STYLING', initial: 'CS', colSpan: 'md:col-span-4', height: 'min-h-[100px]' },
];

export function FrontendGrid() {
  return (
    <SectionReveal id="frontend" className="py-16 md:py-24 scroll-mt-24">
      <div className="mb-8 md:mb-12">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-4">
          FRONTEND / 02
        </h2>
        <p className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight max-w-xl">
          Building responsive, interactive and scalable interfaces.
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {frontendTech.map((tech) => (
          <StaggerItem key={tech.id} className={`flex flex-col ${tech.colSpan}`}>
            <motion.div 
              whileHover={{ y: -4 }}
              className={`group relative flex flex-col justify-between p-6 rounded-2xl bg-[var(--card)] border border-border-subtle transition-all duration-250 hover:border-muted/40 overflow-hidden ${tech.height}`}
            >
              {/* Top: Icon/Initial */}
              <div className="w-10 h-10 rounded-xl bg-[var(--sidebar)] border border-border-subtle flex items-center justify-center font-mono text-sm font-semibold text-muted group-hover:text-accent group-hover:scale-[1.08] group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-250 z-10">
                {tech.initial}
              </div>

              {/* Bottom: Name & Label */}
              <div className="flex flex-col z-10 mt-auto">
                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-250">
                  {tech.name}
                </h3>
                <span className="text-[11px] font-mono tracking-widest text-muted uppercase">
                  {tech.label}
                </span>
              </div>

              {/* Decorative Hover Line */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-hover:w-full transition-all duration-[400ms] ease-out" />
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionReveal>
  );
}
