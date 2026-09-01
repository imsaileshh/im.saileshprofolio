'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from '../theme/ThemeToggle';
import { ReactLenis } from 'lenis/react';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileFooter } from './MobileFooter';
import { ResumeModal } from '../resume/ResumeModal';
import { HireMeModal } from '../hire/HireMeModal';
import { Preloader } from '../ui/Preloader';

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHireMeOpen, setIsHireMeOpen] = useState(false);

  // true = minimal/narrow, false = maximal/wide
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const mainPanelRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Refs for stale-closure-safe priority state
  const isHoveringRef = useRef(false);
  const scrollExpandedRef = useRef(false);
  const hoverLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Gate: intro must finish before hover/scroll take full control
  const introCompleteRef = useRef(false);

  // ── Priority resolver ────────────────────────────────────────────────────
  // Hover takes priority over scroll state.
  const resolveCollapsed = useCallback(() => {
    if (isHoveringRef.current || scrollExpandedRef.current) {
      setIsSidebarCollapsed(false);
    } else {
      setIsSidebarCollapsed(true);
    }
  }, []);

  // ── PAGE-LOAD INTRO ──────────────────────────────────────────────────────
  // t=0    : MINIMAL (starts collapsed)
  // t=500ms: MINIMAL → MAXIMAL (demo expansion)
  // t=3s   : MAXIMAL → MINIMAL (return to rest, unless user is hovering)
  // t=3s+  : scroll / hover behavior enabled
  useEffect(() => {
    const expandTimer = setTimeout(() => {
      setIsSidebarCollapsed(false); // demo: MINIMAL → MAXIMAL

      const collapseTimer = setTimeout(() => {
        introCompleteRef.current = true;
        if (!isHoveringRef.current) {
          setIsSidebarCollapsed(true); // return: MAXIMAL → MINIMAL
          scrollExpandedRef.current = false;
        }
      }, 2500);

      return () => clearTimeout(collapseTimer);
    }, 500);

    return () => clearTimeout(expandTimer);
  }, []);

  // ── HOVER: expand on enter, collapse on leave (200ms debounce) ──────────
  const handleSidebarMouseEnter = useCallback(() => {
    if (hoverLeaveTimerRef.current) {
      clearTimeout(hoverLeaveTimerRef.current);
      hoverLeaveTimerRef.current = null;
    }
    isHoveringRef.current = true;
    setIsSidebarCollapsed(false);
  }, []);

  const handleSidebarMouseLeave = useCallback(() => {
    hoverLeaveTimerRef.current = setTimeout(() => {
      isHoveringRef.current = false;
      if (introCompleteRef.current) {
        resolveCollapsed();
      }
    }, 200);
  }, [resolveCollapsed]);

  // ── SCROLL-DRIVEN expand / collapse ─────────────────────────────────────
  useEffect(() => {
    const container = mainPanelRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (!introCompleteRef.current) return; // ignore scroll during intro

      const currentY = container.scrollTop;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) < 3) return; // ignore micro-jitter

      if (delta > 0) {
        // Scrolling DOWN → MAXIMAL
        scrollExpandedRef.current = true;
      } else {
        // Scrolling UP → MINIMAL
        scrollExpandedRef.current = false;
      }

      lastScrollY.current = currentY;

      // Hover still takes priority
      if (!isHoveringRef.current) {
        resolveCollapsed();
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [resolveCollapsed]);

  // ── MANUAL TOGGLE (sidebar buttons) ─────────────────────────────────────
  const handleToggleCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      // Sync scroll ref so the manual state "sticks" after hover
      scrollExpandedRef.current = !next;
      return next;
    });
  }, []);

  // ── MODAL EVENT BUS ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleOpenHireMe = () => setIsHireMeOpen(true);
    window.addEventListener('open-hire-me', handleOpenHireMe);
    return () => window.removeEventListener('open-hire-me', handleOpenHireMe);
  }, []);

  // ── SCROLL TO TOP ON ROUTE CHANGE ───────────────────────────────────────
  useEffect(() => {
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
      lastScrollY.current = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mobileMain = document.querySelector('[data-mobile-scroll]');
    if (mobileMain) mobileMain.scrollTo({ top: 0, behavior: 'instant' });
    // Reset scroll expansion state on route change
    scrollExpandedRef.current = false;
  }, [pathname]);

  if (isDashboard) {
    return (
      <ReactLenis root>
        <div className="min-h-screen">{children}</div>
      </ReactLenis>
    );
  }

  return (
    <>
      <Preloader />
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <HireMeModal isOpen={isHireMeOpen} onClose={() => setIsHireMeOpen(false)} />

      {/* Mobile: Native Body Scroll Shell */}
      <div className="md:hidden flex flex-col min-h-[100dvh] w-full bg-[var(--bg)] relative mobile-layout">
        <Sidebar
          mobile
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenHireMe={() => setIsHireMeOpen(true)}
        />
        <main
          className="flex-1 w-full overflow-x-hidden mobile-main"
          style={{
            padding: '80px 14px calc(88px + env(safe-area-inset-bottom)) 14px',
            WebkitOverflowScrolling: 'touch',
          }}
          data-mobile-scroll
        >
          <div className="w-full h-auto m-0 border border-border-subtle rounded-[16px] bg-[var(--panel)] overflow-visible block mobile-content-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-auto min-h-0"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
          <MobileFooter />
        </main>
        <MobileBottomNav
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenHireMe={() => setIsHireMeOpen(true)}
        />
      </div>

      {/* Desktop: Floating Island Shell */}
      <div className="hidden md:flex h-[100dvh] w-full bg-[var(--bg)] overflow-hidden p-5 lg:p-6 gap-5 lg:gap-6">

        {/* ── FLOATING ISLAND SIDEBAR ── */}
        <motion.div
          animate={{ width: isSidebarCollapsed ? 72 : 275 }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 32,
            mass: 0.85,
          }}
          className="shrink-0 h-full relative z-40"
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleCollapse}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenHireMe={() => setIsHireMeOpen(true)}
          />
        </motion.div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 min-h-0 h-full flex flex-col overflow-hidden relative">
          <div className="absolute top-5 right-5 lg:top-6 lg:right-6 z-50">
            <ThemeToggle />
          </div>
          <div
            id="scroll-container"
            ref={mainPanelRef}
            className="main-panel rounded-2xl w-full h-full min-h-0 overflow-y-auto overflow-x-hidden relative"
            style={{ scrollBehavior: 'smooth' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full min-h-full flex flex-col justify-between"
              >
                <div className="flex-1 w-full">{children}</div>
                <MobileFooter />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}
