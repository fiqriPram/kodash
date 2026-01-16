"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookmarkIcon, Compass, Import } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavPrimary } from "./nav-primary";
import { NavUser } from "./nav-user";
import { NavUserProps } from "@/lib/types";

type NavItem = {
  title: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  {
    title: "Items",
    icon: BookmarkIcon,
    href: "/dashboard/items",
  },
  {
    title: "Import",
    icon: Import,
    href: "/dashboard/import",
  },
  {
    title: "Discover",
    icon: Compass,
    href: "/dashboard/discover",
  },
];

export function AppSidebar({ user }: NavUserProps) {
  const pathname = usePathname();

  const itemsWithActive = navItems.map((item) => ({
    ...item,
    isActive: pathname.startsWith(item.href),
  }));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <BookmarkIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-medium">Recall</span>
                  <span className="text-xs">Your AI Knowledge Base</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavPrimary items={itemsWithActive} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
