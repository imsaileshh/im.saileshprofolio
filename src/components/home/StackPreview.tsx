'use client';

import { motion } from 'framer-motion';
import { Code2, PenTool, ShoppingCart, Server, Wrench, Layers } from 'lucide-react';
import { stack } from '@/data/stack';

const ease = [0.22, 1, 0.36, 1] as const;

export function StackPreview() {
  return (
    <section id="stack-preview" className="py-10 md:py-14 lg:py-16 relative px-5 sm:px-6 md:px-10 lg:px-16">
      
      {/* HEADER — Preserved Exactly */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
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
            <h2 className="text-3xl font-display font-medium tracking-tight text-foreground">
              Tools & Technologies
            </h2>
          </div>
          <p className="text-muted text-sm md:text-base max-w-xl leading-relaxed mt-2">
            A focused toolkit for designing, building and shipping modern digital products.
          </p>
        </div>
      </motion.div>

      {/* 2x2 REFINED EDITORIAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 01. FRONTEND */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0, ease }}
          className="group flex flex-col p-5 md:p-6 rounded-[14px] bg-[var(--card)] border border-border-subtle hover:border-muted/40 hover:bg-nav-active/40 transition-colors duration-200"
        >
          {/* Category with minimal icon */}
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={14} className="text-accent shrink-0" />
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted uppercase transition-colors duration-200 group-hover:text-accent">
              FRONTEND
            </span>
          </div>

          <h3 className="text-[16px] md:text-[17px] font-display font-semibold text-foreground tracking-tight mb-4">
            Interfaces built for speed and usability.
          </h3>

          {/* Subtle Divider */}
          <div className="w-full h-px bg-border-subtle mb-4" />

          {/* Tech List */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {stack.frontend.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-[6px] bg-[var(--panel)] border border-border-subtle text-[12px] font-medium text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 02. DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="group flex flex-col p-5 md:p-6 rounded-[14px] bg-[var(--card)] border border-border-subtle hover:border-muted/40 hover:bg-nav-active/40 transition-colors duration-200"
        >
          {/* Category with minimal icon */}
          <div className="flex items-center gap-2 mb-2">
            <PenTool size={14} className="text-accent shrink-0" />
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted uppercase transition-colors duration-200 group-hover:text-accent">
              DESIGN
            </span>
          </div>

          <h3 className="text-[16px] md:text-[17px] font-display font-semibold text-foreground tracking-tight mb-4">
            Designing clear, useful and engaging digital experiences.
          </h3>

          {/* Subtle Divider */}
          <div className="w-full h-px bg-border-subtle mb-4" />

          {/* Tech List */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {stack.design.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-[6px] bg-[var(--panel)] border border-border-subtle text-[12px] font-medium text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 03. BACKEND & DATA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.16, ease }}
          className="group flex flex-col p-5 md:p-6 rounded-[14px] bg-[var(--card)] border border-border-subtle hover:border-muted/40 hover:bg-nav-active/40 transition-colors duration-200"
        >
          {/* Category with minimal icon */}
          <div className="flex items-center gap-2 mb-3">
            <Server size={14} className="text-accent shrink-0" />
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted uppercase transition-colors duration-200 group-hover:text-accent">
              BACKEND &amp; DATA
            </span>
          </div>

          <div className="flex flex-col gap-3 my-auto">
            {/* BUILD */}
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase mb-1">
                BUILD
              </span>
              <p className="text-[15px] font-medium text-foreground">
                {stack.backend.join(' · ')}
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="w-full h-px bg-border-subtle" />

            {/* DATA */}
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-muted uppercase mb-1">
                DATA
              </span>
              <p className="text-[15px] font-medium text-foreground">
                {stack.database.join(' · ')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* 04. E-COMMERCE */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.24, ease }}
          className="group flex flex-col p-5 md:p-6 rounded-[14px] bg-[var(--card)] border border-border-subtle hover:border-muted/40 hover:bg-nav-active/40 transition-colors duration-200"
        >
          {/* Category with minimal icon */}
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={14} className="text-accent shrink-0" />
            <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-muted uppercase transition-colors duration-200 group-hover:text-accent">
              E-COMMERCE
            </span>
          </div>

          <h3 className="text-[16px] md:text-[17px] font-display font-semibold text-foreground tracking-tight mb-4">
            Shopify
          </h3>

          {/* Subtle Divider */}
          <div className="w-full h-px bg-border-subtle mb-4" />

          {/* Tech List */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {stack.ecommerce.map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-[6px] bg-[var(--panel)] border border-border-subtle text-[12px] font-medium text-foreground/80 hover:text-foreground hover:border-accent/40 transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

      </div>

      {/* TOOLS & WORKFLOW STRIP — Refined and Unified */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="mt-4 w-full rounded-[14px] bg-[var(--card)] border border-border-subtle p-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-muted/40 hover:bg-nav-active/40 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-2 shrink-0">
          <Wrench size={14} className="text-accent shrink-0" />
          <span className="text-[10px] font-mono tracking-widest text-muted uppercase transition-colors duration-200 group-hover:text-accent">
            TOOLS &amp; WORKFLOW
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {stack.tools.map((tool, i, arr) => (
            <div key={tool} className="flex items-center gap-2 md:gap-3">
              <span className="text-[13px] font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                {tool}
              </span>
              {i !== arr.length - 1 && (
                <span className="text-muted/30 text-xs">·</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
