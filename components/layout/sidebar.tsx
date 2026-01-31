"use client"

import { Home, Settings, Users, BarChart3, FileText, LogOut, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUser } from "@/components/user-provider"
import { SidebarLogo } from "../sidebar/sidebar-logo"
import { SidebarItem } from "../sidebar/sidebar-item"

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

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user } = useUser()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      window.location.href = "/auth/login"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <aside className={cn(
      "flex flex-col h-screen bg-card transition-all duration-300",
      collapsed ? "w-16" : "w-64 border-r"
    )}>
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between w-full"
        )}>
          <div className="flex items-center">
            <SidebarLogo collapsed={collapsed} onToggle={onToggle} />
            {!collapsed && (
              <span className="font-bold text-lg ml-3">Kodash</span>
            )}
          </div>
          
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Menu className="h-4 w-4" strokeWidth={1} />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            title={item.title}
            icon={item.icon}
            href={item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t">
        {collapsed ? (
          <div className="space-y-2">
            <div className="flex justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-center p-2" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm">
              <User className="h-4 w-4" />
              <span className="truncate text-muted-foreground">{user?.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 flex-shrink-0" />
              <span className="ml-2 whitespace-nowrap">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}