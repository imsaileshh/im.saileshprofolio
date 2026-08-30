'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const categories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
  { id: 'software', label: 'Software' },
];

export function StackNav() {
  const [activeId, setActiveId] = useState<string>('frontend');
  const prefersReducedMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    // Intersect threshold: trigger when section is 20% from top
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: document.getElementById('scroll-container') || null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    categories.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const button = buttonRefs.current[activeId];

    if (!container || !button) return;

    const left = button.offsetLeft - (container.clientWidth - button.clientWidth) / 2;
    container.scrollTo({
      left: Math.max(0, left),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [activeId, prefersReducedMotion]);

  const handleClick = (id: string) => {
    setActiveId(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="sticky top-0 z-40 bg-[var(--bg)]/80 backdrop-blur-md border-b border-border-subtle overflow-x-auto no-scrollbar py-3 px-5 sm:px-6 md:px-10 lg:px-14 -mx-5 sm:-mx-6 md:-mx-10 lg:-mx-14 w-[calc(100%+40px)] sm:w-[calc(100%+48px)] md:w-[calc(100%+80px)] lg:w-[calc(100%+112px)] scroll-smooth"
    >
      <div className="flex items-center gap-2 md:gap-3 min-w-max">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              ref={(button) => {
                buttonRefs.current[cat.id] = button;
              }}
              onClick={() => handleClick(cat.id)}
              type="button"
              aria-current={isActive ? 'true' : undefined}
              className={`relative overflow-hidden px-4 py-2 text-[13px] md:text-[14px] font-medium rounded-full border outline-none transition-all duration-300 active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
                isActive 
                  ? 'border-accent text-[var(--bg)] shadow-[0_8px_24px_rgba(45,212,191,0.20)] hover:bg-accent hover:brightness-110 hover:shadow-[0_10px_28px_rgba(45,212,191,0.28)]' 
                  : 'border-transparent text-muted hover:text-foreground hover:bg-[var(--sidebar)] hover:border-border-subtle'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="stack-active-category"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 420, damping: 34 }
                  }
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
