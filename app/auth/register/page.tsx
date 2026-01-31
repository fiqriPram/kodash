import { RegisterForm } from "@/components/register-form"
import { Navbar } from "@/components/layout/navbar"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex items-center justify-center py-20">
        <RegisterForm />
      </div>
    </div>
  )
}