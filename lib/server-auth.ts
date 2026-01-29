import { cookies } from "next/headers"
import { prisma } from './prisma'

export async function getServerUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("kodash-session")?.value
  if (!session) return null

  try {
    const parsed = JSON.parse(session)
    const userId = parsed.user?.id
    if (!userId) return null

    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    })

    if (!userData) return null

    return {
      id: userData.id,
      email: userData.email,
      createdAt: userData.createdAt.toISOString(),
    }
  } catch {
    return null
  }
}