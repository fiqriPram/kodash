"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarLogoProps {
  collapsed: boolean
  onToggle: () => void
}

export function SidebarLogo({ collapsed, onToggle }: SidebarLogoProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={collapsed ? onToggle : undefined}
      className={cn(
        "h-8 w-8 p-0 rounded-lg",
        collapsed ? "bg-primary hover:bg-primary/90" : "bg-primary"
      )}
    >
      <span className="text-primary-foreground text-sm font-bold">K</span>
    </Button>
  )
}