'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';

export function ProjectSearchForm({ 
  initialSearch, 
  initialView 
}: { 
  initialSearch?: string; 
  initialView?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch || '');
  const [view, setView] = useState(initialView || 'all');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    if (search) params.set('search', search);
    else params.delete('search');
    
    if (view && view !== 'all') params.set('view', view);
    else params.delete('view');
    
    params.delete('page'); // reset page on new search
    
    router.push(`/dashboard/projects?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects by title, description, or tags..."
          className="h-12 w-full rounded-md border-none bg-black/20 pl-12 pr-4 text-sm text-white outline-none transition focus:bg-black/40 focus:ring-1 focus:ring-[#4F8CFF]"
        />
      </div>
      <div className="flex gap-2">
        <select 
          value={view} 
          onChange={(e) => setView(e.target.value)} 
          className="h-12 rounded-md border border-white/5 bg-black/40 px-4 text-sm text-zinc-300 outline-none focus:border-[#4F8CFF]"
        >
          <option value="all">All Projects</option>
          <option value="caseStudies">Case Studies</option>
          <option value="featured">Featured</option>
          <option value="clientWork">Client Work</option>
          <option value="personalProjects">Personal Projects</option>
          <option value="openSource">Open Source</option>
        </select>
        <button type="button" className="flex h-12 items-center gap-2 rounded-md border border-white/5 bg-black/40 px-4 text-sm font-medium text-zinc-300 hover:bg-white/5">
          Filters
        </button>
        <button type="submit" className="h-12 rounded-md bg-[#4F8CFF] px-6 text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 transition-all hover:bg-[#3B78EB]">
          Search
        </button>
      </div>
    </form>
  );
}
