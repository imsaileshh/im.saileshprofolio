'use client';

import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { ArrowUpRight } from 'lucide-react';

export function AboutPhilosophy({ data }: { data?: any[] }) {
  const philosophies = data || [
    { num: '01', title: 'USER FIRST', desc: 'Every design and technical decision must improve the user experience.' },
    { num: '02', title: 'DESIGN WITH PURPOSE', desc: 'Simple, intentional interfaces with clear visual hierarchy.' },
    { num: '03', title: 'CLEAN & MAINTAINABLE CODE', desc: 'Writing scalable, organized, and future-proof code.' },
    { num: '04', title: 'SMOOTH & MEANINGFUL INTERACTIONS', desc: 'Using motion to guide users, not distract them.' },
    { num: '05', title: 'PERFORMANCE MATTERS', desc: 'Optimizing speed and accessibility for a seamless experience.' },
    { num: '06', title: 'CONTINUOUS LEARNING', desc: 'Constantly exploring new tools, frameworks, and workflows.' },
  ];

  return (
    <SectionReveal className="py-24">
      <div className="mb-16">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          MY PHILOSOPHY / 06
        </h2>
      </div>

      <div className="flex flex-col border-t border-border-subtle">
        {philosophies.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col justify-center py-8 md:py-10 border-b border-border-subtle overflow-hidden"
          >
            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-accent w-0 group-hover:w-full transition-all duration-[400ms] ease-out z-10" />

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full pr-4">
              
              {/* Number */}
              <div className="md:w-16 shrink-0">
                <span className="font-mono text-sm text-muted group-hover:text-accent transition-colors duration-300">
                  {item.num}
                </span>
              </div>

              {/* Title */}
              <div className="md:w-[280px] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[5px]">
                <h3 className="text-xl font-medium tracking-wide text-foreground">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div className="flex-1 transition-transform duration-300 ease-out group-hover:translate-x-[5px]">
                <p className="text-[15px] text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
