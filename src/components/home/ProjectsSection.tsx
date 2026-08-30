'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { Folder, ArrowUpRight } from 'lucide-react';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectModal } from '@/components/projects/ProjectModal';


// --- Main Section Component ---
export function ProjectsSection({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <SectionReveal id="projects" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-[54px] h-[54px] rounded-[12px] bg-[var(--card)] border border-border-subtle flex items-center justify-center shrink-0 shadow-sm">
            <Folder size={24} className="text-muted" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-[28px] font-display font-semibold tracking-tight text-foreground mb-1">
              Projects
            </h2>
            <p className="text-muted text-sm md:text-[15px] font-medium">
              A curated collection of selected projects.
            </p>
          </div>
        </div>
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--card)] border border-border-subtle text-[13px] md:text-sm font-semibold text-foreground hover:bg-border-subtle/30 hover:border-border-subtle/80 hover:-translate-y-[2px] transition-all duration-200 group shrink-0"
        >
          All Projects 
          <ArrowUpRight size={18} className="text-foreground group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" strokeWidth={1.5} />
        </Link>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, idx) => (
          <StaggerItem key={project.id || idx}>
            <ProjectCard 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}
