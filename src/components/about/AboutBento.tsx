'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';
import { Code2, PenTool, ShoppingCart, Cpu, Layout, Globe, Wrench, BookOpen } from 'lucide-react';

const passions = [
  { 
    title: 'CODING & BUILDING', 
    desc: 'Bringing ideas to life with clean, scalable code.',
    icon: Code2, 
    span: 'md:col-span-3' 
  },
  { 
    title: 'DESIGNING UI/UX', 
    desc: 'Crafting intuitive and visually striking interfaces.',
    icon: PenTool, 
    span: 'md:col-span-3' 
  },
  { 
    title: 'SHOPIFY & E-COMMERCE', 
    desc: 'Building high-converting digital storefronts.',
    icon: ShoppingCart, 
    span: 'md:col-span-2' 
  },
  { 
    title: 'AI & VIBE CODING', 
    desc: 'Leveraging AI tools to prototype and iterate rapidly.',
    icon: Cpu, 
    span: 'md:col-span-4' 
  },
  { 
    title: 'CREATIVE DEVELOPMENT', 
    desc: 'Blending design and code for unique experiences.',
    icon: Layout, 
    span: 'md:col-span-4' 
  },
  { 
    title: 'EXPLORING NEW TECH', 
    desc: 'Staying ahead of modern web frameworks.',
    icon: Globe, 
    span: 'md:col-span-2' 
  },
  { 
    title: 'BUILDING USEFUL TOOLS', 
    desc: 'Creating utilities that solve real-world problems.',
    icon: Wrench, 
    span: 'md:col-span-3' 
  },
  { 
    title: 'LEARNING & SHARING', 
    desc: 'Continuously growing and documenting the journey.',
    icon: BookOpen, 
    span: 'md:col-span-3' 
  },
];

export function AboutBento() {
  return (
    <SectionReveal className="py-16 md:py-24">
      <div className="mb-10 md:mb-12">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          WHAT I ENJOY / 04
        </h2>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {passions.map((passion, i) => (
          <StaggerItem key={i} className={passion.span}>
            <motion.div 
              className="group flex flex-col p-6 rounded-2xl bg-[var(--sidebar)] border border-border-subtle h-full min-h-[140px] md:min-h-[160px] overflow-hidden transition-all duration-300 hover:bg-[var(--card)] hover:border-muted/30"
            >
              <div className="text-muted transition-transform duration-300 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[2px] mb-6">
                <passion.icon size={24} strokeWidth={1.5} />
              </div>
              
              <div className="mt-auto flex flex-col gap-1 transition-transform duration-300 group-hover:-translate-y-[2px]">
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
