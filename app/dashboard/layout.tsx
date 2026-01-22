import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <ModeToggle />
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
