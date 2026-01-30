import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"
import { passwordChangeSchema } from "@/lib/validations"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = passwordChangeSchema.parse(body)

    // Get current user with password
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { password: true }
    })

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(validatedData.currentPassword, currentUser.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ 
      success: true,
      message: "Password changed successfully"
    })

  } catch (error) {
    console.error("Password change error:", error)
    
    if (error instanceof Error && error.message.includes("Invalid")) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}