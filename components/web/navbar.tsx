"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();

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
          <h1 className="text-lg font-semibold">Next App</h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? null : session ? (
            <>
              <Button onClick={handleSignOut} variant="secondary">
                Logout
              </Button>

              <Link href="/dashboard" className={buttonVariants()}>
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "secondary" })}
              >
                Login
              </Link>

              <Link href="/signup" className={buttonVariants()}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
