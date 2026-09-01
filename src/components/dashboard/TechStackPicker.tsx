'use client';

import { useState, useMemo, KeyboardEvent } from 'react';
import { Check, Plus, Search, Sparkles, X } from 'lucide-react';
import { getTechLogo, TECH_LOGOS } from '@/lib/stack/tech-logos';

interface TechStackPickerProps {
  name?: string;
  initialSelected?: string[];
  onChange?: (technologies: string[]) => void;
  label?: string;
  placeholder?: string;
}

// Pre-curated central tech list from Stack
const POPULAR_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Figma',
  'Prisma',
  'PostgreSQL',
  'GraphQL',
  'Python',
  'Rust',
  'Go',
  'Flutter',
  'Dart',
  'Framer Motion',
  'Supabase',
  'Docker',
  'AWS',
  'Redis',
  'HTML5',
  'CSS3',
  'Sass',
  'Vue.js',
  'Angular',
  'Svelte',
  'Three.js',
  'Jest',
  'Cypress',
  'Git',
  'GitHub',
  'Vercel',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'Blender',
];

export function TechStackPicker({
  name = 'technologies',
  initialSelected = [],
  onChange,
  label = 'Technologies (Central Stack)',
  placeholder = 'Search or add technology (e.g. React, Figma, Next.js)...',
}: TechStackPickerProps) {
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return POPULAR_STACK.filter((t) => !selected.includes(t)).slice(0, 10);
    return POPULAR_STACK.filter(
      (t) => t.toLowerCase().includes(q) && !selected.includes(t)
    );
  }, [query, selected]);

  const addTech = (techName: string) => {
    const trimmed = techName.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    const next = [...selected, trimmed];
    setSelected(next);
    onChange?.(next);
    setQuery('');
  };

  const removeTech = (techToRemove: string) => {
    const next = selected.filter((t) => t !== techToRemove);
    setSelected(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (query.trim()) {
        addTech(query.trim().replace(/^,|,$/g, ''));
      }
    }
  };

  return (
    <div className="space-y-2.5 w-full">
      {/* Hidden input to submit with FormData */}
      <input type="hidden" name={name} value={selected.join(',')} />

      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-medium text-zinc-300">
            {label}
          </label>
          <span className="text-[11px] font-mono text-zinc-500">
            {selected.length} selected
          </span>
        </div>
      )}

      {/* Selected Pills with SVG Icons from Stack */}
      <div className="flex flex-wrap gap-1.5 min-h-[34px] p-1.5 rounded-lg border border-white/10 bg-black/40">
        {selected.length === 0 ? (
          <span className="text-xs text-zinc-600 px-2 py-1 select-none">
            No technologies selected yet. Search below from the central Stack library.
          </span>
        ) : (
          selected.map((tech) => {
            const logo = getTechLogo(tech);

            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 pl-2 pr-1.5 py-1 rounded-md bg-[#16171a] border border-white/10 text-xs font-medium text-white shadow-sm transition-all group"
              >
                {logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={logo.url}
                    alt=""
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 object-contain shrink-0"
                    style={logo.filter ? { filter: logo.filter } : undefined}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF] shrink-0" />
                )}
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="p-0.5 rounded text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                  title={`Remove ${tech}`}
                >
                  <X size={12} />
                </button>
              </span>
            );
          })
        )}
      </div>

      {/* Search Input & Dropdown */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-9 w-full rounded-lg border border-white/10 bg-black/30 pl-9 pr-8 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-[#4F8CFF] transition-all font-mono"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2.5 text-zinc-500 hover:text-white"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Dropdown Suggestions */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 right-0 z-20 mt-1 max-h-48 overflow-y-auto rounded-lg border border-white/10 bg-[#141518] p-1.5 shadow-2xl space-y-0.5">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => {
                  const logo = getTechLogo(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        addTech(item);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-zinc-300 hover:bg-white/10 hover:text-white transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        {logo ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={logo.url}
                            alt=""
                            width={16}
                            height={16}
                            className="w-4 h-4 object-contain shrink-0"
                            style={logo.filter ? { filter: logo.filter } : undefined}
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-zinc-600" />
                        )}
                        <span>{item}</span>
                      </div>
                      <Plus size={12} className="text-zinc-500" />
                    </button>
                  );
                })
              ) : query.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    addTech(query.trim());
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-[#4F8CFF] hover:bg-[#4F8CFF]/10 transition-colors text-left font-medium"
                >
                  <Plus size={13} />
                  <span>Add custom &quot;{query.trim()}&quot;</span>
                </button>
              ) : (
                <p className="px-3 py-2 text-[11px] text-zinc-500 text-center">
                  All popular technologies selected
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
