'use client';

import { motion } from 'framer-motion';

const techList = [
  'REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND', 'NODE.JS', 
  'POSTGRESQL', 'MONGODB', 'FIGMA', 'FRAMER', 'DOCKER'
];

export function TechMarquee() {
  // Double the list for seamless loop
  const list = [...techList, ...techList, ...techList];

  return (
    <div className="relative w-full overflow-hidden py-8 md:py-10 border-y border-border-subtle bg-[var(--card)] flex group -mx-5 sm:-mx-6 md:-mx-10 lg:-mx-14 px-5 sm:px-6 md:px-10 lg:px-14 w-[calc(100%+40px)] sm:w-[calc(100%+48px)] md:w-[calc(100%+80px)] lg:w-[calc(100%+112px)]">
      
      {/* Left/Right Fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-12 md:gap-24 items-center group-hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 30 
        }}
      >
        {list.map((tech, i) => (
          <span 
            key={i} 
            className="text-[13px] md:text-sm font-mono tracking-[0.2em] text-muted/40 uppercase font-medium hover:text-accent transition-colors duration-300"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
