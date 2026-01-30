"use client"

import { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/sidebar-provider"
import { UserProvider } from "@/components/user-provider"

interface DashboardLayoutProps {
  children: ReactNode
  user?: { id: string; email: string; createdAt: string } | null
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </UserProvider>
  )
}