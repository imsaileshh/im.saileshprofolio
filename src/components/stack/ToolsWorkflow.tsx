'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';

const tools = [
  { name: 'Git', desc: 'Version control', delay: 0.1 },
  { name: 'GitHub', desc: 'Code collaboration', delay: 0.19 },
  { name: 'Docker', desc: 'Containerized environments', delay: 0.28 },
  { name: 'Vercel', desc: 'Deployment', delay: 0.37 },
];

export function ToolsWorkflow() {
  return (
    <SectionReveal id="tools" className="py-24 scroll-mt-24">
      <div className="mb-16">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-4">
          TOOLS / 05
        </h2>
        <p className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight max-w-xl">
          Version control, collaboration, deployment and containerized workflows.
        </p>
      </div>

      <div className="relative">
        {/* Draw Line: Horizontal on md+, Vertical on mobile */}
        <motion.div 
          className="absolute left-[39px] top-[40px] bottom-[40px] w-px md:w-auto md:h-px md:top-[40px] md:bottom-auto md:left-[40px] md:right-[40px] bg-border-subtle origin-top md:origin-left"
          initial={{ scaleX: 0, scaleY: 0 }}
          whileInView={{ scaleX: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />

        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative z-10">
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: tool.delay, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-8 flex-1"
            >
              {/* Node Circle */}
              <div className="w-[80px] h-[80px] rounded-2xl bg-[var(--sidebar)] border border-border-subtle flex items-center justify-center font-mono text-sm font-semibold text-muted group-hover:text-accent group-hover:-translate-y-[2px] transition-all duration-300 bg-[var(--card)] z-10 shadow-sm">
                {tool.name.substring(0, 2).toUpperCase()}
              </div>
              
              {/* Text */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted">
                  {tool.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
