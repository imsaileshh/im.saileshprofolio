'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { navigation } from '@/data/navigation';
import { socials } from '@/data/socials';

const currentYear = new Date().getFullYear();

export function MobileFooter() {
  return (
    <footer className="mt-10 px-5 pb-[calc(88px+env(safe-area-inset-bottom,0px))] pt-10 border-t border-[var(--border)]">

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center mb-8"
      >
        <span className="font-display text-[22px] font-semibold tracking-tight text-[var(--text)]">
          Sailesh<span className="text-[var(--accent)]">.</span>
        </span>
        <p className="text-[10px] font-mono tracking-[0.18em] text-[var(--muted)] uppercase mt-1">
          UI/UX Designer │ Product Designer
        </p>
      </motion.div>

      {/* Nav links */}
      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 uppercase tracking-[0.1em]"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/hire"
          className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-200 uppercase tracking-[0.1em]"
        >
          Hire Me
        </Link>
      </motion.nav>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.48, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-center gap-2 mb-8"
      >
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--muted)]/40 hover:-translate-y-[2px] transition-all duration-200 active:scale-90"
          >
            <social.icon size={15} />
          </a>
        ))}
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px bg-[var(--border)] mb-5" />

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <p className="text-[11px] text-[var(--muted)] text-center font-mono">
          © {currentYear} Sailesh P. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-[var(--muted)]/50 hover:text-[var(--muted)] transition-colors cursor-pointer">Privacy Policy</span>
          <span className="text-[var(--border)] text-[10px]">·</span>
          <span className="text-[10px] text-[var(--muted)]/50 hover:text-[var(--muted)] transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </motion.div>

    </footer>
  );
}
