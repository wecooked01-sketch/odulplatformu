// Mock Prisma client for development when the real client can't be generated
interface MockPrismaClient {
  user: any;
  account: any;
  session: any;
  verificationToken: any;
  pointTransaction: any;
  wheelSpin: any;
  lotteryTicket: any;
  reward: any;
  contactMessage: any;
  telegramVerification: any;
  $disconnect: () => Promise<void>;
  [key: string]: any;
}

const createMockPrismaClient = (): MockPrismaClient => ({
  user: {
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    upsert: () => Promise.resolve({}),
  },
  account: {
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
  },
  session: {
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
  },
  verificationToken: {
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
  },
  pointTransaction: {
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
  },
  wheelSpin: {
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
  },
  lotteryTicket: {
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
  },
  reward: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve({}),
    upsert: () => Promise.resolve({}),
  },
  contactMessage: {
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
  },
  telegramVerification: {
    findMany: () => Promise.resolve([]),
    create: () => Promise.resolve({}),
  },
  $disconnect: () => Promise.resolve(),
});

// Try to import the real PrismaClient, fall back to mock if it fails
let PrismaClient: any;
let prisma: MockPrismaClient;

try {
  const PrismaModule = require('@prisma/client');
  PrismaClient = PrismaModule.PrismaClient;
  
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined;
  };

  prisma = globalForPrisma.prisma ?? new PrismaClient();

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} catch (error) {
  console.warn('Using mock Prisma client. Run `pnpm prisma generate` to use the real client.');
  prisma = createMockPrismaClient();
}

export { prisma };