"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { SidebarProvider, useSidebar } from "@/components/sidebar-provider";
import { UserProvider } from "@/components/user-provider";

interface DashboardLayoutProps {
  children: ReactNode;
  user: { id: string; email: string; createdAt: string } | null;
}

function DashboardLayoutInner({ children }: DashboardLayoutProps) {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="flex h-screen bg-background">
      <Sidebar collapsed={isCollapsed} onToggle={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-auto">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <UserProvider user={user}>
      <SidebarProvider>
        <DashboardLayoutInner children={children} user={user} />
      </SidebarProvider>
    </UserProvider>
  );
}
