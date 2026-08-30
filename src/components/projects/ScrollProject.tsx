'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function ScrollProject({ project, index, total }: { project: any, index: number, total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={containerRef} className="relative flex flex-col md:flex-row gap-12 md:gap-20 py-24 border-t border-border-subtle group">
      
      {/* Project Info Sticky Column */}
      <div className="w-full md:w-1/3 flex flex-col items-start h-full md:sticky md:top-32">
        <div className="flex items-center gap-4 mb-6 text-sm font-medium text-secondary">
          <span className="font-mono">{project.fig}</span>
          <span className="w-8 h-[1px] bg-border-subtle"></span>
          <span>{project.category}</span>
          <span className="w-1 h-1 rounded-full bg-border-subtle"></span>
          <span>{project.year}</span>
        </div>
        
        <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">
          {project.title}
        </h3>
        
        <p className="text-lg text-secondary mb-8 leading-relaxed">
          {project.statement}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.technologies.slice(0, 4).map((tech: string, i: number) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full border border-border-subtle text-secondary font-medium">
              {tech}
            </span>
          ))}
        </div>

        <Link 
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-3 text-foreground font-medium group-hover:gap-5 transition-all duration-300"
        >
          View Case Study 
          <ArrowRight size={18} className="text-secondary" />
        </Link>
      </div>

      {/* Project Visuals Horizontal Drag Gallery */}
      <div className="w-full md:w-2/3 overflow-hidden rounded-2xl bg-secondary/5 relative">
        <motion.div 
          className="flex gap-6 p-6 cursor-grab active:cursor-grabbing w-max"
          drag="x"
          dragConstraints={containerRef}
          // The constraint calculation can be tricky. We'll use a simpler approach for now
          // and let the user scroll horizontally within the container.
        >
          <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
             {project.galleryImages.map((img: any, i: number) => (
              <div 
                key={i} 
                className="relative h-[40vh] md:h-[60vh] rounded-xl overflow-hidden shrink-0 snap-center group/img bg-card border border-border-subtle"
                style={{ width: img.width ? `${img.width}px` : '500px', maxWidth: '80vw' }}
              >
                <Image
                  src={img.url}
                  alt={img.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/img:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
