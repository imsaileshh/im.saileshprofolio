'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { LayoutTemplate, Code2, Monitor, ShoppingCart, ArrowUpRight, Sparkles, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';

// ─── Capability data ─────────────────────────────────────────────────────────
const capabilities = [
  {
    id: '01',
    title: 'UI / UX Design',
    desc: 'Clear, intuitive and user-focused digital experiences that look stunning and feel effortless.',
    meta: 'FIGMA · UX · INTERACTION',
    icon: LayoutTemplate,
    accent: 'var(--accent)',
    bg: 'linear-gradient(135deg, rgba(45,212,191,0.08) 0%, transparent 60%)',
    DecorIcon: LayoutTemplate,
  },
  {
    id: '02',
    title: 'Frontend Dev',
    desc: 'Responsive, high-performance interfaces built with modern frameworks and design systems.',
    meta: 'REACT · NEXT.JS · TYPESCRIPT',
    icon: Code2,
    accent: '#818cf8',
    bg: 'linear-gradient(135deg, rgba(129,140,248,0.08) 0%, transparent 60%)',
    DecorIcon: Code2,
  },
  {
    id: '03',
    title: 'Vibe Coding',
    desc: 'Turning ideas into working products with AI-assisted workflows and rapid iteration.',
    meta: 'AI · PROTOTYPE · BUILD',
    icon: Monitor,
    accent: '#f472b6',
    bg: 'linear-gradient(135deg, rgba(244,114,182,0.08) 0%, transparent 60%)',
    DecorIcon: Sparkles,
  },
  {
    id: '04',
    title: 'Shopify Dev',
    desc: 'Custom storefronts engineered around usability, brand expression and conversion.',
    meta: 'SHOPIFY · LIQUID · E-COMMERCE',
    icon: ShoppingCart,
    accent: '#34d399',
    bg: 'linear-gradient(135deg, rgba(52,211,153,0.08) 0%, transparent 60%)',
    DecorIcon: ShoppingBag,
  },
];

// ─── Single Cinematic Card ────────────────────────────────────────────────────
function CinematicAboutCard({ cap, index }: { cap: typeof capabilities[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-8% 0px -8% 0px' });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const decorY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const decorOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      className="relative group"
    >
      {/* Card */}
      <div
        className="relative rounded-[20px] overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[var(--muted)]/30"
        style={{ minHeight: 220 }}
      >
        {/* Gradient bg wash */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 opacity-70 group-hover:opacity-100"
          style={{ background: cap.bg }}
        />

        {/* Large decorative background icon — parallax */}
        <motion.div
          className="absolute -right-6 -bottom-6 z-0 pointer-events-none"
          style={{ y: decorY, opacity: decorOpacity }}
        >
          <cap.DecorIcon
            size={120}
            className="opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-500"
            style={{ color: cap.accent }}
            strokeWidth={1}
          />
        </motion.div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 rounded-full"
          style={{ background: cap.accent }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            {/* Number badge */}
            <span
              className="text-[10px] font-mono tracking-[0.18em] px-2 py-1 rounded-full border"
              style={{
                color: cap.accent,
                borderColor: `${cap.accent}30`,
                background: `${cap.accent}10`,
              }}
            >
              {cap.id}
            </span>

            {/* Arrow */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
              style={{
                borderColor: `${cap.accent}30`,
                background: `${cap.accent}10`,
                color: cap.accent,
              }}
            >
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* Icon */}
          <div
            className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 border transition-transform duration-500 group-hover:scale-[1.08]"
            style={{
              borderColor: `${cap.accent}25`,
              background: `${cap.accent}12`,
              color: cap.accent,
            }}
          >
            <cap.icon size={20} strokeWidth={1.6} />
          </div>

          {/* Title */}
          <h3 className="text-[16px] md:text-[17px] font-display font-semibold text-[var(--text)] mb-2 leading-tight tracking-tight">
            {cap.title}
          </h3>

          {/* Desc */}
          <p className="text-[13px] md:text-[14px] text-[var(--muted)] leading-relaxed flex-1">
            {cap.desc}
          </p>

          {/* Meta */}
          <div className="mt-4 pt-3 border-t border-[var(--border)]">
            <span
              className="text-[9px] font-mono tracking-[0.14em] uppercase transition-colors duration-300"
              style={{ color: `${cap.accent}99` }}
            >
              {cap.meta}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-8% 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle section-level parallax for the bg text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about-preview"
      className="relative py-12 md:py-20 lg:py-24 px-5 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Giant watermark text — parallax */}
      <motion.div
        aria-hidden
        className="absolute -top-4 left-0 right-0 flex justify-center pointer-events-none select-none z-0"
        style={{ y: bgTextY, opacity: bgTextOpacity }}
      >
        <span className="text-[clamp(60px,16vw,160px)] font-display font-black tracking-tighter text-[var(--text)] opacity-[0.025] whitespace-nowrap leading-none">
          ABOUT
        </span>
      </motion.div>

      {/* ── Section header ── */}
      <div ref={headerRef} className="relative z-10 mb-10 md:mb-14">
        {/* Intro text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-lg">
            {/* Label */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-[18px] h-px bg-[var(--accent)]" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--accent)] uppercase font-semibold">
                About Me
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-display font-semibold tracking-tight text-[var(--text)] leading-[1.1] mb-3">
              Designing &amp; building<br />
              <span className="text-[var(--muted)]">digital experiences.</span>
            </h2>

            <p className="text-[15px] md:text-base text-[var(--muted)] leading-relaxed">
              I'm a UI/UX Designer, Frontend Developer, Vibe Coder and Shopify Developer — combining thoughtful design with modern development to build products that are visually engaging, usable and scalable.
            </p>
          </div>

          {/* About page CTA */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={headerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--card)] border border-[var(--border)] text-[13px] font-semibold text-[var(--text)] hover:bg-[var(--nav-active)] hover:border-[var(--muted)]/40 hover:-translate-y-[2px] transition-all duration-200"
            >
              Full Story
              <ArrowUpRight size={14} className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Cinematic capability cards grid ── */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {capabilities.map((cap, i) => (
          <CinematicAboutCard key={cap.id} cap={cap} index={i} />
        ))}
      </div>

      {/* Section bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border)] origin-left"
      />
    </section>
  );
}
