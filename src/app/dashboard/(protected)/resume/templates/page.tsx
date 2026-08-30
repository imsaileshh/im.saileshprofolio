import Link from 'next/link';
import { ArrowLeft, Layers3 } from 'lucide-react';

const templates = [
  {
    name: 'Frontend Engineer',
    sections: ['Summary', 'Core Skills', 'Experience', 'Projects', 'Education', 'Certifications'],
    focus: 'React, TypeScript, UI performance, product collaboration, measurable outcomes',
  },
  {
    name: 'Full Stack Developer',
    sections: ['Summary', 'Technical Skills', 'Experience', 'Projects', 'Database and API Work', 'Education'],
    focus: 'Next.js, API design, database modeling, deployment, observability',
  },
  {
    name: 'Dashboard Specialist',
    sections: ['Summary', 'Analytics Skills', 'Experience', 'Dashboard Projects', 'Data Workflows', 'Education'],
    focus: 'Charts, filters, event tracking, insights, admin workflows',
  },
];

export default function ResumeTemplatesPage() {
  return (
    <main className="space-y-6">
      <header>
        <Link href="/dashboard/resume" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
          <ArrowLeft size={16} /> Resume CMS
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">Resume Templates</h1>
        <p className="mt-1 text-sm text-zinc-400">Use these structures while editing; templates do not rewrite your content automatically.</p>
      </header>

      <section className="grid gap-4 xl:grid-cols-3">
        {templates.map((template) => (
          <article key={template.name} className="rounded-lg border border-white/10 bg-[#111113] p-5">
            <div className="flex items-center gap-2">
              <Layers3 size={18} className="text-[#4F8CFF]" />
              <h2 className="text-lg font-semibold text-white">{template.name}</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{template.focus}</p>
            <div className="mt-4 space-y-2">
              {template.sections.map((section, index) => (
                <div key={section} className="flex items-center gap-3 rounded border border-white/10 px-3 py-2 text-sm text-zinc-300">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-white/10 text-xs text-white">{index + 1}</span>
                  {section}
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
