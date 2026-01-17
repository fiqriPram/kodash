import Link from "next/link";
import {
  ArrowRight,
  BarChart,
  BookOpen,
  Braces,
  Calendar,
  Check,
  Database,
  Globe,
  Layers,
  Lock,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/web/navbar";

export const metadata = {
  title: "Social Media Dashboard for Influencers | Grow & Automate",
  description:
    "Plan, schedule, and optimize your social media posts effortlessly. AI-powered tools, analytics, and multi-platform management to boost your engagement and save time.",
};

const benefits = [
  {
    title: "Save Time",
    description: "Automate posting and focus more on creating content.",
  },
  {
    title: "Boost Engagement",
    description:
      "AI suggestions and actionable analytics help grow your audience.",
  },
  {
    title: "Multi-Platform Control",
    description: "Manage all your accounts from one intuitive dashboard.",
  },
  {
    title: "Optimize Content",
    description: "Plan and preview posts to maximize performance.",
  },
];

const features = [
  {
    title: "Smart Scheduling",
    description:
      "Plan and schedule posts across all your social media accounts with ease.",
    icon: Calendar,
    href: "/features/scheduling",
  },
  {
    title: "AI Content Assistant",
    description:
      "Generate captions, hashtags, and content ideas intelligently using AI.",
    icon: Sparkles,
    href: "/features/ai-assistant",
  },
  {
    title: "Analytics & Insights",
    description:
      "Track engagement, monitor performance, and get actionable insights for growth.",
    icon: BarChart,
    href: "/features/analytics",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl">
            {/* Learn Full-Stack with <span className="text-primary">Next.js</span> */}
            Manage All Your Social Media in One Place
          </h1>

          <p className="text-xl text-muted-foreground">
            {/* Build a real-world application with authentication, database,
            dashboards, and AI features. */}
            Schedule, track, and optimize your content effortlessly across all
            your social media accounts.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className={buttonVariants({
                size: "lg",
                className: "rounded-full px-8",
              })}
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <a
              href="https://nextjs.org/docs"
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-full px-8",
              })}
            >
              Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-30">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="h-6 w-6 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link
                  href={feature.href}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Learn More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-4xl space-y-12 text-center">
          <h2 className="text-3xl font-bold">Why You&apos;ll Love It</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-lg border p-6 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground mt-2">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Start Building?</h2>
        <div className="flex justify-center gap-4">
          <Link href="/signup" className={buttonVariants({ size: "lg" })}>
            Create Account
          </Link>
          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
            })}
          >
            Sign In
          </Link>
        </div>
      </section>
    </div>
  );
}
