'use client';

import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';



export function AboutApproach({ data }: { data?: any[] }) {
  const processSteps = data || [
    { step: '01', title: 'UNDERSTAND', desc: 'Research the problem, users, and project goals.' },
    { step: '02', title: 'DESIGN', desc: 'Create intuitive user experiences and visually engaging interfaces.' },
    { step: '03', title: 'BUILD', desc: 'Transform ideas and designs into responsive, modern web experiences.' },
    { step: '04', title: 'TEST', desc: 'Check usability, responsiveness, performance, and functionality.' },
    { step: '05', title: 'OPTIMIZE', desc: 'Refine interactions, accessibility, and overall performance.' },
    { step: '06', title: 'LAUNCH', desc: 'Deliver polished digital experiences ready for users.' },
  ];

  return (
    <SectionReveal id="approach" className="py-16 md:py-24">
      <div className="mb-12 md:mb-20">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          MY APPROACH / 02
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        
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
          
          {processSteps.map((item, index) => {
            // For desktop, alternate row direction to create the snake effect
            // We apply a custom order logic: row 0 (L->R), row 1 (R->L), row 2 (L->R)
            const row = Math.floor(index / 3);
            const isReversedRow = row % 2 !== 0;
            const positionInRow = index % 3;
            // E.g., for index 3,4,5 (row 1), the visual order should be 5, 4, 3
            // In a CSS grid with 3 columns, we can set the `order` property
            const visualOrderDesktop = isReversedRow ? (row * 3) + (2 - positionInRow) : index;

            return (
              <div 
                key={index} 
                className="contents md:block" 
                style={{ order: visualOrderDesktop } as any}
              >
                {/* Wrap ProcessNode so we can handle responsive ordering */}
                <div className="md:hidden">
                  <ProcessNode item={item} delay={0.2 + (index * 0.2)} />
                </div>
                <div className="hidden md:block">
                  <ProcessNode item={item} delay={0.2 + (visualOrderDesktop * 0.2)} />
                </div>
              </div>
            );
          })}

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
