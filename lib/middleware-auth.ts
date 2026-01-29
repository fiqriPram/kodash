import { NextRequest, NextResponse } from "next/server"

export interface User {
  id: string
  email: string
}

export function getUserFromRequest(request: NextRequest): User | null {
  const session = request.cookies.get("kodash-session")?.value
  if (!session) return null

  try {
    const parsed = JSON.parse(session)
    return parsed.user || null
  } catch {
    return null
  }
}

export function withAuth(handler: (request: NextRequest, user: User) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = getUserFromRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    return handler(request, user)
  }
}