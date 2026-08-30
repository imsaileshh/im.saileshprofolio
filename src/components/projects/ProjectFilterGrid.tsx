'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectCardData {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  featured: boolean;
  coverImageUrl: string;
  fig: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

interface ProjectFilterGridProps {
  projects: ProjectCardData[];
}

export function ProjectFilterGrid({ projects }: ProjectFilterGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Derive categories dynamically from project data
  const uniqueCategories = [
    'ALL',
    ...Array.from(new Set(projects.map((p) => p.category.toUpperCase()))).filter(Boolean),
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toUpperCase() === selectedCategory);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="w-full flex flex-col my-8">
      
      {/* Rectangular Archival Filter Bar */}
      <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mb-12 select-none">
        {uniqueCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 font-mono text-[10px] md:text-xs tracking-[0.14em] uppercase transition-all duration-200 rounded-[1px] border cursor-pointer ${
                isActive
                  ? 'bg-ink text-paper border-ink shadow-xs font-semibold'
                  : 'bg-[#FAF7F0] text-ink/70 border-[#1E1914]/20 hover:border-[#1E1914]/50 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Project Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-9"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id || project.slug}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, delay: idx * 0.04, ease }}
              className="bg-[#FAF7F0] p-3.5 sm:p-4 rounded-[2px] border border-[#1E1914]/15 shadow-[0_2px_12px_rgba(30,25,20,0.03)] hover:shadow-[0_8px_24px_rgba(30,25,20,0.07)] hover:border-[#1E1914]/30 transition-all duration-500 flex flex-col justify-between group/card"
            >
              <div>
                {/* Image Frame with hover zoom */}
                <div className="relative w-full aspect-[16/10] rounded-[1px] overflow-hidden bg-[#181614] border border-[#1E1914]/10 mb-4">
                  <Image 
                    src={project.coverImageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 320px"
                    className="object-cover group-hover/card:scale-[1.025] transition-transform duration-500 ease-out"
                  />

                  {/* Top Badge: Featured or Fig */}
                  <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 bg-[#FAF7F0]/90 backdrop-blur-xs border border-[#1E1914]/20 rounded-[1px]">
                    <span className="font-mono text-[8px] md:text-[9px] tracking-widest text-ink/75 uppercase font-medium">
                      {project.featured ? `FEATURED — ${project.fig}` : `DOC. ${project.fig}`}
                    </span>
                  </div>
                </div>

                {/* Category & Title */}
                <span className="text-[9px] md:text-[10px] font-mono tracking-[0.18em] uppercase text-ink-light/60 block mb-1.5">
                  {project.category}
                </span>

                <h3 className="font-serif text-2xl text-ink tracking-tight mb-2.5 group-hover/card:text-ink/80 transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-ink-light leading-relaxed line-clamp-3 mb-5 font-sans">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-[#1E1914]/10">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="font-mono text-[8px] md:text-[9px] tracking-wider uppercase px-2 py-0.5 bg-[#F4EFE6] text-ink/70 border border-[#1E1914]/10 rounded-[1px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[8px] md:text-[9px] text-ink-light/40 py-0.5">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="flex items-center justify-between pt-1">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-ink hover:text-ink-light transition-colors group/link pb-0.5 border-b border-ink/20 hover:border-ink"
                  >
                    <span>VIEW CASE STUDY</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform -rotate-45" />
                  </Link>

                  {/* External links */}
                  <div className="flex items-center gap-2 text-ink-light/60">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors p-1" title="GitHub Repository">
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-ink transition-colors p-1" title="Live Preview">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
