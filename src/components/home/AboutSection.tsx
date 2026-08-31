'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Link from 'next/link';

const capabilities = [
  {
    category: 'DESIGN',
    title: 'UI/UX Design',
  },
  {
    category: 'CODE',
    title: 'Frontend Development',
  },
  {
    category: 'AI DEVELOPMENT',
    title: 'AI-Assisted Development',
  },
  {
    category: 'COMMERCE',
    title: 'Shopify Development',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection() {
  return (
    <section
      id="about-preview"
      className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
        
        {/* LEFT: About Me Content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col max-w-[580px]"
        >
          {/* Section label with small minimal icon */}
          <div className="flex items-center gap-2 mb-3">
            <User size={13} className="text-accent shrink-0" strokeWidth={2} />
            <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
              ABOUT ME
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-display font-medium tracking-tight text-foreground leading-[1.15] mb-4">
            I design, build, and ship digital experiences.
          </h2>

          {/* Role Subtitle */}
          <p className="text-sm md:text-[15px] font-medium text-foreground/80 mb-4">
            UI/UX Designer · Frontend Developer · AI-Assisted Developer · Shopify Developer
          </p>

          {/* Paragraph */}
          <p className="text-[15px] md:text-base text-muted leading-relaxed font-light mb-6">
            I combine thoughtful design with modern development to create digital products that are clear, useful, and built to perform.
          </p>

          {/* Link CTA */}
          <div>
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 group"
            >
              <span className="underline underline-offset-4 decoration-border-subtle group-hover:decoration-accent transition-colors duration-200">
                Read my story
              </span>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT: Modern Cardless Capability List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex flex-col w-full lg:pt-2"
        >
          {capabilities.map((item, index) => (
            <div key={item.category} className="flex flex-col group cursor-default">
              <div className="py-4 md:py-5 flex flex-col">
                <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted uppercase mb-1 transition-colors duration-200 group-hover:text-accent">
                  {item.category}
                </span>
                <h3 className="text-lg md:text-xl font-display font-semibold text-foreground tracking-tight transition-transform duration-200 group-hover:translate-x-1">
                  {item.title}
                </h3>
              </div>
              {index !== capabilities.length - 1 && (
                <div className="w-full h-px bg-border-subtle relative overflow-hidden">
                  <div className="absolute inset-0 bg-accent/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                </div>
              )}
            </div>
          ))}
        </motion.div>

      </div>

      {/* Section Bottom Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.8, ease }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle origin-left"
      />
    </section>
  );
}
