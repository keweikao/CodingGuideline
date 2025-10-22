// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // log: ['query'], // Uncomment to see Prisma queries in the console
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
