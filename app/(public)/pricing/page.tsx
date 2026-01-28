"use client"

import { Navbar } from "@/components/navbar-auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Check, Zap, Shield, Mail, BarChart } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "50 emails per month",
      "Basic email analytics",
      "Email open tracking",
      "Community support"
    ],
    highlighted: "Get Started",
    cta: "/signup"
  },
  {
    name: "Pro",
    price: "$29",
    description: "For growing projects",
    features: [
      "2,000 emails per month",
      "Advanced analytics",
      "Priority support",
      "Custom domains",
      "Email templates",
      "API access"
    ],
    highlighted: "Start Free Trial",
    cta: "/signup"
  },
  {
    name: "Business",
    price: "$99",
    description: "For scale and reliability",
    features: [
      "Unlimited emails",
      "Dedicated support",
      "White-label options",
      "SLA guarantee",
      "Advanced security",
      "Team collaboration"
    ],
    highlighted: "Contact Sales",
    cta: "/contact"
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works for you. No hidden fees, 
              <br className="hidden sm:block" />
              cancel anytime.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${plan.name === "Pro" ? "border-primary/20 ring-primary/10" : ""}`}>
                {plan.name === "Pro" && (
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-4xl font-bold mb-6 text-center">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full"
                    variant={plan.name === "Pro" ? "default" : "outline"}
                  >
                    <Link href={plan.cta}>{plan.highlighted}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Can I change plans anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. 
                    Changes take effect immediately, and we'll prorate any differences.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What happens if I exceed my email limit?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We'll notify you when you approach your limit. You can upgrade 
                    anytime or wait for your monthly reset. We never block 
                    important emails.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="p-8 bg-card/50">
              <CardContent>
                <h3 className="text-xl font-bold mb-4">Not sure which plan?</h3>
                <p className="text-muted-foreground mb-6">
                  Start with our free plan and upgrade as you grow. 
                  No credit card required to get started.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/signup">Start Free</Link>
                  </Button>
                  <Button asChild size="lg">
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-4">
            <div>
              <p>&copy; 2024 MailBoard. All rights reserved.</p>
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}