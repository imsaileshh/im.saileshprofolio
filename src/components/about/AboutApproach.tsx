'use client';

import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';

const processSteps = [
  { step: '01', title: 'UNDERSTAND', desc: 'Problem · Users · Goals' },
  { step: '02', title: 'DESIGN', desc: 'Structure · UX · Interface' },
  { step: '03', title: 'BUILD', desc: 'Components · Interactions · Logic' },
  { step: '04', title: 'TEST', desc: 'Usability · Quality · Performance' },
  { step: '05', title: 'OPTIMIZE', desc: 'Speed · Accessibility · Experience' },
  { step: '06', title: 'LAUNCH', desc: 'Polish · Deploy · Improve' },
];

export function AboutApproach() {
  return (
    <SectionReveal id="approach" className="py-16 md:py-24">
      <div className="mb-12 md:mb-20">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          MY APPROACH / 02
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        
        {/* Desktop Connected Lines */}
        <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
          {/* Top Horizontal Line (01 to 03) */}
          <motion.div 
            className="absolute top-[28px] left-[15%] right-[15%] h-px bg-border-subtle origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: 'circOut' }}
          />
          {/* Vertical Drop Line (03 to 04) */}
          <motion.div 
            className="absolute top-[28px] bottom-[28px] right-[15%] w-px bg-border-subtle origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 1, ease: 'circOut' }}
          />
          {/* Bottom Horizontal Line (04 to 06) */}
          <motion.div 
            className="absolute bottom-[28px] left-[15%] right-[15%] h-px bg-border-subtle origin-right"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: 1.5, ease: 'circOut' }}
          />
        </div>

        {/* Mobile Connected Line */}
        <div className="block md:hidden absolute left-[30px] top-[40px] bottom-[40px] w-px bg-border-subtle z-0">
          <motion.div 
            className="w-full h-full bg-accent origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: 'linear' }}
          />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-32 gap-x-8 relative z-10">
          {/* Top Row: 1, 2, 3 */}
          {[processSteps[0], processSteps[1], processSteps[2]].map((item, i) => (
            <ProcessNode key={item.step} item={item} delay={0.2 + (i * 0.3)} />
          ))}
          
          {/* Bottom Row: 6, 5, 4 (Reversed for desktop visual flow) */}
          <div className="hidden md:contents">
            {[processSteps[5], processSteps[4], processSteps[3]].map((item, i) => (
              <ProcessNode key={item.step} item={item} delay={1.8 + (i * 0.3)} />
            ))}
          </div>

          {/* Mobile bottom row order (4, 5, 6) */}
          <div className="contents md:hidden">
            {[processSteps[3], processSteps[4], processSteps[5]].map((item, i) => (
              <ProcessNode key={item.step} item={item} delay={1.1 + (i * 0.3)} />
            ))}
          </div>
        </div>
        
      </div>
    </SectionReveal>
  );
}

function ProcessNode({ item, delay }: { item: any, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-row md:flex-col items-center md:items-center gap-6 md:gap-4 group"
    >
      <div className="w-[60px] h-[60px] rounded-full bg-[var(--bg)] border-2 border-border-subtle flex items-center justify-center relative shrink-0 transition-colors duration-500 group-hover:border-accent">
        <span className="font-mono text-sm font-semibold text-muted group-hover:text-accent transition-colors duration-500">
          {item.step}
        </span>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-accent opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-500" />
      </div>
      
      <div className="flex flex-col text-left md:text-center">
        <h3 className="text-lg font-semibold tracking-wide text-foreground mb-1 group-hover:text-accent transition-colors duration-500">
          {item.title}
        </h3>
        <p className="text-sm text-muted">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}
