'use client';

import { useState, useActionState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Check, Image as ImageIcon, Save } from 'lucide-react';
import { 
  createPersonalProjectAction, 
  updatePersonalProjectAction, 
  ActionState 
} from '@/app/dashboard/(protected)/personal-projects/actions';

const inputClass = 'h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#4F8CFF]';
const textareaClass = 'min-h-24 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-[#4F8CFF]';

export function PersonalProjectForm({ project }: { project?: any }) {
  const isEditing = Boolean(project?.id);
  const actionFn = isEditing ? updatePersonalProjectAction : createPersonalProjectAction;
  const [state, formAction, isPending] = useActionState(actionFn, {});

  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [category, setCategory] = useState(project?.category || 'CLI / DevTool');
  const [year, setYear] = useState(project?.year || new Date().getFullYear().toString());
  const [technologies, setTechnologies] = useState(project?.technologies?.join(', ') || 'TypeScript, React, Node.js');
  const [description, setDescription] = useState(project?.description || '');
  const [coverImageUrl, setCoverImageUrl] = useState(
    project?.images?.[0]?.url || project?.coverImageUrl || ''
  );
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [published, setPublished] = useState(project?.published ?? true);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  return (
    <form action={formAction} className="space-y-8 max-w-4xl">
      {isEditing && <input type="hidden" name="id" value={project.id} />}

      {/* Error / Alert banner */}
      {state?.error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          <AlertCircle size={16} className="text-red-400 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {/* ── 01. Basic Info ── */}
      <section className="rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6 space-y-4">
        <h2 className="text-base font-semibold text-white tracking-tight border-b border-white/5 pb-3">
          Project Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. DevScope CLI"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              URL Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="devscope-cli"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Category / Type
            </label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Developer Tool / CLI / Prototype"
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Year
            </label>
            <input
              type="text"
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2025"
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-zinc-300">
            Short Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short summary of what this tool/experiment does and why it was built..."
            rows={3}
            required
            className={textareaClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-zinc-300">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            name="technologies"
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
            placeholder="TypeScript, Rust, React, Tailwind CSS"
            className={inputClass}
          />
        </div>
      </section>

      {/* ── 02. Media & Links ── */}
      <section className="rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6 space-y-4">
        <h2 className="text-base font-semibold text-white tracking-tight border-b border-white/5 pb-3">
          Media & External Links
        </h2>

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-zinc-300">
            Thumbnail / Cover Image URL
          </label>
          <input
            type="text"
            name="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://... or /images/projects/project1.svg"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              GitHub Repository URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/project"
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Live Demo / Project URL
            </label>
            <input
              type="url"
              name="liveUrl"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://project.dev"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ── 03. Visibility & Publishing ── */}
      <section className="rounded-xl border border-white/10 bg-[#111113] p-5 sm:p-6 space-y-4">
        <h2 className="text-base font-semibold text-white tracking-tight border-b border-white/5 pb-3">
          Status & Visibility
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black/40 text-[#4F8CFF] focus:ring-0"
            />
            <div>
              <span className="text-sm font-medium text-white">Publish on Site</span>
              <p className="text-xs text-zinc-500">Visible on the /personal-projects page</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black/40 text-amber-400 focus:ring-0"
            />
            <div>
              <span className="text-sm font-medium text-white">Feature Project</span>
              <p className="text-xs text-zinc-500">Highlight with a star badge</p>
            </div>
          </label>
        </div>
      </section>

      {/* ── Action Buttons ── */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/dashboard/personal-projects"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Cancel</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            name="action"
            value="save_draft"
            disabled={isPending}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            Save Draft
          </button>

          <button
            type="submit"
            name="action"
            value="publish"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-[#4F8CFF] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 hover:bg-[#3B78EB] transition-all disabled:opacity-50"
          >
            <Save size={16} />
            <span>{isPending ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Project'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
