"use client";

import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className={buttonVariants({
          variant: "secondary",
          className: "absolute top-8 left-8 flex items-center gap-2",
        })}
      >
        <ArrowLeft className="size-4" />
        Back to home
      </button>

      {/* Auth page content */}
      <div className="flex min-h-screen items-center justify-center">
        {children}
      </div>
    </div>
  );
}
