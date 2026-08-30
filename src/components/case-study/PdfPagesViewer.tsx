'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the pdf.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export function PdfPagesViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    
    // Add intersection observer after load
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-20% 0px -80% 0px' }
      );

      const sectionElements = document.querySelectorAll('.case-study-page-section');
      sectionElements.forEach((el) => observer.observe(el));
    }, 100);
  }

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!url) return null;

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
      {/* Mobile/Tablet TOC */}
      {numPages && numPages > 0 && (
        <details className="group mb-8 block rounded-xl border border-white/10 bg-black/30 lg:hidden">
          <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-bold uppercase tracking-widest text-zinc-300 outline-none">
            Case Study Pages
            <span className="text-zinc-500 transition-transform group-open:rotate-180">▼</span>
          </summary>
          <nav className="flex flex-col gap-2 border-t border-white/10 p-4">
            {Array.from(new Array(numPages), (el, index) => {
              const pageId = `page-${index + 1}`;
              const title = `Page ${String(index + 1).padStart(2, '0')}`;
              return (
                <a
                  key={pageId}
                  href={`#${pageId}`}
                  onClick={(e) => {
                    scrollTo(e, pageId);
                    const details = e.currentTarget.closest('details');
                    if (details) details.removeAttribute('open');
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === pageId
                      ? 'bg-white/5 font-semibold text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className={`font-mono text-xs ${activeSection === pageId ? 'text-[#4F8CFF]' : 'text-zinc-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{title}</span>
                </a>
              );
            })}
          </nav>
        </details>
      )}

      {/* Desktop Sticky TOC */}
      {numPages && numPages > 0 && (
        <aside className="hidden w-64 shrink-0 lg:sticky lg:top-24 lg:block">
          <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-zinc-500">Case Study</h3>
          <nav className="flex flex-col gap-1">
            {Array.from(new Array(numPages), (el, index) => {
              const pageId = `page-${index + 1}`;
              const title = `Page ${String(index + 1).padStart(2, '0')}`;
              return (
                <a
                  key={pageId}
                  href={`#${pageId}`}
                  onClick={(e) => scrollTo(e, pageId)}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    activeSection === pageId
                      ? 'bg-white/5 font-semibold text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className={`font-mono text-xs ${activeSection === pageId ? 'text-[#4F8CFF]' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{title}</span>
                </a>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <article className="min-w-0 flex-1 space-y-12 pb-32">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col gap-16"
          loading={
            <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-black/30">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4F8CFF] border-t-transparent"></div>
            </div>
          }
          error={
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
              Failed to load PDF viewer. Please try refreshing.
            </div>
          }
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <section
              key={`page_${index + 1}`}
              id={`page-${index + 1}`}
              className="case-study-page-section scroll-mt-24"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Page {String(index + 1).padStart(2, '0')}
                </h2>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-2xl flex justify-center">
                <Page
                  pageNumber={index + 1}
                  className="w-full max-w-full"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </div>
            </section>
          ))}
        </Document>
      </article>
    </div>
  );
}
