import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete existing settings and profile
    await prisma.userSettings.deleteMany({
      where: { userId: user.id }
    })
    
    await prisma.userProfile.deleteMany({
      where: { userId: user.id }
    })
    
    // Create fresh default settings
    const settings = await prisma.userSettings.create({
      data: {
        userId: user.id,
        displayName: user.email.split('@')[0]
      }
    })
    
    return NextResponse.json({ 
      success: true,
      message: "Settings reset successfully",
      settings 
    })

  } catch (error) {
    console.error("Reset error:", error)
    
    if (error instanceof Error) {
      return NextResponse.json({ 
        error: error.message,
        stack: error.stack 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}