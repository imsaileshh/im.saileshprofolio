import { prisma } from '@/lib/database/prisma';
import { addEducationAction, deleteEducationAction } from './actions';
import { ConfirmSubmitButton } from '@/components/dashboard/ConfirmSubmitButton';
import { Trash2 } from 'lucide-react';

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
        <form action={addEducationAction} className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end gap-4">
            <label className="flex-1 min-w-[200px]">
              <span className="mb-1.5 block text-sm text-zinc-400">Institution</span>
              <input required name="institution" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#4F8CFF]" placeholder="e.g. University of Technology" />
            </label>
            <label className="flex-1 min-w-[200px]">
              <span className="mb-1.5 block text-sm text-zinc-400">Degree</span>
              <input required name="degree" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#4F8CFF]" placeholder="e.g. B.S. Computer Science" />
            </label>
            <label className="w-40">
              <span className="mb-1.5 block text-sm text-zinc-400">Start Date</span>
              <input required type="date" name="startDate" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none" />
            </label>
            <label className="w-40">
              <span className="mb-1.5 block text-sm text-zinc-400">End Date</span>
              <input type="date" name="endDate" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none" />
            </label>
            <label className="w-24">
              <span className="mb-1.5 block text-sm text-zinc-400">Order</span>
              <input type="number" name="orderIndex" defaultValue={0} className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none" />
            </label>
          </div>
          <label>
            <span className="mb-1.5 block text-sm text-zinc-400">Description (Optional)</span>
            <textarea name="description" className="min-h-24 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-white outline-none focus:border-[#4F8CFF]" placeholder="Graduated with honors..." />
          </label>
          <div className="flex justify-end">
            <button className="h-10 rounded-lg bg-[#4F8CFF] px-4 text-sm font-semibold text-white hover:bg-[#3B78EB]">
              Add Education
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#111113]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">Degree</th>
                <th className="px-4 py-3">Institution</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {educationList.map((edu) => (
                <tr key={edu.id} className="text-zinc-300">
                  <td className="px-4 py-3 font-medium text-white">{edu.degree}</td>
                  <td className="px-4 py-3">{edu.institution}</td>
                  <td className="px-4 py-3">
                    {edu.startDate.toLocaleDateString()} - {edu.endDate ? edu.endDate.toLocaleDateString() : 'Present'}
                  </td>
                  <td className="px-4 py-3">{edu.orderIndex}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteEducationAction}>
                      <input type="hidden" name="id" value={edu.id} />
                      <ConfirmSubmitButton message="Delete this education entry?" className="inline-flex text-zinc-500 hover:text-red-400">
                        <Trash2 size={16} />
                      </ConfirmSubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
              {educationList.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">No education added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
