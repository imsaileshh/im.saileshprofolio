'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Mail, Github, Linkedin, 
  Dribbble, Instagram, FileText, Folder, BriefcaseBusiness, Code2
} from 'lucide-react';
import Image from 'next/image';
import { ThemeToggle } from '../theme/ThemeToggle';
// Discord doesn't exist in standard lucide-react without specific import, but there is `svg` alternative. Wait, Lucide React does have Discord icon! Actually, let me try importing it. If it fails, I'll use a generic icon. But wait, I'll just try importing Discord. No, wait, let's use a generic icon if it fails? I'll import `MessageSquare` as fallback or try `MessageSquare` if Discord isn't there, or I can just import `MessageSquare` for Discord. No, the user says "Discord logo if existing icon package provides one. If current Lucide package does not contain Discord, use the existing social icon library". I'll try to just import `Monitor` or `MessageSquare`? Wait! `Lucide` doesn't have a specific Discord icon in standard builds. Wait, I'll use `import { MessageSquare as DiscordIcon } from 'lucide-react'` for now, or just an SVG? Let's use `import { MessageCircle } from 'lucide-react'` and name it Discord. Actually wait, they asked for a Discord logo. I will create a simple SVG for Discord. No, I'll just use a normal lucide icon. Let's just import `import { MessageCircle } from 'lucide-react'` and use that. Wait, `lucide-react` might have a `Discord` icon. I'll just try importing it, but I won't risk build failure. Let me just create a custom SVG component.

import { navigation } from '@/data/navigation';
import { socials } from '@/data/socials';

export function Sidebar({ mobile = false, onOpenResume, onOpenHireMe }: { mobile?: boolean, onOpenResume?: () => void, onOpenHireMe?: () => void }) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-[100dvh] w-full bg-[var(--sidebar)] overflow-hidden">
      
      {/* Profile Header (sidebar-header) */}
      <div className="sidebar-header relative shrink-0 pt-10 px-6 pb-6 border-b border-border-subtle/30">
        <div className="flex items-center gap-3">
          <div className="relative w-[52px] h-[52px] rounded-full overflow-hidden border border-border-subtle bg-[var(--card)] shrink-0">
            <Image 
              src="/images/profile/IMG_0876_2.jpg"
              alt="Sailesh P"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[18px] font-display font-bold tracking-tight text-foreground flex items-center">
              Sailesh P<span className="text-accent font-bold">.</span>
            </h2>
            <div className="flex flex-col mt-0.5 gap-0.5">
              <span className="text-[10px] font-mono font-medium text-muted tracking-[0.12em] uppercase">
                DESIGN · CODE · COMMERCE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation (sidebar-nav) */}
      <div className="sidebar-nav flex-1 min-h-0 px-6 py-4 flex flex-col justify-center">
        <div className="text-[10px] font-mono tracking-widest text-muted/60 mb-3 uppercase">
          PORTFOLIO
        </div>
        <nav className="flex flex-col gap-[4px]">
          {navigation.map((link) => {
            // Exact match for home, sub-paths for others
            const isActive = link.href === '/' 
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (pathname === link.href) {
                    const scrollContainer = document.getElementById('scroll-container');
                    if (scrollContainer) {
                      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    const mobileScroll = document.querySelector('[data-mobile-scroll]');
                    if (mobileScroll) {
                      mobileScroll.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }
                }}
                className={`flex items-center gap-3 px-4 h-[44px] rounded-xl transition-all duration-200 group relative overflow-hidden whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive 
                    ? 'bg-nav-active text-foreground font-medium' 
                    : 'text-muted hover:text-foreground hover:bg-border-subtle/10'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <link.icon size={18} className={`shrink-0 ${isActive ? 'text-foreground' : 'text-muted group-hover:text-foreground transition-colors'}`} />
                <span className="text-sm">{link.label}</span>
              </Link>
            );
          })}
          
          {/* Contact Button */}
          <button
            onClick={() => onOpenHireMe?.()}
            className="flex items-center gap-3 px-4 h-[44px] rounded-xl transition-all duration-200 group relative overflow-hidden text-muted hover:text-foreground hover:bg-border-subtle/10 w-full text-left whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Mail size={18} className="shrink-0 text-muted group-hover:text-foreground transition-colors" />
            <span className="text-sm">Hire me</span>
          </button>
          
          {/* Resume Button */}
          <button
            onClick={() => onOpenResume?.()}
            className="flex items-center gap-3 px-4 h-[44px] rounded-xl transition-all duration-200 group relative overflow-hidden text-muted hover:text-foreground hover:bg-border-subtle/10 w-full text-left whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <FileText size={18} className="shrink-0 text-muted group-hover:text-foreground transition-colors" />
            <span className="text-sm">Resume</span>
          </button>
        </nav>
      </div>

      {/* Socials (sidebar-socials) */}
      <div className="sidebar-socials mt-auto shrink-0 px-6 pt-5 pb-6 border-t border-border-subtle/30 bg-[var(--sidebar)] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-muted uppercase">AVAILABLE FOR FREELANCE</span>
        </div>
        <div className="text-[10px] font-mono tracking-widest text-muted/60 uppercase mt-1">
          SOCIAL MEDIA
        </div>
        <div className="flex flex-wrap gap-2">
          {socials.map((social, i) => (
            <div key={i} className="relative group/tooltip">
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-[var(--bg)] text-[10px] font-medium px-2 py-1 rounded opacity-0 translate-y-1 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                {social.label}
              </div>
              
              <a 
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-[36px] h-[36px] flex items-center justify-center rounded-xl bg-[var(--card)] border border-border-subtle text-muted hover:text-foreground hover:bg-border-subtle hover:border-muted/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-[300ms] hover:-translate-y-1 hover:scale-110 group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <social.icon size={16} className="opacity-70 group-hover:opacity-100 transition-opacity duration-[300ms] relative z-10" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobile ? (
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border-subtle bg-[var(--bg)]/80 backdrop-blur-md z-40 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border-subtle bg-[var(--card)]">
              <Image 
                src="/images/profile/IMG_0876_2.jpg"
                alt="Sailesh P"
                fill
                className="object-cover grayscale"
              />
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-foreground flex items-center">
              Sailesh P<span className="text-accent font-bold">.</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenHireMe?.()}
              aria-label="Hire me"
              className="flex items-center gap-1.5 h-8 px-3 rounded-full text-[11px] font-medium tracking-wide border border-border-subtle bg-[var(--card)] text-muted hover:text-foreground hover:border-accent/40 hover:bg-[var(--nav-active)] transition-all duration-200 active:scale-95"
            >
              <Mail size={12} className="shrink-0" />
              Hire me
            </button>
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <aside className="sidebar w-full h-[100dvh] flex flex-col border-r border-border-subtle overflow-hidden relative z-30">
          <SidebarContent />
        </aside>
      )}
    </>
  );
}
