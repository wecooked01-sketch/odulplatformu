// A thin wrapper that guarantees a named export `prisma` in all environments.
// - Uses the real PrismaClient if available
// - Falls back to a permissive mock that mimics PrismaPromise shape
// - Caches the client in dev to avoid multiple instances during HMR

// Base types for Prisma operations
interface PrismaPromise<T> extends Promise<T> {
  [Symbol.toStringTag]: 'PrismaPromise';
}

// Prisma operation result types
interface PrismaCountResult {
  count: number;
}

interface PrismaFindOperation<T> {
  findUnique: (args?: unknown) => PrismaPromise<T | null>;
  findFirst: (args?: unknown) => PrismaPromise<T | null>;
  findMany: (args?: unknown) => PrismaPromise<T[]>;
  count: (args?: unknown) => PrismaPromise<number>;
}

interface PrismaMutationOperation<T> {
  create: (args?: unknown) => PrismaPromise<T>;
  createMany: (args?: unknown) => PrismaPromise<PrismaCountResult>;
  update: (args?: unknown) => PrismaPromise<T>;
  updateMany: (args?: unknown) => PrismaPromise<PrismaCountResult>;
  upsert: (args?: unknown) => PrismaPromise<T>;
  delete: (args?: unknown) => PrismaPromise<T>;
  deleteMany: (args?: unknown) => PrismaPromise<PrismaCountResult>;
}

interface PrismaAggregateOperation<T> {
  aggregate: (args?: unknown) => PrismaPromise<T>;
  groupBy: (args?: unknown) => PrismaPromise<T[]>;
}

// Combined model delegate interface
interface PrismaModelDelegate<T = Record<string, unknown>> 
  extends PrismaFindOperation<T>, PrismaMutationOperation<T>, PrismaAggregateOperation<T> {}

// Model-specific types based on Prisma schema
interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Reward {
  id: string;
  title: string;
  description: string | null;
  costPoints: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface PointTransaction {
  id: string;
  userId: string;
  delta: number;
  reason: string;
  createdAt: Date;
}

interface ContactMessage {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock Prisma client interface
interface MockPrismaClient {
  // Model delegates with specific types
  user: PrismaModelDelegate<User>;
  account: PrismaModelDelegate;
  session: PrismaModelDelegate;
  verificationToken: PrismaModelDelegate;
  pointTransaction: PrismaModelDelegate<PointTransaction>;
  wheelSpin: PrismaModelDelegate;
  lotteryTicket: PrismaModelDelegate;
  reward: PrismaModelDelegate<Reward>;
  contactMessage: PrismaModelDelegate<ContactMessage>;
  telegramVerification: PrismaModelDelegate;
  
  // Client methods
  $disconnect: () => Promise<void>;
  $connect: () => Promise<void>;
  $on: (...args: unknown[]) => MockPrismaClient;
  $use: (...args: unknown[]) => void;
  $extends: (...args: unknown[]) => MockPrismaClient;
  $executeRaw: (...args: unknown[]) => PrismaPromise<number>;
  $executeRawUnsafe: (...args: unknown[]) => PrismaPromise<number>;
  $queryRaw: (...args: unknown[]) => PrismaPromise<unknown[]>;
  $queryRawUnsafe: (...args: unknown[]) => PrismaPromise<unknown[]>;
  $transaction: (...args: unknown[]) => PrismaPromise<unknown>;
}

// Real Prisma client interface (simplified)
interface RealPrismaClient extends MockPrismaClient {
  [key: string]: unknown;
}

const createPrismaPromise = <T>(value?: T): PrismaPromise<T> => {
  const promise = Promise.resolve(value) as PrismaPromise<T>;
  Object.defineProperty(promise, Symbol.toStringTag, {
    value: 'PrismaPromise',
    configurable: true
  });
  return promise;
};

// Model-specific mock data
const createRewardMock = (): Reward => ({
  id: 'mock-reward-id',
  title: 'Mock Reward',
  description: 'Mock reward description',
  costPoints: 100,
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createUserMock = (): User => ({
  id: 'mock-user-id',
  name: 'Mock User',
  email: 'mock@example.com',
  emailVerified: new Date(),
  image: null,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createPointTransactionMock = (): PointTransaction => ({
  id: 'mock-transaction-id',
  userId: 'mock-user-id',
  delta: 10,
  reason: 'Mock transaction',
  createdAt: new Date(),
});

const createContactMessageMock = (): ContactMessage => ({
  id: 'mock-message-id',
  userId: 'mock-user-id',
  name: 'Mock User',
  email: 'mock@example.com',
  message: 'Mock message',
  status: 'NEW',
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Common delegate factory for any model on the mock prisma
const createMockDelegate = <T = Record<string, unknown>>(mockFactory?: () => T): PrismaModelDelegate<T> => ({
  findUnique: () => createPrismaPromise<T | null>(mockFactory ? mockFactory() : null),
  findFirst: () => createPrismaPromise<T | null>(mockFactory ? mockFactory() : null),
  findMany: () => createPrismaPromise<T[]>(mockFactory ? [mockFactory()] : []),
  create: () => createPrismaPromise<T>(mockFactory ? mockFactory() : {} as T),
  createMany: () => createPrismaPromise({ count: 1 }),
  update: () => createPrismaPromise<T>(mockFactory ? mockFactory() : {} as T),
  updateMany: () => createPrismaPromise({ count: 1 }),
  upsert: () => createPrismaPromise<T>(mockFactory ? mockFactory() : {} as T),
  delete: () => createPrismaPromise<T>(mockFactory ? mockFactory() : {} as T),
  deleteMany: () => createPrismaPromise({ count: 1 }),
  aggregate: () => createPrismaPromise({} as T),
  groupBy: () => createPrismaPromise([] as T[]),
  count: () => createPrismaPromise(0),
});

const createMockPrismaClient = (): MockPrismaClient => {
  const client: MockPrismaClient = {
    // Model delegates with specific mock data
    user: createMockDelegate(createUserMock),
    account: createMockDelegate(),
    session: createMockDelegate(),
    verificationToken: createMockDelegate(),
    pointTransaction: createMockDelegate(createPointTransactionMock),
    wheelSpin: createMockDelegate(),
    lotteryTicket: createMockDelegate(),
    reward: createMockDelegate(createRewardMock),
    contactMessage: createMockDelegate(createContactMessageMock),
    telegramVerification: createMockDelegate(),
    
    // Client methods
    $disconnect: () => Promise.resolve(),
    $connect: () => Promise.resolve(),
    $on: function() { return this; },
    $use: () => {},
    $extends: function() { return this; },
    $executeRaw: () => createPrismaPromise(0),
    $executeRawUnsafe: () => createPrismaPromise(0),
    $queryRaw: () => createPrismaPromise([]),
    $queryRawUnsafe: () => createPrismaPromise([]),
    $transaction: () => createPrismaPromise(undefined),
  };
  
  return client;
};

// Global prisma instance type
type PrismaClientType = RealPrismaClient | MockPrismaClient;

let prisma: PrismaClientType;

try {
  // Try to use the real Prisma client if present
  // Using dynamic import to avoid bundling issues
  const PrismaModule = eval('require')('@prisma/client') as { PrismaClient: new () => RealPrismaClient };
  const PrismaClient = PrismaModule.PrismaClient;

  const globalForPrisma = globalThis as { prisma?: PrismaClientType };
  prisma = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
} catch {
  // Fall back to a permissive mock when @prisma/client is not available
  console.warn('Using mock Prisma client. Run `npm run prisma:generate` to use the real client.');
  prisma = createMockPrismaClient();
}

export { prisma };
export type { PrismaClientType, MockPrismaClient, RealPrismaClient };