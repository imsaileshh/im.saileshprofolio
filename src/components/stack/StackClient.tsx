'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionReveal, StaggerContainer, StaggerItem } from '@/components/ui/SectionReveal';
import { getTechLogo } from '@/lib/stack/tech-logos';

/**
 * TechLogo
 * Renders the official technology logo for a skill card using the Devicons CDN.
 * - Normalises the slug via getTechLogo()
 * - Applies a CSS filter for monochrome (black) logos so they show on dark cards
 * - Falls back to an invisible spacer when the slug is unmapped or the img fails
 *   (preserves card layout, no broken-image icon)
 */
function TechLogo({ slug }: { slug?: string | null }) {
  const [failed, setFailed] = useState(false);
  const entry = getTechLogo(slug);

  if (!entry || failed) {
    // Keep the 32×32 area so the card layout stays identical whether
    // a logo exists or not.
    return <div className="w-8 h-8 shrink-0" aria-hidden="true" />;
  }

  return (
    <img
      src={entry.url}
      alt=""
      width={32}
      height={32}
      aria-hidden="true"
      className="w-8 h-8 object-contain shrink-0 transition-all duration-300 opacity-75 group-hover:opacity-100 group-hover:scale-[1.06]"
      style={entry.filter ? { filter: entry.filter } : undefined}
      onError={() => setFailed(true)}
    />
  );
}

export function StackClient({ sections }: { sections: any[] }) {
  const [activeTab, setActiveTab] = useState(sections[0]?.id || '');

  const activeSection = sections.find(s => s.id === activeTab);

  return (
    <div className="flex flex-col">
      {/* Horizontal Tabs Navigation */}
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

      {/* Tab Content with subtle transition */}
      <AnimatePresence mode="wait">
        {activeSection && (
          <motion.div
            key={activeSection.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col"
          >
            {activeSection.description && (
              <p className="text-xl md:text-2xl font-display font-medium text-foreground tracking-tight max-w-2xl mb-12">
                {activeSection.description}
              </p>
            )}

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {activeSection.skills.map((tech: any) => (
                <StaggerItem key={tech.id} className="flex">
                  <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[var(--card)] border border-border-subtle transition-all duration-300 hover:-translate-y-[2px] hover:border-muted/30 hover:bg-[#151517] w-full min-h-[160px]">
                    {/* Logo area — replaces the old text abbreviation box */}
                    <div className="flex items-start justify-between mb-8">
                      <TechLogo slug={tech.icon} />

                      {tech.type && (
                        <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
                          {tech.type}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-[17px] font-medium text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300">
                        {tech.name}
                      </h3>
                      {tech.description && (
                        <p className="text-[13px] text-muted leading-relaxed max-w-[95%]">
                          {tech.description}
                        </p>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

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
