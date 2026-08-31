'use client';

import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const stackCategories = [
  {
    category: 'FRONTEND',
    tech: 'React · Next.js · TypeScript · JavaScript · Tailwind CSS · HTML · CSS',
  },
  {
    category: 'BACKEND',
    tech: 'Node.js · REST API · PostgreSQL · MongoDB',
  },
  {
    category: 'DESIGN',
    tech: 'Figma · Adobe Photoshop · Adobe Illustrator · Lightroom · Framer',
  },
  {
    category: 'SOFTWARE',
    tech: 'VS Code · Git · GitHub · Docker · Vercel',
  },
  {
    category: 'E-COMMERCE',
    tech: 'Shopify · Liquid · Custom Themes · Storefront UX',
  },
  {
    category: 'TOOLS & WORKFLOW',
    tech: 'Cursor · Warp · Postman · Notion · Linear',
  },
];

export function StackPreview() {
  return (
    <section id="stack-preview" className="py-12 md:py-16 lg:py-20 relative px-5 sm:px-6 md:px-10 lg:px-16">
      
      {/* HEADER — Exact icon & heading preserved, description removed */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease }}
        className="flex items-center gap-3 mb-8 md:mb-12"
      >
        <div className="p-2.5 rounded-lg bg-[var(--card)] border border-border-subtle text-muted shrink-0">
          <Layers size={22} />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-foreground">
          Tools & Technologies
        </h2>
      </motion.div>

      {/* FULL-WIDTH EDITORIAL STACK LIST — Large text, generous gaps, straight typography */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="w-full flex flex-col"
      >
        {stackCategories.map((item) => (
          <div
            key={item.category}
            className="flex flex-col py-8 md:py-10 lg:py-12 border-b border-border-subtle relative group cursor-default"
          >
            {/* Category Name */}
            <span className="text-[11px] sm:text-[12px] md:text-[13px] font-mono tracking-[0.22em] text-muted font-semibold uppercase mb-3.5 transition-colors duration-200 group-hover:text-accent">
              {item.category}
            </span>

            {/* Straight Large Technology Typography */}
            <p className="text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-display font-medium text-foreground tracking-tight leading-[1.3] transition-colors duration-200">
              {item.tech}
            </p>

            {/* Subtle hover accent divider slide */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />
          </div>
        ))}
      </motion.div>

      {/* Section Bottom Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.8, ease }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle origin-left"
      />
    </section>
  );
}
