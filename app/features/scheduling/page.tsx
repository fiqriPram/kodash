import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/web/navbar";

export const metadata = {
  title: "Smart Scheduling | Kodash",
  description:
    "Plan and schedule posts across all your social media accounts with ease.",
};

export default function SchedulingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Smart Scheduling</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Plan and schedule posts across all your social media accounts with
              ease.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle>Schedule in Advance</CardTitle>
              </div>
              <CardDescription>
                Plan your content weeks or months ahead
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Create a content calendar and schedule posts to go live at optimal
              times. Let Kodash handle publishing while you focus on creating
              great content.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Multi-Account Support</CardTitle>
              </div>
              <CardDescription>
                Manage all your social accounts from one place
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Connect Instagram, Twitter, Facebook, LinkedIn, and more. Schedule
              different content for each platform simultaneously.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>Timezone Support</CardTitle>
              </div>
              <CardDescription>
                Perfect timing across different regions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Automatically adjust posting times based on your audience&apos;s
              timezone. Reach your followers when they&apos;re most active.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle>Best Time Suggestions</CardTitle>
              </div>
              <CardDescription>
                AI-powered recommendations for maximum engagement
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Get intelligent suggestions on the best times to post based on
              your audience&apos;s behavior and historical engagement data.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">Ready to schedule smarter?</h2>
          <p className="text-lg text-muted-foreground">
            Start planning your social media strategy today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className={buttonVariants({ size: "lg" })}>
              Get Started
            </Link>
            <Link
              href="/"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
