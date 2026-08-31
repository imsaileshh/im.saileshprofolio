'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/data/navigation';

const navItems = [
  ...navigation.map((item) => ({
    id: item.label.toLowerCase(),
    icon: item.icon,
    ariaLabel: item.label,
    href: item.href,
  })),
  { id: 'resume', icon: FileText, ariaLabel: 'Resume', href: '#' },
];

interface MobileBottomNavProps {
  onOpenResume: () => void;
  onOpenHireMe?: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileBottomNav({ onOpenResume }: MobileBottomNavProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Reset visibility on route change
  useEffect(() => {
    setIsVisible(true);
  }, [pathname]);

  // ── Scroll direction detection (hide on scroll down, show on scroll up) ──
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

      // Always show when near top of the page
      if (currentScrollY < 24) {
        setIsVisible(true);
      } else if (Math.abs(delta) > 8) {
        // Scrolling DOWN -> Hide
        if (delta > 0) {
          setIsVisible(false);
        }
        // Scrolling UP -> Show
        else {
          setIsVisible(true);
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

  if (!hasMounted) return null;

  return (
    <div
      className="md:hidden fixed z-[90] bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none px-4"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.nav
        initial={false}
        animate={{
          y: isVisible ? 0 : 80,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: shouldReduceMotion ? 0.15 : 0.3,
          ease,
        }}
        aria-label="Mobile Navigation"
        className="pointer-events-auto flex items-center justify-between gap-1 sm:gap-1.5 px-2 py-1.5 rounded-full bg-[var(--panel)] border border-[var(--border)] shadow-[0_12px_36px_rgba(0,0,0,0.35)] backdrop-blur-[20px] max-w-[360px] w-full"
        style={{
          boxShadow:
            '0 12px 32px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
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

          const buttonContent = (
            <div className="relative w-11 h-11 flex items-center justify-center">
              {/* Active pill background */}
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[var(--nav-active)]"
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                  transition={{ duration: 0.28, ease }}
                />
              )}

              {/* Icon */}
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.75}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--muted)]'
                  }`}
                />

                {/* Subtle active indicator dot */}
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active-dot"
                    className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-[var(--accent)]"
                    transition={{ duration: 0.28, ease }}
                  />
                )}
              </motion.div>
            </div>
          );

          if (item.id === 'resume') {
            return (
              <button
                key={item.id}
                onClick={onOpenResume}
                type="button"
                aria-label={item.ariaLabel}
                className="relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {buttonContent}
              </button>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              className="relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {buttonContent}
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
