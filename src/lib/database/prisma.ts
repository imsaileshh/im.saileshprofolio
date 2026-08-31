import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const databaseUrl = 
  process.env.DATABASE_URL || 
  process.env.POSTGRES_PRISMA_URL || 
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_PRISMA_DATABASE_URL || 
  process.env.DATABASE_URL_POSTGRES_URL;

const prismaOptions = databaseUrl ? {
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
} : undefined;

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
