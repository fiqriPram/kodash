import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getServerUser()
    
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all users with mock additional data
    // In a real app, you would have lastLogin and status fields in your database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Add mock data for demonstration
    const usersWithMockData = users.map((user, index) => ({
      ...user,
      // Make first user admin for demo
      role: index === 0 ? "admin" as const : "user" as const,
      status: index < users.length * 0.8 ? "active" as const : 
              index < users.length * 0.95 ? "inactive" as const : "suspended" as const,
      lastLogin: index < users.length * 0.6 ? 
        new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : 
        undefined
    }))

    return NextResponse.json({
      users: usersWithMockData
    })

  } catch (error) {
    console.error("Users API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}