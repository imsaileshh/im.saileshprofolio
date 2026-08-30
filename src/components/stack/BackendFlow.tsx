'use client';

import { motion } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';
import { Server, Database, Globe, ArrowDown } from 'lucide-react';

export function BackendFlow() {
  return (
    <SectionReveal id="backend" className="py-16 md:py-24 scroll-mt-24">
      <div className="mb-10 md:mb-16">
        <h2 className="text-[11px] font-mono tracking-[0.2em] text-muted uppercase mb-4">
          BACKEND / 03
        </h2>
        <p className="text-2xl md:text-3xl font-display font-medium text-foreground tracking-tight max-w-xl">
          Powering application logic, APIs and server-side workflows.
        </p>
      </div>

      <div className="flex flex-col max-w-2xl mx-auto relative">
        {/* Draw Line connecting the nodes */}
        <motion.div 
          className="absolute left-[39px] md:left-[47px] top-[40px] bottom-[40px] w-px bg-border-subtle origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: "circOut" }}
        />

        <StaggerContainer className="flex flex-col gap-12">
          
          {/* CLIENT */}
          <StaggerItem className="relative z-10 flex items-center gap-6">
            <div className="w-[80px] md:w-[96px] h-[80px] md:h-[96px] rounded-2xl bg-[var(--sidebar)] border border-border-subtle flex items-center justify-center shrink-0">
              <Globe size={28} className="text-muted" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-foreground mb-1">Client</h3>
              <p className="text-sm text-muted">Frontend Request</p>
            </div>
          </StaggerItem>

          {/* REST API */}
          <StaggerItem className="relative z-10 flex items-center gap-6 group">
            <div className="w-[80px] md:w-[96px] h-[80px] md:h-[96px] rounded-2xl bg-[var(--card)] border border-accent/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] transition-transform duration-300 group-hover:-translate-y-1">
              <div className="font-mono text-sm font-semibold text-accent">API</div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-accent mb-1">REST API</h3>
              <p className="text-[15px] text-muted leading-relaxed max-w-sm">Building structured endpoints and application integrations.</p>
            </div>
          </StaggerItem>

          {/* NODE.JS */}
          <StaggerItem className="relative z-10 flex items-center gap-6 group">
            <div className="w-[80px] md:w-[96px] h-[80px] md:h-[96px] rounded-2xl bg-[var(--card)] border border-accent/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] transition-transform duration-300 group-hover:-translate-y-1">
              <Server size={28} className="text-accent" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-accent mb-1">Node.js</h3>
              <p className="text-[15px] text-muted leading-relaxed max-w-sm">Creating backend services and server-side application logic.</p>
            </div>
          </StaggerItem>

          {/* DATABASE */}
          <StaggerItem className="relative z-10 flex items-center gap-6">
            <div className="w-[80px] md:w-[96px] h-[80px] md:h-[96px] rounded-2xl bg-[var(--sidebar)] border border-border-subtle flex items-center justify-center shrink-0">
              <Database size={28} className="text-muted" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-foreground mb-1">Database</h3>
              <p className="text-sm text-muted">Data Storage</p>
            </div>
          </StaggerItem>

        </StaggerContainer>
      </div>
    </SectionReveal>
  );
}
