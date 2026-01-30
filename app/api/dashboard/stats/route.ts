import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user count
    const totalUsers = await prisma.user.count()
    const recentUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    })

    // Mock data for now since we don't have document or activity tables yet
    // In a real app, you would query actual data from your database
    const stats = {
      totalViews: 2847 + Math.floor(Math.random() * 100),
      activeUsers: 184 + Math.floor(Math.random() * 20),
      documents: 47 + Math.floor(Math.random() * 10),
      securityScore: 98,
      userGrowth: {
        total: totalUsers,
        recent: recentUsers,
        growthPercentage: totalUsers > 0 ? Math.round((recentUsers / totalUsers) * 100) : 0
      }
    }

    // Get recent activity (mock data for now)
    const recentActivity = [
      {
        id: "1",
        type: "login",
        message: "User login detected",
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        color: "bg-green-500"
      },
      {
        id: "2", 
        type: "document",
        message: "New document created",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        color: "bg-blue-500"
      },
      {
        id: "3",
        type: "settings", 
        message: "Settings updated",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        color: "bg-purple-500"
      }
    ]

    return NextResponse.json({
      stats,
      recentActivity
    })

  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}