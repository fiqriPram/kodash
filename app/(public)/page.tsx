"use client"

import Link from "next/link";
import { useAuth } from '@/hooks/use-auth'
import { Navbar } from "@/components/navbar-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  Send,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

export default function Home() {
  const { user } = useAuth()

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Ready to send some emails?</p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-background py-24 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 mb-8 shadow-lg">
              <Mail className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Simple Email
              <span className="text-blue-600 dark:text-blue-400">Delivery</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Send transactional emails without the complexity. 
              <br className="hidden sm:block" />
              Built for developers who value reliability and simplicity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground">Built for modern development workflows</p>
          </div>
          
          <div className="text-center mb-12">
            <Link 
              href="/pricing" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              View detailed pricing
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Free Plan */}
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="text-3xl font-bold mb-2">Free</div>
              <div className="text-2xl font-bold text-muted-foreground mb-4">$0<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  50 emails per month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Basic analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  Email tracking
                </li>
              </ul>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="text-center p-6 rounded-xl bg-card border-2 border-primary/20 ring-primary/10">
              <div className="text-3xl font-bold mb-2 relative">
                Pro
                <span className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </span>
              </div>
              <div className="text-2xl font-bold text-muted-foreground mb-4">$29<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  2,000 emails per month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Advanced analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  Priority support
                </li>
              </ul>
              <Button asChild className="mt-4">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>

            {/* Business Plan */}
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="text-3xl font-bold mb-2">Business</div>
              <div className="text-2xl font-bold text-muted-foreground mb-4">$99<span className="text-lg font-normal">/month</span></div>
              <ul className="space-y-2 text-sm text-left">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  Unlimited emails
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  Dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  SLA guarantee
                </li>
              </ul>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
            <p className="text-muted-foreground">Built for modern development workflows</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-500/10 mb-4">
                <Send className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Send Emails</h3>
              <p className="text-sm text-muted-foreground">
                Reliable delivery with smart retry logic
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-green-500/10 mb-4">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Track Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Real-time insights and performance metrics
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-purple-500/10 mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold">Secure Platform</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security and privacy
              </p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl bg-card">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-orange-500/10 mb-4">
                <Zap className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold">Quick Setup</h3>
              <p className="text-sm text-muted-foreground">
                Start sending in minutes, not hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join developers sending thousands of emails daily with our reliable platform.
            </p>
            <Button asChild size="lg" className="bg-background text-foreground hover:bg-muted px-12 py-6 text-lg border">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-muted text-muted-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span>© 2024 MailBoard</span>
              <span className="text-muted-foreground/60">•</span>
              <span>Built for developers</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/signup" className="hover:text-foreground transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}