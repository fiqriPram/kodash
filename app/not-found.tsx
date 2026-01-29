import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold text-muted-foreground">404</p>
            <p className="text-sm text-muted-foreground mt-2">
              Sorry, we couldn&apos;t find page you were looking for.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}