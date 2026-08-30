'use client';

import Link from 'next/link';

export function EditorialFooter() {
  return (
    <footer className="py-8 md:py-10 border-t border-border-subtle">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-display font-medium text-xl tracking-tight mb-1">
            Sailesh P
          </Link>
          <p className="text-muted text-sm">Designer & Developer</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm font-medium text-muted">
          <Link href="mailto:hello@sailesh.com" className="hover:text-foreground transition-colors">Email</Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-foreground transition-colors">LinkedIn</Link>
          <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors">GitHub</Link>
          <Link href="https://behance.net" target="_blank" className="hover:text-foreground transition-colors">Behance</Link>
        </nav>

        <div className="text-sm text-muted">
          © {new Date().getFullYear()} Sailesh P
        </div>

      </div>
    </footer>
  );
}
