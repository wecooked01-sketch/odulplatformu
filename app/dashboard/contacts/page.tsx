import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Mail, Clock } from 'lucide-react';

export default function ContactsPage() {
  // Mock data
  const messages = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I have a question about the platform.',
      status: 'NEW' as const,
      createdAt: '2024-01-18T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      message: 'How do I redeem my points for rewards?',
      status: 'READ' as const,
      createdAt: '2024-01-17T14:30:00Z',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      message: 'The wheel spin feature is not working properly.',
      status: 'ARCHIVED' as const,
      createdAt: '2024-01-16T09:15:00Z',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'READ':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground">
          Send us a message or view contact history
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Message
            </CardTitle>
            <CardDescription>
              Have a question or feedback? We'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="your.email@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type your message here..."
                rows={4}
              />
            </div>
            <Button className="w-full">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Support Email</h4>
                <p className="text-sm text-muted-foreground">support@odulplatform.com</p>
              </div>
              <div>
                <h4 className="font-medium">Business Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM (UTC)
                </p>
              </div>
              <div>
                <h4 className="font-medium">Response Time</h4>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Frequently Asked Questions</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• How do I earn points?</li>
                <li>• How do I redeem rewards?</li>
                <li>• How does the lottery work?</li>
                <li>• How do I verify my Telegram?</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message History
          </CardTitle>
          <CardDescription>
            Your previous messages and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{message.name}</h4>
                    <span className="text-sm text-muted-foreground">({message.email})</span>
                    <Badge
                      className={getStatusColor(message.status)}
                    >
                      {message.status}
                    </Badge>
                  </div>
                  <p className="text-sm">{message.message}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No messages yet. Send your first message above!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}