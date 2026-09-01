'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Globe, 
  Laptop, 
  Loader2, 
  Lock, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Smartphone, 
  X,
  AlertCircle
} from 'lucide-react';

export interface BrowserPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  defaultDevice?: 'desktop' | 'mobile';
}

export function BrowserPreviewModal({
  isOpen,
  onClose,
  title,
  url,
  defaultDevice = 'desktop',
}: BrowserPreviewModalProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>(defaultDevice);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallbackBanner, setShowFallbackBanner] = useState(false);
  const scrollPositionRef = useRef<number>(0);

  // Auto-format Figma prototype / design links into embed URLs
  const isFigma = url?.includes('figma.com');
  const embedUrl = isFigma && !url.includes('embed')
    ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`
    : url;

  // Clean display URL for the address bar
  const displayUrl = (() => {
    try {
      if (!url) return '';
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
    } catch {
      return url || '';
    }
  })();

  // Handle ESC key and scroll locking with scroll position restoration
  useEffect(() => {
    if (!isOpen) return;

    // Save scroll position
    scrollPositionRef.current = window.scrollY;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    };
  }, [isOpen, onClose]);

  // Loading timer for slow/restricted embeds
  useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);
    setShowFallbackBanner(false);

    const timer = setTimeout(() => {
      setShowFallbackBanner(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, [isOpen, url, iframeKey]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Browser Preview'}
      >
        {/* ── Backdrop ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          onClick={onClose}
        />

        {/* ── Browser Window Container ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`relative z-10 flex flex-col bg-[#0f1013] border border-white/10 rounded-2xl md:rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] transition-all duration-300 overflow-hidden ${
            isFullscreen
              ? 'w-full h-full max-w-none max-h-none rounded-none border-none'
              : 'w-full max-w-6xl h-[94vh] sm:h-[90vh]'
          }`}
        >
          {/* ── Top Browser Chrome Bar ── */}
          <div className="flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-white/[0.08] bg-[#141519] shrink-0 gap-2 sm:gap-4">
            
            {/* Left: Window Controls (Traffic Lights) & Title */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close window"
                  className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 active:scale-90 transition-transform cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  aria-label="Reset window"
                  className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 active:scale-90 transition-transform cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  aria-label="Toggle fullscreen"
                  className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 active:scale-90 transition-transform cursor-pointer"
                />
              </div>

              <span className="hidden md:inline-block text-xs font-mono text-zinc-400 font-medium truncate max-w-[180px]">
                {title}
              </span>
            </div>

            {/* Center: Address Bar */}
            <div className="flex-1 max-w-lg mx-auto flex items-center justify-center">
              <div className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-xs font-mono text-zinc-300">
                <Lock size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate flex-1 text-center font-mono text-[11px] sm:text-xs text-zinc-300">
                  {displayUrl}
                </span>
                {isLoading && (
                  <Loader2 size={12} className="animate-spin text-accent shrink-0" />
                )}
              </div>
            </div>

            {/* Right: Device Switcher & Action Controls */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Device Switcher (Desktop / Mobile) */}
              <div className="hidden sm:flex items-center gap-0.5 bg-black/40 border border-white/[0.06] p-0.5 rounded-lg mr-1">
                <button
                  type="button"
                  onClick={() => setDevice('desktop')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    device === 'desktop'
                      ? 'bg-white/10 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Desktop Preview"
                >
                  <Laptop size={13} />
                  <span>Desktop</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDevice('mobile')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                    device === 'mobile'
                      ? 'bg-white/10 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Mobile Frame Preview"
                >
                  <Smartphone size={13} />
                  <span>Mobile</span>
                </button>
              </div>

              {/* Reload Button */}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setIframeKey((k) => k + 1);
                }}
                title="Reload Preview"
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCw size={14} className={isLoading ? 'animate-spin' : ''} />
              </button>

              {/* Open in New Tab Button */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                className="inline-flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-accent transition-colors text-xs font-medium"
              >
                <ExternalLink size={14} />
                <span className="hidden lg:inline text-[11px]">Open Tab</span>
              </a>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                className="hidden sm:inline-flex p-1.5 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                title="Close (Esc)"
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

          </div>

          {/* ── Browser Viewport Area ── */}
          <div className="flex-1 bg-[#090a0d] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden relative">
            
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#090a0d]/90 backdrop-blur-xs gap-3">
                <Loader2 size={26} className="animate-spin text-accent" />
                <p className="text-xs font-mono text-zinc-400">Loading live preview...</p>
              </div>
            )}

            {/* Fallback Banner for CSP / X-Frame-Options restricted sites */}
            {showFallbackBanner && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2 rounded-xl bg-black/90 border border-white/15 text-xs text-zinc-300 shadow-2xl backdrop-blur-md max-w-md w-[92%]">
                <AlertCircle size={15} className="text-amber-400 shrink-0" />
                <span className="flex-1 truncate text-[11.5px]">
                  Site restricting in-app preview?
                </span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline shrink-0"
                >
                  Open in New Tab <ArrowUpRight size={12} />
                </a>
              </div>
            )}

            {/* ── Frame Renderer ── */}
            {device === 'desktop' ? (
              /* Desktop Browser View */
              <div className="w-full h-full rounded-xl overflow-hidden border border-white/[0.08] bg-black shadow-2xl relative flex flex-col">
                <iframe
                  key={iframeKey}
                  src={embedUrl}
                  title={title || 'Preview'}
                  onLoad={() => setIsLoading(false)}
                  className="w-full flex-1 border-0 bg-white"
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  allowFullScreen
                  sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            ) : (
              /* Mobile Frame View (iPhone Style Mockup) */
              <div className="h-full max-h-[720px] aspect-[9/19] rounded-[44px] border-[10px] border-[#22242a] bg-black shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-white/20">
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end pr-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
                </div>
                <iframe
                  key={iframeKey}
                  src={embedUrl}
                  title={title || 'Mobile Preview'}
                  onLoad={() => setIsLoading(false)}
                  className="w-full h-full border-0 bg-white"
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  allowFullScreen
                  sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
