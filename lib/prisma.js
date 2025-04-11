import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient({
  log: ['error'],
  errorFormat: 'pretty',
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

db.$on('error', (e) => {
  console.error('Prisma Error:', e);
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await db.$disconnect();
});
