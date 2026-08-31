'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/data/navigation';

const mainNavItems = [
  ...navigation.map(item => ({
    id: item.label.toLowerCase(),
    icon: item.icon,
    label: item.label === 'Experience' ? 'Exp.' : item.label,
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
  const [expanded, setExpanded] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Collapse after 4s of inactivity
  const resetCollapseTimer = () => {
    if (collapseTimer.current) clearTimeout(collapseTimer.current);
    collapseTimer.current = setTimeout(() => setExpanded(false), 4000);
  };

  const handleDotPress = () => {
    setExpanded(true);
    resetCollapseTimer();
  };

  // Collapse on route change
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  // Collapse on outside tap
  useEffect(() => {
    const handler = (e: TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener('touchstart', handler, { passive: true });
    return () => document.removeEventListener('touchstart', handler);
  }, []);

  useEffect(() => {
    return () => { if (collapseTimer.current) clearTimeout(collapseTimer.current); };
  }, []);

  // Find active nav item for the dot color/icon
  const activeItem = mainNavItems.find(item =>
    item.id !== 'resume' &&
    (item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(`${item.href}/`))
  );
  const ActiveIcon = activeItem?.icon ?? mainNavItems[0].icon;

  if (!hasMounted) return null;

  return (
    <div className="md:hidden fixed z-[100] bottom-4 left-0 right-0 flex justify-center items-end pointer-events-none">
      <div ref={containerRef} className="pointer-events-auto flex flex-col items-center">
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="island"
              initial={{ opacity: 0, scale: 0.7, y: 16, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.7, y: 16, filter: 'blur(8px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2 flex items-center gap-1 px-2 py-2 rounded-[20px] bg-[var(--panel)] border border-[var(--border)] shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-[20px]"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.06)' }}
              onTouchStart={resetCollapseTimer}
            >
              {mainNavItems.map((item) => {
                let isActive = false;
                if (item.id !== 'resume') {
                  isActive = item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);
                }

                const iconEl = (
                  <div className="relative flex flex-col items-center gap-[3px]">
                    {/* Active background pill */}
                    {isActive && (
                      <motion.div
                        layoutId="island-active-pill"
                        className="absolute inset-0 rounded-[13px] bg-[var(--nav-active)]"
                        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}

                    {/* Icon */}
                    <motion.div
                      className="relative z-10 w-12 h-11 flex flex-col items-center justify-center gap-[3px]"
                      animate={{ scale: isActive ? 1.08 : 1 }}
                      transition={{ duration: 0.22 }}
                      whileTap={{ scale: 0.88 }}
                    >
                      <item.icon
                        size={20}
                        strokeWidth={isActive ? 2.2 : 1.6}
                        className={
                          isActive
                            ? 'text-[var(--text)] transition-colors duration-200'
                            : 'text-[var(--muted)] transition-colors duration-200'
                        }
                      />
                      {/* Label */}
                      <span
                        className={`text-[9px] font-medium tracking-wide leading-none transition-colors duration-200 ${
                          isActive ? 'text-[var(--text)]' : 'text-[var(--muted)]'
                        }`}
                      >
                        {item.label}
                      </span>

                      {/* Active dot */}
                      {isActive && (
                        <motion.span
                          layoutId="island-dot"
                          className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[var(--accent)]"
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                    </motion.div>
                  </div>
                );

                if (item.id === 'resume') {
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onOpenResume(); setExpanded(false); }}
                      className="relative flex flex-col items-center"
                      aria-label={item.ariaLabel}
                      type="button"
                    >
                      {iconEl}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="relative flex flex-col items-center"
                    aria-label={item.ariaLabel}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setExpanded(false)}
                  >
                    {iconEl}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The floating dot / trigger */}
        <motion.button
          type="button"
          aria-label="Open navigation"
          onClick={handleDotPress}
          animate={
            expanded
              ? { width: 44, height: 44, borderRadius: 22 }
              : { width: 44, height: 44, borderRadius: 22 }
          }
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center bg-[var(--panel)] border border-[var(--border)] shadow-[0_8px_24px_rgba(0,0,0,0.28)] backdrop-blur-[16px] overflow-hidden outline-none"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          {/* Ripple pulse ring */}
          {!expanded && (
            <>
              <motion.span
                key="ring1"
                className="absolute inset-0 rounded-full border border-[var(--accent)]"
                initial={{ opacity: 0.4, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.2 }}
              />
              <motion.span
                key="ring2"
                className="absolute inset-0 rounded-full border border-[var(--accent)]"
                initial={{ opacity: 0.25, scale: 1 }}
                animate={{ opacity: 0, scale: 2.4 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.5, repeatDelay: 0.2 }}
              />
            </>
          )}

          {/* Active route icon in the dot */}
          <motion.div
            animate={{ scale: expanded ? 0.85 : 1, opacity: expanded ? 0.6 : 1 }}
            transition={{ duration: 0.22 }}
          >
            <ActiveIcon
              size={18}
              strokeWidth={2}
              className="text-[var(--accent)]"
            />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
