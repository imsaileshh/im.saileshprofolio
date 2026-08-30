import Link from 'next/link';
import { Filter, UserRound } from 'lucide-react';
import { formatShortId, getDashboardVisitors, pickParam } from '@/lib/dashboard/data';
import { visitorListQuerySchema } from '@/lib/validation/schemas';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DashboardVisitorsPage({ searchParams }: PageProps) {
  const resolvedParams = (await searchParams) ?? {};
  const query = visitorListQuerySchema.parse({
    page: pickParam(resolvedParams, 'page'),
    limit: pickParam(resolvedParams, 'limit'),
    from: pickParam(resolvedParams, 'from'),
    to: pickParam(resolvedParams, 'to'),
    device: pickParam(resolvedParams, 'device'),
    browser: pickParam(resolvedParams, 'browser'),
    os: pickParam(resolvedParams, 'os'),
    referrer: pickParam(resolvedParams, 'referrer'),
    kind: pickParam(resolvedParams, 'kind'),
    hasConversion: pickParam(resolvedParams, 'hasConversion'),
    sort: pickParam(resolvedParams, 'sort'),
  });
  const data = await getDashboardVisitors(query);

  return (
    <main className="space-y-6">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Visitors</h1>
          <p className="text-sm text-zinc-400">Privacy-conscious anonymous visitor records from real sessions.</p>
        </div>
        <form className="flex flex-wrap gap-2">
          <input name="device" defaultValue={query.device} placeholder="Device" className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white" />
          <input name="browser" defaultValue={query.browser} placeholder="Browser" className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white" />
          <input name="os" defaultValue={query.os} placeholder="Operating system" className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white" />
          <input name="referrer" defaultValue={query.referrer} placeholder="Referrer" className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white" />
          <select name="kind" defaultValue={query.kind ?? ''} className="h-10 rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white">
            <option value="">All visitors</option>
            <option value="new">New Visitor</option>
            <option value="returning">Returning Visitor</option>
          </select>
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#4F8CFF] px-4 text-sm font-semibold text-white"><Filter size={15} /> Filter</button>
        </form>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ['Unique visitors', data.summary.uniqueVisitors],
          ['New visitors', data.summary.newVisitors],
          ['Returning visitors', data.summary.returningVisitors],
          ['Total sessions', data.summary.totalSessions],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-white/10 bg-[#111113] p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-[#111113]">
        {data.visitors.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Anonymous ID</th>
                  <th className="px-4 py-3">First Seen</th>
                  <th className="px-4 py-3">Last Seen</th>
                  <th className="px-4 py-3">Sessions</th>
                  <th className="px-4 py-3">Pages</th>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">Referrer</th>
                  <th className="px-4 py-3">Conversions</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {data.visitors.map((visitor) => (
                  <tr key={visitor.id} className="text-zinc-300">
                    <td className="px-4 py-3 font-mono text-xs">{formatShortId(visitor.id)}</td>
                    <td className="px-4 py-3">{visitor.firstSeen.toLocaleString()}</td>
                    <td className="px-4 py-3">{visitor.lastSeen.toLocaleString()}</td>
                    <td className="px-4 py-3">{visitor.sessions}</td>
                    <td className="px-4 py-3">{visitor.pages}</td>
                    <td className="px-4 py-3">{visitor.deviceType ?? 'Unknown'}</td>
                    <td className="px-4 py-3">{visitor.referrer ?? 'Direct'}</td>
                    <td className="px-4 py-3">{visitor.conversions}</td>
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/visitors/${visitor.id}`} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/10">
                        <UserRound size={14} /> Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center">
            <p className="text-sm text-zinc-500">No visitor data available for this period.</p>
          </div>
        )}
      </section>
    </main>
  );
}
