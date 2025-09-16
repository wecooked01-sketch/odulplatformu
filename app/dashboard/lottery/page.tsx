import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ticket, Calendar, DollarSign, Trophy } from 'lucide-react';

export default function LotteryPage() {
  // Mock data
  const tickets = [
    {
      id: '1',
      drawId: 'draw-2024-001',
      numbers: [7, 14, 21, 28, 35, 42],
      createdAt: '2024-01-18T10:00:00Z',
    },
    {
      id: '2',
      drawId: 'draw-2024-001',
      numbers: [3, 12, 19, 27, 31, 44],
      createdAt: '2024-01-17T15:30:00Z',
    },
  ];

  const currentDraw = {
    id: 'draw-2024-001',
    name: 'Weekly Draw #1',
    drawDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ticketPrice: 50,
    jackpot: 10000,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Lottery</h1>
        <p className="text-muted-foreground">
          Buy tickets and win amazing prizes!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Current Draw
            </CardTitle>
            <CardDescription>
              {currentDraw.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Jackpot</span>
                <span className="font-semibold">{currentDraw.jackpot.toLocaleString()} Points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ticket Price</span>
                <span className="font-semibold">{currentDraw.ticketPrice} Points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Draw Date</span>
                <span className="font-semibold">
                  {currentDraw.drawDate.toLocaleDateString()}
                </span>
              </div>
            </div>
            <Button className="w-full" size="lg">
              <Ticket className="h-4 w-4 mr-2" />
              Buy Ticket (50 Points)
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              How to Play
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <h4 className="font-medium">1. Choose Numbers</h4>
              <p className="text-sm text-muted-foreground">
                Select 6 numbers from 1 to 49
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">2. Buy Ticket</h4>
              <p className="text-sm text-muted-foreground">
                Pay 50 points for each ticket
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">3. Wait for Draw</h4>
              <p className="text-sm text-muted-foreground">
                Draws happen every week
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium">4. Win Prizes</h4>
              <p className="text-sm text-muted-foreground">
                Match numbers to win points
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>
            Your lottery tickets for the current draw
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <div className="flex gap-2">
                    {ticket.numbers.map((num, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Draw: {ticket.drawId} • {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            ))}
            {tickets.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No tickets yet. Buy your first ticket to get started!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}