'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

const ease = [0.22, 1, 0.36, 1] as const;

interface EditorialSectionHeaderProps {
  label: string; // e.g. "ARCHIVE — 02"
  title: string | React.ReactNode; // e.g. "Selected Work"
  action?: React.ReactNode;
  className?: string;
}

export function EditorialSectionHeader({
  label,
  title,
  action,
  className,
}: EditorialSectionHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 md:mb-10", className)}>
      <div className="flex flex-col">
        {/* Archival metadata label */}
        <motion.span
          initial={{ opacity: 0, y: 8, letterSpacing: '0.24em' }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
          className="text-[10px] md:text-xs font-mono text-muted uppercase mb-3 block"
        >
          {label}
        </motion.span>

        {/* Masked rise reveal for title */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '100%', opacity: 0.4 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-[clamp(38px,9vw,68px)] font-display text-foreground tracking-tight leading-[0.98]"
          >
            {title}
          </motion.h2>
        </div>
      </div>

      {/* Action link */}
      {action && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="self-start md:self-auto"
        >
          {action}
        </motion.div>
      )}
    </div>
  );
}
