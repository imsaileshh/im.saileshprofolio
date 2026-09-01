'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';
import { getTechLogo } from '@/lib/stack/tech-logos';

// ── Badge color map ──────────────────────────────────────────────────────────
// Each entry: [darkBg, darkBorder, darkText, lightBg, lightBorder, lightText]
const BADGE_COLORS: Record<string, [string, string, string, string, string, string]> = {
  // Frontend
  'react':        ['rgba(56,189,248,0.08)', 'rgba(56,189,248,0.20)', '#67d2f5', 'rgba(14,165,233,0.08)', 'rgba(14,165,233,0.25)', '#0369a1'],
  'react.js':     ['rgba(56,189,248,0.08)', 'rgba(56,189,248,0.20)', '#67d2f5', 'rgba(14,165,233,0.08)', 'rgba(14,165,233,0.25)', '#0369a1'],
  'next.js':      ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.12)', '#d4d4d8', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.14)', '#3f3f46'],
  'typescript':   ['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.22)', '#93b4fd', 'rgba(59,130,246,0.08)', 'rgba(59,130,246,0.22)', '#1d4ed8'],
  'tailwind css': ['rgba(34,211,238,0.08)', 'rgba(34,211,238,0.20)', '#5eead4', 'rgba(20,184,166,0.08)', 'rgba(20,184,166,0.22)', '#0f766e'],
  'javascript':   ['rgba(234,179,8,0.08)',  'rgba(234,179,8,0.22)',  '#fcd34d', 'rgba(202,138,4,0.08)',  'rgba(202,138,4,0.22)',  '#92400e'],
  'html5':        ['rgba(249,115,22,0.08)', 'rgba(249,115,22,0.20)', '#fb923c', 'rgba(234,88,12,0.08)',  'rgba(234,88,12,0.22)',  '#9a3412'],
  'css3':         ['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.20)', '#7cb4fa', 'rgba(37,99,235,0.08)', 'rgba(37,99,235,0.20)', '#1e3a8a'],
  'html · css':   ['rgba(249,115,22,0.08)', 'rgba(249,115,22,0.20)', '#fb923c', 'rgba(234,88,12,0.08)',  'rgba(234,88,12,0.22)',  '#9a3412'],
  'framer motion':['rgba(168,85,247,0.08)', 'rgba(168,85,247,0.20)', '#c084fc', 'rgba(147,51,234,0.08)','rgba(147,51,234,0.20)', '#6b21a8'],

  // Backend
  'node.js':      ['rgba(34,197,94,0.08)',  'rgba(34,197,94,0.20)',  '#6ee7a0', 'rgba(22,163,74,0.08)',  'rgba(22,163,74,0.20)',  '#14532d'],
  'express.js':   ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.12)', '#a1a1aa', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.12)', '#52525b'],
  'rest api':     ['rgba(139,92,246,0.08)', 'rgba(139,92,246,0.20)', '#a78bfa', 'rgba(124,58,237,0.08)','rgba(124,58,237,0.20)', '#4c1d95'],
  'rest apis':    ['rgba(139,92,246,0.08)', 'rgba(139,92,246,0.20)', '#a78bfa', 'rgba(124,58,237,0.08)','rgba(124,58,237,0.20)', '#4c1d95'],
  'graphql':      ['rgba(236,72,153,0.08)', 'rgba(236,72,153,0.20)', '#f472b6', 'rgba(219,39,119,0.08)','rgba(219,39,119,0.20)', '#831843'],
  'redis':        ['rgba(239,68,68,0.08)',  'rgba(239,68,68,0.20)',  '#f87171', 'rgba(220,38,38,0.08)',  'rgba(220,38,38,0.20)',  '#7f1d1d'],

  // Database
  'postgresql':   ['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.20)', '#93b4fd', 'rgba(37,99,235,0.08)', 'rgba(37,99,235,0.20)', '#1e40af'],
  'mongodb':      ['rgba(34,197,94,0.08)',  'rgba(34,197,94,0.20)',  '#6ee7a0', 'rgba(22,163,74,0.08)',  'rgba(22,163,74,0.20)',  '#14532d'],
  'prisma':       ['rgba(139,92,246,0.08)', 'rgba(139,92,246,0.20)', '#c4b5fd', 'rgba(109,40,217,0.08)','rgba(109,40,217,0.20)', '#4c1d95'],
  'supabase':     ['rgba(34,197,94,0.08)',  'rgba(34,197,94,0.20)',  '#6ee7a0', 'rgba(22,163,74,0.08)',  'rgba(22,163,74,0.20)',  '#14532d'],

  // Tools
  'git':          ['rgba(249,115,22,0.08)', 'rgba(249,115,22,0.20)', '#fb923c', 'rgba(234,88,12,0.08)',  'rgba(234,88,12,0.22)',  '#9a3412'],
  'github':       ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.12)', '#d4d4d8', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.12)', '#3f3f46'],
  'docker':       ['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.20)', '#7cb4fa', 'rgba(37,99,235,0.08)', 'rgba(37,99,235,0.20)', '#1e3a8a'],
  'vercel':       ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.14)', '#e4e4e7', 'rgba(0,0,0,0.05)', 'rgba(0,0,0,0.12)', '#27272a'],
  'aws':          ['rgba(251,191,36,0.08)', 'rgba(251,191,36,0.20)', '#fcd34d', 'rgba(202,138,4,0.08)',  'rgba(202,138,4,0.22)',  '#92400e'],
  'jest':         ['rgba(220,38,38,0.08)',  'rgba(220,38,38,0.18)',  '#f87171', 'rgba(185,28,28,0.08)',  'rgba(185,28,28,0.18)',  '#7f1d1d'],
  'storybook':    ['rgba(236,72,153,0.08)', 'rgba(236,72,153,0.18)', '#f9a8d4', 'rgba(219,39,119,0.08)','rgba(219,39,119,0.18)', '#831843'],

  // Design / Software
  'figma':        ['rgba(168,85,247,0.08)', 'rgba(168,85,247,0.22)', '#d8b4fe', 'rgba(126,34,206,0.08)','rgba(126,34,206,0.22)', '#6b21a8'],
  'framer':       ['rgba(139,92,246,0.08)', 'rgba(139,92,246,0.22)', '#c4b5fd', 'rgba(109,40,217,0.08)','rgba(109,40,217,0.22)', '#4c1d95'],
  'vs code':      ['rgba(59,130,246,0.08)', 'rgba(59,130,246,0.20)', '#93b4fd', 'rgba(37,99,235,0.08)', 'rgba(37,99,235,0.20)', '#1e40af'],
  'adobe photoshop':['rgba(59,130,246,0.08)','rgba(59,130,246,0.20)','#93b4fd','rgba(37,99,235,0.08)','rgba(37,99,235,0.20)','#1e40af'],
  'adobe illustrator':['rgba(251,146,60,0.08)','rgba(251,146,60,0.20)','#fdba74','rgba(234,88,12,0.08)','rgba(234,88,12,0.20)','#9a3412'],
  'lightroom classic':['rgba(59,130,246,0.08)','rgba(59,130,246,0.18)','#93b4fd','rgba(37,99,235,0.08)','rgba(37,99,235,0.18)','#1e40af'],
  'three.js':     ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.12)', '#a1a1aa', 'rgba(0,0,0,0.06)', 'rgba(0,0,0,0.12)', '#52525b'],
  // Ecommerce
  'liquid':       ['rgba(34,197,94,0.08)',  'rgba(34,197,94,0.18)',  '#6ee7a0', 'rgba(22,163,74,0.08)',  'rgba(22,163,74,0.18)',  '#14532d'],
  'custom themes':['rgba(139,92,246,0.08)', 'rgba(139,92,246,0.18)', '#c4b5fd', 'rgba(109,40,217,0.08)','rgba(109,40,217,0.18)', '#4c1d95'],
  'storefront ux':['rgba(249,115,22,0.08)', 'rgba(249,115,22,0.18)', '#fb923c', 'rgba(234,88,12,0.08)',  'rgba(234,88,12,0.18)',  '#9a3412'],
  'custom development':['rgba(255,255,255,0.06)','rgba(255,255,255,0.12)','#a1a1aa','rgba(0,0,0,0.06)','rgba(0,0,0,0.12)','#52525b'],
};

const DEFAULT_COLORS: [string, string, string, string, string, string] = [
  'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.10)', '#a1a1aa',
  'rgba(0,0,0,0.05)',       'rgba(0,0,0,0.10)',        '#52525b',
];

function BadgeIcon({ name, slug }: { name: string; slug?: string | null }) {
  const [failed, setFailed] = useState(false);
  // Prefer the DB icon slug; fall back to normalising the display name
  const entry = getTechLogo(slug ?? name);
  if (!entry || failed) return null;
  return (
    <img
      src={entry.url}
      alt=""
      width={22}
      height={22}
      aria-hidden="true"
      className="w-[22px] h-[22px] object-contain shrink-0"
      style={entry.filter ? { filter: entry.filter } : undefined}
      onError={() => setFailed(true)}
    />
  );
}

function TechBadge({ name, slug }: { name: string; slug?: string | null }) {
  const key = name.toLowerCase();
  const [darkBg, darkBorder, darkText, lightBg, lightBorder, lightText] =
    BADGE_COLORS[key] ?? DEFAULT_COLORS;

  return (
    <motion.span
      whileHover={{ y: -1.5 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      data-badge
      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-[17px] font-medium leading-none select-none cursor-default whitespace-nowrap border transition-all duration-200"
      style={{
        height: '60px',
        '--b-dbg'  : darkBg,
        '--b-dbr'  : darkBorder,
        '--b-dtx'  : darkText,
        '--b-lbg'  : lightBg,
        '--b-lbr'  : lightBorder,
        '--b-ltx'  : lightText,
        backgroundColor: darkBg,
        borderColor: darkBorder,
        color: darkText,
      } as React.CSSProperties}
    >
      <BadgeIcon name={name} slug={slug} />
      {name}
    </motion.span>
  );
}

export function StackClient({ sections }: { sections: any[] }) {
  const [activeTab, setActiveTab] = useState(sections[0]?.id || '');
  const activeSection = sections.find(s => s.id === activeTab);

  return (
    <div className="flex flex-col">
      {/* ── Tab Navigation ─────────────────────────────────────────────── */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border-subtle mb-10 md:mb-16">
        <div className="flex gap-8 pb-4 min-w-max">
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id)}
              className={`relative text-sm md:text-base font-medium tracking-wide transition-colors duration-300 ${
                activeTab === sec.id ? 'text-accent' : 'text-muted hover:text-foreground'
              }`}
            >
              {sec.title}
              {activeTab === sec.id && (
                <motion.div
                  layoutId="stackTabIndicator"
                  className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-accent"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col gap-10"
          >
            {activeSection.description && (
              <p className="text-xl md:text-2xl font-display font-medium text-foreground tracking-tight max-w-2xl">
                {activeSection.description}
              </p>
            )}

            {/* Badge grid */}
            <div className="flex flex-wrap gap-2.5">
              {activeSection.skills.map((tech: any, i: number) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.04, ease: 'easeOut' }}
                >
                  <TechBadge name={tech.name} slug={tech.icon} />
                </motion.div>
              ))}
            </div>

            {activeSection.skills.length === 0 && (
              <div className="py-20 text-center border border-dashed border-border-subtle rounded-2xl">
                <p className="text-muted">No technologies in this category yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
