'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const isMouseOverRef = useRef(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Reset state on route change
  useEffect(() => {
    setIsExpanded(false);
    setHoveredId(null);
  }, [pathname]);

  // ── Scroll direction detection (scroll down -> open full menu, scroll up -> close full menu) ──
  useEffect(() => {
    if (!hasMounted) return;

    const scrollContainer = document.querySelector('[data-mobile-scroll]');

    const getScrollY = () => {
      if (scrollContainer && scrollContainer.scrollTop > 0) {
        return scrollContainer.scrollTop;
      }
      return window.scrollY || document.documentElement.scrollTop || 0;
    };

    const updateScrollDirection = () => {
      const currentScrollY = getScrollY();
      const delta = currentScrollY - lastScrollY.current;

      // Don't auto-collapse if mouse is actively hovering over the island
      if (!isMouseOverRef.current) {
        // Top of page -> Collapsed (minimal single dot)
        if (currentScrollY < 24) {
          setIsExpanded(false);
        } else if (Math.abs(delta) > 6) {
          // Scrolling DOWN -> Full menu open
          if (delta > 0) {
            setIsExpanded(true);
          }
          // Scrolling UP -> Full menu closed
          else {
            setIsExpanded(false);
          }
        }
      }

      lastScrollY.current = Math.max(0, currentScrollY);
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', onScroll);
      }
    };
  }, [hasMounted]);

  // Touch outside handler (to close on mobile tap outside)
  useEffect(() => {
    const handleTouchOutside = (e: TouchEvent | MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setHoveredId(null);
      }
    };
    document.addEventListener('touchstart', handleTouchOutside, { passive: true });
    document.addEventListener('mousedown', handleTouchOutside);
    return () => {
      document.removeEventListener('touchstart', handleTouchOutside);
      document.removeEventListener('mousedown', handleTouchOutside);
    };
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    };
  }, []);

  // Hover handlers for the floating island container
  const handleContainerMouseEnter = () => {
    isMouseOverRef.current = true;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsExpanded(true);
  };

  const handleContainerMouseLeave = () => {
    isMouseOverRef.current = false;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredId(null);
    }, 280);
  };

  // Auto-close timer for touch devices
  const resetTouchTimer = () => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredId(null);
    }, 4500);
  };

  const handleDotClick = () => {
    setIsExpanded(true);
    resetTouchTimer();
  };

  if (!hasMounted) return null;

  return (
    <div
      className="md:hidden fixed z-[90] bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.nav
        ref={containerRef}
        layout
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
        onClick={() => {
          if (!isExpanded) handleDotClick();
        }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 30,
        }}
        aria-label="Mobile Navigation"
        className={`pointer-events-auto relative flex items-center justify-center rounded-full bg-[var(--panel)]/95 border border-[var(--border)] shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-[20px] select-none ${
          isExpanded
            ? 'max-w-[calc(100vw-20px)] p-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
            : 'cursor-pointer hover:border-[var(--accent)]/50'
        }`}
        style={{
          boxShadow:
            '0 12px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
          height: isExpanded ? '48px' : '44px',
          width: isExpanded ? 'auto' : '44px',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isExpanded ? (
            /* Minimal State: Single Floating Dot */
            <motion.div
              key="minimal-dot"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.16 }}
              className="relative w-11 h-11 flex items-center justify-center cursor-pointer"
              aria-label="Open navigation"
            >
              {/* Ripple pulse ring */}
              <motion.span
                className="absolute inset-1 rounded-full border border-[var(--accent)] pointer-events-none"
                initial={{ opacity: 0.55, scale: 0.8 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeOut',
                  repeatDelay: 0.2,
                }}
              />
              {/* Glowing single dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            </motion.div>
          ) : (
            /* Maximal State: Full Navigation Menu */
            <motion.div
              key="maximal-menu"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease }}
              className="flex items-center gap-0.5 sm:gap-1"
              onTouchStart={resetTouchTimer}
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
                      onClick={() => {
                        onOpenResume();
                        setIsExpanded(false);
                      }}
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
                      setIsExpanded(false);
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
