"use client"

import { Home, Settings, Users, BarChart3, FileText, LogOut, User, Menu } from "lucide-react"
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
    <aside className={cn(
      "relative flex flex-col h-screen bg-card border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header with toggle button */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "justify-start"
        )}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">K</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg ml-3">Kodash</span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start h-10 transition-colors",
              isCollapsed ? "px-2" : "px-3"
            )}
            asChild
          >
            <a href={item.href} className="flex items-center">
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 whitespace-nowrap">{item.title}</span>
              )}
            </a>
          </Button>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t">
        {isCollapsed ? (
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