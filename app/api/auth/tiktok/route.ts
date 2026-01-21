import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
    response_type: "code",
    scope: "user.info.basic,video.list",
    state: "secure_random_state",
  });

  return NextResponse.redirect(
    `https://www.tiktok.com/v2/auth/authorize/?${params}`,
  );
}
