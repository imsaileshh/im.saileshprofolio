'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Archive, Copy, Eye, FileText, MoreHorizontal, Pencil, Star, Trash2, FolderGit2 } from 'lucide-react';
import { ConfirmSubmitButton } from '@/components/dashboard/ConfirmSubmitButton';
import { getProjectStatus } from '@/lib/dashboard/projects';
import {
  deleteProjectAction,
  duplicateProjectAction,
  quickProjectAction,
  bulkProjectAction,
} from '@/app/dashboard/(protected)/projects/actions';

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string | null;
  projectType: string;
  technologies: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  archived: boolean;
  updatedAt: Date;
  thumbnailUrl?: string | null;
  coverImageUrl?: string | null;
  images?: { url: string; isCover: boolean }[];
  caseStudy?: any;
};

function statusTone(status: string) {
  if (status === 'Published') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
  if (status === 'Archived') return 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400';
  return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
}

function coverForProject(project: ProjectRow) {
  return project.thumbnailUrl ?? project.coverImageUrl ?? project.images?.find((image) => image.isCover)?.url ?? project.images?.[0]?.url;
}

function ProjectActions({ project }: { project: ProjectRow }) {
  const nextFeaturedAction = project.featured ? 'removeFeatured' : 'markFeatured';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={`/dashboard/projects/${project.id}/edit`} className="inline-flex items-center gap-1 rounded border border-white/10 px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-white/10">
        <Pencil size={14} /> Edit
      </Link>
      <Link href={`/dashboard/projects/${project.id}/case-study`} className={`inline-flex items-center gap-1 rounded border px-2.5 py-1.5 text-xs ${project.caseStudy ? 'border-emerald-400/30 text-emerald-300 hover:bg-emerald-400/10' : 'border-white/10 text-zinc-200 hover:bg-white/10'}`}>
        <FileText size={14} /> Case Study {project.caseStudy ? '✓' : ''}
      </Link>
      <Link href={`/projects/${project.slug}`} target="_blank" className="inline-flex items-center gap-1 rounded border border-white/10 px-2.5 py-1.5 text-xs text-zinc-200 hover:bg-white/10">
        <Eye size={14} /> Preview
      </Link>
      <details className="relative">
        <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded border border-white/10 text-zinc-300 hover:bg-white/10" aria-label="More project actions">
          <MoreHorizontal size={16} />
        </summary>
        <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-white/10 bg-zinc-950 p-2 shadow-xl">
          <form action={duplicateProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <button className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-zinc-200 hover:bg-white/10"><Copy size={14} /> Duplicate</button>
          </form>
          <form action={quickProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <button name="action" value={nextFeaturedAction} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-zinc-200 hover:bg-white/10">
              <Star size={14} /> {project.featured ? 'Remove Featured' : 'Mark Featured'}
            </button>
          </form>
          <form action={quickProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <button name="action" value={project.published ? 'unpublish' : 'publish'} className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-zinc-200 hover:bg-white/10">
              <FileText size={14} /> {project.published ? 'Unpublish' : 'Publish'}
            </button>
          </form>
          <form action={quickProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <ConfirmSubmitButton name="action" value="archive" message="Archive this project?" className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-zinc-200 hover:bg-white/10"><Archive size={14} /> Archive</ConfirmSubmitButton>
          </form>
          <form action={deleteProjectAction}>
            <input type="hidden" name="id" value={project.id} />
            <ConfirmSubmitButton message="Delete this project permanently?" className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-xs text-red-200 hover:bg-red-500/10"><Trash2 size={14} /> Delete</ConfirmSubmitButton>
          </form>
        </div>
      </details>
    </div>
  );
}

export function ProjectRows({ projects }: { projects: ProjectRow[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAll = () => {
    if (selectedIds.size === projects.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(projects.map(p => p.id)));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {selectedIds.size > 0 && (
        <form action={bulkProjectAction} className="sticky top-0 z-30 flex flex-col gap-3 rounded-lg border border-[#4F8CFF]/30 bg-[#4F8CFF]/10 p-4 shadow-xl backdrop-blur-md xl:flex-row xl:items-center xl:justify-between">
          {Array.from(selectedIds).map(id => (
            <input key={id} type="hidden" name="ids" value={id} />
          ))}
          <div>
            <p className="text-sm font-semibold text-[#4F8CFF]">{selectedIds.size} project{selectedIds.size !== 1 ? 's' : ''} selected</p>
            <p className="text-xs text-[#4F8CFF]/80">Choose an action to apply to all selected projects.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button name="action" value="publish" className="rounded bg-[#4F8CFF]/20 px-3 py-2 text-xs font-medium text-[#4F8CFF] hover:bg-[#4F8CFF]/30">Publish</button>
            <button name="action" value="unpublish" className="rounded bg-[#4F8CFF]/20 px-3 py-2 text-xs font-medium text-[#4F8CFF] hover:bg-[#4F8CFF]/30">Unpublish</button>
            <ConfirmSubmitButton name="action" value="archive" message={`Archive ${selectedIds.size} selected projects?`} className="inline-flex items-center gap-1.5 rounded bg-zinc-500/20 px-3 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-500/30"><Archive size={14} /> Archive</ConfirmSubmitButton>
            <button name="action" value="markFeatured" className="rounded bg-[#4F8CFF]/20 px-3 py-2 text-xs font-medium text-[#4F8CFF] hover:bg-[#4F8CFF]/30">Mark Featured</button>
            <button name="action" value="removeFeatured" className="rounded bg-[#4F8CFF]/20 px-3 py-2 text-xs font-medium text-[#4F8CFF] hover:bg-[#4F8CFF]/30">Remove Featured</button>
            <ConfirmSubmitButton name="action" value="delete" message={`Delete ${selectedIds.size} selected projects permanently? This cannot be undone.`} className="inline-flex items-center gap-1.5 rounded bg-red-500/20 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/30"><Trash2 size={14} /> Delete</ConfirmSubmitButton>
          </div>
        </form>
      )}

      <div className="hidden overflow-x-auto rounded-lg border border-white/10 bg-[#111113] lg:block">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black" checked={selectedIds.size === projects.length && projects.length > 0} onChange={toggleAll} /></th>
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Technologies</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {projects.map((project) => {
              const status = getProjectStatus(project);
              const cover = coverForProject(project);
              return (
                <tr key={project.id} className={`align-top transition-colors ${selectedIds.has(project.id) ? 'bg-white/5' : ''}`}>
                  <td className="px-4 py-4"><input type="checkbox" checked={selectedIds.has(project.id)} onChange={() => toggleSelection(project.id)} className="h-4 w-4 rounded border-white/20 bg-black text-[#4F8CFF] focus:ring-[#4F8CFF]" /></td>
                  <td className="min-w-80 px-4 py-4">
                    <div className="flex gap-3">
                      <div className="relative h-14 w-20 overflow-hidden rounded border border-white/10 bg-black/30 flex items-center justify-center">
                        {cover ? <Image src={cover} alt={project.title} fill className="object-cover" /> : <FolderGit2 className="h-6 w-6 text-zinc-600" />}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{project.title}</p>
                        <p className="mt-1 line-clamp-1 max-w-[280px] text-xs text-zinc-500" title={project.description}>{project.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {project.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded bg-white/5 px-2 py-0.5 text-[11px] text-zinc-400">{tag}</span>)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">{project.category ?? 'Uncategorized'}</td>
                  <td className="px-4 py-4">
                    <span className="rounded bg-white/5 px-2 py-1 text-xs font-medium text-zinc-400 border border-white/10">{project.projectType}</span>
                  </td>
                  <td className="max-w-52 px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => <span key={tech} className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[11px] text-zinc-300">{tech}</span>)}
                      {project.technologies.length > 3 && <span className="rounded border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[11px] text-zinc-500">+{project.technologies.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4"><span className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusTone(status)}`}>{status}</span></td>
                  <td className="px-4 py-4">{project.featured ? <span className="inline-flex items-center gap-1 rounded-full border border-[#4F8CFF]/30 bg-[#4F8CFF]/10 px-2 py-0.5 text-[11px] font-medium text-[#9DBDFF]"><Star size={10} className="fill-current" /> Featured</span> : <span className="text-xs text-zinc-600">-</span>}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs text-zinc-400">{project.updatedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td className="px-4 py-4"><ProjectActions project={project} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {projects.map((project) => {
          const status = getProjectStatus(project);
          const cover = coverForProject(project);
          return (
            <article key={project.id} className={`rounded-lg border transition-colors p-4 ${selectedIds.has(project.id) ? 'border-[#4F8CFF]/30 bg-[#4F8CFF]/5' : 'border-white/10 bg-[#111113]'}`}>
              <div className="flex gap-3">
                <input type="checkbox" checked={selectedIds.has(project.id)} onChange={() => toggleSelection(project.id)} className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-[#4F8CFF]" />
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded border border-white/10 bg-black/30 flex items-center justify-center">
                  {cover ? <Image src={cover} alt={project.title} fill className="object-cover" /> : <FolderGit2 className="h-6 w-6 text-zinc-600" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{project.title}</h3>
                    <span className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusTone(status)}`}>{status}</span>
                    {project.featured ? <span className="inline-flex items-center gap-1 rounded-full border border-[#4F8CFF]/30 bg-[#4F8CFF]/10 px-2 py-0.5 text-[10px] font-medium text-[#9DBDFF]"><Star size={8} className="fill-current" /> Featured</span> : null}
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-zinc-500" title={project.description}>{project.description}</p>
                  <p className="mt-2 text-xs text-zinc-400">{project.category ?? 'Uncategorized'} · <span className="font-medium">{project.projectType}</span></p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => <span key={tech} className="rounded border border-white/10 px-2 py-0.5 text-[11px] text-zinc-300">{tech}</span>)}
              </div>
              <div className="mt-4">
                <ProjectActions project={project} />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
