'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export function ContactCTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact-cta"
      className="py-12 sm:py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-14 w-full"
      >
        {/* Left: Headline & Information */}
        <div className="flex flex-col items-start max-w-2xl">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 mb-3.5 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] sm:text-[12px] font-mono font-medium text-accent tracking-[0.2em] uppercase">
              CONTACT
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-display font-semibold tracking-tight text-foreground leading-[1.1] mb-4">
            Let&apos;s work together<span className="text-accent">.</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-[15px] sm:text-base md:text-lg text-muted leading-relaxed font-normal mb-5 max-w-xl">
            Have a project, collaboration or idea in mind? Send me a message.
          </p>

          {/* Direct Email Link */}
          <a
            href="mailto:imsaileshp@gmail.com"
            className="inline-flex items-center gap-2 text-[14px] font-mono text-muted hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-0.5"
          >
            <Mail size={15} className="opacity-80" />
            <span>imsaileshp@gmail.com</span>
          </a>

        </div>

        {/* Right: Creative Action Button */}
        <div className="flex items-start lg:items-center shrink-0 pt-2 lg:pt-0">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-hire-me'))}
            className="group relative inline-flex items-center gap-4 pl-6 sm:pl-7 pr-2.5 py-2 rounded-full bg-[var(--card)] border border-border-subtle/90 hover:border-accent/50 text-foreground transition-all duration-300 shadow-sm hover:shadow-[0_8px_28px_rgba(45,212,191,0.16)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="text-[15px] font-medium tracking-tight group-hover:text-accent transition-colors duration-200">
              Get in touch
            </span>
            <span className="w-10 h-10 rounded-full bg-accent text-[#111214] flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:rotate-45 shrink-0 shadow-sm">
              <ArrowUpRight size={18} strokeWidth={2.5} />
            </span>
          </button>
        </div>

      </motion.div>
    </section>
  );
}
