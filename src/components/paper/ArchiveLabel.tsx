import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface ArchiveLabelProps {
  children: ReactNode;
  className?: string;
  variant?: 'outline' | 'filled';
}

export function ArchiveLabel({ children, className, variant = 'outline' }: ArchiveLabelProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-mono uppercase tracking-wider",
        variant === 'outline' 
          ? "border border-border-ink text-ink-light" 
          : "bg-ink text-paper",
        className
      )}
    >
      {children}
    </span>
  );
}
