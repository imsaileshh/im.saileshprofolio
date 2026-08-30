import Link from 'next/link';
import { Mail, MapPin, Send } from 'lucide-react';
import { EditorialPageHeader } from '@/components/ui/EditorialPageHeader';
import { PaperDivider } from '@/components/paper/PaperDivider';
import { EditorialFooter } from '@/components/navigation/EditorialFooter';

export const metadata = {
  title: 'Hire / Contact — Sailesh P',
  description: 'Initiate a project inquiry, contract opportunity, or engineering collaboration.',
};

export default function HirePage() {
  return (
    <main className="min-h-screen py-8 md:py-12 px-5 sm:px-6 md:px-10 max-w-5xl mx-auto flex flex-col pb-24">
      
      {/* 01 - Header */}
      <EditorialPageHeader 
        label="CONTACT — 01"
        title="Let's Build Together"
        description="Available for new client projects, frontend system architecture, design systems, and advisory roles."
      />

      <PaperDivider />

      {/* 02 - Availability Status Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-5 px-5 md:px-6 bg-[var(--card)] border border-border-subtle rounded-xl mb-8 md:mb-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase text-foreground font-semibold">
            STATUS: ACCEPTING PROJECTS FOR Q3 &amp; Q4 2026
          </span>
        </div>
        <span className="font-mono text-[10px] md:text-xs tracking-wider uppercase text-muted">
          RESPONSE TIME: &lt; 24 HOURS
        </span>
      </div>

      {/* 03 - Grid: Contact Information & Direct Channels */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 my-6">
        
        {/* Left Column: Direct Channels */}
        <div className="md:col-span-5 flex flex-col space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-muted block mb-2">
              COMMUNICATION // 01
            </span>
            <h2 className="text-2xl sm:text-3xl font-display text-foreground tracking-tight mb-4">
              Direct Contact
            </h2>
            <p className="text-sm text-muted leading-relaxed font-sans mb-6">
              Feel free to send a direct message with an overview of your project, timeline, and goals.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <a
              href="mailto:imsailesh@outlook.com"
              className="bg-[var(--card)] p-4 rounded-xl border border-border-subtle hover:border-muted/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group/item"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--panel)] border border-border-subtle flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-mono tracking-widest uppercase text-muted">
                  PRIMARY EMAIL
                </span>
                <span className="text-sm font-sans font-medium text-foreground truncate group-hover/item:text-accent">
                  imsailesh@outlook.com
                </span>
              </div>
            </a>

            {/* Location */}
            <div className="bg-[var(--card)] p-4 rounded-xl border border-border-subtle flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--panel)] border border-border-subtle flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest uppercase text-muted">
                  TIMEZONE / LOCATION
                </span>
                <span className="text-sm font-sans font-medium text-foreground">
                  India (UTC +5:30) · Global Remote
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="bg-[var(--card)] p-4 rounded-xl border border-border-subtle flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest uppercase text-muted">
                NETWORKS
              </span>
              <div className="flex items-center gap-4 text-xs font-mono tracking-wider uppercase text-foreground">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LINKEDIN ↗</a>
                <span>/</span>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GITHUB ↗</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Project Scope & Inquiry Form */}
        <div className="md:col-span-7 flex flex-col">
          <div className="bg-[var(--card)] p-5 sm:p-6 md:p-8 rounded-xl border border-border-subtle shadow-sm">
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest uppercase text-muted pb-3 mb-6 border-b border-border-subtle">
              <span className="text-foreground/70 font-semibold">FORM // 01</span>
              <span>PROJECT INQUIRY</span>
            </div>

            <form action="mailto:imsailesh@outlook.com" method="GET" className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-muted mb-2">
                  YOUR NAME
                </label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-[var(--panel)] border border-border-subtle rounded-lg px-3.5 py-2.5 text-sm font-sans text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-muted mb-2">
                  PROJECT TYPE
                </label>
                <select 
                  className="w-full bg-[var(--panel)] border border-border-subtle rounded-lg px-3.5 py-2.5 text-sm font-sans text-foreground focus:outline-none focus:border-accent transition-colors"
                >
                  <option>Full-Stack Web Application</option>
                  <option>Design System &amp; Frontend Architecture</option>
                  <option>UI/UX Product Design</option>
                  <option>E-Commerce / Custom 3D Experience</option>
                  <option>Codebase Audit / Performance Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono tracking-widest uppercase text-muted mb-2">
                  MESSAGE / SCOPE
                </label>
                <textarea 
                  name="body"
                  rows={4}
                  required
                  placeholder="Tell me about your project, goals, and target timeline..."
                  className="w-full bg-[var(--panel)] border border-border-subtle rounded-lg px-3.5 py-2.5 text-sm font-sans text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center gap-3 bg-foreground text-[var(--bg)] py-3.5 rounded-lg font-mono text-xs tracking-widest uppercase hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer shadow-xs"
              >
                <span>SEND INQUIRY VIA EMAIL</span>
                <Send className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* 04 - Editorial Footer */}
      <EditorialFooter />
    </main>
  );
}
