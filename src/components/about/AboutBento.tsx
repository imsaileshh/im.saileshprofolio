'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

export function AboutBento({ data }: { data?: any[] }) {
  const passions = data || [
    { title: 'CODING & BUILDING', desc: 'Bringing ideas to life with clean, scalable code.' },
    { title: 'DESIGNING UI/UX', desc: 'Crafting intuitive and visually striking interfaces.' },
    { title: 'SHOPIFY & E-COMMERCE', desc: 'Building high-converting digital storefronts.' },
    { title: 'AI & VIBE CODING', desc: 'Leveraging AI tools to prototype and iterate rapidly.' },
    { title: 'CREATIVE DEVELOPMENT', desc: 'Blending design and code for unique experiences.' },
    { title: 'EXPLORING NEW TECH', desc: 'Staying ahead of modern web frameworks.' },
    { title: 'BUILDING USEFUL TOOLS', desc: 'Creating utilities that solve real-world problems.' },
    { title: 'LEARNING & SHARING', desc: 'Continuously growing and documenting the journey.' },
  ];

  const colSpans = [
    'md:col-span-3', 'md:col-span-3', 
    'md:col-span-2', 'md:col-span-4', 
    'md:col-span-4', 'md:col-span-2', 
    'md:col-span-3', 'md:col-span-3'
  ];
  return (
    <SectionReveal className="py-16 md:py-24">
      <div className="mb-10 md:mb-12">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          WHAT I ENJOY / 04
        </h2>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {passions.map((passion, i) => (
          <StaggerItem key={i} className={colSpans[i % colSpans.length]}>
            <motion.div 
              className="group flex flex-col p-6 rounded-2xl bg-[var(--sidebar)] border border-border-subtle h-full min-h-[140px] md:min-h-[160px] overflow-hidden transition-all duration-300 hover:bg-[var(--card)] hover:border-muted/30 justify-center"
            >
              <div className="flex flex-col gap-1 transition-transform duration-300 group-hover:-translate-y-[2px]">
                <h3 className="text-[13px] md:text-[14px] font-mono tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
                  {passion.title}
                </h3>
                <p className="text-[13px] text-muted leading-relaxed max-w-[90%]">
                  {passion.desc}
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionReveal>
  );
}
