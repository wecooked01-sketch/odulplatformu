import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, Coins, ShoppingCart } from 'lucide-react';

export default function RewardsPage() {
  // Mock data
  const rewards = [
    {
      id: 'reward-1',
      title: 'Premium Badge',
      description: 'Get a premium badge for your profile',
      costPoints: 100,
      active: true,
    },
    {
      id: 'reward-2',
      title: 'Discord Access',
      description: 'Get access to exclusive Discord channels',
      costPoints: 250,
      active: true,
    },
    {
      id: 'reward-3',
      title: 'Gift Card $10',
      description: 'Receive a $10 gift card',
      costPoints: 1000,
      active: true,
    },
    {
      id: 'reward-4',
      title: 'Limited Edition NFT',
      description: 'Exclusive NFT for platform members',
      costPoints: 5000,
      active: false,
    },
  ];

  const userPoints = 1250; // Mock user points

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards</h1>
          <p className="text-muted-foreground">
            Redeem your points for amazing rewards
          </p>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Your Points</p>
              <p className="text-xl font-bold">{userPoints.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <Card key={reward.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Gift className="h-8 w-8 text-accent" />
                {!reward.active && (
                  <Badge variant="secondary">Unavailable</Badge>
                )}
              </div>
              <CardTitle className="text-lg">{reward.title}</CardTitle>
              <CardDescription>{reward.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cost</span>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-accent" />
                    <span className="font-semibold">{reward.costPoints.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  disabled={!reward.active || userPoints < reward.costPoints}
                  variant={userPoints >= reward.costPoints && reward.active ? "default" : "outline"}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {!reward.active 
                    ? 'Unavailable' 
                    : userPoints < reward.costPoints 
                      ? `Need ${(reward.costPoints - userPoints).toLocaleString()} more points`
                      : 'Redeem'
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Reward Categories
          </CardTitle>
          <CardDescription>
            Explore different types of rewards available
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Gift className="h-8 w-8 mx-auto text-accent" />
              <h3 className="font-medium">Digital Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Badges, access tokens, and digital items
              </p>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <ShoppingCart className="h-8 w-8 mx-auto text-accent" />
              <h3 className="font-medium">Gift Cards</h3>
              <p className="text-sm text-muted-foreground">
                Amazon, Steam, and other popular gift cards
              </p>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Star className="h-8 w-8 mx-auto text-accent" />
              <h3 className="font-medium">Exclusive Access</h3>
              <p className="text-sm text-muted-foreground">
                Special events, Discord channels, and more
              </p>
            </div>
            <div className="text-center space-y-2 p-4 border rounded-lg">
              <Coins className="h-8 w-8 mx-auto text-accent" />
              <h3 className="font-medium">Point Multipliers</h3>
              <p className="text-sm text-muted-foreground">
                Boost your earning potential
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}