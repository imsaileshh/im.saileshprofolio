'use client';

import { useState, useEffect, useRef } from 'react';
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
  const mainPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenHireMe = () => setIsHireMeOpen(true);
    window.addEventListener('open-hire-me', handleOpenHireMe);
    return () => window.removeEventListener('open-hire-me', handleOpenHireMe);
  }, []);

  useEffect(() => {
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
    // Reset mobile window & container scroll
    window.scrollTo({ top: 0, behavior: 'instant' });
    const mobileMain = document.querySelector('[data-mobile-scroll]');
    if (mobileMain) {
      mobileMain.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname]);

  if (isDashboard) {
    return (
      <ReactLenis root>
        <div className="min-h-screen">
          {children}
        </div>
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
        <Sidebar mobile onOpenResume={() => setIsResumeOpen(true)} onOpenHireMe={() => setIsHireMeOpen(true)} />
        
        <main 
          className="flex-1 w-full overflow-x-hidden mobile-main" 
          style={{ 
            padding: '80px 14px calc(88px + env(safe-area-inset-bottom)) 14px',
            WebkitOverflowScrolling: 'touch'
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
        <MobileBottomNav onOpenResume={() => setIsResumeOpen(true)} onOpenHireMe={() => setIsHireMeOpen(true)} />
      </div>

      {/* Desktop: Fixed App Shell with internal scrolling */}
      <div className="hidden md:flex h-[100dvh] w-full bg-[var(--bg)] overflow-hidden">
        {/* Fixed Left Sidebar */}
        <div className="w-[275px] shrink-0 h-full overflow-hidden">
          <Sidebar onOpenResume={() => setIsResumeOpen(true)} onOpenHireMe={() => setIsHireMeOpen(true)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-5 lg:p-6 min-w-0 min-h-0 h-full flex flex-col overflow-hidden relative">
          <div className="absolute top-9 right-9 lg:top-10 lg:right-10 z-50">
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
                className="w-full min-h-full flex flex-col"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}
