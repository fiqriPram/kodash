"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          Kodash
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <ModeToggle />
        <Link
          href="/login"
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Login
        </Link>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
}
