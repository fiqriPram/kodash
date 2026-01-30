import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { AnalyticsContent } from "@/components/analytics-content"

export default async function AnalyticsPage() {
  const user = await getServerUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <AnalyticsContent user={user} />
}