'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface PaperSheetProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  withGrain?: boolean;
}

export function PaperSheet({ children, className, withGrain = true, ...props }: PaperSheetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative bg-paper text-ink overflow-hidden",
        "border border-border-ink shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)]",
        "before:absolute before:inset-0 before:pointer-events-none before:z-0",
        withGrain && "before:bg-[image:var(--paper-grain)] before:opacity-50",
        className
      )}
      {...props}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
