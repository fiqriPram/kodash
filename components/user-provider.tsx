"use client"

import { createContext, useContext, ReactNode } from "react"

interface UserData {
  id: string
  email: string
  createdAt: string
}

interface UserContextType {
  user: UserData | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
  user: UserData | null
}

export function UserProvider({ children, user }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}