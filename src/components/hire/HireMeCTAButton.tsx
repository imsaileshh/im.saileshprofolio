'use client';
import { ArrowUpRight } from 'lucide-react';

export function HireMeCTAButton() {
  return (
    <button 
      onClick={() => window.dispatchEvent(new CustomEvent('open-hire-me'))}
      className="group inline-flex items-center gap-2 bg-foreground text-[var(--bg)] px-8 py-4 rounded-xl font-medium hover:scale-[1.015] transition-transform duration-[300ms] shrink-0"
    >
      Hire me
      <ArrowUpRight size={18} className="group-hover:translate-x-[3px] group-hover:-translate-y-[3px] transition-transform duration-[240ms]" />
    </button>
  );
}
