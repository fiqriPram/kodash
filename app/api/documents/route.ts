import { NextRequest, NextResponse } from "next/server"
import { getServerUser } from "@/lib/server-auth"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    const user = await getServerUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const documents = await prisma.document.findMany({
      where: {
        uploadedBy: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      documents
    })

  } catch (error) {
    console.error("Documents API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}