'use client';

import { motion } from 'framer-motion';
import { Code2, PenTool, ShoppingCart, Server, Wrench, Layers, Terminal } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const stackCategories = [
  {
    category: 'FRONTEND',
    icon: Code2,
    tech: 'React · Next.js · TypeScript · JavaScript · Tailwind CSS · HTML · CSS',
  },
  {
    category: 'BACKEND',
    icon: Server,
    tech: 'Node.js · REST API · PostgreSQL · MongoDB',
  },
  {
    category: 'DESIGN',
    icon: PenTool,
    tech: 'Figma · Photoshop · Illustrator · Lightroom · Framer',
  },
  {
    category: 'SOFTWARE',
    icon: Terminal,
    tech: 'VS Code · Git · GitHub · Docker · Vercel',
  },
  {
    category: 'E-COMMERCE',
    icon: ShoppingCart,
    tech: 'Shopify · Liquid · Custom Themes · Storefront UX',
  },
  {
    category: 'TOOLS & WORKFLOW',
    icon: Wrench,
    tech: 'Cursor · Warp · Postman · Notion · Linear',
  },
];

export function StackPreview() {
  return (
    <section id="stack-preview" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16">
      
      {/* HEADER — Exact icon & heading preserved, description removed */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease }}
        className="flex items-center gap-3 mb-4 md:mb-6"
      >
        <div className="p-2 rounded-lg bg-[var(--card)] border border-border-subtle text-muted">
          <Layers size={20} />
        </div>
        <h2 className="text-3xl font-display font-medium tracking-tight text-foreground">
          Tools & Technologies
        </h2>
      </motion.div>

      {/* ONE COLUMN FULL-WIDTH EDITORIAL STACK LIST */}
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
            className="flex flex-col group cursor-default py-6 md:py-8 border-b border-border-subtle relative overflow-hidden"
          >
            {/* Top row: Category name on LEFT, small minimal outline icon on FAR RIGHT */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] md:text-[12px] font-mono tracking-[0.2em] text-muted font-semibold uppercase transition-colors duration-200 group-hover:text-accent">
                {item.category}
              </span>
              <item.icon
                size={17}
                className="text-muted group-hover:text-accent transition-colors duration-200 shrink-0"
                strokeWidth={1.75}
              />
            </div>

            {/* Clear, readable inline typography for technologies */}
            <p className="text-[16px] md:text-[18px] lg:text-[19px] font-display font-medium text-foreground tracking-tight leading-relaxed transition-colors duration-200">
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
