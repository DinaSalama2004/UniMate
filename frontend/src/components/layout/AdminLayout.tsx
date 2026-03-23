import { ReactNode } from "react";
import { AdminSidebar } from "./AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="h-full px-6 flex items-center">
            <span className="text-sm font-medium text-muted-foreground">Admin Panel</span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
