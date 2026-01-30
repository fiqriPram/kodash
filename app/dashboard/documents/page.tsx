import { getServerUser } from "@/lib/server-auth"
import { redirect } from "next/navigation"
import { DocumentsContent } from "@/components/documents-content"

export default async function DocumentsPage() {
  const user = await getServerUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <DocumentsContent currentUser={user} />
}