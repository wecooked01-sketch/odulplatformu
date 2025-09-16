'use client';

import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from '@/components/sidebar';
import { LogOut, User } from 'lucide-react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      
      <div className="w-full flex-1">
        <h1 className="text-lg font-semibold md:text-2xl">
          Welcome to Odul Platform
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {session?.user ? (
          <>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline-block">
                {session.user.name || session.user.email}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline-block ml-2">Sign Out</span>
            </Button>
          </>
        ) : (
          <Button asChild>
            <a href="/api/auth/signin">Sign In</a>
          </Button>
        )}
      </div>
    </header>
  );
}