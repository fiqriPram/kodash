"use client"

import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  title: string
  icon: LucideIcon
  href: string
  collapsed: boolean
}

export function SidebarItem({ title, icon: Icon, href, collapsed }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start h-10 transition-colors",
        collapsed ? "px-2" : "px-3"
      )}
      asChild
    >
      <a href={href} className="flex items-center">
        <Icon className="h-4 w-4 flex-shrink-0" />
        {!collapsed && (
          <span className="ml-3 whitespace-nowrap">{title}</span>
        )}
      </a>
    </Button>
  )
}