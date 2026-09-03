'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/navigation';

const navItems = [
  ...navigation.map((item) => ({
    id: item.label.toLowerCase().replace(/\s+/g, '-'),
    icon: item.icon,
    label: item.label === 'Personal Projects' ? 'Projects' : item.label,
    ariaLabel: item.label,
    href: item.href,
  })),
  { id: 'resume', icon: FileText, label: 'Resume', ariaLabel: 'Resume', href: '#' },
];

interface MobileBottomNavProps {
  onOpenResume: () => void;
  onOpenHireMe?: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileBottomNav({ onOpenResume }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Reset hover state on route change
  useEffect(() => {
    setHoveredId(null);
  }, [pathname]);

  if (!hasMounted) return null;

  return (
    <div
      className="md:hidden fixed z-[90] bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.nav
        layout
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 32,
        }}
        aria-label="Mobile Navigation"
        className="pointer-events-auto relative flex items-center justify-center gap-0.5 sm:gap-1 p-1 rounded-full bg-[var(--panel)]/95 border border-[var(--border)] shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-[20px] max-w-[calc(100vw-20px)] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          boxShadow:
            '0 12px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          height: '48px',
        }}
      >
        {navItems.map((item) => {
          let isActive = false;
          if (item.id !== 'resume') {
            isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
          }

          const isHovered = hoveredId === item.id;
          // Active label remains visible; hovered item also expands with label
          const showLabel = isActive || isHovered;

          const itemContent = (
            <motion.div
              layout
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 35,
              }}
              className={`relative flex items-center h-9 rounded-full transition-colors duration-200 select-none ${
                showLabel ? 'px-2.5 gap-1.5' : 'w-9 justify-center'
              }`}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[var(--nav-active)] border border-[var(--border)]"
                  style={{
                    boxShadow:
                      '0 2px 8px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 32,
                  }}
                />
              )}

              {/* Hover pill background (for inactive items) */}
              {isHovered && !isActive && (
                <motion.div
                  layoutId="mobile-nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-foreground/[0.06] border border-border-subtle/30"
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 35,
                  }}
                />
              )}

              {/* Icon */}
              <motion.div
                className="relative z-10 flex items-center justify-center shrink-0"
                animate={{
                  scale: isActive ? 1.05 : isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.18 }}
              >
                <item.icon
                  size={17}
                  strokeWidth={isActive ? 2.2 : 1.75}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--accent)]'
                      : isHovered
                      ? 'text-[var(--text)]'
                      : 'text-[var(--muted)]'
                  }`}
                />
              </motion.div>

              {/* Label text */}
              <AnimatePresence initial={false}>
                {showLabel && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, scale: 0.95 }}
                    animate={{ opacity: 1, width: 'auto', scale: 1 }}
                    exit={{ opacity: 0, width: 0, scale: 0.95 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.2,
                      ease,
                    }}
                    className={`relative z-10 text-[11.5px] whitespace-nowrap overflow-hidden tracking-tight font-medium ${
                      isActive ? 'text-[var(--text)] font-semibold' : 'text-[var(--text)]'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          );

          if (item.id === 'resume') {
            return (
              <button
                key={item.id}
                onClick={onOpenResume}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(item.id)}
                onBlur={() => setHoveredId(null)}
                type="button"
                aria-label={item.ariaLabel}
                className="relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shrink-0"
              >
                {itemContent}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => {
                if (isActive) {
                  const mobileScroll = document.querySelector('[data-mobile-scroll]');
                  if (mobileScroll) {
                    mobileScroll.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(item.id)}
              onBlur={() => setHoveredId(null)}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shrink-0"
            >
              {itemContent}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
