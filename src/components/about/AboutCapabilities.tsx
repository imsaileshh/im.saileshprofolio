'use client';

import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { ArrowUpRight } from 'lucide-react';

const capabilities = [
  { num: '01', title: 'Frontend Development', desc: 'Responsive and interactive web experiences.' },
  { num: '02', title: 'UI/UX Focus', desc: 'Clear, intuitive and user-focused interfaces.' },
  { num: '03', title: 'AI-Assisted Development', desc: 'Faster ideation, prototyping and implementation.' },
  { num: '04', title: 'Shopify Development', desc: 'Customized and conversion-focused e-commerce.' },
  { num: '05', title: 'Continuous Learning', desc: 'Constantly exploring new tools and workflows.' },
];

export function AboutCapabilities() {
  return (
    <SectionReveal className="py-16 md:py-24">
      <div className="mb-10 md:mb-16">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase">
          WHAT I BRING / 03
        </h2>
      </div>

      <div className="flex flex-col border-t border-border-subtle">
        {capabilities.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative border-b border-border-subtle overflow-hidden"
          >
            {/* Subtle Hover Background */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="flex items-center justify-between p-6 md:p-8 md:h-[100px] transition-transform duration-300 ease-out group-hover:translate-x-[6px]">
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full">
                {/* Number & Title */}
                <div className="flex items-center gap-6 md:w-[40%] shrink-0">
                  <span className="font-mono text-sm text-muted group-hover:text-accent transition-colors duration-300">
                    {cap.num}
                  </span>
                  <h3 className="text-[17px] md:text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                    {cap.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex-1 overflow-hidden">
                  <p className="text-[14.5px] md:text-[15px] text-muted transition-transform duration-300 ease-out group-hover:translate-x-[4px]">
                    {cap.desc}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <div className="shrink-0 ml-4">
                <ArrowUpRight 
                  size={20} 
                  className="text-muted opacity-50 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" 
                />
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
