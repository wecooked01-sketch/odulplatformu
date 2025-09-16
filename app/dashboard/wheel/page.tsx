import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, RotateCcw, Star, Clock } from 'lucide-react';

export default function WheelPage() {
  // Mock data - in a real app, this would come from the API
  const recentSpins = [
    {
      id: '1',
      result: 'Free Spin',
      createdAt: '2024-01-18T11:30:00Z',
    },
    {
      id: '2',
      result: '50 Points',
      createdAt: '2024-01-17T15:20:00Z',
    },
    {
      id: '3',
      result: 'Better Luck Next Time',
      createdAt: '2024-01-16T09:45:00Z',
    },
  ];

  const prizes = [
    '10 Points',
    '25 Points',
    '50 Points',
    '100 Points',
    'Free Spin',
    'Better Luck Next Time',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wheel of Fortune</h1>
        <p className="text-muted-foreground">
          Spin the wheel for a chance to win points and prizes!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="h-5 w-5" />
              Spin the Wheel
            </CardTitle>
            <CardDescription>
              Test your luck and win amazing prizes!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-8 border-accent bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <RotateCcw className="h-12 w-12 mx-auto mb-2 text-accent" />
                    <p className="text-sm font-medium">Ready to Spin!</p>
                  </div>
                </div>
                {/* Wheel pointer */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-accent"></div>
              </div>
            </div>
            <Button className="w-full" size="lg">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Spin Now!
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              You have 3 free spins remaining today
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Available Prizes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {prizes.map((prize, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="justify-center py-2"
                  >
                    {prize}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Spins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSpins.map((spin) => (
                  <div
                    key={spin.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">{spin.result}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(spin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        spin.result.includes('Points') || spin.result === 'Free Spin'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {spin.result.includes('Points') || spin.result === 'Free Spin'
                        ? 'Win'
                        : 'Try Again'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-medium">Click Spin</h3>
              <p className="text-sm text-muted-foreground">
                Click the spin button to start the wheel
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-medium">Watch & Wait</h3>
              <p className="text-sm text-muted-foreground">
                The wheel spins and lands on a prize
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-medium">Claim Prize</h3>
              <p className="text-sm text-muted-foreground">
                Your prize is automatically added to your account
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}