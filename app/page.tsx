import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Braces,
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
  title: "Learn Full-Stack React | Next.js",
  description:
    "Build modern full-stack React apps with Next.js, Prisma, authentication, and AI features.",
};

const techStack = [
  {
    name: "Next.js",
    description: "React framework with App Router and Server Components",
    icon: Layers,
  },
  {
    name: "Prisma + PostgreSQL",
    description: "Type-safe database access",
    icon: Database,
  },
  {
    name: "Authentication",
    description: "Secure auth with better-auth",
    icon: Lock,
  },
  {
    name: "AI Integration",
    description: "Streaming AI responses",
    icon: Sparkles,
  },
];

const features = [
  {
    title: "Import URLs",
    description: "Scrape web content with real-time progress",
    icon: Globe,
    href: "/dashboard/import",
  },
  {
    title: "AI Summaries",
    description: "Generate intelligent summaries",
    icon: Sparkles,
    href: "/dashboard/items",
  },
  {
    title: "Discover Content",
    description: "Search and bulk import articles",
    icon: BookOpen,
    href: "/dashboard/discover",
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
            Learn Full-Stack with <span className="text-primary">Next.js</span>
          </h1>

          <p className="text-xl text-muted-foreground">
            Build a real-world application with authentication, database,
            dashboards, and AI features.
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
      <section className="px-4 py-20">
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

      {/* Tech Stack */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-3">
          {techStack.map((tech) => (
            <div key={tech.name} className="rounded-lg border p-4 flex gap-4">
              <tech.icon className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
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
