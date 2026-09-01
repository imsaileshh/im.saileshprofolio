'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { User, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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
        delayChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease },
    },
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.08,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease },
    },
  };

  return (
    <section
      id="about-preview"
      className="py-4 sm:py-6 md:py-8 relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-start">
        
        {/* ── LEFT COLUMN (Col 1–7: ~58%) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Section Eyebrow + Icon Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3.5 sm:gap-4 mb-3">
            <div className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-[14px] sm:rounded-2xl bg-[var(--card)] border border-border-subtle text-accent shadow-xs shrink-0">
              <User size={21} strokeWidth={2} className="text-accent" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] font-display font-semibold tracking-tight text-foreground leading-[1.1]">
              About Me
            </h2>
          </motion.div>

          {/* Subheading: Design. Build. Ship. */}
          <motion.h3
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] font-display font-semibold text-foreground tracking-tight mb-2 leading-[1.2]"
          >
            {content.heading || 'Design. Build. Ship.'}
          </motion.h3>

          {/* Role Label */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm md:text-[14px] font-mono tracking-widest text-accent font-semibold uppercase mb-3"
          >
            {content.role}
          </motion.p>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-[15px] sm:text-base md:text-[17px] lg:text-[18px] text-muted leading-[1.7] font-normal max-w-[560px] mb-5"
          >
            {content.paragraph}
          </motion.p>

          {/* Connected CTA Link */}
          <motion.div variants={itemVariants}>
            <Link
              href={content.ctaLink}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-foreground hover:text-accent transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-0.5"
            >
              <span className="border-b border-border-subtle group-hover:border-accent transition-colors duration-200 pb-0.5">
                {content.ctaText}
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN: Editorial 4-Role Index (Col 8–12: ~42%) ── */}
        <motion.div
          variants={listContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-5 flex flex-col w-full lg:pt-2 space-y-3.5 sm:space-y-4 lg:space-y-5"
        >
          {ROLES.map((role) => (
            <motion.div
              key={role.number}
              variants={listItemVariants}
              tabIndex={0}
              className="group flex items-baseline cursor-default focus:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm py-0.5"
            >
              {/* Column 1: Aligned Two-Digit Number */}
              <span className="w-9 sm:w-11 text-xs sm:text-sm md:text-[14px] font-mono font-medium tracking-widest text-muted/60 group-hover:text-accent transition-colors duration-200 shrink-0 tabular-nums">
                {role.number}
              </span>

              {/* Column 2: Aligned Role Title */}
              <h3 className="text-lg sm:text-xl md:text-[24px] lg:text-[26px] xl:text-[28px] font-display font-semibold text-foreground tracking-tight uppercase leading-tight transition-all duration-200 group-hover:text-accent group-hover:translate-x-1.5">
                {role.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
