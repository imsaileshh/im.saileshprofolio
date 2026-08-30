'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

const software = [
  {
    id: 'figma',
    name: 'Figma',
    desc: 'UI/UX design, wireframes, prototypes and interface systems.',
    colSpan: 'md:col-span-3',
    initial: 'FI'
  },
  {
    id: 'framer',
    name: 'Framer',
    desc: 'Interactive prototypes and modern web experiences.',
    colSpan: 'md:col-span-3',
    initial: 'FR'
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    desc: 'Image editing, compositions and visual assets.',
    colSpan: 'md:col-span-2',
    initial: 'PS'
  },
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    desc: 'Vector graphics, icons and scalable design assets.',
    colSpan: 'md:col-span-2',
    initial: 'AI'
  },
  {
    id: 'lightroom',
    name: 'Adobe Lightroom Classic',
    desc: 'Photo editing and color correction workflows.',
    colSpan: 'md:col-span-2',
    initial: 'LR'
  }
];

export function SoftwareEditorial() {
  return (
    <SectionReveal id="software" className="py-24 scroll-mt-24">
      <div className="mb-12">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-4">
          CREATIVE SOFTWARE / 06
        </h2>
        <p className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight max-w-xl">
          Tools I use for interface design, visual content and creative production.
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {software.map((item) => (
          <StaggerItem key={item.id} className={item.colSpan}>
            <motion.div 
              whileHover={{ y: -4 }}
              className="group flex flex-col p-8 rounded-2xl bg-[var(--card)] border border-border-subtle transition-all duration-300 hover:border-muted/50 h-full min-h-[200px]"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-[14px] bg-[var(--sidebar)] border border-border-subtle flex items-center justify-center font-mono text-sm font-semibold text-muted mb-auto transition-transform duration-300 group-hover:rotate-[3deg]">
                {item.initial}
              </div>

              {/* Content */}
              <div className="flex flex-col mt-8">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-[14.5px] text-muted leading-relaxed opacity-70 group-hover:opacity-95 transition-opacity duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionReveal>
  );
}
