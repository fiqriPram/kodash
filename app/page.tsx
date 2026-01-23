import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  Users,
  Video,
  Zap,
  Eye,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            TikTok Analytics Made Simple
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Track your TikTok performance, analyze trends, and grow your audience
            with powerful insights and real-time analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              <Link href="/login">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle>Real-Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your TikTok metrics in real-time with comprehensive
                  analytics dashboard and insights.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-pink-600" />
                <CardTitle>Growth Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track follower growth, engagement rates, and identify trending
                  content patterns.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Video className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <CardTitle>Video Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyze individual video performance with detailed metrics and
                  audience insights.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <CardTitle>Audience Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Understand your audience demographics, interests, and engagement
                  patterns.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Eye className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <CardTitle>View Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deep dive into view counts, watch time, and viewer retention
                  metrics.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                <CardTitle>Quick Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate instant reports and export data for further analysis
                  and presentations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12">
            <CardContent>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Ready to Boost Your TikTok Presence?
              </h2>
              <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
                Join thousands of creators who are already using Kodash to track
                their performance and grow their TikTok audience. Start analyzing
                your content today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/login">Start Free Trial</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">View Demo</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                No credit card required • Free forever • Connect in seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kodash</h3>
              <p className="text-muted-foreground">
                TikTok analytics platform for creators and businesses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/analytics"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/videos"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Videos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Kodash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
