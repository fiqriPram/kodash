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
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "$0",
    description: "Perfect for individuals and small projects",
    features: [
      "100 emails per month",
      "Real-time analytics",
      "Open tracking",
      "Basic support",
      "1 custom domain",
      "Email templates",
      "Priority support"
    ],
    highlighted: false,
    cta: "/signup",
    icon: "🚀"
  },
  {
    name: "Professional",
    price: "$29",
    description: "Built for growing teams and businesses",
    features: [
      "5,000 emails per month",
      "Advanced analytics",
      "Priority support",
      "5 custom domains",
      "Email templates",
      "API access",
      "Team collaboration"
    ],
    highlighted: false,
    cta: "/signup",
    icon: "⚡"
  },
    {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with advanced needs",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "White-label solution",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security",
      "Team collaboration"
    ],
    highlighted: false,
    cta: "/contact",
    icon: "🏢"
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Choose your plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Simple, transparent pricing designed for modern workflows. 
              Start free, scale as you grow.
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                  plan.highlighted 
                    ? 'ring-2 ring-primary/30 shadow-xl border-primary/10 bg-primary/5 animate-pulse shadow-primary/20' 
                    : 'hover:border-muted-foreground/20 hover:shadow-lg'
                }`}
              >
                <div className={`absolute inset-0 ${
                  plan.highlighted 
                    ? 'bg-gradient-to-r from-primary/5 to-primary/20 opacity-20 rounded-lg blur-sm' 
                    : ''
                }`}></div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold mb-2 flex items-center justify-center gap-2 relative">
                    {plan.highlighted && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/20 opacity-20 rounded-lg blur-sm"></div>
                    )}
                    {plan.icon}
                    {plan.name}
                    {plan.highlighted && (
                      <span className="relative z-10 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-4xl font-bold mb-6 text-center">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    <Link href={plan.cta}>{plan.highlighted ? "Start Free Trial" : "Get Started"}</Link>
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
            <Card className="p-8 bg-card/50 backdrop-blur-sm">
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
            <p>&copy; 2024 MailBoard. All rights reserved.</p>
            <div className="flex justify-center space-x-6 text-sm">
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