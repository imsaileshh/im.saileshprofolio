'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

export function ScrollTimelineLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this vertical line
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  // Smooth the scroll progress to give it a nice snappy but fluid feel
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={ref} className={className}>
      <motion.div 
        className="w-full h-full bg-accent origin-top shadow-[0_0_15px_rgba(45,212,191,0.4)]"
        style={{ scaleY }}
      />
    </div>
  );
}

export function ScrollTimelineNode({ className }: { className?: string }) {
  return (
    <motion.div
      initial="initial"
      whileInView="inView"
      viewport={{ once: false, margin: "-50% 0px -50% 0px" }} // Triggers right at the center of the screen
      variants={{
        initial: { 
          backgroundColor: 'var(--bg)', 
          borderColor: 'var(--border-subtle)',
          scale: 1,
          boxShadow: '0 0 0px rgba(45,212,191,0)'
        },
        inView: { 
          backgroundColor: 'var(--accent)', 
          borderColor: 'var(--accent)',
          scale: 1.2,
          boxShadow: '0 0 12px rgba(45,212,191,0.5)',
          transition: { duration: 0.4, ease: "easeOut" }
        }
      }}
      className={className}
    />
  );
}
