'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the pdf.js worker
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
}

export function PdfVisualBlock({ url, pageNumber }: { url: string; pageNumber: number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!url || !pageNumber) return null;

  return (
    <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black/50 shadow-2xl">
      {/* Premium Mac-like Window Header */}
      <div className="flex h-10 w-full items-center gap-2 border-b border-white/5 bg-white/5 px-4 backdrop-blur-md">
        <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
        <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
        <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
      </div>
      
      <div className="flex min-h-[300px] items-center justify-center bg-[#0a0a0a] p-4 sm:p-8">
        <Document
          file={url}
          loading={
            <div className="flex h-64 w-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4F8CFF] border-t-transparent"></div>
            </div>
          }
          error={
            <div className="flex h-64 w-full items-center justify-center text-sm text-zinc-500">
              Failed to load PDF visual preview.
            </div>
          }
          onLoadSuccess={() => setIsLoaded(true)}
        >
          <Page
            pageNumber={pageNumber}
            className={`w-full max-w-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            // Use a higher scale for crisp high-res rendering on large displays
            scale={1.5}
          />
        </Document>
      </div>
    </div>
  );
}
