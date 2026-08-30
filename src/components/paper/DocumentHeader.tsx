import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface DocumentHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  metadata?: ReactNode;
  className?: string;
}

export function DocumentHeader({ title, subtitle, metadata, className }: DocumentHeaderProps) {
  return (
    <header className={cn("border-b border-border-ink pb-8 mb-8", className)}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {metadata && (
            <div className="mb-4">
              {metadata}
            </div>
          )}
          <h2 className="font-serif text-3xl md:text-4xl text-ink tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-ink-light text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
