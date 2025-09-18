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
  $on: (...args: any[]) => MockPrismaClient; // chainable!
  $connect: () => Promise<void>;
  $executeRaw: (...args: any[]) => Promise<any>;
  $executeRawUnsafe: (...args: any[]) => Promise<any>;
  $transaction: (...args: any[]) => Promise<any>;
  $use: (...args: any[]) => void;
  $queryRaw: (...args: any[]) => Promise<any>;
  $queryRawUnsafe: (...args: any[]) => Promise<any>;
  $extends: (...args: any[]) => any;
}

const createMockPrismaClient = (): MockPrismaClient => ({
  user: { findUnique: () => Promise.resolve(null), create: () => Promise.resolve({}), upsert: () => Promise.resolve({}) },
  account: { findUnique: () => Promise.resolve(null), create: () => Promise.resolve({}) },
  session: { findUnique: () => Promise.resolve(null), create: () => Promise.resolve({}) },
  verificationToken: { findUnique: () => Promise.resolve(null), create: () => Promise.resolve({}) },
  pointTransaction: { findMany: () => Promise.resolve([]), create: () => Promise.resolve({}) },
  wheelSpin: { findMany: () => Promise.resolve([]), create: () => Promise.resolve({}) },
  lotteryTicket: { findMany: () => Promise.resolve([]), create: () => Promise.resolve({}) },
  reward: { findMany: () => Promise.resolve([]), findUnique: () => Promise.resolve(null), create: () => Promise.resolve({}), upsert: () => Promise.resolve({}) },
  contactMessage: { findMany: () => Promise.resolve([]), create: () => Promise.resolve({}) },
  telegramVerification: { findMany: () => Promise.resolve([]), create: () => Promise.resolve({}) },
  $disconnect: () => Promise.resolve(),
  $on: function() { return this; }, // chainable, kendisini döner!
  $connect: () => Promise.resolve(),
  $executeRaw: () => Promise.resolve(),
  $executeRawUnsafe: () => Promise.resolve(),
  $transaction: () => Promise.resolve(),
  $use: () => {},
  $queryRaw: () => Promise.resolve(),
  $queryRawUnsafe: () => Promise.resolve(),
  $extends: () => ({}),
});
