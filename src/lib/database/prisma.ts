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

  const fallbackUrl = process.env.DATABASE_URL;

  // If we are in production, we absolutely MUST have a remote URL.
  // We do not rely on process.env.VERCEL alone because Next.js sometimes prunes it.
  if (process.env.NODE_ENV === 'production') {
    // If it's a local build, NEXT_PHASE is phase-production-build, we might allow localhost.
    const isLocalBuild = process.env.NEXT_PHASE === 'phase-production-build' && !process.env.VERCEL;
    
    if (!isLocalBuild) {
      if (fallbackUrl && (fallbackUrl.includes('localhost') || fallbackUrl.includes('127.0.0.1'))) {
         // Return a deliberately invalid URL to force a loud crash instead of silently trying localhost
         console.error("CRITICAL: DATABASE_URL is localhost in production. Overriding to prevent localhost connection.");
         return "postgresql://invalid:invalid@invalid:5432/invalid";
      }
      if (!fallbackUrl && !vercelUrl) {
         console.error("CRITICAL: No production database URL found. Overriding to prevent fallback to cached .env.");
         return "postgresql://invalid:invalid@invalid:5432/invalid";
      }
    }
  }

  return fallbackUrl;
};

const databaseUrl = getDatabaseUrl();

// ALWAYS pass a URL to Prisma in production so it NEVER falls back to a baked-in .env file
const prismaOptions = {
  datasources: {
    db: {
      url: databaseUrl || "postgresql://invalid:invalid@invalid:5432/invalid",
    },
  },
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
