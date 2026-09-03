'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/navigation';

const navItems = [
  ...navigation.map((item) => ({
    id: item.label.toLowerCase().replace(/\s+/g, '-'),
    icon: item.icon,
    label: item.label === 'Personal Projects' ? 'Projects' : item.label === 'Experience' ? 'Exp.' : item.label,
    ariaLabel: item.label,
    href: item.href,
  })),
  { id: 'resume', icon: FileText, label: 'Resume', ariaLabel: 'Resume', href: '#' },
];

interface MobileBottomNavProps {
  onOpenResume: () => void;
  onOpenHireMe?: () => void;
}

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
          setIsExpanded((prev) => (prev ? false : prev));
          lastScrollY.current = currentScrollY;
        } else if (Math.abs(delta) >= 25) {
          // 20-30px threshold (25px) before changing navbar state
          if (delta > 0) {
            // Scrolling DOWN -> Full menu open
            setIsExpanded((prev) => (!prev ? true : prev));
          } else {
            // Scrolling UP -> Full menu closed
            setIsExpanded((prev) => (prev ? false : prev));
          }
          lastScrollY.current = currentScrollY;
        }
      }

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

  // Hover handlers for the floating island container (with stable debounce to prevent flicker)
  const handleContainerMouseEnter = useCallback(() => {
    isMouseOverRef.current = true;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsExpanded(true);
  }, []);

  const handleContainerMouseLeave = useCallback(() => {
    isMouseOverRef.current = false;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredId(null);
    }, 280);
  }, []);

  // Auto-close timer for touch devices
  const resetTouchTimer = useCallback(() => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      setIsExpanded(false);
      setHoveredId(null);
    }, 4500);
  }, []);

  const handleDotClick = useCallback(() => {
    setIsExpanded(true);
    resetTouchTimer();
  }, [resetTouchTimer]);

  if (!hasMounted) return null;

  return (
    <div
      className="md:hidden fixed z-[90] bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none px-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <nav
        ref={containerRef}
        onMouseEnter={handleContainerMouseEnter}
        onMouseLeave={handleContainerMouseLeave}
        onClick={() => {
          if (!isExpanded) handleDotClick();
        }}
        aria-label="Mobile Navigation"
        className={`pointer-events-auto relative flex items-center justify-center bg-[var(--panel)]/95 border border-[var(--border)] shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-[14px] select-none transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-[width,height,border-radius] ${
          isExpanded
            ? 'h-[54px] w-auto max-w-[calc(100vw-20px)] p-1 rounded-2xl'
            : 'h-[44px] w-[44px] rounded-full cursor-pointer hover:border-[var(--accent)]/50'
        }`}
        style={{
          boxShadow:
            '0 12px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isExpanded ? (
            /* Minimal State: Single Floating Dot */
            <motion.div
              key="minimal-dot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.15 }}
              className="relative w-11 h-11 flex items-center justify-center cursor-pointer"
              aria-label="Open navigation"
            >
              {/* Ripple pulse ring */}
              <span
                className="absolute inset-1 rounded-full border border-[var(--accent)] pointer-events-none animate-ping opacity-60"
                style={{ animationDuration: '2.4s' }}
              />
              {/* Glowing single dot */}
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
            </motion.div>
          ) : (
            /* Maximal State: Full Navigation Menu */
            <motion.div
              key="maximal-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              className="flex items-center gap-0.5"
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
                // Active label remains visible; hovered item also reveals label directly underneath
                const showLabel = isActive || isHovered;

                const itemContent = (
                  <div className="relative flex flex-col items-center justify-center w-[44px] h-[46px] rounded-xl select-none overflow-hidden">
                    {/* Active & Hover pill background with hardware-accelerated opacity */}
                    <div
                      className={`absolute inset-0 rounded-xl border transition-all duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] pointer-events-none ${
                        isActive
                          ? 'bg-[var(--nav-active)] border-[var(--border)] opacity-100 shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]'
                          : isHovered
                          ? 'bg-foreground/[0.06] border-border-subtle/30 opacity-100'
                          : 'opacity-0 border-transparent'
                      }`}
                    />

                    {/* Icon - on top, with transform (y) animation only */}
                    <div
                      className={`relative z-10 flex items-center justify-center shrink-0 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                        showLabel && !shouldReduceMotion ? '-translate-y-1' : 'translate-y-0'
                      }`}
                    >
                      <item.icon
                        size={19}
                        strokeWidth={isActive ? 2.2 : 1.75}
                        className={`transition-colors duration-200 ${
                          isActive
                            ? 'text-[var(--accent)]'
                            : isHovered
                            ? 'text-[var(--text)]'
                            : 'text-[var(--muted)]'
                        }`}
                      />
                    </div>

                    {/* Page label - directly underneath icon with transform (y) + opacity only (200ms ease) */}
                    <span
                      className={`absolute bottom-1 z-10 text-[9px] font-medium tracking-tight leading-none text-center whitespace-nowrap pointer-events-none select-none transition-all duration-200 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-[transform,opacity] ${
                        showLabel
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-1'
                      } ${
                        isActive ? 'text-[var(--text)] font-semibold' : 'text-[var(--muted)]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
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
                      className="relative flex items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shrink-0 cursor-pointer"
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
                    className="relative flex items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] shrink-0 cursor-pointer"
                  >
                    {itemContent}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
