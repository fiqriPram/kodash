import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"
import { settingsSchema, SettingsInput } from "@/lib/validations"

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Test database connection first
    try {
      const testConnection = await prisma.user.count()
      console.log("Database connection test - user count:", testConnection)
    } catch (connError) {
      console.error("Database connection failed:", connError)
      return NextResponse.json({ 
        error: "Database connection failed",
        details: connError instanceof Error ? connError.message : "Unknown connection error"
      }, { status: 500 })
    }

    // Get user settings from database, create default if not exists
    let settings = await prisma.userSettings.findUnique({
      where: { userId: user.id }
    })

    console.log("Existing settings:", settings)

    if (!settings) {
      console.log("Creating new settings for user:", user.id)
      settings = await prisma.userSettings.create({
        data: {
          userId: user.id,
          displayName: user.email.split('@')[0]
        }
      })
      console.log("Created new settings:", settings)
    }

    // Get user profile information
    const profile = await prisma.userProfile.findUnique({
      where: { userId: user.id }
    })

    const response = {
      displayName: settings.displayName || user.email.split('@')[0],
      email: user.email,
      emailNotifications: settings.emailNotifications ?? true,
      pushNotifications: settings.pushNotifications ?? false,
      weeklyReports: settings.weeklyReports ?? true,
      securityAlerts: settings.securityAlerts ?? true,
      theme: settings.theme ?? "system",
      language: settings.language ?? "en",
      twoFactorEnabled: settings.twoFactorEnabled ?? false,
      avatarUrl: profile?.avatarUrl,
      bio: profile?.bio
    }

    console.log("Returning settings:", response)
    return NextResponse.json(response)

  } catch (error) {
    console.error("Settings GET error:", error)
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    console.log("Received settings data:", body)
    const validatedData = settingsSchema.parse(body) as SettingsInput
    console.log("Validated data:", validatedData)

    // Try database operations with specific error handling
    try {
      console.log("Attempting database operation for user:", user.id)
      
      const settings = await prisma.userSettings.upsert({
        where: { userId: user.id },
        update: {
          displayName: validatedData.displayName,
          emailNotifications: validatedData.emailNotifications,
          pushNotifications: validatedData.pushNotifications,
          weeklyReports: validatedData.weeklyReports,
          securityAlerts: validatedData.securityAlerts,
          theme: validatedData.theme,
          language: validatedData.language,
          twoFactorEnabled: validatedData.twoFactorEnabled
        },
        create: {
          userId: user.id,
          displayName: validatedData.displayName,
          emailNotifications: validatedData.emailNotifications,
          pushNotifications: validatedData.pushNotifications,
          weeklyReports: validatedData.weeklyReports,
          securityAlerts: validatedData.securityAlerts,
          theme: validatedData.theme,
          language: validatedData.language,
          twoFactorEnabled: validatedData.twoFactorEnabled
        }
      })
      
      console.log("Database operation successful:", settings)
      
      return NextResponse.json({ 
        success: true,
        message: "Settings saved successfully",
        settings
      })
      
    } catch (dbError) {
      const error = dbError as Error
      console.error("Database operation detailed error:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
        cause: error.cause
      })
      
      // Return more specific error information
      return NextResponse.json({ 
        success: false,
        error: "Database operation failed",
        details: error.message,
        code: error.name || "UNKNOWN_ERROR"
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: "Settings saved successfully",
      settings: validatedData
    })

  } catch (error) {
    console.error("Settings POST error:", error)
    
    if (error instanceof Error && error.message.includes("Invalid")) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}