'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';



const ease = [0.22, 1, 0.36, 1] as const;

export function AboutSection({ aboutContent }: { aboutContent?: any }) {
  const content = aboutContent || {
    eyebrow: 'ABOUT ME',
    heading: 'Design. Build. Ship.',
    role: 'Frontend Developer & UI/UX Designer',
    paragraph: 'I bridge the gap between design and engineering, crafting digital experiences that are not only visually stunning but also highly performant and accessible.',
    ctaText: 'Read my full story',
    ctaLink: '/about',
    capabilities: [
      { title: 'UI / UX Design', desc: 'Crafting intuitive, beautiful interfaces that users love.' },
      { title: 'Frontend Engineering', desc: 'Building fast, accessible, production-grade web apps.' },
      { title: 'Design Systems', desc: 'Creating scalable component libraries and style guides.' },
      { title: 'Performance', desc: 'Optimising for Core Web Vitals and real-world speed.' },
    ],
  };

  return (
    <section
      id="about-preview"
      className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
        
        {/* LEFT: About Me Content */}
        <div className="flex flex-col max-w-[580px]">
          <SectionHeader icon={User} label={content.eyebrow} className="!mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-display font-semibold tracking-tight text-accent leading-[1.15] mb-5">
              {content.heading}
            </h2>

            <p className="text-sm md:text-[15px] font-medium text-foreground/80 mb-4">
              {content.role}
            </p>

            <p className="text-[15px] md:text-base text-muted leading-relaxed font-light mb-6">
              {content.paragraph}
            </p>
          </SectionHeader>

          {/* Link CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href={content.ctaLink}
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors duration-200 group"
            >
              <span className="underline underline-offset-4 decoration-border-subtle group-hover:decoration-accent transition-colors duration-200">
                {content.ctaText}
              </span>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Modern Cardless Capability List */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="flex flex-col w-full lg:pt-2"
        >
          {content.capabilities.map((item: any, index: number) => (
            <div key={item.title} className="flex flex-col group cursor-default">
              <div className="py-4 md:py-5 flex flex-col">
                <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted uppercase mb-1 transition-colors duration-200 group-hover:text-accent">
                  {item.title}
                </span>
                <h3 className="text-lg md:text-xl font-display font-semibold text-foreground tracking-tight transition-transform duration-200 group-hover:translate-x-1">
                  {item.desc}
                </h3>
              </div>
              {index !== content.capabilities.length - 1 && (
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
