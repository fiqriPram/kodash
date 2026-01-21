"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-xl font-bold">
          Kodash
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <Link
          href="/login"
          className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
        >
          Login
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
