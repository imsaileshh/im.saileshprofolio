'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

function SortableImageItem({ id, url, onRemove }: { id: string; url: string; onRemove: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`group relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-black/50 ${isDragging ? 'opacity-50' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Gallery item" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
        <button type="button" {...attributes} {...listeners} className="cursor-grab rounded bg-white/10 p-2 text-white hover:bg-white/20 active:cursor-grabbing">
          <GripVertical size={16} />
        </button>
        <button type="button" onClick={onRemove} className="rounded bg-red-500/20 p-2 text-red-400 hover:bg-red-500/40">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export function GalleryInput({ initialUrls = [] }: { initialUrls?: string[] }) {
  const [urls, setUrls] = useState<string[]>(initialUrls);
  const [inputUrl, setInputUrl] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleAdd = () => {
    if (inputUrl && !urls.includes(inputUrl)) {
      setUrls([...urls, inputUrl]);
    }
    setInputUrl('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (urlToRemove: string) => {
    setUrls(urls.filter(url => url !== urlToRemove));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && over) {
      setUrls((current) => {
        const oldIndex = current.indexOf(active.id as string);
        const newIndex = current.indexOf(over.id as string);
        return arrayMove(current, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input 
          type="url" 
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://..."
          className="h-10 flex-1 rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#4F8CFF]"
        />
        <button type="button" onClick={handleAdd} className="flex h-10 items-center justify-center rounded-lg bg-white/10 px-4 text-sm font-medium text-white hover:bg-white/20">
          <Plus size={16} className="mr-1" /> Add
        </button>
      </div>

      <input type="hidden" name="galleryImages" value={urls.join('\n')} />

      {urls.length > 0 ? (
        <DndContext id="dnd-gallery" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <SortableContext items={urls} strategy={rectSortingStrategy}>
              {urls.map((url) => (
                <SortableImageItem key={url} id={url} url={url} onRemove={() => handleRemove(url)} />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      ) : (
        <div className="flex aspect-[3/1] w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 text-zinc-500">
          <ImageIcon size={24} className="mb-2 opacity-50" />
          <span className="text-xs">No gallery images added</span>
        </div>
      )}
    </div>
  );
}
