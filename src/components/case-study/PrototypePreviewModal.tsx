'use client';

import { BrowserPreviewModal, BrowserPreviewModalProps } from '@/components/ui/BrowserPreviewModal';

export interface PrototypePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  prototypeUrl: string;
  defaultDevice?: 'desktop' | 'mobile';
}

export function PrototypePreviewModal({
  isOpen,
  onClose,
  title,
  prototypeUrl,
  defaultDevice = 'desktop',
}: PrototypePreviewModalProps) {
  return (
    <BrowserPreviewModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      url={prototypeUrl}
      defaultDevice={defaultDevice}
    />
  );
}
