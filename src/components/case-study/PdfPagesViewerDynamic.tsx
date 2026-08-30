'use client';

import dynamic from 'next/dynamic';

export const PdfPagesViewer = dynamic(
  () => import('./PdfPagesViewer').then(mod => mod.PdfPagesViewer),
  { ssr: false }
);
