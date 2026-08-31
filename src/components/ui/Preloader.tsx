'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// Sequence phases
// 0: "HELLO"
// 1: "I'M SAILESH"
// 2: "UI/UX DESIGNER"
// 3: "FRONTEND DEVELOPER"
// 4: "SHOPIFY • AI • DIGITAL"
// 5: Exit / Reveal

const maskSlideVariants: Variants = {
  initial: { y: '115%', opacity: 0 },
  animate: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    y: '-115%',
    opacity: 0,
    transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export function Preloader() {
  const [phase, setPhase] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Safety unlock scroll function
  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    const mobileScroll = document.querySelector('[data-mobile-scroll]') as HTMLElement | null;
    if (mobileScroll) mobileScroll.style.overflow = '';
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    // Lock scroll during intro
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    const mobileScroll = document.querySelector('[data-mobile-scroll]') as HTMLElement | null;
    if (mobileScroll) mobileScroll.style.overflow = 'hidden';

    // Sequence timing (total ~2.9s before curtain exit)
    setPhase(0); // HELLO (0ms)

    const t1 = setTimeout(() => setPhase(1), 600);   // I'M SAILESH (600ms)
    const t2 = setTimeout(() => setPhase(2), 1400);  // UI/UX DESIGNER (1400ms)
    const t3 = setTimeout(() => setPhase(3), 1950);  // FRONTEND DEVELOPER (1950ms)
    const t4 = setTimeout(() => setPhase(4), 2500);  // SHOPIFY • AI • DIGITAL (2500ms)
    const t5 = setTimeout(() => {
      setPhase(5); // Trigger curtain slide up
      setIsVisible(false);
      unlockScroll();
    }, 3100);

    // Hard fallback timeout so it never gets stuck
    const safetyTimeout = setTimeout(() => {
      setIsVisible(false);
      unlockScroll();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(safetyTimeout);
      unlockScroll();
    };
  }, [unlockScroll]);

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {isVisible && (
        <motion.div
          key="cinematic-intro-curtain"
          initial={{ y: '0%' }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1] as const,
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between items-center bg-[#090A0C] text-[#F4F4F4] select-none pointer-events-auto overflow-hidden px-6 py-8 md:p-12"
        >
          {/* Top subtle coordinates header */}
          <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-[#9A9CA2]/40 uppercase">
            <span>SAILESH P</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              PORTFOLIO 2026
            </span>
          </div>

          {/* Central Cinematic Typography Sequence */}
          <div className="relative flex flex-col items-center justify-center text-center my-auto min-h-[140px] md:min-h-[180px] w-full max-w-2xl px-4">
            <AnimatePresence mode="wait">
              {/* PHASE 0: HELLO */}
              {phase === 0 && (
                <div key="phase-hello" className="overflow-hidden py-2">
                  <motion.h1
                    variants={maskSlideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-4xl sm:text-5xl md:text-7xl font-display font-semibold tracking-tight text-[#F4F4F4]"
                  >
                    HELLO
                  </motion.h1>
                </div>
              )}

              {/* PHASE 1: I'M SAILESH */}
              {phase === 1 && (
                <div key="phase-name" className="overflow-hidden py-2">
                  <motion.h1
                    variants={maskSlideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-3xl sm:text-5xl md:text-7xl font-display font-semibold tracking-tight flex items-center justify-center gap-2 md:gap-3.5 flex-wrap"
                  >
                    <span className="text-[#9A9CA2]/70 font-light">I&apos;M</span>
                    <span className="text-[#F4F4F4] font-bold">SAILESH</span>
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-[#2DD4BF] shadow-[0_0_14px_#2DD4BF] inline-block"
                    />
                  </motion.h1>
                </div>
              )}

              {/* PHASE 2: UI/UX DESIGNER */}
              {phase === 2 && (
                <div key="phase-uiux" className="overflow-hidden py-2">
                  <motion.div
                    variants={maskSlideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#2DD4BF] uppercase font-semibold">
                      01 / SPECIALTY
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-semibold tracking-tight text-[#F4F4F4]">
                      UI/UX DESIGNER
                    </h2>
                  </motion.div>
                </div>
              )}

              {/* PHASE 3: FRONTEND DEVELOPER */}
              {phase === 3 && (
                <div key="phase-frontend" className="overflow-hidden py-2">
                  <motion.div
                    variants={maskSlideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#2DD4BF] uppercase font-semibold">
                      02 / SPECIALTY
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-semibold tracking-tight text-[#F4F4F4]">
                      FRONTEND DEVELOPER
                    </h2>
                  </motion.div>
                </div>
              )}

              {/* PHASE 4: SHOPIFY • AI • DIGITAL */}
              {phase === 4 && (
                <div key="phase-digital" className="overflow-hidden py-2">
                  <motion.div
                    variants={maskSlideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex flex-col items-center gap-2"
                  >
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#2DD4BF] uppercase font-semibold">
                      03 / WORKFLOWS
                    </span>
                    <h2 className="text-xl sm:text-3xl md:text-5xl font-display font-semibold tracking-tight text-[#F4F4F4] flex items-center justify-center gap-2 md:gap-3 flex-wrap">
                      <span>SHOPIFY</span>
                      <span className="text-[#2DD4BF] text-sm md:text-xl font-mono">•</span>
                      <span>AI</span>
                      <span className="text-[#2DD4BF] text-sm md:text-xl font-mono">•</span>
                      <span>DIGITAL</span>
                    </h2>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom subtle bar indicator */}
          <div className="w-full flex justify-between items-center text-[10px] font-mono tracking-[0.2em] text-[#9A9CA2]/40 uppercase">
            <span>UI/UX Designer │ Product Designer</span>
            <span className="text-[#2DD4BF]/80 font-semibold">INITIALIZING</span>
          </div>

          {/* Bottom subtle progress line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.1, ease: 'linear' }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
