import { LoginForm } from "@/components/login-form"
import { Navbar } from "@/components/navbar"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex items-center justify-center py-20">
        <LoginForm />
      </div>
    </div>
  )
}