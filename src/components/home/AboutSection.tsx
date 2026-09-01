'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { User, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';

const ease = [0.22, 1, 0.36, 1] as const;

const ROLES = [
  { number: '01', title: 'UI/UX DESIGNER' },
  { number: '02', title: 'PRODUCT DESIGNER' },
  { number: '03', title: 'FRONTEND DEVELOPER' },
  { number: '04', title: 'VIBE CODER' },
];

export function AboutSection({ aboutContent }: { aboutContent?: any }) {
  const shouldReduceMotion = useReducedMotion();

  const content = aboutContent || {
    eyebrow: 'ABOUT ME',
    heading: 'Design. Build. Ship.',
    role: 'Frontend Developer & UI/UX Designer',
    paragraph:
      'I bridge the gap between design and engineering, crafting digital experiences that are not only visually stunning but also highly performant and accessible.',
    ctaText: 'Read my full story',
    ctaLink: '/about',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease },
    },
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.12,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease },
    },
  };

  return (
    <section
      id="about-preview"
      className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">
        
        {/* ── LEFT: Primary About Introduction (Col 1-7) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7 flex flex-col justify-between"
        >
          <div>
            <SectionHeader icon={User} label={content.eyebrow} className="!mb-5">
              <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-display font-medium tracking-tight text-foreground leading-[1.12] mb-4">
                {content.heading}
              </h2>

              <p className="text-[13px] md:text-[14px] font-mono tracking-wide text-accent font-medium uppercase mb-3.5">
                {content.role}
              </p>

              <p className="text-[15px] md:text-[16px] text-muted leading-[1.68] font-normal max-w-[520px]">
                {content.paragraph}
              </p>
            </SectionHeader>
          </div>

          {/* Connected CTA Link */}
          <motion.div variants={itemVariants} className="pt-2">
            <Link
              href={content.ctaLink}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-foreground hover:text-accent transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-0.5"
            >
              <span className="border-b border-border-subtle group-hover:border-accent transition-colors duration-200 pb-0.5">
                {content.ctaText}
              </span>
              <ArrowUpRight
                size={15}
                className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Minimal 4-Item Role List (Col 8-12) ── */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-5 flex flex-col w-full gap-5 sm:gap-6 pt-2 lg:pt-1"
        >
          {ROLES.map((role) => (
            <motion.div
              key={role.number}
              variants={listItemVariants}
              tabIndex={0}
              className="group py-1 flex flex-col cursor-default focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              {/* Role Row */}
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="text-[12px] sm:text-[13px] font-mono tracking-widest text-muted/50 group-hover:text-accent transition-colors duration-200 shrink-0">
                  {role.number}
                </span>
                <h3 className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-display font-medium text-foreground tracking-tight uppercase leading-none transition-all duration-200 group-hover:text-accent group-hover:translate-x-1.5">
                  {role.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
