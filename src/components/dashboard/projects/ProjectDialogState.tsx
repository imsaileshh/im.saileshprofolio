'use client';

import { useState, type ReactNode } from 'react';

export function ProjectDialogState({
  label,
  children,
  defaultOpen = false,
  tone = 'primary',
}: {
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
  tone?: 'primary' | 'secondary';
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          tone === 'primary'
            ? 'inline-flex h-10 items-center justify-center rounded-lg bg-[#4F8CFF] px-4 text-sm font-semibold text-white transition hover:bg-[#3B78EB]'
            : 'inline-flex h-9 items-center justify-center rounded border border-white/10 px-3 text-xs font-medium text-zinc-200 transition hover:bg-white/10'
        }
      >
        {label}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm sm:py-10">
          <div className="w-full max-w-5xl rounded-lg border border-white/10 bg-[#111113] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="text-base font-semibold text-white">{label.replace('+ ', '')}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded border border-white/10 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="max-h-[82vh] overflow-y-auto p-5">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
