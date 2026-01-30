import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Test basic Prisma connection
    const userCount = await prisma.user.count()
    
    // Test UserSettings table
    try {
      const settingsCount = await prisma.userSettings.count()
      return NextResponse.json({ 
        message: "Test successful",
        userCount,
        settingsCount,
        userId: user.id 
      })
    } catch (settingsError) {
      return NextResponse.json({ 
        error: "UserSettings table error",
        message: settingsError instanceof Error ? settingsError.message : "Unknown error"
      }, { status: 500 })
    }

  } catch (error) {
    console.error("Test API error:", error)
    
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: error.message,
        stack: error.stack 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}