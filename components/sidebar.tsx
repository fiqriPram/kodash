"use client"

import { useState } from "react"
import { Menu, X, Home, Settings, Users, BarChart3, FileText, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  user?: { email: string } | null
}

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    title: "Users", 
    icon: Users,
    href: "/dashboard/users",
  },
  {
    title: "Documents",
    icon: FileText,
    href: "/dashboard/documents",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
]

export function Sidebar({ isCollapsed, setIsCollapsed, user }: SidebarProps) {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className={cn(
      "relative flex flex-col h-screen bg-card border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">K</span>
            </div>
            <span className="font-bold text-lg">Kodash</span>
          </div>
        )}
        {isCollapsed && (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">K</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start h-10",
              isCollapsed ? "px-2" : "px-3"
            )}
            asChild
          >
            <a href={item.href} className="flex items-center">
              <item.icon className="h-4 w-4" />
              {!isCollapsed && <span className="ml-3">{item.title}</span>}
            </a>
          </Button>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t">
        {!isCollapsed ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span className="truncate">{user?.email}</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-center" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}