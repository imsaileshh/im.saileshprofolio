'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, MapPin, Clock } from 'lucide-react';

export function HireMeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending then close
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ perspective: '1200px' }}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, rotateX: -25, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, rotateX: 15, y: 30, scale: 0.95 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom center' }}
            className="relative w-full max-w-4xl bg-[var(--bg)] border border-border-subtle rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-border-subtle/50 hover:bg-border-subtle text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            {/* Left Info Panel */}
            <div className="w-full md:w-2/5 bg-[var(--sidebar)] p-8 md:p-12 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-border-subtle">
              <h2 className="text-3xl font-display font-medium text-foreground mb-4">Hire me</h2>
              <p className="text-muted mb-10">I'm currently available for freelance work and full-time roles. Let's build something great together.</p>
              
              <div className="flex flex-col gap-6 mt-auto">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--card)] border border-border-subtle text-muted shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium tracking-widest text-muted uppercase mb-0.5">Email</span>
                    <a href="mailto:im.saileshhh@gmail.com" className="text-sm text-foreground hover:text-accent transition-colors font-medium">im.saileshhh@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--card)] border border-border-subtle text-muted shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium tracking-widest text-muted uppercase mb-0.5">Location</span>
                    <span className="text-sm text-foreground font-medium capitalize">Thrissur, Kerala</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--card)] border border-border-subtle text-muted shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-medium tracking-widest text-muted uppercase mb-0.5">Response Time</span>
                    <span className="text-sm text-foreground font-medium">Within 24-48 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[11px] font-medium tracking-widest text-muted uppercase">Name</label>
                  <input type="text" id="name" required className="w-full bg-[var(--card)] border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" placeholder="Your name" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] font-medium tracking-widest text-muted uppercase">Email</label>
                  <input type="email" id="email" required className="w-full bg-[var(--card)] border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" placeholder="your@email.com" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-[11px] font-medium tracking-widest text-muted uppercase">Subject</label>
                  <input type="text" id="subject" required className="w-full bg-[var(--card)] border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors" placeholder="Project inquiry" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[11px] font-medium tracking-widest text-muted uppercase">Message</label>
                  <textarea id="message" required rows={4} className="w-full bg-[var(--card)] border border-border-subtle rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                
                <button type="submit" className="group mt-2 inline-flex items-center justify-center gap-2 bg-foreground text-[var(--bg)] px-8 py-4 rounded-xl text-sm font-semibold hover:scale-[1.015] transition-transform duration-[300ms] w-full md:w-auto self-start">
                  Send Message
                  <Send size={16} className="group-hover:translate-x-[3px] group-hover:-translate-y-[3px] transition-transform duration-[240ms]" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
