'use client';

import { motion } from 'framer-motion';
import { Code2, PenTool, ShoppingCart, Server, Wrench, ArrowRight, Layers } from 'lucide-react';
import { useState } from 'react';
import { stack } from '@/data/stack';

const ease = [0.22, 1, 0.36, 1] as const;

export function StackPreview() {
  return (
    <section id="stack-preview" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16">
      
      {/* HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[var(--card)] border border-border-subtle text-muted">
              <Layers size={20} />
            </div>
            <h2 className="text-3xl font-display font-medium tracking-tight">
              Tools & Technologies
            </h2>
          </div>
          <p className="text-muted text-sm md:text-base max-w-xl leading-relaxed mt-2">
            A focused toolkit for designing, building and shipping modern digital products.
          </p>
        </div>
      </motion.div>

      {/* 2x2 BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 01. FRONTEND */}
        <GridCard delay={0}>
          <div className="flex flex-col h-full z-10 relative">
            <div className="flex items-center gap-3 mb-4">
              <Code2 size={16} className="text-muted group-hover:translate-x-[2px] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">FRONTEND</span>
            </div>
            
            <h4 className="text-[18px] leading-[1.4] font-medium text-foreground mb-8 max-w-[280px]">
              Interfaces built for speed and usability.
            </h4>

            <div className="mt-auto flex flex-wrap gap-2">
              {stack.frontend.map((tech) => (
                <div key={tech} className="px-3 py-1.5 rounded-md bg-[var(--panel)] border border-border-subtle text-[12px] font-medium text-muted/90 hover:text-foreground hover:border-accent/40 hover:bg-accent/5 hover:-translate-y-[2px] transition-all duration-300 cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </GridCard>

        {/* 02. DESIGN */}
        <GridCard delay={0.08}>
          <div className="flex flex-col h-full z-10 relative">
            <div className="flex items-center gap-3 mb-4">
              <PenTool size={16} className="text-muted group-hover:scale-110 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">DESIGN</span>
            </div>
            
            <h4 className="text-[18px] leading-[1.4] font-medium text-foreground mb-8 max-w-[280px]">
              Designing clear, useful and engaging digital experiences.
            </h4>
            
            <div className="mt-auto flex flex-col gap-1.5">
              {stack.design.map((tech) => (
                <span key={tech} className="text-[14px] font-medium text-muted hover:text-foreground transition-colors cursor-default">{tech}</span>
              ))}
            </div>
          </div>

          {/* Decorative Top-Right Graphic */}
          <div className="absolute right-6 top-6 w-8 h-8 border border-border-subtle opacity-50 group-hover:opacity-100 group-hover:border-accent/30 transition-all duration-[500ms] pointer-events-none">
            <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-[var(--card)] border border-border-subtle" />
            <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-[var(--card)] border border-border-subtle" />
            <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-[var(--card)] border border-border-subtle" />
            <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-[var(--card)] border border-border-subtle" />
          </div>
        </GridCard>

        {/* 03. BACKEND & DATA */}
        <GridCard delay={0.16}>
          <div className="flex flex-col h-full z-10 relative">
            <div className="flex items-center gap-3 mb-6">
              <Server size={16} className="text-muted group-hover:-translate-y-0.5 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">BACKEND & DATA</span>
            </div>
            
            <div className="flex flex-col flex-1">
              <div className="pb-5 mb-5 border-b border-border-subtle/60">
                <span className="text-[10px] font-mono tracking-widest text-muted uppercase mb-3 block">BUILD</span>
                <p className="text-[15px] font-medium text-foreground">{stack.backend.join(' · ')}</p>
              </div>
              
              <div>
                <span className="text-[10px] font-mono tracking-widest text-muted uppercase mb-3 block">DATA</span>
                <p className="text-[15px] font-medium text-foreground">{stack.database.join(' · ')}</p>
              </div>
            </div>
          </div>
        </GridCard>

        {/* 04. E-COMMERCE */}
        <GridCard delay={0.24}>
          <div className="flex flex-col h-full z-10 relative">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingCart size={16} className="text-muted group-hover:translate-x-[3px] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase">E-COMMERCE</span>
            </div>
            
            <h4 className="text-[28px] font-display font-medium text-foreground mb-4">
              Shopify
            </h4>
            
            <div className="flex flex-col gap-1.5 mb-6">
              {stack.ecommerce.map(item => (
                <p key={item} className="text-[14px] text-muted">{item}</p>
              ))}
            </div>

            <p className="text-[13px] text-muted leading-relaxed mt-auto opacity-80">
              Custom storefronts built around brand, usability and conversion.
            </p>
          </div>
        </GridCard>

      </div>

      {/* TOOLS & WORKFLOW STRIP */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.32, ease }}
        className="mt-4 w-full h-auto min-h-[96px] rounded-[16px] bg-[var(--card)] border border-border-subtle p-5 md:px-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:bg-nav-active hover:border-muted/40 hover:-translate-y-1 transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group"
      >
        <div className="flex items-center gap-3 shrink-0">
          <Wrench size={16} className="text-muted group-hover:text-accent transition-colors duration-300" />
          <span className="text-[10px] font-mono tracking-widest text-muted uppercase">TOOLS & WORKFLOW</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-5 w-full md:w-auto overflow-hidden">
          {stack.tools.map((tool, i, arr) => (
            <div key={tool} className="flex items-center gap-3 md:gap-5">
              <span className="text-[15px] font-medium text-foreground opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                {tool}
              </span>
              {i !== arr.length - 1 && (
                <ArrowRight size={14} className="text-muted/30" />
              )}
            </div>
          ))}
        </div>
      </motion.div>


    </section>
  );
}

function GridCard({ children, delay }: { children: React.ReactNode, delay: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col min-h-[230px] rounded-[16px] bg-[var(--card)] border border-border-subtle p-5 md:p-7 transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-nav-active hover:border-muted/40 overflow-hidden md:hover:-translate-y-1"
    >
      {/* Interactive Teal Radial Highlight */}
      <div 
        className="absolute inset-0 z-0 opacity-0 hidden md:group-hover:block md:group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.05), transparent 40%)`
        }}
      />
      
      {/* Icon Teal Hint */}
      <div className="absolute top-[32px] left-[32px] w-[20px] h-[20px] rounded-full bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {children}
    </motion.div>
  );
}
