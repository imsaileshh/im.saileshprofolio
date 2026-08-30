'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';
import { Database } from 'lucide-react';

const databases = [
  {
    name: 'PostgreSQL',
    desc: 'Relational data, structured schemas and application data management.',
    initial: 'PG',
    pattern: 'bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]'
  },
  {
    name: 'MongoDB',
    desc: 'Flexible document-based storage for dynamic application data.',
    initial: 'MG',
    pattern: 'bg-[radial-gradient(circle_at_center,var(--border)_2px,transparent_3px)] [background-size:24px_24px]'
  }
];

export function DatabaseBlocks() {
  return (
    <SectionReveal id="database" className="py-16 md:py-24 scroll-mt-24">
      <div className="mb-8 md:mb-12">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-4">
          DATABASE / 04
        </h2>
        <p className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight max-w-xl">
          Structured and flexible data storage for modern applications.
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {databases.map((db, i) => (
          <StaggerItem key={i} className="h-full">
            <motion.div 
              whileHover={{ y: -4 }}
              className="group relative flex flex-col justify-between p-6 md:p-10 rounded-2xl bg-[var(--card)] border border-border-subtle overflow-hidden min-h-[240px] md:h-[280px] transition-all duration-300 hover:border-accent/30"
            >
              {/* Subtle Pattern Background */}
              <div 
                className={`absolute inset-0 opacity-20 transition-transform duration-500 group-hover:translate-x-[4px] group-hover:translate-y-[3px] ${db.pattern}`} 
              />
              
              {/* Top: Icon */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-[var(--sidebar)] border border-border-subtle flex items-center justify-center text-muted group-hover:text-accent group-hover:scale-[1.07] transition-all duration-300">
                <Database size={24} />
              </div>

              {/* Bottom: Text */}
              <div className="relative z-10 flex flex-col">
                <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {db.name}
                </h3>
                <p className="text-[15px] text-muted leading-relaxed max-w-[90%]">
                  {db.desc}
                </p>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionReveal>
  );
}
