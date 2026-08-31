'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

const ease = [0.22, 1, 0.36, 1] as const;

interface SectionHeaderProps {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionHeader({ icon: Icon, label, children, className = '' }: SectionHeaderProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease },
    },
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col mb-8 md:mb-12 ${className}`}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <motion.div variants={itemVariants}>
          <Icon size={18} className="text-accent shrink-0" strokeWidth={2.5} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <span className="text-xs font-mono tracking-widest text-accent uppercase font-medium mt-[1px] block">
            {label}
          </span>
        </motion.div>
      </div>

      <div className="flex flex-col">
        {childrenArray.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
