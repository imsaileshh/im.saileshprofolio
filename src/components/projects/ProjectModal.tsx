'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Globe, X } from 'lucide-react';

export function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl bg-[var(--bg)] border border-border-subtle rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative w-full h-[35vh] md:h-[45vh] bg-[var(--sidebar)] shrink-0">
          <Image 
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent opacity-80"></div>
        </div>

        <div className="flex flex-col p-6 md:p-10 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-border-subtle/50 text-foreground uppercase tracking-widest">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted tracking-widest">
              {project.year || '2026'}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-foreground mb-6">
            {project.title}
          </h2>

          <p className="text-base md:text-lg text-muted leading-relaxed mb-8 max-w-3xl">
            {project.description || 'A comprehensive showcase of design and development methodology focused on building scalable, user-centric experiences.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <Link 
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 bg-foreground text-[var(--bg)] px-6 py-3 rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-300"
            >
              View Case Study
            </Link>
            
            {project.liveUrl && (
              <a 
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle text-foreground text-sm font-semibold hover:bg-border-subtle/20 transition-colors"
              >
                <Globe size={16} /> Live Project
              </a>
            )}

            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border-subtle text-foreground text-sm font-semibold hover:bg-border-subtle/20 transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
