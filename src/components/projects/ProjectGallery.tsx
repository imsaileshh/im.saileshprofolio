'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '../ui/SectionReveal';

interface ProjectGalleryProps {
  projects: any[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [selectedProject]);

  return (
    <>
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, idx) => (
          <StaggerItem key={project.id || idx}>
            <motion.div
              layoutId={`project-card-${project.id}`}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col gap-4 p-4 rounded-2xl bg-[var(--card)] border border-border-subtle hover:border-muted transition-colors duration-300 h-full cursor-pointer hover:-translate-y-[3px]"
            >
              <motion.div 
                layoutId={`project-image-container-${project.id}`}
                className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[var(--sidebar)]"
              >
                <motion.div layoutId={`project-image-${project.id}`} className="absolute inset-0">
                  <Image 
                    src={project.coverUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </motion.div>
              
              <div className="flex flex-col pt-2 px-1">
                <div className="flex items-center gap-2 text-[10px] font-medium text-muted mb-2 uppercase tracking-widest">
                  <span>{project.year}</span>
                  <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
                  <span>{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-medium group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight size={18} className="text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatePresence>
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/72 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Surface */}
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className="relative w-full max-w-[800px] max-h-[calc(100dvh-24px)] bg-[var(--card)] text-foreground border border-border-subtle rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
              initial={{ scale: 0.96, y: 28 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 14, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full z-20 transition-colors backdrop-blur-sm"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                
                {/* Hero Image */}
                <motion.div 
                  layoutId={`project-image-container-${selectedProject.id}`}
                  className="relative w-full h-[300px] sm:h-[420px] bg-[var(--sidebar)]"
                >
                  <motion.div layoutId={`project-image-${selectedProject.id}`} className="absolute inset-0">
                    <Image
                      src={selectedProject.coverUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>

                {/* Project Info */}
                <motion.div 
                  className="p-8 sm:p-12 flex flex-col gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  
                  <header>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted uppercase tracking-widest mb-3">
                      <span>{selectedProject.year}</span>
                      <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
                      <span>{selectedProject.category}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight mb-4">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 uppercase tracking-widest text-[10px] font-mono text-muted/80">
                        {selectedProject.technologies.join(' · ')}
                      </div>
                    )}
                  </header>

                  <div className="w-full h-px bg-border-subtle" />

                  <article className="prose prose-invert prose-p:text-muted max-w-none">
                    <p className="text-lg leading-relaxed whitespace-pre-wrap">
                      {selectedProject.description || "A comprehensive project overview focusing on user-centered design, modern frontend architecture, and scalable design systems."}
                    </p>
                  </article>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                    {/* View Case Study / Project */}
                    <a 
                      href={selectedProject.caseStudyUrl || '#'}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent text-[var(--bg)] font-medium hover:brightness-110 transition-all text-center flex-1 sm:flex-none"
                    >
                      {selectedProject.caseStudyUrl ? 'View Case Study' : 'View Project'}
                    </a>
                    
                    {/* View Prototype (conditionally rendered) */}
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-border-subtle text-foreground font-medium hover:bg-border-subtle/20 transition-all text-center flex-1 sm:flex-none"
                      >
                        View Prototype
                      </a>
                    )}
                  </div>

                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
