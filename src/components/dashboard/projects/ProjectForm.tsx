'use client';

import { useState, KeyboardEvent, ReactNode, useEffect, useActionState } from 'react';
import { X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { projectStatusLabels, projectTypeLabels, getProjectStatus } from '@/lib/dashboard/projects';
import { ActionState } from '@/app/dashboard/(protected)/projects/actions';
import { GalleryInput } from './GalleryInput';

type ProjectFormProject = {
  id?: string;
  title?: string;
  slug?: string;
  description?: string;
  projectType?: string;
  category?: string | null;
  technologies?: string[];
  featured?: boolean;
  published?: boolean;
  archived?: boolean;
  liveUrl?: string | null;
  githubUrl?: string | null;
  figmaUrl?: string | null;
  coverImageUrl?: string | null;
  galleryImages?: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
};

function value(project: ProjectFormProject | undefined, key: keyof ProjectFormProject) {
  const item = project?.[key];
  if (typeof item === 'string') return item;
  return '';
}

function Field({
  label,
  name,
  children,
  optional = false,
}: {
  label: string;
  name: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 flex items-center justify-between font-medium text-zinc-300">
        {label}
        {optional && <span className="text-xs font-normal text-zinc-500">Optional</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass = 'h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#4F8CFF]';
const textareaClass = 'min-h-24 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#4F8CFF]';

// Tag Input Component
function TagInput({ name, initialTags = [] }: { name: string; initialTags?: string[] }) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = inputValue.trim().replace(/^,|,$/g, '');
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1 rounded-md bg-[#4F8CFF]/10 px-2 py-1 text-xs font-medium text-[#4F8CFF] border border-[#4F8CFF]/20">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="text-[#4F8CFF]/70 hover:text-[#4F8CFF]">
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className={inputClass}
        placeholder="Type and press Enter to add"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <input type="hidden" name={name} value={tags.join(',')} />
    </div>
  );
}

// Media URL Preview Component
function MediaUrlInput({ label, name, defaultValue, placeholder }: { label: string; name: string; defaultValue: string; placeholder?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="space-y-2">
      <Field label={label} name={name} optional>
        <input 
          className={inputClass} 
          name={name} 
          value={url} 
          onChange={(e) => { setUrl(e.target.value); setHasError(false); }} 
          placeholder={placeholder || 'https://...'} 
          type="url" 
        />
      </Field>
      {url && !hasError ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black/50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; setHasError(true); }} />
        </div>
      ) : url && hasError ? (
        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-dashed border-red-500/30 bg-red-500/5 text-red-400">
          <AlertCircle size={24} className="mb-2 opacity-50" />
          <span className="text-xs">Failed to load image</span>
        </div>
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 text-zinc-500">
          <ImageIcon size={24} className="mb-2 opacity-50" />
          <span className="text-xs">No image provided</span>
        </div>
      )}
    </div>
  );
}

export function ProjectForm({
  project,
  action,
  submitLabel,
  isNew = false,
  categories = [],
}: {
  project?: ProjectFormProject;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  isNew?: boolean;
  categories?: string[];
}) {
  const status = project?.published === undefined || project?.archived === undefined
    ? 'Draft'
    : getProjectStatus({ published: project.published, archived: project.archived });

  const [state, formAction, isPending] = useActionState(action, { success: false });

  const [showSlug, setShowSlug] = useState(!isNew);
  const [isDirty, setIsDirty] = useState(false);
  const [title, setTitle] = useState(value(project, 'title'));
  const [slug, setSlug] = useState(value(project, 'slug'));

  useEffect(() => {
    if (isNew && !showSlug) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [title, isNew, showSlug]);

  useEffect(() => {
    if (!isDirty || isPending) return;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isPending]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
      {/* STICKY SIDE NAVIGATION */}
      <nav className="hidden w-48 shrink-0 lg:sticky lg:top-24 lg:block">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">Sections</h3>
        <div className="flex flex-col gap-2">
          <a href="#basic" className="text-sm font-medium text-zinc-400 transition hover:text-white">Basic Information</a>
          <a href="#links" className="text-sm font-medium text-zinc-400 transition hover:text-white">Links</a>
          <a href="#media" className="text-sm font-medium text-zinc-400 transition hover:text-white">Media</a>
          <a href="#publishing" className="text-sm font-medium text-zinc-400 transition hover:text-white">Publishing</a>
          <a href="#seo" className="text-sm font-medium text-zinc-400 transition hover:text-white">SEO</a>
        </div>
      </nav>

      <form action={formAction} onChange={() => setIsDirty(true)} className="flex-1 space-y-12 pb-24">
        {project?.id && <input type="hidden" name="id" value={project.id} />}
      
      {state.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {/* SECTION 1 - BASIC INFORMATION */}
      <section id="basic" className="scroll-mt-24 space-y-6 rounded-xl border border-white/5 bg-[#111113] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white">Basic Information</h2>
        
        <div className="space-y-4">
          <Field label="Project title *" name="title">
            <input className={inputClass} name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Organic E-commerce Platform" required minLength={2} />
          </Field>
          
          <div className="flex justify-end">
            {!showSlug && (
              <button type="button" onClick={() => setShowSlug(true)} className="text-xs font-medium text-[#4F8CFF] hover:underline">
                Edit slug
              </button>
            )}
          </div>
          {showSlug ? (
            <Field label="Slug *" name="slug">
              <input className={inputClass} name="slug" value={slug} onChange={(e) => setSlug(e.target.value)} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="organic-ecommerce-platform" required />
            </Field>
          ) : (
            <input type="hidden" name="slug" value={slug} />
          )}

          <Field label="Short description *" name="description">
            <textarea className={textareaClass} name="description" defaultValue={value(project, 'description')} placeholder="Modern e-commerce experience focused on organic and sustainable products." required minLength={5} />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Project type" name="projectType">
              <select className={inputClass} name="projectType" defaultValue={project?.projectType ?? 'Personal Project'}>
                {projectTypeLabels.map((type) => <option key={type}>{type}</option>)}
              </select>
            </Field>
            
            <Field label="Category" name="category">
              <input list="category-options" className={inputClass} name="category" defaultValue={value(project, 'category')} placeholder="e.g. Mobile App, E-commerce" />
              <datalist id="category-options">
                {categories.map((cat) => <option key={cat} value={cat} />)}
              </datalist>
            </Field>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">Technologies</label>
            <TagInput name="technologies" initialTags={project?.technologies || []} />
          </div>
        </div>
      </section>

      {/* SECTION 2 - LINKS */}
      <section id="links" className="scroll-mt-24 space-y-6 rounded-xl border border-white/5 bg-[#111113] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white">Links</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Live URL" name="liveUrl" optional>
            <input className={inputClass} name="liveUrl" defaultValue={value(project, 'liveUrl')} type="url" placeholder="https://" />
          </Field>
          <Field label="GitHub URL" name="githubUrl" optional>
            <input className={inputClass} name="githubUrl" defaultValue={value(project, 'githubUrl')} type="url" placeholder="https://github.com/..." />
          </Field>
          <Field label="Figma URL" name="figmaUrl" optional>
            <input className={inputClass} name="figmaUrl" defaultValue={value(project, 'figmaUrl')} type="url" placeholder="https://figma.com/..." />
          </Field>
        </div>
      </section>

      {/* SECTION 3 - MEDIA */}
      <section id="media" className="scroll-mt-24 space-y-6 rounded-xl border border-white/5 bg-[#111113] p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Media</h2>
          <span className="text-xs text-zinc-500">16:9 aspect ratio recommended</span>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <MediaUrlInput label="Cover Image URL" name="coverImageUrl" defaultValue={value(project, 'coverImageUrl')} />
          
          <div className="space-y-2">
            <label className="block text-sm">
              <span className="mb-1.5 flex items-center justify-between font-medium text-zinc-300">
                Gallery Images (URLs) <span className="text-xs font-normal text-zinc-500">Optional</span>
              </span>
            </label>
            <GalleryInput initialUrls={project?.galleryImages || []} />
          </div>
        </div>
      </section>

      {/* SECTION 4 - PUBLISHING */}
      <section id="publishing" className="scroll-mt-24 space-y-6 rounded-xl border border-white/5 bg-[#111113] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white">Publishing</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-300">Visibility</label>
            <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
              <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4 rounded border-white/20 bg-black text-[#4F8CFF] focus:ring-[#4F8CFF]" />
              Featured project
            </label>
            <p className="text-xs text-zinc-500">Featured projects appear prominently on the homepage.</p>
          </div>
        </div>
      </section>

      {/* ADVANCED SETTINGS */}
      <details id="seo" className="group scroll-mt-24 rounded-xl border border-white/5 bg-[#111113] shadow-xl">
        <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-semibold text-white outline-none">
          Advanced Settings
          <span className="text-zinc-500 transition-transform group-open:rotate-180">▼</span>
        </summary>
        <div className="space-y-4 border-t border-white/5 p-6 pt-4">
          <p className="text-xs text-zinc-500 mb-4">SEO fields will default to the project title and description if left blank.</p>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="SEO Title" name="seoTitle" optional><input className={inputClass} name="seoTitle" defaultValue={value(project, 'seoTitle')} /></Field>
            <Field label="Social/OG Image" name="ogImage" optional><input className={inputClass} name="ogImage" defaultValue={value(project, 'ogImage')} type="url" /></Field>
            <div className="md:col-span-2">
              <Field label="SEO Description" name="seoDescription" optional><textarea className={textareaClass} name="seoDescription" defaultValue={value(project, 'seoDescription')} /></Field>
            </div>
          </div>
        </div>
      </details>

      {/* STICKY ACTION BAR */}
      <div className="sticky bottom-6 z-40 flex items-center justify-end gap-3 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-2xl backdrop-blur-md">
        <button 
          type="button" 
          onClick={() => {
            if (isDirty && !window.confirm('You have unsaved changes. Leave without saving?')) return;
            window.history.back();
          }} 
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>
        {!isNew && status === 'Published' ? (
          <button 
            type="submit" 
            name="action"
            value="save_changes"
            disabled={isPending}
            className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-white/20 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        ) : (
          <button 
            type="submit" 
            name="action"
            value="save_draft"
            disabled={isPending}
            className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-white/20 disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Draft'}
          </button>
        )}
        <button 
          type="submit"
          name="action"
          value="publish" 
          disabled={isPending}
          className="rounded-lg bg-[#4F8CFF] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 transition-all hover:bg-[#3B78EB] disabled:opacity-50"
        >
          {isPending ? 'Saving...' : (isNew ? 'Create & Publish' : (status === 'Published' ? 'Publish Changes' : 'Publish Project'))}
        </button>
      </div>
    </form>
    </div>
  );
}
