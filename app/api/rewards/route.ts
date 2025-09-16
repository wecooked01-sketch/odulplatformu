import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const rewards = await prisma.reward.findMany({
      where: { active: true },
      orderBy: { costPoints: 'asc' },
    });

    return NextResponse.json({ rewards });
  } catch (error) {
    console.error('Rewards API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rewardId } = await request.json();

    if (!rewardId) {
      return NextResponse.json(
        { error: 'Reward ID is required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward || !reward.active) {
      return NextResponse.json(
        { error: 'Reward not found or inactive' },
        { status: 404 }
      );
    }

    // Calculate user's current points
    const transactions = await prisma.pointTransaction.findMany({
      where: { userId: user.id },
    });
    const totalPoints = transactions.reduce((sum, tx) => sum + tx.delta, 0);

    if (totalPoints < reward.costPoints) {
      return NextResponse.json(
        { error: 'Insufficient points' },
        { status: 400 }
      );
    }

    // Deduct points for reward
    const transaction = await prisma.pointTransaction.create({
      data: {
        userId: user.id,
        delta: -reward.costPoints,
        reason: `Redeemed reward: ${reward.title}`,
      },
    });

    // TODO: In a real app, you'd trigger the reward fulfillment here
    // For now, just return success

    return NextResponse.json({
      message: 'Reward redeemed successfully',
      reward,
      transaction,
    }, { status: 201 });
  } catch (error) {
    console.error('Rewards API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}