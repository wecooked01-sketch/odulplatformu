// A thin wrapper that guarantees a named export `prisma` in all environments.
// - Uses the real PrismaClient if available
// - Falls back to a permissive mock that mimics PrismaPromise shape
// - Caches the client in dev to avoid multiple instances during HMR

interface PrismaPromise<T = any> extends Promise<T> {
  [Symbol.toStringTag]: 'PrismaPromise';
}

const prismaPromise = <T = any>(value?: T): PrismaPromise<T> => {
  const p = Promise.resolve(value) as PrismaPromise<T>;
  (p as any)[Symbol.toStringTag] = 'PrismaPromise';
  return p;
};

// Common delegate factory for any model on the mock prisma
const createMockDelegate = () => ({
  findUnique: (..._args: any[]) => prismaPromise(null),
  findFirst: (..._args: any[]) => prismaPromise(null),
  findMany: (..._args: any[]) => prismaPromise([]),
  create: (..._args: any[]) => prismaPromise({}),
  createMany: (..._args: any[]) => prismaPromise({ count: 0 }),
  update: (..._args: any[]) => prismaPromise({}),
  updateMany: (..._args: any[]) => prismaPromise({ count: 0 }),
  upsert: (..._args: any[]) => prismaPromise({}),
  delete: (..._args: any[]) => prismaPromise({}),
  deleteMany: (..._args: any[]) => prismaPromise({ count: 0 }),
  aggregate: (..._args: any[]) => prismaPromise({}),
  groupBy: (..._args: any[]) => prismaPromise([]),
  count: (..._args: any[]) => prismaPromise(0),
});

const createMockPrismaClient = () => {
  const base = {
    $disconnect: () => Promise.resolve(),
    $connect: () => Promise.resolve(),
    $on: function () { return this; },
    $use: () => {},
    $extends: () => ({}),
    $executeRaw: (..._args: any[]) => prismaPromise(),
    $executeRawUnsafe: (..._args: any[]) => prismaPromise(),
    $queryRaw: (..._args: any[]) => prismaPromise([]),
    $queryRawUnsafe: (..._args: any[]) => prismaPromise([]),
    $transaction: (..._args: any[]) => prismaPromise([]),
  } as any;

  // Use a Proxy so any property access (e.g., prisma.user) returns a delegate
  return new Proxy(base, {
    get(target, prop) {
      if (prop in target) return (target as any)[prop];
      // Return a fresh delegate for unknown model names
      return createMockDelegate();
    },
  });
};

let prisma: any;

try {
  // Try to use the real Prisma client if present
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const PrismaModule = require('@prisma/client');
  const PrismaClient = PrismaModule.PrismaClient;

  const globalForPrisma = globalThis as unknown as { prisma?: any };
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
} catch {
  // Fall back to a permissive mock when @prisma/client is not available
  prisma = createMockPrismaClient();
}

export { prisma };