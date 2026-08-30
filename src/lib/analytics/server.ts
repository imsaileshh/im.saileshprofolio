import crypto from 'crypto';
import type { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma';
import type { analyticsEventSchema } from '@/lib/validation/schemas';
import type { z } from 'zod';

export const VISITOR_COOKIE = 'sp_visitor_id';
export const SESSION_COOKIE = 'sp_session_id';
export const DEFAULT_SESSION_TIMEOUT_MINUTES = 5;

type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

type ClientHints = {
  userAgent: string | null;
  referrer: string | null;
};

type AnalyticsCookieIds = {
  visitorKey: string;
  sessionKey: string;
  isNewVisitorCookie: boolean;
  isNewSessionCookie: boolean;
};

export function getAnalyticsCookieIds(request: NextRequest, input: Partial<AnalyticsEventInput>): AnalyticsCookieIds {
  const visitorCookie = request.cookies.get(VISITOR_COOKIE)?.value;
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  const visitorKey = input.visitorKey ?? visitorCookie ?? crypto.randomUUID();
  const sessionKey = input.sessionKey ?? sessionCookie ?? crypto.randomUUID();

  return {
    visitorKey,
    sessionKey,
    isNewVisitorCookie: !visitorCookie,
    isNewSessionCookie: !sessionCookie,
  };
}

export function attachAnalyticsCookies(response: NextResponse, ids: AnalyticsCookieIds) {
  const baseCookie = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };

  if (ids.isNewVisitorCookie) {
    response.cookies.set(VISITOR_COOKIE, ids.visitorKey, {
      ...baseCookie,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  if (ids.isNewSessionCookie) {
    response.cookies.set(SESSION_COOKIE, ids.sessionKey, {
      ...baseCookie,
      maxAge: 60 * 30,
    });
  }
}

export function hashAnalyticsKey(value: string) {
  const salt = process.env.ANALYTICS_SALT ?? 'portfolio-analytics';
  return crypto.createHash('sha256').update(`${salt}:${value}`).digest('hex');
}

export function getClientHints(request: NextRequest): ClientHints {
  return {
    userAgent: request.headers.get('user-agent'),
    referrer: request.headers.get('referer') ?? request.headers.get('referrer'),
  };
}

export function parseUserAgent(userAgent: string | null) {
  const value = userAgent ?? '';
  const lower = value.toLowerCase();

  const deviceType = /ipad|tablet/.test(lower)
    ? 'Tablet'
    : /android|iphone|mobile/.test(lower)
      ? 'Mobile'
      : 'Desktop';

  const browser = lower.includes('edg/')
    ? 'Edge'
    : lower.includes('chrome/')
      ? 'Chrome'
      : lower.includes('safari/')
        ? 'Safari'
        : lower.includes('firefox/')
          ? 'Firefox'
          : 'Other';

  const os = lower.includes('windows')
    ? 'Windows'
    : lower.includes('mac os')
      ? 'macOS'
      : lower.includes('android')
        ? 'Android'
        : lower.includes('iphone') || lower.includes('ipad')
          ? 'iOS'
          : lower.includes('linux')
            ? 'Linux'
            : 'Other';

  return { deviceType, browser, os };
}

export function normalizeReferrer(referrer: string | null) {
  if (!referrer) return 'Direct';

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, '').toLowerCase();
    if (host.includes('google.')) return 'Google';
    if (host === 'github.com') return 'GitHub';
    if (host === 'linkedin.com') return 'LinkedIn';
    return host;
  } catch {
    return 'Other';
  }
}

export async function recordAnalyticsEvent(request: NextRequest, input: AnalyticsEventInput) {
  const ids = getAnalyticsCookieIds(request, input);
  const hints = getClientHints(request);
  const visitorHash = hashAnalyticsKey(ids.visitorKey);
  const sessionHash = hashAnalyticsKey(ids.sessionKey);
  const parsedAgent = parseUserAgent(hints.userAgent);
  const metadataReferrer = typeof input.metadata.referrer === 'string' ? input.metadata.referrer : null;
  const referrer = normalizeReferrer(metadataReferrer ?? hints.referrer);
  const now = new Date();

  const visitor = await prisma.visitor.upsert({
    where: { visitorHash },
    update: {
      lastSeen: now,
      deviceType: parsedAgent.deviceType,
      browser: parsedAgent.browser,
      os: parsedAgent.os,
      referrer,
      source: referrer,
    },
    create: {
      visitorHash,
      firstSeen: now,
      lastSeen: now,
      deviceType: parsedAgent.deviceType,
      browser: parsedAgent.browser,
      os: parsedAgent.os,
      referrer,
      source: referrer,
    },
  });

  const visitorSession = await prisma.visitorSession.upsert({
    where: { sessionHash },
    update: {
      lastSeenAt: now,
      exitPage: input.pagePath,
      referrer,
      userAgent: hints.userAgent,
      deviceType: parsedAgent.deviceType,
      browser: parsedAgent.browser,
      os: parsedAgent.os,
    },
    create: {
      visitorId: visitor.id,
      sessionHash,
      startedAt: now,
      lastSeenAt: now,
      entryPage: input.pagePath,
      exitPage: input.pagePath,
      referrer,
      userAgent: hints.userAgent,
      deviceType: parsedAgent.deviceType,
      browser: parsedAgent.browser,
      os: parsedAgent.os,
    },
  });

  const event = await prisma.analyticsEvent.create({
    data: {
      visitorId: visitor.id,
      sessionId: visitorSession.id,
      eventType: input.eventType,
      pagePath: input.pagePath,
      metadata: input.metadata,
      projectId: input.metadata.projectId,
    },
  });

  return { event, ids };
}
