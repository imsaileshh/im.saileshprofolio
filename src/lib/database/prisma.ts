import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const getDatabaseUrl = () => {
  // Prioritize Vercel-provided Postgres variables
  const vercelUrl = 
    process.env.POSTGRES_PRISMA_URL || 
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL_PRISMA_DATABASE_URL || 
    process.env.DATABASE_URL_POSTGRES_URL;

  // If we have a Vercel URL and it's not localhost, use it
  if (vercelUrl && !vercelUrl.includes('localhost') && !vercelUrl.includes('127.0.0.1')) {
    return vercelUrl;
  }

  // Fallback to standard DATABASE_URL
  const fallbackUrl = process.env.DATABASE_URL;

  // Safety check: Never use localhost in Vercel production environments
  if (process.env.VERCEL) {
    if (fallbackUrl && (fallbackUrl.includes('localhost') || fallbackUrl.includes('127.0.0.1'))) {
      throw new Error("CRITICAL: Attempted to use a localhost DATABASE_URL in Vercel. Please check your Vercel Environment Variables and ensure POSTGRES_PRISMA_URL or a valid production DATABASE_URL is set.");
    }
    if (!fallbackUrl) {
      throw new Error("CRITICAL: No valid production database URL found. Please configure Vercel Postgres or set a valid DATABASE_URL environment variable.");
    }
  }

  return fallbackUrl;
};

const databaseUrl = getDatabaseUrl();

const prismaOptions = databaseUrl ? {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
} : undefined;

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
