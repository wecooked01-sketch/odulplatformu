import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Coins, 
  Gamepad2, 
  Ticket, 
  Gift, 
  MessageSquare, 
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wheel Spins</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lottery Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Claimed</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +7 since last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Start earning points and having fun!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/wheel">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Gamepad2 className="h-6 w-6" />
                <span>Spin Wheel</span>
              </Button>
            </Link>
            <Link href="/dashboard/lottery">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Ticket className="h-6 w-6" />
                <span>Buy Lottery</span>
              </Button>
            </Link>
            <Link href="/dashboard/rewards">
              <Button variant="outline" className="w-full h-20 flex-col gap-2">
                <Gift className="h-6 w-6" />
                <span>View Rewards</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Coins className="h-4 w-4 text-accent" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Earned 50 points
                </p>
                <p className="text-sm text-muted-foreground">
                  Wheel spin reward
                </p>
              </div>
              <div className="ml-auto font-medium">+50</div>
            </div>
            <div className="flex items-center gap-4">
              <Ticket className="h-4 w-4 text-accent" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Bought lottery ticket
                </p>
                <p className="text-sm text-muted-foreground">
                  Draw #2024-001
                </p>
              </div>
              <div className="ml-auto font-medium">-50</div>
            </div>
            <div className="flex items-center gap-4">
              <Gift className="h-4 w-4 text-accent" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Redeemed reward
                </p>
                <p className="text-sm text-muted-foreground">
                  Premium Badge
                </p>
              </div>
              <div className="ml-auto font-medium">-100</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}