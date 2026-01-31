"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";

interface NavbarUser {
  email: string;
}

interface NavbarProps {
  user?: NavbarUser | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex h-14 items-center px-6">
        {/* LEFT */}
        <Link href="/" className="font-bold text-xl">
          Kodash
        </Link>

        {/* CENTER (TRUE CENTER) */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-6 text-sm font-medium">
          {!user && (
            <>
              <Link
                href="/#features"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Features
              </Link>
              <Link
                href="/#about"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                About
              </Link>
            </>
          )}
          {user && pathname.startsWith("/dashboard") && (
            <span className="text-muted-foreground">Dashboard</span>
          )}
        </nav>

        {/* RIGHT */}
        <div className="ml-auto flex items-center space-x-2">
          <ThemeToggle />
          {user ? (
            <>
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline-block text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline-block ml-2">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
