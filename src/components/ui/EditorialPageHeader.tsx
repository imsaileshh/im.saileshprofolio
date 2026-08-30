'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

interface EditorialPageHeaderProps {
  label: string; // e.g. "PROFILE — 01"
  title: string; // e.g. "About Me"
  description?: string;
  className?: string;
}

export function EditorialPageHeader({
  label,
  title,
  description,
  className,
}: EditorialPageHeaderProps) {
  return (
    <div className={`flex flex-col mb-8 md:mb-10 pt-4 md:pt-6 ${className || ''}`}>
      {/* Small mono metadata */}
      <motion.span
        initial={{ opacity: 0, y: 8, letterSpacing: '0.24em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
        transition={{ duration: 0.6, ease }}
        className="text-[10px] md:text-xs font-mono text-muted uppercase mb-3 block"
      >
        {label}
      </motion.span>

      {/* Large serif title with masked rise */}
      <div className="overflow-hidden mb-4">
        <motion.h1
          initial={{ y: '100%', opacity: 0.3 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, delay: 0.08, ease }}
          className="text-[clamp(38px,8vw,72px)] font-display text-foreground tracking-tight leading-[0.98]"
        >
          {title}
        </motion.h1>
      </div>

      {/* Optional description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="text-base md:text-lg text-muted max-w-2xl leading-relaxed font-sans"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
