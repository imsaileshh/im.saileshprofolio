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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease,
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
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
      
      {/* HEADER — Exact icon & heading preserved */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-3 mb-2 md:mb-3"
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
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-7 md:py-8 lg:py-9 border-b border-border-subtle/70 relative cursor-default"
          >
            {/* LEFT: Category Name (vertically centered with icons) */}
            <div className="w-full sm:w-auto shrink-0">
              <span className="text-[14px] md:text-[15px] lg:text-[16px] font-mono tracking-[0.22em] text-foreground font-semibold uppercase">
                {item.category}
              </span>
            </div>

            {/* RIGHT: Official Brand Logos (floating directly, no borders/cards/boxes/tooltips) */}
            <div className="flex flex-wrap items-center justify-start sm:justify-end gap-6 sm:gap-7 md:gap-8 lg:gap-9">
              {item.technologies.map((tech) => (
                <motion.div
                  key={tech.name}
                  variants={logoVariants}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.07, y: -3 }}
                  transition={{ duration: 0.25, ease }}
                  className="flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 hover:brightness-110 hover:drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)] transition-[filter,opacity] duration-250 shrink-0"
                >
                  <tech.Icon size={38} />
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
