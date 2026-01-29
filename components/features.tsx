import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Lock, Globe, Database, Users } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "Industry-standard security with encrypted passwords and session management."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js for optimal performance and instant page loads."
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data is protected with enterprise-grade security and encryption."
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Cloud-hosted infrastructure ensures reliability and scalability."
  },
  {
    icon: Database,
    title: "Smart Data",
    description: "PostgreSQL database with intelligent query optimization."
  },
  {
    icon: Users,
    title: "User Focused",
    description: "Intuitive interface designed with user experience as the top priority."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[800px] mx-auto">
            Everything you need to manage your workflow efficiently and securely.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}