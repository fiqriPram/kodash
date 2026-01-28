"use client"

import { useAuth } from '@/hooks/use-auth'
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { user, signOut } = useAuth()

  if (user) {
    return (
      <nav className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Mail className="h-6 w-6 text-blue-600" />
            MailBoard
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <ModeToggle />
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.email}</p>
                  <p className="w-[200px] truncate text-xs text-muted-foreground">
                    Free Plan
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pricing">Pricing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={signOut}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    )
  }

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Mail className="h-6 w-6 text-blue-600" />
          MailBoard
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <ModeToggle />
        <Link
          href="/login"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Sign In
        </Link>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </nav>
  )
}