"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type SignupInput = {
  fullName: string;
  email: string;
  password: string;
};

export function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupInput) => {
    startTransition(async () => {
      console.log("📝 Starting signup with:", {
        email: data.email,
        name: data.fullName,
      });

      try {
        const result = await authClient.signUp.email({
          name: data.fullName,
          email: data.email,
          password: data.password,
          fetchOptions: {
            onSuccess: async () => {
              console.log("✅ Signup successful, waiting for session...");
              toast.success("Account created successfully");

              // Small delay to ensure session is set
              await new Promise((resolve) => setTimeout(resolve, 500));

              console.log("🚀 Redirecting to dashboard...");
              router.push("/dashboard");
            },
            onError: (response) => {
              console.error("❌ Signup error response:", response);
              console.error("❌ Error object:", response.error);
              console.error(
                "❌ Full response:",
                JSON.stringify(response, null, 2)
              );

              const errorMessage =
                response.error?.message ||
                response.error?.toString() ||
                "An error occurred during signup";

              toast.error(errorMessage);
            },
          },
        });
        console.log("📤 Signup result:", result);
      } catch (err) {
        console.error("💥 Signup exception:", err);
        console.error("💥 Exception details:", JSON.stringify(err, null, 2));

        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Full name" {...register("fullName")} />
            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Account"}
          </Button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
