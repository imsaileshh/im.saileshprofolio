import { PersonalProjectForm } from '@/components/dashboard/personal-projects/PersonalProjectForm';

export const metadata = {
  title: 'Add Personal Project | CMS Dashboard',
};

export default function NewPersonalProjectPage() {
  return (
    <main className="space-y-6">
      <header className="border-b border-white/5 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add Personal Project
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Create a new side experiment, tool, prototype, or open-source build.
        </p>
      </header>

      <PersonalProjectForm />
    </main>
  );
}
