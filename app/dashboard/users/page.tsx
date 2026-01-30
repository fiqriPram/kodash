import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { UsersContent } from "@/components/users-content"

export default async function UsersPage() {
  const user = await getServerUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <UsersContent currentUser={user} />
}