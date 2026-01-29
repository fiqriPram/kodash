import { SessionOptions } from "iron-session"

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string
      email: string
    }
  }
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "kodash-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}