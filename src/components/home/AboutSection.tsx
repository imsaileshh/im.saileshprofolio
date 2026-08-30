'use client';

import { motion } from 'framer-motion';
import { User, LayoutTemplate, Code2, Monitor, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const capabilities = [
  { 
    id: '01',
    title: 'UI/UX DESIGN', 
    desc: 'Clear, intuitive and user-focused digital experiences.', 
    meta: 'FIGMA · UX · INTERACTION',
    icon: LayoutTemplate, 
    delay: 0,
    graphic: 'uiux'
  },
  { 
    id: '02',
    title: 'FRONTEND DEVELOPMENT', 
    desc: 'Responsive interfaces built for performance and scale.', 
    meta: 'REACT · NEXT.JS · TYPESCRIPT',
    icon: Code2, 
    delay: 0.08,
    graphic: 'frontend'
  },
  { 
    id: '03',
    title: 'VIBE CODING', 
    desc: 'Turning ideas into working products with AI-assisted workflows.', 
    meta: 'AI · PROTOTYPE · BUILD',
    icon: Monitor, 
    delay: 0.16,
    graphic: 'vibecoding'
  },
  { 
    id: '04',
    title: 'SHOPIFY DEVELOPMENT', 
    desc: 'Custom storefronts designed around usability and conversion.', 
    meta: 'SHOPIFY · LIQUID · E-COMMERCE',
    icon: ShoppingCart, 
    delay: 0.24,
    graphic: 'shopify'
  },
];

export function AboutSection() {

  return (
    <section id="about-preview" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.25fr)] gap-8 lg:gap-12 items-start">
        
        {/* LEFT: Intro Content */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-2"
          >
            <div className="p-2 rounded-lg bg-[var(--sidebar)] border border-border-subtle text-muted">
              <User size={20} />
            </div>
            <h2 className="text-3xl font-display font-medium tracking-tight">
              About Me
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-[13px] md:text-[14px] text-muted mb-6"
          >
            Designing and building modern digital experiences from idea to launch.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 max-w-[620px]"
          >
            <p className="text-[15px] md:text-[16px] text-muted leading-[1.65] font-light">
              I'm a UI/UX Designer, Frontend Developer, Vibe Coder and Shopify Developer focused on turning ideas into modern digital experiences.
            </p>
            <p className="text-[15px] md:text-[16px] text-muted leading-[1.65] font-light">
              I combine thoughtful design, responsive frontend development, AI-assisted workflows and e-commerce expertise to build products that are visually engaging, usable and scalable.
            </p>
          </motion.div>
        </div>

        {/* RIGHT: 2x2 Capability Cards */}
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((cap) => (
              <CapabilityCard key={cap.id} cap={cap} />
            ))}
          </div>
        </div>
        
      </div>
      
      {/* Section Divider */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-border-subtle origin-left" 
      />
    </section>
  );
}

import { ArrowUpRight, Sparkles, ShoppingBag } from 'lucide-react';

function CapabilityCard({ cap }: { cap: any }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Parallax offsets (very subtle)
  const parallaxX = isHovered ? (mousePos.x - 150) * 0.03 : 0;
  const parallaxY = isHovered ? (mousePos.y - 100) * 0.03 : 0;

  // Stagger entrance X calculation based on card
  const entranceX = ['01', '03'].includes(cap.id) ? 20 : 30;

  return (
    <motion.div
      initial={{ opacity: 0, x: entranceX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: cap.delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col p-5 md:p-6 min-h-[170px] md:min-h-[200px] rounded-[16px] bg-[var(--card)] border border-border-subtle hover:border-muted/40 hover:bg-nav-active transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden cursor-default md:hover:-translate-y-1"
    >
      {/* Interactive Teal Radial Highlight */}
      <div 
        className="absolute inset-0 z-0 opacity-0 hidden md:group-hover:block md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.04), transparent 40%)`
        }}
      />

      {/* Animated Bottom Teal Line */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] z-10" />

      {/* Decorative Graphics (Parallax) */}
      <motion.div 
        animate={{ x: parallaxX, y: parallaxY }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] group-hover:opacity-[0.10] transition-opacity duration-[350ms] flex items-center justify-center overflow-hidden"
      >
        {cap.graphic === 'uiux' && (
          <div className="w-[120px] h-[120px] border border-foreground border-dashed relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-foreground" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-foreground" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-foreground" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-foreground" />
          </div>
        )}
        {cap.graphic === 'frontend' && (
          <div className="text-[14px] font-mono leading-[1.8] text-foreground absolute -right-6 top-10 whitespace-pre">
            {`<div>\n  experience\n</div>`}
          </div>
        )}
        {cap.graphic === 'vibecoding' && (
          <Sparkles size={140} className="text-foreground absolute -right-8 -bottom-8" strokeWidth={1} />
        )}
        {cap.graphic === 'shopify' && (
          <ShoppingBag size={140} className="text-foreground absolute -right-8 -bottom-8" strokeWidth={1} />
        )}
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Number & Arrow */}
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono text-muted tracking-widest">{cap.id}</span>
          <ArrowUpRight size={16} className="text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
        </div>

        {/* Icon */}
        <div className="mb-2">
          <cap.icon size={20} className="text-foreground group-hover:scale-[1.08] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" strokeWidth={1.5} />
        </div>

        {/* Title & Desc */}
        <div className="flex flex-col mt-auto pb-1 group-hover:-translate-y-0.5 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
          <h3 className="text-[15px] md:text-[16px] font-semibold text-foreground mb-1.5 leading-tight uppercase tracking-wide">
            {cap.title}
          </h3>
          <p className="text-[13px] md:text-[14px] text-muted leading-snug pr-4">
            {cap.desc}
          </p>
        </div>

        {/* Footer Metadata */}
        <div className="mt-2">
          <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-muted/60 group-hover:text-accent transition-colors duration-[350ms] uppercase">
            {cap.meta}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
