import {
  Activity,
  Bell,
  Eye,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  FolderGit2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { getDashboardOverview, resolveDashboardDateRange } from '@/lib/dashboard/overview';
import { prisma } from '@/lib/database/prisma';
import { getProjectStatus } from '@/lib/dashboard/projects';

export const dynamic = 'force-dynamic';

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value);
}

function formatPercent(value: number) {
  return `${formatNumber(value)}%`;
}

export default async function DashboardOverviewPage() {
  const overview = await getDashboardOverview(resolveDashboardDateRange('last7'));
  
  // Fetch recent projects and unread messages for the action-oriented view
  const recentProjects = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 4,
    select: { id: true, title: true, published: true, archived: true, updatedAt: true }
  });

  const unreadMessages = await prisma.contactMessage.findMany({
    where: { isRead: false },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const hasTrendData = overview.trends.some(
    (point) => point.visitors || point.pageViews || point.conversions || point.cvDownloads,
  );
  const maxTrendValue = Math.max(
    1,
    ...overview.trends.map((point) => point.pageViews + point.conversions + point.cvDownloads),
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Welcome back. Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link href="/dashboard/projects/new" className="px-4 py-2 bg-[#4F8CFF] text-white text-sm font-semibold rounded-lg hover:bg-[#3B78EB] transition-colors flex items-center gap-2">
            <FolderGit2 size={16} /> New Project
          </Link>
        </div>
      </div>

      {/* Needs Attention / Alerts */}
      {unreadMessages.length > 0 && (
        <div className="bg-[#4F8CFF]/10 border border-[#4F8CFF]/20 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-[#4F8CFF]/20 rounded-lg text-[#4F8CFF] shrink-0 mt-1 sm:mt-0">
              <MessageSquare size={20} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">You have {unreadMessages.length} unread messages</h3>
              <p className="text-sm text-[#4F8CFF]/80 mt-1">Respond to potential clients and recruiters to keep your pipeline active.</p>
            </div>
          </div>
          <Link href="/dashboard/messages" className="px-4 py-2 bg-[#4F8CFF]/20 text-[#4F8CFF] text-sm font-semibold rounded-lg hover:bg-[#4F8CFF]/30 transition-colors whitespace-nowrap">
            View Messages
          </Link>
        </div>
      )}

      {/* Core KPIs - Simplified from 11 down to 4 critical metrics */}
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Unique Visitors', value: formatNumber(overview.kpis.uniqueVisitors.value), icon: Users, change: overview.kpis.uniqueVisitors.percentChange },
          { name: 'Page Views', value: formatNumber(overview.kpis.pageViews.value), icon: Eye, change: overview.kpis.pageViews.percentChange },
          { name: 'Conversion Rate', value: formatPercent(overview.kpis.conversionRate.value), icon: TrendingUp, change: overview.kpis.conversionRate.percentChange },
          { name: 'Active Sessions', value: formatNumber(overview.kpis.activeSessions.value), icon: Activity, change: overview.kpis.activeSessions.percentChange },
        ].map((item) => (
          <div key={item.name} className="bg-[#0e0e10] border border-white/5 rounded-xl p-5 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/5 rounded-lg text-zinc-400">
                <item.icon size={18} />
              </div>
              {item.change !== null && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${item.change > 0 ? 'bg-green-500/10 text-green-400' : item.change < 0 ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-zinc-400'}`}>
                  {item.change > 0 ? '+' : ''}{formatPercent(item.change)}
                </span>
              )}
            </div>
            <div className="mt-auto">
              <p className="text-sm font-medium text-zinc-400 mb-1">{item.name}</p>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </div>
          </div>
        ))}
      </dl>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-[#0e0e10] border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white">Traffic Overview</h2>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Last 7 Days</span>
          </div>
          {hasTrendData ? (
            <div className="flex-1 flex items-end gap-2 min-h-[200px]">
              {overview.trends.map((point) => {
                const total = point.pageViews + point.conversions + point.cvDownloads;
                const height = Math.max(4, Math.round((total / maxTrendValue) * 100));
                return (
                  <div key={point.date} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full h-40 bg-white/5 rounded-md relative flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#4F8CFF] transition-all duration-300 group-hover:bg-[#3B78EB]"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">{point.date.slice(5)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-lg">
              <p className="text-sm text-zinc-500">No analytics data available yet.</p>
            </div>
          )}
        </div>

        {/* Recent Projects Sidebar */}
        <div className="bg-[#0e0e10] border border-white/5 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-white">Recent Projects</h2>
            <Link href="/dashboard/projects" className="text-xs font-semibold text-[#4F8CFF] hover:underline">View All</Link>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {recentProjects.length > 0 ? recentProjects.map(project => {
              const status = getProjectStatus({ published: project.published, archived: project.archived });
              return (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="group flex flex-col p-4 rounded-lg bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-semibold text-white group-hover:text-[#4F8CFF] transition-colors">{project.title}</span>
                  <ArrowRight size={14} className="text-zinc-600 group-hover:text-[#4F8CFF] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className={`inline-block w-2 h-2 rounded-full ${status === 'Published' ? 'bg-green-500' : status === 'Draft' ? 'bg-amber-500' : 'bg-zinc-500'}`}></span>
                  <span className="text-xs text-zinc-500">{status}</span>
                  <span className="text-xs text-zinc-600 ml-auto">{new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
              </Link>
            )}) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-white/5 rounded-lg">
                <FolderGit2 size={24} className="text-zinc-600 mb-3" />
                <p className="text-sm text-zinc-400 font-medium">No projects yet</p>
                <Link href="/dashboard/projects/new" className="text-xs text-[#4F8CFF] hover:underline mt-1">Create your first project</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
