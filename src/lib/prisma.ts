import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function connectionString() {
  return (
    process.env.POSTGRES_PRISMA_URL ??
    process.env.DATABASE_URL ??
    (() => {
      throw new Error("No database connection string found (POSTGRES_PRISMA_URL or DATABASE_URL).");
    })()
  );
}

function createClient() {
  const adapter = new PrismaPg({ connectionString: connectionString() });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
