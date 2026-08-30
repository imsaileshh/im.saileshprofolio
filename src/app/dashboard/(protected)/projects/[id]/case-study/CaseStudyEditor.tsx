'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ChevronUp, ChevronDown, Image as ImageIcon, FileText, Settings, Copy, Save } from 'lucide-react';
import type { CaseStudy, CaseStudySection, Project } from '@prisma/client';
import Image from 'next/image';

type MediaSize = 'full' | 'half' | 'original';
type MediaType = 'image' | 'pdf' | 'svg';

type MediaItem = {
  url: string;
  type: MediaType;
  size: MediaSize;
};

type SectionData = {
  id?: string;
  title: string;
  content: string;
  metadata: {
    media: MediaItem[];
  };
};

type CaseStudyData = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  status: 'DRAFT' | 'PUBLISHED';
  sourceType: 'MANUAL';
  sections: SectionData[];
};

export function CaseStudyEditor({
  project,
  initialCaseStudy,
}: {
  project: Project;
  initialCaseStudy: (CaseStudy & { sections: CaseStudySection[] }) | null;
}) {
  const router = useRouter();

  // Initialize data
  const [data, setData] = useState<CaseStudyData>(() => {
    if (initialCaseStudy) {
      return {
        title: initialCaseStudy.title,
        slug: initialCaseStudy.slug,
        description: initialCaseStudy.description || '',
        coverImage: initialCaseStudy.coverImage || '',
        status: initialCaseStudy.status,
        sourceType: 'MANUAL',
        sections: initialCaseStudy.sections.map(s => ({
          id: s.id,
          title: s.title,
          content: s.content || '',
          metadata: {
            media: (s.metadata as any)?.media || []
          }
        }))
      };
    }
    return {
      title: `${project.title} Case Study`,
      slug: `${project.slug}-case-study`,
      description: project.description,
      coverImage: project.coverImageUrl || '',
      status: 'DRAFT',
      sourceType: 'MANUAL',
      sections: []
    };
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // --- Section Management ---
  const addSection = () => {
    const newSection: SectionData = {
      title: 'New Section',
      content: '',
      metadata: { media: [] }
    };
    const newSections = [...data.sections, newSection];
    setData({ ...data, sections: newSections });
    setActiveSectionIndex(newSections.length - 1);
  };

  const removeSection = (index: number) => {
    if (!confirm('Delete this section?')) return;
    const newSections = data.sections.filter((_, i) => i !== index);
    setData({ ...data, sections: newSections });
    if (activeSectionIndex === index) {
      setActiveSectionIndex(null);
    } else if (activeSectionIndex !== null && activeSectionIndex > index) {
      setActiveSectionIndex(activeSectionIndex - 1);
    }
  };

  const duplicateSection = (index: number) => {
    const sectionToCopy = data.sections[index];
    const newSection = { ...sectionToCopy, id: undefined, title: `${sectionToCopy.title} (Copy)` };
    const newSections = [...data.sections];
    newSections.splice(index + 1, 0, newSection);
    setData({ ...data, sections: newSections });
    setActiveSectionIndex(index + 1);
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === data.sections.length - 1) return;
    
    const newSections = [...data.sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    
    setData({ ...data, sections: newSections });
    
    if (activeSectionIndex === index) {
      setActiveSectionIndex(targetIndex);
    } else if (activeSectionIndex === targetIndex) {
      setActiveSectionIndex(index);
    }
  };

  const updateActiveSection = (updates: Partial<SectionData>) => {
    if (activeSectionIndex === null) return;
    const newSections = [...data.sections];
    newSections[activeSectionIndex] = { ...newSections[activeSectionIndex], ...updates };
    setData({ ...data, sections: newSections });
  };

  // --- Media Management ---
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeSectionIndex === null) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Upload failed');

      const activeSection = data.sections[activeSectionIndex];
      const newMedia: MediaItem = {
        url: result.url,
        type: result.type,
        size: 'original'
      };

      updateActiveSection({
        metadata: {
          media: [...activeSection.metadata.media, newMedia]
        }
      });
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const updateMedia = (mediaIndex: number, updates: Partial<MediaItem>) => {
    if (activeSectionIndex === null) return;
    const activeSection = data.sections[activeSectionIndex];
    const newMedia = [...activeSection.metadata.media];
    newMedia[mediaIndex] = { ...newMedia[mediaIndex], ...updates };
    
    updateActiveSection({
      metadata: { media: newMedia }
    });
  };

  const removeMedia = (mediaIndex: number) => {
    if (activeSectionIndex === null) return;
    const activeSection = data.sections[activeSectionIndex];
    const newMedia = activeSection.metadata.media.filter((_, i) => i !== mediaIndex);
    updateActiveSection({ metadata: { media: newMedia } });
  };

  const moveMedia = (mediaIndex: number, direction: 'up' | 'down') => {
    if (activeSectionIndex === null) return;
    const activeSection = data.sections[activeSectionIndex];
    const newMedia = [...activeSection.metadata.media];
    
    if (direction === 'up' && mediaIndex === 0) return;
    if (direction === 'down' && mediaIndex === newMedia.length - 1) return;
    
    const targetIndex = direction === 'up' ? mediaIndex - 1 : mediaIndex + 1;
    const temp = newMedia[mediaIndex];
    newMedia[mediaIndex] = newMedia[targetIndex];
    newMedia[targetIndex] = temp;
    
    updateActiveSection({ metadata: { media: newMedia } });
  };

  // --- Saving ---
  const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
    setIsSaving(true);
    try {
      const payload = {
        projectId: project.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        coverImage: data.coverImage,
        status,
        sourceType: 'MANUAL',
        metadata: {},
        sections: data.sections.map((s, idx) => ({
          id: s.id,
          title: s.title,
          content: s.content,
          images: [], // Keep empty or map URLs for backwards compatibility
          metadata: {
            media: s.metadata.media
          }
        }))
      };

      const url = initialCaseStudy ? `/api/case-studies/${initialCaseStudy.id}` : '/api/case-studies';
      const method = initialCaseStudy ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save');
      }
      
      router.refresh();
      alert(`Saved as ${status.toLowerCase()}`);
    } catch (err: any) {
      alert(`Save error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-8rem)] gap-8 bg-[#0a0a0a] text-zinc-300 rounded-xl overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-64 shrink-0 border-r border-white/5 bg-[#111113] p-6 flex flex-col h-full">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">CMS Menu</h3>
        
        <div className="space-y-1 mb-8">
          <button
            onClick={() => setActiveSectionIndex(null)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeSectionIndex === null ? 'bg-[#4F8CFF]/10 text-[#4F8CFF]' : 'hover:bg-white/5'
            }`}
          >
            <Settings size={16} /> CASE STUDY
          </button>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Sections</h3>
        <div className="flex-1 overflow-y-auto space-y-1 mb-4 pr-2">
          {data.sections.map((section, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSectionIndex(idx)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-3 ${
                activeSectionIndex === idx ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              <span className={`font-mono text-xs ${activeSectionIndex === idx ? 'text-[#4F8CFF]' : 'text-zinc-600'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="truncate">{section.title || 'Untitled'}</span>
            </button>
          ))}
        </div>

        <button
          onClick={addSection}
          className="w-full py-2.5 rounded-lg border border-white/10 text-zinc-300 text-sm font-semibold hover:bg-white/5 flex items-center justify-center gap-2 transition-colors mt-auto"
        >
          <Plus size={16} /> Add Section
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        
        {/* Editor Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <h2 className="text-xl font-bold text-white">
            {activeSectionIndex === null ? 'General Settings' : `Editing: ${data.sections[activeSectionIndex].title || 'Untitled Section'}`}
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave('DRAFT')}
              disabled={isSaving}
              className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-sm font-semibold hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave('PUBLISHED')}
              disabled={isSaving}
              className="px-4 py-2 rounded-md bg-[#4F8CFF] text-white text-sm font-semibold hover:bg-[#3B78EB] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Save size={16} /> Publish
            </button>
          </div>
        </div>

        {activeSectionIndex === null ? (
          // --- General Settings View ---
          <div className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Case Study Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F8CFF] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">URL Slug</label>
              <input
                type="text"
                value={data.slug}
                onChange={(e) => setData({ ...data, slug: e.target.value })}
                className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F8CFF] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">Short Description</label>
              <textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={4}
                className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F8CFF] transition-colors resize-y"
              />
            </div>
          </div>
        ) : (
          // --- Section Editor View ---
          <div className="max-w-3xl space-y-8">
            {/* Section Controls */}
            <div className="flex items-center justify-end gap-2 mb-4">
              <button onClick={() => moveSection(activeSectionIndex, 'up')} disabled={activeSectionIndex === 0} className="p-2 bg-white/5 rounded-md hover:bg-white/10 disabled:opacity-30" title="Move Up">
                <ChevronUp size={16} />
              </button>
              <button onClick={() => moveSection(activeSectionIndex, 'down')} disabled={activeSectionIndex === data.sections.length - 1} className="p-2 bg-white/5 rounded-md hover:bg-white/10 disabled:opacity-30" title="Move Down">
                <ChevronDown size={16} />
              </button>
              <button onClick={() => duplicateSection(activeSectionIndex)} className="p-2 bg-white/5 rounded-md hover:bg-white/10 text-zinc-300" title="Duplicate Section">
                <Copy size={16} />
              </button>
              <button onClick={() => removeSection(activeSectionIndex)} className="p-2 bg-red-500/10 text-red-400 rounded-md hover:bg-red-500/20 ml-2" title="Delete Section">
                <Trash2 size={16} />
              </button>
            </div>

            {/* Text Content */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-2">SECTION TITLE</label>
                <input
                  type="text"
                  value={data.sections[activeSectionIndex].title}
                  onChange={(e) => updateActiveSection({ title: e.target.value })}
                  placeholder="e.g. Overview"
                  className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-[#4F8CFF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-2">SUBTEXT / DESCRIPTION (Optional)</label>
                <textarea
                  value={data.sections[activeSectionIndex].content}
                  onChange={(e) => updateActiveSection({ content: e.target.value })}
                  placeholder="Write the section content here..."
                  rows={6}
                  className="w-full bg-[#111113] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#4F8CFF] transition-colors resize-y leading-relaxed"
                />
              </div>
            </div>

            {/* Media Content */}
            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-6">
                <label className="block text-sm font-semibold text-zinc-400">IMAGE / MEDIA</label>
                <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#4F8CFF]/10 text-[#4F8CFF] font-semibold text-sm hover:bg-[#4F8CFF]/20 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                  <ImageIcon size={16} /> {isUploading ? 'Uploading...' : 'Add Image / PDF'}
                  <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleMediaUpload} disabled={isUploading} />
                </label>
              </div>

              {data.sections[activeSectionIndex].metadata.media.length === 0 ? (
                <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-zinc-500">
                  <ImageIcon size={48} className="mb-4 opacity-50" />
                  <p>No media added to this section yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {data.sections[activeSectionIndex].metadata.media.map((media, mIdx) => (
                    <div key={mIdx} className="bg-[#111113] border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-start">
                      
                      {/* Preview */}
                      <div className="w-full sm:w-48 aspect-video bg-black rounded-lg border border-white/5 flex items-center justify-center overflow-hidden shrink-0 relative">
                        {media.type === 'pdf' ? (
                          <div className="flex flex-col items-center text-zinc-500">
                            <FileText size={32} className="mb-2 text-red-400" />
                            <span className="text-xs font-semibold">PDF Document</span>
                          </div>
                        ) : (
                          <img src={media.url} alt="Media preview" className="w-full h-full object-contain" />
                        )}
                      </div>
                      
                      {/* Controls */}
                      <div className="flex-1 space-y-4 w-full">
                        <div>
                          <p className="text-xs font-mono text-zinc-500 truncate mb-1" title={media.url}>{media.url.split('/').pop()}</p>
                          <span className="inline-block px-2 py-0.5 bg-white/5 rounded text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                            {media.type}
                          </span>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-zinc-500 mb-2">SIZE</label>
                          <div className="flex gap-2">
                            {(['full', 'half', 'original'] as MediaSize[]).map((size) => (
                              <button
                                key={size}
                                onClick={() => updateMedia(mIdx, { size })}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-colors ${
                                  media.size === size ? 'bg-white text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button onClick={() => moveMedia(mIdx, 'up')} disabled={mIdx === 0} className="p-1.5 bg-white/5 rounded hover:bg-white/10 disabled:opacity-30" title="Move Up">
                            <ChevronUp size={14} />
                          </button>
                          <button onClick={() => moveMedia(mIdx, 'down')} disabled={mIdx === data.sections[activeSectionIndex!].metadata.media.length - 1} className="p-1.5 bg-white/5 rounded hover:bg-white/10 disabled:opacity-30" title="Move Down">
                            <ChevronDown size={14} />
                          </button>
                          <div className="w-px h-4 bg-white/10 mx-2"></div>
                          <label className="cursor-pointer text-xs font-semibold text-[#4F8CFF] hover:underline flex items-center gap-1">
                            Replace
                            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={async (e) => {
                               // Quick inline replace logic
                               const file = e.target.files?.[0];
                               if (!file) return;
                               const formData = new FormData();
                               formData.append('file', file);
                               try {
                                 const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                 const result = await res.json();
                                 if (res.ok) updateMedia(mIdx, { url: result.url, type: result.type });
                               } catch (err) {}
                            }} />
                          </label>
                          <button onClick={() => removeMedia(mIdx)} className="text-xs font-semibold text-red-400 hover:underline ml-auto">
                            Remove
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
