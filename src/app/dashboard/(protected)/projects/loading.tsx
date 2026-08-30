export default function DashboardProjectsLoading() {
  return (
    <main className="space-y-6">
      <div className="h-16 animate-pulse rounded-lg bg-white/[0.04]" />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => <div key={index} className="h-28 animate-pulse rounded-lg bg-white/[0.04]" />)}
      </div>
      <div className="h-20 animate-pulse rounded-lg bg-white/[0.04]" />
      <div className="h-96 animate-pulse rounded-lg bg-white/[0.04]" />
    </main>
  );
}
