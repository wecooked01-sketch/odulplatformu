import { auth } from "@/lib/auth/config";
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const tickets = await prisma.lotteryTicket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const currentDraw = {
      id: 'draw-2024-001',
      name: 'Weekly Draw #1',
      drawDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      ticketPrice: 50, // points
      maxNumbers: 6,
      numberRange: [1, 49],
    };

    return NextResponse.json({
      tickets,
      currentDraw,
    });
  } catch (error) {
    console.error('Lottery API error:', error);
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

    const { drawId, numbers } = await request.json();

    if (!drawId || !numbers || !Array.isArray(numbers)) {
      return NextResponse.json(
        { error: 'Draw ID and numbers array are required' },
        { status: 400 }
      );
    }

    if (numbers.length !== 6) {
      return NextResponse.json(
        { error: 'Exactly 6 numbers are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // TODO: Check if user has enough points to buy ticket
    // For now, just create the ticket

    const ticket = await prisma.lotteryTicket.create({
      data: {
        userId: user.id,
        drawId,
        numbers: JSON.stringify(numbers),
      },
    });

    // Deduct points for ticket
    await prisma.pointTransaction.create({
      data: {
        userId: user.id,
        delta: -50, // Ticket cost
        reason: `Lottery ticket purchase for draw ${drawId}`,
      },
    });

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Lottery API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}