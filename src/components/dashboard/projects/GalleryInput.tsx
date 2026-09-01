'use client';

import { useState, useRef, ChangeEvent, DragEvent, KeyboardEvent } from 'react';
import {
  UploadCloud,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  Eye,
  Loader2,
  MoveUp,
  MoveDown,
  Sparkles,
} from 'lucide-react';

export interface GalleryImageItem {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
}

export function GalleryInput({
  initialUrls = [],
  onChange,
}: {
  initialUrls?: string[];
  onChange?: (urls: string[]) => void;
}) {
  const [items, setItems] = useState<GalleryImageItem[]>(() =>
    initialUrls.map((url, idx) => ({
      id: `gallery-${idx}-${Date.now()}`,
      url,
      alt: '',
      caption: '',
    }))
  );

  const [inputUrl, setInputUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewModalUrl, setPreviewModalUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateItems = (newItems: GalleryImageItem[]) => {
    setItems(newItems);
    onChange?.(newItems.map((item) => item.url));
  };

  const handleUploadFiles = async (files: FileList | File[]) => {
    setIsUploading(true);
    setUploadError(null);

    const validFiles = Array.from(files).filter((file) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif'];
      return validTypes.includes(file.type) || file.name.match(/\.(jpg|jpeg|png|webp|svg|gif)$/i);
    });

    if (validFiles.length === 0) {
      setUploadError('Please select valid image files (JPG, PNG, WebP, SVG, GIF).');
      setIsUploading(false);
      return;
    }

    const uploadedUrls: string[] = [];

    for (const file of validFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err) {
        console.error('Failed to upload file:', file.name, err);
      }
    }

    if (uploadedUrls.length > 0) {
      const newItems: GalleryImageItem[] = [
        ...items,
        ...uploadedUrls.map((url, i) => ({
          id: `gallery-up-${Date.now()}-${i}`,
          url,
          alt: '',
          caption: '',
        })),
      ];
      updateItems(newItems);
    } else {
      setUploadError('Failed to upload images. Please check file format and try again.');
    }

    setIsUploading(false);
  };

  const handleAddUrl = () => {
    const trimmed = inputUrl.trim();
    if (trimmed && !items.some((it) => it.url === trimmed)) {
      const newItems: GalleryImageItem[] = [
        ...items,
        {
          id: `gallery-url-${Date.now()}`,
          url: trimmed,
          alt: '',
          caption: '',
        },
      ];
      updateItems(newItems);
      setInputUrl('');
      setShowUrlInput(false);
    }
  };

  const handleRemove = (index: number) => {
    const next = items.filter((_, idx) => idx !== index);
    updateItems(next);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(target, 0, moved);
    updateItems(next);
  };

  const updateItemField = (index: number, field: keyof GalleryImageItem, val: string) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    updateItems(next);
  };

  return (
    <div className="space-y-4">
      {/* Hidden input storing line-separated URLs for form submission */}
      <input
        type="hidden"
        name="galleryImages"
        value={items.map((it) => it.url).join('\n')}
      />

      {/* ── Toolbar: Upload & URL Buttons ── */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* File Upload Trigger */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all shadow-xs disabled:opacity-50"
          >
            {isUploading ? (
              <Loader2 size={14} className="animate-spin text-[#4F8CFF]" />
            ) : (
              <UploadCloud size={14} className="text-[#4F8CFF]" />
            )}
            <span>{isUploading ? 'Uploading...' : 'Upload Images / SVGs'}</span>
          </button>

          {/* Add URL Toggle */}
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-transparent px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LinkIcon size={13} />
            <span>Add Image URL</span>
          </button>
        </div>

        <span className="text-xs text-zinc-500 font-mono">
          {items.length} image{items.length !== 1 ? 's' : ''} added
        </span>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp,.svg,.gif,image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleUploadFiles(e.target.files);
          }}
        />
      </div>

      {/* ── Add by URL Drawer ── */}
      {showUrlInput && (
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 p-2.5">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="Paste direct image or SVG URL (https://...)"
            className="h-9 flex-1 rounded-lg border border-white/10 bg-black/50 px-3 text-xs text-white outline-none focus:border-[#4F8CFF]"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="inline-flex h-9 items-center gap-1 rounded-lg bg-[#4F8CFF] px-4 text-xs font-semibold text-white hover:bg-[#3B78EB]"
          >
            <Plus size={13} />
            <span>Add</span>
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(false)}
            className="p-2 text-zinc-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Error Alert */}
      {uploadError && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
          {uploadError}
        </p>
      )}

      {/* ── Gallery Grid ── */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group relative rounded-xl border border-white/[0.08] bg-black/40 p-2.5 space-y-2.5 hover:border-white/20 transition-all shadow-sm"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black/60 flex items-center justify-center border border-white/[0.04]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt || `Gallery item ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Hover overlay actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={() => setPreviewModalUrl(item.url)}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                    title="Preview full image"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-20 transition-colors"
                    title="Move left / up"
                  >
                    <MoveUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === items.length - 1}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-20 transition-colors"
                    title="Move right / down"
                  >
                    <MoveDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Caption & Alt inputs */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={item.caption || ''}
                  onChange={(e) => updateItemField(idx, 'caption', e.target.value)}
                  placeholder="Caption or label..."
                  className="h-7 w-full rounded-md border border-white/10 bg-black/50 px-2 text-[11px] text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-[#4F8CFF]"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex aspect-[3/1] w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-zinc-500 hover:border-white/20 hover:bg-white/[0.04] transition-all cursor-pointer p-6 text-center"
        >
          <ImageIcon size={26} className="mb-2 opacity-50 text-[#4F8CFF]" />
          <p className="text-xs font-medium text-zinc-300">
            No gallery screenshots added yet
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Click to upload JPG, PNG, WebP or SVG diagrams
          </p>
        </div>
      )}

      {/* ── Fullscreen Preview Modal ── */}
      {previewModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/10 bg-[#111215] p-2">
            <button
              type="button"
              onClick={() => setPreviewModalUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors z-20"
            >
              <X size={18} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewModalUrl}
              alt="Full preview"
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
