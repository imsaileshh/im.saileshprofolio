'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';

export function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["1.5deg", "-1.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-1.5deg", "1.5deg"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.985 }}
      className="w-full text-left group flex flex-col p-[6px] rounded-[14px] bg-[var(--card)] border border-border-subtle hover:border-muted/40 transition-colors duration-250 cursor-pointer h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <motion.div 
        className="w-full flex-col flex h-full"
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative w-full aspect-[4/4.3] rounded-[10px] overflow-hidden bg-[var(--sidebar)]">
          <Image 
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-[500ms]"
            style={{ transform: isHovered ? 'scale(1.025)' : 'scale(1)' }}
          />
          {/* Year Badge */}
          <div className="absolute top-[14px] right-[14px] bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg uppercase tracking-wider z-10">
            {project.year || '2026'}
          </div>
        </div>
        
        <div className="flex flex-col pt-[16px] px-[10px] pb-[10px]">
          <div className="flex items-center justify-between mb-[8px]">
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.10em]">
              {project.category}
            </span>
            <ArrowRightCircle 
              size={16} 
              className="text-muted transition-transform duration-250 shrink-0" 
              style={{ transform: isHovered ? 'translate(3px, -3px)' : 'translate(0px, 0px)' }} 
              strokeWidth={1.5} 
            />
          </div>
          <h3 className="text-[15px] md:text-[17px] font-display font-semibold text-foreground transition-colors duration-250 pr-2 truncate"
              style={{ color: isHovered ? 'var(--accent)' : 'inherit' }}>
            {project.title}
          </h3>
        </div>
      </motion.div>
    </motion.button>
  );
}
