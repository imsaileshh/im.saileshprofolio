import { prisma } from '@/lib/database/prisma';
import { EducationForm } from './EducationForm';
import { EducationList } from './EducationList';

export const dynamic = 'force-dynamic';

export default async function DashboardEducationPage() {
  const educationList = await prisma.education.findMany({
    orderBy: [{ orderIndex: 'asc' }, { startDate: 'desc' }],
  });

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-white">Education</h1>
        <p className="mt-1 text-sm text-zinc-400">Manage your educational background.</p>
      </header>

      <section className="rounded-lg border border-white/10 bg-[#111113] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Add Education</h2>
        <EducationForm />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Manage Education (Drag to Reorder)</h2>
        <EducationList initialEducation={educationList} />
      </section>
    </main>
  );
}
