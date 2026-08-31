'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ease = [0.22, 1, 0.36, 1] as const;

export function StackPreview({ skillSections = [] }: { skillSections?: any[] }) {
  const shouldReduceMotion = useReducedMotion();
  
  // Use fallback if empty
  const categories = skillSections.length > 0 ? skillSections : [
    {
      title: 'FRONTEND',
      skills: [{ name: 'React.js' }, { name: 'Next.js' }, { name: 'TypeScript' }, { name: 'JavaScript' }, { name: 'Tailwind CSS' }, { name: 'HTML5' }, { name: 'CSS3' }]
    },
    {
      title: 'BACKEND',
      skills: [{ name: 'Node.js' }, { name: 'Express.js' }, { name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'REST API' }]
    },
    {
      title: 'DESIGN',
      skills: [{ name: 'Figma' }, { name: 'Framer' }, { name: 'Adobe Photoshop' }, { name: 'Illustrator' }, { name: 'Lightroom' }]
    },
    {
      title: 'SOFTWARE',
      skills: [{ name: 'VS Code' }, { name: 'Git' }, { name: 'GitHub' }, { name: 'Docker' }, { name: 'Vercel' }]
    }
  ];

  const rowVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease,
      },
    },
  };

  return (
    <section id="stack-preview" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16">
      
      {/* HEADER */}
      <SectionHeader icon={Layers} label="TOOLS & TECHNOLOGIES">
        <h2 className="text-3xl md:text-4xl lg:text-[40px] font-display font-medium tracking-tight text-foreground leading-[1.15]">
          Tools & Technologies
        </h2>
      </SectionHeader>

      {/* ONE COLUMN FULL-WIDTH EDITORIAL STACK LIST (4 ROWS ONLY) */}
      <div className="w-full flex flex-col">
        {categories.map((item) => (
          <motion.div
            key={item.title}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 py-7 md:py-8 lg:py-10 border-b border-border-subtle/70 relative cursor-default"
          >
            {/* LEFT: Category Name */}
            <motion.div variants={textVariants} className="w-full lg:w-48 shrink-0 pt-1">
              <span className="text-[13px] md:text-[14px] font-mono tracking-[0.2em] text-foreground font-semibold uppercase">
                {item.title}
              </span>
            </motion.div>

            {/* RIGHT: Text Technologies */}
            <div className="flex flex-wrap items-center justify-start lg:justify-end gap-x-8 md:gap-x-12 gap-y-4 lg:gap-y-6 flex-1">
              {item.skills.map((tech: any) => (
                <motion.div
                  key={tech.name}
                  variants={textVariants}
                  className="group relative flex items-center cursor-pointer py-1"
                >
                  <span className="text-[15px] md:text-[17px] font-medium text-muted group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 block">
                    {tech.name}
                  </span>
                  {/* Subtle animated accent dot on hover */}
                  <div className="absolute -left-4 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 group-hover:translate-x-1 transition-all duration-300 w-1.5 h-1.5 rounded-full bg-accent" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Section Bottom Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.7, ease }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle origin-left"
      />
    </section>
  );
}
