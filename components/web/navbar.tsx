"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully");
        },
        onError: ({ error }) => {
          toast.error(error.message);
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/kodash.svg"
            alt="Logo"
            className="size-8 dark:invert"
            width={32}
            height={32}
          />
          <h1 className="hidden text-lg font-semibold sm:block">Kodash</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-2">
            {isPending ? null : session ? (
              <>
                <Button onClick={handleSignOut} variant="secondary" size="sm">
                  Logout
                </Button>

                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  Login
                </Link>

                <Link href="/signup" className={buttonVariants({ size: "sm" })}>
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                {isPending ? null : session ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      Dashboard
                    </Link>
                    <Button
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      variant="secondary"
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({
                        variant: "secondary",
                        className: "w-full",
                      })}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
