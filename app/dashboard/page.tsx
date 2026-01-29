import { DashboardContent } from "@/components/dashboard-content"
import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const user = await getServerUser()
  
  if (!user) {
    redirect("/auth/login?message=Please log in to access your dashboard")
  }

  return <DashboardContent user={user} />
}