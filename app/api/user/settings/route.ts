import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Return default settings for now
    // In a real app, you would store these in the database
    const settings = {
      displayName: user.email.split('@')[0],
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true,
      securityAlerts: true,
      theme: "system",
      language: "en",
      twoFactorEnabled: false
    }

    return NextResponse.json(settings)

  } catch (error) {
    console.error("Settings GET error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await request.json()

    // In a real app, you would save these to the database
    // For now, we'll just return success
    console.log("Saving settings for user:", user.id, settings)

    return NextResponse.json({ 
      success: true,
      message: "Settings saved successfully"
    })

  } catch (error) {
    console.error("Settings POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}