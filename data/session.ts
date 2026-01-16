// data/session.ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getSessionFn() {
  try {
    const headersList = await headers();

    console.log("📝 Getting session with headers...");

    const session = await auth.api.getSession({
      headers: headersList,
    });

    console.log(
      "✅ Session retrieved:",
      session ? "✓ Has session" : "✗ No session"
    );

    return session;
  } catch (error) {
    console.error("❌ Session fetch error:", error);
    return null;
  }
}
