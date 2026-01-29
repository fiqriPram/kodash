import { DashboardContent } from "@/components/dashboard-content"
import { Navbar } from "@/components/navbar"
import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getServerUser()
  
  if (!user) {
    redirect("/auth/login?message=Please log in to access your dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar user={{ email: user.email }} />
      <div className="container py-8">
        <DashboardContent user={user} />
      </div>
    </div>
  )
}