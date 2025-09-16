import { auth } from "@/lib/auth/config";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const WHEEL_PRIZES = [
  '10 Points',
  '25 Points',
  '50 Points',
  '100 Points',
  'Free Spin',
  'Better Luck Next Time',
];

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const recentSpins = await prisma.wheelSpin.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({
      recentSpins,
      availablePrizes: WHEEL_PRIZES,
    });
  } catch (error) {
    console.error('Wheel API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // TODO: Check if user has spins available
    // For now, allow unlimited spins for demo

    // Randomly select a prize
    const randomIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const result = WHEEL_PRIZES[randomIndex];

    // Create wheel spin record
    const wheelSpin = await prisma.wheelSpin.create({
      data: {
        userId: user.id,
        result,
      },
    });

    // Award points if applicable
    if (result.includes('Points')) {
      const points = parseInt(result.split(' ')[0]);
      await prisma.pointTransaction.create({
        data: {
          userId: user.id,
          delta: points,
          reason: `Wheel spin reward: ${result}`,
        },
      });
    }

    return NextResponse.json({
      result,
      wheelSpin,
    }, { status: 201 });
  } catch (error) {
    console.error('Wheel API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}