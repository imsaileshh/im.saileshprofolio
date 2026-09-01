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

  // Clean, stable sidebar state (starts wide / standard or user toggled, NO scroll-down auto opening)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const mainPanelRef = useRef<HTMLDivElement>(null);

  // ── MANUAL TOGGLE (sidebar toggle button) ───────────────────────────────
  const handleToggleCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  // ── MODAL EVENT BUS ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleOpenHireMe = () => setIsHireMeOpen(true);
    const handleOpenResume = () => setIsResumeOpen(true);
    window.addEventListener('open-hire-me', handleOpenHireMe);
    window.addEventListener('open-resume', handleOpenResume);
    return () => {
      window.removeEventListener('open-hire-me', handleOpenHireMe);
      window.removeEventListener('open-resume', handleOpenResume);
    };
  }, []);

  // ── SCROLL TO TOP ON ROUTE CHANGE ───────────────────────────────────────
  useEffect(() => {
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mobileMain = document.querySelector('[data-mobile-scroll]');
    if (mobileMain) mobileMain.scrollTo({ top: 0, behavior: 'instant' });
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

      {/* Desktop: Steady Sidebar Shell (NO scroll-down auto expansion) */}
      <div className="hidden md:flex h-[100dvh] w-full bg-[var(--bg)] overflow-hidden p-5 lg:p-6 gap-5 lg:gap-6">

        {/* ── SIDEBAR ── */}
        <div
          style={{ width: isSidebarCollapsed ? 72 : 275 }}
          className="shrink-0 h-full relative z-40 transition-[width] duration-300 ease-in-out"
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleCollapse}
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenHireMe={() => setIsHireMeOpen(true)}
          />
        </div>

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
