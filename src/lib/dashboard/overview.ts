import { prisma } from '@/lib/database/prisma';
import { DEFAULT_SESSION_TIMEOUT_MINUTES } from '@/lib/analytics/server';

export type DashboardRangeKey = 'today' | 'yesterday' | 'last7' | 'last30' | 'last90' | 'custom';

export type DashboardDateRange = {
  label: string;
  from: Date;
  to: Date;
  previousFrom: Date;
  previousTo: Date;
};

type CountComparison = {
  value: number;
  previousValue: number;
  percentChange: number | null;
};

type TrendPoint = {
  date: string;
  visitors: number;
  pageViews: number;
  conversions: number;
  cvDownloads: number;
};

const conversionEventTypes = ['hire_click', 'resume_download', 'contact_submit'] as const;

export function resolveDashboardDateRange(
  range: DashboardRangeKey = 'last7',
  customFrom?: Date,
  customTo?: Date,
  now = new Date(),
): DashboardDateRange {
  const end = new Date(now);
  const start = new Date(now);
  let label = 'Last 7 Days';

  if (range === 'today') {
    label = 'Today';
    start.setHours(0, 0, 0, 0);
  } else if (range === 'yesterday') {
    label = 'Yesterday';
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);
  } else if (range === 'last30') {
    label = 'Last 30 Days';
    start.setDate(start.getDate() - 29);
    start.setHours(0, 0, 0, 0);
  } else if (range === 'last90') {
    label = 'Last 90 Days';
    start.setDate(start.getDate() - 89);
    start.setHours(0, 0, 0, 0);
  } else if (range === 'custom' && customFrom && customTo) {
    label = 'Custom Range';
    start.setTime(customFrom.getTime());
    end.setTime(customTo.getTime());
  } else {
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);
  }

  const duration = Math.max(1, end.getTime() - start.getTime());
  const previousTo = new Date(start.getTime() - 1);
  const previousFrom = new Date(previousTo.getTime() - duration);

  return { label, from: start, to: end, previousFrom, previousTo };
}

function compareCounts(value: number, previousValue: number): CountComparison {
  return {
    value,
    previousValue,
    percentChange: previousValue === 0 ? null : ((value - previousValue) / previousValue) * 100,
  };
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function createTrendBuckets(from: Date, to: Date) {
  const buckets = new Map<string, TrendPoint>();
  const cursor = new Date(from);
  cursor.setHours(0, 0, 0, 0);
  const limit = new Date(to);
  limit.setHours(0, 0, 0, 0);

  while (cursor <= limit) {
    buckets.set(dateKey(cursor), {
      date: dateKey(cursor),
      visitors: 0,
      pageViews: 0,
      conversions: 0,
      cvDownloads: 0,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return buckets;
}

export async function getDashboardOverview(range: DashboardDateRange) {
  const currentWindow = { gte: range.from, lte: range.to };
  const previousWindow = { gte: range.previousFrom, lte: range.previousTo };

  const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });
  const activeCutoff = new Date(Date.now() - (settings?.sessionTimeoutMinutes ?? DEFAULT_SESSION_TIMEOUT_MINUTES) * 60 * 1000);

  const [
    currentUniqueVisitors,
    previousUniqueVisitors,
    currentPageViews,
    previousPageViews,
    currentSessions,
    previousSessions,
    newVisitors,
    currentCvDownloads,
    previousCvDownloads,
    contactMessages,
    previousContactMessages,
    hireClicks,
    previousHireClicks,
    projectViews,
    previousProjectViews,
    activeSessions,
    events,
    topPages,
    topProjects,
    topReferrers,
    deviceBreakdown,
    recentMessages,
    recentNotifications,
    recentActivity,
  ] = await Promise.all([
    prisma.analyticsEvent.groupBy({
      by: ['visitorId'],
      where: { timestamp: currentWindow },
    }),
    prisma.analyticsEvent.groupBy({
      by: ['visitorId'],
      where: { timestamp: previousWindow },
    }),
    prisma.analyticsEvent.count({ where: { eventType: 'page_view', timestamp: currentWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'page_view', timestamp: previousWindow } }),
    prisma.visitorSession.count({ where: { startedAt: currentWindow } }),
    prisma.visitorSession.count({ where: { startedAt: previousWindow } }),
    prisma.visitor.count({ where: { firstSeen: currentWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'resume_download', timestamp: currentWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'resume_download', timestamp: previousWindow } }),
    prisma.contactMessage.count({ where: { createdAt: currentWindow } }),
    prisma.contactMessage.count({ where: { createdAt: previousWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'hire_click', timestamp: currentWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'hire_click', timestamp: previousWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'project_view', timestamp: currentWindow } }),
    prisma.analyticsEvent.count({ where: { eventType: 'project_view', timestamp: previousWindow } }),
    prisma.visitorSession.count({ where: { lastSeenAt: { gte: activeCutoff } } }),
    prisma.analyticsEvent.findMany({
      where: { timestamp: currentWindow },
      select: { eventType: true, timestamp: true },
      orderBy: { timestamp: 'asc' },
    }),
    prisma.analyticsEvent.groupBy({
      by: ['pagePath'],
      where: { eventType: 'page_view', timestamp: currentWindow },
      _count: { pagePath: true },
      orderBy: { _count: { pagePath: 'desc' } },
      take: 8,
    }),
    prisma.analyticsEvent.groupBy({
      by: ['projectId'],
      where: { eventType: 'project_view', timestamp: currentWindow, projectId: { not: null } },
      _count: { projectId: true },
      orderBy: { _count: { projectId: 'desc' } },
      take: 8,
    }),
    prisma.visitorSession.groupBy({
      by: ['referrer'],
      where: { startedAt: currentWindow },
      _count: { referrer: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 8,
    }),
    prisma.visitorSession.groupBy({
      by: ['deviceType'],
      where: { startedAt: currentWindow },
      _count: { deviceType: true },
      orderBy: { _count: { deviceType: 'desc' } },
    }),
    prisma.contactMessage.findMany({
      where: { createdAt: currentWindow },
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, subject: true, status: true, createdAt: true },
    }),
    prisma.notification.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, type: true, title: true, readAt: true, createdAt: true },
    }),
    prisma.activityLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, action: true, entityType: true, entityId: true, createdAt: true },
    }),
  ]);

  const trendBuckets = createTrendBuckets(range.from, range.to);
  const visitorDays = new Set<string>();

  for (const event of events) {
    const key = dateKey(event.timestamp);
    const bucket = trendBuckets.get(key);
    if (!bucket) continue;

    if (event.eventType === 'page_view') bucket.pageViews += 1;
    if (event.eventType === 'resume_download') bucket.cvDownloads += 1;
    if (conversionEventTypes.includes(event.eventType as (typeof conversionEventTypes)[number])) {
      bucket.conversions += 1;
    }
    visitorDays.add(key);
  }

  for (const key of visitorDays) {
    const bucket = trendBuckets.get(key);
    if (bucket) bucket.visitors += 1;
  }

  const uniqueVisitors = currentUniqueVisitors.length;
  const returningVisitors = Math.max(0, uniqueVisitors - newVisitors);
  const conversions = currentCvDownloads + contactMessages + hireClicks;

  return {
    range: {
      label: range.label,
      from: range.from.toISOString(),
      to: range.to.toISOString(),
      previousFrom: range.previousFrom.toISOString(),
      previousTo: range.previousTo.toISOString(),
    },
    kpis: {
      uniqueVisitors: compareCounts(uniqueVisitors, previousUniqueVisitors.length),
      pageViews: compareCounts(currentPageViews, previousPageViews),
      sessions: compareCounts(currentSessions, previousSessions),
      newVisitors: compareCounts(newVisitors, 0),
      returningVisitors: compareCounts(returningVisitors, 0),
      cvDownloads: compareCounts(currentCvDownloads, previousCvDownloads),
      contactMessages: compareCounts(contactMessages, previousContactMessages),
      hireClicks: compareCounts(hireClicks, previousHireClicks),
      projectViews: compareCounts(projectViews, previousProjectViews),
      activeSessions: compareCounts(activeSessions, 0),
      conversionRate: compareCounts(uniqueVisitors === 0 ? 0 : (conversions / uniqueVisitors) * 100, 0),
    },
    trends: Array.from(trendBuckets.values()),
    topPages: topPages.map((item) => ({ pagePath: item.pagePath, views: item._count.pagePath })),
    topProjects: topProjects.map((item) => ({ projectId: item.projectId, views: item._count.projectId })),
    topReferrers: topReferrers.map((item) => ({ referrer: item.referrer ?? 'Direct', sessions: item._count.referrer })),
    deviceBreakdown: deviceBreakdown.map((item) => ({ deviceType: item.deviceType ?? 'Unknown', sessions: item._count.deviceType })),
    recentMessages,
    recentNotifications,
    recentActivity,
  };
}
