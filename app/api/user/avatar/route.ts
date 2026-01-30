import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { avatarUploadSchema } from "@/lib/validations"

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file
    const validation = avatarUploadSchema.safeParse({ file })
    if (!validation.success) {
      return NextResponse.json({ 
        error: validation.error.issues[0]?.message || "Invalid file" 
      }, { status: 400 })
    }

    // Create avatars directory if it doesn't exist
    const avatarsDir = path.join(process.cwd(), "public", "avatars")
    try {
      await mkdir(avatarsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = path.extname(file.name)
    const filename = `${user.id}-${timestamp}${fileExtension}`
    const filepath = path.join(avatarsDir, filename)

    // Save file to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    // Update user profile with avatar URL
    const avatarUrl = `/avatars/${filename}`
    
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: { avatarUrl },
      create: { 
        userId: user.id,
        avatarUrl 
      }
    })

    return NextResponse.json({
      success: true,
      message: "Avatar uploaded successfully",
      avatarUrl
    })

  } catch (error) {
    console.error("Avatar upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}