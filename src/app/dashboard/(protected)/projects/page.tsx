import Link from 'next/link';
import { Archive, CheckCircle2, FileText, FolderGit2, Search, Star, Trash2 } from 'lucide-react';
import { ConfirmSubmitButton } from '@/components/dashboard/ConfirmSubmitButton';
import { ProjectRows } from '@/components/dashboard/projects/ProjectRows';
import { TaxonomyManager } from '@/components/dashboard/projects/TaxonomyManager';
import { ProjectSearchForm } from '@/components/dashboard/projects/ProjectSearchForm';
import { bulkProjectAction } from './actions';
import { getDashboardProjects, projectStatusLabels } from '@/lib/dashboard/projects';
import { pickParam } from '@/lib/dashboard/data';
import { projectListQuerySchema } from '@/lib/validation/schemas';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function queryHref(params: Record<string, string | undefined>, updates: Record<string, string | number>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  for (const [key, value] of Object.entries(updates)) {
    query.set(key, String(value));
  }
  return `/dashboard/projects?${query.toString()}`;
}

function statCards(stats: Awaited<ReturnType<typeof getDashboardProjects>>['stats']) {
  return [
    { label: 'Total Projects', value: stats.total, icon: FolderGit2 },
    { label: 'Published', value: stats.published, icon: CheckCircle2 },
    { label: 'Drafts', value: stats.drafts, icon: FileText },
    { label: 'Case Studies', value: stats.caseStudies, icon: FileText },
    { label: 'Featured', value: stats.featured, icon: Star },
  ];
}

export default async function DashboardProjectsPage({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const parsed = projectListQuerySchema.parse({
    page: pickParam(resolvedParams, 'page'),
    limit: pickParam(resolvedParams, 'limit'),
    search: pickParam(resolvedParams, 'search'),
    view: pickParam(resolvedParams, 'view'),
    category: pickParam(resolvedParams, 'category'),
    technology: pickParam(resolvedParams, 'technology'),
    status: pickParam(resolvedParams, 'status'),
    year: pickParam(resolvedParams, 'year'),
    sort: pickParam(resolvedParams, 'sort'),
  });
  const data = await getDashboardProjects(parsed);
  const currentParams = {
    search: parsed.search,
    view: parsed.view,
    category: parsed.category,
    technology: parsed.technology,
    status: parsed.status,
    year: parsed.year,
    sort: parsed.sort,
    limit: String(parsed.limit),
  };
  const saved = pickParam(resolvedParams, 'saved');

  return (
    <main className="space-y-6">
      {saved ? (
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Project {saved} successfully.
        </div>
      ) : null}

      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Projects</h1>
          <p className="mt-1 text-sm text-zinc-400">Manage portfolio projects and case studies.</p>
        </div>
        <Link href="/dashboard/projects/new" className="rounded-lg bg-[#4F8CFF] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 transition-all hover:bg-[#3B78EB]">
          + Add Project
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {statCards(data.stats).map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-[#111113] p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-wider text-zinc-500">{item.label}</p>
              <item.icon className="h-3.5 w-3.5 text-[#4F8CFF]/80" />
            </div>
            <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-[#111113] p-2">
        <ProjectSearchForm initialSearch={parsed.search} initialView={parsed.view} />
      </section>

      <section className="rounded-lg border border-white/10 bg-[#111113]">
        {data.projects.length ? (
          <ProjectRows projects={data.projects} />
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-4 text-center">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <FolderGit2 className="h-8 w-8 text-[#4F8CFF]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">No projects found</h2>
              <p className="mt-1 text-sm text-zinc-500 mb-4">
                {data.stats.total === 0 
                  ? "Add your first project to showcase your work, case studies, and technical experience." 
                  : "No projects match your current search filters."}
              </p>
              {data.stats.total === 0 && (
                <Link href="/dashboard/projects/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#4F8CFF] px-4 text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 transition-all hover:bg-[#3B78EB]">
                  + Add Project
                </Link>
              )}
            </div>
          </div>
        )}
      </section>

      <footer className="flex flex-col gap-3 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {data.pagination.from}-{data.pagination.to} of {data.pagination.total} projects
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <form>
            {Object.entries(currentParams).map(([key, value]) => key !== 'limit' && value ? <input key={key} type="hidden" name={key} value={value} /> : null)}
            <select name="limit" defaultValue={parsed.limit} className="h-9 rounded border border-white/10 bg-black/30 px-2 text-xs text-white">
              {[12, 24, 48, 100].map((size) => <option key={size} value={size}>{size} / page</option>)}
            </select>
            <button className="ml-2 h-9 rounded border border-white/10 px-3 text-xs text-zinc-200 hover:bg-white/10">Apply</button>
          </form>
          <Link className="rounded border border-white/10 px-3 py-2 hover:bg-white/10" href={queryHref(currentParams, { page: Math.max(1, data.pagination.page - 1) })}>Previous</Link>
          <span>Page {data.pagination.page} of {data.pagination.pageCount}</span>
          <Link className="rounded border border-white/10 px-3 py-2 hover:bg-white/10" href={queryHref(currentParams, { page: Math.min(data.pagination.pageCount, data.pagination.page + 1) })}>Next</Link>
        </div>
      </footer>

      <TaxonomyManager taxonomies={data.taxonomies} />
    </main>
  );
}
