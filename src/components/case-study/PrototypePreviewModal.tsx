'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Laptop, 
  Maximize2, 
  Minimize2, 
  RotateCw, 
  Smartphone, 
  X 
} from 'lucide-react';

interface PrototypePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  prototypeUrl: string;
  defaultDevice?: 'desktop' | 'mobile';
}

export function PrototypePreviewModal({
  isOpen,
  onClose,
  title,
  prototypeUrl,
  defaultDevice = 'desktop',
}: PrototypePreviewModalProps) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>(defaultDevice);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Format Figma embed if standard figma link
  const embedUrl = prototypeUrl.includes('figma.com') && !prototypeUrl.includes('embed')
    ? `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(prototypeUrl)}`
    : prototypeUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 flex flex-col bg-[#0f1012] border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
            isFullscreen
              ? 'w-full h-full max-w-none max-h-none rounded-none'
              : 'w-full max-w-6xl h-[92vh]'
          }`}
        >
          {/* ── Top Browser Bar & Device Switcher ── */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#151619] shrink-0">
            {/* Left: Window Traffic Lights */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 cursor-pointer" onClick={() => setIsFullscreen(!isFullscreen)} />
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-zinc-400 font-medium truncate max-w-[200px]">
                {title}
              </span>
            </div>

            {/* Center: Device Switcher Tabs */}
            <div className="flex items-center gap-1 bg-black/40 border border-white/5 p-1 rounded-lg">
              <button
                onClick={() => setDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  device === 'desktop'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Laptop size={14} />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => setDevice('mobile')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  device === 'mobile'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone size={14} />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIframeKey((k) => k + 1)}
                title="Reload Prototype"
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                <RotateCw size={14} />
              </button>

              <a
                href={prototypeUrl}
                target="_blank"
                rel="noreferrer"
                title="Open in new tab"
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-[#4F8CFF] transition-colors"
              >
                <ExternalLink size={14} />
              </a>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>

              <button
                onClick={onClose}
                title="Close"
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-white/10 hover:text-white transition-colors ml-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* ── Prototype Preview Frame ── */}
          <div className="flex-1 bg-[#090a0c] flex items-center justify-center p-2 sm:p-4 overflow-hidden relative">
            {device === 'desktop' ? (
              /* Desktop Frame */
              <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl relative flex flex-col">
                {/* Browser Sub-Header with Address Bar */}
                <div className="h-7 bg-[#1c1d22] border-b border-white/5 flex items-center px-3 gap-2 shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="flex-1 max-w-sm mx-auto h-4.5 rounded bg-black/40 border border-white/5 px-2 flex items-center text-[10px] font-mono text-zinc-500 truncate">
                    {prototypeUrl}
                  </div>
                </div>
                <iframe
                  key={iframeKey}
                  src={embedUrl}
                  title="Desktop Prototype"
                  className="w-full flex-1 border-0 bg-white"
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  allowFullScreen
                />
              </div>
            ) : (
              /* Mobile Phone Mockup Frame (iPhone Proportion) */
              <div className="h-full max-h-[760px] aspect-[9/19] rounded-[44px] border-[10px] border-[#22242a] bg-black shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-white/20">
                {/* Mobile Dynamic Island / Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end pr-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
                </div>
                <iframe
                  key={iframeKey}
                  src={embedUrl}
                  title="Mobile Prototype"
                  className="w-full h-full border-0 bg-white"
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
