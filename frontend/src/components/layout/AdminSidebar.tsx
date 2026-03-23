import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Bell, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutDialog } from "./LogoutDialog";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Announcements", href: "/admin/announcements", icon: Bell },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold text-gradient">UniMate</span>
            <span className="text-xs text-muted-foreground block -mt-0.5">Admin</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-border space-y-2">
        <LogoutDialog showText />
      </div>
    </aside>
  );
}
