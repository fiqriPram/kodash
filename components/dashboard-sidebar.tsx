"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Video,
  Settings,
  TrendingUp,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Videos",
    href: "/dashboard/videos",
    icon: Video,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "border-r bg-card min-h-screen transition-all duration-300 ease-in-out relative",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className={cn("p-6", collapsed && "px-4")}>
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 mb-8 transition-all",
            collapsed ? "justify-center" : "",
          )}
        >
          <TrendingUp className="h-6 w-6 text-purple-600 shrink-0" />
          {!collapsed && <span className="text-xl font-bold">Kodash</span>}
        </Link>

        {/* Navigation */}
        <TooltipProvider delayDuration={0}>
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              const linkContent = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    collapsed && "justify-center",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return linkContent;
            })}
          </nav>
        </TooltipProvider>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-20 h-6 w-6 rounded-full border bg-card shadow-md hover:bg-accent transition-all",
          collapsed && "rotate-180",
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </aside>
  );
}
