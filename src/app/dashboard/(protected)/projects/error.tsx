'use client';

export default function DashboardProjectsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-md rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
        <h1 className="text-lg font-semibold text-red-100">Projects could not be loaded</h1>
        <p className="mt-2 text-sm text-red-200/80">Refresh the dashboard or try again after checking the project database connection.</p>
        <button onClick={reset} className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">Try again</button>
      </div>
    </main>
  );
}
