'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface PaperDividerProps {
  className?: string;
  variant?: 'line' | 'organic';
}

export function PaperDivider({ className, variant = 'organic' }: PaperDividerProps) {
  if (variant === 'line') {
    return (
      <div className={cn("w-full my-8 md:my-10 overflow-hidden", className)}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="w-full h-px bg-border-subtle opacity-80"
          role="separator"
        />
      </div>
    );
  }

  return (
    <div className={cn("w-full my-8 md:my-10 overflow-hidden select-none pointer-events-none", className)}>
      <motion.svg
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.75 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0 }}
        className="w-full h-[4px]"
        preserveAspectRatio="none"
        viewBox="0 0 1000 4"
      >
        <path
          d="M0,2 Q250,0.8 500,2.5 T1000,2"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>
    </div>
  );
}
