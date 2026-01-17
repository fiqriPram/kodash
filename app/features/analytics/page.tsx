import Link from "next/link";
import {
  ArrowLeft,
  BarChart,
  TrendingUp,
  PieChart,
  Target,
} from "lucide-react";
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
  title: "Analytics & Insights | Kodash",
  description:
    "Track engagement, monitor performance, and get actionable insights for growth.",
};

export default function AnalyticsPage() {
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
              <BarChart className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Analytics & Insights</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Track engagement, monitor performance, and get actionable insights
              for growth.
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
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Real-Time Engagement Tracking</CardTitle>
              </div>
              <CardDescription>
                Monitor likes, comments, and shares instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              See how your posts perform across all platforms in real-time.
              Track engagement metrics as they happen and respond to your
              audience faster.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-primary" />
                <CardTitle>Audience Demographics</CardTitle>
              </div>
              <CardDescription>
                Understand who&apos;s engaging with your content
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Detailed insights into your audience&apos;s age, location,
              interests, and behavior patterns. Create better-targeted content.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                <CardTitle>Performance Comparison</CardTitle>
              </div>
              <CardDescription>
                Compare posts and identify top performers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              See which content types, posting times, and formats drive the most
              engagement. Learn what works best for your audience.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle>Growth Insights</CardTitle>
              </div>
              <CardDescription>
                Get actionable recommendations for growth
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Receive AI-powered suggestions to grow your followers, increase
              engagement, and optimize your content strategy.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Analytics Matter
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data-Driven Decisions</h3>
                <p className="text-muted-foreground">
                  Make informed decisions about your content strategy based on
                  real data, not guesses.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Optimize ROI</h3>
                <p className="text-muted-foreground">
                  Focus on what works and eliminate underperforming content to
                  maximize your results.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Competitive Advantage</h3>
                <p className="text-muted-foreground">
                  Stay ahead of competitors by understanding trends and adapting
                  faster than the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">Start tracking your success?</h2>
          <p className="text-lg text-muted-foreground">
            Get insights that help you grow smarter.
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
