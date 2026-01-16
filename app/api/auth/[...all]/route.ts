import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔐 Auth GET request:", request.nextUrl.pathname);
    const response = await auth.handler(request);
    console.log("✅ Auth GET response status:", response.status);
    return response;
  } catch (error) {
    console.error("❌ Auth GET error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("🔐 Auth POST request:", request.nextUrl.pathname);
    const response = await auth.handler(request);
    console.log("✅ Auth POST response status:", response.status);
    return response;
  } catch (error) {
    console.error("❌ Auth POST error:", error);
    throw error;
  }
}
