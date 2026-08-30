'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

export interface PaperCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
}

export function PaperCard({ children, className, ...props }: PaperCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative border border-border-ink/50 bg-paper/50 p-6 transition-all duration-300 hover:border-border-ink hover:bg-paper cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
