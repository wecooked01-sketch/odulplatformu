// Mock seed script when Prisma client isn't available
let prisma: any;

try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (error) {
  console.warn('Prisma client not available. Skipping seed.');
  process.exit(0);
}

async function main() {
  console.log('🌱 Starting database seed...');

  // Create some demo rewards
  const rewards = await Promise.all([
    prisma.reward.upsert({
      where: { id: 'reward-1' },
      update: {},
      create: {
        id: 'reward-1',
        title: 'Premium Badge',
        description: 'Get a premium badge for your profile',
        costPoints: 100,
        active: true,
      },
    }),
    prisma.reward.upsert({
      where: { id: 'reward-2' },
      update: {},
      create: {
        id: 'reward-2',
        title: 'Discord Access',
        description: 'Get access to exclusive Discord channels',
        costPoints: 250,
        active: true,
      },
    }),
    prisma.reward.upsert({
      where: { id: 'reward-3' },
      update: {},
      create: {
        id: 'reward-3',
        title: 'Gift Card $10',
        description: 'Receive a $10 gift card',
        costPoints: 1000,
        active: true,
      },
    }),
    prisma.reward.upsert({
      where: { id: 'reward-4' },
      update: {},
      create: {
        id: 'reward-4',
        title: 'Limited Edition NFT',
        description: 'Exclusive NFT for platform members',
        costPoints: 5000,
        active: false, // Temporarily disabled
      },
    }),
  ]);

  console.log(`✅ Created ${rewards.length} rewards`);

  // Create admin user for development (will use magic link)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      emailVerified: new Date(),
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email}`);

  // Add some demo point transactions for the admin user
  const pointTransactions = await Promise.all([
    prisma.pointTransaction.create({
      data: {
        userId: adminUser.id,
        delta: 1000,
        reason: 'Welcome bonus',
      },
    }),
    prisma.pointTransaction.create({
      data: {
        userId: adminUser.id,
        delta: 50,
        reason: 'Daily login bonus',
      },
    }),
    prisma.pointTransaction.create({
      data: {
        userId: adminUser.id,
        delta: 200,
        reason: 'Completed survey',
      },
    }),
  ]);

  console.log(`✅ Created ${pointTransactions.length} point transactions`);

  // Add a demo wheel spin
  await prisma.wheelSpin.create({
    data: {
      userId: adminUser.id,
      result: 'Free Spin',
    },
  });

  // Add a demo lottery ticket
  await prisma.lotteryTicket.create({
    data: {
      userId: adminUser.id,
      drawId: 'draw-2024-001',
      numbers: JSON.stringify([7, 14, 21, 28, 35, 42]),
    },
  });

  // Add a demo contact message
  await prisma.contactMessage.create({
    data: {
      userId: adminUser.id,
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I have a question about the platform.',
      status: 'NEW',
    },
  });

  console.log('✅ Created demo data');
  console.log('🎉 Database seed completed successfully!');
  console.log('\n📧 You can login with magic link using: admin@example.com');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });