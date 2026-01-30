import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { SettingsContent } from "@/components/settings-content"

export default async function SettingsPage() {
  const user = await getServerUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <SettingsContent currentUser={user} />
}