// lib/__mocks__/prisma.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';

const prisma = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prisma);
});

export { prisma };
