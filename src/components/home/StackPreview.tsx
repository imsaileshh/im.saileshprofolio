'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Layers } from 'lucide-react';
import {
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  JavaScriptLogo,
  TailwindLogo,
  HtmlLogo,
  CssLogo,
  NodeLogo,
  RestApiLogo,
  PostgreSqlLogo,
  MongoDbLogo,
  FigmaLogo,
  PhotoshopLogo,
  IllustratorLogo,
  LightroomLogo,
  FramerLogo,
  VsCodeLogo,
  GitLogo,
  GitHubLogo,
  DockerLogo,
  VercelLogo,
} from '@/components/ui/BrandLogos';

const ease = [0.22, 1, 0.36, 1] as const;

const stackCategories = [
  {
    category: 'FRONTEND',
    technologies: [
      { name: 'React', Icon: ReactLogo },
      { name: 'Next.js', Icon: NextjsLogo },
      { name: 'TypeScript', Icon: TypeScriptLogo },
      { name: 'JavaScript', Icon: JavaScriptLogo },
      { name: 'Tailwind CSS', Icon: TailwindLogo },
      { name: 'HTML5', Icon: HtmlLogo },
      { name: 'CSS3', Icon: CssLogo },
    ],
  },
  {
    category: 'BACKEND',
    technologies: [
      { name: 'Node.js', Icon: NodeLogo },
      { name: 'REST API', Icon: RestApiLogo },
      { name: 'PostgreSQL', Icon: PostgreSqlLogo },
      { name: 'MongoDB', Icon: MongoDbLogo },
    ],
  },
  {
    category: 'DESIGN',
    technologies: [
      { name: 'Figma', Icon: FigmaLogo },
      { name: 'Adobe Photoshop', Icon: PhotoshopLogo },
      { name: 'Adobe Illustrator', Icon: IllustratorLogo },
      { name: 'Adobe Lightroom', Icon: LightroomLogo },
      { name: 'Framer', Icon: FramerLogo },
    ],
  },
  {
    category: 'SOFTWARE',
    technologies: [
      { name: 'VS Code', Icon: VsCodeLogo },
      { name: 'Git', Icon: GitLogo },
      { name: 'GitHub', Icon: GitHubLogo },
      { name: 'Docker', Icon: DockerLogo },
      { name: 'Vercel', Icon: VercelLogo },
    ],
  },
];

export function StackPreview() {
  const shouldReduceMotion = useReducedMotion();

  const rowVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease,
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease,
      },
    },
  };

  return (
    <section id="stack-preview" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16">
      
      {/* HEADER — Exact icon & heading preserved, description removed */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease }}
        className="flex items-center gap-3 mb-6 md:mb-8"
      >
        <div className="p-2 rounded-lg bg-[var(--card)] border border-border-subtle text-muted">
          <Layers size={20} />
        </div>
        <h2 className="text-3xl font-display font-medium tracking-tight text-foreground">
          Tools & Technologies
        </h2>
      </motion.div>

      {/* ONE COLUMN FULL-WIDTH EDITORIAL STACK LIST (4 ROWS ONLY) */}
      <div className="w-full flex flex-col">
        {stackCategories.map((item) => (
          <motion.div
            key={item.category}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 md:py-10 lg:py-12 border-b border-border-subtle/80 relative group cursor-default"
          >
            {/* LEFT: Straight Category name (no category icons) */}
            <div className="w-full sm:w-auto shrink-0">
              <span className="text-[13px] md:text-[14px] lg:text-[15px] font-mono tracking-[0.22em] text-muted font-semibold uppercase transition-colors duration-200 group-hover:text-accent">
                {item.category}
              </span>
            </div>

            {/* RIGHT: Large Original Technology Logos (floating directly, no borders/containers, staggered scroll reveal) */}
            <div className="flex flex-wrap items-center justify-start sm:justify-end gap-6 sm:gap-7 md:gap-8 lg:gap-10">
              {item.technologies.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={logoVariants}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  transition={{ duration: 0.2, ease }}
                  className="relative group/logo flex items-center justify-center cursor-pointer"
                >
                  <div className="flex items-center justify-center opacity-90 group-hover/logo:opacity-100 transition-opacity duration-200">
                    <tech.Icon size={46} />
                  </div>

                  {/* Subtle Tooltip on Hover */}
                  <div className="absolute -top-9 md:-top-10 left-1/2 -translate-x-1/2 bg-foreground text-[var(--bg)] text-[11px] font-mono font-medium px-2.5 py-1 rounded opacity-0 translate-y-1 group-hover/logo:opacity-100 group-hover/logo:translate-y-0 transition-all duration-150 pointer-events-none whitespace-nowrap z-50 shadow-md">
                    {tech.name}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Subtle hover accent divider slide */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-accent/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />
          </motion.div>
        ))}
      </div>

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
