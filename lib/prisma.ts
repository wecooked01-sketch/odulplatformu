interface PrismaPromise<T = any> extends Promise<T> {
  [Symbol.toStringTag]: 'PrismaPromise';
}

const prismaPromise = <T = any>(value?: T): PrismaPromise<T> => {
  const promise = Promise.resolve(value) as PrismaPromise<T>;
  (promise as any)[Symbol.toStringTag] = 'PrismaPromise';
  return promise;
};

interface MockPrismaClient {
  [key: string]: any;
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
  $on: (...args: any[]) => MockPrismaClient;
  $connect: () => Promise<void>;
  $executeRaw: (...args: any[]) => PrismaPromise;
  $executeRawUnsafe: (...args: any[]) => PrismaPromise;
  $transaction: (...args: any[]) => PrismaPromise;
  $use: (...args: any[]) => void;
  $queryRaw: (...args: any[]) => PrismaPromise;
  $queryRawUnsafe: (...args: any[]) => PrismaPromise;
  $extends: (...args: any[]) => { extArgs: any };
}

const createMockPrismaClient = (): MockPrismaClient => ({
  user: { findUnique: () => prismaPromise(null), create: () => prismaPromise({}), upsert: () => prismaPromise({}) },
  account: { findUnique: () => prismaPromise(null), create: () => prismaPromise({}) },
  session: { findUnique: () => prismaPromise(null), create: () => prismaPromise({}) },
  verificationToken: { findUnique: () => prismaPromise(null), create: () => prismaPromise({}) },
  pointTransaction: { findMany: () => prismaPromise([]), create: () => prismaPromise({}) },
  wheelSpin: { findMany: () => prismaPromise([]), create: () => prismaPromise({}) },
  lotteryTicket: { findMany: () => prismaPromise([]), create: () => prismaPromise({}) },
  reward: { findMany: () => prismaPromise([]), findUnique: () => prismaPromise(null), create: () => prismaPromise({}), upsert: () => prismaPromise({}) },
  contactMessage: { findMany: () => prismaPromise([]), create: () => prismaPromise({}) },
  telegramVerification: { findMany: () => prismaPromise([]), create: () => prismaPromise({}) },
  $disconnect: () => Promise.resolve(),
  $on: function() { return this; },
  $connect: () => Promise.resolve(),
  $executeRaw: () => prismaPromise(),
  $executeRawUnsafe: () => prismaPromise(),
  $transaction: () => prismaPromise(),
  $use: () => {},
  $queryRaw: () => prismaPromise(),
  $queryRawUnsafe: () => prismaPromise(),
  $extends: () => ({ extArgs: {} }),
});

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
