'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if already shown in this tab session
    const hasLoaded = sessionStorage.getItem('portfolio_preloader_seen');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Progress counter animation
    const startTime = Date.now();
    const duration = 1400; // 1.4 seconds smooth load

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem('portfolio_preloader_seen', 'true');
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg)] text-[var(--text)] select-none overflow-hidden"
        >
          {/* Ambient Glow */}
          <div
            className="absolute w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-20 transition-all duration-700"
            style={{
              background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-xs w-full px-6">
            {/* Wordmark Logo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-1 mb-2"
            >
              <span className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
                Sailesh
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] inline-block ml-0.5 shadow-[0_0_12px_var(--accent)]"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[10px] md:text-[11px] font-mono tracking-[0.24em] text-[var(--muted)] uppercase mb-8"
            >
              DESIGN · CODE · COMMERCE
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-[200px] h-[3px] bg-[var(--border)] rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Percentage Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono font-medium text-[var(--muted)] tabular-nums tracking-widest"
            >
              {progress}%
            </motion.div>
          </div>

          {/* Bottom Accent line indicator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
