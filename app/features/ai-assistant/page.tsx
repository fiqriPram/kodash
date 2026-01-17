import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Lightbulb,
  MessageSquare,
  Hash,
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
  title: "AI Content Assistant | Kodash",
  description:
    "Generate captions, hashtags, and content ideas intelligently using AI.",
};

export default function AIAssistantPage() {
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
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">AI Content Assistant</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Generate captions, hashtags, and content ideas intelligently using
              AI.
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
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Smart Caption Generation</CardTitle>
              </div>
              <CardDescription>
                AI-powered captions that engage your audience
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Upload an image or describe your post, and let our AI generate
              compelling captions tailored to your brand voice and audience.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                <CardTitle>Hashtag Suggestions</CardTitle>
              </div>
              <CardDescription>
                Discover trending and relevant hashtags
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Get AI-recommended hashtags to expand your reach and increase
              discoverability. Mix trending and niche tags for optimal results.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                <CardTitle>Content Ideas</CardTitle>
              </div>
              <CardDescription>
                Never run out of creative post ideas
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Get personalized content suggestions based on your niche, audience
              interests, and current trends. Beat creator&apos;s block
              instantly.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle>Multiple Styles</CardTitle>
              </div>
              <CardDescription>
                Adapt your tone to match your brand
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Generate captions in different styles: professional, casual,
              funny, inspirational, or promotional. Keep consistency across
              platforms.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">
            Supercharge your content creation?
          </h2>
          <p className="text-lg text-muted-foreground">
            Let AI help you create better content faster.
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
