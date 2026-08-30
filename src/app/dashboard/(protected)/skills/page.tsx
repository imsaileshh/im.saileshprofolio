import { prisma } from '@/lib/database/prisma';
import { addSkillAction, deleteSkillAction } from './actions';
import { ConfirmSubmitButton } from '@/components/dashboard/ConfirmSubmitButton';
import { Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: 'asc' }, { orderIndex: 'asc' }],
  });

  return (
    <main className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-white">Skills</h1>
        <p className="mt-1 text-sm text-zinc-400">Manage your technical skills.</p>
      </header>

      <section className="rounded-lg border border-white/10 bg-[#111113] p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Add Skill</h2>
        <form action={addSkillAction} className="flex flex-wrap items-end gap-4">
          <label className="flex-1 min-w-[200px]">
            <span className="mb-1.5 block text-sm text-zinc-400">Name</span>
            <input required name="name" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#4F8CFF]" placeholder="e.g. React" />
          </label>
          <label className="flex-1 min-w-[200px]">
            <span className="mb-1.5 block text-sm text-zinc-400">Category</span>
            <input required name="category" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none focus:border-[#4F8CFF]" placeholder="e.g. Frontend" />
          </label>
          <label className="w-32">
            <span className="mb-1.5 block text-sm text-zinc-400">Level</span>
            <select name="level" className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none">
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
          <label className="w-24">
            <span className="mb-1.5 block text-sm text-zinc-400">Order</span>
            <input type="number" name="orderIndex" defaultValue={0} className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white outline-none" />
          </label>
          <button className="h-10 rounded-lg bg-[#4F8CFF] px-4 text-sm font-semibold text-white hover:bg-[#3B78EB]">
            Add Skill
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-white/10 bg-[#111113]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Level</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {skills.map((skill) => (
                <tr key={skill.id} className="text-zinc-300">
                  <td className="px-4 py-3 font-medium text-white">{skill.name}</td>
                  <td className="px-4 py-3">{skill.category}</td>
                  <td className="px-4 py-3">{skill.level}</td>
                  <td className="px-4 py-3">{skill.orderIndex}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteSkillAction}>
                      <input type="hidden" name="id" value={skill.id} />
                      <ConfirmSubmitButton message="Delete this skill?" className="inline-flex text-zinc-500 hover:text-red-400">
                        <Trash2 size={16} />
                      </ConfirmSubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-500">No skills added yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
