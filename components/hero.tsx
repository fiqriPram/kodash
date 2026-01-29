import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <div className="container max-w-3xl px-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Kodash
          </span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl max-w-[800px] mx-auto">
          A modern, secure web application designed to streamline your workflow. 
          Experience the perfect blend of simplicity and power with our intuitive dashboard 
          and seamless authentication.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/auth/register">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link href="/#features">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}